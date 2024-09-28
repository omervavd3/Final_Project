const express = require('express');
const userProductRouter = express.Router();

const { getUserProducts, addToCart, deleteFromCart, clearCartAfterPurchase } = require('../controllers/userProductController');

userProductRouter
    .get("/getUserProducts", getUserProducts)
    .post("/addProductToCart", addToCart)
    .delete("/deleteFromCart", deleteFromCart)
    .delete("/clearCartAfterPurchase", clearCartAfterPurchase)

module.exports = userProductRouter;