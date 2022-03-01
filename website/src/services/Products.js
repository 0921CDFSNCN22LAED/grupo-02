const {
    Class,
    Grade,
    Subject,
    Interactive,
    Video,
    Preview,
    Bonus,
    Description,
    Teacher,
} = require('../database/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
        console.log('videoFile', videoFile);
        const previewFile = req.files.preview
            ? req.files.preview[0].filename
            : null;
        const bonusFile = req.files.bonus ? req.files.bonus[0].filename : null;
        let old = req.session.old;

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
                    videoId: video.dataValues.id,
                    previewId: preview.dataValues.id,
                    bonusId: bonus.dataValues.id,
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
            descriptionShort: req.body.descriptionShort,
            descriptionLong: req.body.descriptionLong,
            contents: req.body.contents,
        });
        return Promise.all([teacher, interactives, description]).then(
            ([teacher, interactives, description]) => {
                return Class.create(
                    {
                        title: req.body.title,
                        subjectId: req.body.subject,
                        gradeId: req.body.grade,
                        teacherId: teacher[0].dataValues.id,
                        price: req.body.price,
                        interactiveId: interactives.dataValues.id,
                        descriptionId: description.dataValues.id,
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
        console.log('old', old);
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
                        videoId: old.interactive.video.id,
                        previewId: old.interactive.preview.id,
                        bonusId: old.interactive.bonus.id,
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
                descriptionShort: req.body.descriptionShort,
                descriptionLong: req.body.descriptionShort,
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
        const videoDelete = old.interactive.videoId
            ? Video.destroy({
                  where: {
                      id: old.interactive.videoId,
                  },
              })
            : '';
        const previewDelete = old.interactive.previewId
            ? Preview.destroy({
                  where: {
                      id: old.interactive.previewId,
                  },
              })
            : '';
        const bonusDelete = old.interactive.bonusId
            ? Bonus.destroy({
                  where: {
                      id: old.interactive.bonusId,
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
    count: async function () {
        return await Class.count();
    },
    lastProductCreated: async function () {
        const productId = await Class.findOne({
            attributes: ['id'],
            order: [['createdAt', 'DESC']],
            raw: true,
            nest: true,
        });
        return productId;
    },
    searchProduct: async function (searchItem) {
        try {
            let products = await Class.findAll({
                raw: true,
                nest: true,
                where: {
                    [Op.or]: {
                        '$class.title$': { [Op.like]: `%${searchItem}%` },
                        '$subject.name$': { [Op.like]: `%${searchItem}%` },
                        '$grades.name$': { [Op.like]: `%${searchItem}%` },
                        '$teacher.firstName$': { [Op.like]: `%${searchItem}%` },
                        '$teacher.lastName$': { [Op.like]: `%${searchItem}%` },
                        '$teacher.email$': { [Op.like]: `%${searchItem}%` },
                        '$teacher.cv$': { [Op.like]: `%${searchItem}%` },
                        '$description.descriptionShort$': {
                            [Op.like]: `%${searchItem}%`,
                        },
                        '$description.descriptionLong$': {
                            [Op.like]: `%${searchItem}%`,
                        },
                        '$description.contents$': {
                            [Op.like]: `%${searchItem}%`,
                        },
                    },
                },
                include: [
                    { model: Subject, as: 'subject' },
                    { model: Grade, as: 'grades' },
                    { model: Teacher, as: 'teacher' },
                    {
                        model: Interactive,
                        as: 'interactive',
                        include: [
                            { association: 'video' },
                            { association: 'preview' },
                            { association: 'bonus' },
                        ],
                    },
                    { model: Description, as: 'description' },
                ],
            });
            return products;
        } catch (error) {
            console.log('error', error);
        }
    },
};

module.exports = Products;
