const { body } = require('express-validator');
const path = require('path');

module.exports = [
    body('avatar').custom((value, { req }) => {
        let avatar = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];
        if (!avatar) {
            return true;
        } else {
            let fileExtension = path.extname(avatar.originalname);
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
];
