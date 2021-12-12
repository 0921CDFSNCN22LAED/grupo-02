const path = require("path");

const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const homeRoute = require("./routes/homeRoute");

//Cómo hacer para pasar la función chosenBackground al middleware randomBackground? El problema es el app
const randomBackground = require("./middleware/randomBackground");
const userLogged = require("./middleware/userLogged");
const sessionData = require("./middleware/session-locals");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(
    session({
        secret: "Shh, esto es secreto",
        resave: false,
        saveUninitialized: false,
    })
);

app.use(randomBackground(app));
app.use(userLogged);
app.use(sessionData);

app.listen(3000);

app.use("/", homeRoute);
app.use("/user", userRoutes);

app.use("/products", productRoutes);

app.use((req, res, next) => {
    res.status(404).render("not-found");
});
