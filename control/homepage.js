const HomePage = require("../models/homepage");
const Product = require("../models/products");
const Category = require("../models/category");
const User = require("../models/user");
module.exports.renderHomePage = async (req, res) => {
  const products = await Product.find({});
  const category = await Category.find({});
  const homepage = await HomePage.findById("61c1ce04c1fab7aa8ad18ee5");
  const user = await User.findById(req.user).populate("shoppingCart");
  let sum = 0;
  if (user) {
    for (let p of user.shoppingCart) {
      sum += p.price * p.qty;
    }
  }
  res.render("home", { category, products, user, sum, homepage });
};

module.exports.renderCategoryPage = async (req, res) => {
  const { id } = req.params;
  const cate = await Category.find({ _id: id });
  const [{ otherCategory }] = cate;
  const category = await Category.find({});
  const products = await Product.find({ category: otherCategory });
  const user = await User.findById(req.user).populate("shoppingCart");
  let sum = 0;
  if (user) {
    for (let p of user.shoppingCart) {
      sum += p.price;
    }
  }
  // res.send(products);
  res.render("products/index", { category, products, user, sum });
};
