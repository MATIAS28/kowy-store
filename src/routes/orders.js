const express = require('express');
const api = express.Router();
const auth = require('../middlewares/auth')

const orderController = require('../controllers/orders');

api.get('/orders', auth.verifyToken, orderController.getOrders)
api.get('/order/:id', auth.verifyToken, orderController.getOrder)
api.post('/order', auth.verifyToken, orderController.createNewOrder)
api.post('/payment-link/:id', auth.verifyToken, orderController.getPaymentLink)
api.post('/save-order/:id', orderController.validatePayment)


module.exports = api;

