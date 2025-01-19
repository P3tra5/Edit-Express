const express = require("express");
const checkToken = require("../middleware/checkToken");
const checkCookie = require("../middleware/checkCookie");
const {
    getAllReservations,
    getReservationById,
    getReservationsByUserId,
    postReservation,
    updateReservationById,
    updateReservationVehiclesById,
    updateReservationStatusById,
    deleteReservationById,
} = require("../controllers/reservationController");
const router = express.Router();
//dodat middleware!!!!!!!!!!!
router.get("/", getAllReservations);

router.get("/:id", getReservationById); //

router.get("/user/:id", getReservationsByUserId);

router.post("/", checkCookie('accessToken'), checkToken, postReservation);

router.put("/:id", updateReservationById); //

router.patch("/:id/vehicle", updateReservationVehiclesById);

router.patch("/:id/status", updateReservationStatusById);

router.delete("/:id", deleteReservationById); //

module.exports = router;