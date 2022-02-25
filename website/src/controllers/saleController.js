const Products = require('../services/Products');
const Sales = require('../services/Sales');
const Users = require('../services/Users');
const { ClassSale, Sale } = require('../database/models/');

module.exports = {
    addToCart: async (req, res) => {
        await Sales.addToCart(req);
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
        await Sales.removeFromCart(req);
        res.redirect('/sale/cart');
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
