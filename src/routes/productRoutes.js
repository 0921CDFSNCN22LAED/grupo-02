const express = require("express");
const router = express.Router();
const upload = require("../middleware/multerMiddleware");
const productValidations = require("../middleware/validations/productValidations");
const validation = require("../middleware/validation");

const productController = require("../controllers/productController");

const uploadFields = [
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
];
//Read
router.get("/", productController.list);

//Create
router.get("/create", productController.productForm);
router.post(
    "/",
    productValidations,
    validation,
    upload.fields(uploadFields),
    productController.productFormProcess
);

//Delete
router.delete("/:id/delete", productController.delete);

//Update
router.get("/:id/edit", productController.productForm);
router.put(
    "/:id/edit",
    productValidations,
    validation,
    upload.fields(uploadFields),
    productController.productFormEdit
);

//duplicate
router.post(
    "/:id/duplicate",
    productValidations,
    validation,
    upload.fields(uploadFields),
    productController.productFormDuplicate
);

//Read Detail
router.get("/:id", productController.detail);

module.exports = router;
