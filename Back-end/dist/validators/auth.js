"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.signupValidator = void 0;
const express_validator_1 = require("express-validator");
const userModel_1 = __importDefault(require("../Models/userModel"));
const validatorMiddleware_1 = __importDefault(require("../middlwares/validatorMiddleware"));
exports.signupValidator = [
    (0, express_validator_1.check)('name')
        .notEmpty().withMessage('user_name_required')
        .isLength({ min: 5, max: 20 }).withMessage('name_length'),
    (0, express_validator_1.check)('email')
        .notEmpty().withMessage('email_required')
        .isEmail().withMessage('invalid_email')
        .custom((val) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userModel_1.default.findOne({ email: val });
        if (user) {
            throw new Error(`email_exists`);
        }
        return true;
    })),
    (0, express_validator_1.check)('password')
        .notEmpty().withMessage('password_required')
        .isLength({ min: 6, max: 20 }).withMessage('password_length')
        .custom((val, { req }) => {
        if (val !== req.body.confirmPassword) {
            throw new Error("passwords_not_match");
        }
        return true;
    }),
    (0, express_validator_1.check)('confirmPassword')
        .notEmpty().withMessage('confirm_password_required')
        .isLength({ min: 6, max: 20 }).withMessage('confirm_password_length'),
    validatorMiddleware_1.default
];
exports.loginValidator = [
    (0, express_validator_1.check)('email')
        .notEmpty().withMessage('login_email_required')
        .isEmail().withMessage('login_invalid_email'),
    (0, express_validator_1.check)('password')
        .notEmpty().withMessage('login_password_required'),
    validatorMiddleware_1.default
];
