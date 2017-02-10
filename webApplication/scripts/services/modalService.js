define([
], function () {
    'use strict';
    var modalService = ["$uibModal", function ($uibModal) {
        this.open = function (options, callback) {
            var modalInstance = $uibModal.open(options);

            modalInstance.result.then(function (data) {
                if (callback) {
                    callback(data);
                }
            }, function () {
            });
        };
    }];

    return modalService;
});