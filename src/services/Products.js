const req = require("express/lib/request");
const fs = require("fs");
const path = require("path");
const db = require("../database/models");

const Products = {
    findAll: function () {
        return db.Class.findAll({
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
        });
    },
    findOne: function (id) {
        return db.Class.findOne({
            raw: true,
            where: {
                id: id,
            },
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
        });
    },
    create: function (req) {
        let old = req.session.old;
        const video = req.files.video
            ? db.Video.create({
                  location: req.files.video[0].filename,
              })
            : old["interactive.video.location"]
            ? old["interactive.video.location"]
            : "";
        const preview = req.files.preview
            ? db.Preview.create({
                  location: req.files.preview[0].filename,
              })
            : old["interactive.preview.location"]
            ? old["interactive.preview.location"]
            : "";
        const bonus = req.files.bonus
            ? db.Bonus.create({
                  location: req.files.bonus[0].filename,
              })
            : old["interactive.bonus.location"]
            ? old["interactive.bonus.location"]
            : "";
        const interactives = Promise.all([video, preview, bonus]).then(
            ([video, preview, bonus]) => {
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
                        include: [{ association: "description" }],
                    }
                );
            }
        );
    },
    edit: function (req) {
        let old = req.session.old;
        const video = db.Video.update(
            {
                location: req.files.video
                    ? req.files.video[0].filename
                    : old["interactive.video.location"],
            },
            {
                where: {
                    id: old["interactive.video.id"],
                },
            }
        );
        const preview = db.Preview.update(
            {
                location: req.files.preview
                    ? req.files.preview[0].filename
                    : old["interactive.preview.location"],
            },
            {
                where: {
                    id: old["interactive.preview.id"],
                },
            }
        );
        const bonus = db.Bonus.update(
            {
                location: req.files.bonus
                    ? req.files.bonus[0].filename
                    : old["interactive.bonus.location"],
            },
            {
                where: {
                    id: old["interactive.bonus.id"],
                },
            }
        );
        const interactives = Promise.all([video, preview, bonus]).then(
            ([video, preview, bonus]) => {
                return db.Interactive.update(
                    {
                        video_id: video ? video.dataValues.id : null,
                        preview_id: preview ? preview.dataValues.id : null,
                        bonus_id: bonus ? bonus.dataValues.id : null,
                    },
                    {
                        where: {
                            id: old["interactive.id"],
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
                    id: old["teacher.id"],
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
                    id: old["description.id"],
                },
            }
        );
        return Promise.all([teacher, interactives, description]).then(
            ([teacher, interactives, description]) => {
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
                        include: [{ association: "description" }],
                    }
                );
            }
        );
    },
    delete: function (old) {
        const classDelete = db.Class.destroy({
            where: {
                id: old.id,
            },
        });
        const descriptionDelete = old["description.id"]
            ? db.Description.destroy({
                  where: {
                      id: old["description.id"],
                  },
              })
            : "";
        const interactiveDelete = old["interactive.id"]
            ? db.Interactive.destroy({
                  where: {
                      id: old["interactive.id"],
                  },
              })
            : "";
        const videoDelete = old["interactive.video_id"]
            ? db.Video.destroy({
                  where: {
                      id: old["interactive.video_id"],
                  },
              })
            : "";
        const previewDelete = old["interactive.preview_id"]
            ? db.Preview.destroy({
                  where: {
                      id: old["interactive.preview_id"],
                  },
              })
            : "";
        const bonusDelete = old["interactive.bonus_id"]
            ? db.Bonus.destroy({
                  where: {
                      id: old["interactive.bonus_id"],
                  },
              })
            : "";

        return Promise.all([
            videoDelete,
            previewDelete,
            bonusDelete,
            interactiveDelete,
            descriptionDelete,
            classDelete,
        ]).catch((e) => console.error(e));
    },
};

module.exports = Products;
