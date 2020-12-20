const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    sku:  String,
    name: String,
    price:   Number,
    brand:   String
});

module.exports = mongoose.model('Product',productSchema)
