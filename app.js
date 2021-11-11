const express = require("express");
const path = require("path");

const app = express();
app.set("view engine", "ejs");

const mainRoutes = require("./routes/mainRoutes");
const cartRoutes = require("./routes/cartRoutes");
const productRoutes = require("./routes/productRoutes");

app.use(express.static(path.join(__dirname, "public")));

app.listen(3000);

app.use("/", mainRoutes);

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "views/register.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "views/login.html"));
});

app.get("/products-page", (req, res) => {
    res.sendFile(path.join(__dirname, "views/products-page.html"));
});

app.use("/product-detail", productRoutes);

app.use("/cart", cartRoutes);
