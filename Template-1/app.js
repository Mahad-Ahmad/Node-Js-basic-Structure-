var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var adminRouter = require('./src/routes');
const cors = require("cors");

var app = express();

// passport 
require('./src/strategies/passport.auth');

//error handler
const handleError = require('./src/errorHandler/handleError')

// const APIError = require("./APIError")

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));
app.use('/uploads', express.static(path.join(__dirname, '/src/uploads')));
var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
app.use(cors(corsOptions));
app.use('/admin', adminRouter);

app.get("/*", function (req, res) {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Handle errors.
app.use(handleError);

module.exports = app;
