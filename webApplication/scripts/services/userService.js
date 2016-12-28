define(function () {
    'use strict';
    var userService = ["$http", "$localStorage", function ($http, $localStorage) {
        'use strict';

        var vm = this;
        vm.userName = "";
        vm.login = function (loginUser, successHandler, errorHandler) {
            $http.post("/api/login",
                {
                    username: loginUser.userName,
                    password: loginUser.userPassword
                }).success(function (response) {
                    $localStorage.token = response.access_token;
                    vm.userName = loginUser.userName;
                    if (successHandler) {
                        successHandler();
                    }
                }).error(function (error) {
                    if (errorhandler) {
                        errorhandler(error);
                    }
                });
        }

        vm.checkHealth = function (successHandler, errorHandler) {
            if ($localStorage.token) {
                $http.post("/api/login/health").success(function (response) {
                    vm.userName = JSON.parse(response);
                    if (successHandler) {
                        successHandler();
                    }
                }).error(function (error) {
                    if (errorHandler) {
                        errorHandler(error);
                    }
                });
            }
            else if (errorHandler) {
                errorHandler("");
            }
        }

        vm.logout = function () {
            delete $localStorage.token;
            vm.userName = "";
        }
    }];

    return userService;
});