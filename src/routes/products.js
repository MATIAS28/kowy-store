const express = require('express');
const api = express.Router();

const { getProduct, getProducts, searchProduct, getFilters, getAllProducts } = require('../controllers/products');

api.get('/product/:id', getProduct)
api.get('/filters', getFilters)
api.get('/products/?:limit/:category', getProducts)
api.post('/products', getAllProducts)
api.post('/search-product', searchProduct)

module.exports = api;