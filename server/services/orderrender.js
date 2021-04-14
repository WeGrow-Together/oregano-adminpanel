const axios = require("axios");

exports.orders = (req, res) => {
    axios.get('http://localhost:3000/api/orders/company/' + req.query.id)
        .then((response) => {
            // console.log(response)
            res.render('orders', {
                order: response.data
            });
        })
        .catch(err => {
            res.send(err);
        })
}