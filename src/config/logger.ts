/* eslint-disable @typescript-eslint/no-explicit-any */
import { createLogger, format, Logger } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import Transport from "winston-transport";

export type LogOptions = {
  requestId?: string;
  initialTime?: number;
  finalTime?: number;
  module?: string;
  component?: string;
  phase: string;
  payload: any;
  clientIp?: string;
  userAgent?: string;
};

const rotateTransport = (level: string, filename: string) =>
  new DailyRotateFile({
    level,
    filename,
    datePattern: "YYYY-MM-DD",
    maxSize: "10m",
    maxFiles: "7d",
    zippedArchive: true,
  });

const logTransports: Transport[] = [
  rotateTransport("error", "logs/COVECA-error-%DATE%.log"),
  rotateTransport("info", "logs/COVECA-success-%DATE%.log"),
  rotateTransport("debug", "logs/COVECA-debug-%DATE%.log"),
];

const loggerConfig = {
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.json()
  ),
  transports: logTransports,
};

const logger: Logger = createLogger(loggerConfig);
const uploadErrorLogger: Logger = createLogger({
  ...loggerConfig,
  transports: [rotateTransport("error", "logs/error-upload-%DATE%.log")],
});
const uploadTraceLogger: Logger = createLogger({
  ...loggerConfig,
  transports: [rotateTransport("info", "logs/upload-trace-%DATE%.log")],
});

const ingestaLogger: Logger = createLogger({
  ...loggerConfig,
  transports: [rotateTransport("info", "logs/ingesta-%DATE%.log")],
});

/**
 * Función para loggear mensajes con las opciones especificadas.
 * @param logMethod Método de logging de Winston.
 * @param options Opciones de log.
 */
function log(logMethod: Logger["info"], options: LogOptions): void {
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

function info(options: LogOptions): void {
  log(logger.info, options);
}

function warning(options: LogOptions): void {
  log(logger.warn, options);
}

function error(options: LogOptions): void {
  log(logger.error, options);
}

function uploadError(options: LogOptions): void {
  log(uploadErrorLogger.error, options);
}

function uploadTrace(options: LogOptions): void {
  log(uploadTraceLogger.info, options);
}

function debug(options: LogOptions): void {
  log(logger.debug, options);
}

function ingesta(options: LogOptions): void {
  log(ingestaLogger.info, options);
}

export { debug, error, info,ingesta, loggerConfig, uploadError, uploadTrace, warning };
