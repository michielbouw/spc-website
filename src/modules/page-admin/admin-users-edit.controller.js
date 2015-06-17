angular.module('mainapp.pageAdmin')
    .controller('mainapp.pageAdmin.AdminUsersEditController', ['Api', '$scope', 'alertService', '$modal', '$routeParams', '$filter', '$timeout', 'ngTableParams', 'Upload',
        '$rootScope',
        function(Api, $scope, alertService, $modal, $routeParams, $filter, $timeout, ngTableParams, Upload, $rootScope) {

        var self = this;
        self.datetime = new Date();



        self.openModalDel = function (size, i) {
            var modalInstance = $modal.open({
                templateUrl: 'modalDel.html',
                controller: 'ModalDelInstance',
                size: size,
                resolve: {
                    i: function () {
                        return i;
                    }
                }
            });
            modalInstance.result.then(function (i) {
                self.itemDel(i);
            }, function () {
                //
            });
        };
    }])
    .controller('ModalDelInstance', function ($scope, $modalInstance, i) {
        $scope.ok = function () {
            $modalInstance.close(i);
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });