const Cart = require('../model/cart');

exports.addItemToCart = (req, res) => {
    Cart.findOne({ user: req.body.userId }).then((cart) => {
        if(cart){

            const foodId = req.body.cartItems.foodId;
            const food = cart.cartItems.find(c => c.foodId == foodId);

            if(food)
            {
                Cart.findOneAndUpdate({ user: req.body.userId, "cartItems.foodId": foodId}, { 
                    $set: {
                        "cartItems.$.quantity": req.body.cartItems.quantity
                    }
                }).exec((error, _cart) => {
                    if(error) return res.status(400).json({ error: error });
                    if(_cart){
                        return res.status(200).json(_cart);
                    }
                });
            }else{
                Cart.findOneAndUpdate({ user: req.body.userId }, { 
                    "$push": {
                        "cartItems": req.body.cartItems
                    }
                }).exec((error, _cart) => {
                    if(error) return res.status(400).json({ error: error });
                    if(_cart){
                        return res.status(200).json(_cart);
                    }
                });
            }
        }else{
            const cart = new Cart({
                user: req.body.userId,
                cartItems: req.body.cartItems
            });
        
            try{
                cart.save();
                res.status(201).json({ success: "Added" });
            }catch(err)
            {
                res.status(201).json({ error: err.message });
            }
        }
    });
};

exports.allCartItems = (req, res) => {
    Cart.find().then((cart) => {
        if(cart)
        {
            res.status(200).json(cart);
        }else{
            res.status(400).json({ error: "Not Found" });
        }
    });
}