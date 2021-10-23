var express = require('express');
var router = express.Router();
var fs = require('fs');

router.post('/', function(req, res, next) {
    
    var email = req.body.email;
    let users_fd = fs.openSync('users.json');
    let rawdata = fs.readFileSync('users.json');
    let users = JSON.parse(rawdata);
    console.log(users);

    users = users.filter(u => u[email] !== email);

    let data = JSON.stringify(users);
    fs.writeFileSync('users.json', data);
    fs.closeSync(users_fd);

    res.render('account_deleted');
});

module.exports = router;


