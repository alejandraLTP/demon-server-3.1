import fs from "fs-extra";
import path from "path";
import { info, error } from "../config/logger";

/**
 * Limpia carpetas vacías de la carpeta temporal y elimina específicamente la carpeta `default` y su contenido.
 * @param dir Ruta base donde se buscarán carpetas vacías y la carpeta `default`.
 */
export const cleanEmptyDirectories = async (dir: string) => {
  const files = await fs.readdir(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = await fs.stat(filePath);

    if (stats.isDirectory()) {
      await cleanEmptyDirectories(filePath);

      const subFiles = await fs.readdir(filePath);
      if (subFiles.length === 0) {
        try {
          await fs.rmdir(filePath);
          info({
            phase: "Upload",
            component: "cleanEmptyDirectories",
            payload: {
              message:
                file === "default"
                  ? `Carpeta 'default' eliminada porque está vacía: ${filePath}`
                  : `Carpeta vacía eliminada: ${filePath}`,
            },
          });
        } catch (err: any) {
          error({
            phase: "Upload",
            component: "cleanEmptyDirectories",
            payload: {
              message: `No se pudo eliminar la carpeta '${file}': ${filePath}`,
              error: err.message,
            },
          });
        }
      }
    }
  }
};
