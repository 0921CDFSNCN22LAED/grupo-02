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
        let currUser = Users.findOneById(req.session.currUser);
        return res.render("home", {
            currUser,
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
    loginProcess: (req, res) => {
        const userToLogIn = Users.findByField("userEmail", req.body.userEmail);
        req.session.currUser = userToLogIn.id;
        res.redirect("/");
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
        Users.createUser([req.body, req.file], id, old);
        res.redirect(`/${req.params.id}/profile`);
    },
    updateChildren: (req, res) => {
        let old;
        let id = req.params.id;
        if (id) {
            old = Users.findOneById(id);
        }
        let childData = Users.createSubUser([req.body, req.file]);
        Users.destroy(id);
        Users.createUser("", id, old, childData);
        res.redirect(`/${req.params.id}/profile`);
    },
    success: (req, res) => {
        return res.render("success");
    },
};

module.exports = controller;
