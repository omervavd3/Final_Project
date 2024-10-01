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
        if(userId) {
            const product = await UserProductModel.findOne({userId:userId, productId:productId})
            if(product) {
                await UserProductModel.findOneAndUpdate({userId:userId, productId:productId}, {amount:product.amount + 1})
                res.status(200).send({isProductAdded:true})
            } else {
                await UserProductModel.create({userId: userId,productId: productId,amount:1})
                res.status(200).send({isProductAdded:true})
            }
        } else {
            res.status(200).send({isProductAdded:false})
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

exports.clearCartAfterPurchase = async(req,res) => {
    try {
        const userId = req.cookies['user'];
        const cart = await UserProductModel.deleteMany({userId:userId})
        res.status(200).send({isDeleted:true})
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.messeage });
    }
}

exports.deleteAfterDeleteCategory = async(req,res) => {
    try {
        const {productsId} = req.body
        for (let index = 0; index < productsId.length; index++) {
            await UserProductModel.deleteMany({productId:productsId[index]})
        }
        res.status(200).send({isDeleted:true})
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.messeage });
    }
}

exports.deleteAfterAdminDeletedProduct = async(req,res) => {
    try {
        const {productId} = req.body
        await UserProductModel.deleteMany({productId:productId})
        res.status(200).send({isDeleted:true})
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.messeage });
    }
}