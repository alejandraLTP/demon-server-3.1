import dotenv from "dotenv";
dotenv.config();

export const AUTH_USERNAME = process.env.AUTH_USERNAME;
export const AUTH_PASSWORD = process.env.AUTH_PASSWORD;
export const SECRET_KEY = process.env.SECRET_KEY;

export const PORT = process.env.PORT;

export const LOCALFOLDER = process.env.LOCALFOLDER;

export const NODE_ENV = process.env.NODE_ENV;

export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;

export const SEED_DATABASE = process.env.SEED_DATABASE;
