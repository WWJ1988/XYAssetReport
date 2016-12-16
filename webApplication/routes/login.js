exports.postLogin = function (req, res) {
    var request = require("request");

    request({
        url: "http://localhost:8899/api/Login",
        method: "POST",
        json: true,
        body: {
            userName: req.body.username,
            password: req.body.password
        }
    }, function (error, response, body) {
        if (!error) {
            req.session.user = req.body.username;
            res.redirect('/');
        }
        else {
            req.session.user = null;
            res.render('login', { errorMessage: "Login failed." })
        }
    });
};

exports.login = function (req, res) {
    res.render('login', { title: 'Login' });
}