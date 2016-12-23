define(['angular',
    'directives/leftbar',
    'directives/expander',
    'directives/userInfo',
    'directives/settingFramework'], function (angular, leftbar, expander, userInfo, settingFramework) {
        var directivesModule = angular.module("directives", []);

        directivesModule.directive("leftBar", leftbar);
        directivesModule.directive("expander", expander);
        directivesModule.directive("userInfo", userInfo);
        directivesModule.directive("settingGridSection", settingFramework.gridSection);
        directivesModule.directive("settingDetailSection", settingFramework.detailSection);

        return directivesModule;
    });