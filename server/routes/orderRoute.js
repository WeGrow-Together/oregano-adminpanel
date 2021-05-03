const express = require("express");
const route = express.Router()

const orderController = require('../controller/orderController');

//api for orders
route.post('/create', orderController.createOrder);
route.get('/user/:id', orderController.getUserOrders);
route.get('/company/:id', orderController.getCompanyOrders);
route.get('/provider/:id', orderController.getProviderOrders);
route.get('/all', orderController.getAllOrders);
route.post('/accepted/:id', orderController.orderStatusAccepted);
route.get('/delivered/:id', orderController.orderStatusDelivered);
route.get('/same-user/:id', orderController.orderSameUser);
route.get('/ordered', orderController.getOrdered);

module.exports = route;