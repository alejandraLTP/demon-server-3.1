import path from "path";
import { IsNull } from "typeorm";

import { AppDataSource } from "../config/ORMConfig";
import { CustomHasCustomSection } from "../Entities/CustomHasCustomSection";
import { Customs } from "../Entities/Customs";
import { CustomSection } from "../Entities/CustomSection";
import { CustomSectionHasOperation } from "../Entities/CustomSectionHasOperation";
import { Equipos } from "../Entities/Equipos";
import { Events } from "../Entities/Events";
import { InspectionSystem } from "../Entities/InspectionSystem";
import { OperationAreas } from "../Entities/OperationAreas";
import { Operators } from "../Entities/Operators";
import { OutputFiles } from "../Entities/OutputFiles";
import { PlacasHasEvents } from "../Entities/PlacaHasEvents";
import { Placas } from "../Entities/Placas";
import { RegionHasCustom } from "../Entities/RegionHasCustom";
import { Regions } from "../Entities/Regions";
import { ScanEvents } from "../Entities/ScanEvents";
import { Sitios } from "../Entities/Sitios";
import { Status } from "../Entities/Status";
import { TargetEvents } from "../Entities/TargetEvents";
import { Vehicles } from "../Entities/Vehicles";
import { Vehicle_types } from "../Entities/Vehicles_types";
import { XRayFile } from "../Entities/XRayFile";
import { runInTransaction } from "../utils/transaction";
import { convertirTimestampConZonas } from "../middleware/zonaHoraria";
import { dataSerialNumber } from "../data/SerialNumber";
import { query } from "winston";
import { assignAnalistaToNewEvent } from "./eventAssignmentService";
import { UploadPayloadSnapshot } from "./fileHandler";
import { writeSerialPayloadAuditIfNeeded } from "../utils/serialPayloadAuditLogger";

const sindato = (str: string) => {
  if (!str || str === "") return "Sin Dato";
  return str;
};

const cleanString = (str: string): string => {
  if (!str) return "";
  return str.trim().replace(/\s+/g, " ");
};

export const FormatRapiscanToBD = async (
  jsonData: any,
  localFilePath: string,
  pathFile: string,
  aduana: string,
  region: string,
  area: string,
  seccion: string,
  company: string,
  rawUploadPayload?: UploadPayloadSnapshot
) => {
  try {
    return await runInTransaction(AppDataSource, async (queryRunner) => {
      const target = jsonData.UFF?.Target?.[0];
      const scan = jsonData.UFF?.Scan?.[0];
      const fileName = path.basename(localFilePath, ".uff");

      const inspectionSystem: Partial<InspectionSystem> = {
        Manufacturer: sindato(target?.InspectionSystem?.[0]?.Manufacturer?.[0]),
        ModelName: sindato(target?.InspectionSystem?.[0]?.ModelName?.[0]),

        SerialNumber: sindato(target?.InspectionSystem?.[0]?.SerialNumber?.[0]),
        Identifier: sindato(target?.InspectionSystem?.[0]?.Identifier?.[0]),
        Latitude: sindato(
          target?.InspectionSystem?.[0]?.Location?.[0]?.Latitude?.[0]
        ),
        Longitude: sindato(
          target?.InspectionSystem?.[0]?.Location?.[0]?.Longitude?.[0]
        ),
      };
      const inspectionSystemSaved = await queryRunner.manager.save(
        InspectionSystem,
        inspectionSystem
      );

      const vehicleTypeName = sindato(target?.Vehicle?.[0]?.VehicleType?.[0]);
      let vehicleType = await queryRunner.manager.findOne(Vehicle_types, {
        where: { tipo: vehicleTypeName },
      });
      if (!vehicleType) {
        vehicleType = await queryRunner.manager.save(Vehicle_types, {
          tipo: vehicleTypeName,
        });
      }

      let placaNameSaved: Placas | null = null;
      const placaNameFront = target?.Vehicle?.[0]?.FrontPlateNum?.[0];
      const placaNameRear = target?.Vehicle?.[0]?.RearPlateNum?.[0];

      if (placaNameFront && placaNameRear) {
        placaNameSaved = await queryRunner.manager.findOne(Placas, {
          where: { placa_f: placaNameFront, placa_t: placaNameRear },
        });

        if (!placaNameSaved) {
          placaNameSaved = await queryRunner.manager.save(Placas, {
            placa_f: placaNameFront,
            placa_t: placaNameRear,
          });
        }
      } else if (placaNameFront) {
        placaNameSaved = await queryRunner.manager.findOne(Placas, {
          where: { placa_f: placaNameFront, placa_t: IsNull() },
        });

        if (!placaNameSaved) {
          placaNameSaved = await queryRunner.manager.save(Placas, {
            placa_f: placaNameFront,
            placa_t: null,
          });
        }
      } else if (placaNameRear) {
        placaNameSaved = await queryRunner.manager.findOne(Placas, {
          where: { placa_f: IsNull(), placa_t: placaNameRear },
        });

        if (!placaNameSaved) {
          placaNameSaved = await queryRunner.manager.save(Placas, {
            placa_f: null,
            placa_t: placaNameRear,
          });
        }
      } else {
        placaNameSaved = null;
      }

      const vehicle: Partial<Vehicles> = {
        vehicleNum: sindato(
          target?.Vehicle?.[0]?.Container?.[0]?.ContainerNum?.[0]
        ),
        vin: sindato(target?.Vehicle?.[0]?.VIN?.[0]),
        vehicle_types_id: vehicleType,
        placas_id: placaNameSaved ? placaNameSaved : null,
      };
      const vehicleSaved = await queryRunner.manager.save(Vehicles, vehicle);
      const targetOutputFiles =
        target?.OutputFile?.map((output: any) => ({
          Type: sindato(output?.Type?.[0]),
          View: sindato(output?.View?.[0]),
          URI: sindato(output?.URI?.[0]),
          Hash: sindato(output?.Hash?.[0]),
        })) || [];
      const targetOutputFilesSaved = await Promise.all(
        targetOutputFiles.map((output: Partial<OutputFiles>) =>
          queryRunner.manager.save(OutputFiles, output)
        )
      );
      const scanEvent: Partial<ScanEvents> = {
        scannerCaseId: scan?.EventId?.[0] || "default-scannerCaseId",
        digsign: scan?.DigSign?.[0] || "example-digsign",
      };
      const scanEventSaved = await queryRunner.manager.save(
        ScanEvents,
        scanEvent
      );

      const serialNumberToSearch =
        target?.InspectionSystem?.[0]?.SerialNumber?.[0];
      const foundItem = dataSerialNumber.find(
        (item) => item["SerialNumber"] === serialNumberToSearch
      );

      let sitiosSaved,
        regionSaved,
        customSaved,
        regionHasCustomSaved,
        customSectionSaved,
        operationAreaSaved,
        customHasSectionSaved,
        sectionHasOperationSaved,
        equipoResult;

      if (foundItem) {
        region = foundItem.Region;
        area = foundItem.Area;
        seccion = foundItem.Section;
        aduana = foundItem.Custom;

        const cshoResult = await queryRunner.manager.query(
          `
          SELECT csho.id
          FROM custom_section_has_operation csho
          JOIN operation_areas oa ON oa.id = csho."operationAreas_id"
          JOIN custom_has_custom_section chcs ON csho."customHasCustomSection_id" = chcs.id
          JOIN custom_section cs ON chcs."customSection_id" = cs.id
          JOIN region_has_custom rhc ON rhc.id = chcs."regionHasCustom_id"
          JOIN customs c ON c.id = rhc.custom_id
          JOIN regions r ON r.id = rhc.region_id
          WHERE r."name" = $1
            AND c."name" = $2
            AND cs."name" = $3
            AND oa."name" = $4
          LIMIT 1
          `,
          [
            foundItem.Region,
            foundItem.Custom,
            foundItem.Section,
            foundItem.Area,
          ]
        );

        if (!cshoResult || cshoResult.length === 0) {
          throw new Error(
            "No se encontró la relación custom_section_has_operation"
          );
        }

        sitiosSaved =
          (await queryRunner.manager.findOne(Sitios, {
            where: {
              customSectionHasOperation_id: { id: cshoResult[0].id },
            },
            relations: ["customSectionHasOperation_id"],
          })) ?? undefined;
        customSaved = await queryRunner.manager.findOne(Customs, {
          where: { name: aduana },
        });

        customSectionSaved = await queryRunner.manager.findOne(CustomSection, {
          where: { name: seccion },
        });

        operationAreaSaved = await queryRunner.manager.findOne(OperationAreas, {
          where: { name: area },
        });
      } else {
        console.log(
          "*************************************************************"
        );
        console.log(
          "*************************************************************\n"
        );
        console.log("No se encontró el número de serie:", serialNumberToSearch);
        console.log(
          "\n*************************************************************"
        );
        console.log(
          "*************************************************************\n"
        );

        region = cleanString(region);
        aduana = cleanString(aduana);
        seccion = cleanString(seccion);
        area = cleanString(area);

        if (area.includes("Export") || area.includes("Exportaci")) {
          area = "Exportación";
        }

        console.log(
          "area",
          area,
          "region",
          region,
          "aduana",
          aduana,
          "seccion",
          seccion
        );
        try {
          await queryRunner.startTransaction();

          regionSaved = await queryRunner.manager.findOne(Regions, {
            where: { name: region },
          });

          if (!regionSaved) {
            regionSaved = await queryRunner.manager.save(Regions, {
              name: region,
              clave: region,
            });
            console.log("Nueva Region creada:", regionSaved);
          } else {
            console.log("Region existente encontrada");
          }

          customSaved = await queryRunner.manager.findOne(Customs, {
            where: { name: aduana },
          });

          if (!customSaved) {
            customSaved = await queryRunner.manager.save(Customs, {
              name: aduana,
              clave: aduana,
            });
            console.log("Nueva Aduana creada:", customSaved);
          } else {
            console.log("Aduana existente encontrada");
          }

          regionHasCustomSaved = await queryRunner.manager.findOne(
            RegionHasCustom,
            {
              where: {
                region_id: { id: regionSaved.id },
                custom_id: { id: customSaved.id },
              },
              relations: ["region_id", "custom_id"],
            }
          );

          if (!regionHasCustomSaved) {
            regionHasCustomSaved = await queryRunner.manager.save(
              RegionHasCustom,
              {
                region_id: regionSaved,
                custom_id: customSaved,
              }
            );
            console.log(
              "Nueva relación Region-Custom creada:",
              regionHasCustomSaved
            );
          } else {
            console.log("Relación Region-Custom existente encontrada");
          }

          customSectionSaved = await queryRunner.manager.findOne(
            CustomSection,
            {
              where: { name: seccion },
            }
          );

          if (!customSectionSaved) {
            customSectionSaved = await queryRunner.manager.save(CustomSection, {
              name: seccion,
              clave: seccion,
            });
            console.log("Nueva Sección creada:", customSectionSaved);
          } else {
            console.log("Sección existente encontrada");
          }

          operationAreaSaved = await queryRunner.manager.findOne(
            OperationAreas,
            {
              where: { name: area },
            }
          );

          if (!operationAreaSaved) {
            operationAreaSaved = await queryRunner.manager.save(
              OperationAreas,
              {
                name: area,
                clave: area,
              }
            );
            console.log("Nueva Área de Operación creada:", operationAreaSaved);
          } else {
            console.log("Área de Operación existente encontrada");
          }

          customHasSectionSaved = await queryRunner.manager.findOne(
            CustomHasCustomSection,
            {
              where: {
                regionHasCustom_id: { id: regionHasCustomSaved.id },
                customSection_id: { id: customSectionSaved.id },
              },
              relations: ["regionHasCustom_id", "customSection_id"],
            }
          );

          if (!customHasSectionSaved) {
            customHasSectionSaved = await queryRunner.manager.save(
              CustomHasCustomSection,
              {
                regionHasCustom_id: regionHasCustomSaved,
                customSection_id: customSectionSaved,
              }
            );
            console.log(
              "Nueva relación Custom-Sección creada:",
              customHasSectionSaved
            );
          } else {
            console.log("Relación Custom-Sección existente encontrada");
          }

          sectionHasOperationSaved = await queryRunner.manager.findOne(
            CustomSectionHasOperation,
            {
              where: {
                customHasCustomSection_id: { id: customHasSectionSaved.id },
                operationAreas_id: { id: operationAreaSaved.id },
              },
            }
          );

          if (!sectionHasOperationSaved) {
            sectionHasOperationSaved = await queryRunner.manager.save(
              CustomSectionHasOperation,
              {
                customHasCustomSection_id: customHasSectionSaved,
                operationAreas_id: operationAreaSaved,
              }
            );
            console.log(
              "Nueva relación Sección-Área creada:",
              sectionHasOperationSaved
            );
          } else {
            console.log("Relación Sección-Área existente encontrada");
          }

          sitiosSaved = await queryRunner.manager.findOne(Sitios, {
            where: {
              customSectionHasOperation_id: { id: sectionHasOperationSaved.id },
            },
          });

          if (!sitiosSaved) {
            sitiosSaved = await queryRunner.manager.save(Sitios, {
              customSectionHasOperation_id: sectionHasOperationSaved,
              status: true,
            });
            console.log("Nuevo Sitio creado:", sitiosSaved);
          } else {
            console.log("Sitio existente encontrado");
          }

          await queryRunner.commitTransaction();

          console.log("Nuevos datos guardados correctamente:", {
            region: regionSaved,
            custom: customSaved,
            section: customSectionSaved,
            operationArea: operationAreaSaved,
            sitio: sitiosSaved,
          });
        } catch (error) {
          await queryRunner.rollbackTransaction();
          console.error("Error al guardar los datos:", error);
          throw error;
        }
      }

      const timestampOriginal = target?.TimeStamp?.[0];
      const conversion = convertirTimestampConZonas(aduana, timestampOriginal);

      const result =
        (customSaved?.clave ?? "0") +
        " " +
        (customSectionSaved?.clave ?? "0") +
        " " +
        (operationAreaSaved?.clave ?? "0") +
        " " +
        (target?.InspectionSystem?.[0]?.SerialNumber?.[0] ?? "0");

      const keyEvent = conversion.timestampLimpio + result;
      await writeSerialPayloadAuditIfNeeded(serialNumberToSearch, rawUploadPayload, {
        processor: "FormatRapiscanToBD",
        eventKey: keyEvent,
        area,
        aduana,
        region,
        seccion,
        company,
      });

      const fechaBienFin = new Date(conversion.horaCentro);

      const event: Partial<Events> = {
        eventName: target?.EventId?.[0],
        aduana: aduana,
        region: region,
        area: area,
        seccion: seccion,
        company: company,
        eventKey: keyEvent,
        routeFile: pathFile,
        dateInspection: fechaBienFin,
        Comment: sindato(target?.Comment?.[0]),
        inspectionSystem: inspectionSystemSaved,
        scanEvents: [scanEventSaved],
        sitios: sitiosSaved,
      };
      const eventSaved = await queryRunner.manager.save(Events, event);

      let equipoSaved = await queryRunner.manager.findOne(Equipos, {
        where: { name: target?.InspectionSystem?.[0]?.ModelName?.[0] },
      });

      if (!equipoSaved) {
        equipoSaved = await queryRunner.manager.save(Equipos, {
          name: target?.InspectionSystem?.[0]?.ModelName?.[0],
        });
      }

      let status = await queryRunner.manager.findOne(Status, {
        where: { name: "Pendiente" },
      });
      if (!status) {
        status = await queryRunner.manager.save(Status, { name: "Pendiente" });
      }

      const placaHasEvents: Partial<PlacasHasEvents> = {
        placas: placaNameSaved ? placaNameSaved : null,
        events: eventSaved,
        status: status,
      };
      await queryRunner.manager.save(PlacasHasEvents, placaHasEvents);

      const targetEvent: Partial<TargetEvents> = {
        comment: sindato(target?.Comment?.[0]),
        vehicles: vehicleSaved,
        outputFiles: targetOutputFilesSaved[0],
        events: eventSaved,
      };
      const targetEventSaved = await queryRunner.manager.save(
        TargetEvents,
        targetEvent
      );

      const operator: Partial<Operators> = {
        FirstName: sindato(target?.Operator?.[0]?.FirstName?.[0]),
        LastName: sindato(target?.Operator?.[0]?.LastName?.[0]),
        Role: sindato(target?.Operator?.[0]?.Role?.[0]),
        LoginName: sindato(target?.Operator?.[0]?.LoginName?.[0]),
        Company: sindato(target?.Operator?.[0]?.Company?.[0]),
        targetEvents: targetEventSaved,
      };
      const operatorSaved = await queryRunner.manager.save(Operators, operator);

      const scanOutputFiles =
        scan?.OutputFile?.map((output: any) => ({
          Type: sindato(output?.Type?.[0]),
          View: sindato(output?.View?.[0]),
          URI: sindato(output?.URI?.[0]),
          Hash: sindato(output?.Hash?.[0]),
          Name: sindato(output?.Name?.[0]),
        })) || [];
      const scanOutputFilesSaved = await Promise.all(
        scanOutputFiles.map((output: Partial<OutputFiles>) =>
          queryRunner.manager.save(OutputFiles, {
            ...output,
            scanEvents: scanEventSaved,
          })
        )
      );
      const xRayFiles =
        (scan?.XRayFile || []).map((xray: any) => {
          const baseData = {
            type: sindato(xray?.Type?.[0]),
            view: sindato(xray?.View?.[0]),
            energy: sindato(xray?.Energy?.[0]),
            modality: sindato(xray?.Modality?.[0]),
            hemdInfo: sindato(xray?.HEMDInfo?.[0]?.HEMDFileURI?.[0]),
            scanEvents: scanEventSaved,
          };
          let registros: any[] = [];

          const uri = xray?.URI?.[0];
          const hemdUri = xray?.HEMDInfo?.[0]?.HEMDFileURI?.[0];

          if (uri !== undefined) {
            registros.push({
              ...baseData,
              uri: sindato(uri),
              hemdInfo: hemdUri ? sindato(hemdUri) : null,
            });
          }

          if (hemdUri !== undefined) {
            registros.push({
              ...baseData,
              uri: sindato(hemdUri),
              hemdInfo: sindato(hemdUri),
            });
          }

          return registros;
        }) || [];

      const xRayFilesSaved = await Promise.all(
        xRayFiles.map((xray: Partial<XRayFile>) =>
          queryRunner.manager.save(XRayFile, xray)
        )
      );

      // Asignar automáticamente analista al evento
      if (sitiosSaved) {
        await assignAnalistaToNewEvent(eventSaved, sitiosSaved, queryRunner);
      }

      const formattedData = {
        eventName: eventSaved.eventName,
      };

      return formattedData;
    });
  } catch (error: any) {
    console.log("error", error.message);
    process.exit(1);
  }
};
