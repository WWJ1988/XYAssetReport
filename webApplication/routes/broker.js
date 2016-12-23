var request = require("request");
exports.brokerService = {
    getBrokers: function (req, res) {
        var http = require("http");

        var options = {
            hostname: "localhost",
            port: 8899,
            path: "/api/Broker",
            method: "GET"
        };

        var httpReq = http.request(options, function (response) {
            var data;
            response.setEncoding('utf8');
            response.on('data', function (responseData) {
                data = responseData;
            });
            response.on('end', function () {
                res.send(data);
            });
        });

        httpReq.end();
    },
    deleteBroker: function (req, res) {
        request({
            url: "http://localhost:8899/api/Broker/" + req.body.brokerID,
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
    saveBroker: function (req, res) {
        request({
            url: "http://localhost:8899/api/Broker",
            method: "POST",
            json: req.body.broker
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