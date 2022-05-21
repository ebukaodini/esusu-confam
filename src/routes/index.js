const { response } = require('express');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Welcome to Esusu Confam.\n\nCheckout the documentation @ https://documenter.getpostman.com/view/6884204/UyxoijAT');
});

module.exports = router;