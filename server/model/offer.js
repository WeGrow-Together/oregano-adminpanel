const mongoose = require("mongoose");
var offerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    },
    offerStartTime: {
        type: Date,
        required: true
    },
    offerEndTime: {
        type: Date,
        required: true
    },
    offerImage: {
        type: String,
        required: true
    }
}, { timestamps: true});

const Offer = mongoose.model('offers', offerSchema);
module.exports = Offer;