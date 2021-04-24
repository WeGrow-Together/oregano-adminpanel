const express = require("express");
const route = express.Router()

const cuisineController = require('../controller/cuisineController');

//api for cuisine
route.post('/add', cuisineController.addCuisine);
route.get('/', cuisineController.getCuisines);
route.delete('/delete/:id', cuisineController.deleteCuisine);

module.exports = route;