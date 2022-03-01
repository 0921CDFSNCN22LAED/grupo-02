const path = require('path');

const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const homeRoute = require('./routes/homeRoute');
const saleRoutes = require('./routes/saleRoutes');
const apiUserRoutes = require('./api/routes/apiUserRoutes');
const apiProductRoutes = require('./api/routes/apiProductRoutes');
const apiTeacherRoutes = require('./api/routes/apiTeacherRoutes');

const randomBackground = require('./middleware/randomBackground');
const userLogged = require('./middleware/userLogged');
const sessionData = require('./middleware/session-locals');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors({ origin: '*' }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(
    session({
        secret: 'Shh, esto es secreto',
        resave: false,
        saveUninitialized: false,
    })
);

//Enviar app como argumento ?? (corregido 13/12/2021)
app.use(randomBackground());
app.use(userLogged);
app.use(sessionData);

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`Escuchando puerto ${PORT}`);
});
app.use('/', homeRoute);
app.use('/user', userRoutes);
app.use('/products', productRoutes);
app.use('/sale', saleRoutes);
app.use('/api/users', apiUserRoutes);
app.use('/api/products', apiProductRoutes);
app.use('/api/teachers', apiTeacherRoutes);

app.use((req, res, next) => {
    res.status(404).render('not-found');
});
