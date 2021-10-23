var express = require('express');
var router = express.Router();
var fs = require('fs');

function checkPassword(password) {
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/.test(password)) {
        return true;
    }
    return false;
}

function checkAccount(old_email, email, users) {
    console.log(users);
  
    for (var index = 0; index < users.length; ++index) {
        var user = users[index];
       
        if (user.email === old_email) {
            continue;
        }
        if (user.email === email) {
            return false;
        }
    }
    return true;
}

router.post('/', function(req, res, next) {
    
    var first_name = req.body.firstName;
    var last_name = req.body.lastName;
    var old_email = req.body.oldEmail;
    var email = req.body.newEmail;
    var old_password = req.body.oldPassword;
    var valid_old_password = req.body.validOldPassword;
    var password = req.body.newPassword;
    var confirm_password = req.body.confirmNewPassword;
    let users_fd = fs.openSync('users.json');
    let rawdata = fs.readFileSync('users.json');
    let users = JSON.parse(rawdata);

    if (password != confirm_password) {
        var error = "Passwords do not match. Please try again.";
        res.render('error_edit', {error:error});
    }
    else if (valid_old_password !== old_password) {
        var error = "Current password field does not match our records.";
        res.render('error_edit', {error:error});
    }    
    else if (!checkPassword(password)){
        console.log(password);
        var error = "Passwords must be between 8 to 20 characters long and contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character. Please try again.";
        res.render('error_edit', {error:error});
    }
    else if (email !== old_email) {
        if (!checkAccount(email, users)) {
            var error = "An account associated with the email address you entered already exists. Please try again.";
            res.render('error_edit', {error:error});
        }
    }
    else {
        console.log("first_name: " + first_name + "last_name: " + last_name + " Email: " + email + " Password: " + password);

        'use strict';

        let found_user = null;
        users.forEach( (user) => {
            console.log(user.email);

            if(user.email === old_email){
                user.first_name = first_name;
                user.last_name = last_name;
                user.email = email;
                user.password = password;         
                found_user = user;       
            }
        });
        
        let data = JSON.stringify(users);
        fs.writeFileSync('users.json', data);
        fs.closeSync(users_fd);

        res.render('dashboard', {userInfo:found_user});
    }
});

module.exports = router;


