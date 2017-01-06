var express = require('express');
var ejs = require('ejs');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var routes = require('./routes/index');
var login = require('./routes/login');
var userService = require("./routes/user");
var broker = require('./routes/broker');
var security = require('./routes/security');
var securityGroup = require('./routes/securityGroup');
var userFunction=require('./routes/userFunction');
var department = require('./routes/department');

var app = express();

// view engine setup
app.engine('html', ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(express.bodyParser());
app.use(express.static(__dirname));
app.use(cookieParser());
app.use(session({
    secret: "keyboard cat",
    name: "username",
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true
}));

// app.use(function (req, res, next) {
//     var url = req.originalUrl;
//     if (url != "/api/login" && !req.session.user) {
//         return res.redirect("/login");
//     }
//     next();
// });

app.get('/', routes.index);
app.post('/api/login', login.postLogin);
app.post('/api/login/health', login.checkHealth);

app.get("/api/userFunction", userFunction.getFunctions);

app.get("/api/user", userService.user.getUser);
app.post("/api/user", userService.user.saveUser);
app.delete("/api/user", userService.user.deleteUser);

app.get('/api/broker', broker.brokerService.getBrokers);
app.delete('/api/broker', broker.brokerService.deleteBroker);
app.post('/api/broker', broker.brokerService.saveBroker)

app.get('/api/security', security.securityService.getSecurities);
app.delete('/api/security', security.securityService.deleteSecurity);
app.post('/api/security', security.securityService.saveSecurity)

app.get('/api/securityGroup', securityGroup.securityGroupService.getSecurityGroups);
app.delete('/api/securityGroup', securityGroup.securityGroupService.deleteSecurityGroup);
app.post('/api/securityGroup', securityGroup.securityGroupService.saveSecurityGroup)

app.get("/api/department",department.departmentService.getDepartments);
app.delete("/api/department",department.departmentService.deleteDepartment);
app.post("/api/department",department.departmentService.saveDepartment);

module.exports = app;
