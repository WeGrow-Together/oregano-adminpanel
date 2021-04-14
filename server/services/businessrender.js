const axios = require("axios");


exports.businessRoutes = (req, res) => {

    // res.render('business');
    axios.get('http://localhost:3000/api/company/all-companies')
        .then((response) => {
            // console.log(response)
            res.render('business', {
                business: response.data
            });
        })
        .catch(err => {
            res.send(err);
        })
}

exports.addbusiness = (req, res) => {
    res.render('addbusiness');
}

exports.updatebusiness = (req, res) => {
    //res.render('updatebusiness');
    axios.get('http://localhost:3000/api/company/single/' + req.query.id)
        .then(function(businessdata) {
            res.render("updatebusiness", { business: businessdata.data })
        })
        .catch(err => {
            res.redirect("/business");
        })
}

exports.adminLogin = (req, res) => {
    res.render('adminlogin');
}