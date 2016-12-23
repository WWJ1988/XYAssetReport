define(function () {
    return ["$http", function ($http) {
        this.settingPages = ['系统设置'];
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
        this.deleteBroker = function (brokerId) {
            return $http({
                method: "DELETE",
                url: "/api/broker",
                data: { brokerID: brokerId },
                headers: { 'Content-Type': 'application/json;charset=utf-8' }
            });
        };
        this.saveBroker = function (broker) {
            return $http({
                method: "POST",
                url: "/api/broker",
                data: { broker: broker }
            });
        };

        this.setCurrentSettingPage = function (currentPageName) {
            this.settingPages[1] = currentPageName;
        };

         this.getSymbols = function (callback) {
            $http.get("/api/security").then(function (res) {
                callback(res);
            });
        };
        this.deleteSymbol = function (symbolId) {
            return $http({
                method: "DELETE",
                url: "/api/security",
                data: { securityId: symbolId },
                headers: { 'Content-Type': 'application/json;charset=utf-8' }
            });
        };
        this.saveSymbol = function (symbol) {
            return $http({
                method: "POST",
                url: "/api/security",
                data: { security: symbol }
            });
        };

        this.getSymbolGroups = function (callback) {
            $http.get("/api/securityGroup").then(function (res) {
                callback(res);
            });
        };
        this.deleteSymbolGroup = function (symbolGroupId) {
            return $http({
                method: "DELETE",
                url: "/api/securityGroup",
                data: { securityGroupId: symbolGroupId },
                headers: { 'Content-Type': 'application/json;charset=utf-8' }
            });
        };
        this.saveSymbolGroup = function (symbolGroup) {
            return $http({
                method: "POST",
                url: "/api/securityGroup",
                data: { securityGroup: symbolGroup }
            });
        };
    }];
});