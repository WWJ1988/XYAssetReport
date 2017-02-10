var request = require("../common/requestSender");
exports.user = {
    getUser: function (req, res) {
        request.sendRequest({
            url: "http://localhost:8899/api/User/",
            method: "GET",
        }, req, res);
    },
    deleteUser: function (req, res) {
        request.sendRequest({
            url: "http://localhost:8899/api/User/" + req.body.userId,
            method: "DELETE",
        }, req, res);
    },
    saveUser: function (req, res) {
        request.sendRequest({
            url: "http://localhost:8899/api/User",
            method: "POST",
            json: req.body.user
        }, req, res);
    }
}
