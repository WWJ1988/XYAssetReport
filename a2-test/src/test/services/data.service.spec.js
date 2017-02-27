"use strict";
var data_service_1 = require("../../app/services/data.service");
describe("dataService test", function () {
    var dataServcie;
    beforeEach(function () {
        dataServcie = new data_service_1.DataService();
    });
    it("getBlogs", function () {
        var blogs = dataServcie.getBlogs();
        expect(blogs).toBeDefined();
        expect(blogs.length).toBe(2);
    });
    it("getBlogById", function () {
        var blog = dataServcie.getBlogById(1, 1);
        expect(blog).toBeDefined();
        blog.then(function (b) {
            expect(b.id).toBe(1);
        });
    });
});
//# sourceMappingURL=data.service.spec.js.map