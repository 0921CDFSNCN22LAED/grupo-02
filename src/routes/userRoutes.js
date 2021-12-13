const express = require("express");
const router = express.Router();
const upload = require("../middleware/multerMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const userValidations = require("../middleware/validations/userValidations");
const validation = require("../middleware/validation");

const userController = require("../controllers/userController");

router.get("/userSelected/:id", userController.userSelected);

//Register login and logout from main page
router.post(
    "/register",
    userValidations,
    validation,
    userController.registerProcess
);
router.post("/secure", userController.parentLoginProcess);
router.post("/login", userController.loginProcess);
router.get("/logout", userController.logout);
router.get("/changeUser", userController.logoutSubUser);

//VER AUTH MIDDLEWARE EN ESTA RUTA
router.get("/profile", authMiddleware, userController.profile);

router.put("/:id/update", upload.single("avatar"), userController.update);
router.put(
    "/:id/updateChildren",
    upload.single("avatar"),
    userController.updateChildren
);

router.get("/cart", authMiddleware, userController.cart);
router.post("/addToCart/:productId", userController.addToCart);
router.delete("/removeFromCart/:productId", userController.removeFromCart);

module.exports = router;
