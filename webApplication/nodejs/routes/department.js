var request = require("../common/requestSender");
exports.departmentService = {
    getDepartments: function (req, res) {
        request.sendRequest({
            url: "http://localhost:8899/api/Department/",
            method: "GET"
        }, req, res);
    },
    deleteDepartment: function (req, res) {
        request.sendRequest({
            url: "http://localhost:8899/api/Department/" + req.body.departmentId,
            method: "DELETE"
        }, req, res);
    },
    saveDepartment: function (req, res) {
        request.sendRequest({
            url: "http://localhost:8899/api/Department/",
            method: "POST",
            json: req.body.department
        }, req, res);
    }
}
