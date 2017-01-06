var request = require("request");
exports.brokerService = {
    getBrokers: function (req, res) {
        request({
            url: "http://localhost:8899/api/Broker/",
            method: "GET",
            headers: req.headers
        }).on('response', function (response) {
            var data = "";
            var statueCode = response ? response.statusCode : 404;
            response.setEncoding('utf8');
            response.on('data', function (responseData) {
                data += responseData;
            });
            response.on('end', function () {
                res.status(statueCode).send(data);
            });
        });
    },
    deleteBroker: function (req, res) {
        request({
            url: "http://localhost:8899/api/Broker/" + req.body.brokerID,
            method: "DELETE",
            headers: req.headers
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
            headers: req.headers,
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