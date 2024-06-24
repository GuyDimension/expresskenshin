var express = require('express');
var router = express.Router();
var connection = require('../library/database');

// Route to render the main frontend page
router.get('/beranda', function(req, res) {
    res.render('frontend/beranda');
});

// Route to render the 'Tentang Kami' page
router.get('/tentang', function(req, res) {
    res.render('frontend/tentang');
});

router.get('/topup', function(req, res) {
    res.render('frontend/topup');
});


module.exports = router;
