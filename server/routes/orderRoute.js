const express = require("express");
const route = express.Router()

const orderController = require('../controller/orderController');

//api for orders
route.post('/create', orderController.createOrder);
route.get('/user/:id', orderController.getUserOrders);
route.get('/company/:id', orderController.getCompanyOrders);
route.get('/provider/:id', orderController.getProviderOrders);
route.get('/all', orderController.getAllOrders);

route.get('/resturant-accept/:id', orderController.orderStatusAccept);
route.get('/cancelled/:id', orderController.orderStatusCancelled);
route.get('/ready/:id', orderController.orderStatusReady);
route.post('/accepted/:id', orderController.orderStatusAccepted);
route.get('/arrived-resturant/:id', orderController.orderStatusArrivedResturant);
route.get('/collected/:id', orderController.orderStatusCollected);
route.get('/arrived-location/:id', orderController.orderStatusArrivedUser);
route.get('/delivered/:id', orderController.orderStatusDelivered);

route.get('/same-user/:id', orderController.orderSameUser);
route.get('/ordered', orderController.getOrdered);

module.exports = route;