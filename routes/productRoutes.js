const express = require('express');
const productRouter = express.Router();

const { addProduct, getProducts, deleteProduct, updateProduct, getProductById, addProductToCart, removeProductFromCart } = require("../controllers/productController")

productRouter
    .post("/addProduct", addProduct)
    .get("/getProducts", getProducts)
    .delete("/deleteProduct", deleteProduct)
    .patch("/updateProduct", updateProduct)
    .post("/getProductById", getProductById)
    .patch("/addProductToCart", addProductToCart)
    .patch("/removeProductFromCart", removeProductFromCart)

module.exports = productRouter;