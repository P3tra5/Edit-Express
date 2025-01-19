const Reservation = require("../models/reservationModel");
const User = require("../models/userModel");

const getAllReservations = async (req, res) => {
    try {
        const allReservations = await Reservation.find().populate('employee', {username: 1, email: 1}).populate('vehicle');
        res.json(allReservations);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getReservationById = async (req, res) => {
    const reservationId = req.params.id;
    try {
        const reservation = await Reservation.findById(reservationId);
        if (!reservation) {
            return res.status(404).send('reservation ne postoji');
        }
        res.json(reservation);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getReservationsByUserId = async (req, res) => {
    const userId = req.params.id;

    try {
        const userReservations = await Reservation.find({ employee: userId }).populate('employee', {username: 1, email: 1}).populate('vehicle');
        if (!userReservations) {
            return res.status(404).json({ message: 'Nema rezervacija za ovog korisnika.' });
        }

        res.status(200).json(userReservations);
    } catch (error) {
        res.status(500).json({ message: 'Greška na serveru.', error: error.message });
    }
};


const postReservation = async (req, res) => {
    const { startDate, endDate, purpose, vehicle } = req.body;
    const userId = req.user.idUser;
    const newReservation = new Reservation({
        employee: userId,
        startDate,
        endDate,
        purpose,
        vehicle,
    });
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Ne postoji user' });
        }
    
        await newReservation.save();
        const populatedReservation = await Reservation.findById(newReservation._id).populate('vehicle');

        user.reservations.push(newReservation._id); 
        await user.save();
        res.status(201).json(populatedReservation);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const updateReservationVehiclesById = async (req, res) => {
    const { vehicle } = req.body;
    if (!vehicle) {
        return res.status(400).json({ message: "Vehicle ID is required" });
    }

    try {
        const reservation = await Reservation.findByIdAndUpdate(req.params.id, { vehicle }, { new: true })
            .populate('employee', {username: 1, email: 1})
            .populate('vehicle');
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateReservationStatusById = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true })
            .populate('employee', {username: 1, email: 1})
            .populate('vehicle');
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!reservation) {
            return res.status(404).send('reservation ne postoji');
        }
        res.send('reservation izbrisana');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getAllReservations,
    getReservationById,
    getReservationsByUserId,
    postReservation,
    updateReservationById,
    updateReservationVehiclesById,
    updateReservationStatusById,
    deleteReservationById
};