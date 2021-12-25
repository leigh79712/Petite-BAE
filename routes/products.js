const express = require("express");
const router = express.Router();
const { isLoggedIn, checkAdmins, validateProduct } = require("../middleware");
const products = require("../control/products");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router
  .route("/")
  .get(products.renderIndexPage)
  .post(upload.array("images"), validateProduct, products.makeNewProducts);

router.get("/editCategory", products.renderEditCategory);
router.post("/newCategory", isLoggedIn, checkAdmins, products.newCategory);
router.get("/new", isLoggedIn, checkAdmins, products.renderNewProductPage);
router.post("/color", isLoggedIn, checkAdmins, products.editColor);
router.post("/size", isLoggedIn, checkAdmins, products.editSize);
router.post("/category", isLoggedIn, checkAdmins, products.editCategory);
router.delete("/color/:id", isLoggedIn, checkAdmins, products.deleteColor);
router.delete("/size/:id", isLoggedIn, checkAdmins, products.deleteSize);
router
  .route("/category/:id")
  .put(isLoggedIn, checkAdmins, products.putEditCategory)
  .delete(isLoggedIn, checkAdmins, products.deleteCategory);

router
  .route("/:id")
  .get(products.renderShowPage)
  .delete(isLoggedIn, checkAdmins, products.deleteProduct)
  .put(
    isLoggedIn,
    checkAdmins,
    upload.array("images"),
    validateProduct,
    products.editProducts
  );

router.get("/:id/edit", isLoggedIn, checkAdmins, products.renderEditPage);

module.exports = router;
