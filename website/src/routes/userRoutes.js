const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const userValidations = require('../middleware/validations/userValidations');
const userValidationsImage = require('../middleware/validations/userValidationsImage');
const validation = require('../middleware/validation');

const userController = require('../controllers/userController');

router.get('/userSelected/:id', userController.selectChild);

//Register login and logout from main page
router.post('/register', userValidations, validation, userController.register);
router.post('/login', userController.login);
router.post(
    '/registerChild',
    upload.single('avatar'),
    userController.registerChild
);

router.post('/secure', userController.parentLoginProcess);
router.get('/logout', userController.logout);
router.get('/changeUser', userController.logoutSubUser);

//VER AUTH MIDDLEWARE EN ESTA RUTA
router.get(
    '/profile',
    // authMiddleware,
    userController.profile
);

router.put(
    '/:id/updateParent',
    upload.single('avatar'),
    userValidationsImage,
    validation,
    userController.updateParent
);
router.put(
    '/:id/updateChildren',
    upload.single('avatar'),
    userValidationsImage,
    validation,
    userController.updateChildren
);

// Comment

router.post('/:id/comment', userController.comment);
module.exports = router;
