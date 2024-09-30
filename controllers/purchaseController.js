const PurchaseModel = require("../models/purchaseModel");

exports.addPurchase = async(req,res) => {
    try {
        const {productsIds, productsAmounts, totalPrice} = req.body;
        const userId = req.cookies['user'];
        const purchase = await PurchaseModel.create({userId:userId,productsIds:productsIds, productsAmounts:productsAmounts, totalPrice:totalPrice})
        res.status(200).send({purchaseCreated:true, purchase:purchase})
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.messeage });
    }
}

exports.getAllPurchases = async(req,res) => {
    try {
        const purchases = await PurchaseModel.find({})
        res.status(200).send({purchases:purchases})
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.messeage });
    }
}