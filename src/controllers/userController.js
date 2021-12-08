const Products = require("../models/Products");
const Users = require("../models/Users");

const controller = {
    register: (req, res) => {
        return res.render("register");
    },
    registerProcess: (req, res) => {
        let newUser = Users.createUser([req.body, req.files]);
        req.session.parentLogged = newUser;
        let id = newUser.id;
        res.redirect(`/user/${id}/profile`);
    },
    parentLoginProcess: (req, res) => {
        if (req.body.parentPassword == req.session.parentLogged.userPassword) {
            req.session.parentIsLoggedSecure = true;
        } else {
            req.session.parentIsLoggedSecure = false;
        }
        return res.redirect("/");
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
        req.session.parentIsLoggedSecure = false;
        delete req.session.childLogged;
        res.redirect("/");
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
        req.session.parentLogged = Users.createUser(
            [req.body, req.file],
            id,
            old
        );
        res.redirect(`/user/${req.params.id}/profile`);
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
        res.redirect(`/user/${req.params.id}/profile`);
    },
    success: (req, res) => {
        return res.render("success");
    },
    cart: (req, res) => {
        let cartIds = req.session.parentLogged.cart;
        let enCarrito = Products.findAll().filter((product) =>
            cartIds.includes(Number(product.id))
        );
        return res.render("cart", {
            enCarrito: Products.findAll().filter((product) =>
                cartIds.includes(Number(product.id))
            ),
            recommendations: Products.findAll(),
        });
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
