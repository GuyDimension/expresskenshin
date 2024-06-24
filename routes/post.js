var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var connection = require('../library/database');

// Set Storage
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init Upload
var upload = multer({
    storage: storage,
    limits: { filesize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

// Check File Type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Index Post
router.get('/', function (req, res, next) {
    connection.query('SELECT * FROM top_up ORDER BY id DESC', function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('post/index', { data: '', messages: req.flash('error') });
        } else {
            res.render('post/index', { data: rows, messages: req.flash('success') });
        }
    });
});


// Create Post
router.get('/create', function (req, res, next) {
    res.render('post/create', {
        amount: '',
        price: ''
    });
});

// Store Post
router.post('/store', upload.single('file'), function (req, res, next) {
    var { amount, price } = req.body;

    if (!amount || !price) {
        req.flash('error', 'Silahkan lengkapi semua kolom');
        return res.redirect('/post/create');
    }

    var formData = { amount, price };
    connection.query('INSERT INTO top_up SET ?', formData, function (err, result) {
        if (err) {
            req.flash('error', 'Gagal menyimpan data, silahkan coba lagi.');
            return res.redirect('/post/create');
        } else {
            req.flash('success', 'Data berhasil disimpan');
            return res.redirect('/post');
        }
    });
});

// Edit Post
router.get('/edit/:id', function (req, res, next) {
    let id = req.params.id;

    connection.query('SELECT * FROM top_up WHERE id = ?', [id], function (err, rows, fields) {
        if (err) throw err;

        if (rows.length <= 0) {
            req.flash('error', 'Data post dengan ID ' + id + ' Tidak ditemukan');
            return res.redirect('/post');
        } else {
            res.render('post/edit', {
                id: rows[0].id,
                amount: rows[0].amount,
                price: rows[0].price
            });
        }
    });
});

// Update Post
router.post('/update/:id', upload.single('file'), function (req, res, next) {
    let id = req.params.id;
    let amount = req.body.amount;
    let price = req.body.price;
    let errors = false;

    if (!amount) {
        errors = true;
        req.flash('error', "Silahkan masukkan nominal diamond");
    }

    if (!price) {
        errors = true;
        req.flash('error', "Silahkan masukkan harga");
    }

    if (errors) {
        return res.render('post/edit', {
            id: id,
            amount: amount,
            price: price
        });
    }

    let formData = { amount, price };

    connection.query('UPDATE top_up SET ? WHERE id = ?', [formData, id], function (err, result) {
        if (err) {
            req.flash('error', err);
            return res.render('post/edit', {
                id: id,
                amount: amount,
                price: price
            });
        } else {
            req.flash('success', 'Data berhasil diperbarui');
            return res.redirect('/post');
        }
    });
});

// Delete Post
router.get('/delete/:id', function (req, res, next) {
    let id = req.params.id;

    connection.query('DELETE FROM top_up WHERE id = ?', [id], function (err, result) {
        if (err) {
            req.flash('error', 'Gagal menghapus data, silahkan coba lagi.');
        } else {
            req.flash('success', 'Data berhasil dihapus');
            return res.redirect('/post');
        }
    });
});

module.exports = router;
