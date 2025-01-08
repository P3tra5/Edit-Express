const express = require("express");
const {
    getAllVehicles,
    getVehicleById,
    postVehicle,
    deleteVehicleById,
} = require("../controllers/vehicleController");
const router = express.Router();
//dodat middleware
router.get("/", getAllVehicles); //

router.get("/:id", getVehicleById); //

router.post("/", postVehicle); //

router.delete("/:id", deleteVehicleById); //

module.exports = router;