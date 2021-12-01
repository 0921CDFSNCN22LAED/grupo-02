const Products = require("../models/Products");

const grados = ["1er", "2do", "3er", "4to", "5to", "6to", "7mo"];
const materias = [
    "Música",
    "Plástica",
    "Teatro",
    "Ciencias Naturales",
    " Ciencias Sociales",
    "Conocimiento del Mundo",
    "Educación Física",
    "Educación Tecnológica",
    "Formación Ética y Ciudadana",
    "Informática",
    "Matemática",
    "Práctica del lenguaje",
];

const controller = {
    list: (req, res) => {
        res.render("products-page", { products: Products.findAll() });
    },
    detail: (req, res) => {
        return res.render("product-detail", {
            chosenProduct: Products.findOneById(req.params.id),
        });
    },
    productForm: (req, res) => {
        return res.render("product-creation", {
            grados: grados,
            materias: materias,
        });
    },
    productFormProcess: (req, res) => {
        Products.createProduct([req.body, req.files]);
        // res.render("product-creation", {
        //     old: req.body,
        //     grados: grados,
        //     materias: materias,
        // });
        res.redirect("/success");
    },
};

module.exports = controller;
