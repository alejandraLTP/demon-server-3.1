import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import { error, info } from "../config/logger";
import { AppDataSource } from "../config/ORMConfig";
import { DemonAuth } from "../Entities/demonAuth";
import { UserExistValidation } from "../middleware/errors/baseHttpError";

const userRepository = AppDataSource.getRepository(DemonAuth);

export const createUserService = async (username: string, password: string) => {
  try {
    const existingUser = await userRepository.findOne({ where: { username } });
    if (existingUser) {
      error({
        phase: "createUserService",
        component: "createUserService",
        payload: {
          message: "El usuario ya existe",
          userId: existingUser.id,
        },
      });
      throw new UserExistValidation();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userRepository.create({
      id: uuidv4(),
      username,
      password: hashedPassword,
    });

    await userRepository.save(newUser);

    info({
      phase: "createUserService",
      component: "createUserService",
      payload: {
        message: "Usuario creado exitosamente",
        userId: newUser.id,
      },
    });

    return newUser;
  } catch (err: any) {
    error({
      phase: "createUserService",
      component: "createUserService",
      payload: {
        message: err.message,
        description: "Error al crear el usuario",
      },
    });
    throw err;
  }
};

export const getAllUsersService = async () => {
  try {
    const users = await userRepository.find();

    info({
      phase: "getAllUsersService",
      component: "getAllUsersService",
      payload: {
        message: "Usuarios obtenidos exitosamente",
        count: users.length,
      },
    });

    return users;
  } catch (err: any) {
    error({
      phase: "getAllUsersService",
      component: "getAllUsersService",
      payload: {
        message: err.message,
        description: "Error al obtener los usuarios",
      },
    });
    throw new Error("Error al obtener los usuarios");
  }
};

export const getUserService = async (id: string) => {
  try {
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      error({
        phase: "getUserService",
        component: "getUserService",
        payload: {
          message: "Usuario no encontrado",
          userId: id,
        },
      });
      throw new Error("Usuario no encontrado");
    }

    info({
      phase: "getUserService",
      component: "getUserService",
      payload: {
        message: "Usuario obtenido exitosamente",
        userId: user.id,
      },
    });

    return user;
  } catch (err: any) {
    error({
      phase: "getUserService",
      component: "getUserService",
      payload: {
        message: err.message,
        description: "Error al obtener el usuario",
      },
    });
    throw new Error("Error al obtener el usuario");
  }
};

export const updateUserService = async (
  id: string,
  username: string,
  password: string
) => {
  try {
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      error({
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
      user.password = await bcrypt.hash(password, 10);
    }

    await userRepository.save(user);

    info({
      phase: "updateUserService",
      payload: {
        message: "Usuario actualizado exitosamente",
        userId: user.id,
      },
    });

    return user;
  } catch (err: any) {
    error({
      phase: "updateUserService",
      payload: {
        message: err.message,
        description: "Error al actualizar el usuario",
      },
    });
    throw new Error("Error al actualizar el usuario");
  }
};

export const deleteUserService = async (id: string) => {
  try {
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      error({
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

    await userRepository.remove(user);

    info({
      phase: "deleteUserService",
      payload: {
        message: "Usuario eliminado exitosamente",
        userId,
      },
    });

    return userId;
  } catch (err: any) {
    error({
      phase: "deleteUserService",
      component: "deleteUserService",
      payload: {
        message: err.message,
        description: "Error al eliminar el usuario",
      },
    });
    throw new Error("Error al eliminar el usuario");
  }
};
