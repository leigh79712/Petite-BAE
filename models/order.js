const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema([
  {
    newOrder: Array,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
]);

module.exports = mongoose.model("Order", OrderSchema);
