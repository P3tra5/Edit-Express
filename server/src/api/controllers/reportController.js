const Report = require('../models/issueReportModel');
const User = require("../models/userModel");
const Reservation = require("../models/reservationModel");

const getAllReports = async (req, res) => {
    try {
        /*populate*/
        const allReports = await Report.find().populate('employee').populate('vehicle').populate('reservation');
        res.json(allReports);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getReportById = async (req, res) => {
    const reportId = req.params.id;
    try {
        /*populate*/
        const report = await Report.findById(reportId).populate('employee').populate('vehicle').populate('reservation');
        if (!report) {
            return res.status(404).json({ error: 'Report not found' });
        }
        res.json(report);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const postReport = async (req, res) => {
    const { reservationId, issueType, description, resolved } = req.body;
    const userId = req.user.idUser;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const reservation = await Reservation.findById(reservationId).populate('vehicle');
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        if (!reservation.employee.equals(userId)) {
            return res.status(403).json({ error: 'Reservation does not belong to the user' });
        }
        const vehicle = reservation.vehicle;
        if (!vehicle) {
            return res.status(404).json({ error: 'Vehicle not found in reservation' });
        }

        const newReport = new Report({
            employee: userId,
            vehicle: vehicle._id,
            reservation: reservation._id,
            issueType,
            description,
            resolved
        });

        await newReport.save();
        res.send('Report successfully saved to the database');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateReportResolvedById = async (req, res) => {
    try {
        const report = await Report.findByIdAndUpdate(req.params.id, { resolved: req.body.resolved }, { new: true }).populate('vehicle', {model: 1, licensePlate: 1});
        if (!report) {
            return res.status(404).json({ error: 'Report not found' });
        }
        res.status(200).json(report);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getAllReports,
    getReportById,
    postReport,
    updateReportResolvedById
};