"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const bookingController_1 = require("../controllers/bookingController");
const validatorMiddleware_1 = __importDefault(require("../middlwares/validatorMiddleware"));
const bookingRoute = (0, express_1.Router)();
bookingRoute.route('/:id')
    .post(authController_1.protectRoute, (0, authController_1.allowedTo)("admin", "user"), validatorMiddleware_1.default, bookingController_1.bookEvent)
    .get(authController_1.protectRoute, (0, authController_1.allowedTo)("admin"), validatorMiddleware_1.default, bookingController_1.getEventTickets)
    .delete(authController_1.protectRoute, (0, authController_1.allowedTo)("admin", "user"), validatorMiddleware_1.default, bookingController_1.deleteTicket);
bookingRoute.route('/').get(authController_1.protectRoute, (0, authController_1.allowedTo)("admin", "user"), validatorMiddleware_1.default, bookingController_1.getUserTickets);
exports.default = bookingRoute;
