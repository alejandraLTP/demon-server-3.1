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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFileUpload = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const logger_1 = require("../config/logger");
const ORMConfig_1 = require("../config/ORMConfig");
const File_1 = require("../Entities/File");
const cleanupTempFolder_1 = require("../utils/cleanupTempFolder");
const moveFileToAduanaFolder_1 = require("../utils/moveFileToAduanaFolder");
const sseHandler_1 = require("../utils/sseHandler");
const ExtractXML_1 = require("./ExtractXML");
const FormatNuctechToBD_1 = require("./FormatNuctechToBD");
const FormatRapiscanToBD_1 = require("./FormatRapiscanToBD");
const ParseXML_1 = require("./ParseXML");
const tempFolder = path_1.default.resolve("./tempFolder");
const INGESTA_ENDPOINT = (_a = process.env.INGESTA_ENDPOINT) !== null && _a !== void 0 ? _a : "http://localhost:5043/api/v1/ingesta/uff";
/**
 * Reenvía el archivo al endpoint de ingesta
 */
const forwardFileToIngesta = (originalFilePath, fileName, aduana, region, area, seccion, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sourceExists = yield fs_extra_1.default.pathExists(originalFilePath);
        if (!sourceExists) {
            throw new Error(`La ruta original del archivo no existe para ingesta: ${originalFilePath}`);
        }
        const fileBuffer = yield fs_extra_1.default.readFile(originalFilePath);
        console.log("\n==============================");
        console.log("REENVÍO A INGESTA INICIADO");
        console.log("==============================");
        console.log("Endpoint:", INGESTA_ENDPOINT);
        console.log("Archivo:", fileName);
        console.log("Ruta archivo:", originalFilePath);
        console.log("Tamaño archivo:", fileBuffer.length);
        console.log("Aduana:", aduana);
        console.log("Region:", region);
        console.log("Area:", area);
        console.log("Seccion:", seccion);
        console.log("Token presente:", !!token);
        const boundary = `----WebKitFormBoundary${Math.random().toString(36).substring(2, 15)}`;
        let body = `--${boundary}\r\n`;
        body +=
            `Content-Disposition: form-data; name="uff"; filename="${fileName}"\r\n`;
        body += `Content-Type: application/octet-stream\r\n\r\n`;
        const bodyBeforeFile = Buffer.from(body);
        const bodyAfterFile = Buffer.from(`\r\n`);
        const fieldsBody = `--${boundary}\r\n` +
            `Content-Disposition: form-data; name="aduana"\r\n\r\n${aduana}\r\n` +
            `--${boundary}\r\n` +
            `Content-Disposition: form-data; name="region"\r\n\r\n${region}\r\n` +
            `--${boundary}\r\n` +
            `Content-Disposition: form-data; name="areaOperativa"\r\n\r\n${area}\r\n` +
            `--${boundary}\r\n` +
            `Content-Disposition: form-data; name="seccion"\r\n\r\n${seccion}\r\n` +
            `--${boundary}--\r\n`;
        const requestBody = Buffer.concat([
            bodyBeforeFile,
            fileBuffer,
            bodyAfterFile,
            Buffer.from(fieldsBody),
        ]);
        const headers = {
            "Content-Type": `multipart/form-data; boundary=${boundary}`,
            Accept: "application/json",
        };
        if (token) {
            headers["Authorization"] = token;
        }
        console.log("\n==============================");
        console.log("REQUEST HEADERS");
        console.log("==============================");
        console.log(JSON.stringify(headers, null, 2));
        console.log("\n==============================");
        console.log("BOUNDARY");
        console.log("==============================");
        console.log(boundary);
        console.log("\n==============================");
        console.log("REQUEST BODY LENGTH");
        console.log("==============================");
        console.log(requestBody.length);
        console.log("\n==============================");
        console.log("CURL TEST");
        console.log("==============================");
        const curlCommand = `curl -X POST "${INGESTA_ENDPOINT}" ` +
            `-H "Authorization: ${token !== null && token !== void 0 ? token : ""}" ` +
            `-F "uff=@${originalFilePath}" ` +
            `-F "aduana=${aduana}" ` +
            `-F "region=${region}" ` +
            `-F "areaOperativa=${area}" ` +
            `-F "seccion=${seccion}"`;
        console.log(curlCommand);
        let response;
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000);
            response = yield fetch(INGESTA_ENDPOINT, {
                method: "POST",
                body: requestBody,
                headers,
                signal: controller.signal,
            });
            clearTimeout(timeoutId);
        }
        catch (fetchErr) {
            console.log("\n==============================");
            console.log("ERROR FETCH INGESTA");
            console.log("==============================");
            console.log(fetchErr);
            console.log("==============================\n");
            if (fetchErr.name === "AbortError") {
                throw new Error(`Timeout al conectar con el endpoint de ingesta (${INGESTA_ENDPOINT}). La petición excedió los 30 segundos.`);
            }
            throw new Error(`Error de conexión al endpoint de ingesta: ${(fetchErr === null || fetchErr === void 0 ? void 0 : fetchErr.message) || fetchErr}`);
        }
        console.log("\n==============================");
        console.log("RESPUESTA INGESTA");
        console.log("==============================");
        console.log("HTTP STATUS:", response.status);
        console.log("HTTP STATUS TEXT:", response.statusText);
        const responseText = yield response.text();
        console.log("\nBODY RESPUESTA:");
        console.log(responseText);
        console.log("\n==============================");
        console.log("FIN RESPUESTA INGESTA");
        console.log("==============================\n");
        if (!response.ok) {
            throw new Error(`Error en ingesta: ${response.status} ${response.statusText}. Respuesta: ${responseText}`);
        }
        (0, logger_1.ingesta)({
            phase: "Upload",
            payload: {
                message: `Archivo ${fileName} reenviado exitosamente a ingesta UFF`,
                endpoint: INGESTA_ENDPOINT,
                status: response.status,
                responseBody: responseText,
                fileSize: fileBuffer.length,
                hasToken: !!token,
            },
        });
    }
    catch (err) {
        console.log("\n==============================");
        console.log("ERROR REENVÍO INGESTA");
        console.log("==============================");
        console.log(err);
        console.log("==============================\n");
        (0, logger_1.ingesta)({
            phase: "Upload",
            component: "forwardFileToIngesta",
            payload: {
                message: `Error reenviando archivo a ingesta: ${(err === null || err === void 0 ? void 0 : err.message) || err}`,
                fileName,
                endpoint: INGESTA_ENDPOINT,
            },
        });
    }
});
const handleFileUpload = (file_1, aduana_1, region_1, area_1, seccion_1, ...args_1) => __awaiter(void 0, [file_1, aduana_1, region_1, area_1, seccion_1, ...args_1], void 0, function* (file, aduana, region, area, seccion, company = "Rapiscan", rawUploadPayload, authorizationToken) {
    let tempFileDir = null;
    try {
        const pathFile = yield (0, moveFileToAduanaFolder_1.moveFileToAduanaFolder)(file.path, aduana, seccion);
        const fileName = file.filename;
        const finalDirectory = path_1.default.dirname(pathFile);
        tempFileDir = yield fs_extra_1.default.mkdtemp(path_1.default.join(tempFolder, "upload-"));
        const tempFilePath = path_1.default.join(tempFileDir, fileName);
        yield fs_extra_1.default.copy(pathFile, tempFilePath);
        (0, logger_1.info)({
            phase: "Upload",
            payload: {
                message: `Procesando extracción UFF: ${fileName}`,
            },
        });
        const xmlContent = yield (0, ExtractXML_1.extractUFF)(tempFilePath, finalDirectory);
        if (!xmlContent) {
            (0, logger_1.error)({
                phase: "Upload",
                payload: {
                    message: `No se encontró XML en el archivo: ${fileName}`,
                },
            });
            throw new Error(`No se encontró XML en el archivo: ${fileName}`);
        }
        const cleanXML = xmlContent
            .replace(/^[^<]+/, "")
            .replace(/[\u0000\uFFFD]+/g, "");
        let jsonData = yield (0, ParseXML_1.parseXML)(cleanXML);
        if (company === "Nuctech") {
            jsonData = yield (0, FormatNuctechToBD_1.FormatNuctechToBD)(jsonData, aduana, region, area, seccion, company, finalDirectory, pathFile, rawUploadPayload);
        }
        else {
            jsonData = yield (0, FormatRapiscanToBD_1.FormatRapiscanToBD)(jsonData, finalDirectory, pathFile, aduana, region, area, seccion, company, rawUploadPayload);
        }
        const fileRepository = ORMConfig_1.AppDataSource.getRepository(File_1.File);
        const fileData = new File_1.File();
        fileData.id = (0, uuid_1.v4)();
        fileData.fileName = fileName;
        fileData.filePath = pathFile;
        fileData.aduana = aduana;
        fileData.region = region;
        fileData.area = area;
        fileData.seccion = seccion;
        fileData.company = company;
        yield fileRepository.save(fileData);
        if (aduana && region && area && seccion) {
            yield forwardFileToIngesta(pathFile, fileName, aduana, region, area, seccion, authorizationToken);
        }
        (0, sseHandler_1.sendSSENotification)({
            message: "Archivo procesado exitosamente",
            data: fileData,
        });
    }
    catch (err) {
        (0, logger_1.error)({
            phase: "Upload",
            component: "handleFileUpload",
            payload: {
                message: `Error: ${(err === null || err === void 0 ? void 0 : err.message) || err}`,
            },
        });
        throw err;
    }
    finally {
        if (tempFileDir) {
            yield fs_extra_1.default.remove(tempFileDir).catch(() => { });
        }
        (0, cleanupTempFolder_1.cleanupTempFolder)().catch(() => { });
    }
});
exports.handleFileUpload = handleFileUpload;
//# sourceMappingURL=fileHandler.js.map