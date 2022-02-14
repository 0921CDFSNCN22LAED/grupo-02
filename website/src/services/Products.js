const { Class, Interactive } = require('../database/models');
const Sequelize = require('sequelize');

const Products = {
    findAll: async function () {
        try {
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
        } catch (error) {
            console.log('error', error);
        }
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
                    model: db.Interactive,
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

        const video = db.Video.create({
            location: videoFile ?? '',
        });
        const preview = db.Preview.create({
            location: previewFile ?? oldPreviewFile ?? '',
        });
        const bonus = db.Bonus.create({
            location: bonusFile ?? '',
        });
        const interactives = Promise.all([video, preview, bonus]).then(
            ([video, preview, bonus]) => {
                return db.Interactive.create({
                    video_id: video.dataValues.id,
                    preview_id: preview.dataValues.id,
                    bonus_id: bonus.dataValues.id,
                });
            }
        );
        const teacher = db.Teacher.findOrCreate({
            where: {
                email: req.body.teacherEmail,
            },
            defaults: {
                first_name: req.body.teacherFirstName,
                last_name: req.body.teacherLastName,
                cv: req.body.teacherCv,
            },
        });
        const description = db.Description.create({
            description_short: req.body.description_short,
            description_long: req.body.description_long,
            contents: req.body.contents,
        });
        return Promise.all([teacher, interactives, description]).then(
            ([teacher, interactives, description]) => {
                return db.Class.create(
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
        const video = db.Video.update(
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
        const preview = db.Preview.update(
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
        const bonus = db.Bonus.update(
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
                return db.Interactive.update(
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
        const teacher = db.Teacher.update(
            {
                first_name: req.body.teacherFirstName,
                last_name: req.body.teacherLastName,
                email: req.body.teacherEmail,
                cv: req.body.teacherCv,
            },
            {
                where: {
                    id: old.teacher.id,
                },
            }
        );
        const description = db.Description.update(
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
        return db.Class.update(
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
        const classDelete = db.Class.destroy({
            where: {
                id: old.id,
            },
        });
        const descriptionDelete = old.description.id
            ? db.Description.destroy({
                  where: {
                      id: old.description.id,
                  },
              })
            : '';
        const interactiveDelete = old.interactive.id
            ? db.Interactive.destroy({
                  where: {
                      id: old.interactive.id,
                  },
              })
            : '';
        const videoDelete = old.interactive.video_id
            ? db.Video.destroy({
                  where: {
                      id: old.interactive.video_id,
                  },
              })
            : '';
        const previewDelete = old.interactive.preview_id
            ? db.Preview.destroy({
                  where: {
                      id: old.interactive.preview_id,
                  },
              })
            : '';
        const bonusDelete = old.interactive.bonus_id
            ? db.Bonus.destroy({
                  where: {
                      id: old.interactive.bonus_id,
                  },
              })
            : '';

        try {
            return await Promise.all([
                videoDelete,
                previewDelete,
                bonusDelete,
                interactiveDelete,
                descriptionDelete,
                classDelete,
            ]);
        } catch (e) {
            return res.render('error-page', { error: e });
        }
    },
};

module.exports = Products;
