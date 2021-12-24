const fs = require("fs");
const path = require("path");

const Products = {
    productOld: {
        id: "",
        titulo: "",
        materia: "",
        grado: "",
        profesorNombre: "",
        profesorApellido: "",
        profesorEmail: "",
        profesorCv: "",
        rating: "",
        precio: "",
        preview: "",
        descripcion: "",
        descripcionLong: "",
        contenidos: [],
        resenas: [],
        clasesSimilares: [],
        video: "",
        duracionVideo: 60,
        duracionVideoHoras: "",
        materialExtra: "",
        hayMaterialExtra: true,
        responsive: true,
        certificado: false,
    },
    fileName: path.join(__dirname, "../../data/products.json"),
    getData: function () {
        let products = fs.readFileSync(this.fileName);
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
            // product.rating = rating(product);
            // product.duracionVideoHoras = duracionVideoHoras(product);
        });
        return products;
    },
    saveData: function (data) {
        fs.writeFileSync(this.fileName, JSON.stringify(data, null, " "));
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
    findOldAndId: function (posibleId) {
        let old;
        let id = posibleId;
        if (id) {
            old = Products.findOneById(id);
        }
        return { old, id };
    },
    //createProduct se usa tanto para crear como para actualizar el producto.
    //Si no hay nada en old (que es el req.body), toma un template del producto vacío y lo llena
    //Si hay en el old, toma lo del old, actualiza los campos modificados, lo elimina (en el controller) de la DB y lo re sube
    createProduct: function (productData, id, old) {
        let allClases = this.findAll();
        let [productDataBody, productDataFiles] = productData;
        let newClase = {
            ...this.productOld,
            ...old,
            ...productDataBody,
            id: id ? Number(id) : this.generateId(),
            precio: Number(productDataBody.precio),
            contenidos: productDataBody.contenidos
                ? productDataBody.contenidos.split(/[\s,.]+/)
                : "",
            preview:
                productDataFiles && productDataFiles.preview
                    ? productDataFiles.preview[0].filename
                    : old && old.preview
                    ? old.preview
                    : "",
            video:
                productDataFiles && productDataFiles.video
                    ? productDataFiles.video[0].filename
                    : old && old.video
                    ? old.video
                    : "",
            materialExtra:
                productDataFiles && productDataFiles.materialExtra
                    ? productDataFiles.materialExtra[0].filename
                    : old && old.materialExtra
                    ? old.materialExtra
                    : "",
        };
        allClases.push(newClase);
        this.saveData(allClases);
        return newClase;
    },
    destroy: function (id) {
        let allClases = this.findAll();
        allClases = allClases.filter((clase) => clase.id != id);
        this.saveData(allClases);
    },
};

module.exports = Products;
