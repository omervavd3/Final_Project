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