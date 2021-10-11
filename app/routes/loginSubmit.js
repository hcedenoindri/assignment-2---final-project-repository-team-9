var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.post('/', function(req, res, next) {
    
    var password = req.body.password;
    var email = req.body.email;
    
    console.log(" Email: " + email + " Password: " + password);

    'use strict';

    let rawdata = fs.readFileSync('users.json');
    let users = JSON.parse(rawdata);
    console.log(users);

    for (var index = 0; index < users.length; ++index) {

        var user = users[index];
       
        if(user.email == email && user.password == password){
          res.render('confirmation', {first_name:user.first_name, last_name:user.last_name})
        }
        else{
          var error = "Incorrect email or password";
          res.render('error', {error: error} );
        }
    }

});

module.exports = router;