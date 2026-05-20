const Store = require("../models/Store");


// CREATE STORE
exports.createStore = async (req, res) => {

    try {

        const store = await Store.create(req.body);

        res.status(201).json({
            message: "Store created successfully",
            store
        });

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
};



// GET ALL STORES
exports.getStores = async (req, res) => {

    try {

        const stores = await Store.find().populate("manager");

        res.status(200).json(stores);

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
};



// GET SINGLE STORE
exports.getStoreById = async (req, res) => {

    try {

        const store = await Store.findById(req.params.id)
        .populate("manager");

        if(!store){
            return res.status(404).json({
                message: "Store not found"
            });
        }

        res.status(200).json(store);

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
};