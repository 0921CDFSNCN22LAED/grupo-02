const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');
const ContentBasedRecommender = require('content-based-recommender');

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
    ClassReview,
    Progress,
} = require('../database/models');
const Sequelize = require('sequelize');
const { where } = require('sequelize');
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
        for (let product of products) {
            product.stars = await this.getProductRating(product.id);
        }
        return products;
    },
    findRandom: async function (n) {
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
            order: Sequelize.literal('rand()'),
            limit: n,
        });
        for (let product of products) {
            product.stars = await this.getProductRating(product.id);
        }
        return products;
    },
    findOne: async function (id, req) {
        const profileId = req?.session.profile.id;
        const product = await Class.findOne({
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
        if (profileId)
            product.progress = await Progress.findOne({
                where: { classId: id, profileId: profileId },
                raw: true,
                nest: true,
            });
        product.stars = await this.getProductRating(product.id);
        return product;
    },
    saveProgress: async function (req) {
        await Progress.update(
            {
                progress: req.body.progress,
            },
            {
                where: {
                    classId: req.params.classId,
                    profileId: req.session.profile.id,
                },
            }
        );
    },
    getProductRating: async function (id) {
        const ratings = await ClassReview.findAll({
            where: { classId: id },
            attributes: ['rating'],
            raw: true,
            nest: true,
        });
        if (ratings.length == 0) ratings.push({ rating: 4 }, { rating: 3 });
        const rating = ratings
            .map((r) => r.rating)
            .reduce((a, b) => Math.round(a + b) / 2);
        const starFilled = Math.floor(rating);
        const starSemiFilled = rating % 1 == 0.5 ? 1 : 0;
        const starHollow = 5 - starSemiFilled - starFilled;

        return [starFilled, starSemiFilled, starHollow];
    },

    create: async function (req) {
        const subject = await Subject.findByPk(req.body.subject, {
            raw: true,
            nest: true,
        });
        const grade = await Grade.findByPk(req.body.grade, {
            raw: true,
            nest: true,
        });

        let old = req.session.old;

        const video = await Video.create(
            {
                location: req.files?.video[0]?.filename ?? '',
            },
            {
                raw: true,
                nest: true,
            }
        );
        const preview = await Preview.create(
            {
                location:
                    req.files?.preview[0]?.filename ??
                    (await this.autoCreatePreview(
                        req.body.title,
                        req.body.subject,
                        req.body.grade
                    )),
            },
            {
                raw: true,
                nest: true,
            }
        );
        const bonus = await Bonus.create(
            {
                location: req.files?.bonus[0]?.filename ?? '',
            },
            {
                raw: true,
                nest: true,
            }
        );
        const interactives = await Interactive.create(
            {
                videoId: video.id,
                previewId: preview.id,
                bonusId: bonus.id,
            },
            {
                raw: true,
                nest: true,
            }
        );
        const teacher = await Teacher.findOrCreate({
            where: {
                email: req.body.teacherEmail,
            },
            defaults: {
                firstName: req.body.teacherFirstName,
                lastName: req.body.teacherLastName,
                cv: req.body.teacherCv,
            },
            raw: true,
            nest: true,
        });
        const description = await Description.create({
            descriptionShort: req.body.descriptionShort,
            descriptionLong: req.body.descriptionLong,
            contents: req.body.contents,
        });
        return await Class.create(
            {
                title: req.body.title,
                subjectId: req.body.subject,
                gradeId: req.body.grade,
                teacherId: teacher[0].id,
                price: req.body.price,
                interactiveId: interactives.id,
                descriptionId: description.id,
            },
            {
                include: [{ association: 'description' }],
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
        const classReviewDelete = ClassReview.destroy({
            where: { classId: old.id },
        });
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
            classReviewDelete,
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
        for (let product of products) {
            product.stars = await this.getProductRating(product.id);
        }
        return products;
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
        context.font = 'bold 36pt Gotham';
        context.fillStyle = strokeColor;
        context.textAlign = 'center';
        const temaWidth = context.measureText(tema).width;
        const temaHeight = 36;
        context.fillRect(0, 0, width, temaHeight * 2);
        context.fillStyle = '#fff';
        context.fillText(tema, temaWidth / 2 + 20, temaHeight + 20);

        // Subject and grade
        context.font = '30pt Gotham';
        context.fillStyle = strokeColor;
        const subjectWidth = context.measureText(subject).width;
        const subjectHeight = 30;
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

        const image = await loadImage(
            path.resolve(__dirname, `../../public/img/logo.png`)
        );
        context.drawImage(
            image,
            (width - 180) / 2,
            (height - 180) / 2 - 20,
            180,
            180
        );
        const buffer = canvas.toBuffer('image/png');

        await fs.writeFile(
            path.resolve(
                __dirname,
                `../../public/img/clases-preview/${fileName}`
            ),
            buffer,
            (err) => {
                if (err) throw err;
            }
        );
        return fileName;
    },
    bulkCreate: async function (req) {
        const tema = req.body.contents;
        const subjects = req.body.subjects;
        const grades = req.body.grades;

        for (let subject of subjects) {
            subject = await Subject.findByPk(subject, {
                raw: true,
                nest: true,
            });
            for (let grade of grades) {
                grade = await Grade.findByPk(grade, {
                    raw: true,
                    nest: true,
                });
                const subjAbbr = () => {
                    return subject.name
                        .split(' ')
                        .map(
                            (abbr) =>
                                abbr.substring(0, 1).toUpperCase() +
                                abbr.substring(1, 3)
                        )
                        .join('');
                };
                const title = tema
                    ? `${tema}-${grade.name.substring(0, 1)}`
                    : subjAbbr() + grade.name.substring(0, 1);
                console.log('grade', grade.name);
                console.log('subject', subject.name);

                const previewFile = await this.autoCreatePreview(
                    title,
                    subject.name,
                    grade.name
                );

                const video = await Video.create({
                    location: '',
                });
                const preview = await Preview.create({
                    location: previewFile,
                });
                const bonus = await Bonus.create({
                    location: '',
                });
                const interactives = await Interactive.create({
                    videoId: video.dataValues.id,
                    previewId: preview.dataValues.id,
                    bonusId: bonus.dataValues.id,
                });
                const teacher = await Teacher.findOrCreate({
                    where: {
                        email: req.body.teacherEmail,
                    },
                    defaults: {
                        firstName: req.body.teacherFirstName,
                        lastName: req.body.teacherLastName,
                        cv: req.body.teacherCv,
                    },
                });
                const description = await Description.create({
                    descriptionShort:
                        req.body.contents +
                        ' de ' +
                        subject.name +
                        ' para ' +
                        grade.name,
                    descriptionLong:
                        req.body.contents +
                        ' de ' +
                        subject.name +
                        ' para ' +
                        grade.name,
                    contents: req.body.contents,
                });
                await Class.create(
                    {
                        title: title,
                        subjectId: subject.id,
                        gradeId: grade.id,
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
        }
    },
    recommender: async function (id) {
        const recommender = new ContentBasedRecommender({
            minScore: 0.1,
            maxSimilarDocuments: 10,
        });
        const classes = await this.findAll();
        const documents = classes.map((classSel) => {
            return {
                id: classSel.id,
                content:
                    ' ' +
                    classSel.title +
                    ' ' +
                    classSel.subject.name +
                    ' ' +
                    classSel.grades.name +
                    ' ' +
                    classSel.teacher.email +
                    ' ' +
                    classSel.description.contents +
                    ' ' +
                    classSel.description.descriptionShort +
                    ' ' +
                    classSel.description.descriptionShort,
            };
        });

        recommender.train(documents);
        const similarDocuments = recommender.getSimilarDocuments(id, 0, 10);
        const similarIds = similarDocuments.map((simDoc) => simDoc.id);
        const similarClasses = await Class.findAll({
            where: { id: similarIds },
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

        return similarClasses;
    },
};

module.exports = Products;
