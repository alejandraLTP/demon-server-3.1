import fs from "fs-extra";
import path from "path";

const TARGET_SERIAL = "34400237";

const getDateStamp = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const writeSerialPayloadAuditIfNeeded = async (
  serialNumber: string | null | undefined,
  payloadSnapshot: unknown,
  metadata: Record<string, unknown> = {}
): Promise<void> => {
  if (!serialNumber || serialNumber !== TARGET_SERIAL) {
    return;
  }

  const logsDir = path.resolve("./logs");
  const logFilePath = path.join(
    logsDir,
    `serial-${TARGET_SERIAL}-payload-${getDateStamp()}.log`
  );

  const entry = [
    "============================================================",
    `[${new Date().toISOString()}] SERIAL DETECTADO: ${TARGET_SERIAL}`,
    "PAYLOAD ORIGINAL RECIBIDO DEL CLIENTE:",
    JSON.stringify(payloadSnapshot ?? {}, null, 2),
    "METADATA DEL EVENTO:",
    JSON.stringify(metadata ?? {}, null, 2),
    "",
  ].join("\n");

  await fs.ensureDir(logsDir);
  await fs.appendFile(logFilePath, `${entry}\n`, "utf8");
};

