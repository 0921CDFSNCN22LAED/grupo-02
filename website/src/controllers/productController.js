const db = require('../database/models');
const Products = require('../services/Products');
const Sales = require('../services/Sales');
const Users = require('../services/Users');

const controller = {
    list: async (req, res) => {
        const { products: classes } = await Products.getProductsByPage(0);
        res.render('products-page', {
            classes,
        });
    },
    detail: async (req, res) => {
        let idsInCart = [];
        let idsBought = [];
        let isParent = false;
        if (req.session.profiles) {
            let profilesId = [];
            if (req.session.profile) {
                profilesId = Array.from(Users.selectProfile(req.session.id));
            } else {
                const profiles = await Users.findCurrentProfiles(req);
                profilesId = profiles.map((profile) => profile.id);
            }
            const progress = await Users.findProgress(profilesId);
            idsBought = progress.map((progress) => progress.classId);

            const userId = req.session.user.id;
            let sales = await Sales.findAllInCart(userId);
            if (req.session.profile) {
                sales = sales.filter(
                    (sale) =>
                        sale.classesSales.profiles.isParent ||
                        sale.classesSales.profileId == req.session.profile.id
                );
            }
            idsInCart = sales.map((sale) => sale.classesSales.classId);
        }
        if (req.session.profile) isParent = req.session.profile.isParent;

        const classSel = await Products.findOne(req.params.id);
        let inCart = false;
        let bought = false;
        if (idsInCart.includes(classSel.id)) {
            inCart = true;
        }
        if (idsBought.includes(classSel.id)) {
            bought = true;
        }
        req.session.class = classSel;
        if (!classSel) return res.render('not-found');
        res.render('product-detail', {
            classSel,
            id: req.params.id,
            inCart,
            bought,
            isParent,
        });
    },
    productForm: async (req, res) => {
        let grades = await db.Grade.findAll({ raw: true });
        let subjects = await db.Subject.findAll({ raw: true });
        res.render('product-creation', {
            grades,
            subjects,
        });
    },
    publish: async (req, res) => {
        await Products.create(req);
        req.session.old = null;
        return res.redirect('/success');
    },
    productFormBulk: async (req, res) => {
        let grades = await db.Grade.findAll({ raw: true });
        let subjects = await db.Subject.findAll({ raw: true });
        res.render('product-creation-bulk', {
            grades,
            subjects,
        });
    },
    publishBulk: async (req, res) => {
        await Products.bulkCreate(req);
        res.redirect('/success');
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
    productFormUpdate: async (req, res) => {
        req.session.old = req.session.class;
        await Products.edit(req);
        req.session.old = null;
        return res.redirect('/success');
    },
    delete: async (req, res) => {
        let old = req.session.old || req.session.class;
        await Products.delete(old);
        req.session.old = null;
        res.redirect('/');
    },
    duplicate: async (req, res) => {
        await Products.create(req);
        req.session.old = null;
        return res.redirect('/success');
    },
    search: async (req, res) => {
        const searchItem = req.query.search;
        const classes = await Products.searchProduct(searchItem);
        res.render('products-page', {
            classes,
        });
    },
};

module.exports = controller;
