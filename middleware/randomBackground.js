const express = require("express");
const app = express();

module.exports = (req, res, next) => {
    if (req.path == "/") {
        app.locals.background = Math.floor(Math.random() * 4) + 1;
    }
    next();
};
