const express = require("express");
const router = express.Router();
const Size = require("../models/size");
const Category = require("../models/category");
const Color = require("../models/color");

router.get("admin/products/new", async (req, res) => {
  const size = await Size.find({});
  const color = await Color.find({});
  const category = await Category.find({});
  res.render("products/new", { size, color, category });
});
