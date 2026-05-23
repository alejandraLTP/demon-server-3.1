"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertirTimestampConZonas = convertirTimestampConZonas;
const fs = __importStar(require("fs"));
const luxon_1 = require("luxon");
function getTimeZoneOffset(zonaHoraria) {
    const zonaMap = {
        "hora estándar central (utc-6)": "America/Mexico_City",
        "hora estándar de la montaña (utc-7)": "America/Hermosillo",
        "hora del pacífico (utc-8/-7 en verano)": "America/Los_Angeles",
        "hora estándar del este (utc-5)": "America/New_York",
    };
    const zonaNormalizada = zonaHoraria.toLowerCase().trim();
    for (const clave in zonaMap) {
        if (zonaNormalizada.includes(clave)) {
            return zonaMap[clave];
        }
    }
    return "UTC";
}
function convertirTimestampConZonas(aduana, timestampUtc) {
    var _a, _b, _c;
    const data = JSON.parse(fs.readFileSync("zonas.json", "utf8"));
    const entrada = data.find((z) => z.Aduana.toLowerCase() === aduana.toLowerCase());
    if (!entrada) {
        console.warn(`Advertencia: Aduana "${aduana}" no encontrada. Se usará hora centro por defecto..`);
        const fechaCentro = luxon_1.DateTime.fromISO(timestampUtc, { zone: "utc" }).setZone("America/Mexico_City");
        const cleanDate = timestampUtc.replace(/\D/g, "");
        return {
            horaOriginal: timestampUtc,
            horaCentro: (_a = fechaCentro.toISO()) !== null && _a !== void 0 ? _a : timestampUtc,
            timestampLimpio: cleanDate,
        };
    }
    const zonaHorariaOrigen = getTimeZoneOffset(entrada["Zona Horaria"]);
    const fechaOrigen = luxon_1.DateTime.fromISO(timestampUtc, {
        zone: zonaHorariaOrigen,
    });
    const fechaCentro = fechaOrigen.setZone("America/Mexico_City");
    const timestampLimpio = fechaOrigen.toFormat("yyyyMMddHHmmss");
    return {
        horaOriginal: (_b = fechaOrigen.toISO()) !== null && _b !== void 0 ? _b : timestampUtc,
        horaCentro: (_c = fechaCentro.toISO()) !== null && _c !== void 0 ? _c : timestampUtc,
        timestampLimpio: timestampLimpio,
    };
}
//# sourceMappingURL=zonaHoraria.js.map