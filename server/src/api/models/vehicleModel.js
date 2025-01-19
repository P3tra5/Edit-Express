const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    licensePlate: { type: String, required: true, unique: true },
    type: { type: String, enum: ["car", "van", "other"], required: true },
    model: { type: String, required: true },
    inspectionDate : { type: Date },
    status: { type: String, enum: ["available", "unavailable", "in maintenance"], default: "available" }
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;