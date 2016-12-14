/* GET users listing. */
exports.user = function (req, res) {
    var http = require('http');

    var options = {
        host: "localhost",
        port: 8001,
        path: "api/trading/v1/docs/ui/ext"
    };

    var httpReq = http.request(options, function (response) {
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            console.log("body: " + chunk);
        });
        response.on('end', function () {
            res.send('ok');
        });
    });
    httpReq.end();
};
