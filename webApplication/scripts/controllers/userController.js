define(['lodash'], function (_) {
    'use strict';
    var userController = ["$scope", "$timeout", "dataService", "modalService", function ($scope, $timeout, dataService, modalService) {
        var vm = this;
        var actionCellTemplate = "<div class='grid-action'><a ng-click='grid.appScope.userCtrl.removeFee()' title='删除'><span class='glyphicon glyphicon-remove'></span></a></div>";
        var userWatcher;
        vm.oldValue = null;
        vm.enableGridAction = true;
        vm.hasRowSelected = false;
        vm.isNewData = false;
        vm.canSaveData = false;
        vm.errorMessage = "";
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
        vm.changedData = {};
        var userWatcher = null;

        vm.addUser = function () {
            vm.enableGridAction = false;
            vm.isNewData = true;
            vm.newData = {
                UserID: -1,
                UserName: "",
                UserRealName: "",
                UserPassword: "",
                confirmPassword: "",
                UserType: "",
                DepartmentID: -1,
                DepartmentName: "",
                IsEnabled: false,
                UserEntList: []
            };

            vm.gridOption.data = _.concat(vm.newData, vm.gridOption.data);
            vm.gridApi.grid.modifyRows(vm.gridOption.data);
            vm.gridApi.selection.selectRow(vm.newData);
        };

        vm.deleteUser = function () {
            if (vm.selectedRow.UserID == -1) {
                resetInitialzieData();
                vm.gridOption.data.splice(0, 1);
                vm.gridApi.grid.modifyRows(vm.gridOption.data);
                if (vm.gridOption.data.length > 0) {
                    vm.gridApi.selection.selectRow(vm.gridOption.data[0])
                }
                return;
            }
            dataService.deleteUser(vm.selectedRow.UserID).success(function () {
                var index = _.findIndex(vm.gridOption.data, function (user) {
                    return user.UserID == vm.selectedRow.UserID;
                });
                vm.gridOption.data.splice(index, 1);
                vm.gridApi.grid.modifyRows(vm.gridOption.data);
                if (vm.gridOption.data.length > 0) {
                    var nextSelectedIndex = index == vm.gridOption.data.length ? index - 1 : index;
                    vm.gridApi.selection.selectRow(vm.gridOption.data[nextSelectedIndex])
                }
            });
        };

        vm.saveUser = function () {
            if (!vm.selectedRow.UserName || !vm.selectedRow.UserRealName || !vm.selectedRow.UserPassword || (vm.selectedRow.UserID == -1 && !vm.selectedRow.confirmPassword) || !vm.selectedRow.DepartmentID || !vm.selectedRow.UserType) {
                vm.errorMessage = "请填写完整信息。";
            }
            else if (vm.selectedRow.UserID == -1 && vm.selectedRow.UserPassword != vm.selectedRow.confirmPassword) {
                vm.errorMessage = "填写的密码不匹配";
            }
            else {
                releaseWatcher();
                var savedData = vm.isNewData ? vm.newData : vm.selectedRow;
                dataService.saveUser(savedData).success(function (data) {
                    if (vm.isNewData && vm.changedData.feeData) {
                        vm.changedData.feeData.UserID = data.UserID;
                        dataService.saveFee(fee);
                    }

                    var functionList = [];
                    _.forEach(vm.functions, function (func) {
                        if (func.enable) {
                            functionList.push(func.value);
                        }
                        if (func.children) {
                            _.forEach(func.children, function (child) {
                                if (child.enable) {
                                    functionList.push(child.value);
                                }
                            });
                        }
                    });
                    dataService.saveFunctions(data.UserID, functionList);

                    var userData = {
                        UserEntList: []
                    };
                    userData.UserID = data.UserID;
                    _.forEach(vm.traderData.gridOption.data, function (trader) {
                        if (trader.enable) {
                            userData.UserEntList.push({
                                UserID: data.UserID,
                                ObjectType: "Trader",
                                ObjectKey: trader.id
                            });
                        }
                    });
                    _.forEach(vm.securityData.gridOption.data, function (security) {
                        if (security.enable) {
                            userData.UserEntList.push({
                                UserID: data.UserID,
                                ObjectType: "Security",
                                ObjectKey: security.securityID
                            });
                        }
                    });
                    _.forEach(vm.accountData.gridOption.data, function (cashAccount) {
                        if (cashAccount.enable) {
                            userData.UserEntList.push({
                                UserID: data.UserID,
                                ObjectType: "CashAccount",
                                ObjectKey: cashAccount.accountID
                            });
                        }
                    });
                    _.forEach(vm.brokerData.gridOption.data, function (broker) {
                        if (broker.enable) {
                            userData.UserEntList.push({
                                UserID: data.UserID,
                                ObjectType: "Broker",
                                ObjectKey: broker.id
                            });
                        }
                    });
                    _.forEach(vm.shareHolderData.gridOption.data, function (shareHolder) {
                        if (shareHolder.enable) {
                            userData.UserEntList.push({
                                UserID: data.UserID,
                                ObjectType: "ShareHolder",
                                ObjectKey: shareHolder.shareHolderID
                            });
                        }
                    });
                    if (userData.UserEntList.length != 0) {
                        dataService.saveUser(userData).success(function (data) {
                            vm.selectedRow.UserEntList = data.UserEntList;
                            setWatcher();
                        });
                    }
                    else {
                        setWatcher();
                    }

                    vm.enableGridAction = true;
                    vm.newData = null;
                    vm.oldValue = null;
                    vm.changedData = {};
                    vm.canSaveData = false;
                    dataService.getFunctions(function (res) {
                        vm.functionData = res.UserFunctions;
                    });
                });
            }
        };

        vm.cancel = function () {
            if (vm.oldValue) {
                _.assign(vm.selectedRow, vm.oldValue);
            }
            setSubGridCheckedData();
            vm.changedData = {};
            vm.canSaveData = false;
        };

        vm.saveFee = function (row) {
            vm.feeData.gridApi.rowEdit.setSavePromise(row, dataService.saveFee(row));
        };

        vm.removeFee = function () {
            dataService.deleteFee(vm.feeData.selectedRow)
                .success(function () {
                    var index = _.findIndex(vm.feeData.gridOption.data, function (fee) {
                        return fee == vm.feeData.selectedRow;
                    });
                    vm.feeData.gridOption.data.splice(index, 1);
                    vm.feeData.gridApi.grid.modifyRows(vm.feeData.gridOption.data);
                });
        };

        vm.addFee = function () {
            modalService.open({
                templateUrl: 'userModalContent.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: 'feeCtrl',
                resolve: {
                    data: function () {
                        return {
                            fee: {
                                UserRealName: vm.selectedRow.UserRealName,
                                CashAccountID: "",
                                BeginDate: "",
                                EndDate: "",
                                FeeRate: "",
                                UserID: vm.selectedRow.UserID
                            },
                            shareHolders: vm.lookupData.ShareHolderList,
                            openEndDataPicker: function () {
                                this.isEndDateOpen = !this.isEndDateOpen;
                            },
                            openBeginDataPicker: function () {
                                this.isBeginDateOpen = !this.isBeginDateOpen;
                            },
                            ok: function (data) {
                                if (data) {
                                    if (data.fee.CashAccountID && data.fee.BeginDate && data.fee.EndDate && data.fee.FeeRate) {
                                        return true;
                                    }

                                    data.errorMessage = "请输入完整的数据！";
                                    return false;
                                }

                                return false;
                            }
                        };
                    }
                }
            }, function (data) {
                var fee = {};
                fee.UserRealName = data.fee.UserRealName;
                fee.CashAccountID = data.fee.CashAccountID;
                fee.BeginDate = data.fee.BeginDate.format("yyyyMMdd");
                fee.EndDate = data.fee.EndDate.format("yyyyMMdd");
                fee.FeeRate = data.fee.FeeRate;
                fee.UserID = data.fee.UserID;
                fee.IsCreate = true;
                if (data.fee.UserID !== -1) {
                    dataService.saveFee(fee).success(function () {
                        vm.feeData.gridOption.data.push(fee);
                    });
                }
                else {
                    vm.changedData.feeData = fee;
                    vm.feeData.gridOption.data.push(fee);
                }
            });
        }

        vm.functionChanged = function () {
            vm.canSaveData = true;
            vm.changedData.functionChanged = true;
        }

        vm.dataChanged = function (type) {
            switch (type) {
                case 1:
                    vm.changedData.traderChanged = true;
                    break;
                case 2:
                    vm.changedData.securityChanged = true;
                    break;
                case 3:
                    vm.changedData.cashAccountChanged = true;
                    break;
                case 4:
                    vm.changedData.brokerChanged = true;
                    break;
                case 5:
                    vm.changedData.shareHolderChanged = true;
                    break;
            }
            vm.canSaveData = true;
        }

        function initialize() {
            initializeGrid();
            dataService.setCurrentSettingPage("用户设置");
            setInitializData();
            $scope.$on("$destroy", function () {
                releaseWatcher();
            });
        }

        function setInitializData() {
            dataService.getLookupData().success(function (data) {
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
                if (row.entity == vm.selectedRow && !row.isSelected) {
                    row.isSelected = true;
                    return;
                }
                releaseWatcher();
                setUserGridSelectedRow(row.entity);
                setSubGridCheckedData();
                if (vm.newData != null && vm.selectedRow != vm.newData) {
                    resetInitialzieData();
                    vm.gridOption.data.splice(0, 1);
                }
            });
        }

        function initializeFeeGrid() {
            var feeColumnDefs = [
                { field: "UserRealName", displayName: "交易员", enableCellEdit: false },
                { field: "CashAccountID", displayName: "资金账号", minWidth: 100, width: 100, enableCellEdit: false },
                { field: "BeginDate", displayName: "开始日期", enableCellEdit: false },
                { field: "EndDate", displayName: "结束日期", enableCellEdit: false },
                { field: "FeeRate", displayName: "税率", enableCellEdit: true },
                { field: "UserID", displayName: "操作", cellTemplate: actionCellTemplate, minWidth: 50, width: 50 }
            ];
            initializeGridOption(vm.feeData, feeColumnDefs, null, vm.saveFee);
        }

        function initializeTraderGrid() {
            var traderColumnDefs = [
                { field: "name", displayName: "姓名" },
                { field: "department", displayName: "部门" },
                { field: "enable", displayName: "是否可见", cellTemplate: '<div class="grid-checkbox-cell"><input type="checkbox" ng-model="row.entity.enable" ng-click="grid.appScope.userCtrl.dataChanged(1);"/></div>' }
            ];
            initializeGridOption(vm.traderData, traderColumnDefs);
        }

        function initializeSecurityGrid() {
            var securityColumnDefs = [
                { field: "securityID", displayName: "证券代码" },
                { field: "securityName", displayName: "证券名称" },
                { field: "enable", displayName: "是否可见", cellTemplate: '<div class="grid-checkbox-cell"><input type="checkbox" ng-model="row.entity.enable" ng-click="grid.appScope.userCtrl.dataChanged(2);" /></div>' }
            ];
            initializeGridOption(vm.securityData, securityColumnDefs);
        }

        function initializeCashAccountGrid() {
            var cashAccountColumnDefs = [
                { field: "accountID", displayName: "资金账号" },
                { field: "accountName", displayName: "资金名称" },
                { field: "enable", displayName: "是否可见", cellTemplate: '<div class="grid-checkbox-cell"><input type="checkbox" ng-model="row.entity.enable" ng-click="grid.appScope.userCtrl.dataChanged(3);" /></div>' }
            ];
            initializeGridOption(vm.accountData, cashAccountColumnDefs);
        }

        function initializeBrokerGrid() {
            var brokerColumnDefs = [
                { field: "name", displayName: "券商名称" },
                { field: "enable", displayName: "是否可见", cellTemplate: '<div class="grid-checkbox-cell"><input type="checkbox" ng-model="row.entity.enable" ng-click="grid.appScope.userCtrl.dataChanged(4);" /></div>' }
            ];
            initializeGridOption(vm.brokerData, brokerColumnDefs);
        }

        function initializeShareHolderGrid() {
            var shareHolderColumnDefs = [
                { field: "shareHolderID", displayName: "股东编号" },
                { field: "shareHolderName", displayName: "股东名称" },
                { field: "enable", displayName: "是否可见", cellTemplate: '<div class="grid-checkbox-cell"><input type="checkbox" ng-model="row.entity.enable" ng-click="grid.appScope.userCtrl.dataChanged(5);" /></div>' }
            ];
            initializeGridOption(vm.shareHolderData, shareHolderColumnDefs);
        }

        function initializeGridOption(apiData, columnDefs, selectionFun, saveRowFun) {
            if (!selectionFun) {
                selectionFun = function (row) {
                    if (row.entity == apiData.selectedRow && !row.isSelected) {
                        row.isSelected = true;
                        return;
                    }

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
                    if (saveRowFun) {
                        apiData.gridApi.rowEdit.on.saveRow($scope, saveRowFun);
                    }
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
                        setShareHolderCheckedData(entity.ObjectKey);
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

        function setWatcher() {
            userWatcher = $scope.$watch("userCtrl.selectedRow", function (newValue, oldValue) {
                if (!oldValue["$$hashKey"]) {
                    oldValue["$$hashKey"] = newValue["$$hashKey"];
                }
                if (newValue == oldValue) {
                    vm.canSaveData = false;
                }
                else {
                    vm.canSaveData = true;
                    vm.errorMessage = "";
                }

            }, true);
        }

        function releaseWatcher() {
            if (userWatcher) {
                userWatcher();
            }
        }

        function setUserGridSelectedRow(data) {
            vm.cancel();
            vm.selectedRow = data;
            vm.hasRowSelected = true;
            vm.oldValue = _.cloneDeep(data);
            setWatcher();
        }

        function resetInitialzieData() {
            vm.enableGridAction = true;
            vm.isNewData = false;
            vm.newData = null;
            vm.errorMessage = "";
            vm.canSaveData = false;
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