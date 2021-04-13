const mongoose = require('mongoose');
var Order = require('../model/order');
const moment = require('moment');

//create order
exports.createOrder = async(req, res) => {
    const { foodId, foodName, userId, userName, companyId, quantity, totalAmount, paymentType, orderId, paymentId } = req.body;

    if (!foodId || !foodName || !userId || !userName || !quantity || !totalAmount || !paymentType) {
        res.status(400).json({ error: "Please provide all data" });
    } else {
        //new food
        try {
            const order = new Order({
                foodId: foodId,
                foodName: foodName,
                userId: userId,
                userName: userName,
                companyId: companyId,
                quantity: quantity,
                totalAmount: totalAmount,
                paymentType: paymentType,
                orderTime: moment().format("hh:mm A"),
                orderDate: moment().format("D MMMM YYYY"),
                orderId: orderId,
                paymentId: paymentId
            });
            await order.save();
            res.status(201).json({ success: "Order placed successfully" });
        } catch (err) {
            res.status(500).json({ error: "Unable to place order" });
        }
    }
}

// Get company order
exports.getCompanyOrders = async(req, res) => {
    const { id } = req.params;
    try {
        await Order.find({ companyId:id }).then(async(savedOrder) => {
            if (savedOrder) {
                res.status(200).json(savedOrder);
            } else {
                res.status(404).json({ error: "Company doesn't have orders" });
            }
        })
    } catch (err) {
        res.status(500).json({ error: "Unable to get orders" });
    }
}

// Get provider order
exports.getProviderOrders = async(req, res) => {
    const { id } = req.params;
    try {
        await Order.find({ providerId:id }).then(async(savedOrder) => {
            if (savedOrder) {
                res.status(200).json(savedOrder);
            } else {
                res.status(404).json({ error: "Company doesn't have orders" });
            }
        })
    } catch (err) {
        res.status(500).json({ error: "Unable to get orders" });
    }
}

// Get user order
exports.getUserOrders = async(req, res) => {
    const { id } = req.params;
    try {
        await Order.find({ userId:id }).then(async(savedOrder) => {
            if (savedOrder) {
                res.status(200).json(savedOrder);
            } else {
                res.status(404).json({ error: "User doesn't have orders" });
            }
        })
    } catch (err) {
        res.status(500).json({ error: "Unable to get orders" });
    }
}

// Get all order
exports.getAllOrders = async(req, res) => {
    const { id } = req.params;
    try {
        await Order.find().then(async(savedOrder) => {
            if (savedOrder) {
                res.status(200).json(savedOrder);
            } else {
                res.status(404).json({ error: "User doesn't have orders" });
            }
        })
    } catch (err) {
        res.status(500).json({ error: "Unable to get orders" });
    }
}

// Update order status processing
exports.orderStatusProcessing = async(req, res) => {
    const { id } = req.params;
    const { providerId } = req.body;

    if (!providerId) {
        res.status(400).json({ error: "Please provide Provider Id" });
    } else {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: `No order with id: ${id}` });
        Order.findOne({ _id: id, providerId: ""}).then(async(savedOrder) => {
            if (savedOrder) {
                try{
                    await Order.findByIdAndUpdate(id, {
                        providerId: providerId,
                        orderStatus: "processing"
                    }, (err, docs) => {
                        if (err) {
                            res.status(404).json({ error: "Unexpected error! Try again later." });
                        } else {
                            res.status(200).json({ success: "Processing order" });
                        }
                    });
                }catch(err) {
                    res.status(500).json({ error: "Unable to get orders" });
                }
            } else {
                res.status(404).json({ error: "Order does not exist" });
            }
        })
    }
}

// Update order status delivered
exports.orderStatusDelivered = async(req, res) => {
    const { id } = req.params;

    if (!providerId) {
        res.status(400).json({ error: "Please provide Provider Id" });
    } else {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: `No order with id: ${id}` });
        await Order.findByIdAndUpdate(id, {
            deliveryTime: moment().format("hh:mm A"),
            orderStatus: "delivered"
        }, (err, docs) => {
            if (err) {
                res.status(404).json({ error: "Unexpected error! Try again later." });
            } else {
                res.status(200).json({ success: "Delivered Order" });
            }
        });
    }
}

// Get same users orders
exports.orderSameUser = async(req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: `No user with id: ${id}` });
    await Order.find({ userId: id, orderStatus: "ordered"}).then(orders => {
        if(orders)
        {
            res.status(200).json(orders);
        }else{
            res.status(400).json({ error: "No extra order found" });
        }
    });
}

// Get orders
exports.getOrdered = async(req, res) => {
    try {
        await Order.find({ orderStatus: "ordered" }).then(async(savedOrder) => {
            if (savedOrder) {
                res.status(200).json(savedOrder);
            } else {
                res.status(404).json({ error: "No orders found" });
            }
        })
    } catch (err) {
        res.status(500).json({ error: "Unable to get orders" });
    }
}