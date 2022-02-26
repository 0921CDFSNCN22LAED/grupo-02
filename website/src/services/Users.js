const bcrypt = require('bcryptjs');
const db = require('../database/models');
const {
    User,
    Profile,
    Progress,
    Class,
    Interactive,
} = require('../database/models/');

const Users = {
    create: async function (req) {
        const user = await User.create(
            {
                email: req.body.email,
                pass: bcrypt.hashSync(req.body.pass, 10),
            },
            { raw: true, nest: true }
        );
        req.session.user = user;
        await this.createProfile(user.id, req, true);
    },
    createProfile: async function (userId, req, isParent = false) {
        const profile = await Profile.create({
            isParent,
            name: req.body.name,
            ...(req.body.gradeId && {
                gradeId: req.body.gradeId,
            }),
            ...(req.file && {
                avatar: req.file.filename,
            }),
        });
        await profile.setUser(userId);
        req.session.profiles = await this.findCurrentProfiles(req);
    },
    findByEmail: async function (email) {
        const user = await User.findOne({
            where: { email: email },
            raw: true,
            nest: true,
        });
        return user;
    },

    findOneProfile: async function (id) {
        const profile = await Profile.findByPk(id, { raw: true, nest: true });
        return profile;
    },
    findCurrentProfiles: async (req, searchedId) => {
        const id = req.session.user.id ?? searchedId;
        let profiles = await User.findAll({
            raw: true,
            nest: true,
            include: [{ association: 'profiles' }],
            where: {
                id: id,
            },
        });
        profiles = profiles
            .map((user) => {
                return {
                    email: user.email,
                    pass: user.pass,
                    ...user.profiles,
                };
            })
            .sort((a, b) => b.isParent - a.isParent);
        return profiles;
    },
    selectProfile: async function (id) {
        const profile = await Profile.findByPk(id, {
            include: [
                {
                    model: Progress,
                    as: 'progress',
                    include: [
                        {
                            model: Class,
                            as: 'classes',
                            include: [
                                {
                                    model: Interactive,
                                    as: 'interactive',
                                    include: [{ association: 'preview' }],
                                },
                            ],
                        },
                    ],
                },
            ],
        });
        return profile;
    },
    update: async function (req) {
        await Profile.update(
            {
                ...req.body,
                ...(req.file && {
                    avatar: req.file.filename,
                }),
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        req.session.profiles = await this.findCurrentProfiles(req);
    },
    deleteProfile: async function (req) {
        await Profile.destroy({
            where: {
                id: req.params.id,
            },
        });
        req.session.profiles = await this.findCurrentProfiles(req);
    },

    createPageComment: async function (id, comment) {
        await db.PageComment.create({
            profileId: id,
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

module.exports = Users;
