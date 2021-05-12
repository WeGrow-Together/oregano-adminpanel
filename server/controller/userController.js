var Userdb = require('../model/model');

//create and save user
exports.create = async(req, res) => {
    //validate request
    const { name, email, mobile } = req.body;

    if (!name || !email || !mobile) {
        res.status(400).json({ message: "Content can not be empty!" });
        return;
    } else {
        //new user
        try {
            Userdb.findOne({ mobile: mobile }).then(async(savedUser) => {
                if (savedUser) {
                    res.status(409).json({ error: "User exists" });
                } else {
                    const user = new Userdb({
                        name: req.body.name,
                        email: req.body.email,
                        mobile: req.body.mobile
                    })
                    try {
                        await user.save();
                        res.status(201).json({ success: "Successfully created user" });
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

//create and save user from Admin
exports.createAdmin = async(req, res) => {
    //validate request
    const { name, email, mobile, address } = req.body;

    if (!name || !email || !mobile) {
        res.status(400).json({ message: "Content can not be empty!" });
        return;
    } else {
        //new user
        try {
            Userdb.findOne({ mobile: mobile }).then(async(savedUser) => {
                if (savedUser) {
                    res.status(409).json({ error: "User exists" });
                } else {
                    const user = new Userdb({
                        name: req.body.name,
                        email: req.body.email,
                        mobile: req.body.mobile,
                        address: req.body.address
                    })
                    try {
                        await user.save();
                        res.status(201).json({ success: "Successfully created user" });
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

//retrieve and return all users / retrieve and return a single user
exports.findOne = (req, res) => {
    const id = req.params.id;
    Userdb.findById(id)
        .then(data => {
            if (!data) {
                res.status(404).json({
                    message: "Not found user with is  id" + id
                })
            } else {
                res.json(data)
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Error while retrieving user with id" + id })
        })
}

// Update single user
exports.update = (req, res) => {
    const { name, email, mobile } = req.body;
    const id = req.params.id;

    if (!name || !email || !mobile ) {
        res.status(400).json({ message: "Content can not be empty!" });
        return;
    } else {
        Userdb.findByIdAndUpdate(id, {
            name: name,
            email: email,
            mobile: mobile
        }, (err, docs) => {
            if (err) {
                res.status(400).json({ error: err });
            } else {
                res.status(200).json({ success: "Updated" });
            }
        })
    }
}

// Update single user from admin
exports.updateAdmin = (req, res) => {
    const { name, email, mobile, address } = req.body;
    const id = req.params.id;

    if (!name || !email || !mobile ) {
        res.status(400).json({ message: "Content can not be empty!" });
        return;
    } else {
        Userdb.findByIdAndUpdate(id, {
            name: name,
            email: email,
            mobile: mobile,
            address: address
        }, (err, docs) => {
            if (err) {
                res.status(400).json({ error: err });
            } else {
                res.status(200).json({ success: "Updated" });
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

//Phone Number login verification
exports.login = async(req, res) => {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
        res.status(400).json({ error: "Please provide phone number" });
    } else {
        try {
            Userdb.findOne({ mobile: phoneNumber }).then((savedUser) => {
                if (!savedUser) {
                    res.status(409).json({ error: "User does not exist" });
                } else {
                    res.status(200).json(savedUser);
                }
            })
        } catch (err) {
            res.status(500).json({ error: "Unable to create user" });
        }
    }
}

// Update single user address
exports.updateAddress = (req, res) => {
    const { address } = req.body;
    const id = req.params.id;

    if (!address) {
        res.status(400).json({ error: "Content can not be empty!" });
        return;
    } else {
        Userdb.findByIdAndUpdate(id, {
            address: address
        }, (err, docs) => {
            if (err) {
                res.status(400).json({ error: "Unable to update Address" });
            } else {
                res.status(200).json({ success: "Successfull added address" });
            }
        })
    }
}