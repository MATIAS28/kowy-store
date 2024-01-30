const express = require('express');
const api = express.Router();

const { getProduct, getProducts, searchProduct } = require('../controllers/products');

api.get('/product/:id', getProduct)
api.get('/products/:limit/:category', getProducts)
api.post('/search-product', searchProduct)

module.exports = api;