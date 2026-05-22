import fs from "fs";
import path from "path";
import { error } from "../config/logger";

/**
 * Mueve un archivo desde la carpeta `default` a una carpeta con el nombre de la aduana.
 * @param currentPath Ruta actual del archivo.
 * @param aduana Nombre de la aduana (reemplazará `default` en la ruta).
 * @param seccion Sección del archivo
 * @returns Nueva ruta del archivo.
 */
export const moveFileToAduanaFolder = async (
  currentPath: string,
  aduana: string,
  seccion: string
): Promise<string> => {
  try {
    const newPath = currentPath.replace(
      /\\default\\/g,
      `\\${aduana}\\${seccion.trim()}\\`
    );

    const newFolderPath = path.dirname(newPath);
    if (!fs.existsSync(newFolderPath)) {
      await fs.promises.mkdir(newFolderPath, { recursive: true });
    }

    await fs.promises.rename(currentPath, newPath);

    return newPath;
  } catch (err: any) {
    error({
      phase: "Upload",
      payload: {
        message: `Error al mover el archivo a la carpeta de la aduana: ${err.message}`,
      },
    });
    //console.log("Error al mover el archivo a la carpeta de la aduana:", err);
    throw new Error(`Error moving file: ${err.message}`);
  }
};
