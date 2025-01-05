const express = require("express");
const checkToken = require("../middleware/checkToken");
const checkCookie = require("../middleware/checkCookie");
const {
    getAllUsers,
    getUserById 
} = require("../controllers/userController");
const router = express.Router();

router.get("/getAllUsers", getAllUsers); //

router.get("/:id", checkCookie('accessToken'), checkToken, getUserById);

module.exports = router;