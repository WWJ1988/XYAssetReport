﻿define(["angular",
    "angularAnimate",
    "angularResource",
    "uiRoute",
    "bootstrap",
    "uiBootstrapTpls",
    "uiGrid",
    "uiSelect",
    "ngStorage",
    "ActivityMonitor",
    "services",
    "directives",
    "controllers"], function () {

        var mainModule = angular.module("webapp", ['ui.router', 'ngAnimate', 'ngResource', 'ui.bootstrap', 'ui.grid', 'ui.grid.edit', 'ui.grid.rowEdit', 'ui.grid.selection', 'ui.grid.grouping', 'ui.select', 'ngStorage', 'ActivityMonitor', 'services', 'directives', 'controllers']);

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
                .state('noPermission', {
                    url:'/noPermission',
                    templateUrl:'../views/templates/noPermission.html'
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
                    controller: 'summaryReportController as summaryReportCtrl'
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
                .state('setting.department', {
                    url: '/department',
                    templateUrl: '../views/templates/department.html',
                    controller: 'departmentController as departmentCtrl'
                })
                .state("setting.macAddress", {
                    url: "/macAddress",
                    templateUrl: "../views/templates/macAddress.html",
                    controller: "macAddressController as macAddressCtrl"
                })
                .state("setting.shareHolder", {
                    url: "/shareHolder",
                    templateUrl: "../views/templates/shareHolder.html",
                    controller: "shareHolderController as shareHolderCtrl"
                })
        }]);

        return mainModule;
    });