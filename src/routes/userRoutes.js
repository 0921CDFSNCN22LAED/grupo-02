const express = require("express");
const router = express.Router();
const upload = require("../middleware/multerMiddleware");

const userController = require("../controllers/userController");

router.get("/", userController.home);

//Register from main page
router.post("/register", userController.registerProcess);

router.get("/:id/profile", userController.profile);
router.get("/cart", userController.cart);
router.get("/success", userController.success);

module.exports = router;
