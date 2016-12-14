define(function () {
    return ["$http", function ($http) {
        this.getTradingSwagger = function (callback) {
            $http.get("/api/users").then(function (res) {
                callback(res);
            });
        },
        this.getBrokers = function (callback) {
            $http.get("/api/broker").then(function (res) {
                callback(res);
            });
        }
    }];
});