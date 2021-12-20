module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in");
    return res.redirect("/login");
  }
  req.session.returnTo = req.originalUrl;
  next();
};
const User = require("./models/user");

module.exports.checkAdmins = async (req, res, next) => {
  const admin = await User.findById("61c06aba0d697ccb8f3552da");
  if (req.user) {
    const { id } = req.user;
    if (id == admin._id) {
      console.log(id);
      return next();
    }
    if (!req.user || id == admin._id) req.flash("error", "You are not admins!");
    res.redirect("/products");
    next();
  }
};
