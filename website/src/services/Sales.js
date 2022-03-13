const {
    Sale,
    Class,
    ClassSale,
    Interactive,
    Progress,
} = require('../database/models');
const Users = require('./Users');

module.exports = {
    addToCart: async function (profileId, classId) {
        const [saleData, created] = await Sale.findOrCreate({
            where: {
                bought: null,
                profileId: profileId,
            },
            raw: true,
            nest: true,
        });
        const sale = saleData;
        const selClass = await Class.findByPk(classId, {
            raw: true,
            nest: true,
        });
        const classSale = await ClassSale.create({
            classId: selClass.id,
            saleId: sale.id,
            historicPrice: selClass.price,
        });
    },
    findAllInCart: function (profilesId) {
        return Sale.findAll({
            raw: true,
            nest: true,
            where: {
                bought: null,
                profileId: profilesId,
            },
            include: [
                { association: 'profiles' },
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
    updateCart: async function (data, cart) {
        let i = 0;
        for (let c of cart) {
            if (data[i] != c.profileId) {
                await Sale.update(
                    {
                        profileId: data[c.id],
                    },
                    {
                        where: {
                            id: c.id,
                        },
                    }
                );
            }
            console.log('i', i);
            console.log('data[i]', data[i]);
            i++;
        }
    },
    assignSoldAndProgress: async function (cart) {
        for (let c of cart) {
            await Sale.update(
                {
                    bought: true,
                },
                {
                    where: {
                        id: c.id,
                    },
                }
            );
            await Progress.create({
                classId: c.classSale.classId,
                profileId: c.profiles.id,
            });
        }
    },
};
