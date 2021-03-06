const mongoose = require("mongoose");
var foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cuisine: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    originalPrice: {
        type: Number,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    companyId: {
        type: String,
        required: true
    },
    inStock: {
        type: Boolean,
        default: true
    }
})

const Food = mongoose.model('foods', foodSchema);
module.exports = Food;