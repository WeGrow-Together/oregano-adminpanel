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
        type: Number,
        default: 0
    },
    totalEarning: {
        type: Number,
        default: 0
    },
    totalDelivery: {
        type: Number,
        default: 0
    },
    isApproved: {
        type: Boolean,
        default: false
    }
})

const Userdb = mongoose.model('provider', schema);
module.exports = Userdb;