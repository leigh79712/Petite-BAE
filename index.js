const express = require("express");
const app = express();
const path = require("path");
const Product = require("./models/products");
const Category = require("./models/category");
const ShoppingCart = require("./models/shoppingcart");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const session = require("express-session");
const productsRoute = require("./routes/products");
const userRoute = require("./routes/user");
const ExpressError = require("./utils/ExpressError");
const flash = require("connect-flash");
const User = require("./models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { isLoggedIn } = require("./middleware");
const shoppingcart = require("./models/shoppingcart");

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
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/products", productsRoute);
app.use("/", userRoute);

app.get("/category/:id", async (req, res) => {
  const { id } = req.params;
  const cate = await Category.find({ _id: id });
  const [{ otherCategory }] = cate;
  const category = await Category.find({});
  const products = await Product.find({ category: otherCategory });
  const user = await User.findById(req.user).populate("shoppingCart");
  // res.send(products);
  res.render("products/index", { category, products, user });
});

app.get("/user/:id/checkout", async (req, res) => {
  const { id } = req.user;
  const shoppingCart = await ShoppingCart.find({ user: req.user });
  res.send(shoppingCart);
});

app.post("/user/:id/shoppingcart/:productID", isLoggedIn, async (req, res) => {
  const { id } = req.user;
  const { productID } = req.params;
  const user = await User.findById(id);
  const product = await Product.findById(productID);
  const { products, price, images } = product;
  const { size, color } = req.body;
  const shoppingCart = await new ShoppingCart({
    products,
    price,
    images,
    size,
    color,
  });
  shoppingCart.user = req.user;
  user.shoppingCart.push(shoppingCart);
  console.log(shoppingCart);
  await user.save();
  await shoppingCart.save();
  // const redirectUrl = req.session.returnTo || "/products";
  // res.redirect(redirectUrl);
});

app.delete(
  "/user/:id/shoppingcart/:shoppingcartID",
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
