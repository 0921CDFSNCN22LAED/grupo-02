const Products = require('../../services/Products');

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
    selProduct: async (req, res) => {
        const id = req.params.id;
        const product = await Products.findOne(id);
        res.json(product);
    },
};
