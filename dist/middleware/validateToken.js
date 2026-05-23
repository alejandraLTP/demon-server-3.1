"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validateToken;
const jwt_1 = require("../config/jwt");
const logger_1 = require("../config/logger");
const baseHttpError_1 = require("./errors/baseHttpError");
function validateToken(req, res, next) {
    var _a, _b, _c, _d, _e, _f;
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.replace("Bearer ", "");
    if (!token) {
        (0, logger_1.error)({
            phase: "validateToken",
            component: "validateToken",
            payload: {
                message: "No se ha proporcionado token",
            },
        });
        return next(new baseHttpError_1.MissingAuthorizationHeaderError());
    }
    try {
        const payload = (0, jwt_1.verifyToken)(token);
        if (!payload) {
            (0, logger_1.error)({
                phase: "validateToken",
                payload: {
                    message: "Token inválido",
                },
            });
            return next(new baseHttpError_1.TokenError("Token inválido"));
        }
        req.endUser = payload;
        (0, logger_1.error)({
            phase: "validateToken_ok",
            component: "validateToken",
            payload: {
                message: "Token válido para upload/request protegida",
                userId: payload === null || payload === void 0 ? void 0 : payload.userId,
                username: payload === null || payload === void 0 ? void 0 : payload.username,
                tokenIat: payload === null || payload === void 0 ? void 0 : payload.iat,
                tokenExp: payload === null || payload === void 0 ? void 0 : payload.exp,
                correlationKey: [
                    (_d = (_c = (_a = req.headers["x-forwarded-for"]) !== null && _a !== void 0 ? _a : (_b = req.socket) === null || _b === void 0 ? void 0 : _b.remoteAddress) !== null && _c !== void 0 ? _c : req.ip) !== null && _d !== void 0 ? _d : "unknown-ip",
                    (_e = req.headers["user-agent"]) !== null && _e !== void 0 ? _e : "unknown-agent",
                    (_f = payload === null || payload === void 0 ? void 0 : payload.username) !== null && _f !== void 0 ? _f : "unknown-user",
                ].join("|"),
            },
        });
        next();
    }
    catch (err) {
        (0, logger_1.error)({
            phase: "validateToken",
            payload: {
                message: "Token inválido",
            },
        });
        return next(new baseHttpError_1.TokenError("Token inválido"));
    }
}
//# sourceMappingURL=validateToken.js.map