const cron = require('node-cron');
const Reservation = require('../models/reservationModel');

const scheduleReservationStatusUpdate = () => {
    cron.schedule('0 0 * * *', async () => {
        const now = new Date();

        try {
            const completedUpdate = await Reservation.updateMany(
                { endDate: { $lt: now }, status: { $ne: "completed" } },
                { status: "completed" }
            );
            console.log(`Cron job executed. Updated ${completedUpdate.nModified} reservations to completed.`);

            const activeUpdate = await Reservation.updateMany(
                { startDate: { $lte: now }, endDate: { $gte: now }, status: { $ne: "active" } },
                { status: "active" }
            );
            console.log(`Cron job executed. Updated ${activeUpdate.nModified} reservations to active.`);
        } catch (error) {
            console.error("Error updating reservation statuses during cron job:", error.message);
        }
    });
};

module.exports = scheduleReservationStatusUpdate;