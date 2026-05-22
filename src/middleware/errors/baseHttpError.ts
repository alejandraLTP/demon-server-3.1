import { StatusCodes } from "http-status-codes";

interface Errorable {
  toJSON(): object;
  getCode(): number;
}

export const enum Response {
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_ENOUGH_PERMISSIONS = "NOT_ENOUGH_PERMISSIONS",
  NO_ERROR = "NO_ERROR",
  WRONG_DATA = "WRONG_DATA",
  UNPROCESSABLE_ENTITY = "UNPROCESSABLE_ENTITY",
  RESOURCE_NOT_FOUND = "RESOURCE_NOT_FOUND",
  SERVER_ERROR = "SERVER_ERROR",
  SERVICE_NOT_ALLOWED = "SERVICE_NOT_ALLOWED",
  RESOURCE_ALREADY_EXISTS = "RESOURCE_ALREADY_EXISTS",
  TOKEN_EXPIRED = "TOKEN_EXPIRED",
  MISSING_AUTHORIZATION_HEADER = "MISSING_AUTHORIZATION_HEADER",
  MISSING_APIKEY_HEADER = "MISSING_APIKEY_HEADER",
}

type JsonResponseBody = {
  message: string;
  description?: string;
};

export abstract class BaseHttpError extends Error implements Errorable {
  toString() {
    return JSON.stringify(this.toJSON());
  }

  abstract toJSON(): object;

  abstract getCode(): number;
}

export class GenericError extends BaseHttpError {
  public message_: string;
  public description_: string | undefined = undefined;

  constructor(message = "SERVER_ERROR", description?: string) {
    super();

    this.message_ = message;
    this.description_ = description;
  }

  getCode() {
    return StatusCodes.INTERNAL_SERVER_ERROR;
  }

  toJSON(): object {
    const json: JsonResponseBody = {
      message: this.message_,
    };

    if (this.description_) {
      json.description = this.description_;
    }

    return json;
  }
}

export class ValidationError extends BaseHttpError {
  constructor(private errors_: object[]) {
    super();
  }

  getCode() {
    return StatusCodes.BAD_REQUEST;
  }

  toJSON(): object {
    return {
      message: "_DATA",
      description: this.errors_,
    };
  }
}

export class ResourceNotFoundError extends BaseHttpError {
  constructor() {
    super();
  }

  getCode() {
    return StatusCodes.NOT_FOUND;
  }

  toJSON(): object {
    return {
      message: "RESOURCE_NOT_FOUND",
      description: "El recurso solicitado no existe.",
    };
  }
}

export class UnauthorizedError extends GenericError {
  constructor(description?: string) {
    super(Response.UNAUTHORIZED, description);
  }

  getCode(): number {
    return StatusCodes.UNAUTHORIZED;
  }
}

export class TokenError extends GenericError {
  constructor(description?: string) {
    super(Response.UNAUTHORIZED, description);
  }

  getCode(): number {
    return StatusCodes.UNAUTHORIZED;
  }
}

export class MissingAuthorizationHeaderError extends GenericError {
  constructor() {
    super(Response.MISSING_AUTHORIZATION_HEADER);
  }

  getCode() {
    return StatusCodes.BAD_REQUEST;
  }
}

export class MissingApiKeyHeaderError extends GenericError {
  constructor() {
    super(Response.MISSING_APIKEY_HEADER);
  }

  getCode() {
    return StatusCodes.BAD_REQUEST;
  }
}

export class InvalidApiKeyError extends GenericError {
  constructor(description?: string) {
    super(Response.UNAUTHORIZED, description);
  }

  getCode() {
    return StatusCodes.UNAUTHORIZED;
  }
}

export class LoginValidationError extends GenericError {
  constructor() {
    super("USUARIO_O_CONTRASENA_INVALIDOS");
  }

  getCode(): number {
    return StatusCodes.BAD_REQUEST;
  }
}

export class InvalidAuthorizationHeaderError extends GenericError {
  constructor() {
    super(Response.UNAUTHORIZED);
  }

  getCode() {
    return StatusCodes.BAD_REQUEST;
  }
}

export class UserNotExistValidation extends GenericError {
  constructor() {
    super("USUARIO_NO_EXISTE");
  }
  getCode(): number {
    return StatusCodes.BAD_REQUEST;
  }
}

export class RoleNotExistValidation extends GenericError {
  constructor() {
    super("ROL_NO_EXISTE");
  }

  getCode(): number {
    return StatusCodes.BAD_REQUEST;
  }
}

export class UserExistValidation extends GenericError {
  constructor() {
    super("USUARIO_YA_EXISTE");
  }

  getCode(): number {
    return StatusCodes.BAD_REQUEST;
  }
}

export class InvalidInputError extends GenericError {
  constructor(message: string) {
    super(message);
    this.name = "IngresoInvalido";
  }
}

export class GenericErrorResponseWithText extends GenericError {
  constructor(description?: string) {
    super(description ? description : "ERROR_GENERICO", Response.WRONG_DATA);
  }

  getCode(): number {
    return StatusCodes.BAD_REQUEST;
  }
}

export class DataIncomplete extends GenericError {
  constructor() {
    super("DATOS_INCOMPLETOS");
  }

  getCode(): number {
    return StatusCodes.BAD_REQUEST;
  }
}

export class NotEnoughPermissionError extends GenericError {
  constructor() {
    super(Response.NOT_ENOUGH_PERMISSIONS);
  }

  getCode() {
    return StatusCodes.UNAUTHORIZED;
  }
}

export class ForbiddenError extends GenericError {
  constructor(description?: string) {
    super(Response.FORBIDDEN, description);
  }

  getCode() {
    return StatusCodes.FORBIDDEN;
  }
}
