const bcrypt = require("bcryptjs");
const db = require("../database/models");
const User = require("../database/models/user");

module.exports = {
    create: function (req) {
        return db.User.create()
            .then((user) => {
                return user.dataValues.id;
            })
            .then((userId) => {
                return db.Parent.create({
                    ...req.body,
                    pass: bcrypt.hashSync(req.body.pass, 10),
                    avatar: "default-avatar.png",
                    user_id: userId,
                });
            });
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
                include: [{ association: "children" }],
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
                    include: [{ association: "children" }],
                });
            });
    },
};