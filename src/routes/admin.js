const express = require('express');
const api = express.Router();
const fileUpload = require('express-fileupload');


const orderController = require('../controllers/orders');
const { 
        getGeneralStatistics, getPendingOrders, 
        getBestSellers, getOrders, getOrder, 
        updateOrderStatus, getAllProducts, 
        searchProduct, createProduct,
        deleteProduct,  updateProduct, 
        getProduct, updateProductStatus,
        getAllUsers, searchUser,
        getUser, getUserOrders,
        deleteUser,
        signin, login
    } = require('../controllers/admin');
const { verifyAdminToken } = require('../middlewares/auth');


       
//Admin
api.post('/signin', signin)
api.post('/login', login)


//Rutas de productos
api.post('/product', fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
}), verifyAdminToken, createProduct);

api.get('/product/:id', verifyAdminToken, getProduct)
api.delete('/product/:id', verifyAdminToken, deleteProduct)
api.post('/update-product/:id', verifyAdminToken, fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
}), updateProduct)
api.post('/update-status/:id/:status', verifyAdminToken, updateProductStatus)

api.get('/all-products', verifyAdminToken, getAllProducts)
api.post('/search-product', verifyAdminToken, searchProduct)

//rutas de ordenes
api.post('/orders', verifyAdminToken, getOrders)
api.post('/order-delivered/:id', verifyAdminToken, orderController.shippedOut)

//Analytics
api.get('/general-statistics/:days', verifyAdminToken, getGeneralStatistics)
api.get('/pending-orders', verifyAdminToken, getPendingOrders)
api.get('/best-sellers', verifyAdminToken, getBestSellers)

//Orders
api.get('/order/:id', verifyAdminToken, getOrder)
api.post('/update-order-status', verifyAdminToken, updateOrderStatus)


//Users
api.get('/users/:clients', verifyAdminToken, getAllUsers)
api.get('/user/:id', verifyAdminToken, getUser)
api.get('/search-user/:id', verifyAdminToken, searchUser)
api.get('/user-orders/:id', verifyAdminToken, getUserOrders)
api.delete('/user/:id', verifyAdminToken, deleteUser)

module.exports = api