var Userdb = require('../model/modelprovider');


exports.create = async(req, res) => {
    //validate request
    const { name, email, mobile } = req.body;

    if (!name || !email || !mobile ) {
        res.status(400).send({ message: "Content can not be empty!" });
    } else {
        //new user
        const provider = new Userdb({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile
        })
        try {
            await provider.save();
            res.status(201).json({ success: "Provider Created" });
        } catch (err) {
            res.status(400).json({ error: "Unable to create user" });
        }
    }
}




exports.find = (req, res) => {

    //query parameter to retrieve single user from database
    if (req.query.id) {

        const id = req.query.id;

        Userdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send(

                        {
                            message: "Not found provider with is  id" + id
                        })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error while retrieving provider with id" + id })
            })

    } else {
        Userdb.find()
            .then(provider => {
                res.send(provider)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Error occured while retrieving provider information"
                });
            })
    }


}

exports.update = (req, res) => {
    const { email, name, date, mobile, rating, wallet, status } = req.body;
    const id = req.params.id; //we gonna get the id of user from router page api route,using this params object

    if (!name || !email || !date || !mobile || !rating || !wallet || !status) {
        res.status(400).send({ message: "Content can not be empty!" });
    } else {
        Userdb.findByIdAndUpdate(id, {
            name: name,
            email: email,
            date: date,
            mobile: mobile,
            rating: rating,
            wallet: wallet,
            status: status
        }, (err, docs) => {
            if (err) {
                res.status(400).json({ error: err });
            } else {
                // res.status(200).json({ success: "Updated" });
                res.redirect("/update_provider?id=" + id);
            }
        })
    }
}

// Get single provider
exports.getOne = async(req, res) => {
    const { id } = req.params;
    try {
        await Order.findById(id).then(async(savedOrder) => {
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

exports.delete = async(req, res) => {
    const id = req.params.id;

    await Userdb.findByIdAndRemove(id);

    res.status(200).json({ success: "User deleted successfully." });
}