var request = require("../common/requestSender");
exports.securityService = {
    getSecurities: function (req, res) {
        request.sendRequest({
            url: "http://localhost:8899/api/Security/",
            method: "GET"
        }, req, res);
    },
    deleteSecurity: function (req, res) {
        request.sendRequest({
            url: "http://localhost:8899/api/Security/" + req.body.securityId,
            method: "DELETE"
        }, req, res);
    },
    saveSecurity: function (req, res) {
         request.sendRequest({
            url: "http://localhost:8899/api/Security",
            method: "POST",
            json: req.body.security
        }, req, res);
    }
}