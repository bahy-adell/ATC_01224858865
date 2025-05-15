"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEventValidator = exports.createEventValidator = void 0;
const express_validator_1 = require("express-validator");
const validatorMiddleware_1 = __importDefault(require("../middlwares/validatorMiddleware"));
exports.createEventValidator = [
    (0, express_validator_1.check)('name')
        .notEmpty().withMessage('name_required'),
    (0, express_validator_1.check)('description')
        .notEmpty().withMessage('description_required'),
    (0, express_validator_1.check)('category')
        .notEmpty().withMessage('category_required'),
    (0, express_validator_1.check)('date')
        .notEmpty().withMessage('date_required'),
    (0, express_validator_1.check)('venue')
        .notEmpty().withMessage('venue_required'),
    (0, express_validator_1.check)('price')
        .notEmpty().withMessage('price_required').isNumeric().withMessage('invalid_price'),
    (0, express_validator_1.check)('image')
        .notEmpty().withMessage('image_required'),
    validatorMiddleware_1.default
];
exports.updateEventValidator = [
    (0, express_validator_1.check)('name')
        .optional()
        .isString().withMessage('invalid_name'),
    (0, express_validator_1.check)('description')
        .optional()
        .isString().withMessage('invalid_description'),
    (0, express_validator_1.check)('category')
        .optional()
        .isIn(["tech", "design", "business", "education", "workshop", "health"])
        .withMessage('invalid_category'),
    (0, express_validator_1.check)('date')
        .optional()
        .isISO8601().withMessage('invalid_date'),
    (0, express_validator_1.check)('venue')
        .optional()
        .isString().withMessage('invalid_venue'),
    (0, express_validator_1.check)('price')
        .optional()
        .isNumeric().withMessage('invalid_price'),
    (0, express_validator_1.check)('image')
        .optional()
        .isString().withMessage('invalid_image'),
    validatorMiddleware_1.default
];
