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
exports.writeSerialPayloadAuditIfNeeded = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const TARGET_SERIAL = "34400237";
const getDateStamp = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};
const writeSerialPayloadAuditIfNeeded = (serialNumber_1, payloadSnapshot_1, ...args_1) => __awaiter(void 0, [serialNumber_1, payloadSnapshot_1, ...args_1], void 0, function* (serialNumber, payloadSnapshot, metadata = {}) {
    if (!serialNumber || serialNumber !== TARGET_SERIAL) {
        return;
    }
    const logsDir = path_1.default.resolve("./logs");
    const logFilePath = path_1.default.join(logsDir, `serial-${TARGET_SERIAL}-payload-${getDateStamp()}.log`);
    const entry = [
        "============================================================",
        `[${new Date().toISOString()}] SERIAL DETECTADO: ${TARGET_SERIAL}`,
        "PAYLOAD ORIGINAL RECIBIDO DEL CLIENTE:",
        JSON.stringify(payloadSnapshot !== null && payloadSnapshot !== void 0 ? payloadSnapshot : {}, null, 2),
        "METADATA DEL EVENTO:",
        JSON.stringify(metadata !== null && metadata !== void 0 ? metadata : {}, null, 2),
        "",
    ].join("\n");
    yield fs_extra_1.default.ensureDir(logsDir);
    yield fs_extra_1.default.appendFile(logFilePath, `${entry}\n`, "utf8");
});
exports.writeSerialPayloadAuditIfNeeded = writeSerialPayloadAuditIfNeeded;
//# sourceMappingURL=serialPayloadAuditLogger.js.map