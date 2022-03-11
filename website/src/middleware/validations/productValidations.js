const path = require('path');
const { body } = require('express-validator');
const db = require('../../database/models');

module.exports = [
    body('title')
        .notEmpty()
        .withMessage('Tenés que ingresar el nombre o tema de la clase')
        .isLength({ min: 5 })
        .withMessage(
            'El título de la clase debe tener por lo menos 5 caracteres'
        ),
    body('grade')
        .notEmpty()
        .withMessage('Tenés que elegir un grado')
        .custom(async (value) => {
            const grades = await db.Grade.findAll({ raw: true, nest: true });
            let found = Object.values(grades).find(
                (grade) => grade.id == value
            );
            if (!found) {
                throw new Error('Debes elegir un grado existente');
            }
        }),
    body('subject')
        .notEmpty()
        .withMessage('Tenés que elegir una materia')
        .custom(async (value) => {
            const subjects = await db.Subject.findAll({
                raw: true,
                nest: true,
            });
            let found = Object.values(subjects).find(
                (subject) => subject.id == value
            );
            if (!found) {
                throw new Error('Debes elegir una materia existente');
            }
        }),
    body('contents').notEmpty().withMessage('Ingresá al menos un contenido'),
    body('descriptionShort')
        .notEmpty()
        .withMessage('Describí brevemente de qué se trata la clase')
        .isLength({ min: 20 })
        .withMessage(
            'La descripción corta deberá tener por lo menos 20 caracteres'
        ),
    body('price')
        .notEmpty()
        .withMessage('Ingresá el precio de la clase')
        .bail()
        .isNumeric()
        .withMessage('El precio debe ser un número'),
    body('preview').custom((value, { req }) => {
        if (req.body.previewLocation) {
            return true;
        }

        let preview = req.files.preview;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];
        if (!preview) {
            return true;
            // throw new Error('Subí una imagen');
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
    body('teacherFirstName').notEmpty().withMessage('Ingresá tu nombre'),
    body('teacherLastName').notEmpty().withMessage('Ingresá tu apellido'),
    body('teacherEmail')
        .notEmpty()
        .withMessage('Ingresá tu email')
        .isEmail()
        .withMessage('Debes utilizar un correo electrónico valido'),
];
