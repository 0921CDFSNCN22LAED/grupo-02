const fs = require("fs");
const path = require("path");

const Products = require("../models/Products");

const cartIds = [1, 2];
const clasesActualesId = [1];
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
        return res.render("home", {
            clasesActuales: Products.findAll().filter((product) =>
                clasesActualesId.includes(Number(product.id))
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
    register: (req, res) => {
        return res.render("register");
    },
    cart: (req, res) => {
        return res.render("cart", {
            enCarrito: Products.findAll().filter((product) =>
                cartIds.includes(Number(product.id))
            ),
            recommendations: Products.findAll(),
        });
    },
    success: (req, res) => {
        return res.render("success");
    },
};

module.exports = controller;
