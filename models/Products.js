const fs = require("fs");
const path = require("path");

const Products = {
    fileName: "./data/products.json",
    getData: function () {
        let products = fs.readFileSync(
            path.join(__dirname, "../data/products.json")
        );
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
                    (chosenProduct.resenas.reduce(
                        (a, b) => a.rating + b.rating
                    ) /
                        chosenProduct.resenas.length) *
                        2
                ) / 2
            );
        };
        products.forEach((product) => {
            product.rating = rating(product);
            product.duracionVideoHoras = duracionVideoHoras(product);
        });
        return products;
    },
    generateId: function () {
        let posibleIds = [];
        let currentIds = [];
        let products = this.getData();
        for (let product of products) {
            currentIds.push(product.id);
        }
        for (let i = 1; i <= products.length + 1; i++) {
            if (!currentIds.includes(i)) {
                return i;
            }
        }
    },
    findAll: function () {
        return this.getData();
    },
    findOneById: function (id) {
        return this.getData().find((product) => product.id == id);
    },
    createProduct: function (productData) {
        let allClases = this.findAll();
        let newClase = {
            id: this.generateId(),
            titulo: productData.titulo,
            materia: productData.materia,
            grado: productData.grado,
            profesor: {
                nombre: productData.nombre,
                apellido: productData.apellido,
                email: productData.email,
            },
            rating: "",
            precio: productData.precio,
            preview: "preview.png",
            descripcion: productData.descripcion,
            descripcionLong: productData.descripcionLong,
            contenidos: productData.contenidos.split(/[\s,.]+/),
            resenas: [],
            clasesSimilares: [],
            duracionVideo: "",
            duracionVideoHoras: "",
            materialExtra: true,
            responsive: true,
            certificado: false,
        };
        allClases.push(newClase);
        fs.writeFileSync(this.fileName, JSON.stringify(allClases, null, " "));
        return newClase;
    },
};

module.exports = Products;
