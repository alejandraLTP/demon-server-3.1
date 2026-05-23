"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = exports.NotEnoughPermissionError = exports.DataIncomplete = exports.GenericErrorResponseWithText = exports.InvalidInputError = exports.UserExistValidation = exports.RoleNotExistValidation = exports.UserNotExistValidation = exports.InvalidAuthorizationHeaderError = exports.LoginValidationError = exports.InvalidApiKeyError = exports.MissingApiKeyHeaderError = exports.MissingAuthorizationHeaderError = exports.TokenError = exports.UnauthorizedError = exports.ResourceNotFoundError = exports.ValidationError = exports.GenericError = exports.BaseHttpError = void 0;
const http_status_codes_1 = require("http-status-codes");
class BaseHttpError extends Error {
    toString() {
        return JSON.stringify(this.toJSON());
    }
}
exports.BaseHttpError = BaseHttpError;
class GenericError extends BaseHttpError {
    constructor(message = "SERVER_ERROR", description) {
        super();
        this.description_ = undefined;
        this.message_ = message;
        this.description_ = description;
    }
    getCode() {
        return http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    }
    toJSON() {
        const json = {
            message: this.message_,
        };
        if (this.description_) {
            json.description = this.description_;
        }
        return json;
    }
}
exports.GenericError = GenericError;
class ValidationError extends BaseHttpError {
    constructor(errors_) {
        super();
        this.errors_ = errors_;
    }
    getCode() {
        return http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
    toJSON() {
        return {
            message: "_DATA",
            description: this.errors_,
        };
    }
}
exports.ValidationError = ValidationError;
class ResourceNotFoundError extends BaseHttpError {
    constructor() {
        super();
    }
    getCode() {
        return http_status_codes_1.StatusCodes.NOT_FOUND;
    }
    toJSON() {
        return {
            message: "RESOURCE_NOT_FOUND",
            description: "El recurso solicitado no existe.",
        };
    }
}
exports.ResourceNotFoundError = ResourceNotFoundError;
class UnauthorizedError extends GenericError {
    constructor(description) {
        super("UNAUTHORIZED" /* Response.UNAUTHORIZED */, description);
    }
    getCode() {
        return http_status_codes_1.StatusCodes.UNAUTHORIZED;
    }
}
exports.UnauthorizedError = UnauthorizedError;
class TokenError extends GenericError {
    constructor(description) {
        super("UNAUTHORIZED" /* Response.UNAUTHORIZED */, description);
    }
    getCode() {
        return http_status_codes_1.StatusCodes.UNAUTHORIZED;
    }
}
exports.TokenError = TokenError;
class MissingAuthorizationHeaderError extends GenericError {
    constructor() {
        super("MISSING_AUTHORIZATION_HEADER" /* Response.MISSING_AUTHORIZATION_HEADER */);
    }
    getCode() {
        return http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
}
exports.MissingAuthorizationHeaderError = MissingAuthorizationHeaderError;
class MissingApiKeyHeaderError extends GenericError {
    constructor() {
        super("MISSING_APIKEY_HEADER" /* Response.MISSING_APIKEY_HEADER */);
    }
    getCode() {
        return http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
}
exports.MissingApiKeyHeaderError = MissingApiKeyHeaderError;
class InvalidApiKeyError extends GenericError {
    constructor(description) {
        super("UNAUTHORIZED" /* Response.UNAUTHORIZED */, description);
    }
    getCode() {
        return http_status_codes_1.StatusCodes.UNAUTHORIZED;
    }
}
exports.InvalidApiKeyError = InvalidApiKeyError;
class LoginValidationError extends GenericError {
    constructor() {
        super("USUARIO_O_CONTRASENA_INVALIDOS");
    }
    getCode() {
        return http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
}
exports.LoginValidationError = LoginValidationError;
class InvalidAuthorizationHeaderError extends GenericError {
    constructor() {
        super("UNAUTHORIZED" /* Response.UNAUTHORIZED */);
    }
    getCode() {
        return http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
}
exports.InvalidAuthorizationHeaderError = InvalidAuthorizationHeaderError;
class UserNotExistValidation extends GenericError {
    constructor() {
        super("USUARIO_NO_EXISTE");
    }
    getCode() {
        return http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
}
exports.UserNotExistValidation = UserNotExistValidation;
class RoleNotExistValidation extends GenericError {
    constructor() {
        super("ROL_NO_EXISTE");
    }
    getCode() {
        return http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
}
exports.RoleNotExistValidation = RoleNotExistValidation;
class UserExistValidation extends GenericError {
    constructor() {
        super("USUARIO_YA_EXISTE");
    }
    getCode() {
        return http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
}
exports.UserExistValidation = UserExistValidation;
class InvalidInputError extends GenericError {
    constructor(message) {
        super(message);
        this.name = "IngresoInvalido";
    }
}
exports.InvalidInputError = InvalidInputError;
class GenericErrorResponseWithText extends GenericError {
    constructor(description) {
        super(description ? description : "ERROR_GENERICO", "WRONG_DATA" /* Response.WRONG_DATA */);
    }
    getCode() {
        return http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
}
exports.GenericErrorResponseWithText = GenericErrorResponseWithText;
class DataIncomplete extends GenericError {
    constructor() {
        super("DATOS_INCOMPLETOS");
    }
    getCode() {
        return http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
}
exports.DataIncomplete = DataIncomplete;
class NotEnoughPermissionError extends GenericError {
    constructor() {
        super("NOT_ENOUGH_PERMISSIONS" /* Response.NOT_ENOUGH_PERMISSIONS */);
    }
    getCode() {
        return http_status_codes_1.StatusCodes.UNAUTHORIZED;
    }
}
exports.NotEnoughPermissionError = NotEnoughPermissionError;
class ForbiddenError extends GenericError {
    constructor(description) {
        super("FORBIDDEN" /* Response.FORBIDDEN */, description);
    }
    getCode() {
        return http_status_codes_1.StatusCodes.FORBIDDEN;
    }
}
exports.ForbiddenError = ForbiddenError;
//# sourceMappingURL=baseHttpError.js.map