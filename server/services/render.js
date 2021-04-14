const axios = require("axios");

//user part

exports.homeRoutes = (req, res) => {
    //make a get request to/api/users
    axios.get('http://localhost:3000/api/users')
        .then(function(response) {
            // console.log(response)
            res.render('index', {
                users: response.data
            });
        })
        .catch(err => {
            res.send(err);
        })

}
exports.add_user = (req, res) => {
    res.render('add_user');
}
exports.update_user = (req, res) => {
    axios.get('http://localhost:3000/api/users', { params: { id: req.query.id } })
        .then(function(userdata) {
            res.render("update_user", { user: userdata.data })
        })
        // res.render('update_user');
        .catch(err => {
            res.send(err);
        })
}

//provider part

exports.providerRoutes = (req, res) => {
    //make a get request to/api/users
    axios.get('http://localhost:3000/api/providers')
        .then(function(response) {
            // console.log(response)
            res.render('provider', {
                provider: response.data
            });
        })
        .catch(err => {
            res.send(err);
        })

}

exports.add_provider = (req, res) => {
    res.render('add_provider');
}

exports.update_provider = (req, res) => {
    axios.get('http://localhost:3000/api/providers', { params: { id: req.query.id } })
        .then(function(providerdata) {
            res.render("update_provider", { provider: providerdata.data })
        })

    .catch(err => {
        res.send(err);
    })
}