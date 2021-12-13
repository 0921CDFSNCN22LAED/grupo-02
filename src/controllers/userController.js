const bcrypt = require("bcryptjs");

const Products = require("../models/Products");
const Users = require("../models/Users");

const controller = {
    profile: (req, res) => {
        res.render("profile");
    },
    cart: (req, res) => {
        let cartIds = req.session.parentLogged.cart;
        let enCarrito = Products.findAll().filter((product) =>
            cartIds.includes(Number(product.id))
        );
        res.render("cart", {
            enCarrito: Products.findAll().filter((product) =>
                cartIds.includes(Number(product.id))
            ),
            recommendations: Products.findAll(),
        });
    },
    registerProcess: (req, res) => {
        let newUser = Users.createUser([req.body, req.files]);
        req.session.parentLogged = newUser;
        res.redirect(`/user/profile`);
    },
    parentLoginProcess: (req, res) => {
        if (req.body.parentPassword) {
            let { userPassword } = Users.findByField(
                "userEmail",
                req.session.parentLogged.userEmail
            );
            if (bcrypt.compareSync(req.body.parentPassword, userPassword)) {
                req.session.parentIsLoggedSecure = true;
                return res.redirect("/");
            }
        }
        req.session.parentIsLoggedSecure = false;
        req.session.errors = {
            invalidLogIn: {
                msg: "Las credenciales son incorrectas",
            },
        };
        res.redirect("/");
    },
    loginProcess: (req, res) => {
        const userToLogIn = Users.findByField("userEmail", req.body.userEmail);
        if (userToLogIn) {
            if (
                bcrypt.compareSync(
                    req.body.userPassword,
                    userToLogIn.userPassword
                )
            ) {
                // delete userToLogIn.userPassword;
                req.session.parentLogged = userToLogIn;
                if (req.body.rememberMe) {
                    res.cookie("userEmail", req.body.userEmail, {
                        maxAge: 1000 * 60 * 60,
                    });
                }
                return res.redirect("/");
            }
        }
        req.session.errors = {
            invalidLogIn: {
                msg: "Las credenciales son incorrectas",
            },
        };
        res.redirect("/");
    },
    logout: (req, res) => {
        res.clearCookie("userEmail");
        req.session.destroy();
        res.redirect("/");
    },
    userSelected: (req, res) => {
        if (req.params.id % 1 == 0) {
            req.session.parentLogged = Users.findOneById(req.params.id);
        } else {
            req.session.childLogged = Users.findOneById(req.params.id);
            req.session.parentIsLoggedSecure = false;
        }
        res.redirect("/");
    },
    logoutSubUser: (req, res) => {
        req.session.parentIsLoggedSecure = false;
        delete req.session.childLogged;
        res.redirect("/");
    },

    update: (req, res) => {
        let old;
        let id = req.params.id;
        if (id) {
            old = Users.findOneById(id);
        }
        Users.destroy(id);
        req.session.parentLogged = Users.createUser(
            [req.body, req.file],
            id,
            old
        );
        res.redirect(`/user/profile`);
    },
    updateChildren: (req, res) => {
        let old;
        let id = req.params.id;
        if (id) {
            old = Users.findOneById(id);
        }
        let childData = Users.createSubUser([req.body, req.file]);
        Users.destroy(id);
        req.session.parentLogged = Users.createUser("", id, old, childData);
        res.redirect(`/user/profile`);
    },

    addToCart: (req, res) => {
        Users.addToCart(req.params.productId, req.session.parentLogged);
        res.redirect("/user/cart");
    },
    removeFromCart: (req, res) => {
        Users.removeFromCart(req.params.productId, req.session.parentLogged);
        res.redirect("/user/cart");
    },
};

module.exports = controller;
