var request = require("../common/requestSender");
exports.saveFee = function (req, res) {
    request.sendRequest({
        url: "http://localhost:8899/api/Fee/",
        method: "POST",
        json: req.body.fee
    }, req, res)
};

exports.deleteFee = function (req, res) {
    request.sendRequest({
        url: "http://localhost:8899/api/Fee/",
        method: "DELETE",
        json: req.body.fee
    }, req, res)
};