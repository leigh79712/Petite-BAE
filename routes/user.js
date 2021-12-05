const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Category = require("../models/category");
const passport = require("passport");

router.get("/signup", async (req, res) => {
  const category = await Category.find({});
  res.render("user/signup", { category });
});
router.get("/login", async (req, res) => {
  const category = await Category.find({});
  res.render("user/login", { category });
});

router.post("/signup", async (req, res) => {
  try {
    const { email, username, password, lastname, firstname } = req.body;
    const user = await new User({ email, username, lastname, firstname });
    const registeredUser = await User.register(user, password);
    console.log(registeredUser);
    req.flash("success", "Success register!");
    res.redirect("/products");
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "login",
  }),
  (req, res) => {
    req.flash("success", "Welcome back!");
    res.redirect("/products");
  }
);

module.exports = router;
