const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    poster: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    category: { type: String, enum: ['Music', 'Sports', 'Workshop'], required: true },
    price: { type: Number, required: true },
}, { versionKey: false });

const EventModel = mongoose.model("event", eventSchema);

module.exports = { EventModel };
