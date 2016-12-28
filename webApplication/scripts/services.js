define(["angular",
    "services/dataService",
    "services/customInterceptor",
    "services/userService"], function (angular, dataService, interceptorService, userService) {
        var serviceModule = angular.module("services", []);

        serviceModule.service("dataService", dataService);

        serviceModule.service("interceptorService", interceptorService);

        serviceModule.service("userService", userService);

        return serviceModule;
    });