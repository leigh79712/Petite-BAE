const User = require("../models/user");
const Category = require("../models/category");
const ShoppingCart = require("../models/shoppingcart");

module.exports.renderSignupPage = async (req, res) => {
  const category = await Category.find({});
  res.render("user/signup", { category });
};

module.exports.renderLoginPage = async (req, res) => {
  const category = await Category.find({});
  res.render("user/login", { category });
};

module.exports.registerNewUser = async (req, res, next) => {
  try {
    const { email, username, password, lastname, firstname } = req.body;
    const user = await new User({ email, username, lastname, firstname });
    const registeredUser = await User.register(user, password);
    const admin = await User.findById("61c5ad954d66c3a3b954f03e");
    // const admin = await User.findById("61c06aba0d697ccb8f3552da");
    admin.user.push(user);
    admin.save();

    req.login(registeredUser, (err) => {
      if (err) return next(err);
    });
    req.flash("success", "Success register!");
    res.redirect("/products");
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.loginUser = (req, res) => {
  req.flash("success", "Welcome back!");
  const redirectUrl = req.session.returnTo || "/";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res) => {
  req.logout();
  req.flash("success", "See you next time!");
  res.redirect("/products");
};
