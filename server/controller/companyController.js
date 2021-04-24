const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
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

//create company
exports.createCompany = async(req, res) => {
    const {
        companyName,
        ownerName,
        email,
        phoneNumber,
        tradeLicense,
        typeOfCompany,
        panCardNumber,
        panCardImage,
        agreementCopy,
        businessLocation,
        businessAddress,
        noOfEmployees,
        gstNumber,
        accountNumber,
        ifscCode,
        typeOfService,
        dateOfEstablishment
    } = req.body;

    if (!companyName || !ownerName || !email || !phoneNumber || !tradeLicense || !typeOfCompany || !panCardNumber || !panCardImage || !agreementCopy || !businessLocation || !businessAddress || !noOfEmployees || !accountNumber || !ifscCode || !typeOfService || !dateOfEstablishment) {
        res.status(422).json({ error: "Please add all the fileds" });
    } else {
        //new company
        try {
            Admin.findOne({ phoneNumber: phoneNumber }).then(async(savedAdmin) => {
                if (savedAdmin) {
                    res.status(409).json({ error: "Admin already exists" });
                } else {
                    // hashing password 
                    bcrypt.hash(phoneNumber, 12).then(async(hashedPassword) => {
                        try {
                            const company = new Admin({
                                companyName,
                                ownerName,
                                email,
                                phoneNumber,
                                tradeLicense,
                                typeOfCompany,
                                panCardNumber,
                                panCardImage,
                                agreementCopy,
                                businessLocation,
                                businessAddress,
                                noOfEmployees,
                                gstNumber,
                                accountNumber,
                                ifscCode,
                                typesOfService: typeOfService,
                                dateOfEstablishment,
                                password: hashedPassword,
                                role: "company"
                            })
                            try {
                                await company.save();
                                res.status(201).json({ success: "Company created successfully" });
                            } catch (err) {
                                res.status(500).json({ error: "Unable to create Company" });
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

// Admin Login
exports.adminLogin = async(req, res) => {
    const { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
        res.status(400).json({ error: "Content can not be empty!" });
    } else {
        //new admin
        try {
            Admin.findOne({ phoneNumber: phoneNumber }).then(async(savedAdmin) => {
                if (savedAdmin) {
                    // password validation 
                    bcrypt
                        .compare(password, savedAdmin.password)
                        .then((doMatch) => {
                            if (doMatch) {
                                res.status(200).json(savedAdmin);
                            } else {
                                res.status(422).json({ error: "Invalid Password" });
                            }
                        })
                        .catch((err) => {
                            res.status(422).json({ error: "Unable to Process" });
                        });
                } else {
                    res.status(404).json({ error: "Invalid User" });
                }
            })
        } catch (err) {
            res.status(500).json({ error: "Unable to login admin" });
        }
    }
}

// Get all company
exports.getAllCompanies = async(req, res) => {
    try {
        Admin.find({ role: "company" }).then(async(savedAdmin) => {
            if (savedAdmin) {
                res.status(200).json(savedAdmin);
            } else {
                res.status(404).json({ error: "No Records Found" });
            }
        })
    } catch (err) {
        res.status(500).json({ error: "Unable to get companies" });
    }
}

// Get single company
exports.getCompany = async(req, res) => {
    const { id } = req.params;
    try {
        Admin.findById(id).then(company => {
            if (!company) {
                res.status(404).json({ error: "Invalid Company" });
            } else {
                res.status(200).json(company);
            }
        });
    } catch (error) {
        res.status(404).json({ error: "Unable to get company" });
    }
}

// Update company
exports.updateCompany = async(req, res) => {
    const {
        companyName,
        ownerName,
        email,
        phoneNumber,
        tradeLicense,
        typeOfCompany,
        cuisine,
        panCardNumber,
        panCardImage,
        agreementCopy,
        businessLocation,
        businessAddress,
        noOfEmployees,
        gstNumber,
        accountNumber,
        ifscCode,
        typeOfService,
        dateOfEstablishment
    } = req.body;
    const { id } = req.params;

    if (!companyName || !ownerName || !email || !phoneNumber || !tradeLicense || !typeOfCompany || !panCardNumber || !panCardImage || !agreementCopy || !businessLocation || !businessAddress || !noOfEmployees || !accountNumber || !ifscCode || !typeOfService || !dateOfEstablishment) {
        res.status(422).json({ error: "Please add all the fileds" });
    } else {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No company with id: ${id}`);
        try {
            Admin.findByIdAndUpdate(id, {
                companyName,
                ownerName,
                email,
                phoneNumber,
                tradeLicense,
                typeOfCompany,
                panCardNumber,
                panCardImage,
                agreementCopy,
                businessLocation,
                businessAddress,
                noOfEmployees,
                gstNumber,
                accountNumber,
                ifscCode,
                typeOfService,
                dateOfEstablishment,
                cuisine
            }, (err, docs) => {
                if (err) {
                    res.status(404).json({ error: "Unexpected error! Try again later." });
                } else {
                    res.status(200).json({ success: "Successfully updated company" });
                }
            });
        } catch (error) {
            res.status(404).json({ error: "Unable to get company" });
        }
    }
}

// Delete single company
exports.deleteCompany = async(req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No company with id: ${id}`);
        await Admin.findByIdAndRemove(id);
        res.status(200).json({ success: "Company Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Unable to get companies" });
    }
}