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
exports.deleteUser = exports.updateUser = exports.getUser = exports.getAllUsers = exports.createUser = void 0;
const logger_1 = require("../config/logger");
const demonService_1 = require("../services/demonService");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const newUser = yield (0, demonService_1.createUserService)(username, password);
        if (newUser) {
            res.status(201).json({
                message: "Usuario creado exitosamente",
                user: newUser,
            });
            (0, logger_1.info)({
                phase: "createUser",
                payload: {
                    message: "Usuario creado exitosamente",
                    userId: newUser.id,
                },
            });
        }
        else {
            (0, logger_1.error)({
                phase: "createUser",
                payload: {
                    message: "Error al crear el usuario",
                },
            });
            res.status(400).json({
                status: false,
                message: "Error al crear el usuario",
            });
        }
    }
    catch (err) {
        (0, logger_1.error)({
            phase: "createUser",
            payload: {
                message: err.message,
                description: err.description,
            },
        });
        next(err);
    }
});
exports.createUser = createUser;
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, demonService_1.getAllUsersService)();
        if (users) {
            res.status(200).json({
                message: "Usuarios obtenidos exitosamente",
                users: users,
            });
            (0, logger_1.info)({
                phase: "getAllUsers",
                payload: {
                    message: "Usuarios obtenidos exitosamente",
                    count: users.length,
                },
            });
        }
        else {
            (0, logger_1.error)({
                phase: "getAllUsers",
                payload: {
                    message: "Error al obtener los usuarios",
                },
            });
            res.status(404).json({
                status: false,
                message: "No se encontraron usuarios",
            });
        }
    }
    catch (err) {
        (0, logger_1.error)({
            phase: "getAllUsers",
            payload: {
                message: err.message,
                description: err.description,
            },
        });
        next(err);
    }
});
exports.getAllUsers = getAllUsers;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield (0, demonService_1.getUserService)(id);
        if (user) {
            res.status(200).json({
                message: "Usuario obtenido exitosamente",
                user: user,
            });
            (0, logger_1.info)({
                phase: "getUser",
                payload: {
                    message: "Usuario obtenido exitosamente",
                    userId: user.id,
                },
            });
        }
        else {
            (0, logger_1.error)({
                phase: "getUser",
                payload: {
                    message: "Usuario no encontrado",
                },
            });
            res.status(404).json({
                status: false,
                message: "Usuario no encontrado",
            });
        }
    }
    catch (err) {
        (0, logger_1.error)({
            phase: "getUser",
            payload: {
                message: err.message,
                description: err.description,
            },
        });
        next(err);
    }
});
exports.getUser = getUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { username, password } = req.body;
    try {
        const updatedUser = yield (0, demonService_1.updateUserService)(id, username, password);
        if (updatedUser) {
            res.status(200).json({
                message: "Usuario actualizado exitosamente",
                user: updatedUser,
            });
            (0, logger_1.info)({
                phase: "updateUser",
                payload: {
                    message: "Usuario actualizado exitosamente",
                    userId: updatedUser.id,
                },
            });
        }
        else {
            (0, logger_1.error)({
                phase: "updateUser",
                payload: {
                    message: "Error al actualizar el usuario",
                },
            });
            res.status(400).json({
                status: false,
                message: "Error al actualizar el usuario",
            });
        }
    }
    catch (err) {
        (0, logger_1.error)({
            phase: "updateUser",
            payload: {
                message: err.message,
                description: err.description,
            },
        });
        next(err);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedUser = yield (0, demonService_1.deleteUserService)(id);
        if (deletedUser) {
            res.status(200).json({
                message: "Usuario eliminado exitosamente",
                user: deletedUser,
            });
            (0, logger_1.info)({
                phase: "deleteUser",
                payload: {
                    message: "Usuario eliminado exitosamente",
                    userId: deletedUser,
                },
            });
        }
        else {
            (0, logger_1.error)({
                phase: "deleteUser",
                payload: {
                    message: "Usuario no encontrado",
                },
            });
            res.status(400).json({
                status: false,
                message: "Error al eliminar el usuario",
            });
        }
    }
    catch (err) {
        (0, logger_1.error)({
            phase: "deleteUser",
            payload: {
                message: err.message,
                description: err.description,
            },
        });
        next(err);
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=demonController.js.map