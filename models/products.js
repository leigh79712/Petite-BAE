const mongoose = require("mongoose");
const { Schema } = mongoose;

const productsSchema = new Schema({
  products: String,
  price: Number,
  images: String,
  description: String,
  size: Array,
  color: Array,
  category: Array,
});

module.exports = mongoose.model("Product", productsSchema);
