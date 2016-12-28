define(function () {
    return ["userService", function (userService) {
        return {
            scope: {
                logout: "&"
            },
            restrict: "E",
            replace: true,
            templateUrl: "../views/directives/userInfo.html",
            controller: ["$scope", "userService", function ($scope, userService) {
                $scope.userInfo = userService;
            }]
        };
    }];
});