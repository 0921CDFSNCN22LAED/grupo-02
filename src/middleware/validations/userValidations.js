const { body } = require("express-validator");

module.exports = [
    body("userName")
        .notEmpty()
        .withMessage("Tenés que ingresar un nombre de usuario"),
    body("userEmail")
        .notEmpty()
        .withMessage("Tenés que ingresar un correo electrónico")
        .isEmail()
        .withMessage("Tenés que ingresar un correo electrónico valido"),
    body("userPassword")
        .notEmpty()
        .withMessage("Tenés que ingresar una contraseña"),
];
