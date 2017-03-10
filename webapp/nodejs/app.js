var express = require('express');
var ejs = require('ejs');
var path = require('path');
var cookieParser = require('cookie-parser');

var index = require("./index");

var app = express();
app.engine('html', ejs.__express);
app.set('view engine', 'html');
app.set('views', path.join(path.parse(__dirname).dir, path.join("app")));

app.use(express.bodyParser());
app.use(express.static(path.join(path.parse(__dirname).dir)));
app.use(cookieParser());

app.get('/', index.index);
app.get('*', function (req, res) {
    res.redirect('/');
});

module.exports = app;