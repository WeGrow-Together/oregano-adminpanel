const express = require("express");
const route = express.Router()
const multer = require("multer");
const services = require('../services/render')

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

route.post('/api/users/create', userController.create);
route.get('/api/users', userController.find);
route.post('/api/users/update/:id', userController.update); //this is a url parameter,we created a variable in a url
route.delete('/api/users/delete/:id', userController.delete);

//provider view
route.get('/provider', services.providerRoutes);
route.get('/add_provider', services.add_provider);
route.get('/update_provider', services.update_provider);

//api for provider
route.post('/api/providers/create', providerController.create);
route.get('/api/providers', providerController.find);
route.post('/api/providers/update/:id', providerController.update); //this is a url parameter,we created a variable in a url
route.delete('/api/providers/delete/:id', providerController.delete);

//business view
// route.get('/business', businessrender.businessRoutes);
// route.get('/addbusiness', businessrender.addbusiness);
// route.get('/updatebusiness', businessrender.updatebusiness);






module.exports = route