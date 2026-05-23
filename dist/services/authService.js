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
exports.userLogin = void 0;
const crypt_1 = require("../config/crypt");
const jwt_1 = require("../config/jwt");
const logger_1 = require("../config/logger");
const ORMConfig_1 = require("../config/ORMConfig");
const demonAuth_1 = require("../Entities/demonAuth");
const baseHttpError_1 = require("../middleware/errors/baseHttpError");
const userRepository = ORMConfig_1.AppDataSource.getRepository(demonAuth_1.DemonAuth);
const generateToken = (userId, username) => {
    const payload = {
        userId,
        username,
        createdAt: new Date(),
    };
    return (0, jwt_1.sign)(payload);
};
const userLogin = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    (0, logger_1.error)({
        phase: "userLogin_request",
        component: "userLogin",
        payload: {
            message: "Intento de login recibido en servicio",
            username,
            password,
        },
    });
    try {
        if (!username || !password) {
            (0, logger_1.error)({
                phase: "userLogin",
                component: "userLogin",
                payload: {
                    message: "Faltan datos de inicio de sesión",
                },
            });
            throw new baseHttpError_1.LoginValidationError();
        }
        const user = yield userRepository.findOne({ where: { username } });
        if (!user) {
            (0, logger_1.error)({
                phase: "userLogin",
                component: "userLogin",
                payload: {
                    message: "Usuario no encontrado",
                    userId: username,
                },
            });
            throw new baseHttpError_1.UserNotExistValidation();
        }
        (0, logger_1.error)({
            phase: "userLogin_password_check",
            component: "userLogin",
            payload: {
                message: "Verificando contraseña",
                userId: user.id,
                username: user.username,
                storedPassword: user.password,
                receivedPasswordHash: (0, crypt_1.hashPassword)(password),
            },
        });
        const isPasswordValid = yield (0, crypt_1.verifyPassword)(password, user.password);
        if (!isPasswordValid) {
            (0, logger_1.error)({
                phase: "userLogin",
                component: "userLogin",
                payload: {
                    message: "Contraseña incorrecta",
                    userId: user.id,
                },
            });
            throw new baseHttpError_1.LoginValidationError();
        }
        const token = generateToken(user.id.toString(), user.username);
        (0, logger_1.info)({
            phase: "userLogin",
            component: "userLogin",
            payload: {
                message: "Inicio de sesión exitoso",
                userId: user.id,
            },
        });
        return { token };
    }
    catch (err) {
        (0, logger_1.error)({
            phase: "userLogin",
            component: "userLogin",
            payload: {
                message: err.message,
                description: "Error en el inicio de sesión",
            },
        });
        (0, logger_1.error)({
            phase: "userLogin_exception",
            component: "userLogin",
            payload: {
                message: "Excepción en userLogin",
                err,
            },
        });
        throw new Error("Error en el inicio de sesión");
    }
});
exports.userLogin = userLogin;
//# sourceMappingURL=authService.js.map