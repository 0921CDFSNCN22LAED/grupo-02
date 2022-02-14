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

    registerChild: (req, res) => {
        // PREGUNTA: ¿Cómo refactorizo esto? el problema es el nesting de promesas.
        db.User.create()
            .then((user) => {
                return user.dataValues.id;
            })
            .then((userId) => {
                db.Child.create({
                    ...req.body,
                    avatar: req.file
                        ? req.file.originalname
                        : 'default-avatar.png',
                    user_id: userId,
                    parent_id: req.session.parentLogged.id,
                })
                    .then((child) => {
                        return db.Parent.findByPk(child.parent_id, {
                            include: [{ association: 'children' }],
                        });
                    })
                    .then((parent) => {
                        req.session.parentLogged = parent.dataValues;
                        return res.redirect(`/user/profile`);
                    })
                    .catch((e) => res.render('error-page', { error: e }));
            })
            .catch((e) => res.render('error-page', { error: e }));
    },
    parentLoginProcess: (req, res) => {
        if (req.body.pass) {
            db.Parent.findByPk(req.session.parentLogged.id)
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

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        res.redirect('/');
    },

    logoutSubUser: (req, res) => {
        req.session.parentIsLoggedSecure = false;
        delete req.session.childLogged;
        res.redirect('/');
    },

    updateParent: (req, res) => {
        Users.updateParent(req)
            .then((parent) => {
                req.session.parentLogged = parent.dataValues;
                res.redirect(`/user/profile`);
            })
            .catch((e) => res.render('error-page', { error: e }));
    },
    updateChildren: (req, res) => {
        Users.updateChild(req)
            .then((parent) => {
                req.session.parentLogged = parent.dataValues;
                res.redirect(`/user/profile`);
            })
            .catch((e) => res.render('error-page', { error: e }));
    },
    comment: async (req, res) => {
        try {
            await Users.createPageComment(req.params.id, req.body.comment);
            res.redirect('/');
        } catch (error) {
            res.render('error-page', { error });
        }
    },
};

module.exports = controller;
