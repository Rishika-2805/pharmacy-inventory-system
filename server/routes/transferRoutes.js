const express = require("express");

const router = express.Router();

const {
    transferMedicine,
    getTransfers
} = require("../controllers/transferController");

const { protect } = require("../middleware/authMiddleware");


router.post("/", protect, transferMedicine);

router.get("/", protect, getTransfers);


module.exports = router;