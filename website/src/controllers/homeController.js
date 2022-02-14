const db = require('../database/models');
const Products = require('../services/Products');
const Users = require('../services/Users');

const controller = {
    home: async (req, res) => {
        let clasesActuales =
            req.session.profile && req.session.profile.progress
                ? req.session.profile.progress
                : [];

        const classes = await Products.findAll();
        const recommendations = await Products.findRandom(4);
        const comentarios = await Users.allPageComments();

        res.render('home', {
            classes,
            recommendations,
            comentarios,
            clasesActuales,
        });
    },
    success: (req, res) => {
        return res.render('success');
    },
};

module.exports = controller;
