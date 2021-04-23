const Offer = require('../model/offer');
const moment = require('moment');

exports.addOffer = async (req, res) => {
    const { name, description, percentage, offerStartTime, offerEndTime, offerImage} = req.body;
    if(!name || !description || !percentage || !offerStartTime || !offerEndTime || !offerImage)
    {
        res.status(404).json({ error: "Field cannot be empty" });
    }else{
        try {
            await Offer.findOne({ name: name }).then(async (offer) => {
                if(!offer)
                {
                    const newOffer = new Offer({
                        name, 
                        description, 
                        percentage, 
                        offerStartTime, 
                        offerEndTime, 
                        offerImage
                    })
    
                    await newOffer.save().then((cart) => res.status(201).json(cart))
                                        .catch(err => res.status(500).json({ error: err.message }));
                }else{
                    try {
                        await Offer.findOneAndUpdate({ name:name }, {
                            description, 
                            percentage, 
                            offerStartTime, 
                            offerEndTime, 
                            offerImage
                        },
                        { returnOriginal: false },
                        (err, docs) => {
                            if (err) {
                                res.status(404).json({ error: "Unexpected error! Try again later." });
                            } else {
                                res.status(200).json(docs);
                            }
                        });
                    }catch(error){
                        res.status(500).json({ error: "Unable to create offer" });
                    }
                }
            });
        }catch(error){
            res.status(500).json({ error: "Unable to create offer" });
        }
    }
}

exports.getOffers = async (req, res) => {
    try {
        await Offer.find().then((offer) => {
            if(offer)
            {
                res.status(200).json(offer);
            }else{
                res.status(400).json({ error: "Not Found" });
            }
        });
    }catch(error){
        res.status(400).json({ error: "Unable to get offer" });
    }
}

exports.deleteOffer = async (req, res) => {
    try {
        await Offer.findByIdAndRemove(req.params.id);
        res.status(200).json({ success: "Successfully deleted Offer" });
    }catch(error){
        res.status(500).json({ error: "Unable to delete offer" });
    }
}