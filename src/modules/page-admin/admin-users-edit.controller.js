angular.module('mainapp.pageAdmin')
    .controller('mainapp.pageAdmin.AdminUsersEditController', ['Api', '$scope', '$modal', '$routeParams', '$location', '$rootScope',
        function(Api, $scope, $modal, $routeParams, $location, $rootScope) {

        var self = this;
        self.datetime = new Date();

        if ($routeParams._id == 'add') {
            self.user = {};
        } else {
            Api.User.get({
                _id: $routeParams._id
            }, function(res) {
                self.user = res;
            });
        }

        self.userEdit = function() {
            var _t = self.user;

            if (_t.club) {
                _t.club_slug = _t.club.trim().toLowerCase().replace(/\s+/g, '');
            } else {
                _t.club_slug = '';
            }
            angular.forEach(_t.teams, function(value, key) {
                value.team_slug = _t.club_slug + '_' + angular.copy(value.team.trim().toLowerCase().replace(/\s+/g, ''));
            });

            Api.User.put({
                _id: _t._id
            }, {
                email: _t.email,
                first_name: _t.first_name,
                middle_name: _t.middle_name,
                last_name: _t.last_name,
                club: _t.club,
                club_slug: _t.club_slug,
                teams: _t.teams,
                speler_id: _t.speler_id,
                role: _t.role,
                is_superadmin: _t.is_superadmin
            }, function() {
                $location.path('/admin/users');
            }, function() {
            });
        };

        $rootScope.errorAddUser = '';
        self.userAdd = function() {
            $rootScope.errorAddUser = '';
            var _t = self.user;
            if (_t.email !== undefined && self.login.password !== undefined && self.login.password2 !== undefined) {

                if (self.login.password === self.login.password2) {
                    Api.Signin.post({
                        email: _t.email,
                        password: self.login.password,
                        first_name: _t.first_name,
                        middle_name: _t.middle_name,
                        last_name: _t.last_name,
                        datetime: self.datetime
                    }, function (res) {
                        if (res.type === false) {
                            alert(res.data);
                        } else {
                            $location.path("/admin/users/edit/" + res.data._id);
                        }
                    }, function () {
                        $rootScope.errorAddUser = 'Er ging iets mis, account niet aangemaakt';
                    });
                } else {
                    $rootScope.errorAddUser = 'Je hebt het wachtwoord niet (correct) bevestigd';
                }
            } else {
                $rootScope.errorAddUser = 'Je hebt het wachtwoord niet (correct) bevestigd of de email niet correct ingevuld';
            }
        };

        self.itemDel = function () {
            Api.User.delete({
                _id: self.user._id
            }, function() {
                $location.path('/admin/users');
            }, function() {
            });
        };

        self.openModalDel = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'modalDel.html',
                controller: 'ModalDelInstance',
                size: size
            });
            modalInstance.result.then(function () {
                self.itemDel();
            }, function () {
                //
            });
        };
    }])
    .controller('ModalDelInstance', function ($scope, $modalInstance) {
        $scope.ok = function () {
            $modalInstance.close();
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });