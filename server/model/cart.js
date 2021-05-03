const mongoose = require("mongoose");
var cartSchema = new mongoose.Schema({
    user: { type: String, required: true },
    cartItems: [
        {
            foodId: { type: String, required: true},
            foodName: { type: String, required: true},
            quantity: { type: Number, default: 1 },
            price: { type: Number, required: true}
        }
    ]
}, { timestamps: true});

const Cart = mongoose.model('carts', cartSchema);
module.exports = Cart;