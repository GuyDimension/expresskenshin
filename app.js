var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');

let connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process. env.DATABASE_PASS,
  database: process.env.DATABASE
});

connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("MySQL Connected...");
  }
});

//Middleware for session and flash messages
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUnlimited: true,
//   cookie: {secure: true}
// }));

//Middleware for body parse
// app.use(bodyParser.urlencoded({extended: false}));

//Global variables for flash messages
// app.use(function(req, res, next) {
//   res.locals.success = req.flash('success');
//   res.locals.error = req.flash('error');
//   next();
// });

var postRouter = require('./routes/post');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var LoginRouter = require('./routes/Login');
var registerRouter = require('./routes/register');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
 
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/Login', LoginRouter);
app.use('/register', registerRouter);
// app.use('/joki', jokiRouter);
app.use('/post', postRouter);

// catch 404 and forward to error handler
app.use(function(req, res) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
