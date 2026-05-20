const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema(
{
    medicineId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medicine",
        required: true
    },

    sourceStore: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
        required: true
    },

    destinationStore: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending"
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Transfer", transferSchema);