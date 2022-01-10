const db = require('../database/models');
const Products = require('../services/Products');
const Users = require('../services/Users');

const controller = {
    home: async (req, res) => {
        let clasesActuales = [];
        let ultimaClaseId;
        if (req.session.childLogged) {
            clasesActuales = req.session.childClasses;
            // ultimaClaseId = req.session.childLogged.users.sales.classes;
        }

        const classes = await Products.findAll();
        const recommendations = classes.slice(0, 4);
        const comentarios = await Users.allPageComments();
        comentarios.forEach((comentario) => {
            comentario.commenter = comentario.users.children.id
                ? comentario.users.children.name
                : comentario.users.parents.name;
        });
        console.log(`comentarios`, comentarios);

        res.render('home', {
            old: req.session.old,
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
