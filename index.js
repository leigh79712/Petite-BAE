if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const path = require("path");
const Category = require("./models/category");
const User = require("./models/user");
const mongoSanitize = require("express-mongo-sanitize");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const session = require("express-session");
const productsRoute = require("./routes/products");
const registerRoute = require("./routes/register");
const adminRoute = require("./routes/admin");
const userShoppingRoute = require("./routes/userShopping");
const ExpressError = require("./utils/ExpressError");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { renderHomePage, renderCategoryPage } = require("./control/homepage");
const helmet = require("helmet");
const MongoStore = require("connect-mongo");
const dbUrl = process.env.mongo_Url;
//"mongodb://localhost:27017/petit-bae"
//
mongoose
  .connect(dbUrl)
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

app.use(mongoSanitize());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(flash());

const secret = process.env.SESSION_SECRET || "thisshouldbeabettersecret!";

const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
});
store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});
const sessionConfig = {
  store,
  secret,
  name: "petit-bae.",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure:ture,
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

app.use(helmet({ contentSecurityPolicy: false }));

app.use(async (req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");

  const admin = await User.findById("61c5ad954d66c3a3b954f03e");
  // const admin = await User.findById("61c06aba0d697ccb8f3552da");

  if (req.user) {
    const { id } = req.user;
    if (admin._id == id) {
      res.locals.admin = req.user;
    } else {
      res.locals.admin = null;
    }
  }
  next();
});

app.use("/products", productsRoute);
app.use("/", registerRoute);
app.use("/user", userShoppingRoute);
app.use("/admin", adminRoute);
app.get("/", renderHomePage);
app.get("/:id", renderCategoryPage);

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
