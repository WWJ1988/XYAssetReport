define(["services"
], function () {
    'use strict';

    var controller = ["$rootScope", "$state", "userService", "dataService", function ($rootScope, $state, userService, dataService) {
        var vm = this;
        vm.errorMessage = "";
        vm.user = {
            userName: "",
            userPassword: ""
        };
        vm.login = function () {
            if (vm.user.userName === "" || vm.user.userPassword === "") {
                vm.errorMessage = "用户名和密码不能为空";
                return;
            }

            userService.login(vm.user, function () {
                $rootScope.isLogin = true;
                vm.setPageForLogined();
            }, function (error) {
                vm.errorMessage = error.data;
            });
        }

        function checkToken() {
            userService.checkHealth(function () {
                $rootScope.isLogin = true;
                vm.setPageForLogined();
            }, function () {
                $rootScope.isLogin = false;
            });
        }

        function isShowItem(functionId, allMenus) {
            var index = _.findIndex(allMenus, function (f) {
                return f == functionId;
            });
            if (index >= 0) {
                return true;
            }
            return false;
        };

        vm.setPageForLogined = function () {
            dataService.getFunctionsByUserName()
                .success(function (data) {
                    var allMenus = [];
                    if (data.UserFunctions) {
                        for (var userId in data.UserFunctions) {
                            allMenus = data.UserFunctions[userId];
                            break;
                        }
                    }
                    if (isShowItem("ReportManagement", allMenus)) {
                        if (isShowItem("PendingInvalidData", allMenus)) {
                            $state.go("data");
                        }
                        else if (isShowItem("DetailReport", allMenus)) {
                            $state.go("detail");
                        }
                        else if (isShowItem("SummaryReport", allMenus)) {
                            $state.go("report");
                        }
                        else {
                            $state.go("noPermission");
                        }
                    }
                    else if (isShowItem("DataManagement", allMenus)) {
                        if (isShowItem("PermissionManagement", allMenus)) {
                            $state.go("setting.user");
                        }
                        else if (isShowItem("SecurityManagement", allMenus)) {
                            $state.go("setting.symbol");
                        }
                        else if (isShowItem("BrokerManagement", allMenus)) {
                            $state.go("setting.broker");
                        }
                        else if (isShowItem("SecurityGroupManagement", allMenus)) {
                            $state.go("setting.symbolGroup");
                        }
                        else if (isShowItem("DepartmentManagement", allMenus)) {
                            $state.go("setting.department");
                        }
                        else if (isShowItem("MACAddress", allMenus)) {
                            $state.go("setting.macAddress");
                        }
                        else if (isShowItem("ShareHolder", allMenus)) {
                            $state.go("setting.shareHolder");
                        }
                        else {
                            $state.go("noPermission");
                        }
                    }
                    else {
                        $state.go("noPermission");
                    }
                });
        }

        checkToken();
    }];

    return controller;
});