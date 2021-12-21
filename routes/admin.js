const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const User = require("../models/user");
const Order = require("../models/order");
const HomePage = require("../models/homepage");

const multer = require("multer");
const { storage, cloudinary } = require("../cloudinary");
const upload = multer({ storage });

router.get("/order", async (req, res) => {
  const category = await Category.find({});
  const order = await Order.find({}).populate("user");

  res.render("admin/order", { category, order });
});

router.get("/order/:id", async (req, res) => {
  const { id } = req.params;
  const category = await Category.find({});
  const order = await Order.findById(id).populate("user");
  console.log(order);
  res.render("admin/detail", { category, order });
});

router.get("/edithomepage_1", async (req, res) => {
  const category = await Category.find({});
  const homepage = await HomePage.findById("61c1ce04c1fab7aa8ad18ee5");
  const img = homepage.topImages_1;
  const url = "edithomepage_1";
  const name = "topImages_1";
  res.render("admin/editHomePage", { category, homepage, img, url, name });
});
router.get("/edithomepage_2", async (req, res) => {
  const category = await Category.find({});
  const homepage = await HomePage.findById("61c1ce04c1fab7aa8ad18ee5");
  const img = homepage.topImages_2;
  const url = "edithomepage_2";
  const name = "topImages_2";
  res.render("admin/editHomePage", { category, homepage, img, url, name });
});
router.get("/edithomepage_3", async (req, res) => {
  const category = await Category.find({});
  const homepage = await HomePage.findById("61c1ce04c1fab7aa8ad18ee5");
  const img = homepage.topImages_3;
  const url = "edithomepage_3";
  const name = "topImages_3";
  res.render("admin/editHomePage", { category, homepage, img, url, name });
});
router.get("/edithomepage_4", async (req, res) => {
  const category = await Category.find({});
  const homepage = await HomePage.findById("61c1ce04c1fab7aa8ad18ee5");
  const img = homepage.secondImage_1;
  const url = "edithomepage_4";
  const name = "secondImage_1";
  res.render("admin/editHomePage", { category, homepage, img, url, name });
});
router.get("/edithomepage_5", async (req, res) => {
  const category = await Category.find({});
  const homepage = await HomePage.findById("61c1ce04c1fab7aa8ad18ee5");
  const img = homepage.secondImage_2;
  const url = "edithomepage_5";
  const name = "secondImage_2";
  res.render("admin/editHomePage", { category, homepage, img, url, name });
});

// router.post("/edithomepage", upload.array("topImages_1"), async (req, res) => {
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
// });

router.put("/edithomepage_1", upload.array("topImages_1"), async (req, res) => {
  const homePage = await HomePage.findById("61c1ce04c1fab7aa8ad18ee5");

  const [{ path, filename }] = req.files;

  homePage.topImages_1 = {
    url: path,
    filename: filename,
    text: req.body.text,
    link: req.body.link,
  };

  if (req.body.deleteImage) {
    for (let filename of req.body.deleteImage) {
      await cloudinary.uploader.destroy(filename);
      console.log(filename);
    }
    await homePage.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImage } } },
    });
  }

  homePage.save();
  res.redirect(`/admin/edithomepage_1`);
});

router.put("/edithomepage_2", upload.array("topImages_2"), async (req, res) => {
  const homePage = await HomePage.findById("61c1ce04c1fab7aa8ad18ee5");

  const [{ path, filename }] = req.files;
  homePage.topImages_2 = {
    url: path,
    filename: filename,
    text: req.body.text,
    link: req.body.link,
  };
  if (req.body.deleteImage) {
    for (let filename of req.body.deleteImage) {
      await cloudinary.uploader.destroy(filename);
      console.log(filename);
    }
    await homePage.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImage } } },
    });
  }

  homePage.save();
  res.redirect(`/admin/edithomepage_2`);
});

router.put("/edithomepage_3", upload.array("topImages_3"), async (req, res) => {
  const homePage = await HomePage.findById("61c1ce04c1fab7aa8ad18ee5");

  const [{ path, filename }] = req.files;
  homePage.topImages_3 = {
    url: path,
    filename: filename,
    text: req.body.text,
    link: req.body.link,
  };
  if (req.body.deleteImage) {
    for (let filename of req.body.deleteImage) {
      await cloudinary.uploader.destroy(filename);
      console.log(filename);
    }
    await homePage.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImage } } },
    });
  }

  homePage.save();
  res.redirect(`/admin/edithomepage_3`);
});
router.put(
  "/edithomepage_4",
  upload.array("secondImage_1"),
  async (req, res) => {
    const homePage = await HomePage.findById("61c1ce04c1fab7aa8ad18ee5");

    const [{ path, filename }] = req.files;
    homePage.secondImage_1 = {
      url: path,
      filename: filename,
      text: req.body.text,
      link: req.body.link,
    };
    if (req.body.deleteImage) {
      for (let filename of req.body.deleteImage) {
        await cloudinary.uploader.destroy(filename);
        console.log(filename);
      }
      await homePage.updateOne({
        $pull: { images: { filename: { $in: req.body.deleteImage } } },
      });
    }

    homePage.save();
    res.redirect(`/admin/edithomepage_4`);
  }
);
router.put(
  "/edithomepage_5",
  upload.array("secondImage_2"),
  async (req, res) => {
    const homePage = await HomePage.findById("61c1ce04c1fab7aa8ad18ee5");

    const [{ path, filename }] = req.files;
    homePage.secondImage_2 = {
      url: path,
      filename: filename,
      text: req.body.text,
      link: req.body.link,
    };
    if (req.body.deleteImage) {
      for (let filename of req.body.deleteImage) {
        await cloudinary.uploader.destroy(filename);
        console.log(filename);
      }
      await homePage.updateOne({
        $pull: { images: { filename: { $in: req.body.deleteImage } } },
      });
    }

    homePage.save();
    res.redirect(`/admin/edithomepage_5`);
  }
);
module.exports = router;
