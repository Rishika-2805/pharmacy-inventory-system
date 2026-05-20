const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },

    batchNumber: {
        type: String,
        required: true
    },

    manufacturer: {
        type: String,
        required: true
    },

    expiryDate: {
        type: Date,
        required: true
    },

    quantity: {
        type: Number,
        required: true,
        default: 0
    },

    price: {
        type: Number,
        required: true
    },

    category: {
        type: String
    },

    storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    required: true
}
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Medicine", medicineSchema);