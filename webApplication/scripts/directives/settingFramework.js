define(function () {
    var settingGrid = function () {
        return {
            scope: {
                title: "@",
                addEvent: "&",
                deleteEvent: "&",
                enableAdd: "=",
                deleteEnable: "=",
                gridOption: "="
            },
            restrict: "E",
            replace: true,
            templateUrl: "../views/directives/settingGridSection.html",
            controller: function ($scope) {
                $scope.add = function () {
                    $scope.addEvent();
                }
                $scope.delete = function () {
                    $scope.deleteEvent();
                }
            }
        };
    };
    var settingDetail = function () {
        return {
            scope: {
                saveEvent: "&",
                cancelEvent: "&",
                actionEnable: "=",
                errorMessage: "=?"
            },
            restrict: "E",
            replace: true,
            templateUrl: "../views/directives/settingDetailSection.html",
            transclude: true,
            controller: function ($scope) {
                $scope.save = function () {
                    $scope.saveEvent();
                }
                $scope.cancel = function () {
                    $scope.cancelEvent();
                }
            }
        };
    };

    return {
        gridSection: settingGrid,
        detailSection: settingDetail
    };
});