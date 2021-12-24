const Category = require("../models/category");
const User = require("../models/user");
const Product = require("../models/products");
const ShoppingCart = require("../models/shoppingcart");
const Order = require("../models/order");

module.exports.renderCheckOutPage = async (req, res) => {
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
};

module.exports.renderSuccessOrderPage = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(req.user)
    .populate("shoppingCart")
    .populate("order");
  const order = await Order.find({ user: req.user });

  const category = await Category.find({});

  res.render("products/success", { order, category, user });
};

module.exports.getNewOrder = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  const shoppingcart = await ShoppingCart.find({ user: req.user });
  const newOrder = [];
  for (let i = 0; i < shoppingcart.length; i++) {
    let obj = {};
    obj.products = shoppingcart[i].products;
    obj.price = shoppingcart[i].price;
    obj.images = shoppingcart[i].images;
    obj.size = shoppingcart[i].size;
    obj.color = shoppingcart[i].color;
    obj.qty = shoppingcart[i].qty;
    newOrder.push(obj);
  }
  const order = await new Order({ newOrder: newOrder });
  const updateUser = await User.findByIdAndUpdate(_id, {
    $pullAll: { shoppingCart: shoppingcart },
  });
  order.user = req.user;
  await user.order.push(order);
  await ShoppingCart.deleteMany({ user: req.user });
  await user.save();
  await order.save();
  res.redirect(`/user/${_id}/success`);
};

module.exports.addItemToShoppingCart = async (req, res) => {
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
};

module.exports.editShoppingCartItem = async (req, res) => {
  const { id } = req.user;
  const { productID } = req.params;
  const shoppingCart = await ShoppingCart.findByIdAndUpdate(
    productID,
    req.body
  );

  shoppingCart.save();
  res.redirect(`/user/${id}/checkout`);
};

module.exports.deleteShoppingCartItem = async (req, res) => {
  const { id, shoppingcartID } = req.params;
  const user = await User.findByIdAndUpdate(id, {
    $pull: { shoppingCart: shoppingcartID },
  });
  const shoppingCart = await ShoppingCart.findByIdAndDelete(shoppingcartID);
  // const redirectUrl = req.session.returnTo || "/products";
  // res.redirect(redirectUrl);
};
