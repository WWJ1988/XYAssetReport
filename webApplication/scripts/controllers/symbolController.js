define(['lodash'], function (_) {
    var symbolController = ["$scope", "dataService", function ($scope, dataService) {
        var vm = this;
        vm.enableGridAction = true;
        vm.hasRowSelected = false;
        vm.canSaveData = false;
        vm.selectedRow = {};
        vm.newData = null;
        vm.oldValue = null;
        var userWatcher = null;

        vm.addSymbol = function () {
            vm.enableGridAction = false;
            vm.canSaveData = true;
            vm.newData = {
                SecurityID: "",
                SecurityName: "",
                HoldingAmount: 0,
                ExchangeName: "深交所",
                IsCreate: true
            };

            vm.gridOption.data = _.concat(vm.newData, vm.gridOption.data);
            vm.gridApi.grid.modifyRows(vm.gridOption.data);
            vm.gridApi.selection.selectRow(vm.newData);
        }

        vm.deleteSymbol = function () {
            dataService.deleteSymbol(vm.selectedRow.SecurityID).success(function () {
                var index = _.findIndex(vm.gridOption.data, function (symbol) {
                    return symbol.SecurityID == vm.selectedRow.SecurityID;
                });
                vm.gridOption.data.splice(index, 1);
                vm.gridApi.grid.modifyRows(vm.gridOption.data);
                if (vm.gridOption.data.length > 0) {
                    var nextSelectedIndex = index == vm.gridOption.data.length ? index - 1 : index;
                    vm.gridApi.selection.selectRow(vm.gridOption.data[nextSelectedIndex])
                }
            });
        }

        vm.saveSymbol = function () {
            var saveData = vm.newData ? vm.newData : vm.selectedRow;
            dataService.saveSymbol(saveData).success(function (res) {
                vm.enableGridAction = true;
                vm.newData = null;
                vm.canSaveData = false;
            });
        }

        vm.cancel = function () {
            if (vm.oldValue) {
                _.assign(vm.selectedRow, vm.oldValue);
            }
            vm.canSaveData = false;
        }

        function initialize() {
            initializeGrid();
            dataService.setCurrentSettingPage("券池设置");
            dataService.getSymbols().success(function (data) {
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
                    { field: "SecurityID", displayName: "证券代码" },
                    { field: "SecurityName", displayName: "证券名称" },
                    { field: "HoldingAmount", displayName: "交易所" },
                    { field: "ExchangeName", displayName: "持仓数量" }
                ],
                onRegisterApi: function (gridApi) {
                    vm.gridApi = gridApi;
                    vm.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                        if (row.entity == vm.selectedRow && !row.isSelected) {
                            row.isSelected = true;
                            return;
                        }
                        releaseWatcher();
                        vm.cancel();
                        vm.selectedRow = row.entity;
                        vm.hasRowSelected = true;
                        vm.oldValue = _.cloneDeep(row.entity);
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

        function setWatcher() {
            userWatcher = $scope.$watch("symbolCtrl.selectedRow", function (newValue, oldValue) {
                if (!oldValue["$$hashKey"]) {
                    oldValue["$$hashKey"] = newValue["$$hashKey"];
                }
                if (newValue == oldValue) {
                    vm.canSaveData = false;
                }
                else {
                    vm.canSaveData = true;
                    vm.errorMessage = "";
                }

            }, true);
        }

        function releaseWatcher() {
            if (userWatcher) {
                userWatcher();
            }
        }
        initialize();
    }];

    return symbolController;
});