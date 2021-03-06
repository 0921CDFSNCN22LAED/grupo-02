const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    req.session.old = { ...req.session.old, ...req.body, ...req.files };
    if (!errors.isEmpty()) {
        req.session.errors = errors.mapped();
        res.redirect('back');
    } else {
        next();
    }
};
