const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const userValidations = require('../middleware/validations/userValidations');
const userValidationsLogin = require('../middleware/validations/userValidationsLogin');
const userValidationsImage = require('../middleware/validations/userValidationsImage');
const validation = require('../middleware/validation');

const userController = require('../controllers/userController');

//Register login and logout from main page
router.post('/register', userValidations, validation, userController.register);
router.post('/login', userValidationsLogin, validation, userController.login);
router.get('/selProfile/:id', userController.selProfile);
router.get('/logout', userController.logout);
router.get('/changeProfile', userController.logoutProfile);
router.put(
    '/:id/update',
    upload.single('avatar'),
    userValidationsImage,
    validation,
    userController.updateProfile
);

router.post(
    '/registerProfile',
    upload.single('avatar'),
    userController.registerProfile
);

router.post('/secure', userController.userLoginProcess);

router.get('/profile', authMiddleware, userController.profile);
router.get('/class/:id', authMiddleware, userController.class);
router.post('/saveProgress/:classId', userController.saveProgress);

router.delete('/:id/delete', userController.deleteProfile);

// Comment

router.post('/:id/comment', userController.comment);
module.exports = router;
