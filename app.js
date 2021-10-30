const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.listen(3000);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/home.html"));
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "views/register.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "views/login.html"));
});

app.get("/products-page", (req, res) => {
    res.sendFile(path.join(__dirname, "views/products-page.html"));
});

app.get("/product-detail", (req, res) => {
    res.sendFile(path.join(__dirname, "views/product-detail.html"));
});

app.get("/cart", (req, res) => {
    res.sendFile(path.join(__dirname, "views/cart.html"));
});
