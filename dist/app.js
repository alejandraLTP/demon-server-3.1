"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = require("./config/logger");
const errorHandler_1 = require("./middleware/errorHandler");
const baseHttpError_1 = require("./middleware/errors/baseHttpError");
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "100mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api", (0, index_1.default)());
app.get("/", (req, res) => {
    res.send("☑️ testing ☑️");
});
app.use((req, res, next) => {
    (0, logger_1.info)({
        phase: "request",
        payload: {
            method: req.method,
            url: req.originalUrl,
            component: "app",
            headers: req.headers,
            body: req.body,
            params: req.params,
            query: req.query,
        },
    });
    next();
});
app.use((req, res, next) => {
    next(new baseHttpError_1.ResourceNotFoundError());
});
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map