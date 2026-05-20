const express = require("express");

const router = express.Router();

const {
    buyMedicine,
    getMyOrders
} = require(
    "../controllers/orderController"
);

const {
    protect
} = require(
    "../middleware/authMiddleware"
);


// USER PURCHASE
router.post(
    "/buy",
    protect,
    buyMedicine
);


// USER ORDER HISTORY
router.get(
    "/my-orders",
    protect,
    getMyOrders
);

module.exports = router;