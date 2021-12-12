const express = require("express");
const app = express();
const path = require("path");
const Category = require("./models/category");
const Product = require("./models/products");
const User = require("./models/user");

const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const session = require("express-session");
const productsRoute = require("./routes/products");
const registerRoute = require("./routes/register");
const userShoppingRoute = require("./routes/userShopping");
const ExpressError = require("./utils/ExpressError");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

mongoose
  .connect("mongodb://localhost:27017/petit-bae")
  .then(() => {
    console.log("Connection open");
  })
  .catch((err) => {
    console.log("Oh no error!");
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.engine("ejs", ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(flash());

const sessionConfig = {
  secret: "thisshouldbeabettersecet!",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(async (req, res, next) => {
  const admin = await User.findById("61b671841c1f785e26fdf4f2");
  if (req.user) {
    const { id } = req.user;
    if (admin._id == id) {
      res.locals.admin = req.user;
    } else {
      res.locals.admin = null;
    }
  }

  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/products", productsRoute);
app.use("/", registerRoute);
app.use("/user", userShoppingRoute);

app.get("/", async (req, res) => {
  const products = await Product.find({});
  const category = await Category.find({});
  const user = await User.findById(req.user).populate("shoppingCart");
  let sum = 0;
  if (user) {
    for (let p of user.shoppingCart) {
      sum += p.price * p.qty;
    }
  }
  res.render("home", { category, products, user, sum });
});

app.get("/category/:id", async (req, res) => {
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
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use(async (err, req, res, next) => {
  const category = await Category.find({});
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something went wrong";
  res.status(statusCode).render("error", { category, err });
});
app.listen(3000, () => {
  console.log("listen to port 3000");
});
