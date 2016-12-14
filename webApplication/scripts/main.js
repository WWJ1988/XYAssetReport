define(["angular",
    "angularAnimate",
    "uiRoute",
    "bootstrap",
    "uiBootstrapTpls",
    "uiGrid",
    "services",
    "directives"], function () {

        var mainModule = angular.module("webapp", ['ui.router', 'ngAnimate', 'ui.bootstrap', 'ui.grid', 'services', 'directives']);

        mainModule.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('data', {
                    url: '/',
                    templateUrl: '../views/templates/data.html',
                    controller: 'dataController as dataCtrl'
                })
                .state('detail', {
                    url: '/detail',
                    templateUrl: '../views/templates/detail.html',
                    controller: 'detailController as detailCtrl'
                })
                .state('report', {
                    url: '/report',
                    templateUrl: '../views/templates/report.html',
                    controller: 'reportController as reportCtrl'
                })
                .state('setting', {
                    url: '/setting',
                    templateUrl: '../views/templates/setting.html',
                    controller: 'settingController as settingCtrl'
                })
                .state('user', {
                    parent: 'setting',
                    url: '/setting/user',
                    templateUrl: '../views/templates/user.html',
                    controller: 'userController as userCtrl'
                })
                .state('setting.symbol', {
                    url: '/setting/symbols',
                    templateUrl: '../views/templates/symbol.html',
                    controller: 'symbolController as symbolCtrl'
                })
                .state('setting.broker', {
                    url: '/setting/broker',
                    templateUrl: '../views/templates/broker.html',
                    controller: 'brokerController as brokerCtrl'
                })
        }]);

        mainModule.controller("mainCtr", ["$scope", function ($scope) {
            var vm = this;

            vm.title = "Hello World!!!";
            vm.name = "hello";
        }]);

        mainModule.controller("detailController", ["$scope", function ($scope) {
        }]);

        mainModule.controller('dataController', ["$scope", function ($scope) {
            var vm = this;
        }]);

        mainModule.controller('reportController', ["$scope", "dataService", function ($scope, dataService) {
            var vm = this;

            var tradingSwagger = function (res) {
                $scope.text = res.data;
            }

            dataService.getTradingSwagger(tradingSwagger);
        }]);

        mainModule.controller('settingController', function ($scope) { });

        mainModule.controller('userController', function ($scope) { });

        mainModule.controller('symbolController', function ($scope) {

        });

        mainModule.controller('brokerController', ["$scope", "dataService", function ($scope, dataService) {
            var loadBrokers = function (res) {
                $scope.text = res.data;
            }

            dataService.getBrokers(loadBrokers);
        }]);

        mainModule.directive("preventDefaultAction", function () {
            return {
                restrict: "A",
                link: function (scope, element, attrs) {
                    element.on("click", function (event) {
                        event.preventDefault();
                    });
                }
            };
        });

        return mainModule;
    });