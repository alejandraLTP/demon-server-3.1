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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatNuctechToBD = void 0;
const typeorm_1 = require("typeorm");
const ORMConfig_1 = require("../config/ORMConfig");
const Events_1 = require("../Entities/Events");
const InspectionSystem_1 = require("../Entities/InspectionSystem");
const Operators_1 = require("../Entities/Operators");
const OutputFiles_1 = require("../Entities/OutputFiles");
const PlacaHasEvents_1 = require("../Entities/PlacaHasEvents");
const Placas_1 = require("../Entities/Placas");
const ScanEvents_1 = require("../Entities/ScanEvents");
const Status_1 = require("../Entities/Status");
const TargetEvents_1 = require("../Entities/TargetEvents");
const Vehicles_1 = require("../Entities/Vehicles");
const Vehicles_types_1 = require("../Entities/Vehicles_types");
const XRayFile_1 = require("../Entities/XRayFile");
const transaction_1 = require("../utils/transaction");
const RegionHasCustom_1 = require("../Entities/RegionHasCustom");
const Customs_1 = require("../Entities/Customs");
const CustomSection_1 = require("../Entities/CustomSection");
const OperationAreas_1 = require("../Entities/OperationAreas");
const Regions_1 = require("../Entities/Regions");
const CustomHasCustomSection_1 = require("../Entities/CustomHasCustomSection");
const CustomSectionHasOperation_1 = require("../Entities/CustomSectionHasOperation");
const Sitios_1 = require("../Entities/Sitios");
const NuctechClave_1 = require("../data/NuctechClave");
const eventAssignmentService_1 = require("./eventAssignmentService");
const serialPayloadAuditLogger_1 = require("../utils/serialPayloadAuditLogger");
const sindato = (str) => {
    if (!str || str === "")
        return "Sin Dato";
    return str;
};
const FormatNuctechToBD = (jsonData, aduana, region, area, seccion, company, localFilePath, pathFile, rawUploadPayload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, transaction_1.runInTransaction)(ORMConfig_1.AppDataSource, (queryRunner) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53;
            const target = (_b = (_a = jsonData.UFF) === null || _a === void 0 ? void 0 : _a.Target) === null || _b === void 0 ? void 0 : _b[0];
            const scan = (_d = (_c = jsonData.UFF) === null || _c === void 0 ? void 0 : _c.Scan) === null || _d === void 0 ? void 0 : _d[0];
            const analysis = (_f = (_e = jsonData.UFF) === null || _e === void 0 ? void 0 : _e.Analysis) === null || _f === void 0 ? void 0 : _f[0];
            const inspectionSystem = {
                Manufacturer: sindato((_j = (_h = (_g = target === null || target === void 0 ? void 0 : target.InspectionSystem) === null || _g === void 0 ? void 0 : _g[0]) === null || _h === void 0 ? void 0 : _h.Manufacturer) === null || _j === void 0 ? void 0 : _j[0]),
                ModelName: sindato((_m = (_l = (_k = target === null || target === void 0 ? void 0 : target.InspectionSystem) === null || _k === void 0 ? void 0 : _k[0]) === null || _l === void 0 ? void 0 : _l.ModelName) === null || _m === void 0 ? void 0 : _m[0]),
                SerialNumber: sindato((_q = (_p = (_o = target === null || target === void 0 ? void 0 : target.InspectionSystem) === null || _o === void 0 ? void 0 : _o[0]) === null || _p === void 0 ? void 0 : _p.SerialNumber) === null || _q === void 0 ? void 0 : _q[0]),
                Identifier: sindato((_t = (_s = (_r = target === null || target === void 0 ? void 0 : target.InspectionSystem) === null || _r === void 0 ? void 0 : _r[0]) === null || _s === void 0 ? void 0 : _s.Identifier) === null || _t === void 0 ? void 0 : _t[0]),
                Country: sindato((_w = (_v = (_u = target === null || target === void 0 ? void 0 : target.InspectionSystem) === null || _u === void 0 ? void 0 : _u[0]) === null || _v === void 0 ? void 0 : _v.Country) === null || _w === void 0 ? void 0 : _w[0]),
            };
            const inspectionSystemSaved = yield queryRunner.manager.save(InspectionSystem_1.InspectionSystem, inspectionSystem);
            const vehicleTypeName = sindato((_z = (_y = (_x = target === null || target === void 0 ? void 0 : target.Vehicle) === null || _x === void 0 ? void 0 : _x[0]) === null || _y === void 0 ? void 0 : _y.VehicleType) === null || _z === void 0 ? void 0 : _z[0]);
            let vehicleType = yield queryRunner.manager.findOne(Vehicles_types_1.Vehicle_types, {
                where: { tipo: vehicleTypeName },
            });
            if (!vehicleType) {
                vehicleType = yield queryRunner.manager.save(Vehicles_types_1.Vehicle_types, {
                    tipo: vehicleTypeName,
                });
            }
            let placaNameSaved = null;
            const placaNameFront = (_2 = (_1 = (_0 = target === null || target === void 0 ? void 0 : target.Vehicle) === null || _0 === void 0 ? void 0 : _0[0]) === null || _1 === void 0 ? void 0 : _1.FrontPlateNum) === null || _2 === void 0 ? void 0 : _2[0];
            const placaNameRear = (_5 = (_4 = (_3 = target === null || target === void 0 ? void 0 : target.Vehicle) === null || _3 === void 0 ? void 0 : _3[0]) === null || _4 === void 0 ? void 0 : _4.RearPlateNum) === null || _5 === void 0 ? void 0 : _5[0];
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
                vehicleNum: sindato((_10 = (_9 = (_8 = (_7 = (_6 = target === null || target === void 0 ? void 0 : target.Vehicle) === null || _6 === void 0 ? void 0 : _6[0]) === null || _7 === void 0 ? void 0 : _7.Container) === null || _8 === void 0 ? void 0 : _8[0]) === null || _9 === void 0 ? void 0 : _9.ContainerNum) === null || _10 === void 0 ? void 0 : _10[0]),
                vin: sindato((_13 = (_12 = (_11 = target === null || target === void 0 ? void 0 : target.Vehicle) === null || _11 === void 0 ? void 0 : _11[0]) === null || _12 === void 0 ? void 0 : _12.VIN) === null || _13 === void 0 ? void 0 : _13[0]),
                vehicle_types_id: vehicleType,
                placas_id: placaNameSaved ? placaNameSaved : null,
            };
            const vehicleSaved = yield queryRunner.manager.save(Vehicles_1.Vehicles, vehicle);
            const operator = {
                FirstName: sindato((_16 = (_15 = (_14 = target === null || target === void 0 ? void 0 : target.Operator) === null || _14 === void 0 ? void 0 : _14[0]) === null || _15 === void 0 ? void 0 : _15.FirstName) === null || _16 === void 0 ? void 0 : _16[0]),
                LastName: sindato((_19 = (_18 = (_17 = target === null || target === void 0 ? void 0 : target.Operator) === null || _17 === void 0 ? void 0 : _17[0]) === null || _18 === void 0 ? void 0 : _18.LastName) === null || _19 === void 0 ? void 0 : _19[0]),
                LoginName: sindato((_22 = (_21 = (_20 = target === null || target === void 0 ? void 0 : target.Operator) === null || _20 === void 0 ? void 0 : _20[0]) === null || _21 === void 0 ? void 0 : _21.LoginName) === null || _22 === void 0 ? void 0 : _22[0]),
                Role: sindato((_25 = (_24 = (_23 = target === null || target === void 0 ? void 0 : target.Operator) === null || _23 === void 0 ? void 0 : _23[0]) === null || _24 === void 0 ? void 0 : _24.Role) === null || _25 === void 0 ? void 0 : _25[0]),
            };
            const operatorSaved = yield queryRunner.manager.save(Operators_1.Operators, operator);
            const targetOutputFiles = ((_26 = target === null || target === void 0 ? void 0 : target.OutputFile) === null || _26 === void 0 ? void 0 : _26.map((output) => {
                var _a, _b, _c, _d;
                return ({
                    Type: sindato((_a = output === null || output === void 0 ? void 0 : output.Type) === null || _a === void 0 ? void 0 : _a[0]),
                    View: sindato((_b = output === null || output === void 0 ? void 0 : output.View) === null || _b === void 0 ? void 0 : _b[0]),
                    URI: sindato((_c = output === null || output === void 0 ? void 0 : output.URI) === null || _c === void 0 ? void 0 : _c[0]),
                    Hash: sindato((_d = output === null || output === void 0 ? void 0 : output.Hash) === null || _d === void 0 ? void 0 : _d[0]),
                });
            })) || [];
            const targetOutputFilesSaved = yield Promise.all(targetOutputFiles.map((output) => queryRunner.manager.save(OutputFiles_1.OutputFiles, output)));
            const scanOutputFiles = ((_27 = scan === null || scan === void 0 ? void 0 : scan.OutputFile) === null || _27 === void 0 ? void 0 : _27.map((output) => {
                var _a, _b, _c, _d, _e;
                return ({
                    Type: sindato((_a = output === null || output === void 0 ? void 0 : output.Type) === null || _a === void 0 ? void 0 : _a[0]),
                    View: sindato((_b = output === null || output === void 0 ? void 0 : output.View) === null || _b === void 0 ? void 0 : _b[0]),
                    URI: sindato((_c = output === null || output === void 0 ? void 0 : output.URI) === null || _c === void 0 ? void 0 : _c[0]),
                    Hash: sindato((_d = output === null || output === void 0 ? void 0 : output.Hash) === null || _d === void 0 ? void 0 : _d[0]),
                    Name: sindato((_e = output === null || output === void 0 ? void 0 : output.Name) === null || _e === void 0 ? void 0 : _e[0]),
                });
            })) || [];
            const scanOutputFilesSaved = yield Promise.all(scanOutputFiles.map((output) => queryRunner.manager.save(OutputFiles_1.OutputFiles, output)));
            const targetEvent = {
                comment: sindato((_28 = target === null || target === void 0 ? void 0 : target.Comment) === null || _28 === void 0 ? void 0 : _28[0]),
                timeStamp: new Date((_29 = target === null || target === void 0 ? void 0 : target.TimeStamp) === null || _29 === void 0 ? void 0 : _29[0]),
                digSign: sindato((_30 = target === null || target === void 0 ? void 0 : target.DigSign) === null || _30 === void 0 ? void 0 : _30[0]),
                vehicles: vehicleSaved,
                operators: [operatorSaved],
                outputFiles: targetOutputFilesSaved[0],
            };
            const targetEventSaved = yield queryRunner.manager.save(TargetEvents_1.TargetEvents, targetEvent);
            const xRayFiles = ((_31 = scan === null || scan === void 0 ? void 0 : scan.XRayFile) === null || _31 === void 0 ? void 0 : _31.map((xray) => {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                return ({
                    uri: sindato((_a = xray === null || xray === void 0 ? void 0 : xray.URI) === null || _a === void 0 ? void 0 : _a[0]),
                    type: sindato((_b = xray === null || xray === void 0 ? void 0 : xray.Type) === null || _b === void 0 ? void 0 : _b[0]),
                    view: sindato((_c = xray === null || xray === void 0 ? void 0 : xray.View) === null || _c === void 0 ? void 0 : _c[0]),
                    energy: sindato((_d = xray === null || xray === void 0 ? void 0 : xray.Energy) === null || _d === void 0 ? void 0 : _d[0]),
                    modality: sindato((_e = xray === null || xray === void 0 ? void 0 : xray.Modality) === null || _e === void 0 ? void 0 : _e[0]),
                    hemdInfo: sindato((_h = (_g = (_f = xray === null || xray === void 0 ? void 0 : xray.HEMDInfo) === null || _f === void 0 ? void 0 : _f[0]) === null || _g === void 0 ? void 0 : _g.HEMDFileURI) === null || _h === void 0 ? void 0 : _h[0]),
                });
            })) || [];
            const xRayFilesSaved = yield Promise.all(xRayFiles.map((xray) => queryRunner.manager.save(XRayFile_1.XRayFile, xray)));
            const scanEvent = {
                scannerCaseId: ((_32 = scan === null || scan === void 0 ? void 0 : scan.ScannerCaseId) === null || _32 === void 0 ? void 0 : _32[0]) || "default-scannerCaseId",
                digsign: ((_33 = scan === null || scan === void 0 ? void 0 : scan.DigSign) === null || _33 === void 0 ? void 0 : _33[0]) || "example-digsign",
                xRayFile: xRayFilesSaved,
                outputFiles: scanOutputFilesSaved,
            };
            const scanEventSaved = yield queryRunner.manager.save(ScanEvents_1.ScanEvents, scanEvent);
            let regionSaved = yield queryRunner.manager.findOne(Regions_1.Regions, {
                where: { name: region },
            });
            let customSaved = yield queryRunner.manager.findOne(Customs_1.Customs, {
                where: { name: aduana },
            });
            let customSectionSaved = yield queryRunner.manager.findOne(CustomSection_1.CustomSection, {
                where: { name: seccion },
            });
            let operationAreaSaved = yield queryRunner.manager.findOne(OperationAreas_1.OperationAreas, {
                where: { name: area },
            });
            let regionHasCustomSaved = yield queryRunner.manager.findOne(RegionHasCustom_1.RegionHasCustom, {
                where: {
                    region_id: { id: regionSaved.id },
                    custom_id: { id: customSaved.id },
                },
                relations: ["region_id", "custom_id"],
            });
            if (!regionHasCustomSaved) {
                if (regionSaved && customSaved) {
                    regionHasCustomSaved = yield queryRunner.manager.save(RegionHasCustom_1.RegionHasCustom, {
                        region_id: regionSaved,
                        custom_id: customSaved,
                    });
                }
            }
            let customHasSectionSaved = yield queryRunner.manager.findOne(CustomHasCustomSection_1.CustomHasCustomSection, {
                where: {
                    regionHasCustom_id: { id: regionHasCustomSaved.id },
                    customSection_id: { id: customSectionSaved.id },
                },
                relations: ["regionHasCustom_id", "customSection_id"],
            });
            if (!customHasSectionSaved) {
                if (regionHasCustomSaved && customSectionSaved) {
                    customHasSectionSaved = yield queryRunner.manager.save(CustomHasCustomSection_1.CustomHasCustomSection, {
                        regionHasCustom_id: regionHasCustomSaved,
                        customSection_id: customSectionSaved,
                    });
                }
            }
            let sectionHasOperationSaved = yield queryRunner.manager.findOne(CustomSectionHasOperation_1.CustomSectionHasOperation, {
                where: {
                    customHasCustomSection_id: { id: customHasSectionSaved.id },
                    operationAreas_id: { id: operationAreaSaved.id },
                },
                relations: ["customHasCustomSection_id", "operationAreas_id"],
            });
            if (!sectionHasOperationSaved) {
                if (customHasSectionSaved && operationAreaSaved) {
                    sectionHasOperationSaved = yield queryRunner.manager.save(CustomSectionHasOperation_1.CustomSectionHasOperation, {
                        customHasCustomSection_id: customHasSectionSaved,
                        operationAreas_id: operationAreaSaved,
                    });
                }
            }
            let sitiosSaved = yield queryRunner.manager.findOne(Sitios_1.Sitios, {
                where: {
                    customSectionHasOperation_id: { id: sectionHasOperationSaved.id },
                },
            });
            let status = yield queryRunner.manager.findOne(Status_1.Status, {
                where: { name: "Pendiente" },
            });
            if (!status) {
                status = yield queryRunner.manager.save(Status_1.Status, {
                    name: "Pendiente",
                });
            }
            let claveEquipo = (_36 = (_35 = (_34 = target === null || target === void 0 ? void 0 : target.InspectionSystem) === null || _34 === void 0 ? void 0 : _34[0]) === null || _35 === void 0 ? void 0 : _35.ModelName) === null || _36 === void 0 ? void 0 : _36[0];
            if (claveEquipo || claveEquipo === "" || claveEquipo.length > 0) {
                //Seleccionar clave Nuctech.json segun serialNumber
                claveEquipo = NuctechClave_1.NuctechClaveData.find((item) => item.serialNumber === claveEquipo);
            }
            const result = ((_37 = customSaved === null || customSaved === void 0 ? void 0 : customSaved.clave) !== null && _37 !== void 0 ? _37 : "0") +
                " " +
                ((_38 = customSectionSaved === null || customSectionSaved === void 0 ? void 0 : customSectionSaved.clave) !== null && _38 !== void 0 ? _38 : "0") +
                " " +
                ((_39 = operationAreaSaved === null || operationAreaSaved === void 0 ? void 0 : operationAreaSaved.clave) !== null && _39 !== void 0 ? _39 : "0") +
                " " +
                ((_42 = (_41 = (_40 = target === null || target === void 0 ? void 0 : target.InspectionSystem) === null || _40 === void 0 ? void 0 : _40[0]) === null || _41 === void 0 ? void 0 : _41.ModelName[0].split("").slice(-4).join("")) !== null && _42 !== void 0 ? _42 : "0") +
                ((_46 = (_45 = (_44 = (_43 = target === null || target === void 0 ? void 0 : target.InspectionSystem) === null || _43 === void 0 ? void 0 : _43[0]) === null || _44 === void 0 ? void 0 : _44.SerialNumber) === null || _45 === void 0 ? void 0 : _45[0].slice(-4)) !== null && _46 !== void 0 ? _46 : "0") +
                " " +
                (claveEquipo === null || claveEquipo === void 0 ? void 0 : claveEquipo.clave);
            const cleanDate = (_47 = target === null || target === void 0 ? void 0 : target.TimeStamp) === null || _47 === void 0 ? void 0 : _47[0].replace(/\D/g, "");
            let keyEvent = cleanDate + " " + result;
            const detectedSerial = (_50 = (_49 = (_48 = target === null || target === void 0 ? void 0 : target.InspectionSystem) === null || _48 === void 0 ? void 0 : _48[0]) === null || _49 === void 0 ? void 0 : _49.SerialNumber) === null || _50 === void 0 ? void 0 : _50[0];
            yield (0, serialPayloadAuditLogger_1.writeSerialPayloadAuditIfNeeded)(detectedSerial, rawUploadPayload, {
                processor: "FormatNuctechToBD",
                eventKey: keyEvent,
                area,
                aduana,
                region,
                seccion,
                company,
            });
            const event = {
                eventName: (_51 = target === null || target === void 0 ? void 0 : target.EventId) === null || _51 === void 0 ? void 0 : _51[0],
                aduana: aduana,
                region: region,
                area: area,
                seccion: seccion,
                company: company,
                eventKey: keyEvent,
                routeFile: pathFile,
                dateInspection: new Date((_52 = target === null || target === void 0 ? void 0 : target.TimeStamp) === null || _52 === void 0 ? void 0 : _52[0]),
                Comment: sindato((_53 = target === null || target === void 0 ? void 0 : target.Comment) === null || _53 === void 0 ? void 0 : _53[0]),
                inspectionSystem: inspectionSystemSaved,
                scanEvents: [scanEventSaved],
                sitios: sitiosSaved,
            };
            const eventSaved = yield queryRunner.manager.save(Events_1.Events, event);
            const placaHasEvents = {
                placas: placaNameSaved ? placaNameSaved : null,
                events: eventSaved,
                status: status,
            };
            yield queryRunner.manager.save(PlacaHasEvents_1.PlacasHasEvents, placaHasEvents);
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
        console.error(error);
        process.exit(1);
    }
});
exports.FormatNuctechToBD = FormatNuctechToBD;
//# sourceMappingURL=FormatNuctechToBD.js.map