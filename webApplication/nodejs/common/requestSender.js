exports.sendRequest = function (options, req, res) {
    var request = require("request");
    
    if (req.headers.authorization) {
        options.headers = {
            authorization: req.headers.authorization
        };
    }

    request(options)
        .on('response', function (response) {
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
};

exports.sendGetReuqestWithQuery = function(options, req, res, queryData){

}