const Users = require("../services/Users");
const db = require("../database/models");

function userLogged(req, res, next) {
    let emailInCookie = req.cookies.userEmail;
    if (emailInCookie) {
        db.Parent.findOne({
            where: { email: emailInCookie },
        })
            .then((userFromCookie) => {
                if (userFromCookie) {
                    req.session.parentLogged = userFromCookie;
                }
            })
            .catch((e) => res.render("error-page", { error: e }));
    }

    // PREGUNTA: Este Next se dispara antes de cumplir la promesa??
    next();
}

module.exports = userLogged;
