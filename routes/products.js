const express = require("express");
const router = express.Router();
const Product = require("../models/products");
const Size = require("../models/size");
const Category = require("../models/category");
const Color = require("../models/color");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const { productSchema } = require("../Schema.js");

const validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

router.get("/", async (req, res, next) => {
  const products = await Product.find({});
  const category = await Category.find({});
  res.render("products/index", { products, category });
});

router.post("/", validateProduct, async (req, res) => {
  // if (!req.body) throw new ExpressError("Invalid Product Data", 400);

  const product = await new Product(req.body);
  console.log(req.body);
  product.save();
  res.redirect(`/products/${product._id}`);
});

router.get("/new", async (req, res) => {
  const size = await Size.find({});
  const color = await Color.find({});
  const category = await Category.find({});
  res.render("products/new", { size, color, category });
});

router.post("/color", async (req, res) => {
  console.log(req.body);
  let c = await new Color(req.body);
  c.save();
});

router.post("/size", async (req, res) => {
  console.log(req.body);
  let s = await new Size(req.body);
  s.save();
  // res.redirect("back");
});

router.post("/category", async (req, res) => {
  console.log(req.body);
  let cate = await new Category(req.body);
  cate.save();
  // res.redirect("back");
});

router.delete("/color/:id", async (req, res) => {
  const { id } = req.params;
  await Color.findByIdAndDelete(id);
  // res.location("back");
});
router.delete(
  "/size/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    console.log(id);
    await Size.findByIdAndDelete(id);
    // res.location("back");
  })
);

router.delete("/category/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  await Category.findByIdAndDelete(id);
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

router.get("/:id", async (req, res) => {
  const products = await Product.findById(req.params.id);
  const category = await Category.find({});
  res.render("products/show", { products, recommendProducts, category });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

router.put("/:id", async (req, res) => {
  const products = await Product.findByIdAndUpdate(req.params.id, {
    ...req.body,
  });
  await products.save();
  res.redirect(`/products/${req.params.id}`);
});

router.get("/:id/edit", async (req, res) => {
  const size = await Size.find({});
  const color = await Color.find({});
  const category = await Category.find({});
  const products = await Product.findById(req.params.id);
  res.render("products/edit", { products, size, color, category });
});

module.exports = router;
