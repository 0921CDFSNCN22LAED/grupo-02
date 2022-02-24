const bcrypt = require('bcryptjs');

const Products = require('../services/Products');
const Users = require('../services/Users');

const { User, Grade } = require('../database/models');

const controller = {
    register: async (req, res) => {
        await Users.create(req);
        return res.redirect(`/user/profile`);
    },
    login: async (req, res) => {
        const user = await Users.findByEmail(req.body.email);
        if (user) {
            if (bcrypt.compareSync(req.body.pass, user.pass)) {
                // delete logParent.pass;
                req.session.user = user;
                const profiles = await Users.findCurrentProfiles(req);
                req.session.profiles = profiles;
                if (req.body.rememberMe) {
                    res.cookie('email', req.body.email, {
                        maxAge: 1000 * 60 * 60,
                    });
                }
                return res.redirect(`/user/profile`);
            }
        }
        req.session.errors = {
            invalidLogIn: {
                msg: 'Las credenciales son incorrectas',
            },
        };
        res.redirect('/');
    },
    profile: async (req, res) => {
        const grades = await Grade.findAll({ raw: true, nest: true });
        const profiles = await Users.findCurrentProfiles(req);
        const parent = profiles.filter((profile) => profile.isParent == 1);
        const children = profiles.filter((profile) => profile.isParent == 0);

        res.render('profile', {
            grades,
            parent: parent[0],
            children,
        });
    },
    selProfile: async (req, res) => {
        req.session.profile = await Users.selectProfile(req.params.id);
        res.redirect('/');
    },
    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        res.redirect('/');
    },
    logoutProfile: (req, res) => {
        req.session.parentIsLoggedSecure = false;
        delete req.session.profile;
        res.redirect('/');
    },
    registerProfile: async (req, res) => {
        await Users.createProfile(req.session.user.id, req);
        res.redirect('/user/profile');
    },
    updateProfile: async (req, res) => {
        await Users.update(req);
        res.redirect(`/user/profile`);
    },
    deleteProfile: async (req, res) => {
        await Users.deleteProfile(req);
        res.redirect(`/user/profile`);
    },

    parentLoginProcess: (req, res) => {
        if (req.body.pass) {
            db.Parent.findByPk(req.session.user.id)
                .then((parent) => {
                    if (bcrypt.compareSync(req.body.pass, parent.pass)) {
                        req.session.parentIsLoggedSecure = true;
                        return res.redirect('back');
                    }
                    req.session.parentIsLoggedSecure = false;
                    req.session.errors = {
                        invalidLogIn: {
                            msg: 'Las credenciales son incorrectas',
                        },
                    };
                    res.redirect('/');
                })
                .catch((e) => res.render('error-page', { error: e }));
        }
    },

    comment: async (req, res) => {
        await Users.createPageComment(req.params.id, req.body.comment);
        res.redirect('/');
    },
};

module.exports = controller;
