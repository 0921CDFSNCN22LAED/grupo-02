// Todo la data pasa por este controlador

module.exports = (req, res, next) => {
    // console.log(req.session);
    // if (req.session.parentLogged) {
    //     console.log(req.session.parentLogged.children);
    // }
    // if (req.session.old) {
    //     console.log(req.session.old.preview);
    // }
    res.locals.parentLogged = req.session.parentLogged;
    res.locals.childLogged = req.session.childLogged;
    res.locals.class = req.session.product;

    res.locals.parentIsLoggedSecure = req.session.parentIsLoggedSecure;

    res.locals.old = req.session.old;
    // req.session.old = null;

    res.locals.errors = req.session.errors;
    req.session.errors = null;
    next();
};
