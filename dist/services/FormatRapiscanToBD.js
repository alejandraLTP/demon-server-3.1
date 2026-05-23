"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatRapiscanToBD = void 0;
const path_1 = __importDefault(require("path"));
const typeorm_1 = require("typeorm");
const ORMConfig_1 = require("../config/ORMConfig");
const CustomHasCustomSection_1 = require("../Entities/CustomHasCustomSection");
const Customs_1 = require("../Entities/Customs");
const CustomSection_1 = require("../Entities/CustomSection");
const CustomSectionHasOperation_1 = require("../Entities/CustomSectionHasOperation");
const Equipos_1 = require("../Entities/Equipos");
const EquiposHasSitios_1 = require("../Entities/EquiposHasSitios");
const Events_1 = require("../Entities/Events");
const InspectionSystem_1 = require("../Entities/InspectionSystem");
const OperationAreas_1 = require("../Entities/OperationAreas");
const Operators_1 = require("../Entities/Operators");
const OutputFiles_1 = require("../Entities/OutputFiles");
const PlacaHasEvents_1 = require("../Entities/PlacaHasEvents");
const Placas_1 = require("../Entities/Placas");
const RegionHasCustom_1 = require("../Entities/RegionHasCustom");
const Regions_1 = require("../Entities/Regions");
const ScanEvents_1 = require("../Entities/ScanEvents");
const Sitios_1 = require("../Entities/Sitios");
const Status_1 = require("../Entities/Status");
const TargetEvents_1 = require("../Entities/TargetEvents");
const Vehicles_1 = require("../Entities/Vehicles");
const Vehicles_types_1 = require("../Entities/Vehicles_types");
const XRayFile_1 = require("../Entities/XRayFile");
const transaction_1 = require("../utils/transaction");
const zonaHoraria_1 = require("../middleware/zonaHoraria");
const SerialNumber_1 = require("../data/SerialNumber");
const eventAssignmentService_1 = require("./eventAssignmentService");
const serialPayloadAuditLogger_1 = require("../utils/serialPayloadAuditLogger");
const sindato = (str) => {
    if (!str || str === "")
        return "Sin Dato";
    return str;
};
const cleanString = (str) => {
    if (!str)
        return "";
    return str.trim().replace(/\s+/g, " ");
};
const FormatRapiscanToBD = (jsonData, localFilePath, pathFile, aduana, region, area, seccion, company, rawUploadPayload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, transaction_1.runInTransaction)(ORMConfig_1.AppDataSource, (queryRunner) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55;
            const target = (_b = (_a = jsonData.UFF) === null || _a === void 0 ? void 0 : _a.Target) === null || _b === void 0 ? void 0 : _b[0];
            const scan = (_d = (_c = jsonData.UFF) === null || _c === void 0 ? void 0 : _c.Scan) === null || _d === void 0 ? void 0 : _d[0];
            const fileName = path_1.default.basename(localFilePath, ".uff");
            const inspectionSystem = {
                Manufacturer: sindato((_g = (_f = (_e = target === null || target === void 0 ? void 0 : target.InspectionSystem) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.Manufacturer) === null || _g === void 0 ? void 0 : _g[0]),
                ModelName: sindato((_k = (_j = (_h = target === null || target === void 0 ? void 0 : target.InspectionSystem) === null || _h === void 0 ? void 0 : _h[0]) === null || _j === void 0 ? void 0 : _j.ModelName) === null || _k === void 0 ? void 0 : _k[0]),
                SerialNumber: sindato((_o = (_m = (_l = target === null || target === void 0 ? void 0 : target.InspectionSystem) === null || _l === void 0 ? void 0 : _l[0]) === null || _m === void 0 ? void 0 : _m.SerialNumber) === null || _o === void 0 ? void 0 : _o[0]),
                Identifier: sindato((_r = (_q = (_p = target === null || target === void 0 ? void 0 : target.InspectionSystem) === null || _p === void 0 ? void 0 : _p[0]) === null || _q === void 0 ? void 0 : _q.Identifier) === null || _r === void 0 ? void 0 : _r[0]),
                Latitude: sindato((_w = (_v = (_u = (_t = (_s = target === null || target === void 0 ? void 0 : target.InspectionSystem) === null || _s === void 0 ? void 0 : _s[0]) === null || _t === void 0 ? void 0 : _t.Location) === null || _u === void 0 ? void 0 : _u[0]) === null || _v === void 0 ? void 0 : _v.Latitude) === null || _w === void 0 ? void 0 : _w[0]),
                Longitude: sindato((_1 = (_0 = (_z = (_y = (_x = target === null || target === void 0 ? void 0 : target.InspectionSystem) === null || _x === void 0 ? void 0 : _x[0]) === null || _y === void 0 ? void 0 : _y.Location) === null || _z === void 0 ? void 0 : _z[0]) === null || _0 === void 0 ? void 0 : _0.Longitude) === null || _1 === void 0 ? void 0 : _1[0]),
            };
            const inspectionSystemSaved = yield queryRunner.manager.save(InspectionSystem_1.InspectionSystem, inspectionSystem);
            const vehicleTypeName = sindato((_4 = (_3 = (_2 = target === null || target === void 0 ? void 0 : target.Vehicle) === null || _2 === void 0 ? void 0 : _2[0]) === null || _3 === void 0 ? void 0 : _3.VehicleType) === null || _4 === void 0 ? void 0 : _4[0]);
            let vehicleType = yield queryRunner.manager.findOne(Vehicles_types_1.Vehicle_types, {
                where: { tipo: vehicleTypeName },
            });
            if (!vehicleType) {
                vehicleType = yield queryRunner.manager.save(Vehicles_types_1.Vehicle_types, {
                    tipo: vehicleTypeName,
                });
            }
            let placaNameSaved = null;
            const placaNameFront = (_7 = (_6 = (_5 = target === null || target === void 0 ? void 0 : target.Vehicle) === null || _5 === void 0 ? void 0 : _5[0]) === null || _6 === void 0 ? void 0 : _6.FrontPlateNum) === null || _7 === void 0 ? void 0 : _7[0];
            const placaNameRear = (_10 = (_9 = (_8 = target === null || target === void 0 ? void 0 : target.Vehicle) === null || _8 === void 0 ? void 0 : _8[0]) === null || _9 === void 0 ? void 0 : _9.RearPlateNum) === null || _10 === void 0 ? void 0 : _10[0];
            if (placaNameFront && placaNameRear) {
                placaNameSaved = yield queryRunner.manager.findOne(Placas_1.Placas, {
                    where: { placa_f: placaNameFront, placa_t: placaNameRear },
                });
                if (!placaNameSaved) {
                    placaNameSaved = yield queryRunner.manager.save(Placas_1.Placas, {
                        placa_f: placaNameFront,
                        placa_t: placaNameRear,
                    });
                }
            }
            else if (placaNameFront) {
                placaNameSaved = yield queryRunner.manager.findOne(Placas_1.Placas, {
                    where: { placa_f: placaNameFront, placa_t: (0, typeorm_1.IsNull)() },
                });
                if (!placaNameSaved) {
                    placaNameSaved = yield queryRunner.manager.save(Placas_1.Placas, {
                        placa_f: placaNameFront,
                        placa_t: null,
                    });
                }
            }
            else if (placaNameRear) {
                placaNameSaved = yield queryRunner.manager.findOne(Placas_1.Placas, {
                    where: { placa_f: (0, typeorm_1.IsNull)(), placa_t: placaNameRear },
                });
                if (!placaNameSaved) {
                    placaNameSaved = yield queryRunner.manager.save(Placas_1.Placas, {
                        placa_f: null,
                        placa_t: placaNameRear,
                    });
                }
            }
            else {
                placaNameSaved = null;
            }
            const vehicle = {
                vehicleNum: sindato((_15 = (_14 = (_13 = (_12 = (_11 = target === null || target === void 0 ? void 0 : target.Vehicle) === null || _11 === void 0 ? void 0 : _11[0]) === null || _12 === void 0 ? void 0 : _12.Container) === null || _13 === void 0 ? void 0 : _13[0]) === null || _14 === void 0 ? void 0 : _14.ContainerNum) === null || _15 === void 0 ? void 0 : _15[0]),
                vin: sindato((_18 = (_17 = (_16 = target === null || target === void 0 ? void 0 : target.Vehicle) === null || _16 === void 0 ? void 0 : _16[0]) === null || _17 === void 0 ? void 0 : _17.VIN) === null || _18 === void 0 ? void 0 : _18[0]),
                vehicle_types_id: vehicleType,
                placas_id: placaNameSaved ? placaNameSaved : null,
            };
            const vehicleSaved = yield queryRunner.manager.save(Vehicles_1.Vehicles, vehicle);
            const targetOutputFiles = ((_19 = target === null || target === void 0 ? void 0 : target.OutputFile) === null || _19 === void 0 ? void 0 : _19.map((output) => {
                var _a, _b, _c, _d;
                return ({
                    Type: sindato((_a = output === null || output === void 0 ? void 0 : output.Type) === null || _a === void 0 ? void 0 : _a[0]),
                    View: sindato((_b = output === null || output === void 0 ? void 0 : output.View) === null || _b === void 0 ? void 0 : _b[0]),
                    URI: sindato((_c = output === null || output === void 0 ? void 0 : output.URI) === null || _c === void 0 ? void 0 : _c[0]),
                    Hash: sindato((_d = output === null || output === void 0 ? void 0 : output.Hash) === null || _d === void 0 ? void 0 : _d[0]),
                });
            })) || [];
            const targetOutputFilesSaved = yield Promise.all(targetOutputFiles.map((output) => queryRunner.manager.save(OutputFiles_1.OutputFiles, output)));
            const scanEvent = {
                scannerCaseId: ((_20 = scan === null || scan === void 0 ? void 0 : scan.EventId) === null || _20 === void 0 ? void 0 : _20[0]) || "default-scannerCaseId",
                digsign: ((_21 = scan === null || scan === void 0 ? void 0 : scan.DigSign) === null || _21 === void 0 ? void 0 : _21[0]) || "example-digsign",
            };
            const scanEventSaved = yield queryRunner.manager.save(ScanEvents_1.ScanEvents, scanEvent);
            const serialNumberToSearch = (_24 = (_23 = (_22 = target === null || target === void 0 ? void 0 : target.InspectionSystem) === null || _22 === void 0 ? void 0 : _22[0]) === null || _23 === void 0 ? void 0 : _23.SerialNumber) === null || _24 === void 0 ? void 0 : _24[0];
            const foundItem = SerialNumber_1.dataSerialNumber.find((item) => item["SerialNumber"] === serialNumberToSearch);
            let sitiosSaved, regionSaved, customSaved, regionHasCustomSaved, customSectionSaved, operationAreaSaved, customHasSectionSaved, sectionHasOperationSaved, equipoResult;
            if (foundItem) {
                region = foundItem.Region;
                area = foundItem.Area;
                seccion = foundItem.Section;
                aduana = foundItem.Custom;
                const cshoResult = yield queryRunner.manager.query(`
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
          `, [
                    foundItem.Region,
                    foundItem.Custom,
                    foundItem.Section,
                    foundItem.Area,
                ]);
                if (!cshoResult || cshoResult.length === 0) {
                    throw new Error("No se encontró la relación custom_section_has_operation");
                }
                sitiosSaved =
                    (_25 = (yield queryRunner.manager.findOne(Sitios_1.Sitios, {
                        where: {
                            customSectionHasOperation_id: { id: cshoResult[0].id },
                        },
                        relations: ["customSectionHasOperation_id"],
                    }))) !== null && _25 !== void 0 ? _25 : undefined;
                customSaved = yield queryRunner.manager.findOne(Customs_1.Customs, {
                    where: { name: aduana },
                });
                customSectionSaved = yield queryRunner.manager.findOne(CustomSection_1.CustomSection, {
                    where: { name: seccion },
                });
                operationAreaSaved = yield queryRunner.manager.findOne(OperationAreas_1.OperationAreas, {
                    where: { name: area },
                });
            }
            else {
                console.log("*************************************************************");
                console.log("*************************************************************\n");
                console.log("No se encontró el número de serie:", serialNumberToSearch);
                console.log("\n*************************************************************");
                console.log("*************************************************************\n");
                region = cleanString(region);
                aduana = cleanString(aduana);
                seccion = cleanString(seccion);
                area = cleanString(area);
                if (area.includes("Export") || area.includes("Exportaci")) {
                    area = "Exportación";
                }
                console.log("area", area, "region", region, "aduana", aduana, "seccion", seccion);
                try {
                    yield queryRunner.startTransaction();
                    regionSaved = yield queryRunner.manager.findOne(Regions_1.Regions, {
                        where: { name: region },
                    });
                    if (!regionSaved) {
                        regionSaved = yield queryRunner.manager.save(Regions_1.Regions, {
                            name: region,
                            clave: region,
                        });
                        console.log("Nueva Region creada:", regionSaved);
                    }
                    else {
                        console.log("Region existente encontrada");
                    }
                    customSaved = yield queryRunner.manager.findOne(Customs_1.Customs, {
                        where: { name: aduana },
                    });
                    if (!customSaved) {
                        customSaved = yield queryRunner.manager.save(Customs_1.Customs, {
                            name: aduana,
                            clave: aduana,
                        });
                        console.log("Nueva Aduana creada:", customSaved);
                    }
                    else {
                        console.log("Aduana existente encontrada");
                    }
                    regionHasCustomSaved = yield queryRunner.manager.findOne(RegionHasCustom_1.RegionHasCustom, {
                        where: {
                            region_id: { id: regionSaved.id },
                            custom_id: { id: customSaved.id },
                        },
                        relations: ["region_id", "custom_id"],
                    });
                    if (!regionHasCustomSaved) {
                        regionHasCustomSaved = yield queryRunner.manager.save(RegionHasCustom_1.RegionHasCustom, {
                            region_id: regionSaved,
                            custom_id: customSaved,
                        });
                        console.log("Nueva relación Region-Custom creada:", regionHasCustomSaved);
                    }
                    else {
                        console.log("Relación Region-Custom existente encontrada");
                    }
                    customSectionSaved = yield queryRunner.manager.findOne(CustomSection_1.CustomSection, {
                        where: { name: seccion },
                    });
                    if (!customSectionSaved) {
                        customSectionSaved = yield queryRunner.manager.save(CustomSection_1.CustomSection, {
                            name: seccion,
                            clave: seccion,
                        });
                        console.log("Nueva Sección creada:", customSectionSaved);
                    }
                    else {
                        console.log("Sección existente encontrada");
                    }
                    operationAreaSaved = yield queryRunner.manager.findOne(OperationAreas_1.OperationAreas, {
                        where: { name: area },
                    });
                    if (!operationAreaSaved) {
                        operationAreaSaved = yield queryRunner.manager.save(OperationAreas_1.OperationAreas, {
                            name: area,
                            clave: area,
                        });
                        console.log("Nueva Área de Operación creada:", operationAreaSaved);
                    }
                    else {
                        console.log("Área de Operación existente encontrada");
                    }
                    customHasSectionSaved = yield queryRunner.manager.findOne(CustomHasCustomSection_1.CustomHasCustomSection, {
                        where: {
                            regionHasCustom_id: { id: regionHasCustomSaved.id },
                            customSection_id: { id: customSectionSaved.id },
                        },
                        relations: ["regionHasCustom_id", "customSection_id"],
                    });
                    if (!customHasSectionSaved) {
                        customHasSectionSaved = yield queryRunner.manager.save(CustomHasCustomSection_1.CustomHasCustomSection, {
                            regionHasCustom_id: regionHasCustomSaved,
                            customSection_id: customSectionSaved,
                        });
                        console.log("Nueva relación Custom-Sección creada:", customHasSectionSaved);
                    }
                    else {
                        console.log("Relación Custom-Sección existente encontrada");
                    }
                    sectionHasOperationSaved = yield queryRunner.manager.findOne(CustomSectionHasOperation_1.CustomSectionHasOperation, {
                        where: {
                            customHasCustomSection_id: { id: customHasSectionSaved.id },
                            operationAreas_id: { id: operationAreaSaved.id },
                        },
                    });
                    if (!sectionHasOperationSaved) {
                        sectionHasOperationSaved = yield queryRunner.manager.save(CustomSectionHasOperation_1.CustomSectionHasOperation, {
                            customHasCustomSection_id: customHasSectionSaved,
                            operationAreas_id: operationAreaSaved,
                        });
                        console.log("Nueva relación Sección-Área creada:", sectionHasOperationSaved);
                    }
                    else {
                        console.log("Relación Sección-Área existente encontrada");
                    }
                    sitiosSaved = yield queryRunner.manager.findOne(Sitios_1.Sitios, {
                        where: {
                            customSectionHasOperation_id: { id: sectionHasOperationSaved.id },
                        },
                    });
                    if (!sitiosSaved) {
                        sitiosSaved = yield queryRunner.manager.save(Sitios_1.Sitios, {
                            customSectionHasOperation_id: sectionHasOperationSaved,
                            status: true,
                        });
                        console.log("Nuevo Sitio creado:", sitiosSaved);
                    }
                    else {
                        console.log("Sitio existente encontrado");
                    }
                    yield queryRunner.commitTransaction();
                    console.log("Nuevos datos guardados correctamente:", {
                        region: regionSaved,
                        custom: customSaved,
                        section: customSectionSaved,
                        operationArea: operationAreaSaved,
                        sitio: sitiosSaved,
                    });
                }
                catch (error) {
                    yield queryRunner.rollbackTransaction();
                    console.error("Error al guardar los datos:", error);
                    throw error;
                }
            }
            const timestampOriginal = (_26 = target === null || target === void 0 ? void 0 : target.TimeStamp) === null || _26 === void 0 ? void 0 : _26[0];
            const conversion = (0, zonaHoraria_1.convertirTimestampConZonas)(aduana, timestampOriginal);
            const result = ((_27 = customSaved === null || customSaved === void 0 ? void 0 : customSaved.clave) !== null && _27 !== void 0 ? _27 : "0") +
                " " +
                ((_28 = customSectionSaved === null || customSectionSaved === void 0 ? void 0 : customSectionSaved.clave) !== null && _28 !== void 0 ? _28 : "0") +
                " " +
                ((_29 = operationAreaSaved === null || operationAreaSaved === void 0 ? void 0 : operationAreaSaved.clave) !== null && _29 !== void 0 ? _29 : "0") +
                " " +
                ((_33 = (_32 = (_31 = (_30 = target === null || target === void 0 ? void 0 : target.InspectionSystem) === null || _30 === void 0 ? void 0 : _30[0]) === null || _31 === void 0 ? void 0 : _31.SerialNumber) === null || _32 === void 0 ? void 0 : _32[0]) !== null && _33 !== void 0 ? _33 : "0");
            const keyEvent = conversion.timestampLimpio + result;
            yield (0, serialPayloadAuditLogger_1.writeSerialPayloadAuditIfNeeded)(serialNumberToSearch, rawUploadPayload, {
                processor: "FormatRapiscanToBD",
                eventKey: keyEvent,
                area,
                aduana,
                region,
                seccion,
                company,
            });
            const fechaBienFin = new Date(conversion.horaCentro);
            let equiposHasSitiosSaved = yield queryRunner.manager.findOne(EquiposHasSitios_1.EquiposHasSitios, {
                where: { serie: serialNumberToSearch },
            });
            if (!equiposHasSitiosSaved) {
                let equipoName = foundItem === null || foundItem === void 0 ? void 0 : foundItem.Model;
                if (!equipoName || equipoName === "") {
                    equipoName = ((_36 = (_35 = (_34 = target === null || target === void 0 ? void 0 : target.InspectionSystem) === null || _34 === void 0 ? void 0 : _34[0]) === null || _35 === void 0 ? void 0 : _35.ModelName) === null || _36 === void 0 ? void 0 : _36[0]) || "General";
                }
                let equipoSaved = yield queryRunner.manager.findOne(Equipos_1.Equipos, {
                    where: { name: equipoName },
                });
                if (!equipoSaved) {
                    equipoSaved = yield queryRunner.manager.save(Equipos_1.Equipos, {
                        name: equipoName,
                    });
                }
                equiposHasSitiosSaved = yield queryRunner.manager.findOne(EquiposHasSitios_1.EquiposHasSitios, {
                    where: {
                        sitios_id: { id: sitiosSaved.id },
                        equipos_id: { id: equipoSaved.id },
                    },
                });
                if (!equiposHasSitiosSaved) {
                    equiposHasSitiosSaved = yield queryRunner.manager.save(EquiposHasSitios_1.EquiposHasSitios, {
                        sitios_id: sitiosSaved,
                        equipos_id: equipoSaved,
                        serie: serialNumberToSearch,
                    });
                }
            }
            const event = {
                eventName: (_37 = target === null || target === void 0 ? void 0 : target.EventId) === null || _37 === void 0 ? void 0 : _37[0],
                aduana: aduana,
                region: region,
                area: area,
                seccion: seccion,
                company: company,
                eventKey: keyEvent,
                routeFile: pathFile,
                dateInspection: fechaBienFin,
                Comment: sindato((_38 = target === null || target === void 0 ? void 0 : target.Comment) === null || _38 === void 0 ? void 0 : _38[0]),
                inspectionSystem: inspectionSystemSaved,
                scanEvents: [scanEventSaved],
                sitios: sitiosSaved,
                equipos: equiposHasSitiosSaved,
            };
            const eventSaved = yield queryRunner.manager.save(Events_1.Events, event);
            let status = yield queryRunner.manager.findOne(Status_1.Status, {
                where: { name: "Pendiente" },
            });
            if (!status) {
                status = yield queryRunner.manager.save(Status_1.Status, { name: "Pendiente" });
            }
            const placaHasEvents = {
                placas: placaNameSaved ? placaNameSaved : null,
                events: eventSaved,
                status: status,
            };
            yield queryRunner.manager.save(PlacaHasEvents_1.PlacasHasEvents, placaHasEvents);
            const targetEvent = {
                comment: sindato((_39 = target === null || target === void 0 ? void 0 : target.Comment) === null || _39 === void 0 ? void 0 : _39[0]),
                vehicles: vehicleSaved,
                outputFiles: targetOutputFilesSaved[0],
                events: eventSaved,
            };
            const targetEventSaved = yield queryRunner.manager.save(TargetEvents_1.TargetEvents, targetEvent);
            const operator = {
                FirstName: sindato((_42 = (_41 = (_40 = target === null || target === void 0 ? void 0 : target.Operator) === null || _40 === void 0 ? void 0 : _40[0]) === null || _41 === void 0 ? void 0 : _41.FirstName) === null || _42 === void 0 ? void 0 : _42[0]),
                LastName: sindato((_45 = (_44 = (_43 = target === null || target === void 0 ? void 0 : target.Operator) === null || _43 === void 0 ? void 0 : _43[0]) === null || _44 === void 0 ? void 0 : _44.LastName) === null || _45 === void 0 ? void 0 : _45[0]),
                Role: sindato((_48 = (_47 = (_46 = target === null || target === void 0 ? void 0 : target.Operator) === null || _46 === void 0 ? void 0 : _46[0]) === null || _47 === void 0 ? void 0 : _47.Role) === null || _48 === void 0 ? void 0 : _48[0]),
                LoginName: sindato((_51 = (_50 = (_49 = target === null || target === void 0 ? void 0 : target.Operator) === null || _49 === void 0 ? void 0 : _49[0]) === null || _50 === void 0 ? void 0 : _50.LoginName) === null || _51 === void 0 ? void 0 : _51[0]),
                Company: sindato((_54 = (_53 = (_52 = target === null || target === void 0 ? void 0 : target.Operator) === null || _52 === void 0 ? void 0 : _52[0]) === null || _53 === void 0 ? void 0 : _53.Company) === null || _54 === void 0 ? void 0 : _54[0]),
                targetEvents: targetEventSaved,
            };
            const operatorSaved = yield queryRunner.manager.save(Operators_1.Operators, operator);
            const scanOutputFiles = ((_55 = scan === null || scan === void 0 ? void 0 : scan.OutputFile) === null || _55 === void 0 ? void 0 : _55.map((output) => {
                var _a, _b, _c, _d, _e;
                return ({
                    Type: sindato((_a = output === null || output === void 0 ? void 0 : output.Type) === null || _a === void 0 ? void 0 : _a[0]),
                    View: sindato((_b = output === null || output === void 0 ? void 0 : output.View) === null || _b === void 0 ? void 0 : _b[0]),
                    URI: sindato((_c = output === null || output === void 0 ? void 0 : output.URI) === null || _c === void 0 ? void 0 : _c[0]),
                    Hash: sindato((_d = output === null || output === void 0 ? void 0 : output.Hash) === null || _d === void 0 ? void 0 : _d[0]),
                    Name: sindato((_e = output === null || output === void 0 ? void 0 : output.Name) === null || _e === void 0 ? void 0 : _e[0]),
                });
            })) || [];
            const scanOutputFilesSaved = yield Promise.all(scanOutputFiles.map((output) => queryRunner.manager.save(OutputFiles_1.OutputFiles, Object.assign(Object.assign({}, output), { scanEvents: scanEventSaved }))));
            const xRayFiles = ((scan === null || scan === void 0 ? void 0 : scan.XRayFile) || []).map((xray) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
                const baseData = {
                    type: sindato((_a = xray === null || xray === void 0 ? void 0 : xray.Type) === null || _a === void 0 ? void 0 : _a[0]),
                    view: sindato((_b = xray === null || xray === void 0 ? void 0 : xray.View) === null || _b === void 0 ? void 0 : _b[0]),
                    energy: sindato((_c = xray === null || xray === void 0 ? void 0 : xray.Energy) === null || _c === void 0 ? void 0 : _c[0]),
                    modality: sindato((_d = xray === null || xray === void 0 ? void 0 : xray.Modality) === null || _d === void 0 ? void 0 : _d[0]),
                    hemdInfo: sindato((_g = (_f = (_e = xray === null || xray === void 0 ? void 0 : xray.HEMDInfo) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.HEMDFileURI) === null || _g === void 0 ? void 0 : _g[0]),
                    scanEvents: scanEventSaved,
                };
                let registros = [];
                const uri = (_h = xray === null || xray === void 0 ? void 0 : xray.URI) === null || _h === void 0 ? void 0 : _h[0];
                const hemdUri = (_l = (_k = (_j = xray === null || xray === void 0 ? void 0 : xray.HEMDInfo) === null || _j === void 0 ? void 0 : _j[0]) === null || _k === void 0 ? void 0 : _k.HEMDFileURI) === null || _l === void 0 ? void 0 : _l[0];
                if (uri !== undefined) {
                    registros.push(Object.assign(Object.assign({}, baseData), { uri: sindato(uri), hemdInfo: hemdUri ? sindato(hemdUri) : null }));
                }
                if (hemdUri !== undefined) {
                    registros.push(Object.assign(Object.assign({}, baseData), { uri: sindato(hemdUri), hemdInfo: sindato(hemdUri) }));
                }
                return registros;
            }) || [];
            const xRayFilesSaved = yield Promise.all(xRayFiles.map((xray) => queryRunner.manager.save(XRayFile_1.XRayFile, xray)));
            // Asignar automáticamente analista al evento
            if (sitiosSaved) {
                yield (0, eventAssignmentService_1.assignAnalistaToNewEvent)(eventSaved, sitiosSaved, queryRunner);
            }
            const formattedData = {
                eventName: eventSaved.eventName,
            };
            return formattedData;
        }));
    }
    catch (error) {
        console.log("error", error.message);
        process.exit(1);
    }
});
exports.FormatRapiscanToBD = FormatRapiscanToBD;
//# sourceMappingURL=FormatRapiscanToBD.js.map