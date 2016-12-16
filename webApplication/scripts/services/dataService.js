define(function () {
    return ["$http", function ($http) {
        this.settingPages = ['Setting'];
        this.getTradingSwagger = function (callback) {
            $http.get("/api/users").then(function (res) {
                callback(res);
            });
        };
        this.getBrokers = function (callback) {
            $http.get("/api/broker").then(function (res) {
                callback(res);
            });
        };
        this.setCurrentSettingPage = function (currentPageName) {
            this.settingPages[1] = currentPageName;
        };
    }];
});