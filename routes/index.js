var express = require('express');
var router = express.Router();
var connection = require('../library/database');

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

router.get('/tentangkami', function(req,res) {
  res.render('tentangkami');
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM top_up ORDER BY id DESC', function (err, rows) {
    if (err) {
      req.flash('error', err);
      res.render('index', {title: 'Express', data: ''});
    } else {
        res.render('index', {title: 'Express', data: rows});
    }
  })
});

module.exports = router;
