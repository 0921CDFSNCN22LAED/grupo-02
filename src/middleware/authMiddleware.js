function authMiddleware(req, res, next) {
    // if (!res.locals.childIsLogged && !res.locals.parentIsLogged) {
    //     return res.redirect("/");
    // }

    next();
}

module.exports = authMiddleware;
