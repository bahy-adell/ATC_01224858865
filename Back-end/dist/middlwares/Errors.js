"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class customErrors extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode >= 400 && statusCode < 500 ? "failed" : "error";
    }
    toJSON() {
        return {
            success: false,
            status: this.status,
            statusCode: this.statusCode,
            message: this.message
        };
    }
}
exports.default = customErrors;
