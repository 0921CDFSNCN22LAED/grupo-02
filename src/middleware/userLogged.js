const Users = require("../services/Users");

function userLogged(req, res, next) {
    let emailInCookie = req.cookies.userEmail;
    let userFromCookie = Users.findByField("userEmail", emailInCookie);

    if (userFromCookie) {
        req.session.parentLogged = userFromCookie;
    }

    next();
}

module.exports = userLogged;
