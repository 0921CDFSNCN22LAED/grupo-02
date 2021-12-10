const { body } = require("express-validator");

module.exports = [
    body("titulo")
        .notEmpty()
        .withMessage("Tenés que ingresar el nombre o tema de la clase"),
    body("grado").notEmpty().withMessage("Tenés que elegir un grado"),
    body("materia").notEmpty().withMessage("Tenés que elegir una materia"),
    body("contenidos").notEmpty().withMessage("Ingresá al menos un contenido"),
    body("descripcion")
        .notEmpty()
        .withMessage("Describí brevemente de qué se trata la clase"),
    body("precio")
        .notEmpty()
        .withMessage("Ingresá el precio de la clase")
        .bail()
        .isNumeric()
        .withMessage("El precio debe ser un número"),
];
