"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEED_DATABASE = exports.DB_NAME = exports.DB_PASSWORD = exports.DB_USERNAME = exports.DB_PORT = exports.DB_HOST = exports.NODE_ENV = exports.LOCALFOLDER = exports.PORT = exports.SECRET_KEY = exports.AUTH_PASSWORD = exports.AUTH_USERNAME = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.AUTH_USERNAME = process.env.AUTH_USERNAME;
exports.AUTH_PASSWORD = process.env.AUTH_PASSWORD;
exports.SECRET_KEY = process.env.SECRET_KEY;
exports.PORT = process.env.PORT;
exports.LOCALFOLDER = process.env.LOCALFOLDER;
exports.NODE_ENV = process.env.NODE_ENV;
exports.DB_HOST = process.env.DB_HOST;
exports.DB_PORT = process.env.DB_PORT;
exports.DB_USERNAME = process.env.DB_USERNAME;
exports.DB_PASSWORD = process.env.DB_PASSWORD;
exports.DB_NAME = process.env.DB_NAME;
exports.SEED_DATABASE = process.env.SEED_DATABASE;
//# sourceMappingURL=config.js.map