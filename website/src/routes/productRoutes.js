const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerMiddleware');
const productValidations = require('../middleware/validations/productValidations');
const validation = require('../middleware/validation');

const productController = require('../controllers/productController');

const uploadFields = [
    {
        name: 'video',
        maxCount: 1,
    },
    {
        name: 'bonus',
        maxCount: 1,
    },
    {
        name: 'preview',
        maxCount: 1,
    },
];
//Read
router.get('/', productController.list);

//Create
router.get('/create', productController.productForm);
router.post(
    '/',
    upload.fields(uploadFields),
    productValidations,
    validation,
    productController.publish
);

router.get('/search', productController.search);

//duplicate
router.post(
    '/duplicate',
    upload.fields(uploadFields),
    productValidations,
    validation,
    productController.duplicate
);

//Delete
router.delete('/:id/delete', productController.delete);

//Update
router.get('/:id/edit', productController.productFormEdit);
router.put(
    '/:id/edit',
    upload.fields(uploadFields),
    // productValidations,
    // validation
    productController.productFormUpdate
);

//Read Detail
router.get('/:id', productController.detail);

module.exports = router;
