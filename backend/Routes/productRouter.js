const express = require("express");
const {
  fetchProducts,
  registerProduct,
} = require("../Controller/productController");

const router = express.Router();

router.route("/").post(registerProduct);
router.get("/fetch", fetchProducts);

module.exports = router;
