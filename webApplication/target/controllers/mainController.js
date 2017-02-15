define(function () {
    'use strict';
    var mainController = ["$rootScope",
        "$scope",
        "$localStorage",
        "$state",
        "ActivityMonitor",
        "userService", function ($rootScope, $scope, $localStorage, $state, ActivityMonitor, userService) {
            'use strict';
            var vm = this;

            function initialize() {
                $scope.$on("$destroy", function () {
                    $rootScope.isLogin = false;
                });
                userService.checkHealth();
                initializeActivityMonitor();
            }

            function initializeActivityMonitor() {
                ActivityMonitor.options.inactive = 300;
                ActivityMonitor.on("inactive", function () {
                    vm.logout();
                });
            }

            vm.logout = function () {
                $rootScope.isLogin = false;
                userService.logout();
                $state.go("login");
            }

            initialize();
        }];

    return mainController;
});