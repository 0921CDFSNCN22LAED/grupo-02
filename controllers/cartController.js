const cartProducts = [
    {
        id: 1,
        nombre: "Fracciones I",
        materia: "Matemática",
        grado: "5to año",
        profesor: {
            nombre: "Juan",
            apellido: "Rodriguez",
        },
        rating: 3.5,
        precio: 450.0,
        preview: "/img/cursos-preview/Fracciones5to.png",
    },
    {
        id: 2,
        nombre: "Sustantivos",
        materia: "Práctica de lenguaje",
        grado: "5to año",
        profesor: {
            nombre: "Juan",
            apellido: "Perez",
        },
        rating: 4,
        precio: 450.0,
        preview: "/img/cursos-preview/Sustantivos5to.png",
    },
];
const recommendations = [
    {
        id: 1,
        nombre: "Fracciones I",
        materia: "Matemática",
        grado: "5to año",
        profesor: {
            nombre: "Juan",
            apellido: "Rodriguez",
        },
        rating: 3.5,
        precio: 450.0,
        preview: "/img/cursos-preview/Fracciones5to.png",
    },
    {
        id: 2,
        nombre: "Sustantivos",
        materia: "Práctica de lenguaje",
        grado: "5to año",
        profesor: {
            nombre: "Juan",
            apellido: "Perez",
        },
        rating: 4,
        precio: 450.0,
        preview: "/img/cursos-preview/Sustantivos5to.png",
    },
];

const controller = {
    main: (req, res) => {
        return res.render("cart.ejs", {
            enCarrito: cartProducts,
            recommendations: recommendations,
        });
    },
};

module.exports = controller;
