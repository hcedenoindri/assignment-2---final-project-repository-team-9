var express = require('express');
var router = express.Router();
var fs = require('fs');


function checkPassword(password) {
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/.test(password)) {
        return true;
    }
    return false;
}

function checkAccount(email, users) {
    console.log(users);
  
    for (var index = 0; index < users.length; ++index) {
        var user = users[index];
       
        if(user.email === email) {
            return false;
        }
    }
    return true;
}

router.post('/', function(req, res, next) {
    
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var password = req.body.password;
    var confirm_password = req.body.confirm_password;
    let rawdata = fs.readFileSync('users.json');
    let users = JSON.parse(rawdata);

    if (password != confirm_password) {
        var error = "Passwords do not match. Please try again.";
        res.render('error_signup', {error:error});
    }
    else if (!checkPassword(password)){
        var error = "Passwords must be between 8 to 20 characters long and contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character. Please try again.";
        res.render('error_signup', {error:error});
    }
    else if (!checkAccount(email, users)) {
        var error = "An account associated with the email address you entered already exists. Please try again.";
        res.render('error_signup', {error:error});
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

        res.render('account_created', { first_name : first_name, last_name: last_name});
    }
});

module.exports = {router, checkPassword};