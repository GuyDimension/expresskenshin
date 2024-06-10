var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/joki', function(req, res) {
  res.render('joki');
});


module.exports = router;
