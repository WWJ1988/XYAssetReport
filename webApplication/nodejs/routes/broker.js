var request = require("../common/requestSender");
exports.brokerService = {
    getBrokers: function (req, res) {
        request.sendRequest({
            url: "http://localhost:8899/api/Broker/",
            method: "GET"
        }, req, res);
    },
    deleteBroker: function (req, res) {
        request.sendRequest({
            url: "http://localhost:8899/api/Broker/" + req.body.brokerID,
            method: "DELETE"
        }, req, res);
    },
    saveBroker: function (req, res) {
        request.sendRequest({
            url: "http://localhost:8899/api/Broker",
            method: "POST",
            json: req.body.broker
        }, req, res);
    },
    getColumnMaps: function (req, res) {
        request.sendRequest({
            url: "http://localhost:8899/api/ColumnMap/",
            method: "GET"
        }, req, res);
    },
    updateColumnMaps: function (req, res) {
        request.sendRequest({
            url: "http://localhost:8899/api/Broker/UpdateColumnMap",
            method: "POST",
            json: req.body.columnMaps
        }, req, res);
    }
}