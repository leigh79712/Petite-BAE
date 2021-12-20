const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Category = require("../models/category");
const Product = require("../models/products");
const ShoppingCart = require("../models/shoppingcart");
const { isLoggedIn } = require("../middleware");

router.get("/:id/checkout", async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(req.user).populate("shoppingCart");
  const shoppingCart = await ShoppingCart.find({ user: req.user });
  const category = await Category.find({});
  let sum = 0;
  if (user) {
    for (let p of user.shoppingCart) {
      sum += p.price * p.qty;
    }
  }

  res.render("products/shoppingCart", { user, shoppingCart, category, sum });
});

router.post("/:id/shoppingcart/:productID", isLoggedIn, async (req, res) => {
  const { id } = req.user;
  const { productID } = req.params;
  const user = await User.findById(id);
  const product = await Product.findById(productID);
  console.log(product);
  const { products, price, images } = product;
  const { size, color, qty } = req.body;
  const shoppingCart = await new ShoppingCart({
    products,
    price,
    images,
    size,
    color,
    qty,
  });
  shoppingCart.user = req.user;
  user.shoppingCart.push(shoppingCart);
  await user.save();
  await shoppingCart.save();

  res.redirect(`/user/${id}/checkout`);
});

router.put("/:id/shoppingcart/:productID", async (req, res) => {
  const { id } = req.user;
  const { productID } = req.params;
  const shoppingCart = await ShoppingCart.findByIdAndUpdate(
    productID,
    req.body
  );

  shoppingCart.save();
  res.redirect(`/user/${id}/checkout`);
});

router.delete(
  "/:id/shoppingcart/:shoppingcartID",
  isLoggedIn,
  async (req, res) => {
    const { id, shoppingcartID } = req.params;
    const user = await User.findByIdAndUpdate(id, {
      $pull: { shoppingCart: shoppingcartID },
    });
    const shoppingCart = await ShoppingCart.findByIdAndDelete(shoppingcartID);
    // const redirectUrl = req.session.returnTo || "/products";
    // res.redirect(redirectUrl);
  }
);

module.exports = router;
