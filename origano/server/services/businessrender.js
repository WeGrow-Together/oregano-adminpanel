const axios = require("axios");


exports.businessRoutes = (req, res) => {

    // res.render('business');
    axios.get('http://localhost:3000/create')
        .then(function(response) {
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
    res.render('updatebusiness');
}