const Cuisine = require('../model/cuisine');

exports.addCuisine = async (req, res) => {
    const { cuisine, photo } = req.body;
    if(!cuisine || !photo)
    {
        res.status(404).json({ error: "Field cannot be empty" });
    }else{
        try {
            await Cuisine.findOne({ cuisine }).then(async (availableCuisine) => {
                if(!availableCuisine)
                {
                    try {
                        const newCuisine = new Cuisine({
                            cuisine,
                            photo
                        })
        
                        await newCuisine.save().then((cuis) => res.status(201).json(cuis))
                                            .catch(err => res.status(500).json({ error: err.message }));
                    }catch(err)
                    {
                        res.status(500).json({ error: err.message });
                    }
                }else{
                    res.status(409).json({ error: "Cuisine already exists" })
                }
            });
        }catch(error){
            res.status(500).json({ error: "Unable to add cuisine" });
        }
    }
}

exports.getCuisines = async (req, res) => {
    try {
        await Cuisine.find().then((cuisine) => {
            if(cuisine)
            {
                res.status(200).json(cuisine);
            }else{
                res.status(400).json({ error: "Not Found" });
            }
        });
    }catch(error){
        res.status(400).json({ error: "Unable to get cuisine" });
    }
}

exports.deleteCuisine = async (req, res) => {
    try {
        await Cuisine.findByIdAndRemove(req.params.id);
        res.status(200).json({ success: "Successfully deleted Cuisine" });
    }catch(error){
        res.status(500).json({ error: "Unable to delete Cuisine" });
    }
}