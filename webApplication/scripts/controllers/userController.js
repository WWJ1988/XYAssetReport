define(['lodash'], function (_) {
    'use strict';
    var userController = ["$scope", "$timeout", "dataService", function ($scope, $timeout, dataService) {
        var vm = this;
        var actionCellTemplate = "<div class='grid-action'><a ng-click='userCtrl.editFee()'><span class='glyphicon glyphicon-edit'></span></a><a ng-click='userCtrl.removeFee()'><span class='glyphicon glyphicon-remove'></span></a></div>";
        vm.enableGridAction = true;
        vm.hasRowSelected = false;
        vm.selectedRow = {};
        vm.newData = null;
        vm.lookupData = {};
        vm.feeData = {};
        vm.functions = [];
        vm.functionData = {};
        vm.traderData = {};
        vm.securityData = {};
        vm.accountData = {};
        vm.brokerData = {};
        vm.shareHolderData = {};
        vm.selectedTabIndex = 1;

        vm.addUser = function () {
            vm.enableGridAction = false;
            vm.newData = {
                UserID: "",
                UserName: "",
                UserRealName: "",
                UserPassword: "",
                UserType: "",
                DepartmentID: -1,
                DepartmentName: "",
                IsEnabled: false,
                UserEntList: []
            };

            vm.gridOption.data.push(vm.newData);
            vm.gridApi.grid.modifyRows(vm.gridOption.data);
            vm.gridApi.selection.selectRow(vm.newData);
        }

        vm.deleteUser = function () {
            dataService.deleteUser(vm.selectedRow.UserID).success(function () {
                var index = _.findIndex(vm.gridOption.data, function (user) {
                    return user.UserID == vm.selectedRow.UserID;
                });
                vm.gridOption.data.splice(index, 1);
                vm.gridApi.grid.modifyRows(vm.gridOption.data);
                if (vm.gridOption.data.length > 0) {
                    var nextSelectedIndex = index == vm.gridOption.data.length ? index - 1 : index;
                    vm.gridApi.selection.selectedRow(vm.gridOption.data[nextSelectedIndex])
                }
            });
        }

        vm.saveUser = function () {
            dataService.saveUser(vm.newData).success(function (res) {
                vm.enableGridAction = true;
                vm.newData = null;
            });
        }

        vm.cancel = function () {

        }

        function initialize() {
            initializeGrid();
            dataService.setCurrentSettingPage("用户设置");
            dataService.getLookupData.success(function (data) {
                vm.lookupData = data;
                vm.gridOption.data = data.UserList;
                setTraderData();
                setSecurityData();
                setCashAccountData();
                setBrokerData();
                setShareHolderData();
            });
            dataService.getFunctions(setFunctionData);
        }

        function initializeGrid() {
            initializeUserGrid();
            initializeFeeGrid();
            initializeTraderGrid();
            initializeSecurityGrid();
            initializeCashAccountGrid();
            initializeBrokerGrid();
            initializeShareHolderGrid();
        }

        function initializeUserGrid() {
            var userGridColumnDefs = [
                { field: "UserName", displayName: "用户名" },
                { field: "UserRealName", displayName: "真实姓名" },
                { field: "DepartmentName", displayName: "部门" },
                { field: "UserType", displayName: "用户类型" },
                { field: "IsEnabled", displayName: "是否启用", cellTemplate: '<div class="grid-checkbox-cell"><input type="checkbox" disabled="true" ng-model="row.entity.IsEnabled"</div>' }
            ];

            initializeGridOption(vm, userGridColumnDefs, function (row) {
                vm.selectedRow = row.entity;
                vm.hasRowSelected = true;
                setSubGridCheckedData();
                if (vm.newData != null && vm.selectedRow != vm.newData) {
                    vm.enableGridAction = true;
                    vm.gridOption.data.splice(vm.gridOption.data.length - 1, 1);
                    vm.newData = null;
                }
            });
        }

        function initializeFeeGrid() {
            var feeColumnDefs = [
                { field: "UserRealName", displayName: "交易员" },
                { field: "CashAccountID", displayName: "资金账号", minWidth: 100, width: 100 },
                { field: "BeginDate", displayName: "开始日期" },
                { field: "EndDate", displayName: "结束日期" },
                { field: "FeeRate", displayName: "税率" },
                { field: "UserID", displayName: "操作", cellTemplate: actionCellTemplate, minWidth: 50, width: 50 }
            ];
            initializeGridOption(vm.feeData, feeColumnDefs);
        }

        function initializeTraderGrid() {
            var traderColumnDefs = [
                { field: "name", displayName: "姓名" },
                { field: "department", displayName: "部门" },
                { field: "enable", displayName: "是否可见", cellTemplate: '<div class="grid-checkbox-cell"><input type="checkbox" ng-model="row.entity.enable"</div>' }
            ];
            initializeGridOption(vm.traderData, traderColumnDefs);
        }

        function initializeSecurityGrid() {
            var securityColumnDefs = [
                { field: "securityID", displayName: "证券代码" },
                { field: "securityName", displayName: "证券名称" },
                { field: "enable", displayName: "是否可见", cellTemplate: '<div class="grid-checkbox-cell"><input type="checkbox" ng-model="row.entity.enable"</div>' }
            ];
            initializeGridOption(vm.securityData, securityColumnDefs);
        }

        function initializeCashAccountGrid() {
            var cashAccountColumnDefs = [
                { field: "accountID", displayName: "资金账号" },
                { field: "accountName", displayName: "资金名称" },
                { field: "enable", displayName: "是否可见", cellTemplate: '<div class="grid-checkbox-cell"><input type="checkbox" ng-model="row.entity.enable"</div>' }
            ];
            initializeGridOption(vm.accountData, cashAccountColumnDefs);
        }

        function initializeBrokerGrid() {
            var brokerColumnDefs = [
                { field: "name", displayName: "券商名称" },
                { field: "enable", displayName: "是否可见", cellTemplate: '<div class="grid-checkbox-cell"><input type="checkbox" ng-model="row.entity.enable"</div>' }
            ];
            initializeGridOption(vm.brokerData, brokerColumnDefs);
        }

        function initializeShareHolderGrid() {
            var shareHolderColumnDefs = [
                { field: "shareHolderID", displayName: "股东编号" },
                { field: "shareHolderName", displayName: "股东名称" },
                { field: "enable", displayName: "是否可见", cellTemplate: '<div class="grid-checkbox-cell"><input type="checkbox" ng-model="row.entity.enable"</div>' }
            ];
            initializeGridOption(vm.shareHolderData, shareHolderColumnDefs);
        }

        function initializeGridOption(apiData, columnDefs, selectionFun) {
            if (!selectionFun) {
                selectionFun = function (row) {
                    apiData.selectedRow = row.entity;
                }
            }

            apiData.gridOption = {
                data: [],
                enableSorting: false,
                enableRowSelection: true,
                enableRowHeaderSelection: false,
                multiSelect: false,
                modifierKeysToMultiSelect: false,
                columnDefs: columnDefs,
                onRegisterApi: function (gridApi) {
                    apiData.gridApi = gridApi;
                    apiData.gridApi.selection.on.rowSelectionChanged($scope, selectionFun);
                }
            }
        }

        function setSubGridCheckedData() {
            setFeeData();
            setFunctionDataStatus();
            resetSubGridCheckedData();
            _.forEach(vm.selectedRow.UserEntList, function (entity) {
                switch (entity.ObjectType) {
                    case "Trader":
                        setTraderCheckedData(entity.ObjectKey);
                        break;
                    case "Security":
                        setSecurityCheckedData(entity.ObjectKey);
                        break;
                    case "CashAccount":
                        setCashAccountCheckedData(entity.ObjectKey);
                        break;
                    case "Broker":
                        setBrokerCheckedData(entity.ObjectKey);
                        break;
                    case "ShareHolder":
                        setShareHolderData(entity.ObjectKey);
                        break;
                }
            });
        }

        function resetSubGridCheckedData() {
            _.forEach(vm.traderData.gridOption.data, function (trader) {
                trader.enable = false;
            });
            _.forEach(vm.securityData.gridOption.data, function (security) {
                security.enable = false;
            });
            _.forEach(vm.accountData.gridOption.data, function (account) {
                account.enable = false;
            });
            _.forEach(vm.brokerData.gridOption.data, function (broker) {
                broker.enable = false;
            });
            _.forEach(vm.shareHolderData.gridOption.data, function (shareHolder) {
                shareHolder.enable = false;
            });
        }

        function setFeeData() {
            vm.feeData.gridOption.data = _.filter(vm.lookupData.FeeList, function (fee) {
                return fee.UserID === vm.selectedRow.UserID;
            });
        }

        function setFunctionDataStatus() {
            if (vm.functionData[vm.selectedRow.UserID]) {
                _.forEach(vm.functions, function (funcItem) {
                    setFunctionStatuse(funcItem);
                });
            }
            else {
                _.forEach(vm.functions, function (func) {
                    setFunctionStatuseByValue(func);
                });
            }
        }

        function setTraderData() {
            var data = [];
            _.forEach(vm.lookupData.UserList, function (user) {
                data.push({ id: user.UserID, name: user.UserName, department: user.DepartmentName, enable: false });
            });
            vm.traderData.gridOption.data = data;
        }

        function setSecurityData() {
            var data = [];
            _.forEach(vm.lookupData.SecurityList, function (security) {
                data.push({ securityID: security.SecurityID, securityName: security.SecurityName, enable: false });
            });
            vm.securityData.gridOption.data = data;
        }

        function setCashAccountData() {
            var data = [];
            _.forEach(vm.lookupData.CashAccountList, function (account) {
                data.push({ accountID: account.CashAccountID, accountName: account.CashAccountName, enable: false });
            });
            vm.accountData.gridOption.data = data;
        }

        function setBrokerData() {
            var data = [];
            _.forEach(vm.lookupData.BrokerList, function (broker) {
                data.push({ id: broker.BrokerID, name: broker.BrokerName, enable: false });
            });
            vm.brokerData.gridOption.data = data;
        }

        function setShareHolderData() {
            var data = [];
            _.forEach(vm.lookupData.ShareHolderList, function (shareHolder) {
                data.push({ shareHolderID: shareHolder.ShareHolderID, shareHolderName: shareHolder.ShareHolderDesc, enable: false });
            });
            vm.shareHolderData.gridOption.data = data;
        }

        function setTraderCheckedData(id) {
            var data = _.find(vm.traderData.gridOption.data, function (trader) {
                return trader.id == id;
            });
            if (data) {
                data.enable = true;
            }
        }

        function setSecurityCheckedData(id) {
            var data = _.find(vm.securityData.gridOption.data, function (security) {
                return security.securityID == id;
            });
            if (data) {
                data.enable = true;
            }
        }

        function setCashAccountCheckedData(id) {
            var data = _.find(vm.accountData.gridOption.data, function (account) {
                return account.accountID == id;
            });
            if (data) {
                data.enable = true;
            }
        }

        function setBrokerCheckedData(id) {
            var data = _.find(vm.brokerData.gridOption.data, function (broker) {
                return broker.id == id;
            });
            if (data) {
                data.enable = true;
            }
        }

        function setShareHolderCheckedData(id) {
            var data = _.find(vm.shareHolderData.gridOption.data, function (shareHolder) {
                return shareHolder.shareHolderID == id;
            });
            if (data) {
                data.enable = true;
            }
        }

        function setFunctionStatuse(item) {
            if (_.findIndex(vm.functionData[vm.selectedRow.UserID], function (functionId) {
                return functionId === item.value;
            }) >= 0) {
                item.enable = true;
                _.forEach(item.children, function (childItem) {
                    childItem.enable = true;
                });
            }
            else {
                item.enable = false;
                if (item.children) {
                    _.forEach(item.children, function (childItem) {
                        setFunctionStatuse(childItem);
                    })
                }
            }
        }

        function setFunctionStatuseByValue(data, statuse) {
            data.enable = status;
            if (data.children) {
                _.forEach(data.children, function (childItem) {
                    setFunctionStatuse(childItem, status);
                });
            }
        }

        function setFunctionData(res) {
            if (res.AllFunctions) {
                var mainMenus = [];
                _.forEach(res.AllFunctions, function (value) {
                    if (value.ParentID === "MainMenu") {
                        mainMenus.push({ title: value.FunctionName, value: value.FunctionID, enable: false, children: [] });
                    }
                });

                _.forEach(mainMenus, function (mainMenuItem) {
                    var childItems = _.filter(res.AllFunctions, function (funcItem) {
                        return funcItem.ParentID === mainMenuItem.value;
                    });
                    _.forEach(childItems, function (item) {
                        mainMenuItem.children.push({ title: item.FunctionName, value: item.FunctionID, enable: false });
                    });
                });
                vm.functions = mainMenus;
                vm.functionData = res.UserFunctions;
            }
        }

        vm.setTab = function (index) {
            $timeout(function () {
                vm.selectedTabIndex = index;
            }, 50);
        }

        initialize();
    }];

    return userController;
});