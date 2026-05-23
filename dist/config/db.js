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
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const ORMConfig_1 = require("./ORMConfig");
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // if (!AppDataSource.isInitialized) {
        yield ORMConfig_1.AppDataSource.initialize();
        // }
        console.log("\t- 📚 PostgreSQL conectado con éxito");
    }
    catch (error) {
        console.error("\t - ❌ Error al conectar a PostgreSQL:", error);
        process.exit(1);
    }
});
exports.connectDB = connectDB;
//# sourceMappingURL=db.js.map