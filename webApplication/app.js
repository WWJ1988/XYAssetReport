var express = require('express');
var ejs = require('ejs');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var routes = require('./routes/index');
var login = require('./routes/login');
var broker = require('./routes/broker');

var app = express();

// view engine setup
app.engine('html', ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(express.bodyParser());
app.use(express.static(__dirname));
app.use(cookieParser());
app.use(session({
    secret:"keyboard cat",
    name: "username",
    cookie:{maxAge: 60000},
    resave: true,
    saveUninitialized: true
}));

app.use(function (req, res, next) {
    var url = req.originalUrl;
    if (url != "/login" && url != "/api/login" && !req.session.user) {
        return res.redirect("/login");
    }
    next();
});

app.get('/', routes.index);
app.get('/login', login.login);
app.post('/api/login', login.postLogin);
app.get('/api/broker', broker.brokerList);

module.exports = app;
