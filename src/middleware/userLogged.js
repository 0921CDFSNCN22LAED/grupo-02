const Users = require("../models/Users");

function userLogged(req, res, next) {
    res.locals.childIsLogged = false;
    res.locals.parentIsLogged = false;

    let emailInCookie = req.cookies.userEmail;
    let userFromCookie = Users.findByField("userEmail", emailInCookie);

    if (userFromCookie) {
        req.session.parentLogged = userFromCookie;
    }

    // Si el usuario es padre
    if (req.session.parentLogged) {
        res.locals.childIsLogged = false;
        res.locals.parentIsLogged = true;
        res.locals.parentIsLoggedSecure = req.session.parentIsLoggedSecure;
        res.locals.parentLogged = req.session.parentLogged;
    }

    //Si el usuario es hijo
    if (req.session.childLogged) {
        res.locals.childIsLogged = true;
        res.locals.parentIsLogged = false;
        res.locals.parentIsLoggedSecure = false;
        res.locals.childLogged = req.session.childLogged;
    }

    next();
}

module.exports = userLogged;
