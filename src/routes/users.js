const express = require('express');
const api = express.Router();

const UserController = require('../controllers/users');
const auth = require('../middlewares/auth');

api.post('/register', UserController.signin);
api.post('/login', UserController.login);
api.get('/user', auth.verifyToken, UserController.getUser);
api.put('/user', auth.verifyToken, UserController.updateUser, UserController.updatePassword);
api.post('/add-address', auth.verifyToken, UserController.addAddress);


module.exports = api;