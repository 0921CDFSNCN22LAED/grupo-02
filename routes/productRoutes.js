const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multerMiddleware");

const productController = require("../controllers/productController");

//Read
router.get("/", productController.list);

//Create
router.get("/create", productController.productForm);
router.post(
    "/",
    upload.fields([
        {
            name: "video",
            maxCount: 1,
        },
        {
            name: "materialExtra",
            maxCount: 1,
        },
        {
            name: "preview",
            maxCount: 1,
        },
    ]),
    productController.productFormProcess
);

//Read Detail
router.get("/:id", productController.detail);

//Update
router.get("/:id/edit", productController.productForm);
router.put(
    "/:id/edit",
    upload.fields([
        {
            name: "video",
            maxCount: 1,
        },
        {
            name: "materialExtra",
            maxCount: 1,
        },
        {
            name: "preview",
            maxCount: 1,
        },
    ]),
    productController.productFormEdit
);

//Delete
// router.delete("/:id");

module.exports = router;
