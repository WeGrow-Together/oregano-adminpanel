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

    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    rating: {
        type: String,

    },
    wallet: {
        type: String,

    },

    status: String
})

const Userdb = mongoose.model('provider', schema);
module.exports = Userdb;