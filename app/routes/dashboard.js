var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    let userInfo = req.user;
    console.log(req.user);

    res.render('dashboard', {userInfo});
});

module.exports = router;