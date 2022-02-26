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
        console.log('aca');
        const user = await Users.findByEmail(req.body.email);
        if (user) {
            if (bcrypt.compareSync(req.body.pass, user.pass)) {
                console.log('user', user);
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
            res.redirect('/');
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
        res.clearCookie('email');
        req.session.destroy();
        res.redirect('/');
    },
    logoutProfile: (req, res) => {
        req.session.userIsLoggedSecure = false;
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

    userLoginProcess: (req, res) => {
        if (req.body.pass) {
            User.findByPk(req.session.user.id)
                .then((user) => {
                    if (bcrypt.compareSync(req.body.pass, user.pass)) {
                        req.session.userIsLoggedSecure = true;
                        return res.redirect('back');
                    }
                    req.session.userIsLoggedSecure = false;
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
