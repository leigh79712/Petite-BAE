const express = require("express");
const router = express.Router();
const Size = require("../models/size");
const Category = require("../models/category");
const Color = require("../models/color");
const User = require("../models/user");
const Order = require("../models/order");

router.get("/order", async (req, res) => {
  const category = await Category.find({});
  const order = await Order.find({}).populate("user");

  res.render("admin/order", { category, order });
});

router.get("/order/:id", async (req, res) => {
  const { id } = req.params;
  const category = await Category.find({});
  const order = await Order.findById(id).populate("user");
  res.render("admin/order", { category, order });
});

module.exports = router;
