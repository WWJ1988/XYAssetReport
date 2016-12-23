define(["angular",
    "angularAnimate",
    "uiRoute",
    "bootstrap",
    "uiBootstrapTpls",
    "uiGrid",
    "services",
    "directives",
    "controllers"], function () {

        var mainModule = angular.module("webapp", ['ui.router', 'ngAnimate', 'ui.bootstrap', 'ui.grid', 'ui.grid.selection', 'services', 'directives', 'controllers']);

        mainModule.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
            $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
                return {
                    'request': function (config) {
                        config.headers = config.headers || {};
                        if ($localStorage.token) {
                            config.headers.Authorization = 'Bearer ' + $localStorage.token;
                        }
                        return config;
                    },
                    'responseError': function (response) {
                        if (response.status === 401 || response.status === 403) {
                            $location.path('/login');
                        }
                        return $q.reject(response);
                    }
                };
            }]);

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