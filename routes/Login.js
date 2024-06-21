var express = require('express');
var router = express.Router();

// Menampilkan halaman login
router.get('/Login', function(req, res) {
  res.render('Login'); // Render view 'login.ejs'
});

// Memproses data login
router.post('/Login', function(req, res) {
  const { username, password } = req.body;

  // Lakukan validasi dan autentikasi
  if (username === 'user' && password === 'password') { // Contoh validasi sederhana
    // Jika berhasil login, redirect ke halaman beranda atau dashboard
    res.redirect('/');
  } else {
    // Jika gagal login, kembali ke halaman login dengan pesan error
    res.render('Login', { error: 'Invalid username or password' });
  }
});

module.exports = router;