import jsonwebtoken from "jsonwebtoken";
import { SECRET_KEY } from "./config";

/**
 * Hashea la contraseña utilizando bcrypt.
 * @param password La contraseña en texto plano.
 * @returns La contraseña hasheada.
 */

export function sign(payload: object) {
  return jsonwebtoken.sign(payload, SECRET_KEY!, { expiresIn: "24h" });
}

/**
 * Verifica una contraseña en texto plano contra un hash.
 * @param password La contraseña en texto plano.
 * @param hash El hash de la contraseña.
 * @returns Una promesa que se resuelve en true si la contraseña coincide, false en caso contrario.
 */

export function verifyToken(token: string) {
  return jsonwebtoken.verify(token, SECRET_KEY!);
}
