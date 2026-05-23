"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerConfig = void 0;
exports.debug = debug;
exports.error = error;
exports.info = info;
exports.ingesta = ingesta;
exports.uploadError = uploadError;
exports.uploadTrace = uploadTrace;
exports.warning = warning;
/* eslint-disable @typescript-eslint/no-explicit-any */
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const rotateTransport = (level, filename) => new winston_daily_rotate_file_1.default({
    level,
    filename,
    datePattern: "YYYY-MM-DD",
    maxSize: "10m",
    maxFiles: "7d",
    zippedArchive: true,
});
const logTransports = [
    rotateTransport("error", "logs/COVECA-error-%DATE%.log"),
    rotateTransport("info", "logs/COVECA-success-%DATE%.log"),
    rotateTransport("debug", "logs/COVECA-debug-%DATE%.log"),
];
const loggerConfig = {
    level: "info",
    format: winston_1.format.combine(winston_1.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
    }), winston_1.format.json()),
    transports: logTransports,
};
exports.loggerConfig = loggerConfig;
const logger = (0, winston_1.createLogger)(loggerConfig);
const uploadErrorLogger = (0, winston_1.createLogger)(Object.assign(Object.assign({}, loggerConfig), { transports: [rotateTransport("error", "logs/error-upload-%DATE%.log")] }));
const uploadTraceLogger = (0, winston_1.createLogger)(Object.assign(Object.assign({}, loggerConfig), { transports: [rotateTransport("info", "logs/upload-trace-%DATE%.log")] }));
const ingestaLogger = (0, winston_1.createLogger)(Object.assign(Object.assign({}, loggerConfig), { transports: [rotateTransport("info", "logs/ingesta-%DATE%.log")] }));
/**
 * Función para loggear mensajes con las opciones especificadas.
 * @param logMethod Método de logging de Winston.
 * @param options Opciones de log.
 */
function log(logMethod, options) {
    logMethod({
        requestId: options.requestId,
        clientIp: options.clientIp,
        userAgent: options.userAgent,
        initialTime: options.initialTime,
        finalTime: options.finalTime,
        module: options.module,
        component: options.component,
        phase: options.phase,
        payload: options.payload,
    });
}
function info(options) {
    log(logger.info, options);
}
function warning(options) {
    log(logger.warn, options);
}
function error(options) {
    log(logger.error, options);
}
function uploadError(options) {
    log(uploadErrorLogger.error, options);
}
function uploadTrace(options) {
    log(uploadTraceLogger.info, options);
}
function debug(options) {
    log(logger.debug, options);
}
function ingesta(options) {
    log(ingestaLogger.info, options);
}
//# sourceMappingURL=logger.js.map