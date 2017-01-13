define([
    'lodash',
    'jquery'
], function (_, $) {
    'use strict';
    var dataPicker = [function () {
        return {
            scope: {
                selectedData: "=",
                unselectedData: "=",
                displayName: "@"
            },
            restrict: "E",
            replace: true,
            templateUrl: "../views/directives/dataPicker.html",
            link: function (scope, ele, attr) {
                scope.selectedCheckedDataItem = {};
                scope.selectedUncheckedDataItem = {};
                scope.selectCheckedItem = function (item, event) {
                    $(scope.selectedCheckedDataItem.element).removeClass('data-picker-content-item-selected');
                    $(event.target).addClass('data-picker-content-item-selected');
                    scope.selectedCheckedDataItem.item = item;
                    scope.selectedCheckedDataItem.element = event.target;
                    scope.selectedCheckedDataItem.isSelected = true;
                }

                scope.selectUncheckedItem = function (item, event) {
                    $(scope.selectedUncheckedDataItem.element).removeClass('data-picker-content-item-selected');
                    $(event.target).addClass('data-picker-content-item-selected');
                    scope.selectedUncheckedDataItem.item = item;
                    scope.selectedUncheckedDataItem.element = event.target;
                    scope.selectedUncheckedDataItem.isSelected = true;
                }

                scope.moveToLeft = function () {
                    scope.selectedData.push(scope.selectedUncheckedDataItem.item);
                    _.remove(scope.unselectedData, function (unselectedItem) {
                        return unselectedItem == scope.selectedUncheckedDataItem.item;
                    });
                    clearSelection();
                }

                scope.moveToRight = function () {
                    scope.unselectedData.push(scope.selectedCheckedDataItem.item);
                    _.remove(scope.selectedData, function (selectedItem) {
                        return selectedItem == scope.selectedCheckedDataItem.item;
                    });
                    clearSelection();
                }

                scope.moveAllToLeft = function () {
                    scope.selectedData.push.apply(scope.selectedData, scope.unselectedData);
                    scope.unselectedData = [];
                    clearSelection();
                }

                scope.moveAllToRight = function () {
                    scope.unselectedData.push.apply(scope.unselectedData, scope.selectedData);
                    scope.selectedData = [];
                    clearSelection();
                }

                function clearSelection() {
                    $(scope.selectedCheckedDataItem.element).removeClass('data-picker-content-item-selected');
                    $(scope.selectedUncheckedDataItem.element).removeClass('data-picker-content-item-selected');
                    scope.selectedCheckedDataItem = {};
                    scope.selectedUncheckedDataItem = {};
                }

                function setWatch() {
                    scope.$watch("selectedData", function () {
                        clearSelection();
                    });
                    scope.$watch("unselectedData", function () {
                        clearSelection();
                    });
                }

                setWatch();
            }
        };
    }];

    return dataPicker;
});