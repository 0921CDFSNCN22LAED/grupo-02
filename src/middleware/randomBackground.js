//Este middleware es una función que crea app.locals.background cada vez que el usuario pasa por el home.
// app.locals.background es un número aleatorio que va al head.ejs donde hay un switch que elije que tema de css utilizar

module.exports = (ap) => {
    return (req, res, next) => {
        if (req.path == "/") {
            ap.locals.background = Math.floor(Math.random() * 4) + 1;
        }
        next();
    };
};
