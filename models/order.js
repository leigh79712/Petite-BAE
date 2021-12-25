const { boolean } = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema([
  {
    date: Date,
    shipping: Boolean,
    newOrder: Array,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
]);

module.exports = mongoose.model("Order", OrderSchema);
