"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ["tech", "design", "business", "education", "workshop", "health"], required: true },
    date: { type: Date, required: true },
    venue: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)('events', eventSchema);
