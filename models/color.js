const mongoose = require("mongoose");
const { Schema } = mongoose;

const colorSchema = new Schema({
  otherColor: String,
});

module.exports = mongoose.model("Color", colorSchema);
