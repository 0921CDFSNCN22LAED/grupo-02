const fs = require("fs");
const path = require("path");

let products = fs.readFileSync(path.join(__dirname, "../data/products.json"));
if (products == "") {
    products = [];
} else {
    products = JSON.parse(products);
}

const cartIds = [1, 2];
const clasesActualesId = [1];
const comentarios = [
    {
        nombre: "Juan Rodriguez",
        resena: "Muy linda la página, me gusta que cambien los fondos al pasar por el home",
    },
    {
        nombre: "José Perez",
        resena: "Va muy bien, a seguir trabajando!!!",
    },
];

const controller = {
    home: (req, res) => {
        return res.render("home", {
            clasesActuales: products.filter((product) =>
                clasesActualesId.includes(Number(product.id))
            ),
            recommendations: [
                products[Math.floor(Math.random() * products.length)],
            ],
            clases: products,
            comentarios: comentarios,
        });
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
