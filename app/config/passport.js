const LocalStrategy = require('passport-local').Strategy;
var db = require('../database_functions.js');

module.exports = function(passport) {
    console.log("Passport Function triggered");
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function(username, password, done) {
        console.log(username);
        console.log(password);
        
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