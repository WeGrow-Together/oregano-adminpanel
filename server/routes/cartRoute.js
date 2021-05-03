const express = require("express");
const route = express.Router()

const cartController = require('../controller/cartController');

//api for carts
route.post('/add-to-cart', cartController.addItemToCart);
route.get('/:id', cartController.userCartItems);
route.delete('/delete/:userId/:foodId', cartController.deleteCartItems);

module.exports = route;