define(['lodash'], function (_) {
    return ["$scope", "$timeout", "dataService", function ($scope, $timeout, dataService) {
        'use strict';

        var vm = this;
        vm.enableGridAction = true;
        vm.hasRowSelected = false;
        vm.selectedRow = {};
        vm.newData = null;
        vm.selectedTabIndex = 1;
        vm.columnCache = null;
        vm.weituo = {};
        vm.jiaoge = {};
        vm.zijinliushui = {};
        vm.zijingufen = {};

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
            dataService.saveBroker(vm.newData).success(function (data) {
                vm.gridOption.data[vm.gridOption.data.length - 1].BrokerID = data.BrokerID;
                vm.gridApi.grid.modifyRows(vm.gridOption.data);
                vm.enableGridAction = true;
                vm.newData = null;
            });
        }

        vm.cancel = function () {

        }

        function initialize() {
            initializeGrid();
            initializeColumnTables();
            dataService.setCurrentSettingPage("券商设置");
            dataService.getBrokers()
                .success(function (data) {
                    vm.gridOption.data = data;
                });
            dataService.getColumnMaps()
                .success(function (data) {
                    vm.columnCache = data;
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
                        groupColumnData();
                        if (vm.newData != null && vm.selectedRow != vm.newData) {
                            vm.enableGridAction = true;
                            vm.gridOption.data.splice(vm.gridOption.data.length - 1, 1);
                            vm.newData = null;
                        }
                    });
                }
            };
        }

        function initializeColumnTables() {
            var columnDefs = [
                { field: "StandardColumnName", displayName: "标准表头" },
                { field: "BrokerColumnName", displayName: "自定义表头" },
                { field: "IsEnabled", displayName: "是否启用" }
            ];

            initializeColumnGrid(vm.weituo, columnDefs);
            initializeColumnGrid(vm.jiaoge, columnDefs);
            initializeColumnGrid(vm.zijinliushui, columnDefs);
            initializeColumnGrid(vm.zijingufen, columnDefs);
        }

        function initializeColumnGrid(data, columnDefs) {
            data.gridOption = {
                data: [],
                enableSorting: false,
                enableRowSelection: true,
                enableRowHeaderSelection: false,
                multiSelect: false,
                modifierKeysToMultiSelect: false,
                columnDefs: columnDefs,
            };
        }

        function groupColumnData() {
            if (vm.columnCache && vm.columnCache.length > 0) {
                var weituoData = [];
                var jiaogeData = [];
                var zinjinliushuiData = [];
                var zijingufenData = [];
                _.forEach(vm.columnCache, function (columnData) {
                    if (columnData.BrokerID == vm.selectedRow.BrokerID) {
                        switch (columnData.ColumnMapType) {
                            case "Order":
                                weituoData.push(columnData);
                                break;
                            case "FillFromBroker":
                                jiaogeData.push(columnData);
                                break;
                            case "FillFromTrading":
                                zinjinliushuiData.push(columnData);
                                break;
                            case "Position":
                                zijingufenData.push(columnData);
                                break;
                        }
                    }
                });
                vm.weituo.gridOption.data = weituoData;
                vm.jiaoge.gridOption.data = jiaogeData;
                vm.zijinliushui.gridOption.data = zinjinliushuiData;
                vm.zijingufen.gridOption.data = zijingufenData;
            }
        }

        vm.setTab = function (index) {
            $timeout(function () {
                vm.selectedTabIndex = index;
            }, 50);
        }

        initialize();
    }]
});