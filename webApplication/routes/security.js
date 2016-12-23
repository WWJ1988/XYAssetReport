var request = require("request");
exports.securityService = {
    getSecurities: function (req, res) {
        request({
            url: "http://localhost:8899/api/Security/",
            method: "GET"
        }).on('response', function (response) {
            var data = "";
            response.setEncoding('utf8');
            response.on('data', function (responseData) {
                data += responseData;
            });
            response.on('end', function () {
                res.send(data);
            });
        });
    },
    deleteSecurity: function (req, res) {
        request({
            url: "http://localhost:8899/api/Security/" + req.body.securityId,
            method: "DELETE"
        }).on('response', function (response) {
            var result = {};
            response.setEncoding('utf8');
            result.statusCode = response.statusCode;
            response.on('data', function (data) {
                result.data = data;
            });
            response.on('end', function () {
                res.send(result);
            });
        });
    },
    saveSecurity: function (req, res) {
        request({
            url: "http://localhost:8899/api/Security",
            method: "POST",
            json: req.body.security
        }, function (error, response, body) {
            if (error) {
                console.log(error);
            }
        }).on('response', function (response) {
            var result = {};
            response.setEncoding('utf8');
            result.statusCode = response.statusCode;
            response.on('data', function (data) {
                result.data = JSON.parse(data);
            });
            response.on('end', function () {
                res.send(result);
            });
        });
    }
}