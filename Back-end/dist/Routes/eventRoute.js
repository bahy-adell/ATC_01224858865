"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventController_1 = require("../controllers/eventController");
const authController_1 = require("../controllers/authController");
const event_1 = require("../validators/event");
const validatorMiddleware_1 = __importDefault(require("../middlwares/validatorMiddleware"));
const eventRoute = (0, express_1.Router)();
eventRoute.route('/')
    .post(authController_1.protectRoute, (0, authController_1.allowedTo)("admin"), eventController_1.uploadImage, eventController_1.resizeImage, event_1.createEventValidator, validatorMiddleware_1.default, eventController_1.createEvent)
    .get(validatorMiddleware_1.default, eventController_1.getAllEvents);
eventRoute.route('/:id')
    .get(authController_1.protectRoute, (0, authController_1.allowedTo)("admin", "user"), validatorMiddleware_1.default, eventController_1.getEvent)
    .put(authController_1.protectRoute, (0, authController_1.allowedTo)("admin"), eventController_1.uploadImage, eventController_1.resizeImage, event_1.updateEventValidator, validatorMiddleware_1.default, eventController_1.updateEvent)
    .delete(authController_1.protectRoute, (0, authController_1.allowedTo)("admin"), validatorMiddleware_1.default, eventController_1.deleteEvent);
exports.default = eventRoute;
