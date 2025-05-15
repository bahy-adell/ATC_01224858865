"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Errors_1 = __importDefault(require("../middlwares/Errors"));
const authRoute_1 = __importDefault(require("./authRoute"));
const eventRoute_1 = __importDefault(require("./eventRoute"));
const bookingRoute_1 = __importDefault(require("./bookingRoute"));
const AllRoutes = (app) => {
    app.use('/api/auth', authRoute_1.default);
    app.use('/api/events', eventRoute_1.default);
    app.use('/api/booking', bookingRoute_1.default);
    app.all('*', (req, res, next) => {
        next(new Errors_1.default(`The router ${req.originalUrl} is not found`, 400));
    });
};
exports.default = AllRoutes;
