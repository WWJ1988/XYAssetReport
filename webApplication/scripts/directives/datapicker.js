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
                    vm.selectedCheckedDataItem.item = item;
                    vm.selectedCheckedDataItem.element = event.target;
                    vm.selectedCheckedDataItem.isSelected = true;
                }

                scope.selectUncheckedItem = function (item, event) {
                    $(scope.selectedUncheckedDataItem.element).removeClass('data-picker-content-item-selected');
                    $(event.target).addClass('data-picker-content-item-selected');
                    vm.selectedUncheckedDataItem.item = item;
                    vm.selectedUncheckedDataItem.element = event.target;
                    vm.selectedUncheckedDataItem.isSelected = true;
                }

                scope.moveToLeft = function () {
                    scope.selectedData.push(scope.selectedUncheckedDataItem.item);
                    _.remove(scope.unselectedData, function (unselectedItem) {
                        return unselectedItem == scope.selectedUncheckedDataItem.item;
                    });
                }

                scope.moveToRight = function () {
                    scope.unselectedData.push(scope.selectedCheckedDataItem.item);
                    _.remove(scope.selectedData, function (selectedItem) {
                        return selectedItem == scope.selectedUncheckedDataItem.item;
                    });
                }

                scope.moveAllToLeft = function () {
                    scope.selecteddata = _.concat(scope.selecteddata, scope.unselectedData);
                    scope.unselectedData = [];
                }

                scope.moveAllToRight = function () {
                    scope.selecteddata = _.concat(scope.selecteddata, scope.unselectedData);
                    scope.selecteddata = [];
                }
            }
        };
    }];

    return dataPicker;
});