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
    const newEvent = yield eventModel_1.default.create(req.body);
    res.status(201).json({ success: true, event: newEvent });
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
    const event = yield eventModel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) {
        return next(new Errors_1.default(req.t("event_not_found"), 404));
    }
    res.status(200).json({ message: req.t("updated_successfully"), data: event });
}));
exports.deleteEvent = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield eventModel_1.default.findByIdAndDelete(req.params.id);
    if (!event) {
        return next(new Errors_1.default(req.t("event_not_found"), 404));
    }
    res.status(204).json({ message: req.t("deleted_successfully") });
}));
exports.getEvent = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield eventModel_1.default.findById(req.params.id);
    if (!event) {
        return next(new Errors_1.default(req.t("event_not_found"), 404));
    }
    res.status(200).json({ data: event });
}));
exports.getAllEvents = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const NumOfEvents = yield eventModel_1.default.countDocuments();
    const features = new features_1.default(req.query, eventModel_1.default.find()).filter().pagination(NumOfEvents);
    const events = yield features.mongooseQuery;
    if (!events || events.length === 0) {
        return next(new Errors_1.default(req.t("No_more_events"), 404));
    }
    res.status(200).json({ pagination: features.paginationResult, data: events });
}));
