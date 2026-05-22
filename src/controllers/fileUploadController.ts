import { Request, Response } from "express";

import { error, info, uploadError, uploadTrace } from "../config/logger";
import { handleFileUpload } from "../services/fileHandler";

export const uploadFile = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const file = req.file;
  const { aduana, region, area, seccion, vpn, company } = req.body;
  const uploadCorrelationKey = [
    req.headers["x-forwarded-for"] ??
      req.socket?.remoteAddress ??
      req.ip ??
      "unknown-ip",
    req.headers["user-agent"] ?? "unknown-agent",
    req.endUser?.username ?? "unknown-user",
  ].join("|");
  const uploadSource = {
    aduana: aduana ?? req.headers["x-aduana"],
    equipo:
      req.body?.equipo ??
      req.headers["x-equipo"] ??
      req.headers["x-device-id"] ??
      req.hostname,
    region,
    area,
    seccion,
    vpn,
    company,
    ip:
      req.headers["x-forwarded-for"] ??
      req.socket?.remoteAddress ??
      req.ip ??
      "unknown",
    userAgent: req.headers["user-agent"] ?? "unknown",
  };
  const rawUploadPayload = {
    source: uploadSource,
    authContext: req.endUser ?? null,
    uploadCorrelationKey,
    body: req.body ?? {},
    headers: req.headers ?? {},
    fileName: file?.originalname ?? null,
  };

  uploadTrace({
    phase: "UploadSource",
    component: "uploadFile",
    payload: {
      message: "Intento de upload recibido",
      ...rawUploadPayload,
    },
  });

  if (!file) {
    console.log("[UPLOAD_ERROR_REQUEST_BODY]", req.body ?? {});
    console.log("[UPLOAD_ERROR_REQUEST_HEADERS]", req.headers ?? {});
    uploadError({
      phase: "Upload",
      component: "uploadFile",
      payload: {
        message: "No se ha proporcionado ningún archivo.",
        source: uploadSource,
        authContext: req.endUser ?? null,
        uploadCorrelationKey,
        body: req.body ?? {},
        headers: req.headers ?? {},
      },
    });
    error({
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
    uploadError({
      phase: "Upload",
      component: "uploadFile",
      payload: {
        message: `Parámetros faltantes: ${missingParams.join(", ")}`,
        source: uploadSource,
        authContext: req.endUser ?? null,
        uploadCorrelationKey,
        body: req.body ?? {},
        headers: req.headers ?? {},
      },
    });
    error({
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

    await handleFileUpload(
      file,
      aduana,
      region,
      area,
      seccion,
      company,
      rawUploadPayload,
      token,
    );

    info({
      phase: "Upload",
      payload: {
        message: `Archivo ${file.originalname} procesado exitosamente.`,
      },
    });
    uploadTrace({
      phase: "UploadSuccess",
      component: "uploadFile",
      payload: {
        message: "Upload procesado correctamente",
        source: uploadSource,
        authContext: req.endUser ?? null,
        uploadCorrelationKey,
        fileName: file.originalname,
      },
    });
    res.json({ message: "Archivo recibido." });
  } catch (err: any) {
    console.log("[UPLOAD_ERROR_REQUEST_BODY]", req.body ?? {});
    console.log("[UPLOAD_ERROR_REQUEST_HEADERS]", req.headers ?? {});
    const errorMessage = err?.message ?? String(err);
    const errorCategory = errorMessage.includes(
      "column File.vpn does not exist",
    )
      ? "UPLOAD_DB_VPN_COLUMN_MISSING"
      : errorMessage.includes("No se encontró XML")
        ? "UPLOAD_XML_NOT_FOUND"
        : "UPLOAD_GENERAL_ERROR";
    uploadError({
      phase: "Upload",
      component: "uploadFile",
      payload: {
        message: "Upload con error",
        errorCategory,
        source: uploadSource,
        authContext: req.endUser ?? null,
        uploadCorrelationKey,
        body: req.body ?? {},
        headers: req.headers ?? {},
        fileName: file.originalname,
        error: errorMessage,
      },
    });
    error({
      phase: "Upload",
      payload: {
        message: `Error procesando el archivo ${file.originalname}: ${errorMessage}`,
      },
    });
    res.status(500).json({ message: "Error procesando el archivo." });
  }
};
