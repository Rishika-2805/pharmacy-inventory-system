const Medicine = require("../models/Medicine");


// ADD MEDICINE
exports.addMedicine = async (req, res) => {

    try {

        const medicine = await Medicine.create(req.body);

        res.status(201).json({
            message: "Medicine added successfully",
            medicine
        });

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
};



// GET ALL MEDICINES
exports.getMedicines =
async (req, res) => {

    try {

        const medicines =
        await Medicine.find()
        .populate("storeId");

        res.status(200).json(
            medicines
        );

    } catch(error){

        res.status(500).json({

            message:
            error.message
        });
    }
};



// GET SINGLE MEDICINE
exports.getMedicineById = async (req, res) => {

    try {

        const medicine = await Medicine.findById(req.params.id);

        if(!medicine){
            return res.status(404).json({
                message: "Medicine not found"
            });
        }

        res.status(200).json(medicine);

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
};



// UPDATE MEDICINE
exports.updateMedicine = async (req, res) => {

    try {

        const medicine = await Medicine.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if(!medicine){
            return res.status(404).json({
                message: "Medicine not found"
            });
        }

        res.status(200).json({
            message: "Medicine updated successfully",
            medicine
        });

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
};



// DELETE MEDICINE
exports.deleteMedicine = async (req, res) => {

    try {

        const medicine = await Medicine.findByIdAndDelete(req.params.id);

        if(!medicine){
            return res.status(404).json({
                message: "Medicine not found"
            });
        }

        res.status(200).json({
            message: "Medicine deleted successfully"
        });

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
};

// GET MEDICINES BY STORE
exports.getMedicinesByStore = async (req, res) => {

    try {

        const medicines = await Medicine.find({
            storeId: req.params.storeId
        }).populate("storeId");

        res.status(200).json(medicines);

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
};