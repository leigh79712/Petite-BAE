const mongoose = require("mongoose");
const { Schema } = mongoose;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});
ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const ShoppingCartSchema = new Schema({
  products: String,
  price: Number,
  images: [ImageSchema],
  size: String,
  color: String,
  qty: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("ShoppingCart", ShoppingCartSchema);
