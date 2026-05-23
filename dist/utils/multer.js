"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const logger_1 = require("../config/logger");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const localFolder = process.env.LOCALFOLDER;
        const customFolder = "default";
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        const monthDay = `${month}${day}`;
        const fileNameWithoutExt = path_1.default.parse(file.originalname).name;
        const folderPath = path_1.default.join(localFolder, customFolder, String(year), monthDay, fileNameWithoutExt);
        (0, logger_1.info)({
            component: "multer",
            phase: "destination",
            payload: {
                message: "Creando carpeta de destino",
                folderPath: folderPath,
            },
        });
        try {
            fs_extra_1.default.ensureDirSync(folderPath);
            cb(null, folderPath);
        }
        catch (err) {
            (0, logger_1.error)({
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
exports.upload = (0, multer_1.default)({ storage });
//# sourceMappingURL=multer.js.map