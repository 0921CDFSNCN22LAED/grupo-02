const express = require('express');
const router = express.Router();
const saleValidations = require('../middleware/validations/saleValidations');
const validation = require('../middleware/validation');

const saleController = require('../controllers/saleController');

router.post('/addToCart', saleController.addToCart);
router.get('/cart', saleController.viewCart);
router.delete('/removeFromCart/:id', saleController.removeFromCart);
router.post('/payment', saleValidations, validation, saleController.payment);
router.get('/payment', saleController.paymentPage);

router.post('/endPurchase', saleController.endPurchase);

module.exports = router;
