const Category = require("../models/category");
const Order = require("../models/order");
const HomePage = require("../models/homepage");
const { cloudinary } = require("../cloudinary");

module.exports.renderOrderPage = async (req, res) => {
  const category = await Category.find({});
  const order = await Order.find({}).populate("user");

  res.render("admin/order", { category, order });
};

module.exports.renderOrderDetailPage = async (req, res) => {
  const { id } = req.params;
  const category = await Category.find({});
  const order = await Order.findById(id).populate("user");
  res.render("admin/detail", { category, order });
};
module.exports.shippedOrder = async (req, res) => {
  const { id } = req.params;
  const category = await Category.find({});
  const order = await Order.findByIdAndUpdate(id, { shipping: true });
  res.redirect("/admin/order");
};

module.exports.renderEditImg_1 = async (req, res) => {
  const category = await Category.find({});
  const homepage = await HomePage.findById("61c5bbd0eee02c6540fa018e");
  const img = homepage.topImages_1;
  const url = "edithomepage_1";
  const name = "topImages_1";
  res.render("admin/editHomePage", { category, homepage, img, url, name });
};

module.exports.renderEditImg_2 = async (req, res) => {
  const category = await Category.find({});
  const homepage = await HomePage.findById("61c5bbd0eee02c6540fa018e");
  const img = homepage.topImages_2;
  const url = "edithomepage_2";
  const name = "topImages_2";
  res.render("admin/editHomePage", { category, homepage, img, url, name });
};

module.exports.renderEditImg_3 = async (req, res) => {
  const category = await Category.find({});
  const homepage = await HomePage.findById("61c5bbd0eee02c6540fa018e");
  const img = homepage.topImages_3;
  const url = "edithomepage_3";
  const name = "topImages_3";
  res.render("admin/editHomePage", { category, homepage, img, url, name });
};
module.exports.renderEditImg_4 = async (req, res) => {
  const category = await Category.find({});
  const homepage = await HomePage.findById("61c5bbd0eee02c6540fa018e");
  const img = homepage.secondImage_1;
  const url = "edithomepage_4";
  const name = "secondImage_1";
  res.render("admin/editHomePage", { category, homepage, img, url, name });
};

module.exports.renderEditImg_5 = async (req, res) => {
  const category = await Category.find({});
  const homepage = await HomePage.findById("61c5bbd0eee02c6540fa018e");
  const img = homepage.secondImage_2;
  const url = "edithomepage_5";
  const name = "secondImage_2";
  res.render("admin/editHomePage", { category, homepage, img, url, name });
};
// module.exports.renderHomePage = async (req, res) => {
//   const category = await Category.find({});

//   res.render("admin/newHomePage", { category });
// };

// module.exports.postNewEditImg = async (req, res) => {
//   const homePage = await new HomePage();

//   const [{ path, filename }] = req.files;
//   homePage.topImages_1 = {
//     url: path,
//     filename: filename,
//     text: req.body.text,
//     link: req.body.link,
//   };

//   homePage.save();
//   res.redirect("/admin/edithomepage");
// };

module.exports.editImg_1 = async (req, res) => {
  const homePage = await HomePage.findById("61c5bbd0eee02c6540fa018e");

  homePage.topImages_1.text = req.body.text;
  homePage.topImages_1.link = req.body.link;

  if (req.files.length !== 0) {
    const [i] = req.files.map((f) => ({
      url: f.path,
      filename: f.filename,
    }));
    homePage.topImages_1.image = i;
  }

  await homePage.save();

  if (req.body.deleteImage) {
    for (let filename of req.body.deleteImage) {
      await cloudinary.uploader.destroy(filename);
    }
    await homePage.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImage } } },
    });
  }

  homePage.save();
  res.redirect(`/admin/edithomepage_1`);
};

module.exports.editImg_2 = async (req, res) => {
  const homePage = await HomePage.findById("61c5bbd0eee02c6540fa018e");

  homePage.topImages_2.text = req.body.text;
  homePage.topImages_2.link = req.body.link;

  if (req.files.length !== 0) {
    const [i] = req.files.map((f) => ({
      url: f.path,
      filename: f.filename,
    }));
    homePage.topImages_2.image = i;
  }

  if (req.body.deleteImage) {
    for (let filename of req.body.deleteImage) {
      await cloudinary.uploader.destroy(filename);
    }
    await homePage.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImage } } },
    });
  }

  homePage.save();
  res.redirect(`/admin/edithomepage_2`);
};
module.exports.editImg_3 = async (req, res) => {
  const homePage = await HomePage.findById("61c5bbd0eee02c6540fa018e");

  homePage.topImages_3.text = req.body.text;
  homePage.topImages_3.link = req.body.link;

  if (req.files.length !== 0) {
    const [i] = req.files.map((f) => ({
      url: f.path,
      filename: f.filename,
    }));
    homePage.topImages_3.image = i;
  }

  if (req.body.deleteImage) {
    for (let filename of req.body.deleteImage) {
      await cloudinary.uploader.destroy(filename);
    }
    await homePage.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImage } } },
    });
  }

  homePage.save();
  res.redirect(`/admin/edithomepage_3`);
};

module.exports.editSecondImg_1 = async (req, res) => {
  const homePage = await HomePage.findById("61c5bbd0eee02c6540fa018e");
  homePage.secondImage_1.text = req.body.text;
  homePage.secondImage_1.link = req.body.link;

  if (req.files.length !== 0) {
    const [i] = req.files.map((f) => ({
      url: f.path,
      filename: f.filename,
    }));
    homePage.secondImage_1.image = i;
  }

  if (req.body.deleteImage) {
    for (let filename of req.body.deleteImage) {
      await cloudinary.uploader.destroy(filename);
    }
    await homePage.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImage } } },
    });
  }

  homePage.save();
  res.redirect(`/admin/edithomepage_4`);
};

module.exports.editSecondImg_2 = async (req, res) => {
  const homePage = await HomePage.findById("61c5bbd0eee02c6540fa018e");

  homePage.secondImage_2.text = req.body.text;
  homePage.secondImage_2.link = req.body.link;

  if (req.files.length !== 0) {
    const [i] = req.files.map((f) => ({
      url: f.path,
      filename: f.filename,
    }));
    homePage.secondImage_2.image = i;
  }

  if (req.body.deleteImage) {
    for (let filename of req.body.deleteImage) {
      await cloudinary.uploader.destroy(filename);
    }
    await homePage.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImage } } },
    });
  }

  homePage.save();
  res.redirect(`/admin/edithomepage_5`);
};
