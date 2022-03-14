const { body } = require('express-validator');

module.exports = [
    body('hiddenInputs').custom((value, { req }) => {
        if (!value) throw new Error('Elegí para que hijo es la clase');
        const parentId = req.session.profiles
            .filter((profile) => profile.isParent)
            .map((profile) => profile.id);
        value = Array.isArray(value) ? value : Array.from(value);
        value.forEach((val) => {
            if (val == parentId) {
                throw new Error('Asigna cada clase a un hijo o borrala');
            }
        });

        return true;
    }),
];
