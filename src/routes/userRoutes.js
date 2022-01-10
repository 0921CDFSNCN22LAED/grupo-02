const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const userValidations = require('../middleware/validations/userValidations');
const validation = require('../middleware/validation');

const userController = require('../controllers/userController');

router.get('/userSelected/:id', userController.selectChild);

//Register login and logout from main page
router.post(
    '/register',
    userValidations,
    validation,
    userController.registerParent
);
router.post(
    '/registerChild',
    upload.single('avatar'),
    userController.registerChild
);

router.post('/secure', userController.parentLoginProcess);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/changeUser', userController.logoutSubUser);

//VER AUTH MIDDLEWARE EN ESTA RUTA
router.get('/profile', authMiddleware, userController.profile);

router.put(
    '/:id/updateParent',
    upload.single('avatar'),
    userController.updateParent
);
router.put(
    '/:id/updateChildren',
    upload.single('avatar'),
    userController.updateChildren
);

// Comment

router.post('/:id/comment', userController.comment);
module.exports = router;
