var express = require('express');
var router = express.Router();
var connection = require('../library/database'); 
var bcrypt = require('bcrypt'); // install ketik pnpm install bcrypt

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  connection.query('SELECT * FROM user WHERE email = ?', [username], function(err, results) {
    if (err) {
      console.error('Database query error: ' + err.stack);
      return res.redirect('/login');
    }

    if (results.length > 0) {
      var user = results[0];
      bcrypt.compare(password, user.password, function(err, isMatch) {
        if (err) {
          console.error('Error comparing passwords: ' + err.stack);
          return res.redirect('/login');
        }

        if (isMatch) {
          if (user.email === 'admin@gmail.com') {
            req.session.user = { username: user.email, role: 'admin' };
            res.redirect('/form');//ini page / folder backend kau
          } else {
            req.session.user = { username: user.email, role: 'user' };
            res.redirect('/frontend'); //ini page / folder frontend kau
          }
        } else {
          res.redirect('/login');
        }
      });
    } else {
      res.redirect('/login');
    }
  });
});

module.exports = router;
