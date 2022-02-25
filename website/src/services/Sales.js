const { Sale, Class, ClassSale } = require('../database/models');
const db = require('../database/models');

module.exports = {
    addToCart: async function (req) {
        const [saleData, created] = await Sale.findOrCreate({
            where: {
                bought: null,
                profileId: req.session.profile.id,
            },
        });
        const sale = saleData.dataValues;
        const selClass = await Class.findByPk(req.session.class.id, {
            raw: true,
            nest: true,
        });
        const classSaleData = await ClassSale.create({
            classId: selClass.id,
            saleId: sale.id,
            historicPrice: selClass.price,
        });
        const classSale = classSaleData.dataValues;
        return classSale;
    },
    findAllInCart: function (req) {
        return db.Sale.findAll({
            raw: true,
            nest: true,
            where: {
                bought: null,
                profileId: req.session.profile.id,
            },
            include: [
                {
                    model: db.ClassSale,
                    as: 'classesSales',
                    include: [
                        {
                            model: db.Class,
                            as: 'classes',
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
                        },
                    ],
                },
            ],
        });
    },
    idsInCart: async function (req) {
        if (req.session.profile) {
            let sales = await db.Sale.findAll({
                where: {
                    profileId: req.session.profile.id,
                },
                attributes: ['id'],
                raw: true,
                nest: true,
                include: [{ association: 'classesSales' }],
            });
            classesIds = sales.map((sale) => sale.classesSales.classId);
            return classesIds;
        }
    },
    removeFromCart: async function (req) {
        const saleDeleted = await ClassSale.findByPk(req.params.id, {
            raw: true,
            nest: true,
        });

        await ClassSale.destroy({
            where: { id: req.params.id },
        });
        const isEmptySale = await ClassSale.findOne(
            {
                where: { saleId: saleDeleted.saleId },
            },
            {
                raw: true,
                nest: true,
            }
        );

        if (!isEmptySale) {
            await Sale.destroy({ where: { id: saleDeleted.saleId } });
        }
    },
};
