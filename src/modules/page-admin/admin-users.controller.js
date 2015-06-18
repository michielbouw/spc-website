angular.module('mainapp.pageAdmin')
    .controller('mainapp.pageAdmin.AdminUsersController', ['Api', '$scope', '$modal',
        function(Api, $scope, $modal) {

        var self = this;
        self.datetime = new Date();

        Api.Users.query({
            fans: false
        }, function(res) {
            self.users = res;
        });

        self.itemDel = function (i) {
            var _t = self.users[i];
            Api.User.delete({
                _id: _t._id
            }, function() {
                self.users.splice(i, 1);
            }, function() {
            });
        };

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