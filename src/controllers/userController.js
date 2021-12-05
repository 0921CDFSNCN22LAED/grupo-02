const { localsName } = require("ejs");
const fs = require("fs");
const path = require("path");

const Products = require("../models/Products");
const Users = require("../models/Users");

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
    registerProcess: (req, res) => {
        let newUser = Users.createUser([req.body, req.files]);
        let id = newUser.id;
        res.redirect(`/${id}/profile`);
    },
    cart: (req, res) => {
        return res.render("cart", {
            enCarrito: Products.findAll().filter((product) =>
                cartIds.includes(Number(product.id))
            ),
            recommendations: Products.findAll(),
        });
    },
    profile: (req, res) => {
        let old = Users.findOneById(req.params.id);
        return res.render("profile", {
            old,
        });
    },
    update: (req, res) => {
        let old;
        let id = req.params.id;
        if (id) {
            old = Users.findOneById(id);
        }
        Users.destroy(id);
        Users.createUser([req.body, req.files], id, old);
        res.redirect(`/${id}/profile`);
    },
    success: (req, res) => {
        return res.render("success");
    },
};

module.exports = controller;
