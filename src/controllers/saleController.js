const db = require("../database/models");
const Products = require("../services/Products");
const Sales = require("../services/Sales");
const Users = require("../services/Users");

module.exports = {
    addToCart: async (req, res) => {
        try {
            const [sale, created] = await db.Sale.findOrCreate({
                where: {
                    bought: null,
                    user_id: req.session.parentLogged.user_id,
                },
            });

            await sale.addClasses([req.session.class.id]);
            res.redirect("/sale/cart");
        } catch (error) {
            res.render("error-page", { error });
        }
    },
    viewCart: (req, res) => {
        try {
            const cart = Sales.findAllInCart(req);
            const recommendations = Products.findAll();
            const children = req.session.parentLogged.children;
            const childLogged = req.session.childLogged;

            Promise.all([cart, recommendations]).then(
                ([cart, recommendations]) => {
                    req.session.cart = cart;
                    const totalPrice = cart
                        .reduce((a, b) => a + b.classes.price, 0)
                        .toFixed(2);

                    res.render("cart", {
                        cart,
                        recommendations,
                        totalPrice,
                        children,
                        childLogged,
                    });
                }
            );
        } catch (error) {
            res.render("error-page", { error });
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
            res.redirect("/sale/cart");
        } catch (error) {
            res.render("error-page", { error });
        }
    },
    payment: (req, res) => {
        req.session.childLogged = req.session.parentLogged.children.find(
            (child) => child.id == req.body.selectChild
        );
        res.redirect("/sale/payment");
    },
    paymentPage: (req, res) => {
        const cart = Sales.findAllInCart(req);
        cart.then((cart) => {
            const totalPrice = cart
                .reduce((a, b) => a + b.classes.price, 0)
                .toFixed(2);

            res.render("payment", { cart, totalPrice });
        });
    },
    endPurchase: async (req, res) => {
        const saleId = req.session.cart[0].id;
        await db.Sale.update(
            {
                user_id: req.session.childLogged.user_id,
                bought: 1,
            },
            {
                where: {
                    id: saleId,
                },
            }
        );
        await Users.selectChild(req.session.childLogged.id, req);

        res.redirect("/");
    },
};
