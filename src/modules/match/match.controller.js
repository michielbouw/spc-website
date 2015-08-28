angular.module('mainapp.match')
    .controller('mainapp.match.MatchController', ['Api', '$location', '$filter', '$rootScope', 'AuthenticationService',
        '$sessionStorage',
        function(Api, $location, $filter, $rootScope, AuthenticationService, $sessionStorage)
    {
        var self = this;

        self.matches = [];
        var teamslug;
        delete $sessionStorage.matchshort;

        if ($rootScope.currentUser) {
            if ($rootScope.currentUser.role == 'admin') {
                Api.Matches.query(function (res) {
                    self.matches = res;
                });
            } else if ($rootScope.currentClub.spc_package == 'league' || $rootScope.currentClub.spc_package == 'extra') {
                Api.Matches.query(function (res) {
                    self.matches = res;
                });
            } else {
                teamslug = $rootScope.currentClub.teams[0].team_slug;

                Api.MatchesTeam.query({
                    _id: teamslug
                }, function (res) {
                    self.matches = res;
                });
            }
        } else if ($sessionStorage.currentUser && $sessionStorage.currentClub) {
            if ($sessionStorage.currentUser.role == 'admin') {
                Api.Matches.query(function (res) {
                    self.matches = res;
                });
            } else if ($sessionStorage.currentClub.spc_package == 'league' || $sessionStorage.currentClub.spc_package == 'extra') {
                Api.Matches.query(function (res) {
                    self.matches = res;
                });
            } else {
                teamslug = $sessionStorage.currentClub.teams[0].team_slug;

                Api.MatchesTeam.query({
                    _id: teamslug
                }, function (res) {
                    self.matches = res;
                });
            }
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
                    });

                    if ($rootScope.currentUser.role == 'admin') {
                        Api.Matches.query(function (res2) {
                            self.matches = res2;
                        });
                    } else if ($rootScope.currentClub.spc_package == 'league' || $rootScope.currentClub.spc_package == 'extra') {
                        Api.Matches.query(function (res2) {
                            self.matches = res2;
                        });
                    } else {
                        teamslug = $rootScope.currentClub.teams[0].team_slug;

                        Api.MatchesTeam.query({
                            _id: teamslug
                        }, function (res2) {
                            self.matches = res2;
                        });
                    }
                }, function () {
                });
            }
        }

        self.seasonInitFunc = function () {
            self.season_matches = [];
            self.season_matches = $filter('filter')(self.matches, {seizoen: self.season_index}, true);
        };
        self.matchInitFunc = function () {
            self.match = {};
            self.match = $filter('filter')(self.season_matches, {matchID: self.match_index}, true)[0];

            $sessionStorage.matchshort = angular.copy(self.match);
        };
    }]);