"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveFileToAduanaFolder = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logger_1 = require("../config/logger");
/**
 * Mueve un archivo desde la carpeta `default` a una carpeta con el nombre de la aduana.
 * @param currentPath Ruta actual del archivo.
 * @param aduana Nombre de la aduana (reemplazará `default` en la ruta).
 * @param seccion Sección del archivo
 * @returns Nueva ruta del archivo.
 */
const moveFileToAduanaFolder = (currentPath, aduana, seccion) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPath = currentPath.replace(/\\default\\/g, `\\${aduana}\\${seccion.trim()}\\`);
        const newFolderPath = path_1.default.dirname(newPath);
        if (!fs_1.default.existsSync(newFolderPath)) {
            yield fs_1.default.promises.mkdir(newFolderPath, { recursive: true });
        }
        yield fs_1.default.promises.rename(currentPath, newPath);
        return newPath;
    }
    catch (err) {
        (0, logger_1.error)({
            phase: "Upload",
            payload: {
                message: `Error al mover el archivo a la carpeta de la aduana: ${err.message}`,
            },
        });
        //console.log("Error al mover el archivo a la carpeta de la aduana:", err);
        throw new Error(`Error moving file: ${err.message}`);
    }
});
exports.moveFileToAduanaFolder = moveFileToAduanaFolder;
//# sourceMappingURL=moveFileToAduanaFolder.js.map