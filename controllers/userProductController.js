const UserProductModel = require("../models/userProductModel");

exports.getUserProducts = async(req,res) => {
    try {
        const userId = req.cookies['user'];
        const products = await UserProductModel.find({userId:userId})
        if(products) {
            res.status(200).send({hasCart:true, products:products})
        } else {
            res.status(200).send({hasCart:false, products:undefined})
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.messeage });
    }
}

exports.addToCart = async(req,res) => {
    try {
        const {productId} = req.body;
        const userId = req.cookies['user'];
        const product = await UserProductModel.findOne({userId:userId, productId:productId})
        if(product) {
            await UserProductModel.findOneAndUpdate({userId:userId, productId:productId}, {amount:product.amount + 1})
            res.status(200).send({isProductAdded:true})
        } else {
            await UserProductModel.create({userId: userId,productId: productId,amount:1})
            res.status(200).send({isProductAdded:true})
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.messeage });
    }
}

exports.deleteFromCart = async(req,res) => {
    try {
        const {productId} = req.body;
        const userId = req.cookies['user'];
        const product = await UserProductModel.findOne({userId:userId, productId:productId})
        if(product.amount == 1) {
            await UserProductModel.findOneAndDelete({userId:userId, productId:productId})
            res.status(200).send({isDeleted:true})
        } else {
            await UserProductModel.findOneAndUpdate({userId: userId,productId: productId}, {amount:product.amount-1})
            res.status(200).send({isDeleted:false})
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.messeage });
    }
}