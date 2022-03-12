const Products = require('../services/Products');
const Sales = require('../services/Sales');
const Users = require('../services/Users');

const controller = {
    home: async (req, res) => {
        const classes = await Products.findAll();
        let recommendations = [];
        let comments = await Users.allPageComments();
        let collection = [];
        let lastClassTaken;
        let progress;
        let cart = [];
        if (req.session.profiles && req.session.profile?.isParent) {
            cart = await Sales.findAllInCart(req);
            req.session.cart = cart;
            if (req.session.profiles) {
                const profiles = await Users.findCurrentProfiles(req);
                const profilesId = profiles.map((profile) => profile.id);
                progress = await Users.findProgress(profilesId);
            }
        } else if (
            req.session.profiles &&
            req.session.profile &&
            !req.session.profile.isParent
        ) {
            recommendations = await Products.recommender(
                collection[0]?.classId
            );
            collection = await Users.currentClasses(req.session.profile.id);
            lastClassTaken = collection[0];
            if (recommendations.length > 4)
                recommendations = recommendations
                    .map((a) => ({ sort: Math.random(), value: a }))
                    .slice(0, 4)
                    .sort((a, b) => a.sort - b.sort)
                    .map((a) => a.value);
        }

        if (recommendations.length < 1)
            recommendations = await Products.findRandom(4);
        res.render('home', {
            classes,
            recommendations,
            comments,
            collection,
            lastClassTaken: lastClassTaken?.classes,
            progress,
            cart,
        });
    },
    success: (req, res) => {
        return res.render('success');
    },
};

module.exports = controller;
