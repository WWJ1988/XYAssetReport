define(['angular',
    'services',
    'controllers/brokerController',
    'controllers/symbolController',
    'controllers/symbolGroupController',
    'controllers/loginController',
    'controllers/mainController'], function (angular, services, brokerController, symbolController, symbolGroupController, loginController, mainController) {
        var controllersModule = angular.module("controllers", ['services']);

        controllersModule.controller("brokerController", brokerController);

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

        controllersModule.controller('loginController', loginController);

        controllersModule.controller("mainController", mainController);

        return controllersModule;
    });