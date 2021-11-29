const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  otherCategory: String,
});

module.exports = mongoose.model("Category", categorySchema);
