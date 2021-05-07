const mongoose = require('mongoose');
var Order = require('../model/order');
var Cart = require('../model/cart');
var Company = require('../model/admin');
var User = require('../model/model');
const moment = require('moment');

//create order
exports.createOrder = (req, res) => {
    const { userAddress, companyId, cartId, totalAmount, offers, paymentType, orderId, paymentId } = req.body;

    if ( !userAddress || !companyId || !cartId || !totalAmount || !paymentType) {
        res.status(400).json({ error: "Please provide all data" });
    } else {
        //new food
        try {
            Cart.findById(cartId).then(cart => {
                if(cart)
                {
                    Company.findById(companyId).then(company =>{
                        if(company)
                        {
                            User.findById(cart.user).then(user => {
                                if(user)
                                {
                                    const order = new Order({
                                        userId: cart.user,
                                        userName: user.name,
                                        userAddress: userAddress,
                                        companyId: companyId,
                                        companyName: company.companyName,
                                        companyAddress: company.businessAddress,
                                        totalAmount: totalAmount,
                                        paymentType: paymentType,
                                        offers: offers,
                                        orderDetails: cart.cartItems,
                                        orderTime: moment().format("hh:mm A"),
                                        orderDate: moment().format("D MMMM YYYY"),
                                        orderId: orderId,
                                        paymentId: paymentId
                                    });
                                    order.save().then(newOrder => {
                                        Cart.findByIdAndRemove(cartId);
                                        res.status(201).json(newOrder);
                                    }).catch(err => res.status(400).json({ success: "Order placed successfully" }));
                                }else{
                                    res.status(400).json({ error: "Invalid Company" });
                                }
                            }).catch(err => res.status(400).json({ error: err.message}));
                        }else{
                            res.status(400).json({ error: "Invalid Company" });
                        }
                    }).catch(err => res.status(400).json({ error: err.message}));
                }else{
                    res.status(400).json({ error: "Cart is empty" });
                }
            }).catch(err => res.status(400).json({ error: err.message}));
        } catch (err) {
            res.status(500).json({ error: "Unable to place order" });
        }
    }
}

// Get company order
exports.getCompanyOrders = async(req, res) => {
    const { id } = req.params;
    try {
        await Order.find({ companyId: id }).then(async(savedOrder) => {
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
        await Order.find({ providerId: id }).then(async(savedOrder) => {
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
        await Order.find({ userId: id }).then(async(savedOrder) => {
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
exports.orderStatusAccepted = async(req, res) => {
    const { id } = req.params;
    const { providerId, providerName } = req.body;

    if (!providerId || !providerName) {
        res.status(400).json({ error: "Please provide Provider Id" });
    } else {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: `No order with id: ${id}` });
        Order.findOne({ _id: id, providerId: "" }).then(async(savedOrder) => {
            if (savedOrder) {
                try {
                    await Order.findByIdAndUpdate(id, {
                        providerId: providerId,
                        providerName: providerName,
                        orderStatus: "accepted"
                    }, (err, docs) => {
                        if (err) {
                            res.status(404).json({ error: "Unexpected error! Try again later." });
                        } else {
                            res.status(200).json({ success: "Accepted order" });
                        }
                    });
                } catch (err) {
                    res.status(500).json({ error: "Unable to get orders" });
                }
            } else {
                res.status(404).json({ error: "Order does not exist" });
            }
        })
    }
}

// Update order status Food collected
exports.orderStatusCollected = async(req, res) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ error: "Please provide Provider Id" });
    } else {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: `No order with id: ${id}` });
        await Order.findByIdAndUpdate(id, {
            orderStatus: "collected"
        }, (err, docs) => {
            if (err) {
                res.status(404).json({ error: "Unexpected error! Try again later." });
            } else {
                res.status(200).json({ success: "Delivered Order" });
            }
        });
    }
}

// Update order status delivered
exports.orderStatusDelivered = async(req, res) => {
    const { id } = req.params;

    if (!id) {
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

// Update order status ready
exports.orderStatusReady = async(req, res) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ error: "Please provide Provider Id" });
    } else {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: `No order with id: ${id}` });
        await Order.findByIdAndUpdate(id, {
            orderStatus: "ready"
        }, (err, docs) => {
            if (err) {
                res.status(404).json({ error: "Unexpected error! Try again later." });
            } else {
                res.status(200).json({ success: "Order is Ready" });
            }
        });
    }
}

// Get same users orders
exports.orderSameUser = async(req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: `No user with id: ${id}` });
    await Order.find({ userId: id, orderStatus: "ordered" }).then(orders => {
        if (orders) {
            res.status(200).json(orders);
        } else {
            res.status(400).json({ error: "No extra order found" });
        }
    });
}

// Get orders
exports.getOrdered = async(req, res) => {
    try {
        await Order.find({ $nor: [ { orderStatus: "delivered" }, { orderStatus: "collected" } ] }).then(async(savedOrder) => {
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