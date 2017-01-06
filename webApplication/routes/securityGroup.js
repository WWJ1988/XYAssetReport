var request = require("request");
exports.securityGroupService = {
    getSecurityGroups: function (req, res) {
        request({
            url: "http://localhost:8899/api/SecurityGroup/",
            method: "GET",
            headers: req.headers
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
    deleteSecurityGroup: function (req, res) {
        request({
            url: "http://localhost:8899/api/SecurityGroup/" + req.body.securityGroupId,
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
    saveSecurityGroup: function (req, res) {
        request({
            url: "http://localhost:8899/api/SecurityGroup",
            method: "POST",
            headers: req.headers,
            json: req.body.securityGroup
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