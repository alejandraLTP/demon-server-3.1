"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = require("../config/logger");
const baseHttpError_1 = require("./errors/baseHttpError");
const handleHttpError = (err, res) => {
    (0, logger_1.error)({
        phase: "error",
        component: "errorHandler",
        payload: {
            message: err.toJSON(),
            stack: err.stack,
            code: err.getCode(),
            name: err.name,
        },
    });
    res.status(err.getCode()).send(err.toJSON());
};
const handleGenericError = (err, res) => {
    (0, logger_1.error)({
        phase: "error",
        component: "errorHandler",
        payload: {
            message: err.message,
            stack: err.stack,
            name: err.name,
        },
    });
    res.status(500).send({
        message: "ERROR DE SERVIDOR",
        details: err.message,
    });
};
const errorHandler = (err, req, res, next) => {
    if (err instanceof baseHttpError_1.BaseHttpError) {
        handleHttpError(err, res);
    }
    else {
        handleGenericError(err, res);
    }
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map