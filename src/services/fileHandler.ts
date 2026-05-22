import fs from "fs-extra";
import path from "path";
import { v4 as uuidv4 } from "uuid";

import { error, info, ingesta } from "../config/logger";
import { AppDataSource } from "../config/ORMConfig";
import { File } from "../Entities/File";
import { cleanupTempFolder } from "../utils/cleanupTempFolder";
import { moveFileToAduanaFolder } from "../utils/moveFileToAduanaFolder";
import { sendSSENotification } from "../utils/sseHandler";

import { extractUFF } from "./ExtractXML";
import { FormatNuctechToBD } from "./FormatNuctechToBD";
import { FormatRapiscanToBD } from "./FormatRapiscanToBD";
import { parseXML } from "./ParseXML";

const tempFolder = path.resolve("./tempFolder");

const INGESTA_ENDPOINT =
  process.env.INGESTA_ENDPOINT ??
  "http://localhost:5043/api/v1/ingesta/uff";

export type UploadPayloadSnapshot = {
  source: Record<string, unknown>;
  authContext: unknown;
  uploadCorrelationKey: string;
  body: Record<string, unknown>;
  headers: Record<string, unknown>;
  fileName: string | null;
};

/**
 * Reenvía el archivo al endpoint de ingesta
 */
const forwardFileToIngesta = async (
  originalFilePath: string,
  fileName: string,
  aduana: string,
  region: string,
  area: string,
  seccion: string,
  token?: string | null,
): Promise<void> => {
  try {
    const sourceExists = await fs.pathExists(originalFilePath);

    if (!sourceExists) {
      throw new Error(
        `La ruta original del archivo no existe para ingesta: ${originalFilePath}`,
      );
    }

    const fileBuffer = await fs.readFile(originalFilePath);

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

    const boundary =
      `----WebKitFormBoundary${Math.random().toString(36).substring(2, 15)}`;

    let body = `--${boundary}\r\n`;

    body +=
      `Content-Disposition: form-data; name="uff"; filename="${fileName}"\r\n`;

    body += `Content-Type: application/octet-stream\r\n\r\n`;

    const bodyBeforeFile = Buffer.from(body);
    const bodyAfterFile = Buffer.from(`\r\n`);

    const fieldsBody =
      `--${boundary}\r\n` +
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

    const headers: Record<string, string> = {
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

    const curlCommand =
      `curl -X POST "${INGESTA_ENDPOINT}" ` +
      `-H "Authorization: ${token ?? ""}" ` +
      `-F "uff=@${originalFilePath}" ` +
      `-F "aduana=${aduana}" ` +
      `-F "region=${region}" ` +
      `-F "areaOperativa=${area}" ` +
      `-F "seccion=${seccion}"`;

    console.log(curlCommand);

    let response: Response;

    try {
      const controller = new AbortController();

      const timeoutId = setTimeout(
        () => controller.abort(),
        30000,
      );

      response = await fetch(INGESTA_ENDPOINT, {
        method: "POST",
        body: requestBody,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

    } catch (fetchErr: any) {

      console.log("\n==============================");
      console.log("ERROR FETCH INGESTA");
      console.log("==============================");
      console.log(fetchErr);
      console.log("==============================\n");

      if (fetchErr.name === "AbortError") {
        throw new Error(
          `Timeout al conectar con el endpoint de ingesta (${INGESTA_ENDPOINT}). La petición excedió los 30 segundos.`,
        );
      }

      throw new Error(
        `Error de conexión al endpoint de ingesta: ${
          fetchErr?.message || fetchErr
        }`,
      );
    }

    console.log("\n==============================");
    console.log("RESPUESTA INGESTA");
    console.log("==============================");

    console.log("HTTP STATUS:", response.status);
    console.log("HTTP STATUS TEXT:", response.statusText);

    const responseText = await response.text();

    console.log("\nBODY RESPUESTA:");
    console.log(responseText);

    console.log("\n==============================");
    console.log("FIN RESPUESTA INGESTA");
    console.log("==============================\n");

    if (!response.ok) {
      throw new Error(
        `Error en ingesta: ${response.status} ${response.statusText}. Respuesta: ${responseText}`,
      );
    }

    ingesta({
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

  } catch (err: any) {

    console.log("\n==============================");
    console.log("ERROR REENVÍO INGESTA");
    console.log("==============================");
    console.log(err);
    console.log("==============================\n");

    ingesta({
      phase: "Upload",
      component: "forwardFileToIngesta",
      payload: {
        message: `Error reenviando archivo a ingesta: ${err?.message || err}`,
        fileName,
        endpoint: INGESTA_ENDPOINT,
      },
    });
  }
};

export const handleFileUpload = async (
  file: Express.Multer.File,
  aduana: string,
  region: string,
  area: string,
  seccion: string,
  company: string = "Rapiscan",
  rawUploadPayload?: UploadPayloadSnapshot,
  authorizationToken?: string | null,
): Promise<void> => {

  let tempFileDir: string | null = null;

  try {

    const pathFile = await moveFileToAduanaFolder(
      file.path,
      aduana,
      seccion,
    );

    const fileName = file.filename;

    const finalDirectory = path.dirname(pathFile);

    tempFileDir = await fs.mkdtemp(
      path.join(tempFolder, "upload-"),
    );

    const tempFilePath = path.join(
      tempFileDir,
      fileName,
    );

    await fs.copy(pathFile, tempFilePath);

    info({
      phase: "Upload",
      payload: {
        message: `Procesando extracción UFF: ${fileName}`,
      },
    });

    const xmlContent = await extractUFF(
      tempFilePath,
      finalDirectory,
    );

    if (!xmlContent) {

      error({
        phase: "Upload",
        payload: {
          message: `No se encontró XML en el archivo: ${fileName}`,
        },
      });

      throw new Error(
        `No se encontró XML en el archivo: ${fileName}`,
      );
    }

    const cleanXML = xmlContent
      .replace(/^[^<]+/, "")
      .replace(/[\u0000\uFFFD]+/g, "");

    let jsonData = await parseXML(cleanXML);

    if (company === "Nuctech") {

      jsonData = await FormatNuctechToBD(
        jsonData,
        aduana,
        region,
        area,
        seccion,
        company,
        finalDirectory,
        pathFile,
        rawUploadPayload,
      );

    } else {

      jsonData = await FormatRapiscanToBD(
        jsonData,
        finalDirectory,
        pathFile,
        aduana,
        region,
        area,
        seccion,
        company,
        rawUploadPayload,
      );
    }

    const fileRepository =
      AppDataSource.getRepository(File);

    const fileData = new File();

    fileData.id = uuidv4();
    fileData.fileName = fileName;
    fileData.filePath = pathFile;
    fileData.aduana = aduana;
    fileData.region = region;
    fileData.area = area;
    fileData.seccion = seccion;
    fileData.company = company;

    await fileRepository.save(fileData);

    if (aduana && region && area && seccion) {

      await forwardFileToIngesta(
        pathFile,
        fileName,
        aduana,
        region,
        area,
        seccion,
        authorizationToken,
      );
    }

    sendSSENotification({
      message: "Archivo procesado exitosamente",
      data: fileData,
    });

  } catch (err: any) {

    error({
      phase: "Upload",
      component: "handleFileUpload",
      payload: {
        message: `Error: ${err?.message || err}`,
      },
    });

    throw err;

  } finally {

    if (tempFileDir) {
      await fs.remove(tempFileDir).catch(() => {});
    }

    cleanupTempFolder().catch(() => {});
  }
};