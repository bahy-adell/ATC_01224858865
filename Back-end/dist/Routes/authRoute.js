"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const auth_1 = require("../validators/auth");
const validatorMiddleware_1 = __importDefault(require("../middlwares/validatorMiddleware"));
const authRoute = (0, express_1.Router)();
authRoute.route('/signup').post(auth_1.signupValidator, validatorMiddleware_1.default, authController_1.signup);
authRoute.route('/login').post(auth_1.loginValidator, validatorMiddleware_1.default, authController_1.login);
exports.default = authRoute;
