// const session = require("express-session");
// const fs = require("fs");
// const path = require("path");

const Products = require("../models/Products");
const Users = require("../models/Users");

const cartIds = [1, 2];

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
    loginProcess: (req, res) => {
        const userToLogIn = Users.findByField("userEmail", req.body.userEmail);
        req.session.parentLogged = userToLogIn;
        if (req.body.rememberMe) {
            res.cookie("userEmail", req.body.userEmail, {
                maxAge: 1000 * 60 * 60,
            });
        }
        res.redirect("/");
    },
    logout: (req, res) => {
        res.clearCookie("userEmail");

        req.session.destroy();
        return res.redirect("/");
    },
    userSelected: (req, res) => {
        if (req.params.id % 1 == 0) {
            req.session.parentLogged = Users.findOneById(req.params.id);
        } else {
            req.session.childLogged = Users.findOneById(req.params.id);
        }
        res.redirect("/");
    },
    logoutSubUser: (req, res) => {
        delete req.session.childLogged;
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