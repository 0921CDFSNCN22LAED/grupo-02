const express = require("express");
const router = express.Router();
const upload = require("../middleware/multerMiddleware");

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

//Delete
router.delete("/:id/delete", productController.delete);

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

//duplicate
router.post(
    "/:id/duplicate",
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
    productController.productFormDuplicate
);

//Read Detail
router.get("/:id", productController.detail);

module.exports = router;