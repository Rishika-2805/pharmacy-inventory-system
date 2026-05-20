const Notification =
require("../models/Notification");


// GET NOTIFICATIONS
exports.getNotifications =
async (req, res) => {

    try {

        const notifications =
        await Notification.find()
        .populate("store")
        .populate("medicine")
        .sort({ createdAt: -1 });

        res.status(200)
        .json(notifications);

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
};