"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sign = sign;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
/**
 * Hashea la contraseña utilizando bcrypt.
 * @param password La contraseña en texto plano.
 * @returns La contraseña hasheada.
 */
function sign(payload) {
    return jsonwebtoken_1.default.sign(payload, config_1.SECRET_KEY, { expiresIn: "24h" });
}
/**
 * Verifica una contraseña en texto plano contra un hash.
 * @param password La contraseña en texto plano.
 * @param hash El hash de la contraseña.
 * @returns Una promesa que se resuelve en true si la contraseña coincide, false en caso contrario.
 */
function verifyToken(token) {
    return jsonwebtoken_1.default.verify(token, config_1.SECRET_KEY);
}
//# sourceMappingURL=jwt.js.map