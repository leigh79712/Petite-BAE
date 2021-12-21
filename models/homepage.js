const mongoose = require("mongoose");
const { Schema } = mongoose;

const ImageSchema = new Schema({
  url: String,
  filename: String,
  text: String,
  link: String,
});
ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_500");
});

const HomePageSchema = new Schema({
  topImages_1: ImageSchema,
  topImages_2: ImageSchema,
  topImages_3: ImageSchema,
  secondImage_1: ImageSchema,
  secondImage_2: ImageSchema,
});

module.exports = mongoose.model("HomePage", HomePageSchema);
