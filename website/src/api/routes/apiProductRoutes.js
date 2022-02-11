const express = require('express');
const apiProductController = require('../controller/apiProductController');
const router = express.Router();

router.get('/', apiProductController.allProducts);
router.get('/:id', apiProductController.selProduct);

module.exports = router;
