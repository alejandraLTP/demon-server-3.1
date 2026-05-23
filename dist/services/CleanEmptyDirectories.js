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
exports.cleanEmptyDirectories = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const logger_1 = require("../config/logger");
/**
 * Limpia carpetas vacías de la carpeta temporal y elimina específicamente la carpeta `default` y su contenido.
 * @param dir Ruta base donde se buscarán carpetas vacías y la carpeta `default`.
 */
const cleanEmptyDirectories = (dir) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield fs_extra_1.default.readdir(dir);
    for (const file of files) {
        const filePath = path_1.default.join(dir, file);
        const stats = yield fs_extra_1.default.stat(filePath);
        if (stats.isDirectory()) {
            yield (0, exports.cleanEmptyDirectories)(filePath);
            const subFiles = yield fs_extra_1.default.readdir(filePath);
            if (subFiles.length === 0) {
                try {
                    yield fs_extra_1.default.rmdir(filePath);
                    (0, logger_1.info)({
                        phase: "Upload",
                        component: "cleanEmptyDirectories",
                        payload: {
                            message: file === "default"
                                ? `Carpeta 'default' eliminada porque está vacía: ${filePath}`
                                : `Carpeta vacía eliminada: ${filePath}`,
                        },
                    });
                }
                catch (err) {
                    (0, logger_1.error)({
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
});
exports.cleanEmptyDirectories = cleanEmptyDirectories;
//# sourceMappingURL=CleanEmptyDirectories.js.map