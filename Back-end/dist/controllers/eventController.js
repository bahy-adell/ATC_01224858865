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
exports.getAllEvents = exports.getEvent = exports.deleteEvent = exports.updateEvent = exports.resizeImage = exports.uploadImage = exports.createEvent = void 0;
const eventModel_1 = __importDefault(require("../Models/eventModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const Errors_1 = __importDefault(require("../middlwares/Errors"));
const uploadImages_1 = require("../middlwares/uploadImages");
const features_1 = __importDefault(require("../middlwares/features"));
exports.createEvent = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newEvent = yield eventModel_1.default.create(req.body);
        console.log('Event created successfully:', newEvent._id);
        res.status(201).json({ success: true, event: newEvent });
    }
    catch (error) {
        console.error('Error creating event:', error);
        next(new Errors_1.default(req.t("error_creating_event"), 500));
    }
}));
exports.uploadImage = (0, uploadImages_1.uploadSingleImage)("image");
exports.resizeImage = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file)
        return next();
    const imageName = `event-${Date.now()}.jpeg`;
    const imagePath = path_1.default.join("uploads", "events", imageName);
    yield (0, sharp_1.default)(req.file.buffer)
        .resize(600, 600)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(imagePath);
    req.body.image = `/uploads/events/${imageName}`;
    next();
}));
exports.updateEvent = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Updating event with ID:', req.params.id);
        const event = yield eventModel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!event) {
            console.log('Event not found for update:', req.params.id);
            return next(new Errors_1.default(req.t("event_not_found"), 404));
        }
        console.log('Event updated successfully:', event._id);
        res.status(200).json({ message: req.t("updated_successfully"), data: event });
    }
    catch (error) {
        console.error('Error updating event:', error);
        next(new Errors_1.default(req.t("error_updating_event"), 500));
    }
}));
exports.deleteEvent = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Deleting event with ID:', req.params.id);
        const event = yield eventModel_1.default.findByIdAndDelete(req.params.id);
        if (!event) {
            console.log('Event not found for deletion:', req.params.id);
            return next(new Errors_1.default(req.t("event_not_found"), 404));
        }
        console.log('Event deleted successfully:', req.params.id);
        res.status(204).json({ message: req.t("deleted_successfully") });
    }
    catch (error) {
        console.error('Error deleting event:', error);
        next(new Errors_1.default(req.t("error_deleting_event"), 500));
    }
}));
exports.getEvent = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Fetching event with ID:', req.params.id);
        const event = yield eventModel_1.default.findById(req.params.id);
        if (!event) {
            console.log('Event not found:', req.params.id);
            return next(new Errors_1.default(req.t("event_not_found"), 404));
        }
        console.log('Event found:', event._id);
        res.status(200).json({ data: event });
    }
    catch (error) {
        console.error('Error fetching event:', error);
        next(new Errors_1.default(req.t("error_fetching_event"), 500));
    }
}));
exports.getAllEvents = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Fetching events with query:', req.query);
        const NumOfEvents = yield eventModel_1.default.countDocuments();
        console.log('Total number of events:', NumOfEvents);
        const features = new features_1.default(req.query, eventModel_1.default.find()).filter().pagination(NumOfEvents);
        const events = yield features.mongooseQuery;
        console.log('Events found:', events.length);
        if (!events || events.length === 0) {
            console.log('No events found for the given query');
            return next(new Errors_1.default(req.t("No_more_events"), 404));
        }
        res.status(200).json({
            pagination: features.paginationResult,
            data: events,
            total: NumOfEvents
        });
    }
    catch (error) {
        console.error('Error fetching events:', error);
        next(new Errors_1.default(req.t("error_fetching_events"), 500));
    }
}));
