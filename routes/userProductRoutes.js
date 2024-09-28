const express = require('express');
const userProductRouter = express.Router();

const { getUserProducts, addToCart, deleteFromCart } = require('../controllers/userProductController');

userProductRouter
    .get("/getUserProducts", getUserProducts)
    .post("/addProductToCart", addToCart)
    .delete("/deleteFromCart", deleteFromCart)

module.exports = userProductRouter;