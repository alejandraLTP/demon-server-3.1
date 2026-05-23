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
exports.deleteUserService = exports.updateUserService = exports.getUserService = exports.getAllUsersService = exports.createUserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const logger_1 = require("../config/logger");
const ORMConfig_1 = require("../config/ORMConfig");
const demonAuth_1 = require("../Entities/demonAuth");
const baseHttpError_1 = require("../middleware/errors/baseHttpError");
const userRepository = ORMConfig_1.AppDataSource.getRepository(demonAuth_1.DemonAuth);
const createUserService = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield userRepository.findOne({ where: { username } });
        if (existingUser) {
            (0, logger_1.error)({
                phase: "createUserService",
                component: "createUserService",
                payload: {
                    message: "El usuario ya existe",
                    userId: existingUser.id,
                },
            });
            throw new baseHttpError_1.UserExistValidation();
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = userRepository.create({
            id: (0, uuid_1.v4)(),
            username,
            password: hashedPassword,
        });
        yield userRepository.save(newUser);
        (0, logger_1.info)({
            phase: "createUserService",
            component: "createUserService",
            payload: {
                message: "Usuario creado exitosamente",
                userId: newUser.id,
            },
        });
        return newUser;
    }
    catch (err) {
        (0, logger_1.error)({
            phase: "createUserService",
            component: "createUserService",
            payload: {
                message: err.message,
                description: "Error al crear el usuario",
            },
        });
        throw err;
    }
});
exports.createUserService = createUserService;
const getAllUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userRepository.find();
        (0, logger_1.info)({
            phase: "getAllUsersService",
            component: "getAllUsersService",
            payload: {
                message: "Usuarios obtenidos exitosamente",
                count: users.length,
            },
        });
        return users;
    }
    catch (err) {
        (0, logger_1.error)({
            phase: "getAllUsersService",
            component: "getAllUsersService",
            payload: {
                message: err.message,
                description: "Error al obtener los usuarios",
            },
        });
        throw new Error("Error al obtener los usuarios");
    }
});
exports.getAllUsersService = getAllUsersService;
const getUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userRepository.findOne({ where: { id } });
        if (!user) {
            (0, logger_1.error)({
                phase: "getUserService",
                component: "getUserService",
                payload: {
                    message: "Usuario no encontrado",
                    userId: id,
                },
            });
            throw new Error("Usuario no encontrado");
        }
        (0, logger_1.info)({
            phase: "getUserService",
            component: "getUserService",
            payload: {
                message: "Usuario obtenido exitosamente",
                userId: user.id,
            },
        });
        return user;
    }
    catch (err) {
        (0, logger_1.error)({
            phase: "getUserService",
            component: "getUserService",
            payload: {
                message: err.message,
                description: "Error al obtener el usuario",
            },
        });
        throw new Error("Error al obtener el usuario");
    }
});
exports.getUserService = getUserService;
const updateUserService = (id, username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userRepository.findOne({ where: { id } });
        if (!user) {
            (0, logger_1.error)({
                phase: "updateUserService",
                component: "updateUserService",
                payload: {
                    message: "Usuario no encontrado",
                    userId: id,
                },
            });
            throw new Error("Usuario no encontrado");
        }
        user.username = username || user.username;
        if (password) {
            user.password = yield bcrypt_1.default.hash(password, 10);
        }
        yield userRepository.save(user);
        (0, logger_1.info)({
            phase: "updateUserService",
            payload: {
                message: "Usuario actualizado exitosamente",
                userId: user.id,
            },
        });
        return user;
    }
    catch (err) {
        (0, logger_1.error)({
            phase: "updateUserService",
            payload: {
                message: err.message,
                description: "Error al actualizar el usuario",
            },
        });
        throw new Error("Error al actualizar el usuario");
    }
});
exports.updateUserService = updateUserService;
const deleteUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userRepository.findOne({ where: { id } });
        if (!user) {
            (0, logger_1.error)({
                phase: "deleteUserService",
                component: "deleteUserService",
                payload: {
                    message: "Usuario no encontrado",
                    userId: id,
                },
            });
            throw new Error("Usuario no encontrado");
        }
        const userId = user.id;
        yield userRepository.remove(user);
        (0, logger_1.info)({
            phase: "deleteUserService",
            payload: {
                message: "Usuario eliminado exitosamente",
                userId,
            },
        });
        return userId;
    }
    catch (err) {
        (0, logger_1.error)({
            phase: "deleteUserService",
            component: "deleteUserService",
            payload: {
                message: err.message,
                description: "Error al eliminar el usuario",
            },
        });
        throw new Error("Error al eliminar el usuario");
    }
});
exports.deleteUserService = deleteUserService;
//# sourceMappingURL=demonService.js.map