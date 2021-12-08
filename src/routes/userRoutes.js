const express = require("express");
const router = express.Router();
const upload = require("../middleware/multerMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const userController = require("../controllers/userController");

router.get("/userSelected/:id", userController.userSelected);

//Register login and logout from main page
router.post("/register", userController.registerProcess);
router.post("/secure", userController.parentLoginProcess);
router.post("/login", userController.loginProcess);
router.get("/logout", userController.logout);
router.get("/changeUser", userController.logoutSubUser);

router.get("/:id/profile", authMiddleware, userController.profile);

router.put(
    "/:id/update",
    authMiddleware,
    upload.single("avatar"),
    userController.update
);
router.put(
    "/:id/updateChildren",
    authMiddleware,
    upload.single("avatar"),
    userController.updateChildren
);

router.get("/cart", authMiddleware, userController.cart);
router.post("/addToCart/:productId", authMiddleware, userController.addToCart);
router.delete(
    "/removeFromCart/:productId",
    authMiddleware,
    userController.removeFromCart
);

router.get("/success", userController.success);

module.exports = router;
