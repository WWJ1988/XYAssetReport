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
    "controllers/dataController"], function (angular, services,
        brokerController,
        symbolController,
        symbolGroupController,
        loginController,
        mainController,
        userController,
        departmentController,
        macAddressController,
        shareHolderController,
        dataController) {
        var controllersModule = angular.module("controllers", ['services']);

        controllersModule.controller("brokerController", brokerController);

        controllersModule.controller("detailController", ["$scope", function ($scope) {
            $scope.filterData = function (data) {

            }

            $scope.exportDataHandler = function () {

            }
        }]);

        controllersModule.controller('dataController', dataController);

        controllersModule.controller('reportController', ["$scope", "dataService", function ($scope, dataService) {
            var vm = this;

            var tradingSwagger = function (res) {
                $scope.text = res.data;
            }

            dataService.getTradingSwagger(tradingSwagger);
        }]);

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