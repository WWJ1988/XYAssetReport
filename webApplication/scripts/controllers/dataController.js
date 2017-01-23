define([
    'lodash'
], function (_) {
    'use strict';
    var dataController = ["$scope", "$timeout", "dataService", function ($scope, $timeout, dataService) {
        var vm = this;
        var actionCellTemplate = "<div class='grid-action'><a ng-click='grid.appScope.dataCtrl.removeImportedFill(row)'><span class='glyphicon glyphicon-remove'></span></a></div>";
        vm.selectedBrokerId = -1;
        vm.enableClearData = false;
        vm.enableSaveToDB = false;
        vm.brokers = [{ BrokerID: -1, BrokerName: "查看所有数据" }];
        vm.selectedTabIndex = 1;
        vm.importGrid = {};
        vm.stockFillGrid = {};
        vm.validationGrid = {};
        vm.allData = [];

        vm.selectBroker = function () {
            vm.importGrid.gridOption.data = _.filter(vm.allData, function (data) {
                return data.BrokerID == vm.selectedBrokerId;
            });
        };

        vm.setTab = function (index) {
            $timeout(function () {
                vm.selectedTabIndex = index;
            }, 50);
        };

        vm.removeImportedFill = function (fillData) {
            var result = confirm("是否要删除该数据？");
            if (result) {
                dataService.deleteFill(fillData.entity)
                    .success(function () {
                        _.remove(vm.importGrid.gridOption.data, function (data) {
                            return data == fillData.entity;
                        });
                        vm.importGrid.gridApi.grid.modifyRows(vm.importGrid.gridOption.data);
                    });

            }
        };

        function initialize() {
            initializeImportDataGrid();
            initializeStockFillGrid();
            initializeValidationGrid();
            dataService.getBrokers()
                .success(function (data) {
                    vm.brokers.push.apply(vm.brokers, data);
                });

            dataService.getFills()
                .success(function (data) {
                    vm.allData = data;
                });
        }

        function initializeImportDataGrid() {
            var columnDefs = [
                { field: "CreateDate", displayName: "数据日期" },
                { field: "CashAccountID", displayName: "资金账号" },
                { field: "BrokerName", displayName: "券商名称" },
                { field: "OrderID", displayName: "操作", cellTemplate: actionCellTemplate, width: 60, enableColumnMenu: false }

            ];
            initializeGrid(vm.importGrid, columnDefs);
        }

        function initializeStockFillGrid() {
            var columnDefs = [
                { field: "OrderID", displayName: "委托编号", width: 100 },
                { field: "CreateDate", displayName: "成交日期", width: 100 },
                { field: "FillTime", displayName: "成交时间", width: 100 },
                { field: "BrokerName", displayName: "券商", width: 100 },
                { field: "FillPrice", displayName: "成交价格", width: 100 },
                { field: "FillAmount", displayName: "成交数量", width: 100 },
                { field: "FillMoneyAmount", displayName: "成交金额", width: 100 },
                { field: "OperationName", displayName: "业务名称", width: 100 },
                { field: "SecurityResidualAmount", displayName: "股票剩余", width: 100 },
                { field: "ExchangeFee", displayName: "手续费", width: 100 },
                { field: "StampTax", displayName: "印花税", width: 100 },
                { field: "TransfterDuty", displayName: "过户税", width: 100 },
                { field: "ExtraCharge", displayName: "额外费用", width: 100 },
                { field: "ExchangeCustodianFee", displayName: "交易所清算费用", width: 100 },
                { field: "TotalChargeMoneyAmount", displayName: "发生总金额", width: 100 },
                { field: "CashAccountResidual", displayName: "资金剩余", width: 100 },
                { field: "CashAccountID", displayName: "资金账号", width: 100 },
                { field: "ShareHolderID", displayName: "股东编号", width: 100 },
                { field: "FillCurrency", displayName: "成交币种", width: 100 },
                { field: "FillNotes", displayName: "成交备注", width: 100 },
                { field: "SecurityID", displayName: "证券代码", width: 100 },
                { field: "SecurityName", displayName: "证券名称", width: 100 },
                { field: "TraderName", displayName: "交易员", width: 100 },
                { field: "OrderAction", displayName: "买卖方向", width: 100 },
                { field: "ExchangeName", displayName: "交易所", width: 100 }

            ];
            initializeGrid(vm.stockFillGrid, columnDefs);
        }

        function initializeValidationGrid() {
            var columnDefs = [
                { field: "OrderID", displayName: "委托编号", width: 100 },
                { field: "Message", displayName: "提示信息" }

            ];
            initializeGrid(vm.validationGrid, columnDefs);
        }

        function initializeGrid(gridData, columnDefs) {
            gridData.gridOption = {
                data: [],
                enableSorting: false,
                enableRowSelection: true,
                enableRowHeaderSelection: false,
                multiSelect: false,
                modifierKeysToMultiSelect: false,
                columnDefs: columnDefs
            }
        }

        initialize();
    }];

    return dataController;
});