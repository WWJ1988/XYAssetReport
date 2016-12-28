var request = require("request");
exports.postLogin = function (req, res) {
    request({
        url: "http://localhost:8899/token",
        method: "POST",
        headers: {
            "Content-Type": "application.json"
        },
        body: "grant_type=password&username=" + req.body.username + "&password=" + req.body.password
    }, function (error, response, body) {
        if (!error && response && response.statusCode == 200) {
            res.status(200).send(response.body);
        }
        else {
            req.session.user = null;
            var status = response ? response.statusCode : 500;
            res.status(status).send("登录失败，请重新登录。");
        }
    });
};

exports.checkHealth = function (req, res) {
    request({
        url: "http://localhost:8899/api/login",
        method: "POST",
        headers: req.headers
    }).on("response", function (response) {
        var data;
        response.setEncoding('utf8');
        response.on('data', function (resData) {
            data = resData;
        });
        response.on('end', function () {
            res.status(response.statusCode).send(data);
        });
    });
}