define(["angular",
    "angularAnimate",
    "uiRoute",
    "bootstrap",
    "uiBootstrapTpls",
    "uiGrid",
    "ngStorage",
    "ActivityMonitor",
    "services",
    "directives",
    "controllers"], function () {

        var mainModule = angular.module("webapp", ['ui.router', 'ngAnimate', 'ui.bootstrap', 'ui.grid', 'ui.grid.selection', 'ngStorage', 'ActivityMonitor', 'services', 'directives', 'controllers']);

        mainModule.run(["$rootScope", "$localStorage", function ($rootScope, $localStorage) {
            if ($localStorage.token) {
                $rootScope.isLogin = true;
            }

            $rootScope.$on("$destroy", function () {
                delete $localStorage.token;
            });
        }]);

        mainModule.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
            $httpProvider.interceptors.push("interceptorService");

            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('login', {
                    url: '/',
                    templateUrl: '../views/templates/login.html',
                    controller: 'loginController as loginCtrl'
                })
                .state('data', {
                    url: '/data',
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
                .state('setting.user', {
                    parent: 'setting',
                    url: '/user',
                    templateUrl: '../views/templates/user.html',
                    controller: 'userController as userCtrl'
                })
                .state('setting.broker', {
                    url: '/broker',
                    templateUrl: '../views/templates/broker.html',
                    controller: 'brokerController as brokerCtrl'
                })
                .state('setting.symbol', {
                    url: '/symbols',
                    templateUrl: '../views/templates/symbol.html',
                    controller: 'symbolController as symbolCtrl'
                })
                .state('setting.symbolGroup', {
                    url: '/symbolGroup',
                    templateUrl: '../views/templates/symbolGroup.html',
                    controller: 'symbolGroupController as symbolGroupCtrl'
                })
        }]);

        return mainModule;
    });