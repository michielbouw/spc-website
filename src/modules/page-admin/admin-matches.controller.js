angular.module('mainapp.pageAdmin')
    .controller('mainapp.pageAdmin.AdminMatchesController', ['Api', '$scope', '$modal',
        function(Api, $scope, $modal) {

        var self = this;
        self.datetime = new Date();

        Api.Matches.query(function(res) {
            self.matches = res;
        });

        self.orderMatches = 'match_info.datum';

        self.matchDel = function (i) {
            var _t = self.matches[i];
            Api.Match.delete({
                _id: _t._id
            }, function() {
                self.matches.splice(i, 1);

                Api.MatchDataID.delete({
                    _id: _t.matchID
                }, function() {
                }, function() {
                });
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
                self.matchDel(i);
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