var request = require("request");

exports.user = {
    getUser: function (req, res) {
        request({
            url: "http://localhost:8899/api/User/",
            method: "GET",
            headers: req.headers
        }).on("response", function (response) {
            var data = "";
            response.setEncoding('utf8');
            response.on('data', function (resData) {
                data += resData;
            });
            response.on('end', function () {
                res.status(response.statusCode).send(data);
            });
        })
    },
    deleteUser: function (req, res) {
        request({
            url: "http://localhost:8899/api/User/" + req.body.userId,
            method: "DELETE",
            headers: req.headers
        }).on('response', function (response) {
            response.setEncoding('utf8');
            response.on('end', function () {
                res.status(response.statusCode).send(response);
            });
        });
    },
    saveUser: function (req, res) {
        request({
            url: "http://localhost:8899/api/Security",
            method: "POST",
            headers: req.headers,
            json: req.body.security
        }).on('response', function (response) {
            var data = "";
            response.setEncoding('utf8');
            response.on('data', function (resData) {
                data += resData;
            });
            response.on('end', function () {
                res.status(response.statusCode).send(data);
            });
        });
    }
}
