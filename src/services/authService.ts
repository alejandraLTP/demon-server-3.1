import { hashPassword, verifyPassword } from "../config/crypt";
import { sign } from "../config/jwt";
import { error, info } from "../config/logger";
import { AppDataSource } from "../config/ORMConfig";
import { DemonAuth } from "../Entities/demonAuth";
import {
  LoginValidationError,
  UserNotExistValidation,
} from "../middleware/errors/baseHttpError";

const userRepository = AppDataSource.getRepository(DemonAuth);

const generateToken = (userId: string, username: string) => {
  const payload = {
    userId,
    username,
    createdAt: new Date(),
  };

  return sign(payload);
};

export const userLogin = async (username: string, password: string) => {
  error({
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
      error({
        phase: "userLogin",
        component: "userLogin",
        payload: {
          message: "Faltan datos de inicio de sesión",
        },
      });
      throw new LoginValidationError();
    }

    const user = await userRepository.findOne({ where: { username } });

    if (!user) {
      error({
        phase: "userLogin",
        component: "userLogin",
        payload: {
          message: "Usuario no encontrado",
          userId: username,
        },
      });
      throw new UserNotExistValidation();
    }
    error({
      phase: "userLogin_password_check",
      component: "userLogin",
      payload: {
        message: "Verificando contraseña",
        userId: user.id,
        username: user.username,
        storedPassword: user.password,
        receivedPasswordHash: hashPassword(password),
      },
    });
    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      error({
        phase: "userLogin",
        component: "userLogin",
        payload: {
          message: "Contraseña incorrecta",
          userId: user.id,
        },
      });
      throw new LoginValidationError();
    }

    const token = generateToken(user.id.toString(), user.username);

    info({
      phase: "userLogin",
      component: "userLogin",
      payload: {
        message: "Inicio de sesión exitoso",
        userId: user.id,
      },
    });

    return { token };
  } catch (err: any) {
    error({
      phase: "userLogin",
      component: "userLogin",
      payload: {
        message: err.message,
        description: "Error en el inicio de sesión",
      },
    });
    error({
      phase: "userLogin_exception",
      component: "userLogin",
      payload: {
        message: "Excepción en userLogin",
        err,
      },
    });
    throw new Error("Error en el inicio de sesión");
  }
};
