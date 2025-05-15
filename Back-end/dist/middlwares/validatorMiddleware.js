"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validatorMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const translatedErrors = errors.array().map((err) => ({
            field: err.param,
            message: req.t(err.msg) || err.msg
        }));
        res.status(400).json({ errors: translatedErrors });
        return;
    }
    else {
        next();
    }
};
exports.default = validatorMiddleware;
