const Products = require('../../services/Products');

function flattenObject(ob) {
    const toReturn = {};

    for (let i in ob) {
        if (!ob.hasOwnProperty(i)) continue;

        if (typeof ob[i] == 'object' && ob[i] !== null) {
            const flatObject = flattenObject(ob[i]);
            for (let x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;

                toReturn[i + '.' + x] = flatObject[x];
            }
        } else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
}

module.exports = {
    allProducts: async (req, res) => {
        const products = await Products.findAll();
        const subjects = {};
        products.forEach((product) => {
            if (subjects.hasOwnProperty(product.subject.name)) {
                subjects[product.subject.name] =
                    subjects[product.subject.name] + 1;
            } else {
                subjects[product.subject.name] = 1;
            }
        });
        const mappedProducts = products.map((product) => {
            return {
                id: product.id,
                name: product.title,
                info: [
                    product.subject.name,
                    product.grades.name,
                    product.teacher.firstName + ' ' + product.teacher.lastName,
                ],
                price: product.price,
                detail: `/api/products/${product.id}`,
            };
        });
        const jsonProducts = {
            count: products.length,
            countByCategory: subjects,
            products: mappedProducts,
        };

        res.json(jsonProducts);
    },
    count: async (req, res) => {
        const count = await Products.count();
        res.json({
            status: 200,
            title: 'clases',
            count,
        });
    },

    flattenedList: async (req, res) => {
        const productsRaw = await Products.findAll();
        // const productsRaw = productsRaw.map((product) =>
        //     flattenObject(product)
        // );

        const products = productsRaw.map((product) => {
            return {
                id: product.id,
                Título: product.title,
                Precio: product.price,
                Materia: product.subject.name,
                Grado: product.grades.name,
                Maestro:
                    product.teacher.firstName + ' ' + product.teacher.lastName,
                'Correo electrónico del maestro': product.teacher.email,
                'Cv del maestro': product.teacher.cv,
                Video: product.interactive.video.location,
                Portada: product.interactive.preview.location,
                'Material extra': product.interactive.bonus.location,
                Descripción: product.description.descriptionShort,
                'Descripción detallada': product.description.descriptionLong,
                Contenidos: product.description.contents,
            };
        });
        res.json({
            meta: {
                status: 200,
                total: products.length,
                url: '/api/products/flattened',
            },
            data: products,
        });
    },
    selProduct: async (req, res) => {
        const id = req.params.id;
        const product = await Products.findOne(id);
        res.json(product);
    },
    lastCreated: async (req, res) => {
        const productId = await Products.lastProductCreated();
        const product = await Products.findOne(productId.id);
        res.json(product);
    },
    search: async (req, res) => {
        const searchItem = req.query.search;
        const productsRaw = await Products.searchProduct(searchItem);
        const products = productsRaw.map((product) => {
            return {
                id: product.id,
                Título: product.title,
                Precio: product.price,
                Materia: product.subject.name,
                Grado: product.grades.name,
                Maestro:
                    product.teacher.firstName + ' ' + product.teacher.lastName,
                'Correo electrónico del maestro': product.teacher.email,
                'Cv del maestro': product.teacher.cv,
                Video: product.interactive.video.location,
                Portada: product.interactive.preview.location,
                'Material extra': product.interactive.bonus.location,
                Descripción: product.description.descriptionShort,
                'Descripción detallada': product.description.descriptionLong,
                Contenidos: product.description.contents,
            };
        });
        res.json({
            meta: {
                status: 200,
            },
            data: products,
        });
    },
};
