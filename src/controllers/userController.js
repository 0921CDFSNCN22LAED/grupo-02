const bcrypt = require("bcryptjs");

const Products = require("../services/Products");
const Users = require("../services/Users");

const db = require("../../database/models");

const controller = {
    profile: (req, res) => {
        db.Grade.findAll().then((grades) => {
            res.render("profile", { grades });
        });
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
    registerParent: (req, res) => {
        db.User.create()
            .then((user) => {
                return user.dataValues.id;
            })
            .then((userId) => {
                return db.Parent.create({
                    ...req.body,
                    pass: bcrypt.hashSync(req.body.pass, 10),
                    avatar: "default-avatar.png",
                    user_id: userId,
                });
            })
            .then((parent) => {
                req.session.parentLogged = parent.dataValues;
                req.session.parentLogged.children = [];
                return res.redirect(`/user/profile`);
            })
            .catch((e) => console.error(e));
    },
    registerChild: (req, res) => {
        db.User.create()
            .then((user) => {
                return user.dataValues.id;
            })
            .then((userId) => {
                db.Child.create({
                    ...req.body,
                    avatar: req.file
                        ? req.file.originalname
                        : "default-avatar.png",
                    user_id: userId,
                    parent_id: req.session.parentLogged.id,
                })
                    .then((child) => {
                        return db.Parent.findByPk(child.parent_id, {
                            include: [{ association: "children" }],
                        });
                    })
                    .then((parent) => {
                        req.session.parentLogged = parent.dataValues;
                        return res.redirect(`/user/profile`);
                    });
            })
            .catch((e) => console.error(e));
    },
    parentLoginProcess: (req, res) => {
        if (req.body.pass) {
            db.Parent.findByPk(req.session.parentLogged.id)
                .then((parent) => {
                    if (bcrypt.compareSync(req.body.pass, parent.pass)) {
                        req.session.parentIsLoggedSecure = true;
                        return res.redirect("/");
                    }
                    req.session.parentIsLoggedSecure = false;
                    req.session.errors = {
                        invalidLogIn: {
                            msg: "Las credenciales son incorrectas",
                        },
                    };
                    res.redirect("/");
                })
                .catch((e) => {
                    console.error(e);
                });
        }
    },
    login: (req, res) => {
        db.Parent.findOne({
            where: {
                email: req.body.email,
            },
            include: [{ association: "children" }],
        })
            .then((logParent) => {
                if (logParent) {
                    if (bcrypt.compareSync(req.body.pass, logParent.pass)) {
                        // delete logParent.pass;
                        req.session.parentLogged = logParent.dataValues;
                        if (req.body.rememberMe) {
                            res.cookie("email", req.body.email, {
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
            })
            .catch((e) => {
                console.error(e);
                res.render("error-page", { error: e });
            });
    },
    logout: (req, res) => {
        res.clearCookie("userEmail");
        req.session.destroy();
        res.redirect("/");
    },
    userSelected: (req, res) => {
        db.Parent.findByPk(req.params.id).then((parent) => {
            req.session.parentLogged = parent;
        });

        //Incluir Children

        // if (req.params.id % 1 == 0) {
        //     req.session.parentLogged = Users.findOneById(req.params.id);
        // } else {
        //     req.session.childLogged = Users.findOneById(req.params.id);
        //     req.session.parentIsLoggedSecure = false;
        // }
        res.redirect("/");
    },
    logoutSubUser: (req, res) => {
        req.session.parentIsLoggedSecure = false;
        delete req.session.childLogged;
        res.redirect("/");
    },

    updateParent: (req, res) => {
        db.Parent.update(
            {
                ...req.body,
                // Si el spread da false por Short circuit todo da false y no se ve la propiedad
                ...(req.file && {
                    avatar: req.file.originalname,
                }),
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        )
            .then(() => {
                return db.Parent.findByPk(req.params.id, {
                    include: [{ association: "children" }],
                });
            })
            .then((parent) => {
                req.session.parentLogged = parent.dataValues;
                res.redirect(`/user/profile`);
            })
            .catch((e) => console.error(e));
    },
    updateChildren: (req, res) => {
        db.Child.update(
            {
                ...req.body,
                // Si el spread da false por Short circuit todo da false y no se ve la propiedad
                ...(req.file && {
                    avatar: req.file.originalname,
                }),
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        )
            .then(() => {
                return db.Child.findByPk(req.params.id);
            })
            .then((child) => {
                return db.Parent.findByPk(child.parent_id, {
                    include: [{ association: "children" }],
                });
            })
            .then((parent) => {
                req.session.parentLogged = parent.dataValues;
                res.redirect(`/user/profile`);
            })
            .catch((e) => console.error(e));
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
