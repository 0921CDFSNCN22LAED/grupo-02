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
                title: product.title,
                price: product.price,
                subject: product.subject.name,
                grades: product.grades.name,
                teacher:
                    product.teacher.firstName + ' ' + product.teacher.lastName,
                'teacher email': product.teacher.email,
                'teacher cv': product.teacher.cv,
                video: product.interactive.video.location,
                preview: product.interactive.preview.location,
                bonus: product.interactive.bonus.location,
                description: product.description.descriptionShort,
                'description long': product.description.descriptionLong,
                contents: product.description.contents,
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
};
