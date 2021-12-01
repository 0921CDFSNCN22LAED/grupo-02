const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/", userController.home);
router.get("/register", userController.register);
router.get("/cart", userController.cart);
router.get("/success", userController.success);

module.exports = router;
