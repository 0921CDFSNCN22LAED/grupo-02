const {
    Class,
    Interactive,
    Video,
    Preview,
    Bonus,
    Description,
    Teacher,
} = require('../database/models');
const Sequelize = require('sequelize');

const Products = {
    findAll: async function () {
        const products = await Class.findAll({
            raw: true,
            nest: true,
            include: [
                { association: 'subject' },
                { association: 'grades' },
                { association: 'teacher' },
                {
                    model: Interactive,
                    as: 'interactive',
                    include: [
                        { association: 'video' },
                        { association: 'preview' },
                        { association: 'bonus' },
                    ],
                },
                { association: 'description' },
            ],
        });
        return products;
    },
    findRandom: function (n) {
        const products = Class.findAll({
            raw: true,
            nest: true,
            include: [
                { association: 'subject' },
                { association: 'grades' },
                { association: 'teacher' },
                {
                    model: Interactive,
                    as: 'interactive',
                    include: [
                        { association: 'video' },
                        { association: 'preview' },
                        { association: 'bonus' },
                    ],
                },
                { association: 'description' },
            ],
            order: Sequelize.literal('rand()'),
            limit: n,
        });
        return products;
    },
    findOne: function (id) {
        return Class.findOne({
            raw: true,
            nest: true,
            where: {
                id: id,
            },
            include: [
                { association: 'subject' },
                { association: 'grades' },
                { association: 'teacher' },
                {
                    model: Interactive,
                    as: 'interactive',
                    include: [
                        { association: 'video' },
                        { association: 'preview' },
                        { association: 'bonus' },
                    ],
                },
                { association: 'description' },
            ],
        });
    },
    create: async function (req) {
        const videoFile = req.files.video ? req.files.video[0].filename : null;
        const previewFile = req.files.preview
            ? req.files.preview[0].filename
            : null;
        const bonusFile = req.files.bonus ? req.files.bonus[0].filename : null;
        let old = req.session.old;

        // const oldVideoFile =
        //     old && old.interactive.video
        //         ? old.interactive.video.location
        //         : null;
        // const oldPreviewFile =
        //     old && old.interactive.preview
        //         ? old.interactive.preview.location
        //         : null;
        // const oldBonusFile =
        //     old && old.interactive.bonus
        //         ? old.interactive.bonus.location
        //         : null;

        const video = Video.create({
            location: videoFile ?? '',
        });
        const preview = Preview.create({
            location: previewFile ?? oldPreviewFile ?? '',
        });
        const bonus = Bonus.create({
            location: bonusFile ?? '',
        });
        const interactives = Promise.all([video, preview, bonus]).then(
            ([video, preview, bonus]) => {
                return Interactive.create({
                    video_id: video.dataValues.id,
                    preview_id: preview.dataValues.id,
                    bonus_id: bonus.dataValues.id,
                });
            }
        );
        const teacher = Teacher.findOrCreate({
            where: {
                email: req.body.teacherEmail,
            },
            defaults: {
                firstName: req.body.teacherFirstName,
                lastName: req.body.teacherLastName,
                cv: req.body.teacherCv,
            },
        });
        const description = Description.create({
            description_short: req.body.description_short,
            description_long: req.body.description_long,
            contents: req.body.contents,
        });
        return Promise.all([teacher, interactives, description]).then(
            ([teacher, interactives, description]) => {
                return Class.create(
                    {
                        title: req.body.title,
                        subject_id: req.body.subject,
                        grade_id: req.body.grade,
                        teacher_id: teacher[0].dataValues.id,
                        price: req.body.price,
                        interactive_id: interactives.dataValues.id,
                        description_id: description.dataValues.id,
                    },
                    {
                        include: [{ association: 'description' }],
                    }
                );
            }
        );
    },
    edit: async function (req) {
        let old = req.session.old;
        const video = Video.update(
            {
                location: req.files.video
                    ? req.files.video[0].filename
                    : old.interactive.video.location,
            },
            {
                where: {
                    id: old.interactive.video.id,
                },
            }
        );
        const preview = Preview.update(
            {
                location: req.files.preview
                    ? req.files.preview[0].filename
                    : old.interactive.preview.location,
            },
            {
                where: {
                    id: old.interactive.preview.id,
                },
            }
        );
        const bonus = Bonus.update(
            {
                location: req.files.bonus
                    ? req.files.bonus[0].filename
                    : old.interactive.bonus.location,
            },
            {
                where: {
                    id: old.interactive.bonus.id,
                },
            }
        );
        const interactives = Promise.all([video, preview, bonus]).then(
            ([video, preview, bonus]) => {
                return Interactive.update(
                    {
                        video_id: old.interactive.video.id,
                        preview_id: old.interactive.preview.id,
                        bonus_id: old.interactive.bonus.id,
                    },
                    {
                        where: {
                            id: old.interactive.id,
                        },
                    }
                );
            }
        );
        const teacher = Teacher.update(
            {
                firstName: req.body.teacherFirstName,
                lastName: req.body.teacherLastName,
                email: req.body.teacherEmail,
                cv: req.body.teacherCv,
            },
            {
                where: {
                    id: old.teacher.id,
                },
            }
        );
        const description = Description.update(
            {
                description_short: req.body.description_short,
                description_long: req.body.description_short,
                contents: req.body.contents,
            },
            {
                where: {
                    id: old.description.id,
                },
            }
        );
        await Promise.all([teacher, interactives, description]);
        return Class.update(
            {
                title: req.body.title,
                price: req.body.price,
            },
            {
                where: {
                    id: old.id,
                },
            },
            {
                include: [{ association: 'description' }],
            }
        );
    },
    delete: async function (old) {
        const classDelete = Class.destroy({
            where: {
                id: old.id,
            },
        });
        const descriptionDelete = old.description.id
            ? Description.destroy({
                  where: {
                      id: old.description.id,
                  },
              })
            : '';
        const interactiveDelete = old.interactive.id
            ? Interactive.destroy({
                  where: {
                      id: old.interactive.id,
                  },
              })
            : '';
        const videoDelete = old.interactive.video_id
            ? Video.destroy({
                  where: {
                      id: old.interactive.video_id,
                  },
              })
            : '';
        const previewDelete = old.interactive.preview_id
            ? Preview.destroy({
                  where: {
                      id: old.interactive.preview_id,
                  },
              })
            : '';
        const bonusDelete = old.interactive.bonus_id
            ? Bonus.destroy({
                  where: {
                      id: old.interactive.bonus_id,
                  },
              })
            : '';

        return await Promise.all([
            videoDelete,
            previewDelete,
            bonusDelete,
            interactiveDelete,
            descriptionDelete,
            classDelete,
        ]);
    },
};

module.exports = Products;
