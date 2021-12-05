const mongoose = require("mongoose");
const { Schema } = mongoose;

const ShoppingCartSchema = new Schema({
  products: String,
  price: Number,
  images: String,
  size: Array,
  color: Array,
});

module.exports = mongoose.model("ShoppingCart", ShoppingCartSchema);
