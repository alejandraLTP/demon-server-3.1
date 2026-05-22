// cleanTemp.ts
import { cleanupTempFolder } from "./src/utils/cleanupTempFolder";

(async () => {
  await cleanupTempFolder();
  console.log("🧹 Limpieza completada");
})();
