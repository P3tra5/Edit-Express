const express = require("express");
const checkToken = require("../middleware/checkToken");
const checkCookie = require("../middleware/checkCookie");
const {
    getAllReservations,
    getReservationById,
    postReservation,
    deleteReservationById,
} = require("../controllers/reservationController");
const router = express.Router();
//dodat middleware
router.get("/", getAllReservations); //

router.get("/:id", getReservationById); //

router.post("/", checkCookie('accessToken'), checkToken, postReservation); //

router.delete("/:id", deleteReservationById); //

module.exports = router;