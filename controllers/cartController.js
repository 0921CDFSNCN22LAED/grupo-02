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
        rating: function () {
            return (
                Math.round(
                    (this.resenas.reduce((a, b) => a.rating + b.rating) /
                        this.resenas.length) *
                        2
                ) / 2
            );
        },
        precio: 450.0,
        preview: "/img/clases-preview/Fracciones5to.png",
        descripcion: "Esta clase es una introducción a las fracciones",
        descripcionLong:
            "Esta clase es una introducción a las fracciones donde aprenderás conceptos como numerador y denominador...",
        contenidos: ["Numerador", "Denominador"],
        resenas: [
            {
                rating: 3.5,
                comentario:
                    "La clase me pareció buena pero faltó más material interactivo",
            },
            {
                rating: 3,
                comentario: "Me aburrió",
            },
        ],
        clasesSimilares: [
            { id: 2, nombre: "Sustantivos" },
            { id: 3, nombre: "Fracciones II" },
        ],
        duracionVideo: 60,
        duracionVideoHoras: function () {
            let horas = Math.floor(this.duracionVideo / 60);
            let minutos = this.duracionVideo % 60;
            let minutosFraccionHora = minutos / 60;
            return horas + minutosFraccionHora;
        },
        materialExtra: true,
        responsive: true,
        certificado: false,
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
        rating: function () {
            return (
                Math.round(
                    (this.resenas.reduce((a, b) => a.rating + b.rating) /
                        this.resenas.length) *
                        2
                ) / 2
            );
        },
        precio: 450.0,
        preview: "/img/clases-preview/Sustantivos5to.png",
        descripcion: "Esta clase es sobre la clasificación de sustantivos",
        descripcionLong:
            "En esta clase veremos como pueden clasificarse los sustantivos en propios y comunes y la subdivisión de los sustantivos comunes en... ",
        contenidos: [
            "Sustantivo propio",
            "Sustantivo común",
            "Sustantivo común abstracto",
            "Sustantivo común concreto",
            "Sustantivo común concreto individual",
            "Sustantivo común concreto colectivo",
        ],
        resenas: [
            {
                rating: 4.5,
                comentario: "Me encantaron los ejemplos",
            },
            {
                rating: 4,
                comentario: "Justo lo que buscaba",
            },
        ],
        clasesSimilares: [{ id: 1, nombre: "lala" }],
        duracionVideo: 90,
        duracionVideoHoras: function () {
            let horas = Math.floor(this.duracionVideo / 60);
            let minutos = this.duracionVideo % 60;
            let minutosFraccionHora = minutos / 60;
            return horas + minutosFraccionHora;
        },
        materialExtra: true,
        responsive: true,
        certificado: true,
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
        rating: function () {
            return (
                Math.round(
                    (this.resenas.reduce((a, b) => a.rating + b.rating) /
                        this.resenas.length) *
                        2
                ) / 2
            );
        },
        precio: 450.0,
        preview: "/img/clases-preview/Fracciones5to.png",
        descripcion: "Esta clase es una introducción a las fracciones",
        descripcionLong:
            "Esta clase es una introducción a las fracciones donde aprenderás conceptos como numerador y denominador...",
        contenidos: ["Numerador", "Denominador"],
        resenas: [
            {
                rating: 3.5,
                comentario:
                    "La clase me pareció buena pero faltó más material interactivo",
            },
            {
                rating: 3,
                comentario: "Me aburrió",
            },
        ],
        clasesSimilares: [
            { id: 2, nombre: "Sustantivos" },
            { id: 3, nombre: "Fracciones II" },
        ],
        duracionVideo: 60,
        duracionVideoHoras: function () {
            let horas = Math.floor(this.duracionVideo / 60);
            let minutos = this.duracionVideo % 60;
            let minutosFraccionHora = minutos / 60;
            return horas + minutosFraccionHora;
        },
        materialExtra: true,
        responsive: true,
        certificado: false,
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
        rating: function () {
            return (
                Math.round(
                    (this.resenas.reduce((a, b) => a.rating + b.rating) /
                        this.resenas.length) *
                        2
                ) / 2
            );
        },
        precio: 450.0,
        preview: "/img/clases-preview/Sustantivos5to.png",
        descripcion: "Esta clase es sobre la clasificación de sustantivos",
        descripcionLong:
            "En esta clase veremos como pueden clasificarse los sustantivos en propios y comunes y la subdivisión de los sustantivos comunes en... ",
        contenidos: [
            "Sustantivo propio",
            "Sustantivo común",
            "Sustantivo común abstracto",
            "Sustantivo común concreto",
            "Sustantivo común concreto individual",
            "Sustantivo común concreto colectivo",
        ],
        resenas: [
            {
                rating: 4.5,
                comentario: "Me encantaron los ejemplos",
            },
            {
                rating: 4,
                comentario: "Justo lo que buscaba",
            },
        ],
        clasesSimilares: [{ id: 1, nombre: "lala" }],
        duracionVideo: 90,
        duracionVideoHoras: function () {
            let horas = Math.floor(this.duracionVideo / 60);
            let minutos = this.duracionVideo % 60;
            let minutosFraccionHora = minutos / 60;
            return horas + minutosFraccionHora;
        },
        materialExtra: true,
        responsive: true,
        certificado: true,
    },
];

const controller = {
    main: (req, res) => {
        return res.render("cart", {
            enCarrito: cartProducts,
            recommendations: recommendations,
        });
    },
};

module.exports = controller;
