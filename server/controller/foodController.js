const mongoose = require('mongoose');
var Food = require('../model/food');
var Company = require('../model/admin');

//create food
exports.createFood = async(req, res) => {
    const { name, cuisine, category, price, photo, quantity, description, companyId } = req.body;

    if (!name || !cuisine || !category || !price || !photo || !quantity || !companyId) {
        res.status(400).json({ error: "Please fill all necessary fields" });
    } else {
        //new food
        try {
            Company.findById(companyId).then(async(savedCompany) => {
                if (!savedCompany) {
                    res.status(409).json({ error: "Company doesn't exists" });
                } else {
                    try {
                        const food = new Food({
                            name: name,
                            cuisine: cuisine,
                            category: category,
                            price: Math.ceil(price * ((100 + parseInt(process.env.COMPANY_COMMISSION)) / 100)),
                            originalPrice: price,
                            photo: photo,
                            quantity: quantity,
                            description: description,
                            companyId: companyId,
                        });
                        await food.save();
                        res.status(201).json({ success: "Food created successfully" });
                    } catch (err) {
                        res.status(400).json({ error: "Unable to create food" });
                    }
                }
            })
        } catch (err) {
            res.status(500).json({ error: "Unable to create user" });
        }
    }
}

// Get all foods
exports.getAllFoods = async(req, res) => {
    try {
        await Food.find().then(async(savedFood) => {
            if (savedFood) {
                res.status(200).json(savedFood);
            } else {
                res.status(404).json({ error: "No Food Found" });
            }
        })
    } catch (err) {
        res.status(500).json({ error: "Unable to get foods" });
    }
}

// Get all foods of a Company
exports.getCompanyFoods = async(req, res) => {
    const { id } = req.params;
    try {
        await Food.find({ companyId: id }).then(async(savedFood) => {
            if (savedFood) {
                res.status(200).json(savedFood);
            } else {
                res.status(404).json({ error: "Company doesn't have food" });
            }
        })
    } catch (err) {
        res.status(500).json({ error: "Unable to get foods" });
    }
}

// Get all foods by cuisine
exports.getCuisineFoods = async(req, res) => {
    const { cuisine } = req.params;
    try {
        await Food.find({ cuisine: cuisine }).then(async(savedFood) => {
            if (savedFood) {
                res.status(200).json(savedFood);
            } else {
                res.status(404).json({ error: "Company doesn't have food" });
            }
        })
    } catch (err) {
        res.status(500).json({ error: "Unable to get foods" });
    }
}

// Get all foods by category
exports.getCategoryFoods = async(req, res) => {
    const { category } = req.params;
    try {
        await Food.find({ category: category }).then(async(savedFood) => {
            if (savedFood) {
                res.status(200).json(savedFood);
            } else {
                res.status(404).json({ error: "Company doesn't have food" });
            }
        })
    } catch (err) {
        res.status(500).json({ error: "Unable to get foods" });
    }
}

// Get single food
exports.getFood = async(req, res) => {
    const { id } = req.params;
    try {
        await Food.findById(id).then(async(savedFood) => {
            if (savedFood) {
                res.status(200).json(savedFood);
            } else {
                res.status(404).json({ error: "No Food Found" });
            }
        })
    } catch (err) {
        res.status(500).json({ error: "Unable to get foods" });
    }
}

// Update single food
exports.updateFood = async(req, res) => {
    const { id } = req.params;
    const { name, cuisine, category, price, photo, quantity, description } = req.body;

    if (!name || !cuisine || !category || !price || !photo || !quantity) {
        res.status(400).json({ error: "Please fill all necessary fields" });
    } else {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No food with id: ${id}`);
        await Food.findByIdAndUpdate(id, {
            name: name,
            cuisine: cuisine,
            category: category,
            price: Math.ceil(price * ((100 + parseInt(process.env.COMPANY_COMMISSION)) / 100)),
            originalPrice: price,
            photo: photo,
            quantity: quantity,
            description: description
        }, (err, docs) => {
            if (err) {
                res.status(404).json({ error: "Unexpected error! Try again later." });
            } else {
                res.status(200).json({ success: "Successfully updated food details" });
            }
        });
    }
}

// Delete single food
exports.deleteFood = async(req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No food with id: ${id}`);
        await Food.findByIdAndRemove(id);
        res.status(200).json({ success: "Food Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Unable to delete food" });
    }
}

// Update single food stock status
exports.stockStatus = async(req, res) => {
    try {
        const { id } = req.params;
        let inStock = true;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No food with id: ${id}`);
        await Food.findById(id).then(async (food) => {
            if(food){
                if(food.inStock === true){
                    inStock = false;
                }
                await Food.findByIdAndUpdate(id, {
                    inStock:inStock
                }, (err, docs) => {
                    if (err) {
                        res.status(400).json({ error: "Unexpected error! Try again later." });
                    } else {
                        res.status(200).json({ success: "Successfully updated food availablity" });
                    }
                });
            }else{
                res.status(404).json({ error: "Food not present" });
            }
        });
    } catch (err) {
        res.status(500).json({ error: "Unable to delete food" });
    }
}