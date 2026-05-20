const mongoose = require("mongoose");

const storeSchema =
new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    location: {
        type: String
    },

    managerName: {
        type: String
    },

    managerEmail: {
        type: String
    },

    phone: {
        type: String
    },

    type: {
        type: String,
        enum: [
            "warehouse",
            "store"
        ],
        default: "store"
    }

},
{
    timestamps: true
});

module.exports =
mongoose.model(
    "Store",
    storeSchema
);