angular.module('mainapp.pageAdmin')
    .controller('mainapp.pageAdmin.AdminClubsController', ['Api', '$scope', '$uibModal', '$routeParams', '$filter', '$timeout', '$rootScope',
        function(Api, $scope, $uibModal, $routeParams, $filter, $timeout, $rootScope) {

        var self = this;
        self.datetime = new Date();

        Api.Clubs.query(function(res) {
            self.clubs = res;
        });

        self.itemDel = function (i) {
            var _t = self.clubs[i];
            Api.Club.delete({
                _slug: _t._slug
            }, function() {
                self.clubs.splice(i, 1);
            }, function() {
            });
        };

        self.openModalDel = function (size, i) {
            var modalInstance = $uibModal.open({
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