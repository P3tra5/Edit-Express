require("dotenv").config();
const User = require("../models/userModel");

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        res.json(allUsers);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send('Korisnik ne postoji');
        }
        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { getAllUsers, getUserById };