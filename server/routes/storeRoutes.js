const express = require("express");

const router = express.Router();

const {
    createStore,
    getStores,
    getStoreById
} = require("../controllers/storeController");

const { protect } = require("../middleware/authMiddleware");

const { authorizeRoles } = require("../middleware/roleMiddleware");


// ADMIN ONLY
router.post(
    "/",
    protect,
    authorizeRoles("admin"),
    createStore
);


// ALL AUTHENTICATED USERS
router.get("/", protect, getStores);

router.get("/:id", protect, getStoreById);


module.exports = router;