const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const PurchaseSchema = new Schema({
    userId: String,
    productsIds: [String],
    productsAmounts: [Number],
    totalPrice: Number
});

const PurchaseModel = mongoose.model("purchase", PurchaseSchema);

module.exports = PurchaseModel;