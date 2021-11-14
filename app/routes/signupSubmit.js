var express = require('express');
var router = express.Router();
var fs = require('fs');
let users = require('../database_functions.js')

function checkPassword(password) {
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/.test(password)) {
        return true;
    }
    return false;
}

function checkAccount(email) {
    let flag = true;
    let findUser = 'SELECT * FROM USERS WHERE email = ?';

    users.db.get(findUser, email, function (err, user) {
        console.log(user);
        if (err) {
            console.log(err);
            return;
        }
        if (!user) {
            console.log('not found');
            return;
        }

        if(user.password == password){
            flag = false;
        }  
    });

    console.log(flag);
    return flag;
}

router.post('/', function(req, res, next) {
    
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var password = req.body.password;
    var confirm_password = req.body.confirm_password;

    if (password != confirm_password) {
        var error = "Passwords do not match. Please try again.";
        res.render('error_signup', {error:error});
    }
    else if (!checkPassword(password)){
        var error = "Passwords must be between 8 to 20 characters long and contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character. Please try again.";
        res.render('error_signup', {error:error});
    }
    else if (!checkAccount(email)) {
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
        
        db.createUser(user.first_name, user.last_name, user.email, user.password);

        res.render('account_created', { first_name : first_name, last_name: last_name});
    }
});

module.exports = {router:router, checkAccount:checkAccount, checkPassword:checkPassword}

