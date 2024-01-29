const express = require('express');
const api = express.Router();
const fileUpload = require('express-fileupload');

const productController = require('../controllers/products');
const orderController = require('../controllers/orders')

//Rutas de productos
api.post('/product', fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
}), productController.createProduct);

api.delete('/product/:id', productController.deleteProduct)
api.put('/update-product/:id', productController.updateProduct)

//rutas de ordenes
api.get('/orders', orderController.getAllOrders)
api.post('/order-delivered/:id', orderController.shippedOut)

module.exports = api