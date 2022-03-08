const { body } = require('express-validator');
const Users = require('../../services/Users');

module.exports = [
    body('emailLog')
        .notEmpty()
        .withMessage('Tenés que ingresar un correo electrónico')
        .isEmail()
        .withMessage('Tenés que ingresar un correo electrónico valido'),
    body('passLog')
        .notEmpty()
        .withMessage('Tenés que ingresar una contraseña')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener por lo menos 8 caracteres')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i')
        .withMessage(
            'La contraseña debe tener letras mayúsculas, minúsculas, un número y un carácter especial'
        ),
];
