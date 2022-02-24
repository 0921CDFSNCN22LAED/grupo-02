const Products = require('../services/Products');
const Sales = require('../services/Sales');
const Users = require('../services/Users');

module.exports = {
    addToCart: async (req, res) => {
        Sales.addToCart(req);
        res.redirect('/sale/cart');
    },
    viewCart: (req, res) => {
        try {
            const cart = Sales.findAllInCart(req);
            const recommendations = Products.findAll();
            const profiles = req.session.profiles;
            const profile = req.session.profile;
            Promise.all([cart, recommendations]).then(
                ([cart, recommendations]) => {
                    console.log('cart', cart);
                    req.session.cart = cart;
                    const totalPrice = cart
                        .reduce((a, b) => a + b.classesSales.historicPrice, 0)
                        .toFixed(2);

                    res.render('cart', {
                        cart,
                        recommendations,
                        totalPrice,
                        profiles,
                        profile,
                    });
                }
            );
        } catch (error) {
            res.render('error-page', { error });
        }
    },
    removeFromCart: async (req, res) => {
        try {
            const cart = await Sales.findAllInCart(req);
            const sale = await db.Sale.findByPk(cart[0].id);
            if (cart.length > 1) {
                await sale.removeClass(req.params.id);
            } else {
                await sale.removeClass(req.params.id);
                await db.Sale.destroy({
                    where: {
                        id: cart[0].id,
                    },
                    cascade: true,
                });
            }
            res.redirect('/sale/cart');
        } catch (error) {
            res.render('error-page', { error });
        }
    },
    payment: (req, res) => {
        req.session.profile = req.session.profiles.find(
            (child) => child.id == req.body.selectChild
        );
        res.redirect('/sale/payment');
    },
    paymentPage: (req, res) => {
        const cart = Sales.findAllInCart(req);
        cart.then((cart) => {
            const totalPrice = cart
                .reduce((a, b) => a + b.classes.price, 0)
                .toFixed(2);

            res.render('payment', { cart, totalPrice });
        });
    },
    endPurchase: async (req, res) => {
        const saleId = req.session.cart[0].id;
        await db.Sale.update(
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
        await Users.selectChild(req.session.profile.id, req);

        res.redirect('/');
    },
};
