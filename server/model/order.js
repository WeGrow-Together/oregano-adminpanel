const mongoose = require("mongoose");
var orderSchema = new mongoose.Schema({
    foodId: {
        type: String,
        required:true
    },
    foodName: {
        type: String,
        required:true
    },
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    companyId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentType: {
        type: String,
        default: "razorpay"
    },
    orderTime: {
        type: String,
        required: true
    },
    orderDate: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        default: ""
    },
    paymentId: {
        type: String,
        default: ""
    },
    providerId: {
        type: String,
        default: ""
    },
    deliveryTime: {
        type: String,
        default: ""
    },
    orderStatus: {
        type: String,
        default: "ordered"
    }
})

const Order = mongoose.model('orders', orderSchema);
module.exports = Order;