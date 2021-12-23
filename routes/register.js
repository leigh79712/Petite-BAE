const express = require("express");
const router = express.Router();

const passport = require("passport");
const register = require("../control/register");

router
  .route("/signup")
  .get(register.renderSignupPage)
  .post(register.registerNewUser);

router
  .route("/login")
  .get(register.renderLoginPage)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "login",
    }),
    register.loginUser
  );

router.get("/logout", register.logoutUser);

module.exports = router;
