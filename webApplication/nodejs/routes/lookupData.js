var request = require("request");
exports.getLookupData = function (req, res) {
    request({
        url: "http://localhost:8899/api/LookupData/",
        method: "GET",
        headers: req.headers
    }).on('response', function (response) {
        var data = "";
        response.setEncoding('utf8');
        response.on('data', function (responseData) {
            data += responseData;
        });
        response.on('end', function () {
            res.status(response.statusCode).send(data);
        });
    });
}