define([
    'lodash'
], function (_) {
    'use strict';
    var departmentController = ["$scope", "dataService", function ($scope, dataService) {
        var vm = this;
        vm.enableGridAction = true;
        vm.hasRowSelected = false;
        vm.selectedRow = {};
        vm.newData = null;
        vm.allUsers = [];
        vm.unsetDepartmentUsers = [];
        vm.selectedUsers = [];
        vm.unselectedUser = [];
        vm.canSaveData = false;
        var userWatcher = null;
        var oldDepartmentName = "";

        vm.addDepartment = function () {
            vm.enableGridAction = false;
            vm.newData = {
                DepartmentID: -1,
                DepartmentName: "",
                Action: "Create"
            };

            vm.gridOption.data.push(vm.newData);
            vm.gridApi.grid.modifyRows(vm.gridOption.data);
            vm.gridApi.selection.selectRow(vm.newData);
        }

        vm.deleteDepartment = function () {
            dataService.deleteDepartment(vm.selectedRow.DepartmentID).success(function () {
                releaseWatcher();
                var index = _.findIndex(vm.gridOption.data, function (department) {
                    return department.DepartmentID == vm.selectedRow.DepartmentID;
                });
                vm.gridOption.data.splice(index, 1);
                vm.gridApi.grid.modifyRows(vm.gridOption.data);
                if (vm.gridOption.data.length > 0) {
                    var nextSelectedIndex = index == vm.gridOption.data.length ? index - 1 : index;
                    vm.gridApi.selection.selectRow(vm.gridOption.data[nextSelectedIndex])
                }
            });
        }

        vm.saveDepartment = function () {
            var savedUser = vm.newData ? vm.newData : vm.selectedRow;
            if (vm.newData) {
                savedUser.ChangedTraderList = vm.selectedUsers;
            }
            else {
                _.forEach(vm.selectedUsers, function (user) {
                    user.DepartmentID = vm.selectedRow.DepartmentID;
                });
                _.forEach(vm.unselectedUser, function (user) {
                    user.DepartmentID = 0;
                });
                savedUser.ChangedTraderList = _.concat(vm.selectedUsers, vm.unselectedUser);
            }
            dataService.saveDepartment(savedUser).success(function (data) {
                releaseWatcher();
                vm.gridOption.data[vm.gridOption.data.length - 1].DepartmentID = data.DepartmentID;
                vm.gridApi.grid.modifyRows(vm.gridOption.data);
                vm.enableGridAction = true;
                vm.newData = null;
                vm.canSaveData = false;
                dataService.getDepartments().success(function (data) {
                    vm.allUsers = data.TraderList;
                    setUnsetDepartmentUsers();
                });
            });
        }

        vm.cancel = function () {
            releaseWatcher();
            vm.newData = null;
            vm.canSaveData = null;
            vm.selectedRow.DepartmentName = oldDepartmentName;
            setUnsetDepartmentUsers();
            setSelectedUsers();
            setWatcher();
        }

        vm.userListChanged = function () {
            vm.canSaveData = true;
        }

        function initialize() {
            initializeGrid();
            dataService.setCurrentSettingPage("部门设置");
            dataService.getDepartments().success(function (data) {
                vm.gridOption.data = data.DepartmentList;
                vm.allUsers = data.TraderList;
                setUnsetDepartmentUsers();
            });
            $scope.$on("$destroy", function () {
                releaseWatcher();
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
                    { field: "DepartmentID", displayName: "" },
                    { field: "DepartmentName", displayName: "部门名称" }
                ],
                onRegisterApi: function (gridApi) {
                    vm.gridApi = gridApi;
                    vm.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                        if (row.entity == vm.selectedRow && !row.isSelected) {
                            row.isSelected = true;
                            return;
                        }
                        vm.selectedRow = row.entity;
                        vm.hasRowSelected = true;
                        setSelectedUsers();
                        oldDepartmentName = vm.selectedRow.DepartmentName;
                        setWatcher();
                        if (vm.newData != null && vm.selectedRow != vm.newData) {
                            vm.enableGridAction = true;
                            vm.gridOption.data.splice(vm.gridOption.data.length - 1, 1);
                            vm.newData = null;
                        }
                    });
                }
            };
        }

        function setUnsetDepartmentUsers() {
            vm.unselectedUser = _.filter(vm.allUsers, function (user) {
                if (user.DepartmentID <= 0) {
                    return true;
                }

                return _.findIndex(vm.gridOption.data, function (department) {
                    return user.DepartmentID == department.DepartmentID;
                }) == -1;
            });
        }

        function setSelectedUsers() {
            var selectedUser = [];
            _.forEach(vm.allUsers, function (user) {
                if (user.DepartmentID == vm.selectedRow.DepartmentID)
                    selectedUser.push(user);
            });
            vm.selectedUsers = selectedUser;
            vm.unsetDepartmentUsers = vm.unselectedUser;
        }

        function setWatcher() {
            userWatcher = $scope.$watch("departmentCtrl.selectedRow.DepartmentName", function (newValue, oldValue) {
                if (newValue != oldValue) {
                    vm.canSaveData = true;
                }
            });
        }

        function releaseWatcher() {
            if (userWatcher) {
                userWatcher();
            }
        }

        initialize();
    }];

    return departmentController;
});