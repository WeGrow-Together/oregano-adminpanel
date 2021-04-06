var Admin = require('../model/admin');

//create admin
exports.createAdmin = async(req, res) => {
    const { name, email, phoneNumber, password } = req.body;

    if (!name || !email || !phoneNumber || !password) {
        res.status(400).json({ message: "Content can not be empty!" });
    } else {
        //new admin
        try {
            Admin.findOne({ phoneNumber: phoneNumber }).then(async(savedAdmin) => {
                if (savedAdmin) {
                    res.status(409).json({ error: "Admin already exists" });
                } else {
                    // hashing password 
                    bcrypt.hash(password, 12).then(async(hashedPassword) => {
                        try {
                            const admin = new Admin({
                                ownerName: name,
                                email: email,
                                phoneNumber: phoneNumber,
                                password: hashedPassword,
                                role: "superadmin"
                            })
                            try {
                                await admin.save();
                                res.status(201).json({ success: "Admin created successfully" });
                            } catch (err) {
                                res.status(500).json({ error: "Unable to create Admin" });
                            }
                        } catch (err) {
                            res.status(400).json({ error: err.message });
                        }
                    });
                }
            })
        } catch (err) {
            res.status(500).json({ error: "Unable to create user" });
        }
    }
}