define(['angular',
    'directives/leftbar',
    'directives/expander',
    'directives/userInfo',
    'directives/settingFramework',
    'directives/tree',
    'directives/dataPicker'], function (angular, leftbar, expander, userInfo, settingFramework, tree, dataPicker) {
        var directivesModule = angular.module("directives", []);

        directivesModule.directive("leftBar", leftbar);
        directivesModule.directive("expander", expander);
        directivesModule.directive("userInfo", userInfo);
        directivesModule.directive("settingGridSection", settingFramework.gridSection);
        directivesModule.directive("settingDetailSection", settingFramework.detailSection);
        directivesModule.directive("picker", dataPicker);
        directivesModule.directive("tree", tree);

        return directivesModule;
    });