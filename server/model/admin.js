const mongoose = require("mongoose");
var adminSchema = new mongoose.Schema({
    companyName: {
        type: String,
        default: ""
    },
    ownerName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    tradeLicense: {
        type: String,
        default: ""
    },
    typeOfCompany: {
        type: String,
        default: ""
    },
    panCardNumber: {
        type: String,
        default: ""
    },
    panCardImage: {
        type: String,
        default: ""
    },
    agreementCopy: {
        type: String,
        default: ""
    },
    businessLocation: {
        type: String,
        default: ""
    },
    businessAddress: {
        type: String,
        default: ""
    },
    noOfEmployees: {
        type: String,
        default: ""
    },
    gstNumber: {
        type: String,
        default: ""
    },
    accountNumber: {
        type: String,
        default: ""
    },
    ifscCode: {
        type: String,
        default: ""
    },
    typesOfService: {
        type: String,
        default: ""
    },
    dateOfEstablishment: {
        type: String,
        default: ""
    },
    cuisine: {
        type: Array,
        default: []
    },
    password: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Admin = mongoose.model('admins', adminSchema);
module.exports = Admin;