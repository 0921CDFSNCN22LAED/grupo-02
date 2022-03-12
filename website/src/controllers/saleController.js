const Products = require('../services/Products');
const Sales = require('../services/Sales');
const Users = require('../services/Users');
const { Sale, ClassSale, Progress } = require('../database/models/');

module.exports = {
    addToCart: async (req, res) => {
        await Sales.addToCart(req);
        res.redirect('/sale/cart');
    },
    viewCart: async (req, res) => {
        const cart = await Sales.findAllInCart(req);
        const recommendations =
            (await Products.recommender(
                cart[cart.length - 1]?.classesSales.classId
            )) || [];
        const profiles = req.session.profiles;
        const children = profiles.filter((profile) => !profile.isParent);
        const profile = req.session.profile;
        req.session.cart = cart;
        const totalPrice = cart
            .reduce((a, b) => a + b.classesSales.historicPrice, 0)
            .toFixed(2);

        res.render('cart', {
            cart,
            recommendations,
            totalPrice,
            children,
            profile,
        });
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
    paymentPage: async (req, res) => {
        const cart = await Sales.findAllInCart(req);
        const totalPrice = cart
            .reduce((a, b) => a + b.classesSales.historicPrice, 0)
            .toFixed(2);

        res.render('payment', { cart, totalPrice });
    },
    endPurchase: async (req, res) => {
        await Sales.assignSoldAndProgress(req);
        res.redirect('/');
    },
};
