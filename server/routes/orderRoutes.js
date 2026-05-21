const express = require("express");

const router = express.Router();

const {
    buyMedicine,
    getMyOrders,
    getStoreSales
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

// STORE SALES HISTORY
router.get(

    "/sales-history",

    protect,

    getStoreSales
);

// USER ORDER HISTORY
router.get(
    "/my-orders",
    protect,
    getMyOrders
);

module.exports = router;