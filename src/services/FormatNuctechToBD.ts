import { IsNull } from "typeorm";
import { AppDataSource } from "../config/ORMConfig";
import { Events } from "../Entities/Events";
import { InspectionSystem } from "../Entities/InspectionSystem";
import { Operators } from "../Entities/Operators";
import { OutputFiles } from "../Entities/OutputFiles";
import { PlacasHasEvents } from "../Entities/PlacaHasEvents";
import { Placas } from "../Entities/Placas";
import { ScanEvents } from "../Entities/ScanEvents";
import { Status } from "../Entities/Status";
import { TargetEvents } from "../Entities/TargetEvents";
import { Vehicles } from "../Entities/Vehicles";
import { Vehicle_types } from "../Entities/Vehicles_types";
import { XRayFile } from "../Entities/XRayFile";
import { runInTransaction } from "../utils/transaction";
import { RegionHasCustom } from "../Entities/RegionHasCustom";
import { Customs } from "../Entities/Customs";
import { CustomSection } from "../Entities/CustomSection";
import { OperationAreas } from "../Entities/OperationAreas";
import { Regions } from "../Entities/Regions";
import { CustomHasCustomSection } from "../Entities/CustomHasCustomSection";
import { CustomSectionHasOperation } from "../Entities/CustomSectionHasOperation";
import { Sitios } from "../Entities/Sitios";
import { NuctechClaveData } from "../data/NuctechClave";
import { assignAnalistaToNewEvent } from "./eventAssignmentService";
import { UploadPayloadSnapshot } from "./fileHandler";
import { writeSerialPayloadAuditIfNeeded } from "../utils/serialPayloadAuditLogger";

const sindato = (str: string) => {
  if (!str || str === "") return "Sin Dato";
  return str;
};

export const FormatNuctechToBD = async (
  jsonData: any,
  aduana: string,
  region: string,
  area: string,
  seccion: string,
  company: string,
  localFilePath: string,
  pathFile: string,
  rawUploadPayload?: UploadPayloadSnapshot
) => {
  try {
    return await runInTransaction(AppDataSource, async (queryRunner) => {
      const target = jsonData.UFF?.Target?.[0];
      const scan = jsonData.UFF?.Scan?.[0];
      const analysis = jsonData.UFF?.Analysis?.[0];

      const inspectionSystem: Partial<InspectionSystem> = {
        Manufacturer: sindato(target?.InspectionSystem?.[0]?.Manufacturer?.[0]),
        ModelName: sindato(target?.InspectionSystem?.[0]?.ModelName?.[0]),
        SerialNumber: sindato(target?.InspectionSystem?.[0]?.SerialNumber?.[0]),
        Identifier: sindato(target?.InspectionSystem?.[0]?.Identifier?.[0]),
        Country: sindato(target?.InspectionSystem?.[0]?.Country?.[0]),
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

      const operator: Partial<Operators> = {
        FirstName: sindato(target?.Operator?.[0]?.FirstName?.[0]),
        LastName: sindato(target?.Operator?.[0]?.LastName?.[0]),
        LoginName: sindato(target?.Operator?.[0]?.LoginName?.[0]),
        Role: sindato(target?.Operator?.[0]?.Role?.[0]),
      };
      const operatorSaved = await queryRunner.manager.save(Operators, operator);

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
          queryRunner.manager.save(OutputFiles, output)
        )
      );

      const targetEvent: Partial<TargetEvents> = {
        comment: sindato(target?.Comment?.[0]),
        timeStamp: new Date(target?.TimeStamp?.[0]),
        digSign: sindato(target?.DigSign?.[0]),
        vehicles: vehicleSaved,
        operators: [operatorSaved],
        outputFiles: targetOutputFilesSaved[0],
      };
      const targetEventSaved = await queryRunner.manager.save(
        TargetEvents,
        targetEvent
      );

      const xRayFiles =
        scan?.XRayFile?.map((xray: any) => ({
          uri: sindato(xray?.URI?.[0]),
          type: sindato(xray?.Type?.[0]),
          view: sindato(xray?.View?.[0]),
          energy: sindato(xray?.Energy?.[0]),
          modality: sindato(xray?.Modality?.[0]),
          hemdInfo: sindato(xray?.HEMDInfo?.[0]?.HEMDFileURI?.[0]),
        })) || [];
      const xRayFilesSaved = await Promise.all(
        xRayFiles.map((xray: Partial<XRayFile>) =>
          queryRunner.manager.save(XRayFile, xray)
        )
      );

      const scanEvent: Partial<ScanEvents> = {
        scannerCaseId: scan?.ScannerCaseId?.[0] || "default-scannerCaseId",
        digsign: scan?.DigSign?.[0] || "example-digsign",
        xRayFile: xRayFilesSaved,
        outputFiles: scanOutputFilesSaved,
      };
      const scanEventSaved = await queryRunner.manager.save(
        ScanEvents,
        scanEvent
      );

      let regionSaved = await queryRunner.manager.findOne(Regions, {
        where: { name: region },
      });

      let customSaved = await queryRunner.manager.findOne(Customs, {
        where: { name: aduana },
      });

      let customSectionSaved = await queryRunner.manager.findOne(
        CustomSection,
        {
          where: { name: seccion },
        }
      );

      let operationAreaSaved = await queryRunner.manager.findOne(
        OperationAreas,
        {
          where: { name: area },
        }
      );

      let regionHasCustomSaved = await queryRunner.manager.findOne(
        RegionHasCustom,
        {
          where: {
            region_id: { id: regionSaved!.id },
            custom_id: { id: customSaved!.id },
          },
          relations: ["region_id", "custom_id"],
        }
      );

      if (!regionHasCustomSaved) {
        if (regionSaved && customSaved) {
          regionHasCustomSaved = await queryRunner.manager.save(
            RegionHasCustom,
            {
              region_id: regionSaved,
              custom_id: customSaved,
            }
          );
        }
      }

      let customHasSectionSaved = await queryRunner.manager.findOne(
        CustomHasCustomSection,
        {
          where: {
            regionHasCustom_id: { id: regionHasCustomSaved!.id },
            customSection_id: { id: customSectionSaved!.id },
          },
          relations: ["regionHasCustom_id", "customSection_id"],
        }
      );
      if (!customHasSectionSaved) {
        if (regionHasCustomSaved && customSectionSaved) {
          customHasSectionSaved = await queryRunner.manager.save(
            CustomHasCustomSection,
            {
              regionHasCustom_id: regionHasCustomSaved,
              customSection_id: customSectionSaved,
            }
          );
        }
      }
      let sectionHasOperationSaved = await queryRunner.manager.findOne(
        CustomSectionHasOperation,
        {
          where: {
            customHasCustomSection_id: { id: customHasSectionSaved!.id },
            operationAreas_id: { id: operationAreaSaved!.id },
          },
          relations: ["customHasCustomSection_id", "operationAreas_id"],
        }
      );
      if (!sectionHasOperationSaved) {
        if (customHasSectionSaved && operationAreaSaved) {
          sectionHasOperationSaved = await queryRunner.manager.save(
            CustomSectionHasOperation,
            {
              customHasCustomSection_id: customHasSectionSaved,
              operationAreas_id: operationAreaSaved,
            }
          );
        }
      }
      let sitiosSaved = await queryRunner.manager.findOne(Sitios, {
        where: {
          customSectionHasOperation_id: { id: sectionHasOperationSaved!.id },
        },
      });

      let status = await queryRunner.manager.findOne(Status, {
        where: { name: "Pendiente" },
      });
      if (!status) {
        status = await queryRunner.manager.save(Status, {
          name: "Pendiente",
        });
      }
      let claveEquipo = target?.InspectionSystem?.[0]?.ModelName?.[0];
      if (claveEquipo || claveEquipo === "" || claveEquipo.length > 0) {
        //Seleccionar clave Nuctech.json segun serialNumber
        claveEquipo = NuctechClaveData.find(
          (item) => item.serialNumber === claveEquipo
        );
      }

      const result =
        (customSaved?.clave ?? "0") +
        " " +
        (customSectionSaved?.clave ?? "0") +
        " " +
        (operationAreaSaved?.clave ?? "0") +
        " " +
        (target?.InspectionSystem?.[0]?.ModelName[0]
          .split("")
          .slice(-4)
          .join("") ?? "0") +
        (target?.InspectionSystem?.[0]?.SerialNumber?.[0].slice(-4) ?? "0") +
        " " +
        claveEquipo?.clave;

      const cleanDate = target?.TimeStamp?.[0].replace(/\D/g, "");
      let keyEvent = cleanDate + " " + result;
      const detectedSerial = target?.InspectionSystem?.[0]?.SerialNumber?.[0];
      await writeSerialPayloadAuditIfNeeded(detectedSerial, rawUploadPayload, {
        processor: "FormatNuctechToBD",
        eventKey: keyEvent,
        area,
        aduana,
        region,
        seccion,
        company,
      });

      const event: Partial<Events> = {
        eventName: target?.EventId?.[0],
        aduana: aduana,
        region: region,
        area: area,
        seccion: seccion,
        company: company,
        eventKey: keyEvent,
        routeFile: pathFile,
        dateInspection: new Date(target?.TimeStamp?.[0]),
        Comment: sindato(target?.Comment?.[0]),
        inspectionSystem: inspectionSystemSaved,
        scanEvents: [scanEventSaved],
        sitios: sitiosSaved!,
      };
      const eventSaved = await queryRunner.manager.save(Events, event);

      const placaHasEvents: Partial<PlacasHasEvents> = {
        placas: placaNameSaved ? placaNameSaved : null,
        events: eventSaved,
        status: status,
      };
      await queryRunner.manager.save(PlacasHasEvents, placaHasEvents);

      // Asignar automáticamente analista al evento
      if (sitiosSaved) {
        await assignAnalistaToNewEvent(eventSaved, sitiosSaved, queryRunner);
      }

      const formattedData = {
        eventName: eventSaved.eventName,
      };

      return formattedData;
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
