const express = require('express');
const api = express.Router();
const fileUpload = require('express-fileupload');

const productController = require('../controllers/products');
const orderController = require('../controllers/orders');
const { getGeneralStatistics, getPendingOrders, getBestSellers, getOrders } = require('../controllers/admin');

//Rutas de productos
api.post('/product', fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
}), productController.createProduct);

api.delete('/product/:id', productController.deleteProduct)
api.put('/update-product/:id', productController.updateProduct)

//rutas de ordenes
api.post('/orders', getOrders)
api.post('/order-delivered/:id', orderController.shippedOut)

//Analytics
api.get('/general-statistics/:days', getGeneralStatistics)
api.get('/pending-orders', getPendingOrders)
api.get('/best-sellers', getBestSellers)

module.exports = api