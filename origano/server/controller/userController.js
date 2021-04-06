var Userdb = require('../model/model');

//create and save user
exports.create = async(req, res) => {
    //validate request
    const { name, email, date, mobile, rating, amount, status } = req.body;

    if (!name || !email || !date || !mobile || !rating || !amount || !status) {
        res.status(400).json({ message: "Content can not be empty!" });
        return;
    } else {
        //new user
        try {
            Userdb.findOne({ mobile: mobile}).then(async (savedUser) => {
                if(savedUser)
                {
                    res.status(409).json({ error: "User exists" });
                }else{
                    const user = new Userdb({
                        name: req.body.name,
                        email: req.body.email,
                        date: req.body.date,
                        mobile: req.body.mobile,
                        rating: req.body.rating,
                        wallet: req.body.amount,
                        status: req.body.status
                    })
                    try {
                        await user.save();
                        res.redirect("/add_user");
                    } catch (err) {
                        res.status(500).json({ error: "Unable to create user" });
                    }
                }
            })
        } catch (err) {
            res.status(500).json({ error: "Unable to create user" });
        }
    }
}

//retrieve and return all users / retrieve and return a single user
exports.find = (req, res) => {
    //query parameter to retrieve single user from database
    if (req.query.id) {
        const id = req.query.id;
        Userdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).json(
                        {
                            message: "Not found user with is  id" + id
                        })
                } else {
                    res.json(data)
                }
            })
            .catch(err => {
                res.status(500).json({ message: "Error while retrieving user with id" + id })
            })
    } else {
        Userdb.find()
            .then(user => {
                res.json(user)
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message || "Error occured while retrieving user information"
                });
            })
    }
}

// Update single user
exports.update = (req, res) => {
    const { name, email, date, mobile, rating, wallet, status } = req.body;
    const id = req.params.id; 

    if (!name || !email || !date || !mobile || !rating || !wallet || !status) {
        res.status(400).json({ message: "Content can not be empty!" });
        return;
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
                res.redirect("/update_user");
            }
        })
    }
}

//Delete single user
exports.delete = async(req, res) => {
    const id = req.params.id;
    try {
        await Userdb.findByIdAndRemove(id);
        res.status(200).json({ success: "User deleted successfully." });
    } catch (err) {
        res.status.json({ error: "Unable to delete user" });
    }
}