module.exports = (req, res, next) => {
    console.log(req.session);
    res.locals.parentLogged = req.session.parentLogged;
    res.locals.childLogged = req.session.childLogged;
    res.locals.product = req.session.product;

    res.locals.parentIsLoggedSecure = req.session.parentIsLoggedSecure;

    res.locals.old = req.session.old;

    res.locals.errors = req.session.errors;
    req.session.errors = null;
    next();
};
