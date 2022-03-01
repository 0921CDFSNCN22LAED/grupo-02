const express = require('express');
const apiTeacherController = require('../controller/apiTeacherController');
const router = express.Router();

router.get('/count', apiTeacherController.count);

module.exports = router;
