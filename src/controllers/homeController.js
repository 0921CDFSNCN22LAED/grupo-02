const db = require("../database/models");
const Products = require("../services/Products");

const comentarios = [
    {
        nombre: "Juan Rodriguez",
        resena: "Muy linda la página, me gusta que cambien los fondos al pasar por el home",
    },
    {
        nombre: "José Perez",
        resena: "Va muy bien, a seguir trabajando!!!",
    },
];

const controller = {
    home: (req, res) => {
        let clasesActuales = [];
        let ultimaClaseId;
        if (req.session.childLogged) {
            clasesActuales = req.session.childClasses;
            // ultimaClaseId = req.session.childLogged.users.sales.classes;
        }

        Products.findAll().then((classes) => {
            res.render("home", {
                old: req.session.old,
                classes,
                recommendations: classes,
                comentarios,
                clasesActuales,
            });
        });
    },
    success: (req, res) => {
        return res.render("success");
    },
};

module.exports = controller;
