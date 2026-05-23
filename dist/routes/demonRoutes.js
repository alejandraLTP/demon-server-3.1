"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const demonController_1 = require("../controllers/demonController");
const validateToken_1 = __importDefault(require("../middleware/validateToken"));
const validationMiddleware_1 = __importDefault(require("../middleware/validationMiddleware"));
exports.default = (router) => {
    router.group({ middleware: [validateToken_1.default] }, () => {
        router.post("/users", validationMiddleware_1.default, demonController_1.createUser);
        router.get("/users", validationMiddleware_1.default, demonController_1.getAllUsers);
        router.get("/users/:id", validationMiddleware_1.default, demonController_1.getUser);
        router.put("/users/:id", validationMiddleware_1.default, demonController_1.updateUser);
        router.delete("/users/:id", validationMiddleware_1.default, demonController_1.deleteUser);
    });
};
//# sourceMappingURL=demonRoutes.js.map