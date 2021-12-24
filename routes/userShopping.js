const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middleware");
const userShopping = require("../control/userShopping");

router.get("/:id/checkout", isLoggedIn, userShopping.renderCheckOutPage);

router.get("/:id/success", isLoggedIn, userShopping.renderSuccessOrderPage);

router.post("/:id/order", isLoggedIn, userShopping.getNewOrder);

router
  .route("/:id/shoppingcart/:productID")
  .post(isLoggedIn, userShopping.addItemToShoppingCart)
  .put(isLoggedIn, userShopping.editShoppingCartItem);

router.delete(
  "/:id/shoppingcart/:shoppingcartID",
  isLoggedIn,
  userShopping.deleteShoppingCartItem
);

module.exports = router;
