const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    purpose: { type: String, required: true },
    status: { 
        type: String, 
        enum: ["pending", "upcoming", "active", "completed", "cancelled", "rejected"], 
        default: "pending" 
    },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }
});

reservationSchema.post('save', async function (doc) {
    const Vehicle = require('./vehicleModel');

    try {
        const vehicle = await Vehicle.findById(doc.vehicle);
        const status = doc.status;

        if (vehicle) {
            if (["pending", "upcoming", "active"].includes(status)) {
                vehicle.status = "unavailable";
            } else if (["cancelled", "rejected"].includes(status)) {
                vehicle.status = "available";
            }
            await vehicle.save();
        }
    } catch (error) {
        console.error("Error updating vehicle status:", error.message);
    }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;