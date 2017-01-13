var request = require("request");

exports.departmentService = {
    getDepartments: function (req, res) {
        request({
            url: "http://localhost:8899/api/Department/",
            method: "GET",
            headers: req.headers
        }).on("response", function (response) {
            var data = "";
            response.setEncoding('utf8');
            response.on('data', function (resData) {
                data += resData;
            });
            response.on('end', function () {
                res.status(response.statusCode).send(data);
            });
        })
    },
    deleteDepartment: function (req, res) {
        request({
            url: "http://localhost:8899/api/Department/" + req.body.departmentId,
            method: "DELETE",
            headers: req.headers
        }).on('response', function (response) {
            response.setEncoding('utf8');
            response.on('end', function () {
                res.status(response.statusCode).send(response);
            });
        });
    },
    saveDepartment: function (req, res) {
        request({
            url: "http://localhost:8899/api/Department/",
            method: "POST",
            headers: req.headers,
            json: req.body.department
        }).on('response', function (response) {
            var data = "";
            response.setEncoding('utf8');
            response.on('data', function (resData) {
                data += resData;
            });
            response.on('end', function () {
                res.status(response.statusCode).send(data);
            });
        });
    }
}
