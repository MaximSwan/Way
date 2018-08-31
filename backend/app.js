var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./db/db.js');
var indexRouter = require('./routes/index');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  next();
});

app.use('/', indexRouter);

app.use((err, req, res, next) => {
  console.error(err);
  
  if (err && err.name && err.name === 'ValidationError') {  
    let errorData = { statusCode: 400, message: '' };
    let validationKey = Object.keys(error.errors);
    validationKey.forEach(key => {
      errorData.message = errorData.message.concat(error.errors[key].message) + ' '
    });
    res.status(errorData.statusCode).send(errorData);
  }
  
  let errorData = {
    statusCode: err && err.statusCode < 500 && err.statusCode || 500,
    message: err && err.statusCode < 500 && err.message || 'Internal server error'
  };

  res.status(errorData.statusCode).send(errorData);
});


module.exports = app;
