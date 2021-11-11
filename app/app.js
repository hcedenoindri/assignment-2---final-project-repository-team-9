var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');

var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var signupSubmitRouter = require('./routes/signupSubmit');
var loginSubmitRouter = require('./routes/loginSubmit');
var dashboardRouter = require('./routes/dashboards');
var userProfileRouter = require('./routes/userProfile');
var errorLoginRouter = require('./routes/error_login');
var deleteSubmitRouter = require('./routes/deleteSubmit');
var editSubmitRouter = require('./routes/editSubmit');

var app = express();

require('./config/passport')(passport);

var session_config = {
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
};

session_config.cookie.secure = false;
app.use(session(session_config))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', loginRouter);
app.use('/signup', signupRouter);
app.use('/signupSubmit', signupSubmitRouter.router);
app.use('/loginSubmit', loginSubmitRouter);
app.use('/dashboard', dashboardRouter);
app.use('/userProfile', userProfileRouter);
app.use('/error_login', errorLoginRouter);
app.use('/deleteSubmit', deleteSubmitRouter);
app.use('/editSubmit', editSubmitRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
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
