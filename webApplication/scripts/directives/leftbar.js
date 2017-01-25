define([
    'lodash'
], function (_) {
    var leftbar = ["dataService", function (dataService) {
        return {
            restrict: "AE",
            replace: true,
            templateUrl: "../views/directives/leftbar.html",
            link: function (scope, ele, attr) {
                scope.allMenus = [];
                scope.isShowItem = function (functionId) {
                    var index = _.findIndex(scope.allMenus, function (f) {
                        return f == functionId;
                    });
                    if (index >= 0) {
                        return true;
                    }
                    return false;
                };
                dataService.getFunctionsByUserName()
                    .success(function (data) {
                        if (data.UserFunctions) {
                            for (var userId in data.UserFunctions) {
                                scope.allMenus = data.UserFunctions[userId];
                                break;
                            }
                        }
                    });
            }
        };
    }];

    return leftbar;
});