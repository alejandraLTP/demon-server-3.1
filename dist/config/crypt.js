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
exports.verifyPassword = exports.hashPassword = exports.comparePassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
/**
 * Hashea la contraseña utilizando bcrypt.
 * @param password La contraseña en texto plano.
 * @returns La contraseña hasheada.
 */
const hashPassword = (password) => {
    const salt = '$2b$10$1234567890123456789012';
    return bcrypt_1.default.hashSync(password, salt);
};
exports.hashPassword = hashPassword;
/**
 * Verifica una contraseña en texto plano contra un hash.
 * @param password La contraseña en texto plano.
 * @param hash El hash de la contraseña.
 * @returns Una promesa que se resuelve en true si la contraseña coincide, false en caso contrario.
 */
const verifyPassword = (password, hash) => {
    return bcrypt_1.default.compare(password, hash);
};
exports.verifyPassword = verifyPassword;
/**
 * Compara una contraseña en texto plano con una contraseña guardada.
 * @param password La contraseña en texto plano.
 * @param passwordSaved La contraseña guardada para comparar.
 * @returns Una promesa que se resuelve en true si las contraseñas coinciden, false en caso contrario.
 */
const comparePassword = (password, passwordSaved) => __awaiter(void 0, void 0, void 0, function* () {
    const isMatch = yield bcrypt_1.default.compare(password, passwordSaved);
    return isMatch;
});
exports.comparePassword = comparePassword;
//# sourceMappingURL=crypt.js.map