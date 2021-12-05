const express = require("express");
const app = express();
const path = require("path");
const Product = require("./models/products");
const Category = require("./models/category");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const session = require("express-session");
const products = require("./routes/products");
const ExpressError = require("./utils/ExpressError");
const flash = require("connect-flash");

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
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/products", products);

app.get("/signup", async (req, res) => {
  const category = await Category.find({});
  res.render("user/signup", { category });
});
app.get("/login", async (req, res) => {
  const category = await Category.find({});
  res.render("user/login", { category });
});

app.get("/category/:id", async (req, res) => {
  const { id } = req.params;
  const cate = await Category.find({ _id: id });
  const [{ otherCategory }] = cate;
  const category = await Category.find({});
  const products = await Product.find({ category: otherCategory });
  // res.send(products);
  res.render("products/index", { category, products });
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
