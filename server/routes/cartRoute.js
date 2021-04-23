const express = require("express");
const route = express.Router()

const cartController = require('../controller/cartController');

//api for carts
route.post('/add-to-cart', cartController.addItemToCart);
route.get('/', cartController.allCartItems);

module.exports = route;