define([
    'lodash'
], function (_) {
    'use strict';
    var macAddressController = ["$scope", "dataService", function ($scope, dataService) {
        var vm = this;
        vm.enableGridAction = true;
        vm.hasRowSelected = false;
        vm.selectedRow = {};
        vm.newData = null;
        vm.users = [];

        vm.addMacAddress = function () {
            vm.enableGridAction = false;
            vm.newData = {
                TraderID: "",
                TraderName: "",
                CreateDate: "",
                MacAddress: ""
            };

            vm.gridOption.data.push(vm.newData);
            vm.gridApi.grid.modifyRows(vm.gridOption.data);
            vm.gridApi.selection.selectRow(vm.newData);
        }

        vm.deleteMacAddress = function () {
            // dataService.deleteMacAddress(vm.selectedRow.SecurityID).success(function () {
            //     var index = _.findIndex(vm.gridOption.data, function (symbol) {
            //         return symbol.SecurityID == vm.selectedRow.SecurityID;
            //     });
            //     vm.gridOption.data.splice(index, 1);
            //     vm.gridApi.grid.modifyRows(vm.gridOption.data);
            //     if (vm.gridOption.data.length > 0) {
            //         var nextSelectedIndex = index == vm.gridOption.data.length ? index - 1 : index;
            //         vm.gridApi.selection.selectedRow(vm.gridOption.data[nextSelectedIndex])
            //     }
            // });
        }

        vm.saveMacAddress = function () {
            // dataService.saveSymbol(vm.newData).success(function (res) {
            //     vm.enableGridAction = true;
            //     vm.newData = null;
            // });
        }

        vm.cancel = function () {

        }

        vm.openDataPicker = function () {
            vm.isOpen = true;
        }

        function initialize() {
            initializeGrid();
            vm.dateOptions = {
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1
            };
            dataService.setCurrentSettingPage("Mac地址设置");
            dataService.getMacAddress()
                .success(function (data) {
                    vm.gridOption.data = data;
                });
            dataService.getUsers(function (res) {
                vm.users = res.data;
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
                    { field: "CreateDate", displayName: "变动日期" },
                    { field: "TraderName", displayName: "交易员" },
                    { field: "MacAddress", displayName: "Mac地址" }
                ],
                onRegisterApi: function (gridApi) {
                    vm.gridApi = gridApi;
                    vm.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                        vm.selectedRow = row.entity;
                        vm.selectedRow.dateTime = convertToDateTime(vm.selectedRow.CreateDate);
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

        function convertToDateTime(date) {
            if (date && date.length > 0) {
                var year = date.slice(0, 4);
                var month = date.slice(4, 6) - 1;
                var day = date.slice(6);
                return new Date(year, month, day);
            }
            return new Date();
        }

        initialize();
    }];

    return macAddressController;
});