// Todo la data pasa por este controlador

const util = require('util');

module.exports = (req, res, next) => {
    console.log(util.inspect(req.session, false, null, true));
    res.locals.user = req.session.user;
    res.locals.profiles = req.session.profiles;
    res.locals.childClasses = req.session.childClasses;
    res.locals.class = req.session.class;

    res.locals.parentIsLoggedSecure = req.session.parentIsLoggedSecure;

    res.locals.old = req.session.old;
    req.session.old = null;

    res.locals.errors = req.session.errors;
    req.session.errors = null;
    next();
};
