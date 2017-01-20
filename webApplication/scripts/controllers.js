define(['angular',
    'services',
    'controllers/brokerController',
    'controllers/symbolController',
    'controllers/symbolGroupController',
    'controllers/loginController',
    'controllers/mainController',
    "controllers/userController",
    "controllers/departmentController",
    "controllers/macAddressController",
    "controllers/shareHolderController",
    "controllers/dataController",
    "controllers/detailController",
    "controllers/summaryReportController"], function (angular, services,
        brokerController,
        symbolController,
        symbolGroupController,
        loginController,
        mainController,
        userController,
        departmentController,
        macAddressController,
        shareHolderController,
        dataController,
        detailController,
        summaryReportController) {
        var controllersModule = angular.module("controllers", ['services']);

        controllersModule.controller("brokerController", brokerController);

        controllersModule.controller("detailController", detailController);

        controllersModule.controller('dataController', dataController);

        controllersModule.controller('summaryReportController', summaryReportController);

        controllersModule.controller('settingController', ["$scope", "dataService", function ($scope, dataService) {
            $scope.breadCrumbs = dataService.settingPages;
        }]);

        controllersModule.controller('userController', userController);

        controllersModule.controller('symbolController', symbolController);

        controllersModule.controller('symbolGroupController', symbolGroupController);

        controllersModule.controller('loginController', loginController);

        controllersModule.controller("mainController", mainController);

        controllersModule.controller("departmentController", departmentController);

        controllersModule.controller("macAddressController", macAddressController);

        controllersModule.controller("shareHolderController", shareHolderController);

        return controllersModule;
    });