const express = require('express');
const api = express.Router();
const fileUpload = require('express-fileupload');

const productController = require('../controllers/products');
const orderController = require('../controllers/orders');
const { getGeneralStatistics, getPendingOrders, 
        getBestSellers, getOrders, getOrder, 
        updateOrderStatus, getAllProducts, 
        searchProduct, createProduct,
        deleteProduct,  updateProduct, 
        getProduct,
        updateProductStatus} = require('../controllers/admin');

//Rutas de productos
api.post('/product', fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
}), createProduct);

api.get('/product/:id', getProduct)
api.delete('/product/:id', deleteProduct)
api.post('/update-product/:id', fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
}), updateProduct)
api.post('/update-status/:id/:status', updateProductStatus)

api.get('/all-products', getAllProducts)
api.post('/search-product', searchProduct)

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


module.exports = api