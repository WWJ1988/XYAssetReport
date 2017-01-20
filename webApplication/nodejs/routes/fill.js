var request = require("../common/requestSender");
exports.fillService = {
    getFills: function (req, res) {
        request.sendRequest({
            url: "http://localhost:8899/api/Fill/",
            method: "GET"
        }, req, res);
    },
    deleteFill: function (req, res) {
        request.sendRequest({
            url: "http://localhost:8899/api/Fill/" + req.body.fillId,
            method: "DELETE"
        }, req, res);
    },
    saveFill: function (req, res) {
        request.sendRequest({
            url: "http://localhost:8899/api/Fill",
            method: "POST",
            json: req.body.fill
        }, req, res);
    },
    queryFills: function (req, res) {
        request.sendRequest({
            url: "http://localhost:8899/api/Fill/Query",
            method: "GET",
            json: JSON.parse(req.query.filter)
        }, req, res);
    }
}