var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/', function(req, res, next) {
    let userInfo = req.user;
    // res.render('dashboard', {userInfo});
    axios.get('https://api.nomics.com/v1/currencies/ticker?key=2b128e6260e7cd4c7aa84266e91583748dfa6f47')
    .then(function (response) {
        for (var c in response.data) {
            response.data[c].price = parseFloat(response.data[c].price).toFixed(2);
        }
        res.render('dashboard', {userInfo, currencies: response.data});
        //Math.floor(Math.random() * qoute.length)
        // let aQoute = qoute.data[Math.floor(Math.random() * qoute.data.length)];
        // console.log(aQoute);
        // res.render('login', {data: aQoute });
    })
    .catch(function (error) {
        // handle error
        console.log(error);
        res.render('dashboard', {userInfo});
    })
    // setInterval(updatePrices(res, userInfo), 60 * 1000) // Update prices every 1 minute
});

module.exports = router;