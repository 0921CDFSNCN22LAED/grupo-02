const db = require("../database/models");
const sale = require("../database/models/sale");

module.exports = {
    addToCart: async (req, res) => {
        if (!req.session.cart) {
            req.session.cart = [];
        }
        req.session.cart.push(req.session.class.id);
        try {
            const sale = await db.Sale.create();
            await sale.addClasses(req.session.cart);
            res.redirect("/");
        } catch (error) {
            console.log(`error`, error);
        }
    },
};
