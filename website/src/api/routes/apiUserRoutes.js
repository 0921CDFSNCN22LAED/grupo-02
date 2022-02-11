const express = require('express');
const apiUserController = require('../controller/apiUserController');
const router = express.Router();

router.get('/', apiUserController.allUsers);

module.exports = router