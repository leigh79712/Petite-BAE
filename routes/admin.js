const express = require("express");
const router = express.Router();
const admin = require("../control/admin");
const multer = require("multer");
const { storage, cloudinary } = require("../cloudinary");
const upload = multer({ storage });
const { isLoggedIn, checkAdmins } = require("../middleware");

router.get("/order", isLoggedIn, checkAdmins, admin.renderOrderPage);

router.get("/order/:id", isLoggedIn, checkAdmins, admin.renderOrderDetailPage);

router.get("/edithomepage_1", isLoggedIn, checkAdmins, admin.renderEditImg_1);
router.get("/edithomepage_2", isLoggedIn, checkAdmins, admin.renderEditImg_2);
router.get("/edithomepage_3", isLoggedIn, checkAdmins, admin.renderEditImg_3);
router.get("/edithomepage_4", isLoggedIn, checkAdmins, admin.renderEditImg_4);
router.get("/edithomepage_5", isLoggedIn, checkAdmins, admin.renderEditImg_5);

// router.post("/edithomepage", isLoggedIn, checkAdmins,upload.array("topImages_1"), admin.postNewEditImg);

router.put(
  "/edithomepage_1",
  isLoggedIn,
  checkAdmins,
  upload.single("topImages_1"),
  admin.editImg_1
);

router.put(
  "/edithomepage_2",
  isLoggedIn,
  checkAdmins,
  upload.single("topImages_2"),
  admin.editImg_2
);

router.put(
  "/edithomepage_3",
  isLoggedIn,
  checkAdmins,
  upload.single("topImages_3"),
  admin.editImg_3
);
router.put(
  "/edithomepage_4",
  isLoggedIn,
  checkAdmins,
  upload.single("secondImage_1")
);
router.put(
  "/edithomepage_5",
  isLoggedIn,
  checkAdmins,
  upload.single("secondImage_1")
);
module.exports = router;
