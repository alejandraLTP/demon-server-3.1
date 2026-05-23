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
exports.uploadFile = void 0;
const logger_1 = require("../config/logger");
const fileHandler_1 = require("../services/fileHandler");
const uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10;
    const file = req.file;
    const { aduana, region, area, seccion, vpn, company } = req.body;
    const uploadCorrelationKey = [
        (_d = (_c = (_a = req.headers["x-forwarded-for"]) !== null && _a !== void 0 ? _a : (_b = req.socket) === null || _b === void 0 ? void 0 : _b.remoteAddress) !== null && _c !== void 0 ? _c : req.ip) !== null && _d !== void 0 ? _d : "unknown-ip",
        (_e = req.headers["user-agent"]) !== null && _e !== void 0 ? _e : "unknown-agent",
        (_g = (_f = req.endUser) === null || _f === void 0 ? void 0 : _f.username) !== null && _g !== void 0 ? _g : "unknown-user",
    ].join("|");
    const uploadSource = {
        aduana: aduana !== null && aduana !== void 0 ? aduana : req.headers["x-aduana"],
        equipo: (_l = (_k = (_j = (_h = req.body) === null || _h === void 0 ? void 0 : _h.equipo) !== null && _j !== void 0 ? _j : req.headers["x-equipo"]) !== null && _k !== void 0 ? _k : req.headers["x-device-id"]) !== null && _l !== void 0 ? _l : req.hostname,
        region,
        area,
        seccion,
        vpn,
        company,
        ip: (_q = (_p = (_m = req.headers["x-forwarded-for"]) !== null && _m !== void 0 ? _m : (_o = req.socket) === null || _o === void 0 ? void 0 : _o.remoteAddress) !== null && _p !== void 0 ? _p : req.ip) !== null && _q !== void 0 ? _q : "unknown",
        userAgent: (_r = req.headers["user-agent"]) !== null && _r !== void 0 ? _r : "unknown",
    };
    const rawUploadPayload = {
        source: uploadSource,
        authContext: (_s = req.endUser) !== null && _s !== void 0 ? _s : null,
        uploadCorrelationKey,
        body: (_t = req.body) !== null && _t !== void 0 ? _t : {},
        headers: (_u = req.headers) !== null && _u !== void 0 ? _u : {},
        fileName: (_v = file === null || file === void 0 ? void 0 : file.originalname) !== null && _v !== void 0 ? _v : null,
    };
    (0, logger_1.uploadTrace)({
        phase: "UploadSource",
        component: "uploadFile",
        payload: Object.assign({ message: "Intento de upload recibido" }, rawUploadPayload),
    });
    if (!file) {
        console.log("[UPLOAD_ERROR_REQUEST_BODY]", (_w = req.body) !== null && _w !== void 0 ? _w : {});
        console.log("[UPLOAD_ERROR_REQUEST_HEADERS]", (_x = req.headers) !== null && _x !== void 0 ? _x : {});
        (0, logger_1.uploadError)({
            phase: "Upload",
            component: "uploadFile",
            payload: {
                message: "No se ha proporcionado ningún archivo.",
                source: uploadSource,
                authContext: (_y = req.endUser) !== null && _y !== void 0 ? _y : null,
                uploadCorrelationKey,
                body: (_z = req.body) !== null && _z !== void 0 ? _z : {},
                headers: (_0 = req.headers) !== null && _0 !== void 0 ? _0 : {},
            },
        });
        (0, logger_1.error)({
            phase: "Upload",
            payload: {
                message: "No se ha proporcionado ningún archivo.",
            },
        });
        res.status(400).json({ message: "No se ha proporcionado ningún archivo." });
        return;
    }
    // Validar que todos los parámetros requeridos estén presentes
    const requiredParams = { region, aduana, area, seccion };
    const missingParams = Object.entries(requiredParams)
        .filter(([, value]) => !value)
        .map(([key]) => key);
    if (missingParams.length > 0) {
        (0, logger_1.uploadError)({
            phase: "Upload",
            component: "uploadFile",
            payload: {
                message: `Parámetros faltantes: ${missingParams.join(", ")}`,
                source: uploadSource,
                authContext: (_1 = req.endUser) !== null && _1 !== void 0 ? _1 : null,
                uploadCorrelationKey,
                body: (_2 = req.body) !== null && _2 !== void 0 ? _2 : {},
                headers: (_3 = req.headers) !== null && _3 !== void 0 ? _3 : {},
            },
        });
        (0, logger_1.error)({
            phase: "Upload",
            payload: {
                message: `Parámetros faltantes: ${missingParams.join(", ")}`,
            },
        });
        res.status(400).json({
            message: "Parámetros incompletos.",
            missingParams,
        });
        return;
    }
    try {
        const authHeader = req.headers.authorization || "";
        const token = authHeader.startsWith("Bearer ") ? authHeader : null;
        yield (0, fileHandler_1.handleFileUpload)(file, aduana, region, area, seccion, company, rawUploadPayload, token);
        (0, logger_1.info)({
            phase: "Upload",
            payload: {
                message: `Archivo ${file.originalname} procesado exitosamente.`,
            },
        });
        (0, logger_1.uploadTrace)({
            phase: "UploadSuccess",
            component: "uploadFile",
            payload: {
                message: "Upload procesado correctamente",
                source: uploadSource,
                authContext: (_4 = req.endUser) !== null && _4 !== void 0 ? _4 : null,
                uploadCorrelationKey,
                fileName: file.originalname,
            },
        });
        res.json({ message: "Archivo recibido." });
    }
    catch (err) {
        console.log("[UPLOAD_ERROR_REQUEST_BODY]", (_5 = req.body) !== null && _5 !== void 0 ? _5 : {});
        console.log("[UPLOAD_ERROR_REQUEST_HEADERS]", (_6 = req.headers) !== null && _6 !== void 0 ? _6 : {});
        const errorMessage = (_7 = err === null || err === void 0 ? void 0 : err.message) !== null && _7 !== void 0 ? _7 : String(err);
        const errorCategory = errorMessage.includes("column File.vpn does not exist")
            ? "UPLOAD_DB_VPN_COLUMN_MISSING"
            : errorMessage.includes("No se encontró XML")
                ? "UPLOAD_XML_NOT_FOUND"
                : "UPLOAD_GENERAL_ERROR";
        (0, logger_1.uploadError)({
            phase: "Upload",
            component: "uploadFile",
            payload: {
                message: "Upload con error",
                errorCategory,
                source: uploadSource,
                authContext: (_8 = req.endUser) !== null && _8 !== void 0 ? _8 : null,
                uploadCorrelationKey,
                body: (_9 = req.body) !== null && _9 !== void 0 ? _9 : {},
                headers: (_10 = req.headers) !== null && _10 !== void 0 ? _10 : {},
                fileName: file.originalname,
                error: errorMessage,
            },
        });
        (0, logger_1.error)({
            phase: "Upload",
            payload: {
                message: `Error procesando el archivo ${file.originalname}: ${errorMessage}`,
            },
        });
        res.status(500).json({ message: "Error procesando el archivo." });
    }
});
exports.uploadFile = uploadFile;
//# sourceMappingURL=fileUploadController.js.map