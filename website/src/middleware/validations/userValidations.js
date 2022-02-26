const { body } = require('express-validator');
const Users = require('../../services/Users');

module.exports = [
    body('name')
        .notEmpty()
        .withMessage('Tenés que ingresar un nombre de usuario')
        .isLength({ min: 2 })
        .withMessage(
            'El nombre de usuario debe tener por lo menos 2 caracteres'
        ),
    body('email')
        .notEmpty()
        .withMessage('Tenés que ingresar un correo electrónico')
        .isEmail()
        .withMessage('Tenés que ingresar un correo electrónico valido')
        .custom(async (value) => {
            const user = await Users.findByEmail(value);
            if (user) {
                throw new Error(
                    'Ya hay un usuario registrado con este correo electrónico'
                );
            }
        }),
    body('pass')
        .notEmpty()
        .withMessage('Tenés que ingresar una contraseña')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener por lo menos 8 caracteres')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i')
        .withMessage(
            'La contraseña debe tener letras mayúsculas, minúsculas, un número y un carácter especial'
        ),
];
