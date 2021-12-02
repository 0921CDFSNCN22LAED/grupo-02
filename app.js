const path = require("path");

const express = require("express");
const methodOverride = require("method-override");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

//Cómo hacer para pasar la función chosenBackground al middleware randomBackground? El problema es el app
const randomBackground = require("./middleware/randomBackground");
const chosenBackground = (req, res, next) => {
    if (req.path == "/") {
        app.locals.background = Math.floor(Math.random() * 4) + 1;
    }
    next();
};

const app = express();

app.listen(3000);

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));

app.use("/", chosenBackground, userRoutes);

app.use("/products", productRoutes);
