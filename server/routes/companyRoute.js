const express = require("express");
const route = express.Router()

const companyController = require('../controller/companyController');

//api for users
route.post('/admin/create', companyController.createAdmin);
route.post('/create', companyController.createCompany);
route.post('/login', companyController.adminLogin);
route.get('/all-companies', companyController.getAllCompanies);
route.get('/single/:id', companyController.getCompany);
route.get('/status/:id', companyController.openStatus);
route.delete('/delete/:id', companyController.deleteCompany);
route.put('/update/:id', companyController.updateCompany);
route.put('/change-password/:id', companyController.changePassword);

module.exports = route;