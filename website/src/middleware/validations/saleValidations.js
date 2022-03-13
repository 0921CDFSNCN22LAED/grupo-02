const { body } = require('express-validator');

module.exports = [
    body('hiddenInputs').custom((value, { req }) => {
        const parentId = req.session.profiles
            .filter((profile) => profile.isParent)
            .map((profile) => profile.id);
        if (!value || value == parentId) {
            throw new Error('Elegí para que hijo es la clase');
        }
        return true;
    }),
];
