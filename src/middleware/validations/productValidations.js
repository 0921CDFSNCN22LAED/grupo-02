const path = require('path');
const { check } = require('express-validator');

module.exports = [
    check('title')
        .notEmpty()
        .withMessage('Tenés que ingresar el nombre o tema de la clase')
        .isLength({ min: 5 })
        .withMessage(
            'El título de la clase debe tener por lo menos 5 caracteres'
        ),
    check('grade').notEmpty().withMessage('Tenés que elegir un grado'),
    check('subject').notEmpty().withMessage('Tenés que elegir una materia'),
    check('contents').notEmpty().withMessage('Ingresá al menos un contenido'),
    check('description_short')
        .notEmpty()
        .withMessage('Describí brevemente de qué se trata la clase')
        .isLength({ min: 20 })
        .withMessage(
            'La descripción corta deberá tener por lo menos 20 caracteres'
        ),
    check('price')
        .notEmpty()
        .withMessage('Ingresá el precio de la clase')
        .bail()
        .isNumeric()
        .withMessage('El precio debe ser un número'),
    check('preview').custom((value, { req }) => {
        if (req.body.previewLocation) {
            return true;
        }

        let preview = req.files.preview;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];
        if (!preview) {
            throw new Error('Subí una imagen');
        } else {
            let fileExtension = path.extname(preview[0].originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(
                    `Las extensiones de archivo permitidas son ${acceptedExtensions.join(
                        ', '
                    )}`
                );
            } else {
                return true;
            }
        }
    }),
    check('teacherFirstName').notEmpty().withMessage('Ingresá tu nombre'),
    check('teacherLastName').notEmpty().withMessage('Ingresá tu apellido'),
    check('teacherEmail')
        .notEmpty()
        .withMessage('Ingresá tu email')
        .isEmail()
        .withMessage('Debes utilizar un correo electrónico valido'),
];
