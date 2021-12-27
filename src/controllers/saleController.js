// cart: (req, res) => {
//     let cartIds = req.session.parentLogged.cart;
//     let enCarrito = Products.findAll().filter((product) =>
//         cartIds.includes(Number(product.id))
//     );
//     res.render("cart", {
//         enCarrito: Products.findAll().filter((product) =>
//             cartIds.includes(Number(product.id))
//         ),
//         recommendations: Products.findAll(),
//     });
// },
// cart: (req, res) => {
//     let cartIds = req.session.parentLogged.cart;
//     let enCarrito = Products.findAll().filter((product) =>
//         cartIds.includes(Number(product.id))
//     );
//     res.render("cart", {
//         enCarrito: Products.findAll().filter((product) =>
//             cartIds.includes(Number(product.id))
//         ),
//         recommendations: Products.findAll(),
//     });
// },
