var request = require("../common/requestSender");
exports.securityGroupService = {
    getSecurityGroups: function (req, res) {
        request.sendRequest({
            url: "http://localhost:8899/api/SecurityGroup/",
            method: "GET"
        }, req, res);
    },
    deleteSecurityGroup: function (req, res) {
        request.sendRequest({
            url: "http://localhost:8899/api/SecurityGroup/" + req.body.securityGroupId,
            method: "DELETE"
        }, req, res);
    },
    saveSecurityGroup: function (req, res) {
        request.sendRequest({
            url: "http://localhost:8899/api/SecurityGroup",
            method: "POST",
            json: req.body.securityGroup
        }, req, res);
    }
}