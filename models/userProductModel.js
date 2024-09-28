const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const UserProductSchema = new Schema({
    userId: String,
    productId: String,
    amount: Number
});

const UserProductModel = mongoose.model("user_product", UserProductSchema);

module.exports = UserProductModel;