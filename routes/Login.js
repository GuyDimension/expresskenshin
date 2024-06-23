var express = require('express');
var router = express.Router();
var connection = require('../library/database'); //ganti database mksudnya gimana?
var bcrypt = require('bcrypt'); // install ketik pnpm install bcrypt

router.get('/Login', function(req, res, next) {
  res.render('Login', { title: 'Login' });
});

router.post('/', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  connection.query('SELECT * FROM user WHERE email = ?', [username], function(err, results) {
    if (err) {
      console.error('Database query error: ' + err.stack);
      return res.redirect('/Login');
    }

    if (results.length > 0) {
      var user = results[0];
      bcrypt.compare(password, user.password, function(err, isMatch) {
        if (err) {
          console.error('Error comparing passwords: ' + err.stack);
          return res.redirect('/Login');
        }

        if (isMatch) {
          if (user.email === 'admin@gmail.com') {
            req.session.user = { username: user.email, role: 'admin' };
            res.redirect('/form');
          } else {
            req.session.user = { username: user.email, role: 'user' };
            res.redirect('/frontend');
          }
        } else {
          res.redirect('/Login');
        }
      });
    } else {
      res.redirect('/Login');
    }
  });
});

module.exports = router;
