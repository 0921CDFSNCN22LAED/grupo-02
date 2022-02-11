const path = require("path");
const { check } = require("express-validator");

module.exports = [
    check("selectChild")
        .notEmpty()
        .withMessage("Elegí para que hijo es la clase"),
];
