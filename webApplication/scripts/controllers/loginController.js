define(["services"
], function () {
    'use strict';

    var controller = ["$rootScope", "$state", "userService", function ($rootScope, $state, userService) {
        this.errorMessage = "";
        this.user = {
            userName: "",
            userPassword: ""
        };
        this.login = function () {
            if (this.user.userName === "" || this.user.userPassword === "") {
                this.errorMessage = "用户名和密码不能为空";
                return;
            }

            userService.login(this.user, function () {
                $rootScope.isLogin = true;
                $state.go("data");
            }, function (error) {
                this.errorMessage = error.data;
            });
        }

        function checkToken() {
            userService.checkHealth(function () {
                $rootScope.isLogin = true;
                $state.go("data");
            }, function () {
                $rootScope.isLogin = false;
            });
        }

        checkToken();
    }];

    return controller;
});