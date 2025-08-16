require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var responseHandler = require('./middlewares/responseHandler');
var cors = require('cors');
var connectDB = require('./configs/db');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoriesRouter = require('./routes/category');
var postsRouter = require('./routes/post');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(responseHandler);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/posts', postsRouter);

connectDB();

module.exports = app;
