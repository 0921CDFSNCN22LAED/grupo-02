const db = require("../database/models");
const subject = require("../database/models/subject");
const Products = require("../services/Products");
const interactive = require("../database/models/interactive");

const grados = [
    "1er año",
    "2do año",
    "3er año",
    "4to año",
    "5to año",
    "6to año",
    "7mo año",
];
const materias = [
    "Música",
    "Plástica",
    "Teatro",
    "Ciencias Naturales",
    " Ciencias Sociales",
    "Conocimiento del Mundo",
    "Educación Física",
    "Educación Tecnológica",
    "Formación Ética y Ciudadana",
    "Informática",
    "Matemática",
    "Práctica del lenguaje",
];

const controller = {
    list: (req, res) => {
        db.Class.findAll({
            raw: true,
            include: [
                { association: "subject" },
                { association: "grades" },
                { association: "teacher" },
                {
                    model: db.Interactive,
                    as: "interactive",
                    include: [
                        { association: "video" },
                        { association: "preview" },
                        { association: "bonus" },
                    ],
                },
                { association: "description" },
            ],
        }).then((classes) => {
            console.log(`classes`, classes);
            res.render("products-page", {
                classes,
            });
        });

        // res.render("products-page", { products: Products.findAll() });
    },
    detail: (req, res) => {
        chosenProduct = req.session.product = Products.findOneById(
            req.params.id
        );
        if (!chosenProduct) res.render("not-found");
        res.render("product-detail", {
            chosenProduct,
            id: req.params.id,
        });
    },
    productForm: (req, res) => {
        let grades = db.Grade.findAll({ raw: true });
        let subjects = db.Subject.findAll({ raw: true });
        // if (req.params.id) {
        //     db.Class.findByPk(req.params.id)
        //         .then((classSel) => {
        //             // console.log(classSel);
        //             // res.render("product-creation", {
        //             //     id: req.params.id,
        //             //     old: classSel,
        //             // })
        //         })
        //         .catch((e) => console.error(e));
        // }
        // let { old, id } = Products.findOldAndId(req.params.id);
        Promise.all([grades, subjects]).then(([grades, subjects]) => {
            res.render("product-creation", {
                // id,
                // old,
                grades,
                subjects,
            });
        });
    },
    productFormProcess: (req, res) => {
        const video = req.files.video
            ? db.Video.create({
                  location: req.files.video[0].filename,
              })
            : "";
        const preview = req.files.preview
            ? db.Preview.create({
                  location: req.files.preview[0].filename,
              })
            : "";
        const bonus = req.files.bonus
            ? db.Bonus.create({
                  location: req.files.bonus[0].filename,
              })
            : "";
        const interactives = Promise.all([video, preview, bonus]).then(
            ([video, preview, bonus]) => {
                console.log(video, preview, bonus);
                return db.Interactive.create({
                    video_id: video ? video.dataValues.id : null,
                    preview_id: preview ? preview.dataValues.id : null,
                    bonus_id: bonus ? bonus.dataValues.id : null,
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
            description_long: req.body.description_short,
            contents: req.body.contents,
        });
        Promise.all([teacher, interactives, description])
            .then(([teacher, interactives, description]) => {
                console.log(interactives.dataValues);
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
                        include: [{ association: "description" }],
                    }
                );
            })
            .then((classCreated) => {
                return res.redirect("/success");
            })
            .catch((e) => res.render("error-page", { error: e }));
    },
    productFormEdit: (req, res) => {
        let { old, id } = Products.findOldAndId(req.params.id);
        Products.destroy(id);
        Products.createProduct([req.body, req.files], id, old);
        res.redirect("/success");
    },
    delete: (req, res) => {
        Products.destroy(req.params.id);
        res.redirect("/");
    },
    productFormDuplicate: (req, res) => {
        let { old, id } = Products.findOldAndId(req.params.id);
        Products.createProduct([req.body, req.files], id, old);
        res.redirect("/success");
    },
};

module.exports = controller;
