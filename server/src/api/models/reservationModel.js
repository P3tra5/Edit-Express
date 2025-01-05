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

reservationSchema.post('save', function(doc) {
    const vehicle = doc.vehicle;
    const status = doc.status;

    if (status === "pending" || status === "upcoming" || status === "active") {
        vehicle.status = "unavailable";
        vehicle.save();
    } else if (status === "cancelled" || status === "rejected") {
        vehicle.status = "available";
        vehicle.save();
    }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
