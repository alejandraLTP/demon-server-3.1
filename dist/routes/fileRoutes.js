"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fileUploadController_1 = require("../controllers/fileUploadController");
const validateToken_1 = __importDefault(require("../middleware/validateToken"));
const validationMiddleware_1 = __importDefault(require("../middleware/validationMiddleware"));
exports.default = (router) => {
    router.postWithFile("/upload", validateToken_1.default, validationMiddleware_1.default, fileUploadController_1.uploadFile);
};
//# sourceMappingURL=fileRoutes.js.map