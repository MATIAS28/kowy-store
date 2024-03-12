const express = require('express');
const api = express.Router();
const fileUpload = require('express-fileupload');

const productController = require('../controllers/products');
const orderController = require('../controllers/orders');
const { getGeneralStatistics, getPendingOrders, 
        getBestSellers, getOrders, getOrder, 
        updateOrderStatus, getAllProducts, 
        searchProduct, createProduct,
        deleteProduct,  updateProduct} = require('../controllers/admin');

//Rutas de productos
api.post('/product', fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
}), createProduct);

api.delete('/product/:id', deleteProduct)
api.put('/update-product/:id', updateProduct)

//rutas de ordenes
api.post('/orders', getOrders)
api.post('/order-delivered/:id', orderController.shippedOut)

//Analytics
api.get('/general-statistics/:days', getGeneralStatistics)
api.get('/pending-orders', getPendingOrders)
api.get('/best-sellers', getBestSellers)

//Orders
api.get('/order/:id', getOrder)
api.post('/update-order-status', updateOrderStatus)

//Products
api.get('/all-products', getAllProducts)
api.post('/search-product', searchProduct)

module.exports = api