const express = require("express");
const router = express.Router();

const saleController = require("../controllers/saleController");

router.get("/addToCart/:id", saleController.addToCart);
router.get("/cart", saleController.viewCart);
router.delete("/removeFromCart/:id", saleController.removeFromCart);
router.post("/payment", saleController.payment);
router.get("/payment", saleController.paymentPage);

module.exports = router;
