const express = require("express");

const router = express.Router();

const TransactionLog =
    require("../models/TransactionLog");

const { protect } =
    require("../middleware/authMiddleware");


router.get("/", protect, async (req, res) => {

    try {

        const logs =
            await TransactionLog.find();

        res.status(200).json(logs);

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;