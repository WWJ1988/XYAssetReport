define(['angular',
    'directives/leftbar',
    'directives/expander'], function (angular, leftbar, expander) {
    var directivesModule = angular.module("directives", []);

    directivesModule.directive("leftBar", leftbar);
    directivesModule.directive("expander", expander);

    return directivesModule;
});