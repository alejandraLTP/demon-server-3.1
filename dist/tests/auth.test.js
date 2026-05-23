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
const globals_1 = require("@jest/globals");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const crypt_1 = require("../config/crypt");
const ORMConfig_1 = require("../config/ORMConfig");
const demonAuth_1 = require("../Entities/demonAuth");
(0, globals_1.describe)("Auth Controller", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const userRepository = ORMConfig_1.AppDataSource.getRepository(demonAuth_1.DemonAuth);
        const hashedPassword = (0, crypt_1.hashPassword)("password123");
        yield userRepository.save({
            username: "testuser",
            password: hashedPassword,
            num_empleado: "123",
        });
    }));
    (0, globals_1.it)("Debe autenticar un usuario", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/api/auth")
            .send({ username: "testuser", password: "password123" });
        (0, globals_1.expect)(response.status).toBe(200);
        (0, globals_1.expect)(response.body.token).toBeDefined();
    }));
    (0, globals_1.it)("No debe autenticar un usuario con contraseña incorrecta", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/api/auth")
            .send({ username: "testuser", password: "wrongpassword" });
        (0, globals_1.expect)(response.status).toBe(400);
        (0, globals_1.expect)(response.body.message).toBe("USUARIO_O_CONTRASENA_INVALIDOS");
    }));
});
//# sourceMappingURL=auth.test.js.map