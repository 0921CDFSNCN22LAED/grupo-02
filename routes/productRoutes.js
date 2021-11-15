const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.get("/create", productController.productForm);
router.get("/:id", productController.detail);

module.exports = router;
