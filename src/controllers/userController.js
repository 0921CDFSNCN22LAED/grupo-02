const bcrypt = require("bcryptjs");

const Products = require("../services/Products");
const Users = require("../services/Users");

const db = require("../database/models");

const controller = {
    profile: (req, res) => {
        db.Grade.findAll().then((grades) => {
            res.render("profile", { grades });
        });
    },

    registerParent: (req, res) => {
        Users.create(req)
            .then((parent) => {
                req.session.parentLogged = parent.dataValues;
                req.session.parentLogged.children = [];
                return res.redirect(`/user/profile`);
            })
            .catch((e) => res.render("error-page", { error: e }));
    },
    registerChild: (req, res) => {
        // PREGUNTA: ¿Cómo refactorizo esto? el problema es el nesting de promesas.
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
            .catch((e) => res.render("error-page", { error: e }));
    },
    parentLoginProcess: (req, res) => {
        if (req.body.pass) {
            db.Parent.findByPk(req.session.parentLogged.id)
                .then((parent) => {
                    if (bcrypt.compareSync(req.body.pass, parent.pass)) {
                        req.session.parentIsLoggedSecure = true;
                        return res.redirect("/user/profile");
                    }
                    req.session.parentIsLoggedSecure = false;
                    req.session.errors = {
                        invalidLogIn: {
                            msg: "Las credenciales son incorrectas",
                        },
                    };
                    res.redirect("/");
                })
                .catch((e) => res.render("error-page", { error: e }));
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
                res.render("error-page", { error: e });
            });
    },
    logout: (req, res) => {
        res.clearCookie("userEmail");
        req.session.destroy();
        res.redirect("/");
    },
    selectChild: (req, res) => {
        // console.log(`req.params.id`, req.params.id);
        db.Child.findByPk(req.params.id, { raw: true }).then((child) => {
            req.session.childLogged = child;
            res.redirect("/");
        });
    },
    logoutSubUser: (req, res) => {
        req.session.parentIsLoggedSecure = false;
        delete req.session.childLogged;
        res.redirect("/");
    },

    updateParent: (req, res) => {
        Users.updateParent(req)
            .then((parent) => {
                req.session.parentLogged = parent.dataValues;
                res.redirect(`/user/profile`);
            })
            .catch((e) => res.render("error-page", { error: e }));
    },
    updateChildren: (req, res) => {
        Users.updateChild(req)
            .then((parent) => {
                req.session.parentLogged = parent.dataValues;
                res.redirect(`/user/profile`);
            })
            .catch((e) => res.render("error-page", { error: e }));
    },
};

module.exports = controller;
