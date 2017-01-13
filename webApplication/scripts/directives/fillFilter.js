define([
    "lodash"
], function (_) {
    'use strict';
    var fillFilter = [function () {
        return {
            scope: {
                filterDataCallback: "=",
                exportDataHandler: "&"
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
                        formatYear: 'yy',
                        maxDate: new Date(2020, 5, 22),
                        minDate: new Date(),
                        startingDay: 1
                    };

                    vm.endDateOptions = {
                        formatYear: 'yy',
                        maxDate: new Date(2020, 5, 22),
                        minDate: new Date(),
                        startingDay: 1
                    };
                }
                vm.QueryData = function () {
                    var selectedDepartmentIds = _.map(_.filter(vm.departments, function (dep) {
                        return dep.checked;
                    }), "DepartmentID");
                    var selectedTraderIds = _.map(_.filter(vm.traders, function (tra) {
                        return tra.checked;
                    }), "UserID");
                    var selectedCashAccountIds = _.map(_.filter(vm.cashAccounts, function (acc) {
                        return acc.checked;
                    }), "CashAccountID");
                    var selectedBrokerIds = _.map(_.filter(vm.brokers, function (bro) {
                        return bro.checked;
                    }), "BrokerID");
                    var selectedShareHolderIds = _.map(_.filter(vm.shareHolders, function (hol) {
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
                    selectedSecurityIds = _.uniq(selectedSecurityIds);
                };
                vm.ExportData = function () { };
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