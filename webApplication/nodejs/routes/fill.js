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
            url: "http://localhost:8899/api/Fill/Delete",
            method: "DELETE",
            json: req.body.fill
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
            method: "POST",
            json: req.body.filter
        }, req, res);
    }
}