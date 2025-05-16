"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "users", required: true },
    eventId: { type: mongoose_1.Schema.Types.ObjectId, ref: "events", required: true },
    refCode: { type: String, required: true },
    eventName: { type: String, required: true },
    price: { type: Number, required: true },
    numOfTickets: { type: Number, default: 1 },
    eventDate: { type: Date, required: true },
    createdAt: { type: Date, required: true },
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)('booking', bookingSchema);
