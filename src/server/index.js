require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('../db/db');

//Conf
require('./config');

//midlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    res.header('Access-Control-Allow-Headers', 'Authorization, auth-token, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//routes
const UserRoute = require('../routes/users');
const ProductsRouter = require('../routes/products');
const OrderRouter = require('../routes/orders');
const AdminRoutes = require('../routes/admin');

app.use('/api', UserRoute);
app.use('/api', ProductsRouter);
app.use('/api', OrderRouter);
app.use('/api/admin', AdminRoutes);

//server
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('escuchando en el puerto '+port);
});