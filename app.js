var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var session = require('express-session');
var flash = require('connect-flash');

// Inisialisasi aplikasi Express
var app = express();

// Inisialisasi koneksi database
let connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE
});

connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("MySQL Connected...");
  }
});

// Middleware untuk session dan flash messages
app.use(session({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

// Middleware untuk body parser
app.use(express.urlencoded({ extended: false }));

// Global variables untuk flash messages
app.use(function (req, res, next) {
  res.locals.messages = req.flash();
  next();
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route definitions
var postRouter = require('./routes/post');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var LoginRouter = require('./routes/Login');
var registerRouter = require('./routes/register');
var top_upRouter = require('./routes/top_up');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/post', postRouter);
app.use('/top_up', top_upRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
