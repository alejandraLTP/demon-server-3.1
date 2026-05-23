"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectSSE = void 0;
const sseHandler_1 = require("../../utils/sseHandler");
const connectSSE = (req, res) => {
    (0, sseHandler_1.maintainSSEConnection)(res);
};
exports.connectSSE = connectSSE;
//# sourceMappingURL=notificationController.js.map