define([
    'jquery'
], function ($) {
    'use strict';
    var myScroller = function () {
        return {
            restrict: 'A',
            scope: {
                scrollChange: "=?"
            },
            link: function (scope, elem, attrs) {
                //var onChangeHandler = scope.$eval(attrs.myScroller);
                $(elem).on('scroll', function (event) {
                    if (scope.scrollChange) {
                        scope.scrollChange(event.target.scrollTop);
                    }
                });
            }
        };
    };

    return myScroller;
});