const Products = require('../services/Products');
const Users = require('../services/Users');

const controller = {
    home: async (req, res) => {
        const collection = req.session.profile?.progress
            ? req.session.profile.progress
            : [];
        const classes = await Products.findAll();
        const recommendations = await Products.recommender(
            collection[0]?.classId
        );
        const comentarios = await Users.allPageComments();
        console.log('collection', collection);
        res.render('home', {
            classes,
            recommendations,
            comentarios,
            collection,
        });
    },
    success: (req, res) => {
        return res.render('success');
    },
};

module.exports = controller;
