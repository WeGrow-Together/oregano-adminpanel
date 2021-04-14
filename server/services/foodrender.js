const axios = require("axios");

exports.listFoods = (req, res) => {
    axios.get('http://localhost:3000/api/foods/company/' + req.query.id)
        .then((response) => {
            // console.log(response)
            res.render('foodsection', {
                food: response.data
            });
        })
        .catch(err => {
            res.send(err);
        })
}
exports.addFoods = (req, res) => {
    res.render('addFoodSection');
}
exports.updateFoods = (req, res) => {
    axios.get('http://localhost:3000/api/foods/single/' + req.query.id)
        .then(function(foodData) {
            res.render("updateFoodSection", { food: foodData.data })
        })
        .catch(err => {
            res.redirect("/foodsection");
        })
}