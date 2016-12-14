exports.brokerList = function (req, res) {
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
};