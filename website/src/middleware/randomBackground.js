//Este middleware es una función que crea app.locals.background cada vez que el usuario pasa por el home.
// app.locals.background es un número aleatorio que va al head.ejs donde hay un switch que elije que tema de css utilizar
// 13/12/2021 corregido, va a la respuesta en vez de app, lo mismo, mejor olor
module.exports = () => {
    return (req, res, next) => {
        function pickBackground() {
            const oldBackground = req.session.background;
            const newBackground = Math.floor(Math.random() * 4) + 1;
            if (oldBackground == newBackground) {
                pickBackground();
            } else {
                req.session.background = newBackground;
            }
        }
        if (req.path == '/') {
            pickBackground();
        }
        if (!req.session.background) pickBackground();
        res.locals.background = req.session.background;
        next();
    };
};
