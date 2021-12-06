const express = require("express");
const router = express.Router();
const upload = require("../middleware/multerMiddleware");

const userController = require("../controllers/userController");

router.get("/", userController.home);

//Register from main page
router.post("/register", userController.registerProcess);
router.post("/login", userController.loginProcess);

router.get("/:id/profile", userController.profile);

router.put("/:id/update", upload.single("avatar"), userController.update);
router.put(
    "/:id/updateChildren",
    upload.single("avatar"),
    userController.updateChildren
);

router.get("/cart", userController.cart);
router.get("/success", userController.success);

module.exports = router;
