import * as fs from "fs";
import { DateTime } from "luxon";

interface Zona {
  Aduana: string;
  "Zona Horaria": string;
}

interface ConversionResult {
  /** Hora original en la zona horaria de la aduana */
  horaOriginal: string;
  /** Hora convertida a zona centro CDMX (America/Mexico_City) */
  horaCentro: string;
  /** Timestamp limpio sin caracteres especiales para eventKey */
  timestampLimpio: string;
}

function getTimeZoneOffset(zonaHoraria: string): string {
  const zonaMap: { [key: string]: string } = {
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

export function convertirTimestampConZonas(
  aduana: string,
  timestampUtc: string
): ConversionResult {
  const data: Zona[] = JSON.parse(fs.readFileSync("zonas.json", "utf8"));

  const entrada = data.find(
    (z) => z.Aduana.toLowerCase() === aduana.toLowerCase()
  );

  if (!entrada) {
    console.warn(
      `Advertencia: Aduana "${aduana}" no encontrada. Se usará hora centro por defecto..`
    );
    const fechaCentro = DateTime.fromISO(timestampUtc, { zone: "utc" }).setZone(
      "America/Mexico_City"
    );

    const cleanDate = timestampUtc.replace(/\D/g, "");

    return {
      horaOriginal: timestampUtc,
      horaCentro: fechaCentro.toISO() ?? timestampUtc,
      timestampLimpio: cleanDate,
    };
  }

  const zonaHorariaOrigen = getTimeZoneOffset(entrada["Zona Horaria"]);

  const fechaOrigen = DateTime.fromISO(timestampUtc, {
    zone: zonaHorariaOrigen,
  });

  const fechaCentro = fechaOrigen.setZone("America/Mexico_City");

  const timestampLimpio = fechaOrigen.toFormat("yyyyMMddHHmmss");

  return {
    horaOriginal: fechaOrigen.toISO() ?? timestampUtc,
    horaCentro: fechaCentro.toISO() ?? timestampUtc,
    timestampLimpio: timestampLimpio,
  };
}
