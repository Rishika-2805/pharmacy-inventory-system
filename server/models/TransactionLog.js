const mongoose = require("mongoose");

const transactionLogSchema = new mongoose.Schema(
{
    transactionId: {
        type: String,
        required: true
    },

    action: {
        type: String,
        enum: [
            "prepare",
            "commit",
            "rollback"
        ]
    },

    status: {
        type: String,
        enum: [
            "success",
            "failed"
        ]
    },

    details: {
        type: Object
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model(
    "TransactionLog",
    transactionLogSchema
);