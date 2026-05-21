const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

   role: {

    type: String,

    enum: [

        "admin",

        "user",

        "store_manager",

        "warehouse_manager"
    ],

    default: "user"
},

storeId: {

    type:
    mongoose.Schema.Types.ObjectId,

    ref: "Store"
}
},
{
    timestamps: true
}
);

module.exports = mongoose.model("User", userSchema);