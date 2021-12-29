const { redirect } = require("express/lib/response");
const db = require("../database/models");
const Products = require("../services/Products");
const Sales = require("../services/Sales");

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
            Promise.all([cart, recommendations]).then(
                ([cart, recommendations]) => {
                    const totalPrice = cart
                        .reduce((a, b) => a + b.classes.price, 0)
                        .toFixed(2);

                    res.render("cart", { cart, recommendations, totalPrice });
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
};
