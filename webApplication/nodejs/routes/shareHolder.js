var request = require("../common/requestSender");
exports.shareHolderService = {
    getShareHolders: function (req, res) {
        request.sendRequest({
            url: "http://localhost:8899/api/ShareHolder/",
            method: "GET"
        }, req, res);
    },
    deleteShareHolder: function (req, res) {
        request.sendRequest({
            url: "http://localhost:8899/api/ShareHolder/" + req.body.shareHolderId,
            method: "DELETE"
        }, req, res);
    },
    saveShareHolder: function (req, res) {
        request.sendRequest({
            url: "http://localhost:8899/api/ShareHolder",
            method: "POST",
            json: req.body.shareHolder
        }, req, res);
    }
}