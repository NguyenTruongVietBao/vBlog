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
var authRouter = require('./routes/auth');
const { corsOptions } = require('./configs/corsOptions');

var app = express();

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(responseHandler);

app.use('/api', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/posts', postsRouter);

connectDB();

module.exports = app;
