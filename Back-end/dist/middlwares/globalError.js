"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const Errors_1 = __importDefault(require("./Errors"));
const errorMiddleware = (err, req, res, next) => {
    if (err instanceof Errors_1.default) {
        // res.status(err.statusCode).json(err.toJSON());
        const errorMessage = req.t(err.message) || err.message;
        res.status(err.statusCode).json({
            success: false,
            status: "error",
            statusCode: err.statusCode,
            message: errorMessage
        });
    }
    else {
        res.status(500).json({
            success: false,
            status: "error",
            statusCode: 500,
            message: req.t('internal_server_error') || "Internal server error"
        });
    }
};
exports.errorMiddleware = errorMiddleware;
