define(['lodash'
], function (_) {
    'use strict';

    var tree = function () {
        return {
            scope: {
                parent: "=?",
                data: "=",
                checkChanged: "&",
                isTopLevel: "=?",
                childItemChangedHandler: "=?",
                isDisabled: "="
            },
            restrict: "E",
            replace: true,
            templateUrl: "../views/directives/tree.html",
            link: function (scope, ele, attr) {
                scope.itemCheckChanged = function (item) {
                    parentChanged(item);

                    if (scope.childItemChangedHandler) {
                        scope.childItemChangedHandler(scope.parent);
                    }
                }

                scope.childChanged = function (item) {
                    if (item.children) {
                        item.enable = _.findIndex(item.children, function (value) {
                            return value.enable == false;
                        }) == -1;
                    }

                    if (scope.childItemChangedHandler) {
                        scope.childItemChangedHandler(scope.parent);
                    }
                }

                function parentChanged(parent) {
                    if (parent.children) {
                        _.forEach(parent.children, function (child) {
                            child.enable = parent.enable;
                            parentChanged(child);
                        });
                    }
                }
            }
        };
    };

    return tree;
});