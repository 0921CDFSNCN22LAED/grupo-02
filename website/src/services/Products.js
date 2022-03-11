const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

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
    autoCreatePreview: async function (tema, subject, grade) {
        const fileName = `${tema}-${subject.substring(0, 3)}-${grade.substring(
            0
        )}.png`;
        const random = Math.random() * 360;
        const backgroundColor = `hsla(${random}, 100%, 75%, 1)`;
        const strokeColor = `hsla(${random}, 100%, 25%, 1)`;
        const width = 600;
        const height = 450;

        const canvas = createCanvas(width, height);
        const context = canvas.getContext('2d');

        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, width, height);

        //Tema
        context.font = 'bold 48pt Gotham';
        context.fillStyle = strokeColor;
        context.textAlign = 'center';
        const temaWidth = context.measureText(tema).width;
        const temaHeight = 48;
        context.fillRect(0, 0, temaWidth + 40, temaHeight * 2);
        context.fillStyle = '#fff';
        context.fillText(tema, temaWidth / 2 + 20, temaHeight + 20);

        // Subject and grade
        context.font = 'bold 28pt Gotham';
        context.fillStyle = strokeColor;
        const subjectWidth = context.measureText(subject).width;
        const subjectHeight = 28;
        context.fillRect(0, height - 2 * subjectHeight * 2, width, 480);
        context.fillStyle = '#fff';
        context.fillText(
            subject,
            subjectWidth / 2 + 10,
            height - subjectHeight + 10
        );
        const gradeWidth = context.measureText(grade).width;
        context.fillText(
            grade,
            gradeWidth / 2 + 10,
            height - subjectHeight * 2 - 20
        );

        const buffer = canvas.toBuffer('image/png');
        console.log('buffer', buffer);
        await fs.writeFileSync(
            path.resolve(
                __dirname,
                `../../public/img/clases-preview/${fileName}`
            ),
            buffer,
            (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            }
        );

        // loadImage('./logo.png').then((image) => {
        //     context.drawImage(image, 340, 515, 70, 70);
        // });
    },
    bulkCreate: function (req) {
        const tema = req.body.contents;
        this.autoCreatePreview(
            'Fracciones',
            'Formación Ética y Ciudadana',
            '5to año'
        );
        console.log('req.body', req.body);
    },
};

module.exports = Products;
