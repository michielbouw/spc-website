angular.module('mainapp.pageAdmin')
    .controller('mainapp.pageAdmin.AdminClubsEditController', ['Api', '$scope', '$modal', '$routeParams', '$filter', '$timeout', '$rootScope', '$location',
        function(Api, $scope, $modal, $routeParams, $filter, $timeout, $rootScope, $location) {

        var self = this;
        self.datetime = new Date();

        if ($routeParams._slug == 'add') {
            self.club = {};
            self.club.colors = [];
            self.club.colors.push({ color: '', refcode: '' });
            self.club.colors.push({ color: '', refcode: '' });
        } else {
            Api.Club.get({
                _slug: $routeParams._slug
            }, function(res) {
                self.club = res;
            });
        }

        var editor_name;
        if ($rootScope.currentUser.middle_name) {
            editor_name = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.middle_name + ' ' + $rootScope.currentUser.last_name;
        } else {
            editor_name = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.last_name;
        }

        $rootScope.errorAddClub = '';
        self.clubEdit = function() {
            $rootScope.errorAddClub = '';
            var _t = self.club;

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
                _slug: _t.slug,
                name: _t.name,
                email: _t.email,
                spc_package: _t.spc_package,
                logo: _t.logo,
                colors: _t.colors,
                teams: _t.teams,
                editor: editor_name,
                date_edited: self.datetime
            }, function() {
                $location.path('/admin/clubs');
            }, function() {
                $rootScope.errorAddClub = 'Er ging iets mis, probeer het opnieuw, vul ook alle verplichte velden correct in';
            });
        };

        self.clubAdd = function() {
            $rootScope.errorAddClub = '';
            var _t = self.club;

            _t._slug = _t.name.trim().toLowerCase().replace(/\s+/g, '');
            _t.logo = _t.name + '.jpg';

            angular.forEach(_t.teams, function(value, key) {
                value.team_slug = _t._slug + '_' + value.team_name.trim().toLowerCase().replace(/\s+/g, '');

                if (value.contact && value.contact.length > 0) {
                    angular.forEach(value.contact, function(value1, key1) {
                        if (!value1.email || value1.email === '') {
                            value.contact.splice(key1, 1);
                        }
                    });
                }
            });

            Api.Clubs.post({
                _slug: _t._slug,
                name: _t.name,
                email: _t.email,
                spc_package: _t.spc_package,
                logo: _t.logo,
                colors: _t.colors,
                teams: _t.teams,
                editor: editor_name,
                date_edited: self.datetime
            }, function (res) {
                $location.path("/admin/clubs/edit/" + res.data._slug);
            }, function () {
                $rootScope.errorAddClub = 'Er ging iets mis, probeer het opnieuw, vul ook alle verplichte velden correct in';
            });
        };

        self.teamAdd = function () {
            var temp = { team_name: '', team_slug: '' };
            self.club.teams.push(temp);
        };

        self.teamDel = function (i) {
            self.club.teams.splice(i, 1);
        };

        self.teamIDAdd = function (i) {
            var temp = { ID: '', season: '' };
            if (!self.club.teams[i].teamID || self.club.teams[i].teamID.length <= 0) {
                self.club.teams[i].teamID = [];
                self.club.teams[i].teamID.push(temp);
            } else {
                self.club.teams[i].teamID.push(temp);
            }
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

        self.teamIDDel = function (parent, i) {
            self.club.teams[parent].teamID.splice(i, 1);
        };

        self.itemDel = function () {
            Api.Club.delete({
                _slug: self.club._slug
            }, function() {
                $location.path('/admin/clubs');
            }, function() {
            });
        };

        self.openModalDel = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'modalDel.html',
                controller: 'ModalDelInstance',
                size: size
            });
            modalInstance.result.then(function (i) {
                self.itemDel();
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