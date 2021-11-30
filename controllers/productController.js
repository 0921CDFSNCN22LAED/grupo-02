const Products = require("../models/Products");

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
        return res.render("product-creation");
    },
    productFormProcess: (req, res) => {
        console.log(req.body);
        // Products.createProduct(req.body);
        res.render("product-creation", { old: req.body });
    },
};

module.exports = controller;
