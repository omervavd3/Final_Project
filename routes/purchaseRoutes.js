const express = require('express');
const purchaseRouter = express.Router();

const { addPurchase, getAllPurchases } = require('../controllers/purchaseController');

purchaseRouter
    .post("/addPurchase", addPurchase)
    .get("/getAllPurchases", getAllPurchases)

module.exports = purchaseRouter;