define(function () {
    var expander = function () {
        return {
            scope: {
                title: "@expanderTitle",
                collapse: "=expanderCollapse"
            },
            restrict: "E",
            replace: true,
            transclude: true,
            templateUrl: "../views/directives/expander.html",
            link: function (scope, ele, attr) {
            }
        };
    }

    return expander;
});