angular.module('mainapp.pageAdmin')
    .controller('mainapp.pageAdmin.AdminClubsEditController', ['Api', '$scope', '$modal', '$routeParams', '$filter', '$timeout', '$rootScope',
        function(Api, $scope, $modal, $routeParams, $filter, $timeout, $rootScope) {

        var self = this;
        self.datetime = new Date();

        var editor_name;
        if ($rootScope.currentUser.middle_name) {
            editor_name = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.middle_name + ' ' + $rootScope.currentUser.last_name;
        } else {
            editor_name = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.last_name;
        }


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