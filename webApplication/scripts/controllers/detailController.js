define([
    "../common/common"
], function (common) {
    'use strict';
    var detailController = ["$scope", "dataService", function ($scope, dataService) {
        var vm = this;
        vm.fillGrid = {};
        vm.oddShareGrid = {};

        vm.filterData = function (data) {
            vm.fillGrid.gridOption.data = data.FillDataList;
        }

        vm.exportDataHandler = function () {
            var exportData = { columnDefs: vm.fillGrid.gridOption.columnDefs, exportDatas: vm.fillGrid.gridOption.data, sheetName: "交易明细统计表" }
            var content = common.formatAsExcel([
                exportData
            ]);
            common.downloadFile("交易明细统计表.xls", content);
        }

        function initialize() {
            var columnDefs = [
                { field: "OrderID", displayName: "委托编号", width: 150 },
                { field: "HasOddShare", displayName: "是否有零股", width: 100, cellTemplate: '<div class="grid-checkbox-cell"><input type="checkbox" disabled="true" ng-model="row.entity.HasOddShare"</div>' },
                { field: "TraderName", displayName: "交易员", width: 100 },
                { field: "CreateDate", displayName: "发生日期", width: 100 },
                { field: "BrokerName", displayName: "券商", width: 100 },
                { field: "FillPrice", displayName: "成交价格", width: 100, type: "Currency" },
                { field: "FillAmount", displayName: "成交数量", width: 100, type: "Currency" },
                { field: "FillMoneyAmount", displayName: "成交金额", width: 100, type: "Currency" },
                { field: "OperationName", displayName: "业务名称", width: 150 },
                { field: "SecurityResidualAmount", displayName: "股份余额", width: 100, type: "Currency" },
                { field: "ExchangeFee", displayName: "手续费", width: 100, type: "Currency" },
                { field: "StampTax", displayName: "印花税", width: 100, type: "Currency" },
                { field: "TransfterDuty", displayName: "过户税", width: 100, type: "Currency" },
                { field: "ExtraCharge", displayName: "附加费", width: 100, type: "Currency" },
                { field: "ExchangeCustodianFee", displayName: "交易所清算费用", width: 100, type: "Currency" },
                { field: "TotalChargeMoneyAmount", displayName: "发生金额", width: 100, type: "Currency" },
                { field: "CashAccountResidual", displayName: "资金本次余额", width: 100, type: "Currency" },
                { field: "ShareHolderID", displayName: "股东编号", width: 100 },
                { field: "CashAccountID", displayName: "资金账号", width: 100 },
                { field: "SecurityID", displayName: "证券代码", width: 100 },
                { field: "SecurityName", displayName: "证券名称", width: 100 },
                { field: "OrderAction", displayName: "委托方向", width: 100 }
            ];
            vm.fillGrid.gridOption = {
                data: [],
                enableSorting: false,
                enableRowSelection: true,
                enableRowHeaderSelection: false,
                multiSelect: false,
                modifierKeysToMultiSelect: false,
                columnDefs: columnDefs,
                onRegisterApi: function (gridApi) {
                    vm.fillGrid.gridApi = gridApi;
                    vm.fillGrid.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                        var data = row.entity;
                        if (data && data.OddShare) {
                            var oddShareData = [];
                            oddShareData.push(data.OddShare);
                            vm.oddShareGrid.gridOption.data = oddShareData;
                        }
                        else {
                            vm.oddShareGrid.gridOption.data = [];
                        }
                    });
                }
            };

            var oddShareColumnDefs = [
                { field: "OrderID", displayName: "委托编号", width: 150 },
                { field: "OddShareAmount", displayName: "零股数量", width: 100 },
                { field: "CreateDate", displayName: "委托日期", width: 100 },
                { field: "FillTime", displayName: "成交时间", width: 100 },
                { field: "FillAmount", displayName: "成交数量", width: 100 },
                { field: "OrderAmount", displayName: "委托数量", width: 100 },
                { field: "OperationName", displayName: "操作名称", width: 150 },
                { field: "FillPrice", displayName: "成交价格", width: 100 },
                { field: "SecurityID", displayName: "证券代码", width: 100 },
                { field: "SecurityName", displayName: "证券名称", width: 100 }
            ];
            vm.oddShareGrid.gridOption = {
                data: [],
                enableSorting: false,
                enableRowSelection: true,
                enableRowHeaderSelection: false,
                multiSelect: false,
                modifierKeysToMultiSelect: false,
                columnDefs: oddShareColumnDefs
            }
        }

        initialize();
    }];

    return detailController;
});