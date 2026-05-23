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
const crypt_1 = require("../config/crypt");
const ORMConfig_1 = require("../config/ORMConfig");
const demonAuth_1 = require("../Entities/demonAuth");
const server_1 = require("../server");
(0, globals_1.describe)("CRUD de operaciones en DemonAuth", () => {
    let userId;
    let URL = "/api/users";
    let respuesta;
    let commonHeaders = {};
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const userRepository = ORMConfig_1.AppDataSource.getRepository(demonAuth_1.DemonAuth);
        const hashedPassword = (0, crypt_1.hashPassword)("password123");
        yield userRepository.save({
            username: "testuser",
            password: hashedPassword,
            num_empleado: "123",
        });
        const response = yield (0, supertest_1.default)(server_1.app)
            .post("/api/auth")
            .send({ username: "testuser", password: "password123" });
        respuesta = response.body.token;
        commonHeaders = {
            authorization: `Bearer ${respuesta}`,
        };
    }));
    (0, globals_1.it)("Debe crear un nuevo usuario", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app).post(URL).set(commonHeaders).send({
            username: "newuser",
            num_empleado: "001",
            password: "password123",
        });
        (0, globals_1.expect)(response.status).toBe(201);
        (0, globals_1.expect)(response.body.user).toBeDefined();
        userId = response.body.user.id;
    }));
    (0, globals_1.it)("Debe obtener todos los usuarios", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app).get(URL).set(commonHeaders);
        (0, globals_1.expect)(response.status).toBe(200);
        (0, globals_1.expect)(response.body.users.length).toBeGreaterThan(0);
    }));
    (0, globals_1.it)("Debe obtener un usuario por su ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app)
            .get(`${URL}/${userId}`)
            .set(commonHeaders);
        (0, globals_1.expect)(response.status).toBe(200);
        (0, globals_1.expect)(response.body.user.id).toBe(userId);
    }));
    (0, globals_1.it)("Debe actualizar un usuario", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app)
            .put(`${URL}/${userId}`)
            .send({ username: "updateduser" })
            .set(commonHeaders);
        (0, globals_1.expect)(response.status).toBe(200);
        (0, globals_1.expect)(response.body.user.username).toBe("updateduser");
    }));
    (0, globals_1.it)("Debe eliminar un usuario", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app)
            .delete(`${URL}/${userId}`)
            .set(commonHeaders);
        (0, globals_1.expect)(response.status).toBe(200);
        (0, globals_1.expect)(response.body.user).toBe(userId);
    }));
});
//# sourceMappingURL=crud.test.js.map