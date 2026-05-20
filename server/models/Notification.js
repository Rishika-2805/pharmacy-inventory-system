const mongoose = require("mongoose");

const notificationSchema =
new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    type: {
        type: String,
        enum: [
            "low_stock",
            "transfer",
            "purchase"
        ]
    },

    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store"
    },

    medicine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medicine"
    },

    isRead: {
        type: Boolean,
        default: false
    }

},
{
    timestamps: true
});

module.exports =
mongoose.model(
    "Notification",
    notificationSchema
);