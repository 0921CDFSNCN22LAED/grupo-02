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
        return res.render("product-detail", {
            chosenProduct: Products.findOneById(req.params.id),
            id: req.params.id,
        });
    },
    productForm: (req, res) => {
        let old;

        if (req.params.id) {
            old = Products.findOneById(req.params.id);
        }
        return res.render("product-creation", {
            id: req.params.id,
            old: old,
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
    productFormEdit: (req, res) => {
        let old;
        let id = req.params.id;
        if (id) {
            old = Products.findOneById(id);
        }
        Products.destroy(id);
        Products.createProduct([req.body, req.files], id, old);
        res.redirect("/success");
    },
    delete: (req, res) => {
        Products.destroy(req.params.id);
        res.redirect("/");
    },
};

module.exports = controller;
