const Products = require('../services/Products');
const Sales = require('../services/Sales');
const Users = require('../services/Users');
const { Sale, ClassSale, Progress } = require('../database/models/');

module.exports = {
    addToCart: async (req, res) => {
        const userId = req.query.userId;
        const classId = req.query.classId;
        const profileId = req.query.profileId;
        const keepLooking = req.query.keepLooking;
        await Sales.addToCart(userId, classId, profileId);
        if (keepLooking) return res.redirect('/products');
        res.redirect('/sale/cart');
    },
    viewCart: async (req, res) => {
        const userId = req.session.user.id;
        const profiles = req.session.profiles;
        const profilesId = profiles.map((profile) => profile.id);
        const cart = await Sales.findAllInCart(userId);
        const recommendations =
            (await Products.recommender(
                cart[cart.length - 1]?.classesSales.classId
            )) || (await Products.findRandom(8));
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
    payment: async (req, res) => {
        await Sales.updateCart(req.body.hiddenInputs, req.session.cart);
        res.redirect('/sale/payment');
    },
    paymentPage: async (req, res) => {
        const { cartFormatted, totalPrice } = await Sales.formatPayingPage(
            req.session.user.id
        );
        res.render('payment', { cartFormatted, totalPrice });
    },
    endPurchase: async (req, res) => {
        const cart = req.session.cart;
        await Sales.assignSoldAndProgress(cart);
        res.redirect('/');
    },
};
