const { body } = require("express-validator");

module.exports = [
    body("name")
        .notEmpty()
        .withMessage("Tenés que ingresar un nombre de usuario"),
    body("email")
        .notEmpty()
        .withMessage("Tenés que ingresar un correo electrónico")
        .isEmail()
        .withMessage("Tenés que ingresar un correo electrónico valido"),
    body("pass").notEmpty().withMessage("Tenés que ingresar una contraseña"),
];
