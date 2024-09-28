const express = require('express');
const purchaseRouter = express.Router();

const { addPurchase } = require('../controllers/purchaseController');

purchaseRouter
    .post("/addPurchase", addPurchase)

module.exports = purchaseRouter;