const Products = require("../models/Products");

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
        let clasesActualesId = [];
        let ultimaClaseId;
        if (req.session.childLogged) {
            clasesActualesId = req.session.childLogged.currentClasses;
            ultimaClaseId = req.session.childLogged.lastClass;
        }
        return res.render("home", {
            old: req.session.old,
            clasesActuales: clasesActualesId
                ? Products.findAll().filter((product) =>
                      clasesActualesId.includes(Number(product.id))
                  )
                : "",
            ultimaClase: Products.findAll().find(
                (product) => product.id == ultimaClaseId
            ),
            recommendations: [
                Products.findAll()[
                    Math.floor(Math.random() * Products.findAll().length)
                ],
            ],
            clases: Products.findAll(),
            comentarios: comentarios,
        });
    },
    success: (req, res) => {
        return res.render("success");
    },
};

module.exports = controller;
