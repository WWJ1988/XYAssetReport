define(['angular',
    'directives/leftbar',
    'directives/expander',
    'directives/userInfo',
    'directives/settingFramework',
    'directives/tree',
    'directives/dataPicker',
    'directives/fillFilter',
    'directives/multiSelect',
    'directives/onFileChange',
    'directives/myScroller'], function (angular, leftbar, expander, userInfo, settingFramework, tree, dataPicker, fillFilter, multiSelect, onFileChange, myScroller) {
        var directivesModule = angular.module("directives", []);

        directivesModule.directive("leftBar", leftbar);
        directivesModule.directive("expander", expander);
        directivesModule.directive("userInfo", userInfo);
        directivesModule.directive("settingGridSection", settingFramework.gridSection);
        directivesModule.directive("settingDetailSection", settingFramework.detailSection);
        directivesModule.directive("picker", dataPicker);
        directivesModule.directive("tree", tree);
        directivesModule.directive("fillFilter", fillFilter);
        directivesModule.directive("multiselect", multiSelect);
        directivesModule.directive("onFileChange", onFileChange);
        directivesModule.directive("myScroller", myScroller);

        return directivesModule;
    });