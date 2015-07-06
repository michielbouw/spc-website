angular.module('mainapp.match')
    .controller('mainapp.match.MatchController', ['Api', '$location', '$filter', '$rootScope', 'AuthenticationService',
        function(Api, $location, $filter, $rootScope, AuthenticationService)
    {
        var self = this;

        self.matches = [];

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
                var teams = $rootScope.currentClub.teams;
                var teamslug = '';
                if ($filter('filter')(teams, {team_slug: self.match.thuisTeamSlug}, true)) {
                    teamslug = $filter('filter')(teams, {team_slug: self.match.thuisTeamSlug}, true)[0];
                } else if ($filter('filter')(teams, {team_slug: self.match.uitTeamSlug}, true)) {
                    teamslug = $filter('filter')(teams, {team_slug: self.match.uitTeamSlug}, true)[0];
                }

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
                    }, function (res) {
                        $rootScope.currentClub.colors = res.colors;
                        $rootScope.currentClub.spc_package = res.spc_package;
                    });

                    if ($rootScope.currentUser.role == 'admin') {
                        Api.Matches.query(function (res) {
                            self.matches = res;
                        });
                    } else if ($rootScope.currentClub.spc_package == 'league' || $rootScope.currentClub.spc_package == 'extra') {
                        Api.Matches.query(function (res) {
                            self.matches = res;
                        });
                    } else {
                        var teams = $rootScope.currentClub.teams;
                        var teamslug = '';
                        if ($filter('filter')(teams, {team_slug: self.match.thuisTeamSlug}, true)) {
                            teamslug = $filter('filter')(teams, {team_slug: self.match.thuisTeamSlug}, true)[0];
                        } else if ($filter('filter')(teams, {team_slug: self.match.uitTeamSlug}, true)) {
                            teamslug = $filter('filter')(teams, {team_slug: self.match.uitTeamSlug}, true)[0];
                        }

                        Api.MatchesTeam.query({
                            _id: teamslug
                        }, function (res) {
                            self.matches = res;
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
        };
    }]);