define(["lodash"], function (_) {
    'use strict';
    var shareHolderController = ["$scope", "dataService", function ($scope, dataService) {
        var vm = this;

        vm.enableGridAction = true;
        vm.hasRowSelected = false;
        vm.selectedRow = {};
        vm.newData = null;

        vm.addShareHolder = function () {
            vm.enableGridAction = false;
            vm.newData = {
                "ShareHolderID": "",
                "ShareHolderDesc": ""
            };

            vm.gridOption.data.splice(0, 0, vm.newData);
            vm.gridApi.grid.modifyRows(vm.gridOption.data);
            vm.gridApi.selection.selectRow(vm.newData);
        }

        vm.deleteShareHolder = function () {
            dataService.deleteShareHolder(vm.selectedRow.ShareHolderID).success(function () {
                var index = _.findIndex(vm.gridOption.data, function (shareHolder) {
                    return shareHolder.ShareHolderID == vm.selectedRow.ShareHolderID;
                });
                vm.gridOption.data.splice(index, 1);
                vm.gridApi.grid.modifyRows(vm.gridOption.data);
                if (vm.gridOption.data.length > 0) {
                    var nextSelectedIndex = index == vm.gridOption.data.length ? index - 1 : index;
                    vm.gridApi.selection.selectedRow(vm.gridOption.data[nextSelectedIndex])
                }
            });
        }

        vm.saveShareHolder = function () {
            dataService.saveShareHolder(vm.newData).success(function (res) {
                vm.enableGridAction = true;
                vm.newData = null;
            });
        }

        vm.cancel = function () {

        }

        function initialize() {
            initializeGrid();
            dataService.setCurrentSettingPage("股东代码设置");
            dataService.getShareHolders(function (res) {
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
                    { field: "ShareHolderID", displayName: "股东代码" },
                    { field: "ShareHolderDesc", displayName: "信息描述" }
                ],
                onRegisterApi: function (gridApi) {
                    vm.gridApi = gridApi;
                    vm.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                        vm.selectedRow = row.entity;
                        vm.hasRowSelected = true;
                        if (vm.newData != null && vm.selectedRow != vm.newData) {
                            vm.enableGridAction = true;
                            vm.gridOption.data.splice(vm.gridOption.data.length - 1, 1);
                            vm.newData = null;
                        }
                    });
                }
            };
        }

        initialize();
    }];

    return shareHolderController;
});