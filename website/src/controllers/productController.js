const db = require('../database/models');
const Products = require('../services/Products');
const Sales = require('../services/Sales');

const controller = {
    list: (req, res) => {
        Products.findAll().then((classes) => {
            res.render('products-page', {
                classes,
            });
        });
    },
    detail: async (req, res) => {
        const idsInCart = await Sales.idsInCart(req);

        Products.findOne(req.params.id).then((classSel) => {
            req.session.class = classSel;
            let inCart = false;
            if (idsInCart && idsInCart.includes(classSel.id)) {
                inCart = true;
            }
            if (!classSel) res.render('not-found');
            res.render('product-detail', {
                classSel,
                id: req.params.id,
                inCart,
            });
        });
    },
    productForm: (req, res) => {
        let grades = db.Grade.findAll({ raw: true });
        let subjects = db.Subject.findAll({ raw: true });
        Promise.all([grades, subjects]).then(([grades, subjects]) => {
            res.render('product-creation', {
                grades,
                subjects,
            });
        });
    },
    publish: (req, res) => {
        Products.create(req)
            .then(() => {
                req.session.old = null;
                return res.redirect('/success');
            })
            .catch((e) => res.render('error-page', { error: e }));
    },
    productFormBulk: (req, res) => {
        let grades = db.Grade.findAll({ raw: true });
        let subjects = db.Subject.findAll({ raw: true });
        Promise.all([grades, subjects]).then(([grades, subjects]) => {
            res.render('product-creation-bulk', {
                grades,
                subjects,
            });
        });
    },
    publishBulk: async (req, res) => {
        console.log('req.body', req.body);
        await Products.bulkCreate(req);
    },
    productFormEdit: async (req, res) => {
        let grades = await db.Grade.findAll({ raw: true });
        let subjects = await db.Subject.findAll({ raw: true });
        let classSel = await Products.findOne(req.params.id);
        res.render('product-creation', {
            old: classSel,
            grades,
            subjects,
        });
    },
    productFormUpdate: (req, res) => {
        req.session.old = req.session.class;
        Products.edit(req)
            .then(() => {
                req.session.old = null;
                return res.redirect('/success');
            })
            .catch((e) => res.render('error-page', { error: e }));
    },
    delete: (req, res) => {
        let old = req.session.old;
        Products.delete(old).then(() => {
            req.session.old = null;
            res.redirect('/');
        });
    },
    duplicate: (req, res) => {
        Products.create(req)
            .then(() => {
                req.session.old = null;
                return res.redirect('/success');
            })
            .catch((e) => res.render('error-page', { error: e }));
    },
    search: async (req, res) => {
        const searchItem = req.query.search;
        console.log('searchItem', searchItem);
        const classes = await Products.searchProduct(searchItem);
        res.render('products-page', {
            classes,
        });
    },
};

module.exports = controller;
