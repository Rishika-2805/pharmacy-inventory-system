const Transfer = require("../models/Transfer");

const {
    executeTransferTransaction
} = require("../services/transactionService");


// TRANSFER WITH 2PC
exports.transferMedicine = async (
    req,
    res
) => {

    try {

        const result =
            await executeTransferTransaction(
                req.body
            );

        if (!result.success) {

            return res.status(400).json({
                message: result.error
            });
        }


        // REAL-TIME EVENT
        const io = req.app.get("io");

        io.emit("inventoryUpdated", {
            message:
                "Inventory updated successfully",
            transactionId:
                result.transactionId,
            transfer:
                result.transfer
        });


        res.status(200).json({
            message:
                "2PC Transfer completed successfully",
            transactionId:
                result.transactionId,
            transfer:
                result.transfer
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


// GET ALL TRANSFERS
exports.getTransfers = async (
    req,
    res
) => {

    try {

        const transfers =
            await Transfer.find()
            .populate("medicineId")
            .populate("sourceStore")
            .populate("destinationStore");

        res.status(200).json(transfers);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};