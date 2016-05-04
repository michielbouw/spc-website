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

                    self.seasons_list_init();
                });
            } else if ($rootScope.currentClub.spc_package == 'league' || $rootScope.currentClub.spc_package == 'extra') {
                Api.Matches.query(function (res) {
                    self.matches = res;

                    self.seasons_list_init();
                });
            } else {
                teamslug = $rootScope.currentClub.teams[0].team_slug;

                Api.MatchesTeam.query({
                    _id: teamslug
                }, function (res) {
                    self.matches = res;

                    self.seasons_list_init();
                });
            }
        } else if ($sessionStorage.currentUser && $sessionStorage.currentClub) {
            if ($sessionStorage.currentUser.role == 'admin') {
                Api.Matches.query(function (res) {
                    self.matches = res;

                    self.seasons_list_init();
                });
            } else if ($sessionStorage.currentClub.spc_package == 'league' || $sessionStorage.currentClub.spc_package == 'extra') {
                Api.Matches.query(function (res) {
                    self.matches = res;

                    self.seasons_list_init();
                });
            } else {
                teamslug = $sessionStorage.currentClub.teams[0].team_slug;

                Api.MatchesTeam.query({
                    _id: teamslug
                }, function (res) {
                    self.matches = res;

                    self.seasons_list_init();
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

                        $sessionStorage.currentUser = $rootScope.currentUser;
                        $sessionStorage.currentClub = $rootScope.currentClub;
                    });

                    if ($rootScope.currentUser.role == 'admin') {
                        Api.Matches.query(function (res2) {
                            self.matches = res2;

                            self.seasons_list_init();
                        });
                    } else if ($rootScope.currentClub.spc_package == 'league' || $rootScope.currentClub.spc_package == 'extra') {
                        Api.Matches.query(function (res2) {
                            self.matches = res2;

                            self.seasons_list_init();
                        });
                    } else {
                        teamslug = $rootScope.currentClub.teams[0].team_slug;

                        Api.MatchesTeam.query({
                            _id: teamslug
                        }, function (res2) {
                            self.matches = res2;

                            self.seasons_list_init();
                        });
                    }
                }, function () {
                });
            }
        }

        self.seasons_list_init = function () {
            self.seasons_list = [];
            var season_start = self.matches[self.matches.length-1].seizoen;
            var season_end = self.matches[0].seizoen;
            var temp = {};
            temp.season = season_start;
            self.seasons_list.push(temp);

            var i = season_start;
            while (i.indexOf(String(String(new Date().getFullYear()) + '-')) < 0 && i.indexOf(String(season_end.substring(5, 9) + '-')) < 0) {
                var temp11 = {};

                if (i.indexOf(' Play-offs') > 0) {
                    temp11.season = i.substring(5, 9) + '-' + String(Number(i.substring(5, 9)) + 1);
                    i = i.substring(5, 9) + '-' + String(Number(i.substring(5, 9)) + 1);
                } else {
                    temp11.season = i + ' Play-offs';
                    i = i + ' Play-offs';
                }

                self.seasons_list.push(temp11);
            }
        };

        self.seasonInitFunc = function () {
            self.season_matches = [];
            self.season_matches = $filter('filter')(self.matches, {seizoen: self.season_index}, true);

            angular.forEach(self.season_matches, function(value, key) {
                var DateInNumber = value.match_info.datum;
                var day = DateInNumber.split('-')[0];
                var month = DateInNumber.split('-')[1];
                var year = DateInNumber.split('-')[2];
                var monthName = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
                var dateInAlphabatical = day + ' ' + monthName[month - 1] + ' ' + year;
                value.match_info.datum = new Date(dateInAlphabatical);
            });
        };
        self.matchInitFunc = function () {
            self.match = {};
            self.match = $filter('filter')(self.season_matches, {matchID: self.match_index}, true)[0];

            $sessionStorage.matchshort = angular.copy(self.match);
        };
    }]);