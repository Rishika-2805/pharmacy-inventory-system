const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    medicine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medicine",
        required: true
    },

    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    totalPrice: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: [
            "placed",
            "completed",
            "cancelled"
        ],
        default: "placed"
    }
},
{
    timestamps: true
}
);

module.exports =
    mongoose.model("Order", orderSchema);