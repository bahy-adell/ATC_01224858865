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
exports.allowedTo = exports.protectRoute = exports.login = exports.signup = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../Models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Errors_1 = __importDefault(require("../middlwares/Errors"));
const createToken_1 = require("../middlwares/createToken");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.signup = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.create(req.body);
    res.status(201).json({ data: user });
}));
exports.login = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findOne({ email: req.body.email });
    if (!user || !(yield bcryptjs_1.default.compare(req.body.password, user.password))) {
        return next(new Errors_1.default(req.t("invalid_email_or_password"), 401));
    }
    const token = (0, createToken_1.createToken)(user._id, user.role);
    res.status(200).json({ token, message: req.t("login_success") });
}));
exports.protectRoute = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    else {
        return next(new Errors_1.default(req.t("login_required"), 401));
    }
    const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
    const currentUser = yield userModel_1.default.findById(decodedToken._id);
    if (!currentUser) {
        return next(new Errors_1.default(req.t("user_not_exist"), 401));
    }
    req.user = currentUser;
    next();
}));
const allowedTo = (...roles) => (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!(roles.includes((_a = req.user) === null || _a === void 0 ? void 0 : _a.role))) {
        return next(new Errors_1.default(req.t("unauthorized_access"), 403));
    }
    next();
}));
exports.allowedTo = allowedTo;
