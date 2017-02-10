var request = require("../common/requestSender");
exports.getFunctions = function (req, res) {
    request.sendRequest({
        url: "http://localhost:8899/api/UserFunction/",
        method: "GET"
    }, req, res);
};

exports.getFunctionsByUserName = function (req, res) {
    request.sendRequest({
        url: "http://localhost:8899/api/UserFunction/GetByUserName",
        method: "GET"
    }, req, res);
};

exports.saveFunctions = function (req, res) {
    request.sendRequest({
        url: "http://localhost:8899/api/UserFunction/",
        method: "POST",
        json: { UserID: req.body.userId, UserFunctionList: req.body.functions }
    }, req, res);
};