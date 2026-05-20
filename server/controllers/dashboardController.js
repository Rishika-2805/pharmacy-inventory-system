const Medicine = require("../models/Medicine");

const Store = require("../models/Store");

const Transfer = require("../models/Transfer");


// DASHBOARD STATS
exports.getDashboardStats = async (
    req,
    res
) => {

    try {

        // TOTAL MEDICINES
        const totalMedicines =
            await Medicine.countDocuments();


        // TOTAL STORES
        const totalStores =
            await Store.countDocuments();


        // TOTAL TRANSFERS
        const totalTransfers =
            await Transfer.countDocuments();


        // LOW STOCK ALERTS
        const lowStockMedicines =
            await Medicine.find({
                quantity: { $lt: 20 }
            });


        // EXPIRY ALERTS
        const today = new Date();

        const next30Days =
            new Date();

        next30Days.setDate(
            today.getDate() + 30
        );


        const expiringMedicines =
            await Medicine.find({
                expiryDate: {
                    $gte: today,
                    $lte: next30Days
                }
            });


        res.status(200).json({

            totalMedicines,

            totalStores,

            totalTransfers,

            lowStockMedicines,

            expiringMedicines
        });

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
};