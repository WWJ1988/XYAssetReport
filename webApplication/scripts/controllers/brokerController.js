define(['lodash'], function (_) {
    return ["$scope", "$timeout", "$q", "dataService", function ($scope, $timeout, $q, dataService) {
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
        vm.canSaveData = false;

        vm.addBroker = function () {
            vm.enableGridAction = false;
            vm.canSaveData = true;
            vm.newData = {
                "BrokerID": 0,
                "BrokerName": "",
                "BrokerNote": ""
            };

            vm.gridOption.data.push(vm.newData);
            vm.gridApi.grid.modifyRows(vm.gridOption.data);
            vm.gridApi.selection.selectRow(vm.newData);
        };

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
        };

        vm.saveBroker = function () {
            if (vm.newData) {
                dataService.saveBroker(vm.newData).success(function (data) {
                    vm.gridOption.data[vm.gridOption.data.length - 1].BrokerID = data.BrokerID;
                    vm.gridApi.grid.modifyRows(vm.gridOption.data);
                    vm.enableGridAction = true;
                    vm.newData = null;
                    vm.canSaveData = false;
                });
            }
            else {
                var brokerColumns = _.filter(vm.columnCache, function (columnData) {
                    return columnData.BrokerID == vm.selectedRow.BrokerID;
                });
                var changedColumns = [];
                _.forEach(brokerColumns, function (columnData) {
                    var changedColumn = null;
                    switch (columnData.ColumnMapType) {
                        case "Order":
                            changedColumn = findChangedColumn(columnData, vm.weituo.gridOption.data);
                            break;
                        case "FillFromBroker":
                            changedColumn = findChangedColumn(columnData, vm.jiaoge.gridOption.data);
                            break;
                        case "FillFromTrading":
                            changedColumn = findChangedColumn(columnData, vm.zijinliushui.gridOption.data);
                            break;
                        case "Position":
                            changedColumn = findChangedColumn(columnData, vm.zijingufen.gridOption.data);
                            break;
                    }
                    if (changedColumn) {
                        columnData.IsEnabled = changedColumn.IsEnabled;
                        columnData.BrokerColumnName = changedColumn.BrokerColumnName;
                        changedColumns.push(changedColumn);
                    }
                });
                if (changedColumns.length > 0) {
                    dataService.saveColumnMaps(changedColumns).success(function () {
                        vm.enableGridAction = true;
                        vm.canSaveData = false;
                    });
                }
            }
        };

        vm.cancel = function () {
            vm.canSaveData = false;
            groupColumnData();
        };

        vm.dataChanged = function (type) {
            vm.canSaveData = true;
        };

        vm.templateSaveColumns = function (rowEntity) {
            var promise = $q.defer();
            vm.canSaveData = true;
            switch (rowEntity.ColumnMapType) {
                case "Order":
                    vm.weituo.gridApi.rowEdit.setSavePromise(rowEntity, promise.promise);
                    break;
                case "FillFromBroker":
                    vm.jiaoge.gridApi.rowEdit.setSavePromise(rowEntity, promise.promise);
                    break;
                case "FillFromTrading":
                    vm.zijinliushui.gridApi.rowEdit.setSavePromise(rowEntity, promise.promise);
                    break;
                default:
                    vm.zijingufen.gridApi.rowEdit.setSavePromise(rowEntity, promise.promise);
                    break;
            }

            $timeout(function () {
                promise.resolve();
            });
        };

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
                        if (row.entity == vm.selectedRow && !row.isSelected) {
                            row.isSelected = true;
                            return;
                        }
                        vm.cancel();
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
                { field: "StandardColumnName", displayName: "标准表头", enableCellEdit: false },
                { field: "BrokerColumnName", displayName: "自定义表头", enableCellEdit: true },
                { field: "IsEnabled", displayName: "是否启用", cellTemplate: '<div class="grid-checkbox-cell"><input type="checkbox" ng-model="row.entity.IsEnabled" ng-click="grid.appScope.brokerCtrl.dataChanged()"</div>' }
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
                onRegisterApi: function (gridApi) {
                    data.gridApi = gridApi;
                    data.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                        if (row.entity == data.selectedRow && !row.isSelected) {
                            row.isSelected = true;
                            return;
                        }

                        data.selectedRow = row.entity;
                    });
                    data.gridApi.rowEdit.on.saveRow($scope, vm.templateSaveColumns);
                }
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
                        var clonedColumnData = _.cloneDeep(columnData);
                        switch (clonedColumnData.ColumnMapType) {
                            case "Order":
                                weituoData.push(clonedColumnData);
                                break;
                            case "FillFromBroker":
                                jiaogeData.push(clonedColumnData);
                                break;
                            case "FillFromTrading":
                                zinjinliushuiData.push(clonedColumnData);
                                break;
                            case "Position":
                                zijingufenData.push(clonedColumnData);
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

        function findChangedColumn(originalColumn, gridData) {
            return _.find(gridData, function (data) {
                if (data.StandardColumnName == originalColumn.StandardColumnName) {
                    return data.BrokerColumnName != originalColumn.BrokerColumnName || data.IsEnabled != originalColumn.IsEnabled;
                }

                return false;
            });
        }

        vm.setTab = function (index) {
            $timeout(function () {
                vm.selectedTabIndex = index;
            }, 50);
        }

        initialize();
    }]
});