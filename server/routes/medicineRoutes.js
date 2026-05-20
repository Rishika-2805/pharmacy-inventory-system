const express = require("express");

const router = express.Router();

const {
    addMedicine,
    getMedicines,
    getMedicineById,
    updateMedicine,
    deleteMedicine,
    getMedicinesByStore
} = require("../controllers/medicineController");

const { protect } = require("../middleware/authMiddleware");


// Protected Routes
router.post("/", protect, addMedicine);

router.get("/", protect, getMedicines);

router.get("/:id", protect, getMedicineById);

router.put("/:id", protect, updateMedicine);

router.delete("/:id", protect, deleteMedicine);
router.get(
    "/store/:storeId",
    protect,
    getMedicinesByStore
);

module.exports = router;