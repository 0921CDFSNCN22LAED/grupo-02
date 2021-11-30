const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multerMiddleware");

const productController = require("../controllers/productController");

//Read
router.get("/", productController.list);

//Create
router.get("/create", productController.productForm);
router.post("/", upload.single("video"), productController.productFormProcess);

//Read Detail
router.get("/:id", productController.detail);

//Update
// router.get("/:id/edit");
// router.put("/:id");

//Delete
// router.delete("/:id");

module.exports = router;
