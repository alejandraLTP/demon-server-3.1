import bcrypt from "bcrypt";

/**
 * Hashea la contraseña utilizando bcrypt.
 * @param password La contraseña en texto plano.
 * @returns La contraseña hasheada.
 */

const hashPassword = (password: string) => {
  const salt = '$2b$10$1234567890123456789012';
  return bcrypt.hashSync(password, salt);
};

/**
 * Verifica una contraseña en texto plano contra un hash.
 * @param password La contraseña en texto plano.
 * @param hash El hash de la contraseña.
 * @returns Una promesa que se resuelve en true si la contraseña coincide, false en caso contrario.
 */

const verifyPassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

/**
 * Compara una contraseña en texto plano con una contraseña guardada.
 * @param password La contraseña en texto plano.
 * @param passwordSaved La contraseña guardada para comparar.
 * @returns Una promesa que se resuelve en true si las contraseñas coinciden, false en caso contrario.
 */

const comparePassword = async (password: string, passwordSaved: string) => {
  const isMatch = await bcrypt.compare(password, passwordSaved);
  return isMatch;
};

export { comparePassword, hashPassword, verifyPassword };
