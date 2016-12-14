define(["angular",
    "services/dataService"], function (angular, dataService) {
        var serviceModule = angular.module("services", []);

        serviceModule.service("dataService", dataService);

        return serviceModule;
    });