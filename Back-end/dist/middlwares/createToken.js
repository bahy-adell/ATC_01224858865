"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const expiresIn = process.env.JWT_EXPIRED_TIME;
const createToken = (payload, role) => jsonwebtoken_1.default.sign({ _id: payload, role: role }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
exports.createToken = createToken;
