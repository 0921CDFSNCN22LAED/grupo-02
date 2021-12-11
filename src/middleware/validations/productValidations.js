const path = require("path");
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
    body("preview").custom((value, { req }) => {
        let preview = req.files.preview;
        let acceptedExtensions = ["jpg", "png", "gif"];

        if (!preview) {
            throw new Error("Subí una imagen");
        } else {
            let fileExtension = path.extname(preview[0].originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(
                    `Las extensiones de archivo permitidas son ${acceptedExtensions.join(
                        ", "
                    )}`
                );
            }
        }
    }),
    body("profesorNombre").notEmpty().withMessage("Ingresá tu nombre"),
    body("profesorApellido").notEmpty().withMessage("Ingresá tu apellido"),
    body("profesorEmail")
        .notEmpty()
        .withMessage("Ingresá tu email")
        .isEmail()
        .withMessage("Debes utilizar un correo electrónico valido"),
];
