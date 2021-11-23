const fs = require("fs");
const path = require("path");

let products = fs.readFileSync(path.join(__dirname, "../data/products.json"));
if (products == "") {
    products = [];
} else {
    products = JSON.parse(products);
}

let duracionVideoHoras = function (chosenProduct) {
    let horas = Math.floor(chosenProduct.duracionVideo / 60);
    let minutos = chosenProduct.duracionVideo % 60;
    let minutosFraccionHora = minutos / 60;
    return horas + minutosFraccionHora;
};

let rating = function (chosenProduct) {
    return (
        Math.round(
            (chosenProduct.resenas.reduce((a, b) => a.rating + b.rating) /
                chosenProduct.resenas.length) *
                2
        ) / 2
    );
};
products.forEach((product) => {
    product.rating = rating(product);
    product.duracionVideoHoras = duracionVideoHoras(product);
});

const controller = {
    list: (req, res) => {
        res.render("products-page", { products: products });
    },
    detail: (req, res) => {
        let chosenProduct = products.find(
            (product) => product.id == req.params.id
        );
        return res.render("product-detail", {
            chosenProduct: chosenProduct,
            // rating: rating(chosenProduct),
            // duracionVideoHoras: duracionVideoHoras(chosenProduct),
        });
    },
    cart: (req, res) => {
        return res.render("cart", {
            enCarrito: cartProducts,
            recommendations: recommendations,
        });
    },
    create: (req, res) => {
        return res.render("product-creation");
    },
};

module.exports = controller;
