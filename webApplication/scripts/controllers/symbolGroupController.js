define(['lodash', 'jquery'], function (_, $) {
    var symbolGroupController = ["$scope", "dataService", function ($scope, dataService) {
        var vm = this;
        var securityCache = [];
        vm.enableGridAction = true;
        vm.hasRowSelected = false;
        vm.selectedRow = {};
        vm.newData = null;
        vm.allSecurities = [];
        vm.selectedSecurities = [];
        vm.selectedCheckedSecurityData = {};
        vm.selectedUncheckedSecurityData = {};

        vm.addSymbolGroup = function () {
            vm.enableGridAction = false;
            vm.newData = {
                "SecurityGroupID": "",
                "SecurityGroupName": "",
                "SecurityInGroup": []
            };

            vm.gridOption.data.push(vm.newData);
            vm.gridApi.grid.modifyRows(vm.gridOption.data);
            vm.gridApi.selection.selectRow(vm.newData);
        }

        vm.deleteSymbolGroup = function () {
            dataService.deleteSymbolGroup(vm.selectedRow.SecurityGroupID).success(function () {
                var index = _.findIndex(vm.gridOption.data, function (symbolGroup) {
                    return symbol.SecurityGroupID == vm.selectedRow.SecurityGroupID;
                });
                vm.gridOption.data.splice(index, 1);
                vm.gridApi.grid.modifyRows(vm.gridOption.data);
                if (vm.gridOption.data.length > 0) {
                    var nextSelectedIndex = index == vm.gridOption.data.length ? index - 1 : index;
                    vm.gridApi.selection.selectedRow(vm.gridOption.data[nextSelectedIndex])
                }
            });
        }

        vm.saveSymbolGroup = function () {
            dataService.saveSymbolGroup(vm.newData).success(function (res) {
                vm.enableGridAction = true;
                vm.newData = null;
            });
        }

        vm.cancel = function () {

        }

        vm.selectCheckedSecurity = function (security, event) {
            $(vm.selectedCheckedSecurityData.element).removeClass('data-picker-content-item-selected');
            $(event.target).addClass('data-picker-content-item-selected');
            vm.selectedCheckedSecurityData.security = security;
            vm.selectedCheckedSecurityData.element = event.target;
            vm.selectedCheckedSecurityData.isSelected = true;
        }

        vm.selectUncheckedSecurity = function (security, event) {
            $(vm.selectedUncheckedSecurityData.element).removeClass('data-picker-content-item-selected');
            $(event.target).addClass('data-picker-content-item-selected');
            vm.selectedUncheckedSecurityData.security = security;
            vm.selectedUncheckedSecurityData.element = event.target;
            vm.selectedUncheckedSecurityData.isSelected = true;
        }

        vm.moveToLeft = function () {
            vm.selectedRow.SecurityInGroup.push(vm.selectedUncheckedSecurityData.security.SecurityID);
            initializeGroupEditor();
            clearSelection();
        }

        vm.moveToRight = function () {
            var index = _.findIndex(vm.selectedRow.SecurityInGroup, function (securityId) {
                return securityId == vm.selectedCheckedSecurityData.security.SecurityID;
            });
            if (index != -1) {
                vm.selectedRow.SecurityInGroup.splice(index, 1);
                initializeGroupEditor();
                clearSelection();
            }
        }

        vm.moveAllToLeft = function () {
            vm.selectedRow.SecurityInGroup = _.map(vm.allSecurities, function (security) {
                return security.SecurityID;
            });

            initializeGroupEditor();
            clearSelection();
        }

        vm.moveAllToRight = function () {
            vm.selectedRow.SecurityInGroup = [];
            initializeGroupEditor();
            clearSelection();
        }

        function initialize() {
            initializeSecurities();
            initializeGrid();
            dataService.setCurrentSettingPage("券池组设置");
            dataService.getSymbolGroups(function (res) {
                vm.gridOption.data = res.data;
            });
        }

        function initializeGrid() {
            vm.gridOption = {
                data: [],
                enableSorting: false,
                enableRowSelection: true,
                enableRowHeaderSelection: false,
                multiSelect: false,
                modifierKeysToMultiSelect: false,
                columnDefs: [
                    { field: "SecurityGroupID", displayName: "" },
                    { field: "SecurityGroupName", displayName: "证券组名称" },
                ],
                onRegisterApi: function (gridApi) {
                    vm.gridApi = gridApi;
                    vm.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                        vm.selectedRow = row.entity;
                        vm.hasRowSelected = true;
                        clearSelection();
                        initializeGroupEditor();
                        if (vm.newData != null && vm.selectedRow != vm.newData) {
                            vm.enableGridAction = true;
                            vm.gridOption.data.splice(vm.gridOption.data.length - 1, 1);
                            vm.newData = null;
                        }
                    });
                }
            };
        }

        function initializeSecurities() {
            dataService.getSymbols(function (res) {
                securityCache = res.data;
            });
        }

        function initializeGroupEditor() {
            var allSecurities = securityCache.slice(0);
            var selectedSecurities = [];
            for (var i = 0; i < vm.selectedRow.SecurityInGroup.length; i++) {
                var index = _.findIndex(allSecurities, function (security) {
                    return security.SecurityID == vm.selectedRow.SecurityInGroup[i];
                });
                if (index != -1) {
                    selectedSecurities.push(allSecurities[index]);
                    allSecurities.splice(index, 1);
                }
            }

            vm.selectedSecurities = selectedSecurities;
            vm.allSecurities = allSecurities;
        }

        function clearSelection() {
            $(vm.selectedUncheckedSecurityData.element).removeClass('data-picker-content-item-selected');
            $(vm.selectedCheckedSecurityData.element).removeClass('data-picker-content-item-selected');
            vm.selectedUncheckedSecurityData = {};
            vm.selectedCheckedSecurityData = {};
        }

        initialize();
    }];

    return symbolGroupController;
});