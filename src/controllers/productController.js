const Products = require("../models/Products");

const grados = [
    "1er año",
    "2do año",
    "3er año",
    "4to año",
    "5to año",
    "6to año",
    "7mo año",
];
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
        chosenProduct = req.session.product = Products.findOneById(
            req.params.id
        );
        if (!chosenProduct) res.render("not-found");
        res.render("product-detail", {
            chosenProduct,
            id: req.params.id,
        });
    },
    productForm: (req, res) => {
        let { old, id } = Products.findOldAndId(req.params.id);
        res.render("product-creation", {
            id,
            old,
            grados,
            materias,
        });
    },
    productFormProcess: (req, res) => {
        Products.createProduct([req.body, req.files]);
        res.redirect("/success");
    },
    productFormEdit: (req, res) => {
        let { old, id } = Products.findOldAndId(req.params.id);
        Products.destroy(id);
        Products.createProduct([req.body, req.files], id, old);
        res.redirect("/success");
    },
    delete: (req, res) => {
        Products.destroy(req.params.id);
        res.redirect("/");
    },
    productFormDuplicate: (req, res) => {
        let { old, id } = Products.findOldAndId(req.params.id);
        Products.createProduct([req.body, req.files], id, old);
        res.redirect("/success");
    },
};

module.exports = controller;
