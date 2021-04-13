const express = require("express");
const route = express.Router()

const companyController = require('../controller/companyController');

//api for users
route.post('/admin/create', companyController.createAdmin);
route.post('/create', companyController.createCompany);
route.post('/login', companyController.adminLogin);
route.get('/all-companies', companyController.getAllCompanies);
route.get('/single/:id', companyController.getCompany);
route.delete('/delete/:id', companyController.deleteCompany);
route.put('/update/:id', companyController.updateCompany);

module.exports = route;