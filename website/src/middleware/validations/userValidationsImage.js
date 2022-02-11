const { body } = require('express-validator');
const path = require('path');

module.exports = [
    body('avatar').custom((value, { req }) => {
        // if (req.body.previewLocation) {
        //     return true;
        // }
        let avatar = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];
        if (!avatar) {
            throw new Error('Subí una imagen');
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
