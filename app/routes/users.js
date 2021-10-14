var express = require('express');
var users = require('../users.json');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', users);
});

module.exports = router;