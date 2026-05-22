const mongoose = require("mongoose");

const Medicine =
require("../models/Medicine");

const Order =
require("../models/Order");

const TransactionLog =
require("../models/TransactionLog");


// PURCHASE MEDICINE
exports.purchaseMedicine =
async (purchaseData) => {

    const session =
    await mongoose.startSession();

    session.startTransaction();

    const transactionId =
    new mongoose.Types.ObjectId().toString();

    try {

        const {

            userId,

            medicineId,

            quantity

        } = purchaseData;


        // PREPARE PHASE
        await TransactionLog.create({

            transactionId,

            action: "prepare",

            status: "success",

            details: purchaseData
        });


        // FIND MEDICINE
        const medicine =
        await Medicine.findById(
            medicineId
        ).session(session);


        if(!medicine){

            throw new Error(
                "Medicine not found"
            );
        }


        // CHECK STOCK
        if(
            medicine.quantity < quantity
        ){

            throw new Error(
                "Insufficient stock"
            );
        }


        // DEDUCT STOCK
        medicine.quantity -= quantity;

        await medicine.save({

            session
        });


        // LOW STOCK CHECK
        if(medicine.quantity < 80){

            const Notification =
            require(
                "../models/Notification"
            );

            await Notification.create({

                title:
                "Low Stock Alert",

                message:
                `${medicine.name} is running low in stock`,

                type: "low_stock",

                store:
                medicine.storeId,

                medicine:
                medicine._id
            });
        }


        // CREATE ORDER
        const order =
        await Order.create(
        [{
            user: userId,

            medicine:
            medicineId,

            store:
            medicine.storeId,

            quantity,

            totalPrice:
            medicine.price * quantity,

            status:
            "completed"
        }],
        { session }
        );


        // COMMIT TRANSACTION
        await session.commitTransaction();

        await TransactionLog.create({

            transactionId,

            action: "commit",

            status: "success",

            details: purchaseData
        });


        session.endSession();

        return {

            success: true,

            transactionId,

            order
        };

    } catch(error){

        // ROLLBACK
        await session.abortTransaction();

        await TransactionLog.create({

            transactionId,

            action: "rollback",

            status: "failed",

            details: {

                error:
                error.message
            }
        });

        session.endSession();

        return {

            success: false,

            error: error.message
        };
    }
};