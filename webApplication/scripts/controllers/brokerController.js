define(['lodash'], function (_) {
    return ["$scope", "dataService", function ($scope, dataService) {
        'use strict';

        var vm = this;
        vm.enableGridAction = true;
        vm.hasRowSelected = false;
        vm.selectedRow = {};
        vm.newData = null;

        vm.addBroker = function () {
            vm.enableGridAction = false;
            vm.newData = {
                "BrokerID": 0,
                "BrokerName": "",
                "BrokerNote": ""
            };

            vm.gridOption.data.push(vm.newData);
            vm.gridApi.grid.modifyRows(vm.gridOption.data);
            vm.gridApi.selection.selectRow(vm.newData);
        }

        vm.deleteBroker = function () {
            dataService.deleteBroker(vm.selectedRow.BrokerID).success(function () {
                var index = _.findIndex(vm.gridOption.data, function (broker) {
                    return broker.BrokerID == vm.selectedRow.BrokerID;
                });
                vm.gridOption.data.splice(index, 1);
                vm.gridApi.grid.modifyRows(vm.gridOption.data);
                if (vm.gridOption.data.length > 0) {
                    var nextSelectedIndex = index == vm.gridOption.data.length ? index - 1 : index;
                    vm.gridApi.selection.selectRow(vm.gridOption.data[nextSelectedIndex])
                }
            });
        }

        vm.saveBroker = function () {
            dataService.saveBroker(vm.newData).success(function (res) {
                vm.gridOption.data[vm.gridOption.data.length - 1].BrokerID = res.data.BrokerID;
                vm.gridApi.grid.modifyRows(vm.gridOption.data);
                vm.enableGridAction = true;
                vm.newData = null;
            });
        }

        vm.cancel = function () {

        }

        function initialize() {
            initializeGrid();
            dataService.setCurrentSettingPage("券商设置");
            dataService.getBrokers(function (res) {
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
                    { field: "BrokerID", displayName: "" },
                    { field: "BrokerName", displayName: "券商" },
                    { field: "BrokerNote", displayName: "备注" }
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
    }]
});