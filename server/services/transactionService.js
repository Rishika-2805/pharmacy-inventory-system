const Medicine = require("../models/Medicine");

const Transfer = require("../models/Transfer");

const TransactionLog = require("../models/TransactionLog");

const mongoose = require("mongoose");


// TWO PHASE COMMIT
exports.executeTransferTransaction = async (
    transferData
) => {

    const session = await mongoose.startSession();

    session.startTransaction();

    const transactionId =
        new mongoose.Types.ObjectId().toString();

    try {

        const {
            medicineId,
            sourceStore,
            destinationStore,
            quantity,
            simulateFailure
        } = transferData;


        // =========================
        // PHASE 1 — PREPARE
        // =========================

        await TransactionLog.create({
            transactionId,
            action: "prepare",
            status: "success",
            details: transferData
        });


        // Simulate prepare failure
        if(simulateFailure === "prepare"){

            throw new Error(
                "Simulated PREPARE failure"
            );
        }


        // Find source medicine
        const sourceMedicine = await Medicine.findOne({
            _id: medicineId,
            storeId: sourceStore
        }).session(session);


        if(!sourceMedicine){

            throw new Error(
                "Medicine not found in source store"
            );
        }


        // Check stock
        if(sourceMedicine.quantity < quantity){

            throw new Error(
                "Insufficient stock"
            );
        }


        // =========================
        // DEDUCT SOURCE STOCK
        // =========================

        sourceMedicine.quantity -= quantity;

        await sourceMedicine.save({ session });


        // Simulate source failure
        if(simulateFailure === "source"){

            throw new Error(
                "Simulated SOURCE failure"
            );
        }


        // =========================
        // DESTINATION UPDATE
        // =========================

        let destinationMedicine =
            await Medicine.findOne({
                name: sourceMedicine.name,
                storeId: destinationStore
            }).session(session);


        if(destinationMedicine){

            destinationMedicine.quantity += quantity;

            await destinationMedicine.save({
                session
            });

        } else {

            await Medicine.create(
            [{
                name: sourceMedicine.name,
                batchNumber:
                    sourceMedicine.batchNumber,
                manufacturer:
                    sourceMedicine.manufacturer,
                expiryDate:
                    sourceMedicine.expiryDate,
                quantity: quantity,
                price: sourceMedicine.price,
                category: sourceMedicine.category,
                storeId: destinationStore
            }],
            { session }
            );
        }


        // Simulate destination failure
        if(simulateFailure === "destination"){

            throw new Error(
                "Simulated DESTINATION failure"
            );
        }


        // =========================
        // SAVE TRANSFER
        // =========================

        const transfer = await Transfer.create(
        [{
            medicineId,
            sourceStore,
            destinationStore,
            quantity,
            status: "completed"
        }],
        { session }
        );


        // Simulate commit failure
        if(simulateFailure === "commit"){

            throw new Error(
                "Simulated COMMIT failure"
            );
        }


        // =========================
        // COMMIT TRANSACTION
        // =========================

        await session.commitTransaction();

        await TransactionLog.create({
            transactionId,
            action: "commit",
            status: "success",
            details: transferData
        });


        session.endSession();

        return {
            success: true,
            transactionId,
            transfer
        };

    } catch(error){

        // =========================
        // ROLLBACK
        // =========================

        await session.abortTransaction();

        await TransactionLog.create({
            transactionId,
            action: "rollback",
            status: "failed",
            details: {
                error: error.message
            }
        });

        session.endSession();

        return {
            success: false,
            error: error.message
        };
    }
};