const LocalStrategy = require('passport-local').Strategy;
var fs = require('fs');
var db = require('../database_functions.js');

module.exports = function(passport) {
    console.log("Passport Function triggered");
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function(username, password, done) {
        let users_fd = fs.openSync('users.json');
        let rawdata = fs.readFileSync('users.json');
        let users = JSON.parse(rawdata);
        fs.closeSync(users_fd);
        console.log(username);
        console.log(password);

        // let found_flag = false;
        // let found_user = null;
        // users.forEach( (user) => {
        //     console.log(user.email);

        //     if(user.email == username && user.password == password){
        //         found_user = user;
        //         found_flag = true;
        //     }
        // });

        // if(found_flag){
        //     done(null, found_user);
        // }
        
        let findUser = 'SELECT * FROM users WHERE email = ?';
        db.db.get(findUser, username, function (err, user) {
            console.log(user);
            if (err) {
                console.log(err);
                done(null, false);
            }
            else if (!user) {
                console.log(username)
                console.log('not found');
                done(null, false);
            }
            else if(user.password == password){
                done(null, user);
                // console.log(found_user);
            }  
        });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user); 
    });

    passport.deserializeUser(function(user, done) {
        done(null, user); //you can access with req.user
    });

}