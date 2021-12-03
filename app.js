const path = require("path");

const express = require("express");
const methodOverride = require("method-override");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

//Cómo hacer para pasar la función chosenBackground al middleware randomBackground? El problema es el app
const randomBackground = require("./middleware/randomBackground");

const app = express();

app.listen(3000);

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));

app.use(randomBackground(app));
app.use("/", userRoutes);

app.use("/products", productRoutes);
