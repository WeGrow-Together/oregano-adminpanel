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
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    rating: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})

const Userdb = mongoose.model('origano', schema);
module.exports = Userdb;