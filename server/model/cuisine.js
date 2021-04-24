const mongoose = require("mongoose");
var cuisineSchema = new mongoose.Schema({
    cuisine: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    }
})

const Cuisine = mongoose.model('cuisines', cuisineSchema);
module.exports = Cuisine;