define(function () {
    var leftbar = function () {
        return {
            restrict: "AE",
            replace: true,
            templateUrl: "../views/directives/leftbar.html",
            link: function (scope, ele, attr) {
            }
        };
    }

    return leftbar;
});