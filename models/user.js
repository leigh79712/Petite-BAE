const mongoose = require("mongoose");
const { Schema } = mongoose;
const ShoppingCart = require("./shoppingcart");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstname: String,
  lastname: String,
  shoppingCart: [
    {
      type: Schema.Types.ObjectId,
      ref: "ShoppingCart",
    },
  ],
  order: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
