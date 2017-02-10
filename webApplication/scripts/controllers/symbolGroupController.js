define(['lodash', 'jquery'], function (_, $) {
    var symbolGroupController = ["$scope", "dataService", function ($scope, dataService) {
        var vm = this;
        var securityCache = [];
        vm.enableGridAction = true;
        vm.hasRowSelected = false;
        vm.selectedRow = {};
        vm.newData = null;
        vm.unselectedSecurities = [];
        vm.selectedSecurities = [];
        vm.canSaveData = false;
        vm.oldValue = null;
        var userWatcher;
        var selectedSecurityGroupWatcher;

        vm.addSymbolGroup = function () {
            vm.enableGridAction = false;
            vm.newData = {
                SecurityGroupID: -1,
                SecurityGroupName: "",
                SecurityInGroup: [],
                Action: "Create"
            };

            vm.gridOption.data.push(vm.newData);
            vm.gridApi.grid.modifyRows(vm.gridOption.data);
            vm.gridApi.selection.selectRow(vm.newData);
            vm.canSaveData = true;
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
                    vm.gridApi.selection.selectRow(vm.gridOption.data[nextSelectedIndex])
                }
            });
        }

        vm.saveSymbolGroup = function () {
            if (vm.newData) {
                dataService.saveSymbolGroup(vm.newData).success(function (res) {
                    vm.enableGridAction = true;
                    vm.newData = null;
                    vm.canSaveData = false;
                });
            }
            else {
                vm.selectedRow.SecurityInGroup = [];
                _.forEach(vm.selectedSecurities, function (selectedSecurity) {
                    vm.selectedRow.SecurityInGroup.push(selectedSecurity.SecurityID);
                });
                dataService.saveSymbolGroup(vm.selectedRow).success(function (res) {
                    vm.enableGridAction = true;
                    vm.newData = null;
                    vm.canSaveData = false;
                });
            }
        }

        vm.cancel = function () {
            releaseWatcher();
            vm.canSaveData = false;
            if (vm.oldValue) {
                vm.selectedRow.SecurityGroupName = vm.oldValue.SecurityGroupName;
            }
            initializeGroupEditor();
            setWatcher();
        }

        vm.selectedDataChanged = function () {
            vm.canSaveData = true;
        };

        function initialize() {
            initializeSecurities();
            initializeGrid();
            dataService.setCurrentSettingPage("券池组设置");
            dataService.getSymbolGroups().success(function (data) {
                vm.gridOption.data = data;
            });
            $scope.$on("$destroy", function () {
                releaseWatcher();
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
                        if (row.entity == vm.selectedRow && !row.isSelected) {
                            row.isSelected = true;
                            return;
                        }

                        vm.selectedRow = row.entity;
                        vm.hasRowSelected = true;
                        releaseWatcher();
                        initializeGroupEditor();
                        vm.oldValue = {
                            SecurityGroupName: vm.selectedRow.SecurityGroupName
                        };
                        if (vm.newData != null && vm.selectedRow != vm.newData) {
                            vm.enableGridAction = true;
                            vm.gridOption.data.splice(vm.gridOption.data.length - 1, 1);
                            vm.newData = null;
                        }
                        setWatcher();
                    });
                }
            };
        }

        function initializeSecurities() {
            dataService.getSymbols().success(function (data) {
                securityCache = data;
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
            vm.unselectedSecurities = allSecurities;
        }

        function setWatcher() {
            userWatcher = $scope.$watch("symbolGroupCtrl.selectedRow.SecurityGroupName", function (newValue, oldValue) {
                if (newValue != oldValue) {
                    vm.canSaveData = true;
                    vm.errorMessage = "";
                }
            });
        }

        function releaseWatcher() {
            if (userWatcher) {
                userWatcher();
            }
        }

        initialize();
    }];

    return symbolGroupController;
});