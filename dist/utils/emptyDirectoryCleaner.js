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
exports.startPeriodicCleanUp = void 0;
const path_1 = __importDefault(require("path"));
const CleanEmptyDirectories_1 = require("../services/CleanEmptyDirectories");
const logger_1 = require("../config/logger");
const TEMP_DIR = path_1.default.resolve("./tempFolder");
const ROOT_DIR = "C:\\RNI";
const INTERVAL_MS = 2 * 60 * 1000;
let isCleaning = false;
const startPeriodicCleanUp = () => {
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        if (isCleaning) {
            (0, logger_1.info)({
                phase: "Cleaner",
                component: "PeriodicCleanUp",
                payload: {
                    message: "Ya se está ejecutando una limpieza. Se omite esta ejecución.",
                },
            });
            return;
        }
        isCleaning = true;
        try {
            (0, logger_1.info)({
                phase: "Cleaner",
                component: "PeriodicCleanUp",
                payload: {
                    message: "Iniciando limpieza de carpetas vacías...",
                },
            });
            yield (0, CleanEmptyDirectories_1.cleanEmptyDirectories)(TEMP_DIR);
            yield (0, CleanEmptyDirectories_1.cleanEmptyDirectories)(ROOT_DIR);
            (0, logger_1.info)({
                phase: "Cleaner",
                component: "PeriodicCleanUp",
                payload: {
                    message: "Limpieza de carpetas vacías completada.",
                },
            });
        }
        catch (err) {
            (0, logger_1.error)({
                phase: "Cleaner",
                component: "PeriodicCleanUp",
                payload: {
                    message: `Error general en limpieza periódica: ${err.message}`,
                },
            });
        }
        finally {
            isCleaning = false;
        }
    }), INTERVAL_MS);
};
exports.startPeriodicCleanUp = startPeriodicCleanUp;
//# sourceMappingURL=emptyDirectoryCleaner.js.map