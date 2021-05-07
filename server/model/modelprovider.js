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
        type: Date,
        default: Date.now()
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    rating: {
        type: String,
        default: "NILL"
    },
    wallet: {
        type: String,
        default: '0'
    },
    status: {
        type: String,
        default: 'inactive'
    },
})

const Userdb = mongoose.model('provider', schema);
module.exports = Userdb;