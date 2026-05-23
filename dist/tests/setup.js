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
exports.server = void 0;
const ORMConfig_1 = require("../config/ORMConfig");
const globals_1 = require("@jest/globals");
const server_1 = require("../server");
let server;
(0, globals_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
    if (!ORMConfig_1.AppDataSource.isInitialized) {
        yield ORMConfig_1.AppDataSource.initialize();
    }
    exports.server = server = yield (0, server_1.startServer)();
}));
(0, globals_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
    if (ORMConfig_1.AppDataSource.isInitialized) {
        yield ORMConfig_1.AppDataSource.destroy();
    }
    server.close();
}));
//# sourceMappingURL=setup.js.map