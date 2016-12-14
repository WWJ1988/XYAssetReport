define(['angular',
    'directives/leftbar',
    'directives/expander',
    'directives/userInfo'], function (angular, leftbar, expander, userInfo) {
        var directivesModule = angular.module("directives", []);

        directivesModule.directive("leftBar", leftbar);
        directivesModule.directive("expander", expander);
        directivesModule.directive("userInfo", userInfo);

        return directivesModule;
    });