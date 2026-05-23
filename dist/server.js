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
exports.startServer = exports.app = void 0;
require("reflect-metadata");
const db_1 = require("./config/db");
const app_1 = __importDefault(require("./app"));
exports.app = app_1.default;
const config_1 = require("./config/config");
const emptyDirectoryCleaner_1 = require("./utils/emptyDirectoryCleaner");
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("\n\n🚀 Iniciando servidor...");
        const server = app_1.default.listen(config_1.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, db_1.connectDB)();
            console.log(`\t- 🚀 Server ready at: http://localhost:${config_1.PORT}`);
            (0, emptyDirectoryCleaner_1.startPeriodicCleanUp)();
        }));
        return server;
    }
    catch (error) {
        console.error("Error al iniciar el servidor:", error);
        process.exit(1);
    }
});
exports.startServer = startServer;
startServer();
//# sourceMappingURL=server.js.map