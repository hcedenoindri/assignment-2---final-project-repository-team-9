var express = require('express');
var router = express.Router();
const passport = require('passport');


router.post('/', (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: '/dashboard',
		failureRedirect: '/error_login'
	})(req, res, next);


});

// router.post('/', (req, res, next) => {
    
//   // TODO: password and email init as undefined
//   var password = req.body.password;
//   var email = req.body.email;
//   var found_flag = false;
  
//   console.log(" Email: " + email + " Password: " + password);

//   'use strict';

//   let rawdata = fs.readFileSync('users.json');
//   let users = JSON.parse(rawdata);
//   console.log(users);

//   for (var index = 0; index < users.length; ++index) {
//       var user = users[index];
     
//       if(user.email === email && user.password === password) {
//         found_flag = true;
//         break;
//       }

//       found_flag = false;
//   }

//   if (found_flag) {
//     res.render(confirmation, users);
//   }
//   else {
//     // TODO: error message instead of interface
//     var error = "Invalid email or password.";
//     res.render('error_login', {error:error} );
//   }
// });

module.exports = router;