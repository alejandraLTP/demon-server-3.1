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
exports.login = void 0;
const logger_1 = require("../config/logger");
const authService_1 = require("../services/authService");
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
    const incomingBody = (_a = req.body) !== null && _a !== void 0 ? _a : {};
    let normalizedBody = incomingBody;
    if (typeof incomingBody === "object" &&
        !Array.isArray(incomingBody) &&
        !incomingBody.username &&
        !incomingBody.password &&
        Object.keys(incomingBody).length === 1) {
        const [rawKey] = Object.keys(incomingBody);
        if (rawKey.startsWith("{") && rawKey.endsWith("}")) {
            try {
                normalizedBody = JSON.parse(rawKey);
            }
            catch (_z) {
                normalizedBody = incomingBody;
            }
        }
    }
    const { username, password } = normalizedBody;
    const loginCorrelationKey = [
        (_e = (_d = (_b = req.headers["x-forwarded-for"]) !== null && _b !== void 0 ? _b : (_c = req.socket) === null || _c === void 0 ? void 0 : _c.remoteAddress) !== null && _d !== void 0 ? _d : req.ip) !== null && _e !== void 0 ? _e : "unknown-ip",
        (_f = req.headers["user-agent"]) !== null && _f !== void 0 ? _f : "unknown-agent",
        (_g = normalizedBody === null || normalizedBody === void 0 ? void 0 : normalizedBody.username) !== null && _g !== void 0 ? _g : "unknown-user",
    ].join("|");
    console.log("[LOGIN_REQUEST_BODY]", (_h = req.body) !== null && _h !== void 0 ? _h : {});
    console.log("[LOGIN_REQUEST_HEADERS]", (_j = req.headers) !== null && _j !== void 0 ? _j : {});
    (0, logger_1.error)({
        phase: "login_request",
        component: "login",
        payload: {
            message: "Request de login recibida",
            body: (_k = req.body) !== null && _k !== void 0 ? _k : {},
            normalizedBody,
            headers: (_l = req.headers) !== null && _l !== void 0 ? _l : {},
            loginCorrelationKey,
        },
    });
    const requestSource = {
        aduana: (_m = normalizedBody === null || normalizedBody === void 0 ? void 0 : normalizedBody.aduana) !== null && _m !== void 0 ? _m : req.headers["x-aduana"],
        equipo: (_o = normalizedBody === null || normalizedBody === void 0 ? void 0 : normalizedBody.equipo) !== null && _o !== void 0 ? _o : req.headers["x-equipo"],
        ip: (_s = (_r = (_p = req.headers["x-forwarded-for"]) !== null && _p !== void 0 ? _p : (_q = req.socket) === null || _q === void 0 ? void 0 : _q.remoteAddress) !== null && _r !== void 0 ? _r : req.ip) !== null && _s !== void 0 ? _s : "unknown",
        userAgent: (_t = req.headers["user-agent"]) !== null && _t !== void 0 ? _t : "unknown",
    };
    if (!username || !password) {
        console.log("[LOGIN_INVALID_PAYLOAD]", {
            message: "Solicitud de login sin username/password",
            source: requestSource,
            bodyKeys: Object.keys((_u = req.body) !== null && _u !== void 0 ? _u : {}),
            usernamePresent: Boolean(username),
            passwordPresent: Boolean(password),
        });
        (0, logger_1.error)({
            phase: "login_invalid_payload",
            component: "login",
            payload: {
                message: "Solicitud de login sin username/password",
                source: requestSource,
                body: (_v = req.body) !== null && _v !== void 0 ? _v : {},
                normalizedBody,
                headers: (_w = req.headers) !== null && _w !== void 0 ? _w : {},
                bodyKeys: Object.keys((_x = req.body) !== null && _x !== void 0 ? _x : {}),
                contentType: (_y = req.headers["content-type"]) !== null && _y !== void 0 ? _y : "unknown",
                usernamePresent: Boolean(username),
                passwordPresent: Boolean(password),
                loginCorrelationKey,
                uploadWillRequireValidToken: true,
            },
        });
    }
    try {
        const token = yield (0, authService_1.userLogin)(username, password);
        if (token) {
            res.status(200).json({
                message: "Inicio de sesión exitoso",
                token: token.token,
            });
            (0, logger_1.info)({
                phase: "login",
                payload: {
                    message: "Inicio de sesión exitoso",
                    loginCorrelationKey,
                    username,
                },
            });
        }
        else {
            (0, logger_1.error)({
                phase: "login",
                payload: {
                    message: "Error de autenticación",
                },
            });
            res.status(401).json({
                status: false,
                message: "Error de autenticación",
            });
            next();
        }
    }
    catch (err) {
        (0, logger_1.error)({
            phase: "login",
            component: "login",
            payload: {
                message: err.message,
                description: err.description,
                loginCorrelationKey,
                usernamePresent: Boolean(username),
                passwordPresent: Boolean(password),
                uploadWillRequireValidToken: true,
            },
        });
        next(err);
    }
});
exports.login = login;
//# sourceMappingURL=authController.js.map