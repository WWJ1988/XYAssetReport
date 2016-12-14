var express = require('express');
var ejs = require('ejs');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/user');
var test = require('./routes/test');
var broker = require('./routes/broker');

var app = express();

// view engine setup
app.engine('html', ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(express.static(__dirname));
app.use(app.router);

app.get('/', routes.index);
app.get('/api/users', test.test);
app.get('/api/broker', broker.brokerList);

module.exports = app;
