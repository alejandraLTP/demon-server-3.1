import path from "path";

import { cleanEmptyDirectories } from "../services/CleanEmptyDirectories";
import { info, error } from "../config/logger";

const TEMP_DIR = path.resolve("./tempFolder");
const ROOT_DIR = "C:\\RNI";

const INTERVAL_MS = 2 * 60 * 1000;

let isCleaning = false;

export const startPeriodicCleanUp = () => {
  setInterval(async () => {
    if (isCleaning) {
      info({
        phase: "Cleaner",
        component: "PeriodicCleanUp",
        payload: {
          message:
            "Ya se está ejecutando una limpieza. Se omite esta ejecución.",
        },
      });
      return;
    }

    isCleaning = true;

    try {
      info({
        phase: "Cleaner",
        component: "PeriodicCleanUp",
        payload: {
          message: "Iniciando limpieza de carpetas vacías...",
        },
      });

      await cleanEmptyDirectories(TEMP_DIR);

      await cleanEmptyDirectories(ROOT_DIR);

      info({
        phase: "Cleaner",
        component: "PeriodicCleanUp",
        payload: {
          message: "Limpieza de carpetas vacías completada.",
        },
      });
    } catch (err: any) {
      error({
        phase: "Cleaner",
        component: "PeriodicCleanUp",
        payload: {
          message: `Error general en limpieza periódica: ${err.message}`,
        },
      });
    } finally {
      isCleaning = false;
    }
  }, INTERVAL_MS);
};
