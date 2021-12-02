const express = require("express");
const app = express();
const path = require("path");
const Product = require("./models/products");
const Size = require("./models/size");
const Category = require("./models/category");
const Color = require("./models/color");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");

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

app.get("/products", async (req, res) => {
  const products = await Product.find({});
  const category = await Category.find({});
  res.render("products/index", { products, category });
});

app.post("/products", async (req, res) => {
  const product = await new Product(req.body);
  console.log(req.body);
  product.save();
  res.redirect(`/products/${product._id}`);
});

app.get("/signup", async (req, res) => {
  const category = await Category.find({});
  res.render("user/signup", { category });
});
app.get("/login", async (req, res) => {
  const category = await Category.find({});
  res.render("user/login", { category });
});

app.get("/products/new", async (req, res) => {
  const size = await Size.find({});
  const color = await Color.find({});
  const category = await Category.find({});
  res.render("products/new", { size, color, category });
});

app.post("/products/color", async (req, res) => {
  console.log(req.body);
  let c = await new Color(req.body);
  c.save();
});

app.post("/products/size", async (req, res) => {
  console.log(req.body);
  let s = await new Size(req.body);
  s.save();
  // res.redirect("back");
});
app.post("/products/category", async (req, res) => {
  console.log(req.body);
  let cate = await new Category(req.body);
  cate.save();
  // res.redirect("back");
});

app.delete("/products/color/:id", async (req, res) => {
  const { id } = req.params;
  await Color.findByIdAndDelete(id);
  // res.location("back");
});
app.delete("/products/size/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  await Size.findByIdAndDelete(id);
  // res.location("back");
});
const recommendProducts = [];
const randomProducts = async function (times) {
  const allProducts = await Product.find({});
  for (let i = 0; i < times; i++) {
    const random = Math.floor(Math.random() * allProducts.length);
    recommendProducts.push(allProducts[random]);
  }
};
randomProducts(7);

app.get("/products/:id", async (req, res) => {
  const products = await Product.findById(req.params.id);
  const category = await Category.find({});
  res.render("products/show", { products, recommendProducts, category });
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

app.put("/products/:id", async (req, res) => {
  const products = await Product.findByIdAndUpdate(req.params.id, {
    ...req.body,
  });
  await products.save();
  res.redirect(`/products/${req.params.id}`);
});

app.get("/products/:id/edit", async (req, res) => {
  const size = await Size.find({});
  const color = await Color.find({});
  const category = await Category.find({});
  const products = await Product.findById(req.params.id);
  res.render("products/edit", { products, size, color, category });
});

app.listen(3000, () => {
  console.log("listen to port 3000");
});
