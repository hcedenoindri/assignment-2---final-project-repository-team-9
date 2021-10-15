var express = require('express');
var router = express.Router();
var fs = require('fs');
var users = require('../users.json');
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

router.get('/', function(req, res, next) {
    var anObject = {
        "date": date
    }
    res.render('signup', {anObject});
});

router.post('/', function(req, res, next) {
    
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var password = req.body.password;
    
    if (password.length < 8){
        var error = "Passwords must be at least 8 characters long";
        res.render('error', {error:error});
    }
    else{
        console.log("first_name: " + first_name + "last_name: " + last_name + " Email: " + email + " Password: " + password);

        'use strict';

        let user = { 
            first_name: first_name,
            last_name: last_name, 
            email: email,
            password: password
        };
        
        users.push(user);
        let data = JSON.stringify(users);
        fs.writeFileSync('users.json', data);

        // res.render('confirmation', { first_name : first_name, last_name: last_name});
    }
});

module.exports = router;