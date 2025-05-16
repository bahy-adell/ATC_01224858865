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
exports.deleteTicket = exports.getEventTickets = exports.getUserTickets = exports.bookEvent = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bookingModel_1 = __importDefault(require("../Models/bookingModel"));
const eventModel_1 = __importDefault(require("../Models/eventModel"));
const features_1 = require("../middlwares/features");
const Errors_1 = __importDefault(require("../middlwares/Errors"));
exports.bookEvent = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const eventId = req.params.id;
    const event = yield eventModel_1.default.findById(eventId);
    if (!event) {
        res.status(404).json({ message: req.t("event_not_exist") });
    }
    const existingBook = yield bookingModel_1.default.findOne({ userId: userId, eventId: eventId });
    if (existingBook) {
        existingBook.numOfTickets += 1;
        yield existingBook.save();
        res.status(201).json({
            message: req.t("congrats_enjoy_event")
        });
        return;
    }
    const newBook = yield bookingModel_1.default.create({
        userId: userId,
        eventId: eventId,
        eventName: event === null || event === void 0 ? void 0 : event.name,
        price: event === null || event === void 0 ? void 0 : event.price,
        eventDate: event === null || event === void 0 ? void 0 : event.date,
        refCode: new features_1.utils().generateReferenceCode(),
        createdAt: Date.now()
    });
    res.status(201).json({
        message: req.t("congrats_enjoy_event"),
        data: newBook
    });
}));
exports.getUserTickets = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const tickets = yield bookingModel_1.default.find({ userId: userId });
    if (tickets.length == 0) {
        res.status(404).json({ message: req.t("no_ticket") });
        return;
    }
    res.status(200).json({ message: req.t("ticket_found"), data: tickets });
}));
exports.getEventTickets = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = req.params.id;
    const tickets = yield bookingModel_1.default.find({ eventId: eventId });
    if (tickets.length == 0) {
        res.status(404).json({ message: req.t("no_tickets_yet") });
        return;
    }
    res.status(200).json({ message: req.t("tickets_found"), data: tickets });
}));
exports.deleteTicket = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const Id = req.params.id;
    const ticket = yield bookingModel_1.default.findById(req.params.id);
    if (!ticket) {
        return next(new Errors_1.default(req.t("ticket_not_found"), 404));
    }
    if (ticket.numOfTickets > 1) {
        ticket.numOfTickets = ticket.numOfTickets - 1;
        ticket.save();
        res.status(204).json({ message: req.t("deleted_successfully") });
        return;
    }
    if (ticket.numOfTickets = 1) {
        yield bookingModel_1.default.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: req.t("deleted_successfully") });
        return;
    }
    res.status(404).json({ message: req.t("Error in delete ticket") });
}));
