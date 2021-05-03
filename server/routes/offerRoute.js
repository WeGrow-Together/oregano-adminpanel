const express = require("express");
const route = express.Router()

const offerController = require('../controller/offerController');

//api for offers
route.post('/add', offerController.addOffer);
route.get('/', offerController.getOffers);
route.delete('/delete/:id', offerController.deleteOffer);

module.exports = route;