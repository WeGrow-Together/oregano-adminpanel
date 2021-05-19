const express = require("express");
const route = express.Router()

const foodController = require('../controller/foodController');

//api for foods
route.post('/create', foodController.createFood);
route.get('/all', foodController.getAllFoods);
route.get('/company/:id', foodController.getCompanyFoods);
route.get('/single/:id', foodController.getFood);
route.get('/type/:cuisine', foodController.getCuisineFoods);
route.get('/category/:category', foodController.getCategoryFoods);
route.get('/status/:id', foodController.stockStatus);
route.post('/update/:id', foodController.updateFood);
route.delete('/delete/:id', foodController.deleteFood);

module.exports = route;