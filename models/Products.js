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
            if (chosenProduct.duracionVideo == "") {
                return "";
            }
            let horas = Math.floor(chosenProduct.duracionVideo / 60);
            let minutos = chosenProduct.duracionVideo % 60;
            let minutosFraccionHora = minutos / 60;
            return horas + minutosFraccionHora;
        };

        let rating = function (chosenProduct) {
            if (chosenProduct.resenas == "") {
                return "";
            }
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
        let [productDataBody, productDataFiles] = productData;
        let newClase = {
            id: this.generateId(),
            titulo: productDataBody.titulo,
            materia: productDataBody.materia,
            grado: productDataBody.grado,
            profesor: {
                nombre: productDataBody.nombre,
                apellido: productDataBody.apellido,
                email: productDataBody.email,
            },
            rating: "",
            precio: Number(productDataBody.precio),
            preview: productDataFiles.preview
                ? productDataFiles.preview[0].filename
                : "",
            descripcion: productDataBody.descripcion,
            descripcionLong: productDataBody.descripcionLong,
            contenidos: productDataBody.contenidos.split(/[\s,.]+/),
            resenas: [],
            clasesSimilares: [],
            video: productDataFiles.video
                ? productDataFiles.video[0].filename
                : "",
            duracionVideo: "",
            duracionVideoHoras: "",
            materialExtra: productDataFiles.materialExtra
                ? productDataFiles.materialExtra[0].filename
                : "",
            hayMaterialExtra: productDataFiles.materialExtra ? true : false,
            responsive: true,
            certificado: false,
        };
        allClases.push(newClase);
        fs.writeFileSync(this.fileName, JSON.stringify(allClases, null, " "));
        console.log(newClase);
        return newClase;
    },
};

module.exports = Products;
