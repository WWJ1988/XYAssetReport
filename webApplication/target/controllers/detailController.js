define([
    "lodash",
    "../common/common"
], function (_, common) {
    'use strict';
    var detailController = ["$scope", "dataService", function ($scope, dataService) {
        var Margin_KeyWord1 = "融资";
        var Margin_KeyWord2 = "卖券偿还";
        var Margin_KeyWord3 = "直接偿还";
        var Margin_KeyWord4 = "融券";
        var Margin_KeyWord5 = "还钱";
        var Margin_KeyWord6 = "还券";
        var Inverstor_TradingKeyWord = "交易"

        var vm = this;
        vm.dataType = 0;
        vm.fillGrid = {};
        vm.allData = [];

        vm.filterData = function (data) {
            vm.allData = data.FillDataList;
            vm.changeDataType();
            //vm.fillGrid.gridOption.data = data.FillDataList;
        }

        vm.exportDataHandler = function () {
            var exportData = { columnDefs: vm.fillGrid.gridOption.columnDefs, exportDatas: vm.fillGrid.gridOption.data, sheetName: "交易明细统计表" }
            var content = common.formatAsExcel([
                exportData
            ]);
            common.downloadFile("交易明细统计表.xls", content);
        }

        vm.changeDataType = function () {
            switch (vm.dataType) {
                case 0:// Show all data
                    vm.fillGrid.gridOption.data = vm.allData;
                    break;

                case 1://市值波动
                    showTraderCashFillsOnly();
                    break;

                case 2://交易员操作
                    showTraderFillsOnly();
                    break;

                case 3://风控（零股、错仓）
                    showLiuCangFillsOnly();
                    break;

                case 4://投资人操作
                    showInvestorTradingFillsOnly();
                    break;

                case 5://资金利息
                    showZiJinLiXi();
                    break;

                case 6://资金理财利息（隔夜）
                    showRongZiGeYeLiXi();
                    break;

                case 7://资金逆回购利息
                    showBuyBackFillsOnly();
                    break;

                case 8://公司出入金
                    showCompanyEquityOnly();
                    break;

                case 9://投资人出入金
                    showInvestorEquityOnly();
                    break;

                case 10://股息红利
                    showGuXiHongLiFillsOnly();
                    break;

                case 11://红利税
                    showHongLiShuiFillsOnly();
                    break;

                case 12://融券卖出
                    showRongQuanMaiChuFillsOnly();
                    break;

                case 13://融券利息
                    showRongQuanLiXiFillsOnly();
                    break;

                case 14://新股盈亏
                    showXinGuFillsOnly();
                    break;

                case 15://股票送股
                    showSongGuFillsOnly();
                    break;

                case 16://交易执行岗（融券，普通买入）
                    showRongQuanMaiRu();
                    break;

                case 17://交易执行岗（现券还券，直接还券）
                    showHuanQuanFillsOnly();
                    break;

                case 18://交易执行岗（自建仓（普通买入））
                    showEmptyFills();
                    break;

                case 19://开户费用
                    showKaiHuFeiFillsOnly();
                    break;

                case 20://融资未还款
                    showRongZiHuanKuan();
                    break;

                case 21://融资利息
                    showRongZiLiXi();
                    break;

                case 22://融资隔夜利息
                    showRongZiGeYeLiXi();
                    break;

                case 23://担保品划转
                    showDanBaoPinFillsOnly();
                    break;

                case 24://公司券息
                    showGongSiQuanXi();
                    break;

                case 25://现金理财
                    showETFFillsOnly();
                    break;
            }
        };

        function initialize() {
            var columnDefs = [
                { field: "OrderID", displayName: "委托编号", width: 150 },
                { field: "TraderName", displayName: "交易员", width: 100 },
                { field: "CreateDate", displayName: "发生日期", width: 100 },
                { field: "BrokerName", displayName: "券商", width: 100 },
                { field: "FillPrice", displayName: "成交价格", width: 100, type: "Currency", cellFilter: 'number: 2', cellClass: "text-align-right" },
                { field: "FillAmount", displayName: "成交数量", width: 100, type: "Currency", cellFilter: 'number: 2', cellClass: "text-align-right" },
                { field: "FillMoneyAmount", displayName: "成交金额", width: 100, type: "Currency", cellFilter: 'number: 2', cellClass: "text-align-right" },
                { field: "OperationName", displayName: "业务名称", width: 150 },
                { field: "SecurityResidualAmount", displayName: "股份余额", width: 100, type: "Currency", cellFilter: 'number: 2', cellClass: "text-align-right" },
                { field: "ExchangeFee", displayName: "手续费", width: 100, type: "Currency", cellFilter: 'number: 2', cellClass: "text-align-right" },
                { field: "StampTax", displayName: "印花税", width: 100, type: "Currency", cellFilter: 'number: 2', cellClass: "text-align-right" },
                { field: "TransfterDuty", displayName: "过户税", width: 100, type: "Currency", cellFilter: 'number: 2', cellClass: "text-align-right" },
                { field: "ExtraCharge", displayName: "附加费", width: 100, type: "Currency", cellFilter: 'number: 2', cellClass: "text-align-right" },
                { field: "ExchangeCustodianFee", displayName: "交易所清算费用", width: 100, type: "Currency", cellFilter: 'number: 2', cellClass: "text-align-right" },
                { field: "TotalChargeMoneyAmount", displayName: "发生金额", width: 100, type: "Currency", cellFilter: 'number: 2', cellClass: "text-align-right" },
                { field: "CashAccountResidual", displayName: "资金本次余额", width: 100, type: "Currency", cellFilter: 'number: 2', cellClass: "text-align-right" },
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
                    });
                }
            };
            vm.dataTypes = [
                { value: 0, title: "所有数据" },
                { value: 1, title: "市值波动" },
                { value: 2, title: "交易员操作" },
                { value: 3, title: "风控（零股、错仓）" },
                { value: 4, title: "投资人操作" },
                { value: 5, title: "资金利息" },
                { value: 6, title: "资金理财利息" },
                { value: 7, title: "资金逆回购利息" },
                { value: 8, title: "公司出入金" },
                { value: 9, title: "投资人出入金" },
                { value: 10, title: "股息红利" },
                { value: 11, title: "红利税" },
                { value: 12, title: "融券卖出" },
                { value: 13, title: "融券利息" },
                { value: 14, title: "新股盈亏" },
                { value: 15, title: "股票送股" },
                { value: 16, title: "交易执行岗-融券，普通买入" },
                { value: 17, title: "交易执行岗-现券还券，直接还券" },
                { value: 18, title: "交易执行岗-自建仓(普通买入)" },
                { value: 19, title: "开户费用" },
                { value: 20, title: "融资未还款" },
                { value: 21, title: "融资利息" },
                { value: 22, title: "融资隔夜利息" },
                { value: 23, title: "担保品划转" },
                { value: 24, title: "公司券息" },
                { value: 25, title: "现金理财" }
            ];
        }

        function showTraderFillsOnly() {
            var partFills = [];
            _.forEach(vm.allData, function (fillItem) {
                if (fillItem.UserType == "交易员") {
                    partFills.push(fillItem);
                }
            });
            vm.fillGrid.gridOption.data = partFills;
        }

        function showLiuCangFillsOnly() {
            var partFills = [];
            _.forEach(vm.allData, function (fillItem) {
                if (fillItem.TraderID == 35) {
                    partFills.push(fillItem);
                }
            });
            vm.fillGrid.gridOption.data = partFills;
        }

        function showTraderCashFillsOnly() {
            var partFills = [];
            _.forEach(vm.allData, function (fillItem) {
                if (fillItem.UserType == "交易员" && !isMarginTrade(fillItem)) {
                    partFills.push(fillItem);
                }
            });
            vm.fillGrid.gridOption.data = partFills;
        }

        function isMarginTrade(fillData) {
            return fillData.OperationName.indexOf(Margin_KeyWord1) >= 0 || fillData.OperationName.indexOf(Margin_KeyWord2) >= 0
                || fillData.OperationName.indexOf(Margin_KeyWord3) >= 0 || fillData.OperationName.indexOf(Margin_KeyWord4) >= 0
                || fillData.OperationName.indexOf(Margin_KeyWord5) >= 0 || fillData.OperationName.indexOf(Margin_KeyWord6) >= 0;
        }

        function showInvestorTradingFillsOnly() {
            var partFills = [];
            _.forEach(vm.allData, function (fillItem) {
                if (fillItem.UserType == "投资人" && _.endsWith(fillItem.TraderName, Inverstor_TradingKeyWord)) {
                    partFills.push(fillItem);
                }
            });
            vm.fillGrid.gridOption.data = partFills;
        }

        function showCompanyEquityOnly() {
            var partFills = [];
            _.forEach(vm.allData, function (fillItem) {
                if (fillItem.IsChuRuJin) {
                    partFills.push(fillItem);
                }
            });
            vm.fillGrid.gridOption.data = partFills;
        }

        function showInvestorEquityOnly() {
            var partFills = [];
            _.forEach(vm.allData, function (fillItem) {
                if (fillItem.IsChuRuJin) {
                    partFills.push(fillItem);
                }
            });
            vm.fillGrid.gridOption.data = partFills;
        }

        function showGuXiHongLiFillsOnly() {
            var partFills = [];
            _.forEach(vm.allData, function (fillItem) {
                if (fillItem.FillNotes.indexOf("股息入账") >= 0 || fillItem.OperationName.indexOf("股息入账") >= 0) {
                    partFills.push(fillItem);
                }
            });
            vm.fillGrid.gridOption.data = partFills;
        }

        function showHongLiShuiFillsOnly() {
            var partFills = [];
            _.forEach(vm.allData, function (fillItem) {
                if (fillItem.FillNotes.indexOf("股息红利") >= 0 || fillItem.OperationName.indexOf("股息红利") >= 0) {
                    partFills.push(fillItem);
                }
            });
            vm.fillGrid.gridOption.data = partFills;
        }

        function showRongQuanMaiChuFillsOnly() {
            var partFills = [];
            _.forEach(vm.allData, function (fillItem) {
                if (fillItem.FillNotes.indexOf("融券卖出") >= 0 || fillItem.OperationName.indexOf("融券卖出") >= 0) {
                    partFills.push(fillItem);
                }
            });
            vm.fillGrid.gridOption.data = partFills;
        }

        function showRongQuanLiXiFillsOnly() {
            showFillsByKeyWord("融券利息");
        }

        function showXinGuFillsOnly() {
            var partFills = [];
            _.forEach(vm.allData, function (fillItem) {
                if (fillItem.IsXinGuShenGou) {
                    partFills.push(fillItem);
                }
            });
            vm.fillGrid.gridOption.data = partFills;
        }

        function showETFFillsOnly() {
            showFillsByKeyWord("ETF现金");
        }

        function showDanBaoPinFillsOnly() {
            showFillsByKeyWord("担保品");
        }

        function showSongGuFillsOnly() {
            showFillsByKeyWord("股票送股");
        }

        function showKaiHuFeiFillsOnly() {
            var partFills = [];
            _.forEach(vm.allData, function (fillItem) {
                if (fillItem.FillNotes.indexOf("指定交易") >= 0 || fillItem.OperationName.indexOf("指定交易") >= 0 ||
                    fillItem.FillNotes.indexOf("内存业务") >= 0 || fillItem.OperationName.indexOf("内存业务") >= 0 ||
                    fillItem.FillNotes.indexOf("托管费") >= 0 || fillItem.OperationName.indexOf("托管费") >= 0) {
                    partFills.push(fillItem);
                }
            });
            vm.fillGrid.gridOption.data = partFills;
        }

        function showRongZiLiXi() {
            showFillsByKeyWord("融资利息");
        }

        function showGongSiQuanXi() {
            showFillsByKeyWord("公司券息");
        }

        function showRongZiGeYeLiXi() {
            showFillsByKeyWord("融资隔夜利息");
        }

        function showRongZiHuanKuan() {
            showFillsByKeyWord("还钱");
        }

        function showZiJinLiXi() {
            showFillsByKeyWord("利息");
        }

        function showEmptyFills() {
            vm.fillGrid.gridOption.data = [];
        }

        function showRongQuanMaiRu() {
            var partFills = [];
            _.forEach(vm.allData, function (fillItem) {
                if (fillItem.OrderAction == "买入" && (fillItem.FillNotes.indexOf("融券") >= 0 || fillItem.OperationName.indexOf("融券") >= 0)) {
                    partFills.push(fillItem);
                }
            });
            vm.fillGrid.gridOption.data = partFills;
        }

        function showHuanQuanFillsOnly() {
            showFillsByKeyWord("还券");
        }

        function showBuyBackFillsOnly() {
            showFillsByKeyWord("逆回购");
        }

        function showFillsByKeyWord(filterString) {
            var partFills = [];
            _.forEach(vm.allData, function (fillItem) {
                if (fillItem.FillNotes.indexOf(filterString) >= 0 || fillItem.OperationName.indexOf(filterString) >= 0) {
                    partFills.push(fillItem);
                }
            });
            vm.fillGrid.gridOption.data = partFills;
        }

        initialize();
    }];

    return detailController;
});