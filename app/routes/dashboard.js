var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET users listing. */
router.get('/', function(req, res, next) {
    let userInfo = req.user;
    console.log(req.user);

    setInterval(updatePrices, 60 * 1000) // Update prices every 1 minute
});

async function updatePrices() {
    axios.get('https://api.nomics.com/v1/markets?key=2b128e6260e7cd4c7aa84266e91583748dfa6f47')
    .then(function (response) {
        // // handle success
        
        // let qoute = response;
        // //Math.floor(Math.random() * qoute.length)
        // let aQoute = qoute.data[Math.floor(Math.random() * qoute.data.length)];
        // console.log(aQoute);
        // res.render('login', {data: aQoute });
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        res.render('dashboard', {userInfo});
    });
}

module.exports = router;