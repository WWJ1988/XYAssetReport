define([
    'lodash',
    "../common/common"
], function (_, common) {
    'use strict';
    var summaryReportController = ["$scope", "$timeout", 'uiGridGroupingConstants', "dataService", function ($scope, $timeout, uiGridGroupingConstants, dataService) {
        var gridGroupTemplate = '<div ng-if="grid.appScope.summaryReportCtrl.showGroup(col,row)" class="ui-grid-cell-contents" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div>';
        var vm = this;
        vm.selectedTabIndex = 1;
        vm.showTabMenu = false;
        vm.fees = [];
        vm.orderSummaryData = {
            selectedTabIndex: 1,
            summaryGrid: {},
            departmentGrid: {},
            traderGrid: {},
            securityGrid: {},
            accountGrid: {},
            brokerGrid: {},
            shareHolderGrid: {}
        };
        vm.marketValueData = {};
        vm.pnlData = {
            selectedTabIndex: -1,
            summaryGrid: {},
            departmentGrid: {},
            traderGrid: {},
            securityGrid: {},
            accountGrid: {},
            brokerGrid: {},
            shareHolderGrid: {}
        };
        vm.feeData = {
            selectedTabIndex: -1,
            summaryGrid: {},
            departmentGrid: {},
            traderGrid: {},
            securityGrid: {},
            accountGrid: {},
            brokerGrid: {},
            shareHolderGrid: {}
        };
        vm.dailySummaryData = {
            selectedTabIndex: -1,
            dayTab: true,
            weekTab: true,
            monthTab: true,
            yearTab: true,
            dayGrid: {},
            weeklyGrid: {},
            monthlyGrid: {},
            yearGrid: {}
        };
        vm.exportData = {};

        vm.setTab = function (index, type) {
            $timeout(function () {
                switch (type) {
                    case 0:
                        vm.selectedTabIndex = index;
                        break;
                    case 1:
                        vm.orderSummaryData.selectedTabIndex = index;
                        break;
                    case 2:
                        vm.pnlData.selectedTabIndex = index;
                        break;
                    case 3:
                        vm.feeData.selectedTabIndex = index;
                        break;
                    case 4:
                        vm.dailySummaryData.selectedTabIndex = index;
                        break;
                }

            }, 50);
        };

        vm.filterData = function (data) {
            var fills = data.FillDataList;
            var fees = vm.fees;
            var summaryData = groupDataByType("SingleReport", fills, fees);
            var departmentGridData = groupDataByType("DepartmentName", fills, fees);
            var traderGridData = groupDataByType("TraderName", fills, fees);
            var securityGridData = groupDataByType("SecurityName", fills, fees);
            var brokerGridData = groupDataByType("BrokerName", fills, fees);
            var accountGridData = groupDataByType("CashAccountID", fills, fees);
            var shareholderGridData = groupDataByType("ShareHolderID", fills, fees);
            vm.orderSummaryData.summaryGrid.gridOption.data = summaryData;
            vm.orderSummaryData.departmentGrid.gridOption.data = departmentGridData;
            vm.orderSummaryData.traderGrid.gridOption.data = traderGridData;
            vm.orderSummaryData.securityGrid.gridOption.data = securityGridData;
            vm.orderSummaryData.accountGrid.gridOption.data = accountGridData;
            vm.orderSummaryData.brokerGrid.gridOption.data = brokerGridData;
            vm.orderSummaryData.shareHolderGrid.gridOption.data = shareholderGridData;

            vm.pnlData.summaryGrid.gridOption.data = summaryData;
            vm.pnlData.departmentGrid.gridOption.data = departmentGridData;
            vm.pnlData.traderGrid.gridOption.data = traderGridData;
            vm.pnlData.securityGrid.gridOption.data = securityGridData;
            vm.pnlData.accountGrid.gridOption.data = accountGridData;
            vm.pnlData.brokerGrid.gridOption.data = brokerGridData;
            vm.pnlData.shareHolderGrid.gridOption.data = shareholderGridData;

            vm.feeData.summaryGrid.gridOption.data = summaryData;
            vm.feeData.departmentGrid.gridOption.data = departmentGridData;
            vm.feeData.traderGrid.gridOption.data = traderGridData;
            vm.feeData.securityGrid.gridOption.data = securityGridData;
            vm.feeData.accountGrid.gridOption.data = accountGridData;
            vm.feeData.brokerGrid.gridOption.data = brokerGridData;
            vm.feeData.shareHolderGrid.gridOption.data = shareholderGridData;

            vm.marketValueData.gridOption.data = data.PositionList;

            vm.dailySummaryData.dayGrid.gridOption.data = getSumList(data.DailySummaryList, generateDayItemKey, "dayData");
            vm.dailySummaryData.weeklyGrid.gridOption.data = getSumList(data.DailySummaryList, generateWeekItemKey, "weekData");
            vm.dailySummaryData.monthlyGrid.gridOption.data = getSumList(data.DailySummaryList, generateMonthItemKey, "monthData");
            vm.dailySummaryData.yearGrid.gridOption.data = getSumList(data.DailySummaryList, generateYearItemKey, "yearData");

            var singleFeeRate = data.singleFeeRate;
        };

        vm.exportDataHandler = function () {
            dataService.setLoading(function () {
                if (vm.selectedTabIndex == 1) {
                    var exportData = getExportData(vm.orderSummaryData, "交易结果统计表");
                    var content = common.formatAsExcel([
                        exportData
                    ]);
                    common.downloadFile("交易结果统计表.xls", content);
                }
                else if (vm.selectedTabIndex == 2) {
                    var exportData = getExportData(vm.pnlData, "盈亏统计表");
                    var content = common.formatAsExcel([
                        exportData
                    ]);
                    common.downloadFile("盈亏统计表.xls", content);
                }
                else if (vm.selectedTabIndex == 3) {
                    var exportData = getExportData(vm.feeData, "交易税费统计表");
                    var content = common.formatAsExcel([
                        exportData
                    ]);
                    common.downloadFile("交易税费统计表.xls", content);
                }
                else if (vm.selectedTabIndex == 4) {
                    var content = common.formatAsExcel([
                        { columnDefs: vm.marketValueData.gridOption.columnDefs, exportDatas: vm.marketValueData.gridOption.data, sheetName: "股票市值盈亏统计表" }
                    ]);
                    common.downloadFile("股票市值盈亏统计表.xls", content);
                }
                else if (vm.selectedTabIndex == 5) {
                    var exportData = [];
                    if (vm.dailySummaryData.dayTab) {
                        exportData.push({ columnDefs: vm.dailySummaryData.dayGrid.gridOption.columnDefs, exportDatas: vm.exportData["dayData"], sheetName: "日小结" });
                    }
                    if (vm.dailySummaryData.weekTab) {
                        exportData.push({ columnDefs: vm.dailySummaryData.dayGrid.gridOption.columnDefs, exportDatas: vm.exportData["weekData"], sheetName: "周小结" });
                    }
                    if (vm.dailySummaryData.monthTab) {
                        exportData.push({ columnDefs: vm.dailySummaryData.dayGrid.gridOption.columnDefs, exportDatas: vm.exportData["monthData"], sheetName: "月小结" });
                    }
                    if (vm.dailySummaryData.yearTab) {
                        exportData.push({ columnDefs: vm.dailySummaryData.dayGrid.gridOption.columnDefs, exportDatas: vm.exportData["yearData"], sheetName: "年小结" });
                    }
                    var content = common.formatAsExcel(exportData, true);
                    common.downloadFile("交易员业绩统计表.xls", content);
                }
            });
        };

        vm.showGroup = function (col, row) {
            return !col.grouping ||
                col.grouping.groupPriority === undefined ||
                col.grouping.groupPriority === null ||
                (row.groupHeader && col.grouping.groupPriority === row.treeLevel);
        };

        vm.removeTab = function (index, type, e) {
            if (e) {
                e.preventDefault();
            }
            if (index == 1) {
                vm.dailySummaryData.dayTab = false;
            }
            else if (index == 2) {
                vm.dailySummaryData.weekTab = false;
            }
            else if (index == 3) {
                vm.dailySummaryData.monthTab = false;
            }
            else if (index == 4) {
                vm.dailySummaryData.yearTab = false;
            }
        };

        vm.addTab = function (index, e) {
            if (e) {
                e.preventDefault();
            }
            if (index == 1) {
                vm.dailySummaryData.dayTab = true;
            }
            else if (index == 2) {
                vm.dailySummaryData.weekTab = true;
            }
            else if (index == 3) {
                vm.dailySummaryData.monthTab = true;
            }
            else if (index == 4) {
                vm.dailySummaryData.yearTab = true;
            }
        }

        vm.showAddTab = function () {
            return !vm.dailySummaryData.dayTab || !vm.dailySummaryData.weekTab || !vm.dailySummaryData.monthTab || !vm.dailySummaryData.yearTab;
        }

        vm.setTabMenuStatus = function (e) {
            vm.showTabMenu = !vm.showTabMenu;
            e.preventDefault();
        }

        vm.hideTabMenu = function () {
            vm.showTabMenu = false;
        }

        function getExportData(data, sheetName) {
            var grid;
            switch (data.selectedTabIndex) {
                case 1:
                    grid = data.summaryGrid;
                    break;
                case 2:
                    grid = data.departmentGrid;
                    break;
                case 3:
                    grid = data.traderGrid;
                    break;
                case 4:
                    grid = data.securityGrid;
                    break;
                case 5:
                    grid = data.accountGrid;
                    break;
                case 6:
                    grid = data.brokerGrid;
                    break;
                default:
                    grid = data.shareHolderGrid;
                    break;
            }
            return {
                columnDefs: grid.gridOption.columnDefs,
                exportDatas: grid.gridOption.data,
                sheetName: sheetName
            };
        }

        function initializeOrderSummaryGrid() {
            var columnDefs = [
                { field: "TotalFillAmount", displayName: "总成交数量", width: 100, type: "Currency" },
                { field: "TotalOrderCount", displayName: "总交易笔数", width: 100, type: "Currency" },
                { field: "LongOrderCount", displayName: "多头笔数", width: 100, type: "Currency" },
                { field: "ShortOrderCount", displayName: "空头笔数", width: 100, type: "Currency" },
                { field: "ProfitOrderCount", displayName: "盈利笔数", width: 100, type: "Currency" },
                { field: "LossOrderCount", displayName: "损失笔数", width: 100, type: "Currency" }
            ];
            InitializeGrid(vm.orderSummaryData.summaryGrid, columnDefs);

            var departmentColumnDefs = _.concat([{ field: "DepartmentName", displayName: "部门名称", width: 100 }], columnDefs);
            InitializeGrid(vm.orderSummaryData.departmentGrid, departmentColumnDefs);

            var traderColumnDefs = _.concat([{ field: "TraderName", displayName: "交易员", width: 100 }], columnDefs);
            InitializeGrid(vm.orderSummaryData.traderGrid, traderColumnDefs);

            var securityColumnDefs = _.concat([{ field: "SecurityName", displayName: "证券名称", width: 100 }], columnDefs);
            InitializeGrid(vm.orderSummaryData.securityGrid, securityColumnDefs);

            var accountColumnDefs = _.concat([{ field: "CashAccountID", displayName: "资金账号", width: 100 }], columnDefs);
            InitializeGrid(vm.orderSummaryData.accountGrid, accountColumnDefs);

            var brokerColumnDefs = _.concat([{ field: "BrokerName", displayName: "券商", width: 100 }], columnDefs);
            InitializeGrid(vm.orderSummaryData.brokerGrid, brokerColumnDefs);

            var shareHolderColumnDefs = _.concat([{ field: "ShareHolderID", displayName: "股东代码", width: 100 }], columnDefs);
            InitializeGrid(vm.orderSummaryData.shareHolderGrid, shareHolderColumnDefs);
        }

        function initializeMarketValueGrid() {
            var columnDefs = [
                { field: "CreateDate", displayName: "发生日期", width: 100 },
                { field: "BrokerName", displayName: "券商", width: 100 },
                { field: "SecurityID", displayName: "证券代码", width: 100 },
                { field: "SecurityName", displayName: "证券名称", width: 100 },
                { field: "HoldingAmount", displayName: "参考持股", width: 100, type: "Currency" },
                { field: "SellableAmount", displayName: "可用股份", width: 100, type: "Currency" },
                { field: "CostPrice", displayName: "成本价", width: 100, type: "Currency" },
                { field: "CurrentPrice", displayName: "当前价", width: 100, type: "Currency" },
                { field: "CurrentCost", displayName: "当前成本", width: 100, type: "Currency" },
                { field: "MarketValue", displayName: "最新市值", width: 100, type: "Currency" },
                { field: "FloatingPnl", displayName: "浮动盈亏", width: 100, type: "Currency" },
                { field: "PnlPercentage", displayName: "盈亏比例", width: 100, type: "Currency" },
                { field: "LockAmount", displayName: "冻结数量", width: 100, type: "Currency" },
                { field: "ZaiTuGuFen", displayName: "在途股份", width: 100, type: "Currency" },
                { field: "ResidualAmount", displayName: "股份余额", width: 100, type: "Currency" },
                { field: "CashAccountID", displayName: "资金账号", width: 100 }
            ];
            InitializeGrid(vm.marketValueData, columnDefs);
        }

        function initializePnlGrid() {
            var columnDefs = [
                { field: "ProfitLoss", displayName: "盈亏总额", width: 100, type: "Currency" },
                { field: "TotalFillAmount", displayName: "总成交数量", width: 100, type: "Currency" },
                { field: "TotalFillMoneyAmount", displayName: "总成交金额", width: 100, type: "Currency" },
                { field: "MaxFillMoneyAmount", displayName: "最大成交金额", width: 100, type: "Currency" },
                { field: "AverageFillMoneyAmount", displayName: "平均成交金额", width: 100, type: "Currency" },
                { field: "TotalFee", displayName: "总费用", width: 100, type: "Currency" },
                { field: "MaxFillAmount", displayName: "最大成交量", width: 100, type: "Currency" },
                { field: "AverageFillAmount", displayName: "平均成交量", width: 100, type: "Currency" }
            ];
            InitializeGrid(vm.pnlData.summaryGrid, columnDefs);

            var departmentColumnDefs = _.concat([{ field: "DepartmentName", displayName: "部门名称", width: 100 }], columnDefs);
            InitializeGrid(vm.pnlData.departmentGrid, departmentColumnDefs);

            var traderColumnDefs = _.concat([{ field: "TraderName", displayName: "交易员", width: 100 }], columnDefs);
            InitializeGrid(vm.pnlData.traderGrid, traderColumnDefs);

            var securityColumnDefs = _.concat([{ field: "SecurityName", displayName: "证券名称", width: 100 }], columnDefs);
            InitializeGrid(vm.pnlData.securityGrid, securityColumnDefs);

            var accountColumnDefs = _.concat([{ field: "CashAccountID", displayName: "资金账号", width: 100 }], columnDefs);
            InitializeGrid(vm.pnlData.accountGrid, accountColumnDefs);

            var brokerColumnDefs = _.concat([{ field: "BrokerName", displayName: "券商", width: 100 }], columnDefs);
            InitializeGrid(vm.pnlData.brokerGrid, brokerColumnDefs);

            var shareHolderColumnDefs = _.concat([{ field: "ShareHolderID", displayName: "股东代码", width: 100 }], columnDefs);
            InitializeGrid(vm.pnlData.shareHolderGrid, shareHolderColumnDefs);
        }

        function initializeFeeGrid() {
            var columnDefs = [
                { field: "TotalExchangeFee", displayName: "总手续费", width: 100, type: "Currency" },
                { field: "TotalStampTax", displayName: "总印花税", width: 100, type: "Currency" },
                { field: "TotalTransfterDuty", displayName: "总过户费", width: 100, type: "Currency" },
                { field: "TotalExtraCharge", displayName: "总附加费", width: 100, type: "Currency" },
                { field: "TotalExchangeCustodianFee", displayName: "交易清算费", width: 100, type: "Currency" },
                { field: "TotalFee", displayName: "总费用", width: 100, type: "Currency" }
            ];
            InitializeGrid(vm.feeData.summaryGrid, columnDefs);

            var departmentColumnDefs = _.concat([{ field: "DepartmentName", displayName: "部门名称", width: 100 }], columnDefs);
            InitializeGrid(vm.feeData.departmentGrid, departmentColumnDefs);

            var traderColumnDefs = _.concat([{ field: "TraderName", displayName: "交易员", width: 100 }], columnDefs);
            InitializeGrid(vm.feeData.traderGrid, traderColumnDefs);

            var securityColumnDefs = _.concat([{ field: "SecurityName", displayName: "证券名称", width: 100 }], columnDefs);
            InitializeGrid(vm.feeData.securityGrid, securityColumnDefs);

            var accountColumnDefs = _.concat([{ field: "CashAccountID", displayName: "资金账号", width: 100 }], columnDefs);
            InitializeGrid(vm.feeData.accountGrid, accountColumnDefs);

            var brokerColumnDefs = _.concat([{ field: "BrokerName", displayName: "券商", width: 100 }], columnDefs);
            InitializeGrid(vm.feeData.brokerGrid, brokerColumnDefs);

            var shareHolderColumnDefs = _.concat([{ field: "ShareHolderID", displayName: "股东代码", width: 100 }], columnDefs);
            InitializeGrid(vm.feeData.shareHolderGrid, shareHolderColumnDefs);
        }

        function initializeDailySummaryGrid() {
            var columnDefs = [
                { field: "TraderName", displayName: "交易员姓名", width: 100 },
                {
                    field: "TotalPnl",
                    displayName: "总盈亏",
                    type: "Currency",
                    width: 150,
                    treeAggregationType: uiGridGroupingConstants.aggregation.SUM,
                    customTreeAggregationFinalizerFn: customTreeAggregationFinalizerFn
                },
                {
                    field: "FillAmount",
                    displayName: "成交总量",
                    type: "Currency",
                    width: 100,
                    treeAggregationType: uiGridGroupingConstants.aggregation.SUM,
                    customTreeAggregationFinalizerFn: customTreeAggregationFinalizerFn
                },
                {
                    field: "TraderPerformance",
                    displayName: "交易员成绩",
                    type: "Currency",
                    width: 120,
                    treeAggregationType: uiGridGroupingConstants.aggregation.SUM,
                    customTreeAggregationFinalizerFn: customTreeAggregationFinalizerFn
                },
                {
                    field: "FillMoneyAmount",
                    displayName: "成交金额",
                    type: "Currency",
                    width: 120,
                    treeAggregationType: uiGridGroupingConstants.aggregation.SUM,
                    customTreeAggregationFinalizerFn: customTreeAggregationFinalizerFn
                },
                {
                    field: "BrokerFee",
                    displayName: "券商手续费",
                    type: "Currency",
                    width: 120,
                    treeAggregationType: uiGridGroupingConstants.aggregation.SUM,
                    customTreeAggregationFinalizerFn: customTreeAggregationFinalizerFn
                },
                {
                    field: "CompanyFee",
                    displayName: "公司手续费",
                    type: "Currency",
                    width: 120, treeAggregationType: uiGridGroupingConstants.aggregation.SUM,
                    customTreeAggregationFinalizerFn: customTreeAggregationFinalizerFn
                },
                {
                    field: "LiangRongFee",
                    displayName: "两融费",
                    type: "Currency",
                    width: 100, treeAggregationType: uiGridGroupingConstants.aggregation.SUM,
                    customTreeAggregationFinalizerFn: customTreeAggregationFinalizerFn
                },
                {
                    field: "TransfterDuty",
                    displayName: "过户费",
                    type: "Currency",
                    width: 120,
                    treeAggregationType: uiGridGroupingConstants.aggregation.SUM,
                    customTreeAggregationFinalizerFn: customTreeAggregationFinalizerFn
                },
                {
                    field: "StampTax",
                    displayName: "印花税",
                    type: "Currency",
                    width: 120,
                    treeAggregationType: uiGridGroupingConstants.aggregation.SUM,
                    customTreeAggregationFinalizerFn: customTreeAggregationFinalizerFn
                },
                {
                    field: "StipulatedFee",
                    displayName: "规费",
                    type: "Currency",
                    width: 120,
                    treeAggregationType: uiGridGroupingConstants.aggregation.SUM,
                    customTreeAggregationFinalizerFn: customTreeAggregationFinalizerFn
                }
            ];

            var dayColumnDefs = _.concat([{ field: "CreateDateHeader", displayName: "日期", width: 200, grouping: { groupPriority: 0 }, cellTemplate: gridGroupTemplate, cellMerge: true }], columnDefs);
            InitializeGrid(vm.dailySummaryData.dayGrid, dayColumnDefs);

            var weekColumnDefs = _.concat([{ field: "CreateDateHeader", displayName: "周小结", width: 220, grouping: { groupPriority: 0 }, cellTemplate: gridGroupTemplate, cellMerge: true }], columnDefs);
            InitializeGrid(vm.dailySummaryData.weeklyGrid, weekColumnDefs);

            var monthColumnDefs = _.concat([{ field: "CreateDateHeader", displayName: "月小结", width: 200, grouping: { groupPriority: 0 }, cellTemplate: gridGroupTemplate, cellMerge: true }], columnDefs);
            InitializeGrid(vm.dailySummaryData.monthlyGrid, monthColumnDefs);

            var yearColumnDefs = _.concat([{ field: "CreateDateHeader", displayName: "年小结", width: 200, grouping: { groupPriority: 0 }, cellTemplate: gridGroupTemplate, cellMerge: true }], columnDefs);
            InitializeGrid(vm.dailySummaryData.yearGrid, yearColumnDefs);
        }

        function customTreeAggregationFinalizerFn(aggregation) {
            aggregation.rendered = aggregation.value;
        }

        function InitializeGrid(gridData, columnDefs) {
            gridData.gridOption = {
                data: [],
                enableColumnMenus: false,
                enableSorting: false,
                enableRowSelection: true,
                enableRowHeaderSelection: false,
                multiSelect: false,
                modifierKeysToMultiSelect: false,
                columnDefs: columnDefs,
                onRegisterApi: function (gridApi) {
                    gridData.gridApi = gridApi;

                    gridData.gridApi.grid.registerDataChangeCallback(function () {
                        if (gridData.gridApi.treeBase) {
                            gridData.gridApi.treeBase.expandAllRows();
                        }
                    });
                }
            };
        }

        function initialize() {
            initializeOrderSummaryGrid();
            initializeMarketValueGrid();
            initializePnlGrid();
            initializeFeeGrid();
            initializeDailySummaryGrid();
            dataService.getLookupData()
                .success(function (data) {
                    vm.fees = data.FeeList;
                });
        }

        function groupDataByType(propertyName, fills, fees) {
            var reportData = [];
            _.forEach(fills, function (fillItem) {
                var matchedSum = reportData[fillItem[propertyName]];
                if (!matchedSum) {
                    matchedSum = newEmptySumData(fillItem);
                    reportData[fillItem[propertyName]] = matchedSum;
                }

                if (fillItem.OrderAction == "买入") {
                    matchedSum.LongOrderCount += 1;
                }
                else {
                    matchedSum.ShortOrderCount += 1;
                }

                if (fillItem.TotalChargeMoneyAmount >= 0) {
                    matchedSum.ProfitOrderCount += 1;
                }
                else {
                    matchedSum.LossOrderCount += 1;
                }

                matchedSum.TotalOrderCount += 1;
                matchedSum.ProfitLoss += calculateCustomProfitLoss(fees, fillItem);
                matchedSum.TotalExchangeFee += fillItem.ExchangeFee;
                matchedSum.TotalStampTax += fillItem.StampTax;
                matchedSum.TotalTransfterDuty += fillItem.TransfterDuty;
                matchedSum.TotalExtraCharge += fillItem.ExtraCharge;
                matchedSum.TotalExchangeCustodianFee += fillItem.ExchangeCustodianFee;
                matchedSum.TotalFillAmount += Math.abs(fillItem.FillAmount);
                matchedSum.TotalFillMoneyAmount += fillItem.FillMoneyAmount;
                matchedSum.MaxFillMoneyAmount = Math.max(matchedSum.MaxFillMoneyAmount, Math.abs(fillItem.FillMoneyAmount));
                matchedSum.MaxFillTime = getMaxFillTime(matchedSum.MaxFillTime, fillItem.FillTime);
                matchedSum.MaxFillAmount = matchedSum.MaxFillAmount > fillItem.FillAmount ? matchedSum.MaxFillAmount : fillItem.FillAmount;
                matchedSum.TotalFee = matchedSum.TotalExchangeFee + matchedSum.TotalStampTax + matchedSum.TotalTransfterDuty + matchedSum.TotalExtraCharge + matchedSum.TotalExchangeCustodianFee;;
                matchedSum.AverageFillMoneyAmount = matchedSum.TotalFillMoneyAmount / matchedSum.TotalOrderCount;
                matchedSum.AverageFillAmount = parseInt(matchedSum.TotalFillAmount / matchedSum.TotalOrderCount);
            });
            var result = [];
            for (var key in reportData) {
                result.push(reportData[key]);
            }
            return result;
        }

        function newEmptySumData(fillItem) {
            var data = {};
            for (var key in fillItem) {
                data[key] = fillItem[key];
            }
            data.LongOrderCount = 0;
            data.ShortOrderCount = 0;
            data.ProfitOrderCount = 0;
            data.LossOrderCount = 0;
            data.TotalOrderCount = 0;
            data.ProfitLoss = 0;
            data.TotalExchangeFee = 0;
            data.TotalStampTax = 0;
            data.TotalTransfterDuty = 0;
            data.TotalExtraCharge = 0;
            data.TotalExchangeCustodianFee = 0;
            data.TotalFillAmount = 0;
            data.TotalFillMoneyAmount = 0;
            data.MaxFillMoneyAmount = 0;
            data.MaxFillTime = 0;
            data.MaxFillAmount = 0;
            return data;
        }

        function calculateCustomProfitLoss(feeList, fillItem) {
            var matchedFeeItem = _.find(feeList, function (feeItem) {
                return fillItem.TraderID == feeItem.UserID && feeItem.CashAccountID == fillItem.CashAccountID &&
                    compare(feeItem.BeginDate, fillItem.CreateDate) <= 0 && compare(feeItem.EndDate, fillItem.CreateDate) >= 0;
            });

            var actualProfitLoss;
            if (matchedFeeItem != null) {
                actualProfitLoss = fillItem.TotalChargeMoneyAmount * (1 - matchedFeeItem.FeeRate);
            }
            else {
                actualProfitLoss = fillItem.TotalChargeMoneyAmount;
            }

            return actualProfitLoss;
        }

        function getMaxFillTime(firstFillTime, secondFillTime) {
            if (firstFillTime)
                return secondFillTime;

            if (secondFillTime)
                return firstFillTime;

            var compareResult = compare(firstFillTime, secondFillTime);
            if (compareResult > 0) {
                return firstFillTime;
            }
            else {
                return secondFillTime;
            }
        }

        function compare(firstDateString, secondDateString) {
            var firstDateParts = [];
            if (firstDateString.length == 8) {
                dateParts[0] = firstDateString.substring(0, 4);
                dateParts[1] = firstDateString.substring(4, 6);
                dateParts[2] = firstDateString.substring(6, 8);
            }
            else if (firstDateString.length == 10) {
                dateParts[0] = firstDateString.substring(0, 4);
                dateParts[1] = firstDateString.substring(5, 7);
                dateParts[2] = firstDateString.substring(8, 10);
            }
            var secondDateParts = [];
            if (secondDateString.length == 8) {
                secondDateParts[0] = secondDateString.substring(0, 4);
                secondDateParts[1] = secondDateString.substring(4, 6);
                secondDateParts[2] = secondDateString.substring(6, 8);
            }
            else if (secondDateString.length == 10) {
                secondDateParts[0] = secondDateString.substring(0, 4);
                secondDateParts[1] = secondDateString.substring(5, 7);
                secondDateParts[2] = secondDateString.substring(8, 10);
            }

            if (firstDateParts.length > secondDateParts.length) {
                return 1;
            }
            else if (firstDateParts.length < secondDateParts.length) {
                return -1;
            }

            if (firstDateParts[0] > secondDateParts[0]
                || firstDateParts[0] == secondDateParts[0] && firstDateParts[1] > secondDateParts[1]
                || firstDateParts[0] == secondDateParts[0] && firstDateParts[1] == secondDateParts[1] && firstDateParts[2] > secondDateParts[2]) {
                return 1;
            }
            if (firstDateParts[0] == secondDateParts[0] && firstDateParts[1] == secondDateParts[1] && firstDateParts[2] == secondDateParts[2]) {
                return 0;
            }
            return -1;
        }

        function getSumList(data, generateKey, exportDataName) {
            var dataKeys = [];
            var traderSumDictionary = {};
            var investorSumDictionary = {};
            var managerSumDictionary = {};
            var traderHuiZongSumDictionary = {};
            var investorHuiZongSumDictionary = {};
            var managerHuiZongSumDictionary = {};
            _.forEach(data, function (item) {
                if (item.TraderType == "交易员") {
                    groupData(item, generateKey, "交易员", traderSumDictionary, traderHuiZongSumDictionary, dataKeys);
                }
                else if (item.TraderType == "投资人") {
                    groupData(item, generateKey, "投资人", investorSumDictionary, investorHuiZongSumDictionary, dataKeys);
                }
                else {
                    groupData(item, generateKey, "公司", managerSumDictionary, managerHuiZongSumDictionary, dataKeys);
                }
            });

            vm.exportData[exportDataName] = [];
            var sumList = [];
            dataKeys = _.uniq(dataKeys);
            _.forEach(dataKeys, function (dataKey) {
                var huiZongItem = new createNewDailySummaryData();
                huiZongItem.TraderName = "汇总";
                huiZongItem.CreateDateHeader = dataKey.replace("小结", "汇总");
                var data = traderSumDictionary[dataKey];
                var groupData = {};
                if (data) {
                    groupData.traderData = [];
                    for (var key in data) {
                        sumList.push(data[key]);
                        groupData.traderData.push(data[key]);
                    }
                    var summaryData = traderHuiZongSumDictionary[dataKey];
                    groupData.traderSummaryData = [summaryData];
                    sumSummaryDataAmount(huiZongItem, traderHuiZongSumDictionary[dataKey]);
                }
                var data = investorSumDictionary[dataKey];
                if (data) {
                    groupData.investorData = [];
                    for (var key in data) {
                        sumList.push(data[key]);
                        groupData.investorData.push(data[key]);
                    }
                    var summaryData = investorHuiZongSumDictionary[dataKey];
                    groupData.investorSummaryData = [summaryData];
                    sumSummaryDataAmount(huiZongItem, investorHuiZongSumDictionary[dataKey]);
                }
                var data = managerSumDictionary[dataKey];
                if (data) {
                    groupData.managerData = [];
                    for (var key in data) {
                        sumList.push(data[key]);
                        groupData.managerData.push(data[key]);
                    }
                    var summaryData = managerHuiZongSumDictionary[dataKey];
                    groupData.managerSummaryData = [summaryData];
                    sumSummaryDataAmount(huiZongItem, managerHuiZongSumDictionary[dataKey]);
                }
                if (traderSumDictionary[dataKey] || investorSumDictionary[dataKey] || managerSumDictionary[dataKey]) {
                    sumList.push(huiZongItem);
                    groupData.summaryData = [huiZongItem];
                    vm.exportData[exportDataName].push(groupData);
                }
            });
            return sumList;
        }

        function groupData(item, generateKey, userType, sumDictionary, huiZongSumDictionary, dataKeys) {
            var currentItemKey = generateKey(item);
            var sumData = sumDictionary[currentItemKey];
            if (!sumData) {
                sumData = {};
                sumDictionary[currentItemKey] = sumData;
                dataKeys.push(currentItemKey);
            }
            var sumPerTrader = sumData[item.TraderName];
            if (!sumPerTrader) {
                sumPerTrader = createNewDailySummaryData();
                sumPerTrader.CreateDateHeader = currentItemKey.replace("小结", userType + "小结");
                sumPerTrader.TraderName = item.TraderName;
                sumData[sumPerTrader.TraderName] = sumPerTrader;
            }
            sumSummaryDataAmount(sumPerTrader, item);

            var huiZongItem = huiZongSumDictionary[currentItemKey];
            if (!huiZongItem) {
                huiZongItem = createNewDailySummaryData();
                huiZongItem.TraderName = userType + "汇总";
                huiZongItem.CreateDateHeader = currentItemKey.replace("小结", huiZongItem.TraderName);
                huiZongSumDictionary[currentItemKey] = huiZongItem;
            }
            sumSummaryDataAmount(huiZongItem, item);
        }

        function createNewDailySummaryData() {
            return {
                BrokerFee: 0,
                CompanyFee: 0,
                FillAmount: 0,
                FillMoneyAmount: 0,
                LiangRongFee: 0,
                TotalPnl: 0,
                TraderPerformance: 0,
                TransfterDuty: 0,
                StampTax: 0,
                StipulatedFee: 0
            };
        }

        function sumSummaryDataAmount(baseData, newData) {
            baseData.CompanyFee += newData.CompanyFee;
            baseData.BrokerFee += newData.BrokerFee;
            baseData.FillAmount += newData.FillAmount;
            baseData.FillMoneyAmount += newData.FillMoneyAmount;
            baseData.LiangRongFee += newData.LiangRongFee;
            baseData.TotalPnl += newData.TotalPnl;
            baseData.TraderPerformance += newData.TraderPerformance;
            baseData.TransfterDuty += newData.TransfterDuty;
            baseData.StampTax += newData.StampTax;
            baseData.StipulatedFee += newData.StipulatedFee;
        }

        function generateDayItemKey(item) {
            return item.CreateDate + "-小结";
        }

        function generateMonthItemKey(item) {
            var yearPart = parseInt(item.CreateDate.substring(0, 4));
            var monthPart = parseInt(item.CreateDate.substring(4, 6));
            return yearPart + "年" + monthPart + "月小结";
        }

        function generateYearItemKey(item) {
            var yearPart = parseInt(item.CreateDate.substring(0, 4));
            return yearPart + "年小结";
        }

        function generateWeekItemKey(item) {
            var yearPart = parseInt(item.CreateDate.substring(0, 4));
            var monthPart = parseInt(item.CreateDate.substring(4, 6));
            var dayPart = parseInt(item.CreateDate.substring(6, 8));
            var firstDayThisYear = new Date(yearPart, 0, 1);
            var lastDayThisYear = new Date(yearPart, 11, 31);
            var dtPerItem = new Date(yearPart, monthPart - 1, dayPart);
            var result = getCurrentMondaySunday(dtPerItem, firstDayThisYear, lastDayThisYear);
            var sundayPerItem = result.sundayPerItem;
            var mondayPerItem = result.mondayPerItem;
            return mondayPerItem.format("yyyyMMdd") + "-" + sundayPerItem.format("yyyyMMdd") + "小结";
        }

        function getCurrentMondaySunday(currentDate, firstDayThisYear, lastDayThisYear) {
            var currentMonday;
            var currentSunday;
            var currentDay = currentDate.getDate();
            var dayOfWeek = currentDate.getDay();
            switch (dayOfWeek) {
                case 1:
                    currentMonday = currentDate;
                    currentSunday = addDate(currentDate, 6);
                    break;
                case 2:
                    currentMonday = addDate(currentDate, - 1);
                    currentSunday = addDate(currentDate, 5);
                    break;
                case 3:
                    currentMonday = addDate(currentDate, - 2);
                    currentSunday = addDate(currentDate, 4);
                    break;
                case 4:
                    currentMonday = addDate(currentDate, -3);
                    currentSunday = addDate(currentDate, 3);
                    break;
                case 5:
                    currentMonday = addDate(currentDate, - 4);
                    currentSunday = addDate(currentDate, 2);
                    break;
                case 6:
                    currentMonday = addDate(currentDate, - 5);
                    currentSunday = addDate(currentDate, 1);
                    break;
                default:
                    currentMonday = addDate(currentDate, - 6);
                    currentSunday = currentDate;
                    break;
            }

            if (currentMonday.compareTo(firstDayThisYear) == -1) {
                currentMonday = firstDayThisYear;
            }
            if (currentSunday.compareTo(lastDayThisYear) == 1) {
                currentSunday = lastDayThisYear;
            }

            return {
                sundayPerItem: currentSunday,
                mondayPerItem: currentMonday
            };
        }

        function addDate(currentDay, days) {
            var value = currentDay.valueOf();
            value = value + days * 24 * 60 * 60 * 1000;
            return new Date(value);
        }

        initialize();
    }];

    return summaryReportController;
});