const mongoose = require("mongoose");
const Category = require("./category");
const { Schema } = mongoose;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});
ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});
const productsSchema = new Schema({
  products: String,
  price: Number,
  images: [ImageSchema],
  description: String,
  size: Array,
  color: Array,
  category: Array,
});

module.exports = mongoose.model("Product", productsSchema);
