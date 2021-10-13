const express = require('express');
const router = express.Router();
const port = 3000;

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index', { title: 'Express' });
});

console.log(`App listening on port ${port}!`);
module.exports = router;
