const axios = require("axios");


exports.businessRoutes = (req, res) => {

    res.render('business');
}

exports.addbusiness = (req, res) => {
    res.render('addbusiness');
}

exports.updatebusiness = (req, res) => {
    res.render('updatebusiness');
}