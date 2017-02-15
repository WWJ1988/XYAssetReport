define(["angular",
    "services/dataService",
    "services/customInterceptor",
    "services/userService",
    "services/modalService"], function (angular, dataService, interceptorService, userService, modalService) {
        var serviceModule = angular.module("services", []);

        serviceModule.service("dataService", dataService);

        serviceModule.service("interceptorService", interceptorService);

        serviceModule.service("userService", userService);

        serviceModule.service("modalService", modalService);

        return serviceModule;
    });