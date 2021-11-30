const express = require("express");
const path = require("path");
const methodOverride = require("method-override");

const app = express();
app.set("view engine", "ejs");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));

app.listen(3000);

const chosenBackground = (req, res, next) => {
    if (req.path == "/") {
        app.locals.background = Math.floor(Math.random() * 4) + 1;
    }
    next();
};

app.use("/", chosenBackground, userRoutes);

// app.get("/products-page", (req, res) => {
//     res.sendFile(path.join(__dirname, "views/products-page.html"));
// });

app.use("/products", productRoutes);
