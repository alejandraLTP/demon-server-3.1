import { RequestHandler } from "express";
import { error, info } from "../config/logger";
import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  getUserService,
  updateUserService,
} from "../services/demonService";

export const createUser: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const newUser = await createUserService(username, password);

    if (newUser) {
      res.status(201).json({
        message: "Usuario creado exitosamente",
        user: newUser,
      });
      info({
        phase: "createUser",
        payload: {
          message: "Usuario creado exitosamente",
          userId: newUser.id,
        },
      });
    } else {
      error({
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
  } catch (err: any) {
    error({
      phase: "createUser",
      payload: {
        message: err.message,
        description: err.description,
      },
    });
    next(err);
  }
};

export const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await getAllUsersService();

    if (users) {
      res.status(200).json({
        message: "Usuarios obtenidos exitosamente",
        users: users,
      });
      info({
        phase: "getAllUsers",
        payload: {
          message: "Usuarios obtenidos exitosamente",
          count: users.length,
        },
      });
    } else {
      error({
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
  } catch (err: any) {
    error({
      phase: "getAllUsers",
      payload: {
        message: err.message,
        description: err.description,
      },
    });
    next(err);
  }
};

export const getUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await getUserService(id);

    if (user) {
      res.status(200).json({
        message: "Usuario obtenido exitosamente",
        user: user,
      });
      info({
        phase: "getUser",
        payload: {
          message: "Usuario obtenido exitosamente",
          userId: user.id,
        },
      });
    } else {
      error({
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
  } catch (err: any) {
    error({
      phase: "getUser",
      payload: {
        message: err.message,
        description: err.description,
      },
    });
    next(err);
  }
};

export const updateUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const { username, password } = req.body;

  try {
    const updatedUser = await updateUserService(id, username, password);

    if (updatedUser) {
      res.status(200).json({
        message: "Usuario actualizado exitosamente",
        user: updatedUser,
      });
      info({
        phase: "updateUser",
        payload: {
          message: "Usuario actualizado exitosamente",
          userId: updatedUser.id,
        },
      });
    } else {
      error({
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
  } catch (err: any) {
    error({
      phase: "updateUser",
      payload: {
        message: err.message,
        description: err.description,
      },
    });
    next(err);
  }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedUser = await deleteUserService(id);

    if (deletedUser) {
      res.status(200).json({
        message: "Usuario eliminado exitosamente",
        user: deletedUser,
      });
      info({
        phase: "deleteUser",
        payload: {
          message: "Usuario eliminado exitosamente",
          userId: deletedUser,
        },
      });
    } else {
      error({
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
  } catch (err: any) {
    error({
      phase: "deleteUser",
      payload: {
        message: err.message,
        description: err.description,
      },
    });
    next(err);
  }
};
