const express = require("express");
const route = express.Router()
const multer = require("multer");
const services = require('../services/render')
const businessServices = require('../services/businessrender')
const orders = require('../services/orderrender')
const foodServices = require('../services/foodrender')
const userController = require('../controller/userController')
const providerController = require('../controller/providerController')

// @description Root Route
//@Method GET/

route.get("/", services.homeRoutes);

// @description add user
//@Method GET/add-user

route.get("/add_user", services.add_user);

// @description update user
//@Method GET/update-user

route.get("/update_user", services.update_user);

//api for users
route.post('/api/users/login', userController.login);
route.post('/api/users/create', userController.create);
route.get('/api/users', userController.find);
route.get('/api/users/single/:id', userController.findOne);
route.post('/api/users/update/:id', userController.update); //this is a url parameter,we created a variable in a url
route.post('/api/users/address/:id', userController.updateAddress);
route.delete('/api/users/delete/:id', userController.delete);

//provider view
route.get('/provider', services.providerRoutes);
route.get('/add_provider', services.add_provider);
route.get('/update_provider', services.update_provider);

//api for provider
route.post('/api/providers/create', providerController.create);
route.get('/api/providers', providerController.find);
route.get('/api/providers/single/:id', providerController.getOne);
route.post('/api/providers/update/:id', providerController.update); //this is a url parameter,we created a variable in a url
route.delete('/api/providers/delete/:id', providerController.delete);

//business view
route.get('/business', businessServices.businessRoutes);
route.get('/addbusiness', businessServices.addbusiness);
route.get('/updatebusiness', businessServices.updatebusiness);

// foods view
route.get('/foodsection', foodServices.listFoods);
route.get('/addFoodSection', foodServices.addFoods);
route.get('/updateFoodSection', foodServices.updateFoods);

route.get('/adminlogin', businessServices.adminLogin);
route.get('/orders', orders.orders);

module.exports = route