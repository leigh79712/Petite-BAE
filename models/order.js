const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema([
  {
    products: String,
    price: Number,
    images: String,
    size: String,
    color: String,
    qty: Number,
    user: {
      type: Schema.Types.ObjectId,
      res: "User",
    },
  },
]);

module.exports = mongoose.model("Order", OrderSchema);
