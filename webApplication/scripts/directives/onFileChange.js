define([
], function () {
    'use strict';
    var onFileChange = function () {
        return {
            restrict: "A",
            link: function (scope, ele, attrs) {
                var onChangeHandler = scope.$eval(attrs.onFileChange);
                ele.bind('change', function (event) {
                    if (onChangeHandler) {
                        onChangeHandler(event);
                    }
                });
            }
        };
    };

    return onFileChange;
});