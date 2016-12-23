define(['angular',
    'services',
    'controllers/brokerController',
    'controllers/symbolController',
    'controllers/symbolGroupController'], function (angular, services, brokerController, symbolController, symbolGroupController) {
        var controllersModule = angular.module("controllers", ['services']);

        controllersModule.controller("brokerController", brokerController);

        controllersModule.controller("mainCtr", ["$scope", function ($scope) {
            var vm = this;

            vm.title = "Hello World!!!";
            vm.name = "hello";
        }]);

        controllersModule.controller("detailController", ["$scope", function ($scope) {
        }]);

        controllersModule.controller('dataController', ["$scope", function ($scope) {
            var vm = this;
        }]);

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

        controllersModule.controller('userController', function ($scope) { });

        controllersModule.controller('symbolController', symbolController);

        controllersModule.controller('symbolGroupController', symbolGroupController);

        return controllersModule;
    });