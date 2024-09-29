const express = require('express');
const productRouter = express.Router();

const { addProduct, getProducts, deleteProduct, updateProduct, getProductById, addProductToCart, removeProductFromCart, setProductCookie, getProductCookie, getProductsByCategory, deleteByCategory, getProductsIdByCategory } = require("../controllers/productController")

productRouter
    .post("/addProduct", addProduct)
    .get("/getProducts", getProducts)
    .delete("/deleteProduct", deleteProduct)
    .patch("/updateProduct", updateProduct)
    .post("/getProductById", getProductById)
    .patch("/addProductToCart", addProductToCart)
    .patch("/removeProductFromCart", removeProductFromCart)
    .post("/setProductCookie", setProductCookie)
    .get("/getProductFromCookie", getProductCookie)
    .post("/getProductsByCategory", getProductsByCategory)
    .delete("/deleteByCategory", deleteByCategory)
    .post("/getProductsIdByCategory", getProductsIdByCategory)

module.exports = productRouter;