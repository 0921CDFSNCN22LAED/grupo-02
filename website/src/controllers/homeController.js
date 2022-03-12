const Products = require('../services/Products');
const Users = require('../services/Users');

const controller = {
    home: async (req, res) => {
        const collection = req.session.profile?.progress
            ? req.session.profile.progress
            : [];
        const classes = await Products.findAll();
        let recommendations = await Products.recommender(
            collection[0]?.classId
        );
        const comentarios = await Users.allPageComments();
        if (recommendations.length < 1)
            recommendations = await Products.findRandom(4);
        if (recommendations.length > 4)
            recommendations = recommendations
                .map((a) => ({ sort: Math.random(), value: a }))
                .slice(0, 4)
                .sort((a, b) => a.sort - b.sort)
                .map((a) => a.value);
        const lastClassTaken = await Users.lastClassTaken(
            req?.session.profile?.id
        );
        let progress;
        if (req.session.profiles) {
            const profiles = await Users.findCurrentProfiles(req);
            const profilesId = profiles.map((profile) => profile.id);
            progress = await Users.findProgress(profilesId);
        }
        res.render('home', {
            classes,
            recommendations,
            comentarios,
            collection,
            lastClassTaken: lastClassTaken?.classes,
            progress,
        });
    },
    success: (req, res) => {
        return res.render('success');
    },
};

module.exports = controller;
