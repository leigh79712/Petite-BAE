const express = require("express");
const app = express();
const path = require("path");
const Product = require("./models/products");
const Size = require("./models/size");
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
app.use(methodOverride("_method"));

app.get("/products", async (req, res) => {
  const products = await Product.find({});
  console.log(products);
  res.render("index", { products });
});

app.post("/products", async (req, res) => {
  const product = await new Product(req.body.product);
  // console.log(product);
  product.save();
  res.redirect(`/products/${product._id}`);
});

app.get("/products/new", async (req, res) => {
  const size = await Size.find({});
  res.render("new", { size });
});

app.post("/size", async (req, res) => {
  const s = await new Size(req.body);
  s.save();
  res.redirect("back");
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
  res.render("show", { products, recommendProducts });
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

app.put("/products/:id", async (req, res) => {
  const products = await Product.findByIdAndUpdate(req.params.id, req.body);
  await products.save();
  res.redirect(`/products/${req.params.id}`);
});

app.get("/products/:id/edit", async (req, res) => {
  const products = await Product.findById(req.params.id);
  res.render("edit", { products });
});

app.listen(3000, () => {
  console.log("listen to port 3000");
});
