angular.module('mainapp.pageAdmin')
    .controller('mainapp.pageAdmin.AdminMatchesController', ['Api', '$scope', '$uibModal',
        function(Api, $scope, $uibModal) {

        var self = this;
        self.datetime = new Date();

        self.loading = true;

        Api.Matches.query(function(res) {
            self.matches = res;
            self.loading = false;
        });

        self.orderMatches = function(match) {
            return new Date( Date.parse( match.match_info.datum.split('-').reverse().join('-') ) );
        };

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