const db = require("../database/models");

module.exports = {
    findAllInCart: function (req) {
        return db.Sale.findAll({
            raw: true,
            nest: true,
            where: {
                bought: null,
                user_id: req.session.parentLogged.user_id,
            },
            include: [
                {
                    model: db.Class,
                    as: "classes",
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
                },
            ],
        });
    },
    idsInCart: async function (req) {
        if (req.session.parentLogged) {
            let ids = await db.Sale.findAll({
                where: {
                    user_id: req.session.parentLogged.user_id,
                },
                attributes: ["id"],
                raw: true,
                nest: true,
                include: [{ association: "classes" }],
            });
            classesIds = [];
            for (let classSel of ids) {
                classesIds.push(classSel.classes.classes_sales.class_id);
            }
            return classesIds;
        }
    },
    addToCart: function (productId, old) {},
    removeFromCart: function (productId, old) {},
};
