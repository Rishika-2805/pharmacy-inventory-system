const Order = require("../models/Order");

const {
    purchaseMedicine
} = require("../services/orderService");


// PURCHASE API
exports.buyMedicine = async (
    req,
    res
) => {

    try {

        const result =
            await purchaseMedicine({

                userId: req.user.id,

                medicineId:
                    req.body.medicineId,

                quantity:
                    req.body.quantity
            });


        if(!result.success){

            return res.status(400).json({
                message: result.error
            });
        }


        // REAL-TIME UPDATE
        const io = req.app.get("io");

        io.emit("inventoryUpdated", {
            message:
                "Medicine purchased",
            transactionId:
                result.transactionId
        });


        res.status(200).json({
            message:
                "Medicine purchased successfully",
            order: result.order
        });

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
};



// GET USER ORDERS
exports.getMyOrders = async (
    req,
    res
) => {

    try {

        const orders =
            await Order.find({
                user: req.user.id
            })
            .populate("medicine")
            .populate("store");

        res.status(200).json(orders);

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
};

// STORE SALES HISTORY

exports.getStoreSales =
async (req, res) => {

    try {

        let orders;

        // STORE MANAGER

        if(
            req.user.role ===
            "store_manager"
        ){

            orders =
            await Order.find({

                store:
                req.user.storeId
            })

            .populate("medicine")

            .populate("user")

            .sort({
                createdAt: -1
            });
        }


        // ADMIN

        else {

            orders =
            await Order.find()

            .populate("medicine")

            .populate("user")

            .populate("store")

            .sort({
                createdAt: -1
            });
        }

        res.status(200).json(
            orders
        );

    } catch(error){

        res.status(500).json({

            message:
            error.message
        });
    }
};