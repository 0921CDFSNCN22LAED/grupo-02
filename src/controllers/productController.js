const db = require("../database/models");
const Products = require("../services/Products");

const controller = {
    list: (req, res) => {
        Products.findAll().then((classes) => {
            res.render("products-page", {
                classes,
            });
        });
    },
    detail: (req, res) => {
        Products.findOne(req.params.id).then((classSel) => {
            req.session.class = classSel;
            if (!classSel) res.render("not-found");
            res.render("product-detail", {
                classSel,
                id: req.params.id,
            });
        });
    },
    productForm: (req, res) => {
        let grades = db.Grade.findAll({ raw: true });
        let subjects = db.Subject.findAll({ raw: true });
        if (req.session.class) {
            req.session.old = req.session.class;
            req.session.class = null;
        }
        Promise.all([grades, subjects]).then(([grades, subjects]) => {
            res.render("product-creation", {
                old: req.session.old,
                grades,
                subjects,
            });
        });
    },
    publish: (req, res) => {
        Products.create(req)
            .then(() => {
                req.session.old = null;
                return res.redirect("/success");
            })
            .catch((e) => res.render("error-page", { error: e }));
    },
    productFormEdit: (req, res) => {
        Products.edit(req)
            .then(() => {
                req.session.old = null;
                return res.redirect("/success");
            })
            .catch((e) => res.render("error-page", { error: e }));
    },
    delete: (req, res) => {
        let old = req.session.old;
        Products.delete(old).then(() => {
            res.redirect("/");
        });
    },
    duplicate: (req, res) => {
        Products.create(req)
            .then(() => {
                req.session.old = null;
                return res.redirect("/success");
            })
            .catch((e) => res.render("error-page", { error: e }));
    },
};

module.exports = controller;
