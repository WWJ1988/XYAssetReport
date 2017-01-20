define([
    "lodash"
], function (_) {
    'use strict';
    var multiSelect = ["$uibPosition", "$document", "$filter", function ($position, $document, $filter) {
        return {
            scope: {
                header: "@",
                disabled: "=?",
                enableFilter: "=",
                filterPlaceholder: "@",
                checkAllLabel: "@",
                items: "=",
                displayName: "@"
            },
            restrict: "E",
            replace: true,
            templateUrl: "../views/directives/multiSelect.html",
            link: function (scope, element, attr) {
                var clickHandler = function (event) {
                    if (elementMatchesAnyInArray(event.target, element.find(event.target.tagName)))
                        return;

                    element.removeClass('open');
                    scope.isOpen = false;
                    $document.unbind('click', clickHandler);
                    scope.$apply();
                };
                var elementMatchesAnyInArray = function (element, elementArray) {
                    for (var i = 0; i < elementArray.length; i++)
                        if (element == elementArray[i])
                            return true;
                    return false;
                };
                var getFilteredItems = function () {
                    var filteredItems = $filter("filter")(scope.items, scope.searchText);
                    return filteredItems;
                };
                var getCheckedAndFilteredItems = function () {
                    var filter = {};
                    filter[scope.displayName] = scope.searchText[scope.displayName];
                    filter.checked = true;
                    return $filter("filter")(scope.items, filter);
                };
                var setAllChckedStatus = function () {
                    if (_.findIndex(getFilteredItems(), function (item) {
                        return !item.checked;
                    }) == -1) {
                        scope.isAllSelected = true;
                    } else {
                        scope.isAllSelected = false;
                    }
                    setHeader();
                };
                var setHeader = function () {
                    scope.header = _.join(_.map(getCheckedAndFilteredItems(), scope.displayName), ",");
                };

                scope.searchText = {};
                scope.searchText[scope.displayName] = "";
                scope.isOpen = false;
                scope.isAllSelected = false;
                scope.toggleSelect = function () {
                    if (element.hasClass('open') || scope.isOpen) {
                        element.removeClass('open');
                        scope.isOpen = false;
                        $document.unbind('click', clickHandler);
                    } else {
                        element.addClass('open');
                        scope.isOpen = true;
                        $document.bind('click', clickHandler);
                        if (scope.isAutoFocus) {
                            scope.focus();
                        }
                    }

                };
                scope.clearFilter = function () {
                    scope.searchText[scope.displayName] = "";
                    setAllChckedStatus();
                };
                scope.checkAll = function () {
                    _.forEach(getFilteredItems(), function (item) {
                        item.checked = scope.isAllSelected;
                    });
                    setHeader();
                };
                scope.select = function () {
                    setAllChckedStatus();
                };
            },
            controllerAs: ""
        };
    }];

    return multiSelect;
});