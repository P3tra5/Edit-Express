const express = require("express");
const {
    getAllVehicles,
    getVehicleById,
    postVehicle,
    updateVehicleIDateById,
    updateVehicleStatusById,
    deleteVehicleById,
} = require("../controllers/vehicleController");
const router = express.Router();
//dodat middleware!!!!!!!!!!!!!!!!!!!!!!!!
router.get("/", getAllVehicles);

router.get("/:id", getVehicleById); //

router.post("/", postVehicle); //

router.patch("/:id/inspection-date", updateVehicleIDateById);

router.patch("/:id/status", updateVehicleStatusById);

router.delete("/:id", deleteVehicleById); //

module.exports = router;