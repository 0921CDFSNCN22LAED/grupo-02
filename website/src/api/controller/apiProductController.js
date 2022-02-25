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
    flattenedList: async (req, res) => {
        const products = await Products.findAll();
        const flattenedProducts = products.map((product) =>
            flattenObject(product)
        );
        res.json({
            meta: {
                status: 200,
                total: products.length,
                url: '/api/products/flattened',
            },
            data: flattenedProducts,
        });
    },
    selProduct: async (req, res) => {
        const id = req.params.id;
        const product = await Products.findOne(id);
        res.json(product);
    },
};
