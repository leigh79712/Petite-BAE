const Category = require("../models/category");
const Color = require("../models/color");
const Product = require("../models/products");
const HomePage = require("../models/homepage");
const User = require("../models/user");
const Size = require("../models/size");
const catchAsync = require("../utils/catchAsync");
const { cloudinary } = require("../cloudinary");

const recommendProducts = [];
const randomProducts = async function (times) {
  const allProducts = await Product.find({});
  for (let i = 0; i < times; i++) {
    const random = Math.floor(Math.random() * allProducts.length);
    recommendProducts.push(allProducts[random]);
  }
};
randomProducts(9);

module.exports.renderEditCategory = async (req, res) => {
  const category = await Category.find({});
  res.render("admin/category", { category });
};
module.exports.putEditCategory = async (req, res) => {
  const { id } = req.params;
  const { category } = req.body;
  const updateCategory = await Category.findByIdAndUpdate(id, {
    otherCategory: "_" + category.toLowerCase(),
  });
  res.redirect("/products/editCategory");
};

module.exports.newCategory = async (req, res) => {
  const { otherCategory } = req.body;
  const updateCategory = await new Category({
    otherCategory: "_" + otherCategory.toLowerCase(),
  });
  updateCategory.save();
  res.redirect("/products/editCategory");
};

module.exports.renderIndexPage = async (req, res, next) => {
  const products = await Product.find({});
  const category = await Category.find({});
  const user = await User.findById(req.user).populate("shoppingCart");

  let sum = 0;
  if (user) {
    for (let p of user.shoppingCart) {
      sum += p.price * p.qty;
    }
  }
  res.render("products/index", { user, products, category, sum });
};
const imageUrl = [
  {
    path: "https://res.cloudinary.com/leigh79712/image/upload/v1640352242/ShoppingApp/jrzsq5frvufd9nzw4lfz.webp",
    filename: "ShoppingApp/jrzsq5frvufd9nzw4lfz",
  },
  {
    path: "https://res.cloudinary.com/leigh79712/image/upload/v1640352242/ShoppingApp/lsjusb3rkbxqb0hot6en.webp",
    filename: "ShoppingApp/lsjusb3rkbxqb0hot6en",
  },
];
module.exports.makeNewProducts = async (req, res) => {
  // if (!req.body) throw new ExpressError("Invalid Product Data", 400);
  const product = await new Product(req.body);
  product.images = imageUrl.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  product.save();

  req.flash("success", "Successfully upload a product!");
  res.redirect(`/products/${product._id}`);
};

module.exports.renderNewProductPage = async (req, res) => {
  const size = await Size.find({});
  const color = await Color.find({});
  const category = await Category.find({});
  const user = await User.findById(req.user).populate("shoppingCart");
  let sum = 0;
  if (user) {
    for (let p of user.shoppingCart) {
      sum += p.price * p.qty;
    }
  }
  res.render("products/new", { size, color, category, sum, user });
};

module.exports.editColor = async (req, res) => {
  let c = await new Color(req.body);
  c.save();
};

module.exports.editSize = async (req, res) => {
  let s = await new Size(req.body);
  s.save();
};
module.exports.editCategory = async (req, res) => {
  let cate = await new Category(req.body);
  cate.save();
};

module.exports.deleteColor = async (req, res) => {
  const { id } = req.params;
  await Color.findByIdAndDelete(id);
};

module.exports.deleteSize = catchAsync(async (req, res) => {
  const { id } = req.params;
  await Size.findByIdAndDelete(id);
});

module.exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  await Category.findByIdAndDelete(id);
  res.redirect("/products/editCategory");
};

module.exports.renderShowPage = async (req, res) => {
  const products = await Product.findById(req.params.id);
  const category = await Category.find({});
  const user = await User.findById(req.user).populate("shoppingCart");
  let sum = 0;
  if (user) {
    for (let p of user.shoppingCart) {
      sum += p.price * p.qty;
    }
  }
  if (!products) {
    req.flash("error", "Cannot find that product!");
    return res.redirect("/products");
  }

  res.render("products/show", {
    user,
    products,
    recommendProducts,
    category,
    sum,
  });
};

module.exports.editProducts = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, {
    ...req.body,
  });
  const imgs = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));

  product.images.push(...imgs);
  await product.save();
  if (req.body.deleteImage) {
    for (let filename of req.body.deleteImage) {
      await cloudinary.uploader.destroy(filename);
    }
    await product.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImage } } },
    });
  }

  req.flash("success", "Successfully edit a product!");

  res.redirect(`/products/${req.params.id}`);
};

module.exports.renderEditPage = async (req, res) => {
  const size = await Size.find({});
  const color = await Color.find({});
  const category = await Category.find({});
  const products = await Product.findById(req.params.id);
  if (!products) {
    req.flash("error", "Cannot find that campground!");
    return res.redirect("/products");
  }
  res.render("products/edit", { products, size, color, category });
};

module.exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect("/products");
};
