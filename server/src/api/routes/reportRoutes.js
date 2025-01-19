const express = require("express");
const checkToken = require("../middleware/checkToken");
const checkCookie = require("../middleware/checkCookie");
const {
    getAllReports,
    getReportById,
    postReport,
    updateReportResolvedById
} = require("../controllers/reportController");
const router = express.Router();
//dodat middleware!!!!!!!!!!!!!!!!!!!!!!!!
router.get("/", getAllReports);

router.get("/:id", getReportById); //

router.post("/", checkCookie('accessToken'), checkToken, postReport);

router.patch("/:id/resolved", updateReportResolvedById);

module.exports = router;