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

const postReservation = async (req, res) => {
    const { employee, startDate, endDate, purpose, vehicle } = req.body;

    const userId = req.user.idUser;
    console.log(userId)
    console.log("Decoded user:", req.user);
console.log("Reservation payload:", { employee: userId, startDate, endDate, purpose, vehicle });
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
    
        const rez = await newReservation.save() //
        console.log(rez) //
    
        user.reservations.push(rez._id); 
        await user.save();
        res.status(201).json({ message: 'Proizvod stvoren', newReservation });
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

module.exports = { getAllReservations, getReservationById, postReservation, deleteReservationById };