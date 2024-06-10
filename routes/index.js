var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/joki', function(req, res) {
  res.render('joki');
});

router.get('/giftskin', function(req,res){
  res.render('giftskin');
});

router.get('/starlight', function(req, res) {
  res.render('starlight');
});

router.get('/weeklydiamondpass', function(req, res) {
  res.render('weeklydiamondpass');
});

router.get('/topup', function(req, res) {
  res.render('topup');
});



module.exports = router;
