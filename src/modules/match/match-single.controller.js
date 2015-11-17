angular.module('mainapp.match')
    .controller('mainapp.match.MatchSingleController', ['$scope', '$filter', 'Api', 'AuthenticationService', '$location',
        '$rootScope', '$routeParams', '$sessionStorage',
        function($scope, $filter, Api, AuthenticationService, $location, $rootScope, $routeParams, $sessionStorage)
    {
        var self = this;
        self.datetime = new Date();

        self.matchshort = {};
        self.match = {};

        self.loading = true;

        if ($sessionStorage.matchshort && $sessionStorage.matchshort.matchID == $routeParams._id) {
            if ($sessionStorage.currentClub) {
                if ($sessionStorage.currentUser.role == 'admin' || $sessionStorage.currentClub.spc_package == 'extra' || $sessionStorage.currentClub.spc_package == 'league') {
                    self.matchshort = $sessionStorage.matchshort;
                } else if ($sessionStorage.currentClub.spc_package == 'club' && ($sessionStorage.currentClub.name == $sessionStorage.matchshort.match_info.thuis || $sessionStorage.currentClub.name == $sessionStorage.matchshort.match_info.uit)) {
                    self.matchshort = $sessionStorage.matchshort;
                } else {
                    $location.path('/404');
                }
            } else {
                if (AuthenticationService.isLogged && !$sessionStorage.currentUser && !$sessionStorage.currentClub) {
                    Api.Me.get(function (res1) {
                        $sessionStorage.currentUser = res1.data;

                        $sessionStorage.currentClub = {};
                        $sessionStorage.currentClub.name = res1.data.club;
                        $sessionStorage.currentClub.slug = res1.data.club_slug;
                        $sessionStorage.currentClub.teams = res1.data.teams;
                        $sessionStorage.currentClub.colors = [];

                        if (res1.data.role == 'admin') {
                            self.matchshort = $sessionStorage.matchshort;
                        } else {
                            Api.Club.get({
                                _slug: res1.data.club_slug
                            }, function (res2) {
                                $sessionStorage.currentClub.colors = res2.colors;
                                $sessionStorage.currentClub.spc_package = res2.spc_package;

                                if (res2.spc_package == 'extra' || res2.spc_package == 'league') {
                                    self.matchshort = $sessionStorage.matchshort;
                                } else if (res2.spc_package == 'club' && ($sessionStorage.currentClub.name == $sessionStorage.matchshort.match_info.thuis || $sessionStorage.currentClub.name == $sessionStorage.matchshort.match_info.uit)) {
                                    self.matchshort = $sessionStorage.matchshort;
                                } else {
                                    $location.path('/404');
                                }

                                $rootScope.currentUser = $sessionStorage.currentUser;
                                $rootScope.currentClub = $sessionStorage.currentClub;
                            });
                        }
                    });
                } else if (AuthenticationService.isLogged && $sessionStorage.currentUser && $sessionStorage.currentClub) {
                    $rootScope.currentUser = $sessionStorage.currentUser;
                    $rootScope.currentClub = $sessionStorage.currentClub;

                    if ($sessionStorage.currentUser.role == 'admin' || $sessionStorage.currentClub.spc_package == 'extra' || $sessionStorage.currentClub.spc_package == 'league') {
                        self.matchshort = $sessionStorage.matchshort;
                    } else if ($sessionStorage.currentClub.spc_package == 'club' && ($sessionStorage.currentClub.name == $sessionStorage.matchshort.match_info.thuis || $sessionStorage.currentClub.name == $sessionStorage.matchshort.match_info.uit)) {
                        self.matchshort = $sessionStorage.matchshort;
                    } else {
                        $location.path('/404');
                    }
                } else {
                    $location.path('/login');
                }
            }
        } else {
            delete $sessionStorage.matchshort;

            Api.Match.get({
                _id: $routeParams._id
            }, function (res) {
                if ($sessionStorage.currentClub) {
                    if ($sessionStorage.currentUser.role == 'admin' || $sessionStorage.currentClub.spc_package == 'extra' || $sessionStorage.currentClub.spc_package == 'league') {
                        self.matchshort = res;
                        $sessionStorage.matchshort = res;
                    } else if ($sessionStorage.currentClub.spc_package == 'club' && ($sessionStorage.currentClub.name == res.match_info.thuis || $sessionStorage.currentClub.name == res.match_info.uit)) {
                        self.matchshort = res;
                        $sessionStorage.matchshort = res;
                    } else {
                        $location.path('/404');
                    }
                } else {
                    if (AuthenticationService.isLogged && !$sessionStorage.currentUser && !$sessionStorage.currentClub) {
                        Api.Me.get(function (res1) {
                            //$rootScope.currentUser = res1.data;
                            $sessionStorage.currentUser = res1.data;

                            $sessionStorage.currentClub = {};
                            $sessionStorage.currentClub.name = res1.data.club;
                            $sessionStorage.currentClub.slug = res1.data.club_slug;
                            $sessionStorage.currentClub.teams = res1.data.teams;
                            $sessionStorage.currentClub.colors = [];

                            //$rootScope.currentClub = {};
                            //$rootScope.currentClub.name = res1.data.club;
                            //$rootScope.currentClub.slug = res1.data.club_slug;
                            //$rootScope.currentClub.teams = res1.data.teams;
                            //$rootScope.currentClub.colors = [];

                            if (res1.data.role == 'admin') {
                                self.matchshort = res;
                                $sessionStorage.matchshort = res;
                            } else {
                                Api.Club.get({
                                    _slug: res1.data.club_slug
                                }, function (res2) {
                                    $sessionStorage.currentClub.colors = res2.colors;
                                    $sessionStorage.currentClub.spc_package = res2.spc_package;

                                    if (res2.spc_package == 'extra' || res2.spc_package == 'league') {
                                        self.matchshort = res;
                                        $sessionStorage.matchshort = res;
                                    } else if (res2.spc_package == 'club' && ($sessionStorage.currentClub.name == res.match_info.thuis || $sessionStorage.currentClub.name == res.match_info.uit)) {
                                        self.matchshort = res;
                                        $sessionStorage.matchshort = res;
                                    } else {
                                        $location.path('/404');
                                    }

                                    $rootScope.currentUser = $sessionStorage.currentUser;
                                    $rootScope.currentClub = $sessionStorage.currentClub;
                                });
                            }
                        });
                    } else if (AuthenticationService.isLogged && $sessionStorage.currentUser && $sessionStorage.currentClub) {
                        $rootScope.currentUser = $sessionStorage.currentUser;
                        $rootScope.currentClub = $sessionStorage.currentClub;

                        if ($sessionStorage.currentUser.role == 'admin' || $sessionStorage.currentClub.spc_package == 'extra' || $sessionStorage.currentClub.spc_package == 'league') {
                            self.matchshort = res;
                            $sessionStorage.matchshort = res;
                        } else if ($sessionStorage.currentClub.spc_package == 'club' && ($sessionStorage.currentClub.name == res.match_info.thuis || $sessionStorage.currentClub.name == res.match_info.uit)) {
                            self.matchshort = res;
                            $sessionStorage.matchshort = res;
                        } else {
                            $location.path('/404');
                        }
                    } else {
                        $location.path('/login');
                    }
                }
            });
        }

        if ($sessionStorage.matchdata && $sessionStorage.matchdata.matchID == $routeParams._id) {
            self.match = $sessionStorage.matchdata;
            self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_helft1);
            self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);
            self.match.locatie_overtredingen_filter = angular.copy(self.match.locatie_overtredingen);

            if (self.match.penalty_visualisatie.length > 0 && self.match.penalty_visualisatie[0] !== -999) {
                self.match.penalty_thuis = {};
                self.match.penalty_uit = {};
                var temp_thuis = {};
                temp_thuis.rechts_naast = 0;
                temp_thuis.links_naast = 0;
                temp_thuis.rechterpaal = 0;
                temp_thuis.linkerpaal = 0;
                temp_thuis.midden_over = 0;
                temp_thuis.lat = 0;
                temp_thuis.links_hoog = 0;
                temp_thuis.midden_hoog = 0;
                temp_thuis.rechts_hoog = 0;
                temp_thuis.links_laag = 0;
                temp_thuis.midden_laag = 0;
                temp_thuis.rechts_laag = 0;
                temp_thuis.links_hoog_goal = 0;
                temp_thuis.midden_hoog_goal = 0;
                temp_thuis.rechts_hoog_goal = 0;
                temp_thuis.links_laag_goal = 0;
                temp_thuis.midden_laag_goal = 0;
                temp_thuis.rechts_laag_goal = 0;
                temp_thuis.count = 0;
                var temp_uit = {};
                temp_uit.rechts_naast = 0;
                temp_uit.links_naast = 0;
                temp_uit.rechterpaal = 0;
                temp_uit.linkerpaal = 0;
                temp_uit.midden_over = 0;
                temp_uit.lat = 0;
                temp_uit.links_hoog = 0;
                temp_uit.midden_hoog = 0;
                temp_uit.rechts_hoog = 0;
                temp_uit.links_laag = 0;
                temp_uit.midden_laag = 0;
                temp_uit.rechts_laag = 0;
                temp_uit.links_hoog_goal = 0;
                temp_uit.midden_hoog_goal = 0;
                temp_uit.rechts_hoog_goal = 0;
                temp_uit.links_laag_goal = 0;
                temp_uit.midden_laag_goal = 0;
                temp_uit.rechts_laag_goal = 0;
                temp_uit.count = 0;
                angular.forEach(self.match.penalty_visualisatie, function (value, key) {
                    if (value.schutter_teamID == self.matchshort.thuisTeamID) {
                        temp_thuis.rechts_naast += value.rechts && value.naastover ? 1 : 0;
                        temp_thuis.links_naast += value.links && value.naastover ? 1 : 0;
                        temp_thuis.rechterpaal += value.rechterpaal ? 1 : 0;
                        temp_thuis.linkerpaal += value.linkerpaal ? 1 : 0;
                        temp_thuis.midden_over += value.midden && value.naastover ? 1 : 0;
                        temp_thuis.lat += value.lat ? 1 : 0;
                        temp_thuis.links_hoog += value.hoog && value.links ? 1 : 0;
                        temp_thuis.midden_hoog += value.hoog && value.midden ? 1 : 0;
                        temp_thuis.rechts_hoog += value.hoog && value.rechts ? 1 : 0;
                        temp_thuis.links_laag += value.laag && value.links ? 1 : 0;
                        temp_thuis.midden_laag += value.laag && value.midden ? 1 : 0;
                        temp_thuis.rechts_laag += value.laag && value.rechts ? 1 : 0;
                        temp_thuis.links_hoog_goal += value.hoog && value.links && value.gescoord ? 1 : 0;
                        temp_thuis.midden_hoog_goal += value.hoog && value.midden && value.gescoord ? 1 : 0;
                        temp_thuis.rechts_hoog_goal += value.hoog && value.rechts && value.gescoord ? 1 : 0;
                        temp_thuis.links_laag_goal += value.laag && value.links && value.gescoord ? 1 : 0;
                        temp_thuis.midden_laag_goal += value.laag && value.midden && value.gescoord ? 1 : 0;
                        temp_thuis.rechts_laag_goal += value.laag && value.rechts && value.gescoord ? 1 : 0;
                        temp_thuis.count += 1;
                    }
                    if (value.schutter_teamID == self.matchshort.uitTeamID) {
                        temp_uit.rechts_naast += value.rechts && value.naastover ? 1 : 0;
                        temp_uit.links_naast += value.links && value.naastover ? 1 : 0;
                        temp_uit.rechterpaal += value.rechterpaal ? 1 : 0;
                        temp_uit.linkerpaal += value.linkerpaal ? 1 : 0;
                        temp_uit.midden_over += value.midden && value.naastover ? 1 : 0;
                        temp_uit.lat += value.lat ? 1 : 0;
                        temp_uit.links_hoog += value.hoog && value.links ? 1 : 0;
                        temp_uit.midden_hoog += value.hoog && value.midden ? 1 : 0;
                        temp_uit.rechts_hoog += value.hoog && value.rechts ? 1 : 0;
                        temp_uit.links_laag += value.laag && value.links ? 1 : 0;
                        temp_uit.midden_laag += value.laag && value.midden ? 1 : 0;
                        temp_uit.rechts_laag += value.laag && value.rechts ? 1 : 0;
                        temp_uit.links_hoog_goal += value.hoog && value.links && value.gescoord ? 1 : 0;
                        temp_uit.midden_hoog_goal += value.hoog && value.midden && value.gescoord ? 1 : 0;
                        temp_uit.rechts_hoog_goal += value.hoog && value.rechts && value.gescoord ? 1 : 0;
                        temp_uit.links_laag_goal += value.laag && value.links && value.gescoord ? 1 : 0;
                        temp_uit.midden_laag_goal += value.laag && value.midden && value.gescoord ? 1 : 0;
                        temp_uit.rechts_laag_goal += value.laag && value.rechts && value.gescoord ? 1 : 0;
                        temp_uit.count += 1;
                    }
                });
                self.match.penalty_thuis = temp_thuis;
                self.match.penalty_uit = temp_uit;
            }

            Api.SpelersClub.query({
                _id: self.match.thuisTeamID
            }, function (res) {
                self.speler_profiel_thuis = res;
                angular.forEach(self.match.opstelling.thuis, function (value, key) {
                    if (!value.spelerPhoto) {
                        if ($filter('filter')(res, {spelerID: value.personID}, true)) {
                            angular.forEach($filter('filter')(res, {spelerID: value.personID}, true), function (value1, key1) {
                                if (value1.spelerPhoto) {
                                    value.spelerPhoto = value1.spelerPhoto;
                                }
                            });
                        }
                    }
                });
                angular.forEach(self.match.spelersthuisteam, function (value, key) {
                    if (!value.spelerPhoto) {
                        if ($filter('filter')(res, {spelerID: value.personID}, true)) {
                            angular.forEach($filter('filter')(res, {spelerID: value.personID}, true), function (value1, key1) {
                                if (value1.spelerPhoto) {
                                    value.spelerPhoto = value1.spelerPhoto;
                                }
                            });
                        }
                    }
                });
                angular.forEach(self.match.player_stats_full_thuis, function (value, key) {
                    if (!value.spelerPhoto) {
                        if ($filter('filter')(res, {spelerID: value.personID}, true)) {
                            angular.forEach($filter('filter')(res, {spelerID: value.personID}, true), function (value1, key1) {
                                if (value1.spelerPhoto) {
                                    value.spelerPhoto = value1.spelerPhoto;
                                }
                            });
                        }
                    }
                });
            });
            Api.SpelersClub.query({
                _id: self.match.uitTeamID
            }, function (res) {
                self.speler_profiel_uit = res;
                angular.forEach(self.match.opstelling.uit, function (value, key) {
                    if (!value.spelerPhoto) {
                        if ($filter('filter')(res, {spelerID: value.personID}, true)) {
                            angular.forEach($filter('filter')(res, {spelerID: value.personID}, true), function (value1, key1) {
                                if (value1.spelerPhoto) {
                                    value.spelerPhoto = value1.spelerPhoto;
                                }
                            });
                        }
                    }
                });
                angular.forEach(self.match.spelersuitteam, function (value, key) {
                    if (!value.spelerPhoto) {
                        if ($filter('filter')(res, {spelerID: value.personID}, true)) {
                            angular.forEach($filter('filter')(res, {spelerID: value.personID}, true), function (value1, key1) {
                                if (value1.spelerPhoto) {
                                    value.spelerPhoto = value1.spelerPhoto;
                                }
                            });
                        }
                    }
                });
                angular.forEach(self.match.player_stats_full_uit, function (value, key) {
                    if (!value.spelerPhoto) {
                        if ($filter('filter')(res, {spelerID: value.personID}, true)) {
                            angular.forEach($filter('filter')(res, {spelerID: value.personID}, true), function (value1, key1) {
                                if (value1.spelerPhoto) {
                                    value.spelerPhoto = value1.spelerPhoto;
                                }
                            });
                        }
                    }
                });
            });

            var teams;
            var teamslug;

            if ($sessionStorage.currentClub) {
                teams = $sessionStorage.currentClub.teams;
                teamslug = '';
                if (teams && ( (teams[0] && teams[0].team_slug == self.match.thuisTeamSlug) || (teams[1] && teams[1].team_slug == self.match.thuisTeamSlug) )) {
                    teamslug = $filter('filter')(teams, {team_slug: self.match.thuisTeamSlug}, true)[0].team_slug;

                    if (teamslug == self.match.thuisTeamSlug || teamslug == self.match.uitTeamSlug) {
                        Api.TeamDataItem.get({
                            _slug: teamslug
                        }, function (res1) {
                            self.team_data = res1;
                            if ($filter('filter')(res1.team_data, {season: self.match.seizoen}, true)) {
                                var temp = $filter('filter')(res1.team_data, {season: self.match.seizoen}, true)[0];
                                self.teamdata = $filter('filter')(temp.matches, {matchID: self.match.matchID}, true)[0];
                                self.playerdata = res1.player_data;

                                self.spelerscores = [];
                                angular.forEach(self.playerdata, function (value, key) {
                                    var temp = {};
                                    temp.spelerNaam = value.spelerNaam;
                                    temp.playerID = value.playerID;
                                    var temp1 = $filter('filter')(value.matches, {season: self.match.seizoen}, true)[0];
                                    if (temp1) {
                                        var player = $filter('filter')(temp1.match, {matchID: self.match.matchID}, true)[0];
                                        if (player) {
                                            if (player.scores) {
                                                temp.scores = player.scores;
                                            } else {
                                                temp.scores = {};
                                                temp.scores.score_from_coach = 0;
                                            }
                                            self.spelerscores.push(temp);
                                        }
                                    }
                                });
                            }
                        });
                    }
                } else if (teams && ( (teams[0] && teams[0].team_slug == self.match.uitTeamSlug) || (teams[1] && teams[1].team_slug == self.match.uitTeamSlug) )) {
                    teamslug = $filter('filter')(teams, {team_slug: self.match.uitTeamSlug}, true)[0].team_slug;

                    if (teamslug == self.match.thuisTeamSlug || teamslug == self.match.uitTeamSlug) {
                        Api.TeamDataItem.get({
                            _slug: teamslug
                        }, function (res1) {
                            self.team_data = res1;
                            if ($filter('filter')(res1.team_data, {season: self.match.seizoen}, true)) {
                                var temp = $filter('filter')(res1.team_data, {season: self.match.seizoen}, true)[0];
                                self.teamdata = $filter('filter')(temp.matches, {matchID: self.match.matchID}, true)[0];
                                self.playerdata = res1.player_data;

                                self.spelerscores = [];
                                angular.forEach(self.playerdata, function (value, key) {
                                    var temp = {};
                                    temp.spelerNaam = value.spelerNaam;
                                    temp.playerID = value.playerID;
                                    var temp1 = $filter('filter')(value.matches, {season: self.match.seizoen}, true)[0];
                                    if (temp1) {
                                        var player = $filter('filter')(temp1.match, {matchID: self.match.matchID}, true)[0];
                                        if (player) {
                                            if (player.scores) {
                                                temp.scores = player.scores;
                                            } else {
                                                temp.scores = {};
                                                temp.scores.score_from_coach = 0;
                                            }
                                            self.spelerscores.push(temp);
                                        }
                                    }
                                });
                            }
                        });
                    }
                }
            } else {
                if (AuthenticationService.isLogged && !$sessionStorage.currentUser && !$sessionStorage.currentClub) {
                    Api.Me.get(function (res1) {
                        //$rootScope.currentUser = res1.data;
                        $sessionStorage.currentUser = res1.data;

                        $sessionStorage.currentClub = {};
                        $sessionStorage.currentClub.name = res1.data.club;
                        $sessionStorage.currentClub.slug = res1.data.club_slug;
                        $sessionStorage.currentClub.teams = res1.data.teams;
                        $sessionStorage.currentClub.colors = [];

                        //$rootScope.currentClub = {};
                        //$rootScope.currentClub.name = res1.data.club;
                        //$rootScope.currentClub.slug = res1.data.club_slug;
                        //$rootScope.currentClub.teams = res1.data.teams;
                        //$rootScope.currentClub.colors = [];

                        Api.Club.get({
                            _slug: res.data.club_slug
                        }, function (res2) {
                            $sessionStorage.currentClub.colors = res2.colors;
                            $sessionStorage.currentClub.spc_package = res2.spc_package;

                            $rootScope.currentUser = $sessionStorage.currentUser;
                            $rootScope.currentClub = $sessionStorage.currentClub;
                        });

                        teams = res1.data.teams;
                        teamslug = '';
                        if (teams && ( (teams[0] && teams[0].team_slug == self.match.thuisTeamSlug) || (teams[1] && teams[1].team_slug == self.match.thuisTeamSlug) )) {
                            teamslug = $filter('filter')(teams, {team_slug: self.match.thuisTeamSlug}, true)[0].team_slug;

                            if (teamslug == self.match.thuisTeamSlug || teamslug == self.match.uitTeamSlug) {
                                Api.TeamDataItem.get({
                                    _slug: teamslug
                                }, function (res3) {
                                    self.team_data = res3;
                                    if ($filter('filter')(res3.team_data, {season: self.match.seizoen}, true)) {
                                        var temp = $filter('filter')(res3.team_data, {season: self.match.seizoen}, true)[0];
                                        self.teamdata = $filter('filter')(temp.matches, {matchID: self.match.matchID}, true)[0];
                                        self.playerdata = res3.player_data;

                                        self.spelerscores = [];
                                        angular.forEach(self.playerdata, function (value, key) {
                                            var temp = {};
                                            temp.spelerNaam = value.spelerNaam;
                                            temp.playerID = value.playerID;
                                            var temp1 = $filter('filter')(value.matches, {season: self.match.seizoen}, true)[0];
                                            if (temp1) {
                                                var player = $filter('filter')(temp1.match, {matchID: self.match.matchID}, true)[0];
                                                if (player) {
                                                    if (player.scores) {
                                                        temp.scores = player.scores;
                                                    } else {
                                                        temp.scores = {};
                                                        temp.scores.score_from_coach = 0;
                                                    }
                                                    self.spelerscores.push(temp);
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                        } else if (teams && ( (teams[0] && teams[0].team_slug == self.match.uitTeamSlug) || (teams[1] && teams[1].team_slug == self.match.uitTeamSlug) )) {
                            teamslug = $filter('filter')(teams, {team_slug: self.match.uitTeamSlug}, true)[0].team_slug;

                            if (teamslug == self.match.thuisTeamSlug || teamslug == self.match.uitTeamSlug) {
                                Api.TeamDataItem.get({
                                    _slug: teamslug
                                }, function (res3) {
                                    self.team_data = res3;
                                    if ($filter('filter')(res3.team_data, {season: self.match.seizoen}, true)) {
                                        var temp = $filter('filter')(res3.team_data, {season: self.match.seizoen}, true)[0];
                                        self.teamdata = $filter('filter')(temp.matches, {matchID: self.match.matchID}, true)[0];
                                        self.playerdata = res3.player_data;

                                        self.spelerscores = [];
                                        angular.forEach(self.playerdata, function (value, key) {
                                            var temp = {};
                                            temp.spelerNaam = value.spelerNaam;
                                            temp.playerID = value.playerID;
                                            var temp1 = $filter('filter')(value.matches, {season: self.match.seizoen}, true)[0];
                                            if (temp1) {
                                                var player = $filter('filter')(temp1.match, {matchID: self.match.matchID}, true)[0];
                                                if (player) {
                                                    if (player.scores) {
                                                        temp.scores = player.scores;
                                                    } else {
                                                        temp.scores = {};
                                                        temp.scores.score_from_coach = 0;
                                                    }
                                                    self.spelerscores.push(temp);
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    }, function () {
                    });
                } else if (AuthenticationService.isLogged && $sessionStorage.currentUser && $sessionStorage.currentClub) {
                    $rootScope.currentUser = $sessionStorage.currentUser;
                    $rootScope.currentClub = $sessionStorage.currentClub;

                    teams = $sessionStorage.currentClub.teams;
                    teamslug = '';
                    if (teams && ( (teams[0] && teams[0].team_slug == self.match.thuisTeamSlug) || (teams[1] && teams[1].team_slug == self.match.thuisTeamSlug) )) {
                        teamslug = $filter('filter')(teams, {team_slug: self.match.thuisTeamSlug}, true)[0].team_slug;

                        if (teamslug == self.match.thuisTeamSlug || teamslug == self.match.uitTeamSlug) {
                            Api.TeamDataItem.get({
                                _slug: teamslug
                            }, function (res3) {
                                self.team_data = res3;
                                if ($filter('filter')(res3.team_data, {season: self.match.seizoen}, true)) {
                                    var temp = $filter('filter')(res3.team_data, {season: self.match.seizoen}, true)[0];
                                    self.teamdata = $filter('filter')(temp.matches, {matchID: self.match.matchID}, true)[0];
                                    self.playerdata = res3.player_data;

                                    self.spelerscores = [];
                                    angular.forEach(self.playerdata, function (value, key) {
                                        var temp = {};
                                        temp.spelerNaam = value.spelerNaam;
                                        temp.playerID = value.playerID;
                                        var temp1 = $filter('filter')(value.matches, {season: self.match.seizoen}, true)[0];
                                        if (temp1) {
                                            var player = $filter('filter')(temp1.match, {matchID: self.match.matchID}, true)[0];
                                            if (player) {
                                                if (player.scores) {
                                                    temp.scores = player.scores;
                                                } else {
                                                    temp.scores = {};
                                                    temp.scores.score_from_coach = 0;
                                                }
                                                self.spelerscores.push(temp);
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    } else if (teams && ( (teams[0] && teams[0].team_slug == self.match.uitTeamSlug) || (teams[1] && teams[1].team_slug == self.match.uitTeamSlug) )) {
                        teamslug = $filter('filter')(teams, {team_slug: self.match.uitTeamSlug}, true)[0].team_slug;

                        if (teamslug == self.match.thuisTeamSlug || teamslug == self.match.uitTeamSlug) {
                            Api.TeamDataItem.get({
                                _slug: teamslug
                            }, function (res3) {
                                self.team_data = res3;
                                if ($filter('filter')(res3.team_data, {season: self.match.seizoen}, true)) {
                                    var temp = $filter('filter')(res3.team_data, {season: self.match.seizoen}, true)[0];
                                    self.teamdata = $filter('filter')(temp.matches, {matchID: self.match.matchID}, true)[0];
                                    self.playerdata = res3.player_data;

                                    self.spelerscores = [];
                                    angular.forEach(self.playerdata, function (value, key) {
                                        var temp = {};
                                        temp.spelerNaam = value.spelerNaam;
                                        temp.playerID = value.playerID;
                                        var temp1 = $filter('filter')(value.matches, {season: self.match.seizoen}, true)[0];
                                        if (temp1) {
                                            var player = $filter('filter')(temp1.match, {matchID: self.match.matchID}, true)[0];
                                            if (player) {
                                                if (player.scores) {
                                                    temp.scores = player.scores;
                                                } else {
                                                    temp.scores = {};
                                                    temp.scores.score_from_coach = 0;
                                                }
                                                self.spelerscores.push(temp);
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    }
                }
            }
            self.loading = false;
        } else {
            delete $sessionStorage.matchdata;

            Api.MatchDataID.get({
                _id: $routeParams._id
            }, function (res) {
                self.match = res;
                $sessionStorage.matchdata = res;
                self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_helft1);
                self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);
                self.match.locatie_overtredingen_filter = angular.copy(self.match.locatie_overtredingen);

                if (self.match.penalty_visualisatie.length > 0 && self.match.penalty_visualisatie[0] !== -999) {
                    self.match.penalty_thuis = {};
                    self.match.penalty_uit = {};
                    var temp_thuis = {};
                    temp_thuis.rechts_naast = 0;
                    temp_thuis.links_naast = 0;
                    temp_thuis.rechterpaal = 0;
                    temp_thuis.linkerpaal = 0;
                    temp_thuis.midden_over = 0;
                    temp_thuis.lat = 0;
                    temp_thuis.links_hoog = 0;
                    temp_thuis.midden_hoog = 0;
                    temp_thuis.rechts_hoog = 0;
                    temp_thuis.links_laag = 0;
                    temp_thuis.midden_laag = 0;
                    temp_thuis.rechts_laag = 0;
                    temp_thuis.links_hoog_goal = 0;
                    temp_thuis.midden_hoog_goal = 0;
                    temp_thuis.rechts_hoog_goal = 0;
                    temp_thuis.links_laag_goal = 0;
                    temp_thuis.midden_laag_goal = 0;
                    temp_thuis.rechts_laag_goal = 0;
                    temp_thuis.count = 0;
                    var temp_uit = {};
                    temp_uit.rechts_naast = 0;
                    temp_uit.links_naast = 0;
                    temp_uit.rechterpaal = 0;
                    temp_uit.linkerpaal = 0;
                    temp_uit.midden_over = 0;
                    temp_uit.lat = 0;
                    temp_uit.links_hoog = 0;
                    temp_uit.midden_hoog = 0;
                    temp_uit.rechts_hoog = 0;
                    temp_uit.links_laag = 0;
                    temp_uit.midden_laag = 0;
                    temp_uit.rechts_laag = 0;
                    temp_uit.links_hoog_goal = 0;
                    temp_uit.midden_hoog_goal = 0;
                    temp_uit.rechts_hoog_goal = 0;
                    temp_uit.links_laag_goal = 0;
                    temp_uit.midden_laag_goal = 0;
                    temp_uit.rechts_laag_goal = 0;
                    temp_uit.count = 0;
                    angular.forEach(self.match.penalty_visualisatie, function (value, key) {
                        if (value.schutter_teamID == self.matchshort.thuisTeamID) {
                            temp_thuis.rechts_naast += value.rechts && value.naastover ? 1 : 0;
                            temp_thuis.links_naast += value.links && value.naastover ? 1 : 0;
                            temp_thuis.rechterpaal += value.rechterpaal ? 1 : 0;
                            temp_thuis.linkerpaal += value.linkerpaal ? 1 : 0;
                            temp_thuis.midden_over += value.midden && value.naastover ? 1 : 0;
                            temp_thuis.lat += value.lat ? 1 : 0;
                            temp_thuis.links_hoog += value.hoog && value.links ? 1 : 0;
                            temp_thuis.midden_hoog += value.hoog && value.midden ? 1 : 0;
                            temp_thuis.rechts_hoog += value.hoog && value.rechts ? 1 : 0;
                            temp_thuis.links_laag += value.laag && value.links ? 1 : 0;
                            temp_thuis.midden_laag += value.laag && value.midden ? 1 : 0;
                            temp_thuis.rechts_laag += value.laag && value.rechts ? 1 : 0;
                            temp_thuis.links_hoog_goal += value.hoog && value.links && value.gescoord ? 1 : 0;
                            temp_thuis.midden_hoog_goal += value.hoog && value.midden && value.gescoord ? 1 : 0;
                            temp_thuis.rechts_hoog_goal += value.hoog && value.rechts && value.gescoord ? 1 : 0;
                            temp_thuis.links_laag_goal += value.laag && value.links && value.gescoord ? 1 : 0;
                            temp_thuis.midden_laag_goal += value.laag && value.midden && value.gescoord ? 1 : 0;
                            temp_thuis.rechts_laag_goal += value.laag && value.rechts && value.gescoord ? 1 : 0;
                            temp_thuis.count += 1;
                        }
                        if (value.schutter_teamID == self.matchshort.uitTeamID) {
                            temp_uit.rechts_naast += value.rechts && value.naastover ? 1 : 0;
                            temp_uit.links_naast += value.links && value.naastover ? 1 : 0;
                            temp_uit.rechterpaal += value.rechterpaal ? 1 : 0;
                            temp_uit.linkerpaal += value.linkerpaal ? 1 : 0;
                            temp_uit.midden_over += value.midden && value.naastover ? 1 : 0;
                            temp_uit.lat += value.lat ? 1 : 0;
                            temp_uit.links_hoog += value.hoog && value.links ? 1 : 0;
                            temp_uit.midden_hoog += value.hoog && value.midden ? 1 : 0;
                            temp_uit.rechts_hoog += value.hoog && value.rechts ? 1 : 0;
                            temp_uit.links_laag += value.laag && value.links ? 1 : 0;
                            temp_uit.midden_laag += value.laag && value.midden ? 1 : 0;
                            temp_uit.rechts_laag += value.laag && value.rechts ? 1 : 0;
                            temp_uit.links_hoog_goal += value.hoog && value.links && value.gescoord ? 1 : 0;
                            temp_uit.midden_hoog_goal += value.hoog && value.midden && value.gescoord ? 1 : 0;
                            temp_uit.rechts_hoog_goal += value.hoog && value.rechts && value.gescoord ? 1 : 0;
                            temp_uit.links_laag_goal += value.laag && value.links && value.gescoord ? 1 : 0;
                            temp_uit.midden_laag_goal += value.laag && value.midden && value.gescoord ? 1 : 0;
                            temp_uit.rechts_laag_goal += value.laag && value.rechts && value.gescoord ? 1 : 0;
                            temp_uit.count += 1;
                        }
                    });
                    self.match.penalty_thuis = temp_thuis;
                    self.match.penalty_uit = temp_uit;
                }

                Api.SpelersClub.query({
                    _id: self.match.thuisTeamID
                }, function (res) {
                    self.speler_profiel_thuis = res;
                    angular.forEach(self.match.opstelling.thuis, function (value, key) {
                        if (!value.spelerPhoto) {
                            if ($filter('filter')(res, {spelerID: value.personID}, true)) {
                                angular.forEach($filter('filter')(res, {spelerID: value.personID}, true), function (value1, key1) {
                                    if (value1.spelerPhoto) {
                                        value.spelerPhoto = value1.spelerPhoto;
                                    }
                                });
                            }
                        }
                    });
                    angular.forEach(self.match.spelersthuisteam, function (value, key) {
                        if (!value.spelerPhoto) {
                            if ($filter('filter')(res, {spelerID: value.personID}, true)) {
                                angular.forEach($filter('filter')(res, {spelerID: value.personID}, true), function (value1, key1) {
                                    if (value1.spelerPhoto) {
                                        value.spelerPhoto = value1.spelerPhoto;
                                    }
                                });
                            }
                        }
                    });
                    angular.forEach(self.match.player_stats_full_thuis, function (value, key) {
                        if (!value.spelerPhoto) {
                            if ($filter('filter')(res, {spelerID: value.personID}, true)) {
                                angular.forEach($filter('filter')(res, {spelerID: value.personID}, true), function (value1, key1) {
                                    if (value1.spelerPhoto) {
                                        value.spelerPhoto = value1.spelerPhoto;
                                    }
                                });
                            }
                        }
                    });
                });
                Api.SpelersClub.query({
                    _id: self.match.uitTeamID
                }, function (res) {
                    self.speler_profiel_uit = res;
                    angular.forEach(self.match.opstelling.uit, function (value, key) {
                        if (!value.spelerPhoto) {
                            if ($filter('filter')(res, {spelerID: value.personID}, true)) {
                                angular.forEach($filter('filter')(res, {spelerID: value.personID}, true), function (value1, key1) {
                                    if (value1.spelerPhoto) {
                                        value.spelerPhoto = value1.spelerPhoto;
                                    }
                                });
                            }
                        }
                    });
                    angular.forEach(self.match.spelersuitteam, function (value, key) {
                        if (!value.spelerPhoto) {
                            if ($filter('filter')(res, {spelerID: value.personID}, true)) {
                                angular.forEach($filter('filter')(res, {spelerID: value.personID}, true), function (value1, key1) {
                                    if (value1.spelerPhoto) {
                                        value.spelerPhoto = value1.spelerPhoto;
                                    }
                                });
                            }
                        }
                    });
                    angular.forEach(self.match.player_stats_full_uit, function (value, key) {
                        if (!value.spelerPhoto) {
                            if ($filter('filter')(res, {spelerID: value.personID}, true)) {
                                angular.forEach($filter('filter')(res, {spelerID: value.personID}, true), function (value1, key1) {
                                    if (value1.spelerPhoto) {
                                        value.spelerPhoto = value1.spelerPhoto;
                                    }
                                });
                            }
                        }
                    });
                });

                var teams;
                var teamslug;

                if ($sessionStorage.currentClub) {
                    teams = $sessionStorage.currentClub.teams;
                    teamslug = '';
                    if (teams && ( (teams[0] && teams[0].team_slug == self.match.thuisTeamSlug) || (teams[1] && teams[1].team_slug == self.match.thuisTeamSlug) )) {
                        teamslug = $filter('filter')(teams, {team_slug: self.match.thuisTeamSlug}, true)[0].team_slug;

                        if (teamslug == self.match.thuisTeamSlug || teamslug == self.match.uitTeamSlug) {
                            Api.TeamDataItem.get({
                                _slug: teamslug
                            }, function (res1) {
                                self.team_data = res1;
                                if ($filter('filter')(res1.team_data, {season: self.match.seizoen}, true)) {
                                    var temp = $filter('filter')(res1.team_data, {season: self.match.seizoen}, true)[0];
                                    self.teamdata = $filter('filter')(temp.matches, {matchID: self.match.matchID}, true)[0];
                                    self.playerdata = res1.player_data;

                                    self.spelerscores = [];
                                    angular.forEach(self.playerdata, function (value, key) {
                                        var temp = {};
                                        temp.spelerNaam = value.spelerNaam;
                                        temp.playerID = value.playerID;
                                        var temp1 = $filter('filter')(value.matches, {season: self.match.seizoen}, true)[0];
                                        if (temp1) {
                                            var player = $filter('filter')(temp1.match, {matchID: self.match.matchID}, true)[0];
                                            if (player) {
                                                if (player.scores) {
                                                    temp.scores = player.scores;
                                                } else {
                                                    temp.scores = {};
                                                    temp.scores.score_from_coach = 0;
                                                }
                                                self.spelerscores.push(temp);
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    } else if (teams && ( (teams[0] && teams[0].team_slug == self.match.uitTeamSlug) || (teams[1] && teams[1].team_slug == self.match.uitTeamSlug) )) {
                        teamslug = $filter('filter')(teams, {team_slug: self.match.uitTeamSlug}, true)[0].team_slug;

                        if (teamslug == self.match.thuisTeamSlug || teamslug == self.match.uitTeamSlug) {
                            Api.TeamDataItem.get({
                                _slug: teamslug
                            }, function (res1) {
                                self.team_data = res1;
                                if ($filter('filter')(res1.team_data, {season: self.match.seizoen}, true)) {
                                    var temp = $filter('filter')(res1.team_data, {season: self.match.seizoen}, true)[0];
                                    self.teamdata = $filter('filter')(temp.matches, {matchID: self.match.matchID}, true)[0];
                                    self.playerdata = res1.player_data;

                                    self.spelerscores = [];
                                    angular.forEach(self.playerdata, function (value, key) {
                                        var temp = {};
                                        temp.spelerNaam = value.spelerNaam;
                                        temp.playerID = value.playerID;
                                        var temp1 = $filter('filter')(value.matches, {season: self.match.seizoen}, true)[0];
                                        if (temp1) {
                                            var player = $filter('filter')(temp1.match, {matchID: self.match.matchID}, true)[0];
                                            if (player) {
                                                if (player.scores) {
                                                    temp.scores = player.scores;
                                                } else {
                                                    temp.scores = {};
                                                    temp.scores.score_from_coach = 0;
                                                }
                                                self.spelerscores.push(temp);
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    }
                } else {
                    if (AuthenticationService.isLogged && !$sessionStorage.currentUser && !$sessionStorage.currentClub) {
                        Api.Me.get(function (res1) {
                            //$rootScope.currentUser = res1.data;
                            $sessionStorage.currentUser = res1.data;

                            $sessionStorage.currentClub = {};
                            $sessionStorage.currentClub.name = res1.data.club;
                            $sessionStorage.currentClub.slug = res1.data.club_slug;
                            $sessionStorage.currentClub.teams = res1.data.teams;
                            $sessionStorage.currentClub.colors = [];

                            //$rootScope.currentClub = {};
                            //$rootScope.currentClub.name = res1.data.club;
                            //$rootScope.currentClub.slug = res1.data.club_slug;
                            //$rootScope.currentClub.teams = res1.data.teams;
                            //$rootScope.currentClub.colors = [];

                            Api.Club.get({
                                _slug: res.data.club_slug
                            }, function (res2) {
                                $sessionStorage.currentClub.colors = res2.colors;
                                $sessionStorage.currentClub.spc_package = res2.spc_package;

                                $rootScope.currentUser = $sessionStorage.currentUser;
                                $rootScope.currentClub = $sessionStorage.currentClub;
                            });

                            teams = res1.data.teams;
                            teamslug = '';
                            if (teams && ( (teams[0] && teams[0].team_slug == self.match.thuisTeamSlug) || (teams[1] && teams[1].team_slug == self.match.thuisTeamSlug) )) {
                                teamslug = $filter('filter')(teams, {team_slug: self.match.thuisTeamSlug}, true)[0].team_slug;

                                if (teamslug == self.match.thuisTeamSlug || teamslug == self.match.uitTeamSlug) {
                                    Api.TeamDataItem.get({
                                        _slug: teamslug
                                    }, function (res3) {
                                        self.team_data = res3;
                                        if ($filter('filter')(res3.team_data, {season: self.match.seizoen}, true)) {
                                            var temp = $filter('filter')(res3.team_data, {season: self.match.seizoen}, true)[0];
                                            self.teamdata = $filter('filter')(temp.matches, {matchID: self.match.matchID}, true)[0];
                                            self.playerdata = res3.player_data;

                                            self.spelerscores = [];
                                            angular.forEach(self.playerdata, function (value, key) {
                                                var temp = {};
                                                temp.spelerNaam = value.spelerNaam;
                                                temp.playerID = value.playerID;
                                                var temp1 = $filter('filter')(value.matches, {season: self.match.seizoen}, true)[0];
                                                if (temp1) {
                                                    var player = $filter('filter')(temp1.match, {matchID: self.match.matchID}, true)[0];
                                                    if (player) {
                                                        if (player.scores) {
                                                            temp.scores = player.scores;
                                                        } else {
                                                            temp.scores = {};
                                                            temp.scores.score_from_coach = 0;
                                                        }
                                                        self.spelerscores.push(temp);
                                                    }
                                                }
                                            });
                                        }
                                    });
                                }
                            } else if (teams && ( (teams[0] && teams[0].team_slug == self.match.uitTeamSlug) || (teams[1] && teams[1].team_slug == self.match.uitTeamSlug) )) {
                                teamslug = $filter('filter')(teams, {team_slug: self.match.uitTeamSlug}, true)[0].team_slug;

                                if (teamslug == self.match.thuisTeamSlug || teamslug == self.match.uitTeamSlug) {
                                    Api.TeamDataItem.get({
                                        _slug: teamslug
                                    }, function (res3) {
                                        self.team_data = res3;
                                        if ($filter('filter')(res3.team_data, {season: self.match.seizoen}, true)) {
                                            var temp = $filter('filter')(res3.team_data, {season: self.match.seizoen}, true)[0];
                                            self.teamdata = $filter('filter')(temp.matches, {matchID: self.match.matchID}, true)[0];
                                            self.playerdata = res3.player_data;

                                            self.spelerscores = [];
                                            angular.forEach(self.playerdata, function (value, key) {
                                                var temp = {};
                                                temp.spelerNaam = value.spelerNaam;
                                                temp.playerID = value.playerID;
                                                var temp1 = $filter('filter')(value.matches, {season: self.match.seizoen}, true)[0];
                                                if (temp1) {
                                                    var player = $filter('filter')(temp1.match, {matchID: self.match.matchID}, true)[0];
                                                    if (player) {
                                                        if (player.scores) {
                                                            temp.scores = player.scores;
                                                        } else {
                                                            temp.scores = {};
                                                            temp.scores.score_from_coach = 0;
                                                        }
                                                        self.spelerscores.push(temp);
                                                    }
                                                }
                                            });
                                        }
                                    });
                                }
                            }
                        }, function () {
                        });
                    } else if (AuthenticationService.isLogged && $sessionStorage.currentUser && $sessionStorage.currentClub) {
                        $rootScope.currentUser = $sessionStorage.currentUser;
                        $rootScope.currentClub = $sessionStorage.currentClub;

                        teams = $sessionStorage.currentClub.teams;
                        teamslug = '';
                        if (teams && ( (teams[0] && teams[0].team_slug == self.match.thuisTeamSlug) || (teams[1] && teams[1].team_slug == self.match.thuisTeamSlug) )) {
                            teamslug = $filter('filter')(teams, {team_slug: self.match.thuisTeamSlug}, true)[0].team_slug;

                            if (teamslug == self.match.thuisTeamSlug || teamslug == self.match.uitTeamSlug) {
                                Api.TeamDataItem.get({
                                    _slug: teamslug
                                }, function (res3) {
                                    self.team_data = res3;
                                    if ($filter('filter')(res3.team_data, {season: self.match.seizoen}, true)) {
                                        var temp = $filter('filter')(res3.team_data, {season: self.match.seizoen}, true)[0];
                                        self.teamdata = $filter('filter')(temp.matches, {matchID: self.match.matchID}, true)[0];
                                        self.playerdata = res3.player_data;

                                        self.spelerscores = [];
                                        angular.forEach(self.playerdata, function (value, key) {
                                            var temp = {};
                                            temp.spelerNaam = value.spelerNaam;
                                            temp.playerID = value.playerID;
                                            var temp1 = $filter('filter')(value.matches, {season: self.match.seizoen}, true)[0];
                                            if (temp1) {
                                                var player = $filter('filter')(temp1.match, {matchID: self.match.matchID}, true)[0];
                                                if (player) {
                                                    if (player.scores) {
                                                        temp.scores = player.scores;
                                                    } else {
                                                        temp.scores = {};
                                                        temp.scores.score_from_coach = 0;
                                                    }
                                                    self.spelerscores.push(temp);
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                        } else if (teams && ( (teams[0] && teams[0].team_slug == self.match.uitTeamSlug) || (teams[1] && teams[1].team_slug == self.match.uitTeamSlug) )) {
                            teamslug = $filter('filter')(teams, {team_slug: self.match.uitTeamSlug}, true)[0].team_slug;

                            if (teamslug == self.match.thuisTeamSlug || teamslug == self.match.uitTeamSlug) {
                                Api.TeamDataItem.get({
                                    _slug: teamslug
                                }, function (res3) {
                                    self.team_data = res3;
                                    if ($filter('filter')(res3.team_data, {season: self.match.seizoen}, true)) {
                                        var temp = $filter('filter')(res3.team_data, {season: self.match.seizoen}, true)[0];
                                        self.teamdata = $filter('filter')(temp.matches, {matchID: self.match.matchID}, true)[0];
                                        self.playerdata = res3.player_data;

                                        self.spelerscores = [];
                                        angular.forEach(self.playerdata, function (value, key) {
                                            var temp = {};
                                            temp.spelerNaam = value.spelerNaam;
                                            temp.playerID = value.playerID;
                                            var temp1 = $filter('filter')(value.matches, {season: self.match.seizoen}, true)[0];
                                            if (temp1) {
                                                var player = $filter('filter')(temp1.match, {matchID: self.match.matchID}, true)[0];
                                                if (player) {
                                                    if (player.scores) {
                                                        temp.scores = player.scores;
                                                    } else {
                                                        temp.scores = {};
                                                        temp.scores.score_from_coach = 0;
                                                    }
                                                    self.spelerscores.push(temp);
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    }
                }
                self.loading = false;
            });
        }

        self.splitTime = function(string) {
            if ( !isNaN( Number(string.split("'")[0]) ) ) {
                return Number(string.split("'")[0]);
            } else {
                return Number(string.split("+")[0]) + Number(string.split("+")[1].split("'")[0]);
            }
        };

        $scope.position_field_interval = '1e helft';
        $scope.$watch('position_field_interval', function () {
            if ($scope.position_field_interval == '00 - 15 min') { self.match.gemiddelde_posities = self.match.gemiddelde_posities_kwartier1; }
            else if ($scope.position_field_interval == '15 - 30 min') { self.match.gemiddelde_posities = self.match.gemiddelde_posities_kwartier2; }
            else if ($scope.position_field_interval == '30 - 45 min') { self.match.gemiddelde_posities = self.match.gemiddelde_posities_kwartier3; }
            else if ($scope.position_field_interval == '45 - 60 min') { self.match.gemiddelde_posities = self.match.gemiddelde_posities_kwartier4; }
            else if ($scope.position_field_interval == '60 - 75 min') { self.match.gemiddelde_posities = self.match.gemiddelde_posities_kwartier5; }
            else if ($scope.position_field_interval == '75 - 90 min') { self.match.gemiddelde_posities = self.match.gemiddelde_posities_kwartier6; }
            else if ($scope.position_field_interval == '1e helft') { self.match.gemiddelde_posities = self.match.gemiddelde_posities_helft1; }
            else if ($scope.position_field_interval == '2e helft') { self.match.gemiddelde_posities = self.match.gemiddelde_posities_helft2; }

            selectpositions_uit = true;
            selectpositions_thuis = true;
        });

        var selectpositions_uit = true;
        var selectpositions_thuis = true;
        self.select_positions_uit = function () {
            if (!selectpositions_uit) {
                if ($scope.position_field_interval == '00 - 15 min') { self.match.gemiddelde_posities = self.match.gemiddelde_posities_kwartier1; }
                else if ($scope.position_field_interval == '15 - 30 min') { self.match.gemiddelde_posities = self.match.gemiddelde_posities_kwartier2; }
                else if ($scope.position_field_interval == '30 - 45 min') { self.match.gemiddelde_posities = self.match.gemiddelde_posities_kwartier3; }
                else if ($scope.position_field_interval == '45 - 60 min') { self.match.gemiddelde_posities = self.match.gemiddelde_posities_kwartier4; }
                else if ($scope.position_field_interval == '60 - 75 min') { self.match.gemiddelde_posities = self.match.gemiddelde_posities_kwartier5; }
                else if ($scope.position_field_interval == '75 - 90 min') { self.match.gemiddelde_posities = self.match.gemiddelde_posities_kwartier6; }
                else if ($scope.position_field_interval == '1e helft') { self.match.gemiddelde_posities = self.match.gemiddelde_posities_helft1; }
                else if ($scope.position_field_interval == '2e helft') { self.match.gemiddelde_posities = self.match.gemiddelde_posities_helft2; }

                if (!selectpositions_thuis) {
                    self.match.gemiddelde_posities = angular.copy($filter('filter')(self.match.gemiddelde_posities, {teamNaam: self.matchshort.match_info.uit_kort}));
                }

                selectpositions_uit = true;
            } else {
                self.match.gemiddelde_posities = angular.copy($filter('filter')(self.match.gemiddelde_posities, {teamNaam: self.matchshort.match_info.uit_kort}));
                selectpositions_thuis = false;
            }
        };
        self.select_positions_thuis = function () {
            if (!selectpositions_thuis) {
                if ($scope.position_field_interval == '00 - 15 min') { self.match.gemiddelde_posities = self.match.gemiddelde_posities_kwartier1; }
                else if ($scope.position_field_interval == '15 - 30 min') { self.match.gemiddelde_posities = self.match.gemiddelde_posities_kwartier2; }
                else if ($scope.position_field_interval == '30 - 45 min') { self.match.gemiddelde_posities = self.match.gemiddelde_posities_kwartier3; }
                else if ($scope.position_field_interval == '45 - 60 min') { self.match.gemiddelde_posities = self.match.gemiddelde_posities_kwartier4; }
                else if ($scope.position_field_interval == '60 - 75 min') { self.match.gemiddelde_posities = self.match.gemiddelde_posities_kwartier5; }
                else if ($scope.position_field_interval == '75 - 90 min') { self.match.gemiddelde_posities = self.match.gemiddelde_posities_kwartier6; }
                else if ($scope.position_field_interval == '1e helft') { self.match.gemiddelde_posities = self.match.gemiddelde_posities_helft1; }
                else if ($scope.position_field_interval == '2e helft') { self.match.gemiddelde_posities = self.match.gemiddelde_posities_helft2; }

                if (!selectpositions_uit) {
                    self.match.gemiddelde_posities = angular.copy($filter('filter')(self.match.gemiddelde_posities, {teamNaam: self.matchshort.match_info.thuis_kort}));
                }

                selectpositions_thuis = true;
            } else {
                self.match.gemiddelde_posities = angular.copy($filter('filter')(self.match.gemiddelde_posities, {teamNaam: self.matchshort.match_info.thuis_kort}));
                selectpositions_uit = false;
            }
        };
        var selectpogingen_uit = true;
        var selectpogingen_thuis = true;
        var selectpogingen_doel = true;
        var selectpogingen_target = true;
        self.select_pogingen_uit = function () {
            if (!selectpogingen_uit) {
                self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);
                selectpogingen_uit = true;
            } else {
                self.match.locatie_doelpogingen_filter.thuisTeam = [];
                selectpogingen_thuis = false;
            }
        };
        self.select_pogingen_thuis = function () {
            if (!selectpogingen_thuis) {
                self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);
                selectpogingen_thuis = true;
            } else {
                self.match.locatie_doelpogingen_filter.uitTeam = [];
                selectpogingen_uit = false;
            }
        };
        self.select_pogingen_doel = function () {
            if (!selectpogingen_doel) {
                self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);
                if (!selectpogingen_uit) {
                    self.match.locatie_doelpogingen_filter.uitTeam = [];
                }
                if (!selectpogingen_thuis) {
                    self.match.locatie_doelpogingen_filter.thuisTeam = [];
                }
                selectpogingen_doel = true;
            } else {
                if (selectpogingen_uit) {
                    self.match.locatie_doelpogingen_filter.uitTeam = angular.copy($filter('filter')(self.match.locatie_doelpogingen_filter.uitTeam, {type: 'Doelpunt'}));
                }
                if (selectpogingen_thuis) {
                    self.match.locatie_doelpogingen_filter.thuisTeam = angular.copy($filter('filter')(self.match.locatie_doelpogingen_filter.thuisTeam, {type: 'Doelpunt'}));
                }
                selectpogingen_doel = false;
            }
        };
        self.select_pogingen_target = function () {
            if (!selectpogingen_target) {
                self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);
                if (!selectpogingen_uit) {
                    self.match.locatie_doelpogingen_filter.uitTeam = [];
                }
                if (!selectpogingen_thuis) {
                    self.match.locatie_doelpogingen_filter.thuisTeam = [];
                }
                selectpogingen_target = true;
            } else {
                if (selectpogingen_uit) {
                    self.match.locatie_doelpogingen_filter.uitTeam = angular.copy($filter('filter')(self.match.locatie_doelpogingen_filter.uitTeam, {type: 'Redding'}));
                }
                if (selectpogingen_thuis) {
                    self.match.locatie_doelpogingen_filter.thuisTeam = angular.copy($filter('filter')(self.match.locatie_doelpogingen_filter.thuisTeam, {type: 'Redding'}));
                }
                selectpogingen_target = false;
            }
        };

        var selectovertredingen_uit = true;
        var selectovertredingen_thuis = true;
        self.select_overtredingen_uit = function () {
            if (!selectovertredingen_uit) {
                self.match.locatie_overtredingen_filter = angular.copy(self.match.locatie_overtredingen);
                selectovertredingen_thuis = true;
                selectovertredingen_uit = true;
            } else {
                self.match.locatie_overtredingen_filter.thuisTeam = [];
                selectovertredingen_thuis = false;
                selectovertredingen_uit = true;
            }
        };
        self.select_overtredingen_thuis = function () {
            if (!selectovertredingen_thuis) {
                self.match.locatie_overtredingen_filter = angular.copy(self.match.locatie_overtredingen);
                selectovertredingen_thuis = true;
                selectovertredingen_uit = true;
            } else {
                self.match.locatie_overtredingen_filter.uitTeam = [];
                selectovertredingen_thuis = true;
                selectovertredingen_uit = false;
            }
        };

        self.orderSpelers = 'personID';
        self.orderSpelersNaam = 'spelerNaam';
        self.orderSpelersNaamType = ['-type', 'spelerNaam'];

        self.createLineTransform = function (x1,y1,x2,y2) {
            var angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
            return 'rotate(' + angle + 'deg)';
        };
        self.createLineLength = function (x1,y1,x2,y2) {
            return Math.sqrt(Math.abs(x1 - x2) * Math.abs(x1 - x2) + Math.abs(y1 - y2) * Math.abs(y1 - y2));
        };

        self.player1InitFunc = function (i) {
            self.speler1 = $filter('filter')(self.match.player_stats_full_thuis, {personID: i}, true)[0];
        };
        self.player2InitFunc = function (i) {
            self.speler2 = $filter('filter')(self.match.player_stats_full_thuis, {personID: i}, true)[0];
        };
        self.player3InitFunc = function (i) {
            self.speler3 = $filter('filter')(self.match.player_stats_full_uit, {personID: i}, true)[0];
        };
        self.player4InitFunc = function (i) {
            self.speler4 = $filter('filter')(self.match.player_stats_full_uit, {personID: i}, true)[0];
        };

        self.playerlog1InitFunc = function (i) {
            var temp = $filter('filter')(self.playerdata, {playerID: i}, true)[0];
            self.spelerlogspelernaam = temp.spelerNaam;
            var temp1 = $filter('filter')(temp.matches, {season: self.match.seizoen}, true)[0];
            var player = $filter('filter')(temp1.match, {matchID: self.match.matchID}, true)[0];
            if (player) {
                self.spelerlog = player.player_log;
                self.spelercijfers = player.scores;
            } else {
                self.spelerlog = -1;
            }
        };

        $rootScope.infoSaveLog = '';
        self.savePlayerLog = function () {
            $rootScope.infoSaveLog = '';
            if ($filter('filter')(self.team_data.team_data, {season: self.match.seizoen}, true)) {
                var exists = false;

                angular.forEach(self.playerdata, function (value, key) {
                    angular.forEach(self.spelerscores, function (value1, key1) {
                        if (value.playerID == value1.playerID) {
                            var temp1 = $filter('filter')(value.matches, {season: self.match.seizoen}, true)[0];
                            if (temp1) {
                                var player = $filter('filter')(temp1.match, {matchID: self.match.matchID}, true)[0];
                                if (player) {
                                    player.scores = value1.scores;
                                    exists = true;
                                } else {
                                    exists = false;
                                }
                            }
                        }
                    });
                });
                if (exists) {
                    Api.TeamDataItem.put({
                        _slug: self.team_data._id
                    }, {
                        player_data: self.playerdata,
                        date_edited: self.datetime
                    }, function (res) {
                        $rootScope.infoSaveLog = 'Opgeslagen';
                    });
                }
            }
        };

        self.matchlogtemp = '';
        $rootScope.infoAddMatchLog = '';
        self.addMatchLog = function () {
            var editor_name;
            if ($rootScope.currentUser.middle_name) {
                editor_name = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.middle_name + ' ' + $rootScope.currentUser.last_name;
            } else {
                editor_name = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.last_name;
            }

            $rootScope.infoAddMatchLog = '';
            if ($filter('filter')(self.team_data.team_data, {season: self.match.seizoen}, true)) {
                var logtemp = {};
                logtemp.pub_date = new Date();
                logtemp.author = editor_name;
                logtemp.text = self.matchlogtemp;
                if (self.teamdata) {
                    self.teamdata.match_log.push(logtemp);

                    Api.TeamDataItem.put({
                        _slug: self.team_data._id
                    }, {
                        team_data: self.team_data.team_data,
                        date_edited: self.datetime
                    }, function (res) {
                        $rootScope.infoAddMatchLog = 'Opgeslagen';
                    });
                }
            }
        };

        self.playerlogtemp = '';
        $rootScope.infoAddPlayerLog = '';
        self.addPlayerLog = function (i) {
            var editor_name;
            if ($rootScope.currentUser.middle_name) {
                editor_name = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.middle_name + ' ' + $rootScope.currentUser.last_name;
            } else {
                editor_name = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.last_name;
            }

            $rootScope.infoAddPlayerLog = '';
            if ($filter('filter')(self.team_data.team_data, {season: self.match.seizoen}, true)) {
                var logtemp = {};
                logtemp.pub_date = new Date();
                logtemp.author = editor_name;
                logtemp.text = self.playerlogtemp;
                self.spelerlog.push(logtemp);

                var exists = false;
                angular.forEach(self.playerdata, function (value, key) {
                    if (value.playerID == i) {
                        var temp1 = $filter('filter')(value.matches, {season: self.match.seizoen}, true)[0];
                        if (temp1) {
                            var player = $filter('filter')(temp1.match, {matchID: self.match.matchID}, true)[0];
                            if (player) {
                                player.spelerlog = self.spelerlog;
                                exists = true;
                            } else {
                                exists = false;
                            }
                        }
                    }
                });
                if (exists) {
                    Api.TeamDataItem.put({
                        _slug: self.team_data._id
                    }, {
                        player_data: self.playerdata,
                        date_edited: self.datetime
                    }, function (res) {
                        $rootScope.infoAddPlayerLog = 'Opgeslagen';
                    });
                }
            }
        };
    }]);