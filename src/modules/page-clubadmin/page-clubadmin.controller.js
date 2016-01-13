angular.module('mainapp.pageClubadmin')
    .controller('mainapp.pageClubadmin.ClubadminController', ['Api', '$rootScope', '$scope', '$modal', '$sessionStorage',
        '$location',
        function(Api, $rootScope, $scope, $modal, $sessionStorage, $location) {

        var self = this;
        self.datetime = new Date();
        self.users = [];
        self.club = {};

        if ($sessionStorage.currentUser && $sessionStorage.currentClub) {
            Api.Users.query({
                fans: false,
                club: $sessionStorage.currentClub.slug
            }, function(res) {
                self.users = res;
            });

            Api.Club.get({
                _slug: $sessionStorage.currentClub.slug
            }, function (res1) {
                self.club = res1;
            });
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

                        self.club = res1;
                    });

                    Api.Users.query({
                        fans: false,
                        club: res.data.club_slug
                    }, function(res) {
                        self.users = res;
                    });
                }, function () {
                });
            } else {
                $location.path('/login');
            }
        }

        self.userDel = function (i) {
            var _t = self.users[i];
            Api.User.delete({
                _id: _t._id
            }, function() {
                self.users.splice(i, 1);
            }, function() {
            });
        };

        self.clubEdit = function() {
            var _t = self.club;

            var editor_name;
            if ($rootScope.currentUser.middle_name) {
                editor_name = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.middle_name + ' ' + $rootScope.currentUser.last_name;
            } else {
                editor_name = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.last_name;
            }

            angular.forEach(_t.teams, function(value, key) {
                value.team_slug = angular.copy(self.club._slug + '_' + value.team_name.trim().toLowerCase().replace(/\s+/g, ''));

                if (value.contact && value.contact.length > 0) {
                    angular.forEach(value.contact, function(value1, key1) {
                        if (!value1.email || value1.email === '') {
                            value.contact.splice(key1, 1);
                        }
                    });
                }
            });

            Api.Club.put({
                _slug: _t._id
            }, {
                teams: _t.teams,
                editor: editor_name,
                date_edited: self.datetime
            }, function() {
                $location.path('/beheer');
            }, function() {
            });
        };

        self.teamAdd = function (team_name) {
            var temp = {};
            temp.team_name = team_name;
            temp.team_slug = '';
            self.club.teams.push(temp);
            self.clubEdit();
        };

        self.teamDel = function (i) {
            self.club.teams.splice(i, 1);
            self.clubEdit();
        };

        self.teamEmailAdd = function (i) {
            var temp = { email: '' };
            if (!self.club.teams[i].contact || self.club.teams[i].contact.length <= 0) {
                self.club.teams[i].contact = [];
                self.club.teams[i].contact.push(temp);
            } else {
                self.club.teams[i].contact.push(temp);
            }
        };

        self.userModalDel = function (size, i) {
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
                self.userDel(i);
            }, function () {
                //
            });
        };

        self.teamModalDel = function (size, i) {
            var modalInstance = $modal.open({
                templateUrl: 'modalDel1.html',
                controller: 'ModalDelInstance',
                size: size,
                resolve: {
                    i: function () {
                        return i;
                    }
                }
            });
            modalInstance.result.then(function (i) {
                self.teamDel(i);
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