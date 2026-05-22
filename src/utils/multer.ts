import fs from "fs-extra";
import multer from "multer";
import path from "path";
import { error, info } from "../config/logger";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const localFolder = process.env.LOCALFOLDER as string;

    const customFolder = "default";

    const currentDate = new Date();
    const year = currentDate.getFullYear();

    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const monthDay = `${month}${day}`;

    const fileNameWithoutExt = path.parse(file.originalname).name;

    const folderPath = path.join(
      localFolder,
      customFolder,
      String(year),
      monthDay,
      fileNameWithoutExt
    );

    info({
      component: "multer",
      phase: "destination",
      payload: {
        message: "Creando carpeta de destino",
        folderPath: folderPath,
      },
    });

    try {
      fs.ensureDirSync(folderPath);
      cb(null, folderPath);
    } catch (err: any) {
      error({
        component: "multer",
        phase: "error",
        payload: {
          message: "Error al crear la carpeta de destino",
          error: err.message,
          folderPath: folderPath,
        },
      });
      cb(err, folderPath);
    }
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
