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

        vm.addDepartment = function () {
            vm.enableGridAction = false;
            vm.newData = {
                "DepartmentID": 0,
                "DepartmentName": ""
            };

            vm.gridOption.data.push(vm.newData);
            vm.gridApi.grid.modifyRows(vm.gridOption.data);
            vm.gridApi.selection.selectRow(vm.newData);
        }

        vm.deleteDepartment = function () {
            dataService.deleteDepartment(vm.selectedRow.DepartmentID).success(function () {
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
            dataService.saveDepartment(vm.newData).success(function (res) {
                vm.gridOption.data[vm.gridOption.data.length - 1].DepartmentID = res.data.DepartmentID;
                vm.gridApi.grid.modifyRows(vm.gridOption.data);
                vm.enableGridAction = true;
                vm.newData = null;
            });
        }

        vm.cancel = function () {

        }

        function initialize() {
            initializeGrid();
            dataService.setCurrentSettingPage("部门设置");
            dataService.getDepartments(function (res) {
                vm.gridOption.data = res.data.DepartmentList;
                vm.allUsers = res.data.TraderList;
                setUnsetDepartmentUsers();
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
                        vm.selectedRow = row.entity;
                        vm.hasRowSelected = true;
                        setSelectedUsers();
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
            vm.unselectedUser = _.remove(vm.allUsers, function (user) {
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

        initialize();
    }];

    return departmentController;
});