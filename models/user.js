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
  shoppingCart: {
    type: Schema.Types.ObjectId,
    ref: "ShoppingCart",
  },
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
