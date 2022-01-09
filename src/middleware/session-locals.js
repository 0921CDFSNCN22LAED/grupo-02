// Todo la data pasa por este controlador

const util = require('util');

module.exports = (req, res, next) => {
    console.log(util.inspect(req.session, false, null, true));
    res.locals.parentLogged = req.session.parentLogged;
    res.locals.childLogged = req.session.childLogged;
    res.locals.childClasses = req.session.childClasses;
    res.locals.class = req.session.class;

    res.locals.parentIsLoggedSecure = req.session.parentIsLoggedSecure;

    res.locals.old = req.session.old;
    req.session.old = null;

    res.locals.errors = req.session.errors;
    req.session.errors = null;
    next();
};
