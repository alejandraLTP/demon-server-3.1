"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const baseHttpError_1 = require("./errors/baseHttpError");
const validationMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req).formatWith(({ msg }) => ({ msg }));
    if (!errors.isEmpty()) {
        return next(new baseHttpError_1.ValidationError(errors.array()));
    }
    next();
};
exports.default = validationMiddleware;
//# sourceMappingURL=validationMiddleware.js.map