const Vehicle = require("../models/vehicleModel");

const getAllVehicles = async (req, res) => {
    try {
        const allVehicles = await Vehicle.find();
        res.json(allVehicles);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getVehicleById = async (req, res) => {
    const vehicleId = req.params.id;
    try {
        const vehicle = await Vehicle.findById(vehicleId);

        if (!vehicle) {
            return res.status(404).send('vehicle ne postoji');
        }
        res.json(vehicle);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const postVehicle = async (req, res) => {
    const { licensePlate, type, model, inspectionDate } = req.body;
    
    const newVehicle = new Vehicle({
        licensePlate,
        type,
        model,
        inspectionDate,
    });
    try {
        await newVehicle.save();
        res.send("vehicle spremljen u bazu");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
        if (!vehicle) {
            return res.status(404).send('vehicle ne postoji');
        }
        res.send('vehicle izbrisan');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { getAllVehicles, getVehicleById, postVehicle, deleteVehicleById, };