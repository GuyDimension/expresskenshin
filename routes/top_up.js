var express = require('express');
var router = express.Router();
var connection = require('../library/database');

// Route untuk menampilkan semua data top_up
router.get('/', (req, res, next) => {
  connection.query('SELECT * FROM top_up', (err, rows) => {
    if (err) {
      req.flash('error', err);
      res.render('top_up/index', { data: [] }); // Mengirimkan array kosong jika terjadi error
    } else {
      res.render('top_up/index', { data: rows }); // Mengirimkan data rows ke template EJS
    }
  });
});


// router.get('/api/top_up', (req, res, next) => {
//   connection.query('SELECT * FROM top_up', (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//     } else {
//       res.json({ data: rows });
//     }
//   });
// });

router.get('/create', (req, res, next) => {
  res.render('top_up/create', {
    amount: '',
    price: ''
  });
});

router.post('/create', (req, res, next) => {
    var { amount, price } = req.body;
    var form_data = { amount, price };
  
    connection.query('INSERT INTO top_up SET ?', form_data, (err, result) => {
      if (err) {
        req.flash('error', 'Error in adding the top-up');
        res.render('top_up/create', {
          amount: form_data.amount,
          price: form_data.price,
          messages: req.flash()
        });
      } else {
        req.flash('success', 'Top-up added successfully!');
        res.redirect('/top_up');
      }
    });
  });
  

router.get('/edit/:id', (req, res, next) => {
  var id = req.params.id;

  connection.query('SELECT * FROM top_up WHERE id = ' + id, (err, rows) => {
    if (err) throw err;

    if (rows.length <= 0) {
      req.flash('error', 'top_up not found with id = ' + id);
      res.redirect('/top_up');
    } else {
      res.render('top_up/edit', {
        id: rows[0].id,
        amount: rows[0].amount,
        price: rows[0].price
      });
    }
  });
});

router.post('/update/:id', (req, res, next) => {
  var id = req.params.id;
  var { amount, price } = req.body;
  var form_data = { amount, price };

  connection.query('UPDATE top_up SET ? WHERE id = ' + id, form_data, (err, result) => {
    if (err) {
      req.flash('error', err);
      res.render('top_up/edit', {
        id: req.params.id,
        amount: form_data.amount,
        price: form_data.price
      });
    } else {
      req.flash('success', 'top up updated successfully!');
      res.redirect('/top_up');
    }
  });
});

router.get('/delete/:id', (req, res, next) => {
  var id = req.params.id;

  connection.query('DELETE FROM top_up WHERE id = ' + id, (err, result) => {
    if (err) {
      req.flash('error', err);
      res.redirect('/top_up');
    } else {
      req.flash('success', 'top_up deleted successfully! id = ' + id);
      res.redirect('/top_up');
    }
  });
});

module.exports = router;
