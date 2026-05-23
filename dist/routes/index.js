"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("../config/config");
const authRoutes_1 = __importDefault(require("./authRoutes"));
const demonRoutes_1 = __importDefault(require("./demonRoutes"));
const fileRoutes_1 = __importDefault(require("./fileRoutes"));
const notifications_1 = __importDefault(require("./notifications/notifications"));
const router_1 = __importDefault(require("./router"));
const swagger_1 = __importDefault(require("./swagger"));
exports.default = () => {
    const router = new router_1.default(express_1.default.Router());
    (0, authRoutes_1.default)(router);
    (0, fileRoutes_1.default)(router);
    (0, demonRoutes_1.default)(router);
    (0, notifications_1.default)(router);
    if (config_1.NODE_ENV === "development" || config_1.NODE_ENV === "staging")
        (0, swagger_1.default)(router.router);
    return router.router;
};
//# sourceMappingURL=index.js.map