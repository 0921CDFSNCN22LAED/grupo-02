const fs = require("fs");
const path = require("path");

let products = fs.readFileSync(path.join(__dirname, "../data/products.json"));
if (products == "") {
    products = [];
} else {
    products = JSON.parse(products);
}

const cartIds = [1];

const controller = {
    home: (req, res) => {
        return res.render("home");
    },
    register: (req, res) => {
        return res.render("register");
    },
    cart: (req, res) => {
        return res.render("cart", {
            enCarrito: products.filter((product) =>
                cartIds.includes(Number(product.id))
            ),
            recommendations: products,
        });
    },
};

module.exports = controller;
