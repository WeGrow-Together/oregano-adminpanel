const express = require("express");
const route = express.Router()
const multer = require("multer");
const businessrender = require('../services/businessrender')

const companyController = require('../controller/companyController');



//business view
route.get('/business', businessrender.businessRoutes);
route.get('/addbusiness', businessrender.addbusiness);
route.get('/updatebusiness', businessrender.updatebusiness);

//api for users
route.post('/admin/create', companyController.createAdmin);
route.post('/create', companyController.createCompany);
route.post('/login', companyController.adminLogin);
route.get('/all-companies', companyController.getAllCompanies);
route.get('/single/:id', companyController.getCompany);
route.delete('/delete/:id', companyController.deleteCompany);
route.put('/update/:id', companyController.updateCompany);

module.exports = route;