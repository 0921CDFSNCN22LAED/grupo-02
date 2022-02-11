function authMiddleware(req, res, next) {
    if (!res.locals.parentLogged) {
        return res.redirect("/");
    }

    next();
}

module.exports = authMiddleware;
