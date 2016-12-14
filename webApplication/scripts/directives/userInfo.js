define(function () {
    return function () {
        return {
            restrict: "E",
            replace: true,
            templateUrl: "../views/directives/userInfo.html",
            controller: ["$scope", function ($scope) {
                $scope.userName = "NeilWang";
            }]
        };
    };
});