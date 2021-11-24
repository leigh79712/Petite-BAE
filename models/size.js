const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sizeSchema = new Schema({
  otherSize: String,
});

module.exports = mongoose.model("Size", sizeSchema);
