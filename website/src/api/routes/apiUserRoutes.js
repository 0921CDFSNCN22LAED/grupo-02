const express = require('express');
const apiUserController = require('../controller/apiUserController');
const router = express.Router();

router.get('/', apiUserController.allUsers);
router.get('/flattened', apiUserController.flattenedList);
router.get('/current', apiUserController.currUser);
router.get('/:id', apiUserController.selProfile);

module.exports = router;
