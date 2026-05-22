import fs from "fs-extra";
import path from "path";

const TEMP_DIR = path.resolve("./tempFolder");
const MAX_AGE = 1000 * 60 * 60; 
let lastCleanup = 0;

export async function cleanupTempFolder() {
  const now = Date.now();

  
  if (now - lastCleanup < MAX_AGE) return;
  lastCleanup = now;

  try {
    if (!(await fs.pathExists(TEMP_DIR))) return;

    const entries = await fs.readdir(TEMP_DIR);

    for (const entry of entries) {
      const fullPath = path.join(TEMP_DIR, entry);

      try {
        const stat = await fs.stat(fullPath);
        const age = now - stat.mtimeMs;

        if (age > MAX_AGE) {
          await fs.remove(fullPath);
        }
      } catch {
        
      }
    }
  } catch {
    
  }
}
