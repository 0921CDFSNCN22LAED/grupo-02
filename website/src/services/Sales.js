const {
    Sale,
    Class,
    ClassSale,
    Interactive,
    Progress,
} = require('../database/models');
const Users = require('./Users');

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
        return Sale.findAll({
            raw: true,
            nest: true,
            where: {
                bought: null,
                profileId: req.session.profile.id,
            },
            include: [
                {
                    model: ClassSale,
                    as: 'classesSales',
                    include: [
                        {
                            model: Class,
                            as: 'classes',
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
                        },
                    ],
                },
            ],
        });
    },
    idsInCart: async function (req) {
        if (req.session.profile) {
            let sales = await Sale.findAll({
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
    assignSoldAndProgress: async function (req) {
        const saleId = req.session.cart[0].id;
        const classes = await ClassSale.findAll({
            where: { saleId: saleId },
            raw: true,
            nest: true,
            include: [{ association: 'sales' }],
        });
        await Sale.update(
            {
                user_id: req.session.profile.user_id,
                bought: 1,
            },
            {
                where: {
                    id: saleId,
                },
            }
        );

        for (let classSel of classes) {
            await Progress.create({
                classId: classSel.classId,
                profileId: classSel.sales.profileId,
            });
        }
        req.session.profile = await Users.selectProfile(req.params.id);
    },
};
