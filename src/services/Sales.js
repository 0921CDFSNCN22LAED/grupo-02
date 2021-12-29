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

    addToCart: function (productId, old) {},
    removeFromCart: function (productId, old) {},
};
