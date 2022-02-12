const bcrypt = require('bcryptjs');
const db = require('../database/models');
const { User, Profile } = require('../database/models/');

module.exports = {
    create: async (req) => {
        const user = await User.create(
            {
                email: req.body.email,
                pass: bcrypt.hashSync(req.body.pass, 10),
            },
            { raw: true, nest: true }
        );
        const profile = await Profile.create({
            isParent: true,
            name: req.body.name,
        });
        await profile.setUser(user.id);
        req.session.user = user;
        req.session.profiles = [profile];
    },

    findByEmail: async function (email) {
        const user = await User.findOne({
            raw: true,
            nest: true,
            where: { email: email },
        });

        return user;
    },
    updateParent: function (req) {
        return db.Parent.update(
            {
                ...req.body,
                // Si el spread da false por Short circuit todo da false y no se ve la propiedad
                ...(req.file && {
                    avatar: req.file.originalname,
                }),
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        ).then(() => {
            return db.Parent.findByPk(req.params.id, {
                include: [{ association: 'children' }],
            });
        });
    },
    updateChild(req) {
        return db.Child.update(
            {
                ...req.body,
                // Si el spread da false por Short circuit todo da false y no se ve la propiedad
                ...(req.file && {
                    avatar: req.file.originalname,
                }),
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        )
            .then(() => {
                return db.Child.findByPk(req.params.id);
            })
            .then((child) => {
                return db.Parent.findByPk(child.parent_id, {
                    include: [{ association: 'children' }],
                });
            });
    },
    selectChild: async function (id, req) {
        const child = await db.Child.findByPk(id ?? req.params.id, {
            raw: true,
            nest: true,
            include: [
                {
                    model: db.User,
                    as: 'users',
                },
            ],
        });

        const userId = child.user_id;
        const classes = await db.Sale.findAll({
            raw: true,
            nest: true,
            where: {
                user_id: userId,
                bought: 1,
            },
            include: [
                {
                    model: db.Class,
                    as: 'classes',
                    include: [
                        {
                            model: db.Interactive,
                            as: 'interactive',
                            include: [
                                { association: 'video' },
                                { association: 'preview' },
                                { association: 'bonus' },
                            ],
                        },
                    ],
                },
            ],
        });
        req.session.childClasses = classes;
        req.session.childLogged = child;
        return child;
    },
    createPageComment: async function (id, comment) {
        await db.PageComment.create({
            user_id: id,
            comment: comment,
        });
    },
    allPageComments: async function () {
        const comments = await db.PageComment.findAll({
            raw: true,
            nest: true,
            include: [
                {
                    association: 'profiles',
                },
            ],
        });
        comments.sort(() => Math.random() - Math.random());
        return comments;
    },
};
