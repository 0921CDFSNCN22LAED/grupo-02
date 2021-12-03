module.exports = (ap) => {
    return (req, res, next) => {
        if (req.path == "/") {
            ap.locals.background = Math.floor(Math.random() * 4) + 1;
        }
        next();
    };
};
