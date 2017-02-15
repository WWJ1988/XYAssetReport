define([
    "lodash",
    "../common/common"
], function (_) {
    'use strict';
    var fillFilter = [function () {
        return {
            scope: {
                filterDataCallback: "=",
                exportDataHandler: "&",
                loadSummary: "@"
            },
            restrict: "E",
            replace: true,
            templateUrl: "../views/directives/fillFilter.html",
            controller: ["$scope", "dataService", function ($scope, dataService) {
                var vm = this;
                vm.departments = [];
                vm.traders = [];
                vm.securities = [];
                vm.cashAccounts = [];
                vm.brokers = [];
                vm.shareHolders = [];
                vm.isStartDateOpen = false;
                vm.isEndDateOpen = false;
                vm.startDateTime = "";
                vm.endDateTime = "";

                function initialize() {
                    dataService.getLookupData()
                        .success(function (data) {
                            vm.departments = data.DepartmentList;
                            vm.traders = data.UserList;
                            vm.cashAccounts = data.CashAccountList;
                            vm.brokers = data.BrokerList;
                            vm.shareHolders = data.ShareHolderList;
                            vm.securities = data.SecurityList;
                            _.forEach(data.SecurityGroupList, function (group) {
                                group.SecurityName = group.SecurityGroupName;
                            });
                            vm.securities = _.concat(data.SecurityGroupList, data.SecurityList);
                        });

                    vm.startDateOptions = {
                        maxDate: new Date(2020, 5, 22),
                        startingDay: 1
                    };

                    vm.endDateOptions = {
                        maxDate: new Date(2020, 5, 22),
                        startingDay: 1
                    };
                }
                vm.QueryData = function () {
                    var filterQuery = {};
                    filterQuery.SelectedDepartmentList = _.map(_.filter(vm.departments, function (dep) {
                        return dep.checked;
                    }), "DepartmentID");
                    filterQuery.SelectedTraderList = _.map(_.filter(vm.traders, function (tra) {
                        return tra.checked;
                    }), "UserID");
                    filterQuery.SelectedAccountList = _.map(_.filter(vm.cashAccounts, function (acc) {
                        return acc.checked;
                    }), "CashAccountID");
                    filterQuery.SelectedBrokerList = _.map(_.filter(vm.brokers, function (bro) {
                        return bro.checked;
                    }), "BrokerName");
                    filterQuery.SelectedShareHolderList = _.map(_.filter(vm.shareHolders, function (hol) {
                        return hol.checked;
                    }), "ShareHolderID");
                    var selectedSecurityIds = [];
                    _.forEach(vm.securities, function (sec) {
                        if (sec.checked) {
                            if (sec.SecurityInGroup) {
                                _.forEach(sec.SecurityInGroup, function (id) {
                                    selectedSecurityIds.push(id);
                                })
                            }
                            else {
                                selectedSecurityIds.push(sec.SecurityID)
                            }
                        }
                    });
                    filterQuery.SelectedSecurityList = _.uniq(selectedSecurityIds);
                    if (!vm.startDateTime) {
                        filterQuery.BeginDateString = "0";
                    }
                    else {
                        filterQuery.BeginDateString = vm.startDateTime.format("yyyyMMdd");
                    }
                    if (!vm.endDateTime) {
                        filterQuery.EndDateString = "0";
                    }
                    else {
                        filterQuery.EndDateString = vm.endDateTime.format("yyyyMMdd");
                    }
                    filterQuery.LoadSummary = $scope.loadSummary;

                    dataService.queryFills(filterQuery)
                        .success(function (data) {
                            if ($scope.filterDataCallback) {
                                $scope.filterDataCallback(data);
                            }
                        });
                };

                vm.ExportData = function () {
                    if ($scope.exportDataHandler) {
                        $scope.exportDataHandler();
                    }
                };

                vm.openStartDataPicker = function () {
                    vm.isStartDateOpen = true;
                };

                vm.openEndDataPicker = function () {
                    vm.isEndDateOpen = true;
                };

                initialize();
            }],
            controllerAs: "multiSelectCtrl"
        };
    }];

    return fillFilter;
});