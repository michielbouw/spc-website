angular.module('mainapp.pageClubadmin')
    .controller('mainapp.pageClubadmin.UsereditController', ['Api', '$rootScope', '$scope', '$uibModal', '$sessionStorage',
        '$location', '$routeParams',
        function(Api, $rootScope, $scope, $uibModal, $sessionStorage, $location, $routeParams) {

        var self = this;
        self.datetime = new Date();

        if ($routeParams._id == 'add') {
            self.user = {};
        } else {
            Api.User.get({
                _id: $routeParams._id
            }, function (res) {
                self.user = res;

                if ($sessionStorage.currentUser && $sessionStorage.currentClub) {
                    self.user.club = $sessionStorage.currentClub.name;
                } else {
                    if (AuthenticationService.isLogged) {
                        Api.Me.get(function (res) {
                            $rootScope.currentUser = res.data;

                            $rootScope.currentClub = {};
                            $rootScope.currentClub.name = res.data.club;
                            $rootScope.currentClub.slug = res.data.club_slug;
                            $rootScope.currentClub.teams = res.data.teams;
                            $rootScope.currentClub.colors = [];

                            Api.Club.get({
                                _slug: res.data.club_slug
                            }, function (res1) {
                                $rootScope.currentClub.colors = res1.colors;
                                $rootScope.currentClub.spc_package = res1.spc_package;

                                $sessionStorage.currentUser = $rootScope.currentUser;
                                $sessionStorage.currentClub = $rootScope.currentClub;
                            });

                            self.user.club = res.data.club;
                        }, function () {
                        });
                    } else {
                        $location.path('/login');
                    }
                }
            });

            Api.Clubs.query(function(res) {
                self.clubs = res;
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
                value.team_slug = _t.club_slug + '_' + angular.copy(value.team_name.trim().toLowerCase().replace(/\s+/g, ''));
            });

            Api.User.put({
                _id: _t._id
            }, {
                is_active: _t.is_active,
                email: _t.email,
                first_name: _t.first_name,
                middle_name: _t.middle_name,
                last_name: _t.last_name,
                club: _t.club,
                club_slug: _t.club_slug,
                teams: _t.teams,
                speler_id: _t.speler_id,
                role: _t.role
            }, function() {
                $location.path('/beheer');
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
                            $location.path("/beheer/useredit/" + res.data._id);
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
                $location.path('/beheer');
            }, function() {
            });
        };

        self.openModalDel = function (size) {
            var modalInstance = $uibModal.open({
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