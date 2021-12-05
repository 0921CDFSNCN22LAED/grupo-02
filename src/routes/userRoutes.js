const express = require("express");
const router = express.Router();
const upload = require("../middleware/multerMiddleware");

const userController = require("../controllers/userController");

router.get("/", userController.home);

//Register from main page
router.post("/register", userController.registerProcess);

router.get("/:id/profile", userController.profile);

router.put(
    "/:id/update",
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        },
        {
            name: "childAvatar1",
            maxCount: 1,
        },
        {
            name: "childAvatar2",
            maxCount: 1,
        },
        {
            name: "childAvatar3",
            maxCount: 1,
        },
        {
            name: "childAvatar4",
            maxCount: 1,
        },
        {
            name: "childAvatar5",
            maxCount: 1,
        },
    ]),
    userController.update
);

router.get("/cart", userController.cart);
router.get("/success", userController.success);

module.exports = router;
