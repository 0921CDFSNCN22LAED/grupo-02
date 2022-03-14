const {
    Sale,
    Class,
    ClassSale,
    Interactive,
    Progress,
} = require('../database/models');
const Users = require('./Users');

module.exports = {
    addToCart: async function (userId, classId, profileId) {
        const [saleData, created] = await Sale.findOrCreate({
            where: {
                bought: null,
                userId: userId,
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
            profileId: profileId,
        });
    },
    findAllInCart: function (userId) {
        return Sale.findAll({
            raw: true,
            nest: true,
            where: {
                bought: null,
                userId: userId,
            },
            include: [
                { association: 'users' },
                {
                    model: ClassSale,
                    as: 'classesSales',
                    include: [
                        { association: 'profiles' },
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
                                    include: [{ association: 'preview' }],
                                },
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
        if (!Array.isArray(data)) data = [data];
        let i = 0;
        for await (let c of cart) {
            await ClassSale.update(
                {
                    profileId: data[i],
                },
                {
                    where: {
                        id: c.classesSales.id,
                    },
                }
            );
            i++;
        }
    },
    formatPayingPage: async function (userId) {
        const cart = await this.findAllInCart(userId);
        const cartData = cart.map((c) => {
            return {
                profileName: c.classesSales.profiles.name,
                className: c.classesSales.classes.title,
                price: c.classesSales.historicPrice,
            };
        });
        const totalPrice = cartData.reduce((a, b) => a + b.price, 0).toFixed(2);
        const auxArr = [];
        const cartFormatted = [];
        cartData.forEach((c) => {
            if (auxArr.indexOf(c.profileName) == -1) {
                cartFormatted.push([c]);
                auxArr.push(c.profileName);
            } else {
                const index = auxArr.indexOf(c.profileName);
                cartFormatted[index] = [...cartFormatted[index], c];
            }
        });

        return { cartFormatted, totalPrice };
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
                classId: c.classesSales.classId,
                profileId: c.classesSales.profileId,
            });
        }
    },
};
