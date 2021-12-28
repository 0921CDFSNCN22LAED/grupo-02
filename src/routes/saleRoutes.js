const express = require("express");
const router = express.Router();

const saleController = require("../controllers/saleController");

router.get("/addToCart/:id", saleController.addToCart);

module.exports = router;
