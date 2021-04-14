const mongoose = require("mongoose");
var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    rating: {
        type: String,
        default: ""
    },
    wallet: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    status: String
})

const Userdb = mongoose.model('origano', schema);
module.exports = Userdb;