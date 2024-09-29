const express = require('express');
const userProductRouter = express.Router();

const { getUserProducts, addToCart, deleteFromCart, clearCartAfterPurchase, deleteAfterDeleteCategory } = require('../controllers/userProductController');

userProductRouter
    .get("/getUserProducts", getUserProducts)
    .post("/addProductToCart", addToCart)
    .delete("/deleteFromCart", deleteFromCart)
    .delete("/clearCartAfterPurchase", clearCartAfterPurchase)
    .delete("/deleteAfterDeleteCategory", deleteAfterDeleteCategory)

module.exports = userProductRouter;