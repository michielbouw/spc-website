angular.module('mainapp.match')
    .controller('mainapp.match.MatchSingleModulesController', ['$scope', '$filter', 'Api', 'AuthenticationService', '$location',
        '$rootScope', '$routeParams', '$sessionStorage', '$timeout',
        function($scope, $filter, Api, AuthenticationService, $location, $rootScope, $routeParams, $sessionStorage, $timeout)
    {
        var self = this;
        self.datetime = new Date();

        if (!$routeParams.slug || $routeParams.slug === '' || $routeParams.slug === null) {
            $location.path('/wedstrijd/' + $routeParams._id + '/wedstrijd');
        }

        self.matchshort = {};
        self.match = {};

        self.loading = true;
        self.loading_slug = $routeParams.slug || '';

        self.loading_id = $routeParams._id;

        self.go = function (path) {
            $location.path(path);
        };

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
                            $sessionStorage.currentUser = res1.data;

                            $sessionStorage.currentClub = {};
                            $sessionStorage.currentClub.name = res1.data.club;
                            $sessionStorage.currentClub.slug = res1.data.club_slug;
                            $sessionStorage.currentClub.teams = res1.data.teams;
                            $sessionStorage.currentClub.colors = [];

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

            if (self.loading_slug === 'team') {
                self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_helft1);
                self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);
                self.match.locatie_doelpogingen_thuisTeam = [];
                self.match.locatie_doelpogingen_uitTeam = [];
                angular.forEach(self.match.locatie_doelpogingen.thuisTeam, function (value, key) {
                    if (self.match.locatie_doelpogingen_thuisTeam.length <= 0) {
                        self.match.locatie_doelpogingen_thuisTeam.push(value);
                    } else if (($filter('filter')(self.match.locatie_doelpogingen_thuisTeam, { personID: value.personID }, true)).length <= 0) {
                        self.match.locatie_doelpogingen_thuisTeam.push(value);
                    }
                });
                angular.forEach(self.match.locatie_doelpogingen.uitTeam, function (value, key) {
                    if (self.match.locatie_doelpogingen_uitTeam.length <= 0) {
                        self.match.locatie_doelpogingen_uitTeam.push(value);
                    } else if (($filter('filter')(self.match.locatie_doelpogingen_uitTeam, { personID: value.personID }, true)).length <= 0) {
                        self.match.locatie_doelpogingen_uitTeam.push(value);
                    }
                });

                self.match.locatie_overtredingen_filter = angular.copy(self.match.locatie_overtredingen);
                self.match.locatie_overtredingen_thuisTeam = [];
                self.match.locatie_overtredingen_uitTeam = [];
                angular.forEach(self.match.locatie_overtredingen.thuisTeam, function (value, key) {
                    if (self.match.locatie_overtredingen_thuisTeam.length <= 0) {
                        self.match.locatie_overtredingen_thuisTeam.push(value);
                    } else if (($filter('filter')(self.match.locatie_overtredingen_thuisTeam, { personID: value.personID }, true)).length <= 0) {
                        self.match.locatie_overtredingen_thuisTeam.push(value);
                    }
                });
                angular.forEach(self.match.locatie_overtredingen.uitTeam, function (value, key) {
                    if (self.match.locatie_overtredingen_uitTeam.length <= 0) {
                        self.match.locatie_overtredingen_uitTeam.push(value);
                    } else if (($filter('filter')(self.match.locatie_overtredingen_uitTeam, { personID: value.personID }, true)).length <= 0) {
                        self.match.locatie_overtredingen_uitTeam.push(value);
                    }
                });

                $timeout(function () {
                    self.showGraph1();
                    self.showGraph2();
                }, 500);
            }

            if (self.loading_slug === 'team' && self.match.penalty_visualisatie.length > 0 && self.match.penalty_visualisatie[0] !== -999) {
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
                if (self.loading_slug === 'spelers') {
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
                }
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
                if (self.loading_slug === 'spelers') {
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
                }
            });

            var teams;
            var teamslug;

            if ($sessionStorage.currentClub) {
                teams = $sessionStorage.currentClub.teams;
                teamslug = '';
                if (self.loading_slug === 'logboek' && teams && ( (teams[0] && teams[0].team_slug == self.match.thuisTeamSlug) || (teams[1] && teams[1].team_slug == self.match.thuisTeamSlug) )) {
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
                } else if (self.loading_slug === 'logboek' && teams && ( (teams[0] && teams[0].team_slug == self.match.uitTeamSlug) || (teams[1] && teams[1].team_slug == self.match.uitTeamSlug) )) {
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
                        $sessionStorage.currentUser = res1.data;

                        $sessionStorage.currentClub = {};
                        $sessionStorage.currentClub.name = res1.data.club;
                        $sessionStorage.currentClub.slug = res1.data.club_slug;
                        $sessionStorage.currentClub.teams = res1.data.teams;
                        $sessionStorage.currentClub.colors = [];

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
                        if (self.loading_slug === 'logboek' && teams && ( (teams[0] && teams[0].team_slug == self.match.thuisTeamSlug) || (teams[1] && teams[1].team_slug == self.match.thuisTeamSlug) )) {
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
                        } else if (self.loading_slug === 'logboek' && teams && ( (teams[0] && teams[0].team_slug == self.match.uitTeamSlug) || (teams[1] && teams[1].team_slug == self.match.uitTeamSlug) )) {
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
                    if (self.loading_slug === 'logboek' && teams && ( (teams[0] && teams[0].team_slug == self.match.thuisTeamSlug) || (teams[1] && teams[1].team_slug == self.match.thuisTeamSlug) )) {
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
                    } else if (self.loading_slug === 'logboek' && teams && ( (teams[0] && teams[0].team_slug == self.match.uitTeamSlug) || (teams[1] && teams[1].team_slug == self.match.uitTeamSlug) )) {
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

                if (self.loading_slug === 'team') {
                    self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_helft1);
                    self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);
                    self.match.locatie_doelpogingen_thuisTeam = [];
                    self.match.locatie_doelpogingen_uitTeam = [];
                    angular.forEach(self.match.locatie_doelpogingen.thuisTeam, function (value, key) {
                        if (self.match.locatie_doelpogingen_thuisTeam.length <= 0) {
                            self.match.locatie_doelpogingen_thuisTeam.push(value);
                        } else if (($filter('filter')(self.match.locatie_doelpogingen_thuisTeam, { personID: value.personID }, true)).length <= 0) {
                            self.match.locatie_doelpogingen_thuisTeam.push(value);
                        }
                    });
                    angular.forEach(self.match.locatie_doelpogingen.uitTeam, function (value, key) {
                        if (self.match.locatie_doelpogingen_uitTeam.length <= 0) {
                            self.match.locatie_doelpogingen_uitTeam.push(value);
                        } else if (($filter('filter')(self.match.locatie_doelpogingen_uitTeam, { personID: value.personID }, true)).length <= 0) {
                            self.match.locatie_doelpogingen_uitTeam.push(value);
                        }
                    });

                    self.match.locatie_overtredingen_filter = angular.copy(self.match.locatie_overtredingen);
                    self.match.locatie_overtredingen_thuisTeam = [];
                    self.match.locatie_overtredingen_uitTeam = [];
                    angular.forEach(self.match.locatie_overtredingen.thuisTeam, function (value, key) {
                        if (self.match.locatie_overtredingen_thuisTeam.length <= 0) {
                            self.match.locatie_overtredingen_thuisTeam.push(value);
                        } else if (($filter('filter')(self.match.locatie_overtredingen_thuisTeam, { personID: value.personID }, true)).length <= 0) {
                            self.match.locatie_overtredingen_thuisTeam.push(value);
                        }
                    });
                    angular.forEach(self.match.locatie_overtredingen.uitTeam, function (value, key) {
                        if (self.match.locatie_overtredingen_uitTeam.length <= 0) {
                            self.match.locatie_overtredingen_uitTeam.push(value);
                        } else if (($filter('filter')(self.match.locatie_overtredingen_uitTeam, { personID: value.personID }, true)).length <= 0) {
                            self.match.locatie_overtredingen_uitTeam.push(value);
                        }
                    });

                    $timeout(function () {
                        self.showGraph1();
                        self.showGraph2();
                    }, 500);
                }

                if (self.loading_slug === 'team' && self.match.penalty_visualisatie.length > 0 && self.match.penalty_visualisatie[0] !== -999) {
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
                    if (self.loading_slug === 'spelers') {
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
                    }
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
                    if (self.loading_slug === 'spelers') {
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
                    }
                });

                var teams;
                var teamslug;

                if ($sessionStorage.currentClub) {
                    teams = $sessionStorage.currentClub.teams;
                    teamslug = '';
                    if (self.loading_slug === 'logboek' && teams && ( (teams[0] && teams[0].team_slug == self.match.thuisTeamSlug) || (teams[1] && teams[1].team_slug == self.match.thuisTeamSlug) )) {
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
                    } else if (self.loading_slug === 'logboek' && teams && ( (teams[0] && teams[0].team_slug == self.match.uitTeamSlug) || (teams[1] && teams[1].team_slug == self.match.uitTeamSlug) )) {
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
                            $sessionStorage.currentUser = res1.data;

                            $sessionStorage.currentClub = {};
                            $sessionStorage.currentClub.name = res1.data.club;
                            $sessionStorage.currentClub.slug = res1.data.club_slug;
                            $sessionStorage.currentClub.teams = res1.data.teams;
                            $sessionStorage.currentClub.colors = [];

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
                            if (self.loading_slug === 'logboek' && teams && ( (teams[0] && teams[0].team_slug == self.match.thuisTeamSlug) || (teams[1] && teams[1].team_slug == self.match.thuisTeamSlug) )) {
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
                            } else if (self.loading_slug === 'logboek' && teams && ( (teams[0] && teams[0].team_slug == self.match.uitTeamSlug) || (teams[1] && teams[1].team_slug == self.match.uitTeamSlug) )) {
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
                        if (self.loading_slug === 'logboek' && teams && ( (teams[0] && teams[0].team_slug == self.match.thuisTeamSlug) || (teams[1] && teams[1].team_slug == self.match.thuisTeamSlug) )) {
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
                        } else if (self.loading_slug === 'logboek' && teams && ( (teams[0] && teams[0].team_slug == self.match.uitTeamSlug) || (teams[1] && teams[1].team_slug == self.match.uitTeamSlug) )) {
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


        // WEDSTRIJD
        self.splitTime = function(string) {
            if ( !isNaN( Number(string.split("'")[0]) ) ) {
                return Number(string.split("'")[0]);
            } else {
                return Number(string.split("+")[0]) + Number(string.split("+")[1].split("'")[0]);
            }
        };


        // TEAM

        // Avg positions
        var positions_uit = true;
        var positions_thuis = true;

        self.avg_positions_field_build = function () {
            if (self.loading_slug === 'team') {
                $timeout(function () {
                    if (self.loading === false) {
                        $timeout(function () {
                            $('.content#team').find('.avg_positions_field#avg_positions_field_hor_size #avg_positions_field').css({
                                'height': (($('.content#team').find('.avg_positions_field#avg_positions_field_hor_size').width() - 2) * 68 / 106).toFixed(0),
                                'width': ($('.content#team').find('.avg_positions_field#avg_positions_field_hor_size').width() - 2).toFixed(0)
                            });

                            var c = document.getElementById('avg_positions_field');
                            c.width = ($('.content#team').find('.avg_positions_field#avg_positions_field_hor_size').width() - 2).toFixed(0);
                            c.height = (($('.content#team').find('.avg_positions_field#avg_positions_field_hor_size').width() - 2) * 68 / 106).toFixed(0);
                            //var ctx = c.getContext("2d");

                            self.avg_positions_field_draw();
                            self.avg_positions_field_fill();
                        }, 500);
                    } else {
                        self.avg_positions_field_build();
                    }
                }, 2000);
            }
        };

        // Draws the soccer field
        self.avg_positions_field_draw = function () {
            var c = document.getElementById('avg_positions_field');
            var ctx = c.getContext("2d");
            ctx.clearRect(0,0,c.width,c.height);
            var x = c.width;
            var y = c.height;

            // How all the lines and circles are styled
            ctx.lineWidth = 1;
            //ctx.strokeStyle = "#848484";
            ctx.strokeStyle = "rgba(132,132,132, 0.5)";

            // Drawing middle white circles
            ctx.beginPath();
            ctx.arc(x / 2, y / 2, y*0.15, 0, 2 * Math.PI, false);
            ctx.moveTo(x / 2, y / 2);
            ctx.arc(x / 2, y / 2, 1, 0, 2 * Math.PI, false);

            // Drawing all outside lines
            ctx.moveTo(y*0.01, 0);
            ctx.lineTo(x - y*0.01, 0);
            ctx.moveTo(y*0.01, 0);
            ctx.lineTo(y*0.01, y);

            ctx.moveTo(x - y*0.01, y);
            ctx.lineTo(x - y*0.01, 0);
            ctx.moveTo(x - y*0.01, y);
            ctx.lineTo(y*0.01, y);

            // Drawing all other lines
            ctx.moveTo(x / 2, 0);
            ctx.lineTo(x / 2, y);

            ctx.moveTo(x - y*0.175, y / 2);
            ctx.arc(x - y*0.175, y / 2, 1, 0, 2 * Math.PI, false);
            ctx.moveTo(y*0.175, y / 2);
            ctx.arc(y*0.175, y / 2, 1, 0, 2 * Math.PI, false);
            ctx.moveTo(x - y*0.25, y / 2 + Math.sqrt(Math.pow(y*0.15, 2) - Math.pow(y*0.075, 2)));
            ctx.arc(x - y*0.175, y / 2, y*0.15, 0.33 * 0.5 * Math.PI + 0.5 * Math.PI, 1.5 * Math.PI - 0.33 * 0.5 * Math.PI, false);
            ctx.moveTo(y*0.25, y / 2 - Math.sqrt(Math.pow(y*0.15, 2) - Math.pow(y*0.075, 2)) );
            ctx.arc(y*0.175, y / 2, y*0.15, 0.33 * 0.5 * Math.PI + 1.5 * Math.PI, 2.5 * Math.PI - 0.33 * 0.5 * Math.PI, false);

            ctx.moveTo(y*0.01, 0);
            ctx.arc(y*0.01, 0, y*0.015, 2 * Math.PI, 2.5 * Math.PI, false);
            ctx.moveTo(x - y*0.01, 0);
            ctx.arc(x - y*0.01, 0, y*0.015, 0.5 * Math.PI, Math.PI, false);
            ctx.moveTo(y*0.01, y);
            ctx.arc(y*0.01, y, y*0.015, 1.5 * Math.PI, 2 * Math.PI, false);
            ctx.moveTo(x - y*0.01, y);
            ctx.arc(x - y*0.01, y, y*0.015, Math.PI, 1.5 * Math.PI, false);

            ctx.moveTo(x - y*0.01, y*0.45);
            ctx.lineTo(x, y*0.45);
            ctx.lineTo(x, y*0.55);
            ctx.lineTo(x - y*0.01, y*0.55);
            ctx.moveTo(y*0.01, y*0.45);
            ctx.lineTo(0, y*0.45);
            ctx.lineTo(0, y*0.55);
            ctx.lineTo(y*0.01, y*0.55);

            ctx.moveTo(x - y*0.01, y*0.4);
            ctx.lineTo(x - y*0.08, y*0.4);
            ctx.lineTo(x - y*0.08, y*0.6);
            ctx.lineTo(x - y*0.01, y*0.6);
            ctx.moveTo(y*0.01, y*0.4);
            ctx.lineTo(y*0.08, y*0.4);
            ctx.lineTo(y*0.08, y*0.6);
            ctx.lineTo(y*0.01, y*0.6);

            ctx.moveTo(x - y*0.01, y*0.25);
            ctx.lineTo(x - y*0.25, y*0.25);
            ctx.lineTo(x - y*0.25, y*0.75);
            ctx.lineTo(x - y*0.01, y*0.75);
            ctx.moveTo(y*0.01, y*0.25);
            ctx.lineTo(y*0.25, y*0.25);
            ctx.lineTo(y*0.25, y*0.75);
            ctx.lineTo(y*0.01, y*0.75);

            ctx.stroke();
            ctx.closePath();
        };

        self.avg_positions_field_fill = function () {
            var c = document.getElementById('avg_positions_field');
            var ctx = c.getContext("2d");

            var polygon = function (ctx, x, y, radius, sides, startAngle, anticlockwise) {
                if (sides < 3) return;
                var a = (Math.PI * 2)/sides;
                a = anticlockwise?-a:a;
                ctx.save();
                ctx.translate(x,y);
                ctx.rotate(startAngle);
                ctx.moveTo(radius,0);
                for (var i = 1; i < sides; i++) {
                    ctx.lineTo(radius*Math.cos(a*i),radius*Math.sin(a*i));
                }
                ctx.closePath();
                ctx.restore();
            };

            //var clear = function () {
            //    ctx.clearRect(0,0,c.width,c.height);
            //};

            c.onmousemove = function(e) {
                self.avg_positions_field_draw();

                // important: correct mouse position:
                var x = e.clientX,
                    y = e.clientY,
                    r;

                angular.forEach(self.match.gemiddelde_posities, function (value, key) {
                    drawPosition(value.breedte, value.lengte, value.personID, value.spelerNaam, value.rugnummer, value.teamNaam);

                    //r = angular.copy(value);
                    //r.breedte /= 100;
                    //r.lengte /= 100;
                    //
                    //if (r.teamNaam === self.matchshort.match_info.thuis_kort) {
                    //    r.breedte = c.height * r.breedte;
                    //    r.lengte = c.width * r.lengte;
                    //
                    //    ctx.beginPath();
                    //    polygon(ctx, r.lengte, r.breedte, 8, 6, -Math.PI/2);
                    //
                    //    // check if we hover it, fill other
                    //    if (r.personID == id) {
                    //        ctx.fillStyle = "rgba(3,125,201,1)";
                    //        ctx.strokeStyle = "rgba(3,125,201,1)";
                    //        ctx.fill();
                    //        ctx.stroke();
                    //
                    //        // Drawing number
                    //        ctx.fillStyle    = '#fff';
                    //        ctx.font         = 'Bold 9px "Open Sans", Helvetica, Verdana, sans-serif';
                    //        ctx.textAlign    = 'center';
                    //        ctx.textBaseline = 'middle';
                    //        ctx.fillText(r.rugnummer, r.lengte, r.breedte);
                    //
                    //        $('.content#team').find('#positionsveld .positions_players p.thuis#' + r.personID).css({
                    //            'color': 'rgba(3,125,201,1)'
                    //        });
                    //    } else {
                    //        ctx.fillStyle = "rgba(3,125,201,0.4)";
                    //        ctx.strokeStyle = "rgba(3,125,201,0.4)";
                    //        ctx.fill();
                    //        ctx.stroke();
                    //
                    //        // Drawing number
                    //        ctx.fillStyle    = 'rgba(3,125,201,1)';
                    //        ctx.font         = 'Bold 9px "Open Sans", Helvetica, Verdana, sans-serif';
                    //        ctx.textAlign    = 'center';
                    //        ctx.textBaseline = 'middle';
                    //        ctx.fillText(r.rugnummer, r.lengte, r.breedte);
                    //    }
                    //
                    //    ctx.closePath();
                    //} else if (r.teamNaam === self.matchshort.match_info.uit_kort) {
                    //    r.breedte = c.height * (1 - r.breedte);
                    //    r.lengte = c.width * (1 - r.lengte);
                    //
                    //    ctx.beginPath();
                    //    polygon(ctx, r.lengte, r.breedte, 8, 6, -Math.PI/2);
                    //
                    //    // check if we hover it, fill other
                    //    if (r.personID == id) {
                    //        ctx.fillStyle = "rgba(236,117,0,1)";
                    //        ctx.strokeStyle = "rgba(236,117,0,1)";
                    //        ctx.fill();
                    //        ctx.stroke();
                    //
                    //        // Drawing number
                    //        ctx.fillStyle    = '#fff';
                    //        ctx.font         = 'Bold 9px "Open Sans", Helvetica, Verdana, sans-serif';
                    //        ctx.textAlign    = 'center';
                    //        ctx.textBaseline = 'middle';
                    //        ctx.fillText(r.rugnummer, r.lengte, r.breedte);
                    //
                    //        $('.content#team').find('#positionsveld .positions_players p.uit#' + r.personID).css({
                    //            'color': 'rgba(236,117,0,1)'
                    //        });
                    //    } else {
                    //        ctx.fillStyle = "rgba(236,117,0,0.4)";
                    //        ctx.strokeStyle = "rgba(236,117,0,0.4)";
                    //        ctx.fill();
                    //        ctx.stroke();
                    //
                    //        // Drawing number
                    //        ctx.fillStyle    = 'rgba(236,117,0,1)';
                    //        ctx.font         = 'Bold 9px "Open Sans", Helvetica, Verdana, sans-serif';
                    //        ctx.textAlign    = 'center';
                    //        ctx.textBaseline = 'middle';
                    //        ctx.fillText(r.rugnummer, r.lengte, r.breedte);
                    //    }
                    //
                    //    ctx.closePath();
                    //}
                });
            };

            // Draws the soccer field
            var drawPosition = function (bre, len, id, naam, nummer, team) {
                // change x and y from percentage to value of heigth and width of canvas
                bre /= 100;
                len /= 100;

                if (team === self.matchshort.match_info.thuis_kort) {
                    bre = c.height * bre;
                    len = c.width * len;

                    ctx.fillStyle = "rgba(3,125,201,0.4)"; // blue thuis
                    ctx.strokeStyle = "rgba(3,125,201,0.4)"; // blue thuis

                    // Drawing circle
                    ctx.beginPath();
                    polygon(ctx, len, bre, 8, 6, -Math.PI/2);
                    ctx.fill();
                    ctx.stroke();

                    // Drawing number
                    ctx.fillStyle    = 'rgba(3,125,201,1)';
                    ctx.font         = 'Bold 9px "Open Sans", Helvetica, Verdana, sans-serif';
                    ctx.textAlign    = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(nummer, len, bre);

                    //URL of spelerfoto
                    //if ($filter('filter')(self.speler_profiel_thuis, {spelerID: id}, true) && $filter('filter')(self.speler_profiel_thuis, {spelerID: id}, true)[0].spelerPhoto) {
                    //    var photo = $filter('filter')(self.speler_profiel_thuis, {spelerID: id}, true)[0].spelerPhoto;
                    //}

                    ctx.closePath();
                } else if (team === self.matchshort.match_info.uit_kort) {
                    bre = c.height * (1 - bre);
                    len = c.width * (1 - len);

                    ctx.fillStyle = "rgba(236,117,0,0.4)"; // orange uit
                    ctx.strokeStyle = "rgba(236,117,0,0.4)"; // orange uit

                    // Drawing circle
                    ctx.beginPath();
                    polygon(ctx, len, bre, 8, 6, -Math.PI/2);
                    ctx.fill();
                    ctx.stroke();

                    // Drawing number
                    ctx.fillStyle    = 'rgba(236,117,0,1)';
                    ctx.font         = 'Bold 9px "Open Sans", Helvetica, Verdana, sans-serif';
                    ctx.textAlign    = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(nummer, len, bre);

                    //URL of spelerfoto
                    //if ($filter('filter')(self.speler_profiel_uit, {spelerID: id}, true) && $filter('filter')(self.speler_profiel_uit, {spelerID: id}, true)[0].spelerPhoto) {
                    //    var photo = $filter('filter')(self.speler_profiel_uit, {spelerID: id}, true)[0].spelerPhoto
                    //}

                    ctx.closePath();
                }
            };

            angular.forEach(self.match.gemiddelde_posities, function (value, key) {
                drawPosition(value.breedte, value.lengte, value.personID, value.spelerNaam, value.rugnummer, value.teamNaam);
            });
        };

        self.positions_field_interval = function (interval) {
            self.positions_field_interval_play = false;
            if (interval === '00 - 15 min') { self.positions_field_interval_var = '00 - 15 min'; self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier1); }
            else if (interval === '15 - 30 min') { self.positions_field_interval_var = '15 - 30 min'; self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier2); }
            else if (interval === '30 - 45 min') { self.positions_field_interval_var = '30 - 45 min'; self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier3); }
            else if (interval === '45 - 60 min') { self.positions_field_interval_var = '45 - 60 min'; self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier4); }
            else if (interval === '60 - 75 min') { self.positions_field_interval_var = '60 - 75 min'; self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier5); }
            else if (interval === '75 - 90 min') { self.positions_field_interval_var = '75 - 90 min'; self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier6); }
            else if (interval === '1e helft') { self.positions_field_interval_var = '1e helft'; self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_helft1); }
            else if (interval === '2e helft') { self.positions_field_interval_var = '2e helft'; self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_helft2); }
            else if (interval === 'play') {
                self.positions_field_interval_play = true;
                self.positions_field_interval_var = '00 - 15 min'; self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier1);
                if (document.getElementById('avg_positions_field')) {
                    if (!positions_thuis) { self.match.gemiddelde_posities = angular.copy($filter('filter')(self.match.gemiddelde_posities, {teamNaam: self.matchshort.match_info.uit_kort})); positions_uit = true;
                    } else if (!positions_uit) { self.match.gemiddelde_posities = angular.copy($filter('filter')(self.match.gemiddelde_posities, {teamNaam: self.matchshort.match_info.thuis_kort})); positions_thuis = true; }

                    self.avg_positions_field_draw();
                    self.avg_positions_field_fill();

                    $timeout(function () {
                        self.positions_field_interval_var = '15 - 30 min'; self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier2);
                        if (!positions_thuis) { self.match.gemiddelde_posities = angular.copy($filter('filter')(self.match.gemiddelde_posities, {teamNaam: self.matchshort.match_info.uit_kort})); positions_uit = true;
                        } else if (!positions_uit) { self.match.gemiddelde_posities = angular.copy($filter('filter')(self.match.gemiddelde_posities, {teamNaam: self.matchshort.match_info.thuis_kort})); positions_thuis = true; }

                        self.avg_positions_field_draw();
                        self.avg_positions_field_fill();

                        $timeout(function () {
                            self.positions_field_interval_var = '30 - 45 min'; self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier3);
                            if (!positions_thuis) { self.match.gemiddelde_posities = angular.copy($filter('filter')(self.match.gemiddelde_posities, {teamNaam: self.matchshort.match_info.uit_kort})); positions_uit = true;
                            } else if (!positions_uit) { self.match.gemiddelde_posities = angular.copy($filter('filter')(self.match.gemiddelde_posities, {teamNaam: self.matchshort.match_info.thuis_kort})); positions_thuis = true; }

                            self.avg_positions_field_draw();
                            self.avg_positions_field_fill();

                            $timeout(function () {
                                self.positions_field_interval_var = '45 - 60 min'; self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier4);
                                if (!positions_thuis) { self.match.gemiddelde_posities = angular.copy($filter('filter')(self.match.gemiddelde_posities, {teamNaam: self.matchshort.match_info.uit_kort})); positions_uit = true;
                                } else if (!positions_uit) { self.match.gemiddelde_posities = angular.copy($filter('filter')(self.match.gemiddelde_posities, {teamNaam: self.matchshort.match_info.thuis_kort})); positions_thuis = true; }

                                self.avg_positions_field_draw();
                                self.avg_positions_field_fill();

                                $timeout(function () {
                                    self.positions_field_interval_var = '60 - 75 min'; self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier5);
                                    if (!positions_thuis) { self.match.gemiddelde_posities = angular.copy($filter('filter')(self.match.gemiddelde_posities, {teamNaam: self.matchshort.match_info.uit_kort})); positions_uit = true;
                                    } else if (!positions_uit) { self.match.gemiddelde_posities = angular.copy($filter('filter')(self.match.gemiddelde_posities, {teamNaam: self.matchshort.match_info.thuis_kort})); positions_thuis = true; }

                                    self.avg_positions_field_draw();
                                    self.avg_positions_field_fill();

                                    $timeout(function () {
                                        self.positions_field_interval_var = '75 - 90 min'; self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier6);
                                        if (!positions_thuis) { self.match.gemiddelde_posities = angular.copy($filter('filter')(self.match.gemiddelde_posities, {teamNaam: self.matchshort.match_info.uit_kort})); positions_uit = true;
                                        } else if (!positions_uit) { self.match.gemiddelde_posities = angular.copy($filter('filter')(self.match.gemiddelde_posities, {teamNaam: self.matchshort.match_info.thuis_kort})); positions_thuis = true; }

                                        self.avg_positions_field_draw();
                                        self.avg_positions_field_fill();

                                        $timeout(function () {
                                            self.positions_field_interval_var = '00 - 15 min'; self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier1);
                                            self.positions_field_interval_play = false;
                                        }, 1000);
                                    }, 1000);
                                }, 1000);
                            }, 1000);
                        }, 1000);
                    }, 1000);
                } else {
                    self.positions_field_interval_play = false;
                }
            }

            if (!positions_thuis) {
                self.match.gemiddelde_posities = angular.copy($filter('filter')(self.match.gemiddelde_posities, {teamNaam: self.matchshort.match_info.uit_kort}));
                positions_uit = true;
            } else if (!positions_uit) {
                self.match.gemiddelde_posities = angular.copy($filter('filter')(self.match.gemiddelde_posities, {teamNaam: self.matchshort.match_info.thuis_kort}));
                positions_thuis = true;
            } else {
                positions_uit = true;
                positions_thuis = true;
            }

            if (document.getElementById('avg_positions_field')) {
                self.avg_positions_field_draw();
                self.avg_positions_field_fill();
            }
        };
        self.positions_field_interval('1e helft');
        self.positions_field_interval_var = '1e helft';

        self.selectpositions_player = function (id) {
            var c = document.getElementById('avg_positions_field');
            var ctx = c.getContext("2d");

            var polygon = function (ctx, x, y, radius, sides, startAngle, anticlockwise) {
                if (sides < 3) return;
                var a = (Math.PI * 2)/sides;
                a = anticlockwise?-a:a;
                ctx.save();
                ctx.translate(x,y);
                ctx.rotate(startAngle);
                ctx.moveTo(radius,0);
                for (var i = 1; i < sides; i++) {
                    ctx.lineTo(radius*Math.cos(a*i),radius*Math.sin(a*i));
                }
                ctx.closePath();
                ctx.restore();
            };

            //var clear = function () {
            //    ctx.clearRect(0,0,c.width,c.height);
            //};

            self.avg_positions_field_draw();

            var r;

            angular.forEach(self.match.gemiddelde_posities, function (value, key) {
                r = angular.copy(value);
                r.breedte /= 100;
                r.lengte /= 100;

                if (r.teamNaam === self.matchshort.match_info.thuis_kort) {
                    r.breedte = c.height * r.breedte;
                    r.lengte = c.width * r.lengte;

                    ctx.beginPath();
                    polygon(ctx, r.lengte, r.breedte, 8, 6, -Math.PI/2);

                    // check if we hover it, fill other
                    if (r.personID == id) {
                        ctx.fillStyle = "rgba(3,125,201,1)";
                        ctx.strokeStyle = "rgba(3,125,201,1)";
                        ctx.fill();
                        ctx.stroke();

                        // Drawing number
                        ctx.fillStyle    = '#fff';
                        ctx.font         = 'Bold 9px "Open Sans", Helvetica, Verdana, sans-serif';
                        ctx.textAlign    = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(r.rugnummer, r.lengte, r.breedte);

                        $('.content#team').find('#positionsveld .positions_players p.thuis#' + r.personID).css({
                            'color': 'rgba(3,125,201,1)'
                        });
                    } else {
                        ctx.fillStyle = "rgba(3,125,201,0.4)";
                        ctx.strokeStyle = "rgba(3,125,201,0.4)";
                        ctx.fill();
                        ctx.stroke();

                        // Drawing number
                        ctx.fillStyle    = 'rgba(3,125,201,1)';
                        ctx.font         = 'Bold 9px "Open Sans", Helvetica, Verdana, sans-serif';
                        ctx.textAlign    = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(r.rugnummer, r.lengte, r.breedte);
                    }

                    ctx.closePath();
                } else if (r.teamNaam === self.matchshort.match_info.uit_kort) {
                    r.breedte = c.height * (1 - r.breedte);
                    r.lengte = c.width * (1 - r.lengte);

                    ctx.beginPath();
                    polygon(ctx, r.lengte, r.breedte, 8, 6, -Math.PI/2);

                    // check if we hover it, fill other
                    if (r.personID == id) {
                        ctx.fillStyle = "rgba(236,117,0,1)";
                        ctx.strokeStyle = "rgba(236,117,0,1)";
                        ctx.fill();
                        ctx.stroke();

                        // Drawing number
                        ctx.fillStyle    = '#fff';
                        ctx.font         = 'Bold 9px "Open Sans", Helvetica, Verdana, sans-serif';
                        ctx.textAlign    = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(r.rugnummer, r.lengte, r.breedte);

                        $('.content#team').find('#positionsveld .positions_players p.uit#' + r.personID).css({
                            'color': 'rgba(236,117,0,1)'
                        });
                    } else {
                        ctx.fillStyle = "rgba(236,117,0,0.4)";
                        ctx.strokeStyle = "rgba(236,117,0,0.4)";
                        ctx.fill();
                        ctx.stroke();

                        // Drawing number
                        ctx.fillStyle    = 'rgba(236,117,0,1)';
                        ctx.font         = 'Bold 9px "Open Sans", Helvetica, Verdana, sans-serif';
                        ctx.textAlign    = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(r.rugnummer, r.lengte, r.breedte);
                    }

                    ctx.closePath();
                }
            });
        };

        self.resetpositions_player = function () {
            $('.content#team').find('#positionsveld .positions_players p.thuis').css({
                'color': 'rgba(3,125,201,0.4)'
            });
            $('.content#team').find('#positionsveld .positions_players p.uit').css({
                'color': 'rgba(236,117,0,0.4)'
            });
        };

        self.selectpositions_uit = function () {
            if (!positions_uit) {
                self.chartbalbezit.show('data2');

                if (self.positions_field_interval_var === '00 - 15 min') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier1); }
                else if (self.positions_field_interval_var === '15 - 30 min') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier2); }
                else if (self.positions_field_interval_var === '30 - 45 min') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier3); }
                else if (self.positions_field_interval_var === '45 - 60 min') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier4); }
                else if (self.positions_field_interval_var === '60 - 75 min') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier5); }
                else if (self.positions_field_interval_var === '75 - 90 min') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier6); }
                else if (self.positions_field_interval_var === '1e helft') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_helft1); }
                else if (self.positions_field_interval_var === '2e helft') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_helft2); }

                if (!positions_thuis) {
                    self.match.gemiddelde_posities = angular.copy($filter('filter')(self.match.gemiddelde_posities, {teamNaam: self.matchshort.match_info.uit_kort}));
                }

                positions_uit = true;
            } else {
                self.chartbalbezit.hide('data1');

                self.match.gemiddelde_posities = angular.copy($filter('filter')(self.match.gemiddelde_posities, {teamNaam: self.matchshort.match_info.uit_kort}));
                positions_thuis = false;
            }
            self.avg_positions_field_draw();
            self.avg_positions_field_fill();
        };
        self.selectpositions_thuis = function () {
            if (!positions_thuis) {
                self.chartbalbezit.show('data1');

                if (self.positions_field_interval_var === '00 - 15 min') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier1); }
                else if (self.positions_field_interval_var === '15 - 30 min') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier2); }
                else if (self.positions_field_interval_var === '30 - 45 min') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier3); }
                else if (self.positions_field_interval_var === '45 - 60 min') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier4); }
                else if (self.positions_field_interval_var === '60 - 75 min') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier5); }
                else if (self.positions_field_interval_var === '75 - 90 min') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier6); }
                else if (self.positions_field_interval_var === '1e helft') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_helft1); }
                else if (self.positions_field_interval_var === '2e helft') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_helft2); }

                if (!positions_uit) {
                    self.match.gemiddelde_posities = angular.copy($filter('filter')(self.match.gemiddelde_posities, {teamNaam: self.matchshort.match_info.thuis_kort}));
                }

                positions_thuis = true;
            } else {
                self.chartbalbezit.hide('data2');

                self.match.gemiddelde_posities = angular.copy($filter('filter')(self.match.gemiddelde_posities, {teamNaam: self.matchshort.match_info.thuis_kort}));
                positions_uit = false;
            }
            self.avg_positions_field_draw();
            self.avg_positions_field_fill();
        };
        self.avg_positions_field_build();

        /*$scope.position_field_interval = '1e helft';

        $scope.$watch('position_field_interval', function () {
            if ($scope.position_field_interval === '00 - 15 min') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier1); }
            else if ($scope.position_field_interval === '15 - 30 min') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier2); }
            else if ($scope.position_field_interval === '30 - 45 min') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier3); }
            else if ($scope.position_field_interval === '45 - 60 min') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier4); }
            else if ($scope.position_field_interval === '60 - 75 min') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier5); }
            else if ($scope.position_field_interval === '75 - 90 min') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier6); }
            else if ($scope.position_field_interval === '1e helft') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_helft1); }
            else if ($scope.position_field_interval === '2e helft') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_helft2); }

            selectpositions_uit = true;
            selectpositions_thuis = true;
        });

        var selectpositions_uit = true;
        var selectpositions_thuis = true;
        self.select_positions_uit = function () {
            if (!selectpositions_uit) {
                if ($scope.position_field_interval === '00 - 15 min') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier1); }
                else if ($scope.position_field_interval === '15 - 30 min') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier2); }
                else if ($scope.position_field_interval === '30 - 45 min') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier3); }
                else if ($scope.position_field_interval === '45 - 60 min') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier4); }
                else if ($scope.position_field_interval === '60 - 75 min') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier5); }
                else if ($scope.position_field_interval === '75 - 90 min') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier6); }
                else if ($scope.position_field_interval === '1e helft') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_helft1); }
                else if ($scope.position_field_interval === '2e helft') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_helft2); }

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
                if ($scope.position_field_interval === '00 - 15 min') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier1); }
                else if ($scope.position_field_interval === '15 - 30 min') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier2); }
                else if ($scope.position_field_interval === '30 - 45 min') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier3); }
                else if ($scope.position_field_interval === '45 - 60 min') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier4); }
                else if ($scope.position_field_interval === '60 - 75 min') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier5); }
                else if ($scope.position_field_interval === '75 - 90 min') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_kwartier6); }
                else if ($scope.position_field_interval === '1e helft') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_helft1); }
                else if ($scope.position_field_interval === '2e helft') { self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_helft2); }

                if (!selectpositions_uit) {
                    self.match.gemiddelde_posities = angular.copy($filter('filter')(self.match.gemiddelde_posities, {teamNaam: self.matchshort.match_info.thuis_kort}));
                }

                selectpositions_thuis = true;
            } else {
                self.match.gemiddelde_posities = angular.copy($filter('filter')(self.match.gemiddelde_posities, {teamNaam: self.matchshort.match_info.thuis_kort}));
                selectpositions_uit = false;
            }
        };*/

        // Balbezit chart
        //self.balbezit1_show = true;
        //self.balbezit2_show = false;
        self.chartbalbezit1 = null;
        self.showGraph1 = function() {
            if (self.loading_slug === 'team') {
                self.chartbalbezit1 = c3.generate({
                    bindto: '#chart_balbezit1',
                    size: { height: 160 },
                    //padding: { right: 15, left: 15 },
                    data: {
                        xs: { 'data1': 'x', 'data2': 'x' },
                        columns: [
                            ['x', '7.5', '22.5', '37.5', '52.5', '67.5', '82.5', '90'],
                            ['data1', self.match.balbezit.thuis.kwartier_1, self.match.balbezit.thuis.kwartier_2, self.match.balbezit.thuis.kwartier_3, self.match.balbezit.thuis.kwartier_4, self.match.balbezit.thuis.kwartier_5, self.match.balbezit.thuis.kwartier_6],
                            ['data2', self.match.balbezit.uit.kwartier_1, self.match.balbezit.uit.kwartier_2, self.match.balbezit.uit.kwartier_3, self.match.balbezit.uit.kwartier_4, self.match.balbezit.uit.kwartier_5, self.match.balbezit.uit.kwartier_6]
                        ],
                        axes: { data1: 'y', data2: 'y' },
                        names: {
                            data1: 'Balbezit ' + self.matchshort.match_info.thuis,
                            data2: 'Balbezit ' + self.matchshort.match_info.uit
                        },
                        types: { data1: 'bar', data2: 'bar' },
                        groups: [
                            ['data1', 'data2']
                        ]
                    },
                    color: { pattern: ['#037dc9', '#ec7500'] },
                    point: { show: false },
                    axis: {
                        y: {
                            padding: {top: 1, bottom: 1},
                            min: 2,
                            max: 98,
                            show: false
                        },
                        x: {
                            //min: 0,
                            //max: 90,
                            //tick: {
                            //    format: function (d) { return d + '\''; }
                            //},
                            tick: {
                                count: 6
                            },
                            show: false
                        }
                    },
                    bar: {
                        width: {
                            ratio: 1 // this makes bar width 100% of length between ticks
                        }
                    },
                    grid: {
                        x: {
                            lines: [{value: 0, text: '0\''}, {value: 15, text: '15\''}, {value: 30, text: '30\''}, {value: 45, text: '45\''}, {value: 60, text: '60\''}, {value: 75, text: '75\''}, {value: 90, text: '90\''}]
                        },
                        y: {
                            lines: [{value: 50, text: '50%', position: 'start'}]
                        }
                    },
                    tooltip: {
                        format: {
                            title: function (d) { return (d - 7.5) + '\' - ' + (d + 7.5) + '\''; },
                            value: function (value) {
                                var format = function (d) { return d + '%'; };
                                return format(value);
                            }
                        }
                    },
                    legend: {
                        show: false
                    }
                });
            }
        };
        //self.chartbalbezit2 = null;
        //self.showGraph2 = function() {
        //    if (self.loading_slug === 'team') {
        //        self.chartbalbezit2 = c3.generate({
        //            bindto: '#chart_balbezit2',
        //            size: { height: 160 },
        //            //padding: { right: 15, left: 15 },
        //            data: {
        //                xs: { 'data1': 'x', 'data2': 'x' },
        //                columns: [
        //                    ['x', '0', '15', '30', '45', '60', '75', '90'],
        //                    ['data1', '50', self.match.balbezit.thuis.kwartier_1, self.match.balbezit.thuis.kwartier_2, self.match.balbezit.thuis.kwartier_3, self.match.balbezit.thuis.kwartier_4, self.match.balbezit.thuis.kwartier_5, self.match.balbezit.thuis.kwartier_6],
        //                    ['data2', '50', self.match.balbezit.uit.kwartier_1, self.match.balbezit.uit.kwartier_2, self.match.balbezit.uit.kwartier_3, self.match.balbezit.uit.kwartier_4, self.match.balbezit.uit.kwartier_5, self.match.balbezit.uit.kwartier_6]
        //                ],
        //                axes: { data1: 'y', data2: 'y' },
        //                names: {
        //                    data1: 'Balbezit ' + self.matchshort.match_info.thuis,
        //                    data2: 'Balbezit ' + self.matchshort.match_info.uit
        //                },
        //                types: { data1: 'area', data2: 'area' }
        //            },
        //            color: { pattern: ['#037dc9', '#ec7500'] },
        //            point: { show: false },
        //            axis: {
        //                y: {
        //                    padding: {top: 0, bottom: 0},
        //                    min: 0,
        //                    max: 100,
        //                    show: false
        //                },
        //                x: {
        //                    min: -2,
        //                    max: 92,
        //                    //tick: {
        //                    //    format: function (d) { return d + '\''; }
        //                    //},
        //                    show: false
        //                }
        //            },
        //            grid: {
        //                x: {
        //                    lines: [{value: 0, text: '0\''}, {value: 15, text: '15\''}, {value: 30, text: '30\''}, {value: 45, text: '45\''}, {value: 60, text: '60\''}, {value: 75, text: '75\''}, {value: 90, text: '90\''}]
        //                },
        //                y: {
        //                    lines: [{value: 50, text: '50%', position: 'start'}]
        //                }
        //            },
        //            tooltip: {
        //                format: {
        //                    title: function (d) { return d + '\''; },
        //                    value: function (value) {
        //                        var format = function (d) { return d + '%'; };
        //                        return format(value);
        //                    }
        //                }
        //            },
        //            legend: {
        //                show: false
        //            }
        //        });
        //    }
        //};


        // Doelpogingen
        var doelpogingen_uit = true;
        var doelpogingen_thuis = true;
        var doelpogingen_doelpunt = true;
        var doelpogingen_opdoel = true;
        var doelpogingen_nietdoel = true;
        self.doelpogingen_doelpunt = true;
        self.doelpogingen_opdoel = true;
        self.doelpogingen_nietdoel = true;

        self.doelpogingen_field_build = function () {
            if (self.loading_slug === 'team') {
                $timeout(function () {
                    if (self.loading === false) {
                        $timeout(function () {
                            $('.content#team').find('.doelpogingen_field#doelpogingen_field_hor_size #doelpogingen_field').css({
                                'height': (($('.content#team').find('.doelpogingen_field#doelpogingen_field_hor_size').width() - 2) * 68 / 106).toFixed(0),
                                'width': ($('.content#team').find('.doelpogingen_field#doelpogingen_field_hor_size').width() - 2).toFixed(0)
                            });

                            var c = document.getElementById('doelpogingen_field');
                            c.width = ($('.content#team').find('.doelpogingen_field#doelpogingen_field_hor_size').width() - 2).toFixed(0);
                            c.height = (($('.content#team').find('.doelpogingen_field#doelpogingen_field_hor_size').width() - 2) * 68 / 106).toFixed(0);
                            //var ctx = c.getContext("2d");

                            self.doelpogingen_field_draw();
                            self.doelpogingen_field_fill();
                        }, 500);
                    } else {
                        self.doelpogingen_field_build();
                    }
                }, 2000);
            }
        };

        // Draws the soccer field
        self.doelpogingen_field_draw = function () {
            var c = document.getElementById('doelpogingen_field');
            var ctx = c.getContext("2d");
            ctx.clearRect(0,0,c.width,c.height);
            var x = c.width;
            var y = c.height;

            // How all the lines and circles are styled
            ctx.lineWidth = 1;
            //ctx.strokeStyle = "#848484";
            ctx.strokeStyle = "rgba(132,132,132, 0.5)";

            // Drawing middle white circles
            ctx.beginPath();
            ctx.arc(x / 2, y / 2, y*0.15, 0, 2 * Math.PI, false);
            ctx.moveTo(x / 2, y / 2);
            ctx.arc(x / 2, y / 2, 1, 0, 2 * Math.PI, false);

            // Drawing all outside lines
            ctx.moveTo(y*0.01, 0);
            ctx.lineTo(x - y*0.01, 0);
            ctx.moveTo(y*0.01, 0);
            ctx.lineTo(y*0.01, y);

            ctx.moveTo(x - y*0.01, y);
            ctx.lineTo(x - y*0.01, 0);
            ctx.moveTo(x - y*0.01, y);
            ctx.lineTo(y*0.01, y);

            // Drawing all other lines
            ctx.moveTo(x / 2, 0);
            ctx.lineTo(x / 2, y);

            ctx.moveTo(x - y*0.175, y / 2);
            ctx.arc(x - y*0.175, y / 2, 1, 0, 2 * Math.PI, false);
            ctx.moveTo(y*0.175, y / 2);
            ctx.arc(y*0.175, y / 2, 1, 0, 2 * Math.PI, false);
            ctx.moveTo(x - y*0.25, y / 2 + Math.sqrt(Math.pow(y*0.15, 2) - Math.pow(y*0.075, 2)));
            ctx.arc(x - y*0.175, y / 2, y*0.15, 0.33 * 0.5 * Math.PI + 0.5 * Math.PI, 1.5 * Math.PI - 0.33 * 0.5 * Math.PI, false);
            ctx.moveTo(y*0.25, y / 2 - Math.sqrt(Math.pow(y*0.15, 2) - Math.pow(y*0.075, 2)) );
            ctx.arc(y*0.175, y / 2, y*0.15, 0.33 * 0.5 * Math.PI + 1.5 * Math.PI, 2.5 * Math.PI - 0.33 * 0.5 * Math.PI, false);

            ctx.moveTo(y*0.01, 0);
            ctx.arc(y*0.01, 0, y*0.015, 2 * Math.PI, 2.5 * Math.PI, false);
            ctx.moveTo(x - y*0.01, 0);
            ctx.arc(x - y*0.01, 0, y*0.015, 0.5 * Math.PI, Math.PI, false);
            ctx.moveTo(y*0.01, y);
            ctx.arc(y*0.01, y, y*0.015, 1.5 * Math.PI, 2 * Math.PI, false);
            ctx.moveTo(x - y*0.01, y);
            ctx.arc(x - y*0.01, y, y*0.015, Math.PI, 1.5 * Math.PI, false);

            ctx.moveTo(x - y*0.01, y*0.45);
            ctx.lineTo(x, y*0.45);
            ctx.lineTo(x, y*0.55);
            ctx.lineTo(x - y*0.01, y*0.55);
            ctx.moveTo(y*0.01, y*0.45);
            ctx.lineTo(0, y*0.45);
            ctx.lineTo(0, y*0.55);
            ctx.lineTo(y*0.01, y*0.55);

            ctx.moveTo(x - y*0.01, y*0.4);
            ctx.lineTo(x - y*0.08, y*0.4);
            ctx.lineTo(x - y*0.08, y*0.6);
            ctx.lineTo(x - y*0.01, y*0.6);
            ctx.moveTo(y*0.01, y*0.4);
            ctx.lineTo(y*0.08, y*0.4);
            ctx.lineTo(y*0.08, y*0.6);
            ctx.lineTo(y*0.01, y*0.6);

            ctx.moveTo(x - y*0.01, y*0.25);
            ctx.lineTo(x - y*0.25, y*0.25);
            ctx.lineTo(x - y*0.25, y*0.75);
            ctx.lineTo(x - y*0.01, y*0.75);
            ctx.moveTo(y*0.01, y*0.25);
            ctx.lineTo(y*0.25, y*0.25);
            ctx.lineTo(y*0.25, y*0.75);
            ctx.lineTo(y*0.01, y*0.75);

            ctx.stroke();
            ctx.closePath();
        };

        self.doelpogingen_field_fill = function () {
            var c = document.getElementById('doelpogingen_field');
            var ctx = c.getContext("2d");

            var polygon = function (ctx, x, y, radius, sides, startAngle, anticlockwise) {
                if (sides < 3) return;
                var a = (Math.PI * 2)/sides;
                a = anticlockwise?-a:a;
                ctx.save();
                ctx.translate(x,y);
                ctx.rotate(startAngle);
                ctx.moveTo(radius,0);
                for (var i = 1; i < sides; i++) {
                    ctx.lineTo(radius*Math.cos(a*i),radius*Math.sin(a*i));
                }
                ctx.closePath();
                ctx.restore();
            };

            //var clear = function () {
            //    ctx.clearRect(0,0,c.width,c.height);
            //};

            c.onmousemove = function(e) {
                self.doelpogingen_field_draw();

                // important: correct mouse position:
                //var x = e.clientX,
                //    y = e.clientY,
                //    r;
                //
                //angular.forEach(self.match.locatie_doelpogingen_filter.thuisTeam, function (value, key) {
                //    //drawPosition(value.breedte, value.lengte, value.personID, value.spelerNaam, value.rugnummer, value.teamNaam);
                //
                //    r = angular.copy(value);
                //    r.breedte = r.locationInFieldWidth / 100;
                //    r.lengte = r.locationInFieldLength / 100;
                //
                //    r.breedte = c.height * (1 - r.breedte);
                //    r.lengte = c.width * (1 - r.lengte);
                //
                //    ctx.beginPath();
                //    polygon(ctx, r.lengte, r.breedte, 5, 6, -Math.PI/2);
                //
                //    // check if we hover it, fill other
                //    if (ctx.isPointInPath(x, y)) {
                //        ctx.fillStyle = "rgba(3,125,201,1)";
                //        ctx.strokeStyle = "rgba(3,125,201,1)";
                //        ctx.fill();
                //        ctx.stroke();
                //    } else {
                //        ctx.fillStyle = "rgba(3,125,201,0.5)";
                //        ctx.strokeStyle = "rgba(3,125,201,0.5)";
                //        ctx.fill();
                //        ctx.stroke();
                //    }
                //
                //    ctx.closePath();
                //});
                //angular.forEach(self.match.locatie_doelpogingen_filter.uitTeam, function (value, key) {
                //    //drawPosition(value.breedte, value.lengte, value.personID, value.spelerNaam, value.rugnummer, value.teamNaam);
                //
                //    r = angular.copy(value);
                //    r.breedte = r.locationInFieldWidth / 100;
                //    r.lengte = r.locationInFieldLength / 100;
                //
                //    r.breedte = c.height * r.breedte;
                //    r.lengte = c.width * r.lengte;
                //
                //    ctx.beginPath();
                //    polygon(ctx, r.lengte, r.breedte, 5, 6, -Math.PI/2);
                //
                //    // check if we hover it, fill other
                //    if (ctx.isPointInPath(x, y)) {
                //        ctx.fillStyle = "rgba(236,117,0,1)";
                //        ctx.strokeStyle = "rgba(236,117,0,1)";
                //        ctx.fill();
                //        ctx.stroke();
                //    } else {
                //        ctx.fillStyle = "rgba(236,117,0,0.5)";
                //        ctx.strokeStyle = "rgba(236,117,0,0.5)";
                //        ctx.fill();
                //        ctx.stroke();
                //    }
                //
                //    ctx.closePath();
                //});
                angular.forEach(self.match.locatie_doelpogingen_filter.thuisTeam, function (value, key) {
                    drawPosition(value.locationInFieldWidth, value.locationInFieldLength, value.personID, value.spelerNaam, value.rugnummer, value.lichaamsdeel, value.minuut_tot_string, value.type, true);
                });
                angular.forEach(self.match.locatie_doelpogingen_filter.uitTeam, function (value, key) {
                    drawPosition(value.locationInFieldWidth, value.locationInFieldLength, value.personID, value.spelerNaam, value.rugnummer, value.lichaamsdeel, value.minuut_tot_string, value.type, false);
                });
            };

            // Draws the soccer field
            var drawPosition = function (bre, len, id, naam, nummer, lich, min, type, thuisteam) {
                // change x and y from percentage to value of heigth and width of canvas
                bre /= 100;
                len /= 100;

                if (thuisteam) {
                    bre = c.height * (1 - bre);
                    len = c.width * (1 - len);

                    ctx.fillStyle = "rgba(3,125,201,0.4)"; // blue thuis
                    ctx.strokeStyle = "rgba(3,125,201,0.4)"; // blue thuis

                    // Drawing circle
                    ctx.beginPath();
                    polygon(ctx, len, bre, 5, 6, -Math.PI/2);
                    ctx.fill();
                    ctx.stroke();

                    // Drawing number


                    //URL of spelerfoto
                    //if ($filter('filter')(self.speler_profiel_thuis, {spelerID: id}, true) && $filter('filter')(self.speler_profiel_thuis, {spelerID: id}, true)[0].spelerPhoto) {
                    //    var photo = $filter('filter')(self.speler_profiel_thuis, {spelerID: id}, true)[0].spelerPhoto;
                    //}

                    ctx.closePath();
                } else if (!thuisteam) {
                    bre = c.height * bre;
                    len = c.width * len;

                    ctx.fillStyle = "rgba(236,117,0,0.4)"; // orange uit
                    ctx.strokeStyle = "rgba(236,117,0,0.4)"; // orange uit

                    // Drawing circle
                    ctx.beginPath();
                    polygon(ctx, len, bre, 5, 6, -Math.PI/2);
                    ctx.fill();
                    ctx.stroke();

                    // Drawing number


                    //URL of spelerfoto
                    //if ($filter('filter')(self.speler_profiel_uit, {spelerID: id}, true) && $filter('filter')(self.speler_profiel_uit, {spelerID: id}, true)[0].spelerPhoto) {
                    //    var photo = $filter('filter')(self.speler_profiel_uit, {spelerID: id}, true)[0].spelerPhoto
                    //}

                    ctx.closePath();
                }
            };

            angular.forEach(self.match.locatie_doelpogingen_filter.thuisTeam, function (value, key) {
                drawPosition(value.locationInFieldWidth, value.locationInFieldLength, value.personID, value.spelerNaam, value.rugnummer, value.lichaamsdeel, value.minuut_tot_string, value.type, true);
            });
            angular.forEach(self.match.locatie_doelpogingen_filter.uitTeam, function (value, key) {
                drawPosition(value.locationInFieldWidth, value.locationInFieldLength, value.personID, value.spelerNaam, value.rugnummer, value.lichaamsdeel, value.minuut_tot_string, value.type, false);
            });
        };

        self.selectdoelpogingen_player = function (id, min) {
            var c = document.getElementById('doelpogingen_field');
            var ctx = c.getContext("2d");

            var polygon = function (ctx, x, y, radius, sides, startAngle, anticlockwise) {
                if (sides < 3) return;
                var a = (Math.PI * 2)/sides;
                a = anticlockwise?-a:a;
                ctx.save();
                ctx.translate(x,y);
                ctx.rotate(startAngle);
                ctx.moveTo(radius,0);
                for (var i = 1; i < sides; i++) {
                    ctx.lineTo(radius*Math.cos(a*i),radius*Math.sin(a*i));
                }
                ctx.closePath();
                ctx.restore();
            };

            //var clear = function () {
            //    ctx.clearRect(0,0,c.width,c.height);
            //};

            self.doelpogingen_field_draw();

            var r;

            angular.forEach(self.match.locatie_doelpogingen_filter.thuisTeam, function (value, key) {
                r = angular.copy(value);
                r.breedte = r.locationInFieldWidth / 100;
                r.lengte = r.locationInFieldLength / 100;

                r.breedte = c.height * (1 - r.breedte);
                r.lengte = c.width * (1 - r.lengte);

                ctx.beginPath();
                polygon(ctx, r.lengte, r.breedte, 5, 6, -Math.PI/2);

                // check if we hover it, fill other
                if (min && r.minuut_tot_string === min && r.personID == id) {
                    ctx.fillStyle = "rgba(3,125,201,1)";
                    ctx.strokeStyle = "rgba(3,125,201,1)";
                    ctx.fill();
                    ctx.stroke();

                    $('.content#team').find('#locatiedoelpogingen .positions_players p.thuis#' + r.personID).css({
                        'color': 'rgba(3,125,201,1)'
                    });
                } else if (!min && r.personID == id) {
                    ctx.fillStyle = "rgba(3,125,201,1)";
                    ctx.strokeStyle = "rgba(3,125,201,1)";
                    ctx.fill();
                    ctx.stroke();

                    $('.content#team').find('#locatiedoelpogingen .positions_players p.thuis#' + r.personID).css({
                        'color': 'rgba(3,125,201,1)'
                    });
                } else {
                    ctx.fillStyle = "rgba(3,125,201,0.4)";
                    ctx.strokeStyle = "rgba(3,125,201,0.4)";
                    ctx.fill();
                    ctx.stroke();
                }

                ctx.closePath();
            });
            angular.forEach(self.match.locatie_doelpogingen_filter.uitTeam, function (value, key) {
                r = angular.copy(value);
                r.breedte = r.locationInFieldWidth / 100;
                r.lengte = r.locationInFieldLength / 100;

                r.breedte = c.height * r.breedte;
                r.lengte = c.width * r.lengte;

                ctx.beginPath();
                polygon(ctx, r.lengte, r.breedte, 5, 6, -Math.PI/2);

                // check if we hover it, fill other
                if (min && r.minuut_tot_string === min && r.personID == id) {
                    ctx.fillStyle = "rgba(236,117,0,1)";
                    ctx.strokeStyle = "rgba(236,117,0,1)";
                    ctx.fill();
                    ctx.stroke();

                    $('.content#team').find('#locatiedoelpogingen .positions_players p.uit#' + r.personID).css({
                        'color': 'rgba(236,117,0,1)'
                    });
                } else if (!min && r.personID == id) {
                    ctx.fillStyle = "rgba(236,117,0,1)";
                    ctx.strokeStyle = "rgba(236,117,0,1)";
                    ctx.fill();
                    ctx.stroke();

                    $('.content#team').find('#locatiedoelpogingen .positions_players p.uit#' + r.personID).css({
                        'color': 'rgba(236,117,0,1)'
                    });
                } else {
                    ctx.fillStyle = "rgba(236,117,0,0.4)";
                    ctx.strokeStyle = "rgba(236,117,0,0.4)";
                    ctx.fill();
                    ctx.stroke();
                }

                ctx.closePath();
            });
        };

        self.resetdoelpogingen_player = function () {
            $('.content#team').find('#locatiedoelpogingen .positions_players p.thuis').css({
                'color': 'rgba(3,125,201,0.4)'
            });
            $('.content#team').find('#locatiedoelpogingen .positions_players p.uit').css({
                'color': 'rgba(236,117,0,0.4)'
            });
        };

        self.selectdoelpogingen_uit = function () {
            if (!doelpogingen_uit) {
                self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);
                doelpogingen_uit = true;
            } else {
                self.match.locatie_doelpogingen_filter.thuisTeam = [];
                doelpogingen_thuis = false;
            }
            self.doelpogingen_field_draw();
            self.doelpogingen_field_fill();
        };
        self.selectdoelpogingen_thuis = function () {
            if (!doelpogingen_thuis) {
                self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);
                doelpogingen_thuis = true;
            } else {
                self.match.locatie_doelpogingen_filter.uitTeam = [];
                doelpogingen_uit = false;
            }
            self.doelpogingen_field_draw();
            self.doelpogingen_field_fill();
        };
        self.selectdoelpogingen_doelpunt = function () {
            if (!doelpogingen_thuis) {
                if (!doelpogingen_doelpunt) {
                    self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);
                    self.match.locatie_doelpogingen_filter.thuisTeam = [];
                    doelpogingen_doelpunt = true;
                    doelpogingen_opdoel = true;
                    doelpogingen_nietdoel = true;
                    self.doelpogingen_doelpunt = true;
                    self.doelpogingen_opdoel = true;
                    self.doelpogingen_nietdoel = true;
                } else {
                    self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);
                    self.match.locatie_doelpogingen_filter.uitTeam = angular.copy($filter('filter')(self.match.locatie_doelpogingen_filter.uitTeam, {type: 'Doelpunt'}));
                    self.match.locatie_doelpogingen_filter.thuisTeam = [];
                    doelpogingen_doelpunt = false;
                    self.doelpogingen_doelpunt = false;
                    doelpogingen_opdoel = true;
                    doelpogingen_nietdoel = true;
                    self.doelpogingen_opdoel = true;
                    self.doelpogingen_nietdoel = true;
                }
            } else if (!doelpogingen_uit) {
                if (!doelpogingen_doelpunt) {
                    self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);
                    self.match.locatie_doelpogingen_filter.uitTeam = [];
                    doelpogingen_doelpunt = true;
                    doelpogingen_opdoel = true;
                    doelpogingen_nietdoel = true;
                    self.doelpogingen_doelpunt = true;
                    self.doelpogingen_opdoel = true;
                    self.doelpogingen_nietdoel = true;
                } else {
                    self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);
                    self.match.locatie_doelpogingen_filter.thuisTeam = angular.copy($filter('filter')(self.match.locatie_doelpogingen_filter.thuisTeam, {type: 'Doelpunt'}));
                    self.match.locatie_doelpogingen_filter.uitTeam = [];
                    doelpogingen_doelpunt = false;
                    self.doelpogingen_doelpunt = false;
                    doelpogingen_opdoel = true;
                    doelpogingen_nietdoel = true;
                    self.doelpogingen_opdoel = true;
                    self.doelpogingen_nietdoel = true;
                }
            } else {
                if (!doelpogingen_doelpunt) {
                    self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);
                    doelpogingen_doelpunt = true;
                    doelpogingen_opdoel = true;
                    doelpogingen_nietdoel = true;
                    self.doelpogingen_doelpunt = true;
                    self.doelpogingen_opdoel = true;
                    self.doelpogingen_nietdoel = true;
                } else {
                    self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);
                    self.match.locatie_doelpogingen_filter.thuisTeam = angular.copy($filter('filter')(self.match.locatie_doelpogingen_filter.thuisTeam, {type: 'Doelpunt'}));
                    self.match.locatie_doelpogingen_filter.uitTeam = angular.copy($filter('filter')(self.match.locatie_doelpogingen_filter.uitTeam, {type: 'Doelpunt'}));
                    doelpogingen_doelpunt = false;
                    self.doelpogingen_doelpunt = false;
                    doelpogingen_opdoel = true;
                    doelpogingen_nietdoel = true;
                    self.doelpogingen_opdoel = true;
                    self.doelpogingen_nietdoel = true;
                }
            }
            self.doelpogingen_field_draw();
            self.doelpogingen_field_fill();
        };
        self.selectdoelpogingen_opdoel = function () {
            if (!doelpogingen_thuis) {
                if (!doelpogingen_opdoel) {
                    self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);
                    self.match.locatie_doelpogingen_filter.thuisTeam = [];
                    doelpogingen_doelpunt = true;
                    doelpogingen_opdoel = true;
                    doelpogingen_nietdoel = true;
                    self.doelpogingen_doelpunt = true;
                    self.doelpogingen_opdoel = true;
                    self.doelpogingen_nietdoel = true;
                } else {
                    self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);
                    self.match.locatie_doelpogingen_filter.uitTeam = angular.copy($filter('filter')(self.match.locatie_doelpogingen_filter.uitTeam, {type: 'Redding'}));
                    self.match.locatie_doelpogingen_filter.thuisTeam = [];
                    doelpogingen_opdoel = false;
                    self.doelpogingen_opdoel = false;
                    doelpogingen_doelpunt = true;
                    doelpogingen_nietdoel = true;
                    self.doelpogingen_doelpunt = true;
                    self.doelpogingen_nietdoel = true;
                }
            } else if (!doelpogingen_uit) {
                if (!doelpogingen_opdoel) {
                    self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);
                    self.match.locatie_doelpogingen_filter.uitTeam = [];
                    doelpogingen_doelpunt = true;
                    doelpogingen_opdoel = true;
                    doelpogingen_nietdoel = true;
                    self.doelpogingen_doelpunt = true;
                    self.doelpogingen_opdoel = true;
                    self.doelpogingen_nietdoel = true;
                } else {
                    self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);
                    self.match.locatie_doelpogingen_filter.thuisTeam = angular.copy($filter('filter')(self.match.locatie_doelpogingen_filter.thuisTeam, {type: 'Redding'}));
                    self.match.locatie_doelpogingen_filter.uitTeam = [];
                    doelpogingen_opdoel = false;
                    self.doelpogingen_opdoel = false;
                    doelpogingen_doelpunt = true;
                    doelpogingen_nietdoel = true;
                    self.doelpogingen_doelpunt = true;
                    self.doelpogingen_nietdoel = true;
                }
            } else {
                if (!doelpogingen_opdoel) {
                    self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);
                    doelpogingen_doelpunt = true;
                    doelpogingen_opdoel = true;
                    doelpogingen_nietdoel = true;
                    self.doelpogingen_doelpunt = true;
                    self.doelpogingen_opdoel = true;
                    self.doelpogingen_nietdoel = true;
                } else {
                    self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);
                    self.match.locatie_doelpogingen_filter.thuisTeam = angular.copy($filter('filter')(self.match.locatie_doelpogingen_filter.thuisTeam, {type: 'Redding'}));
                    self.match.locatie_doelpogingen_filter.uitTeam = angular.copy($filter('filter')(self.match.locatie_doelpogingen_filter.uitTeam, {type: 'Redding'}));
                    doelpogingen_opdoel = false;
                    self.doelpogingen_opdoel = false;
                    doelpogingen_doelpunt = true;
                    doelpogingen_nietdoel = true;
                    self.doelpogingen_doelpunt = true;
                    self.doelpogingen_nietdoel = true;
                }
            }
            self.doelpogingen_field_draw();
            self.doelpogingen_field_fill();
        };
        self.selectdoelpogingen_nietdoel = function () {
            if (!doelpogingen_thuis) {
                if (!doelpogingen_nietdoel) {
                    self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);
                    self.match.locatie_doelpogingen_filter.thuisTeam = [];
                    doelpogingen_doelpunt = true;
                    doelpogingen_opdoel = true;
                    doelpogingen_nietdoel = true;
                    self.doelpogingen_doelpunt = true;
                    self.doelpogingen_opdoel = true;
                    self.doelpogingen_nietdoel = true;
                } else {
                    self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);
                    self.match.locatie_doelpogingen_filter.uitTeam = angular.copy($filter('filter')(self.match.locatie_doelpogingen_filter.uitTeam, {type: 'Naast of over'}));
                    self.match.locatie_doelpogingen_filter.thuisTeam = [];
                    doelpogingen_nietdoel = false;
                    self.doelpogingen_nietdoel = false;
                    doelpogingen_doelpunt = true;
                    doelpogingen_opdoel = true;
                    self.doelpogingen_doelpunt = true;
                    self.doelpogingen_opdoel = true;
                }
            } else if (!doelpogingen_uit) {
                if (!doelpogingen_nietdoel) {
                    self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);
                    self.match.locatie_doelpogingen_filter.uitTeam = [];
                    doelpogingen_doelpunt = true;
                    doelpogingen_opdoel = true;
                    doelpogingen_nietdoel = true;
                    self.doelpogingen_doelpunt = true;
                    self.doelpogingen_opdoel = true;
                    self.doelpogingen_nietdoel = true;
                } else {
                    self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);
                    self.match.locatie_doelpogingen_filter.thuisTeam = angular.copy($filter('filter')(self.match.locatie_doelpogingen_filter.thuisTeam, {type: 'Naast of over'}));
                    self.match.locatie_doelpogingen_filter.uitTeam = [];
                    doelpogingen_nietdoel = false;
                    self.doelpogingen_nietdoel = false;
                    doelpogingen_doelpunt = true;
                    doelpogingen_opdoel = true;
                    self.doelpogingen_doelpunt = true;
                    self.doelpogingen_opdoel = true;
                }
            } else {
                if (!doelpogingen_nietdoel) {
                    self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);
                    doelpogingen_doelpunt = true;
                    doelpogingen_opdoel = true;
                    doelpogingen_nietdoel = true;
                    self.doelpogingen_doelpunt = true;
                    self.doelpogingen_opdoel = true;
                    self.doelpogingen_nietdoel = true;
                } else {
                    self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);
                    self.match.locatie_doelpogingen_filter.thuisTeam = angular.copy($filter('filter')(self.match.locatie_doelpogingen_filter.thuisTeam, {type: 'Naast of over'}));
                    self.match.locatie_doelpogingen_filter.uitTeam = angular.copy($filter('filter')(self.match.locatie_doelpogingen_filter.uitTeam, {type: 'Naast of over'}));
                    doelpogingen_nietdoel = false;
                    self.doelpogingen_nietdoel = false;
                    doelpogingen_doelpunt = true;
                    doelpogingen_opdoel = true;
                    self.doelpogingen_doelpunt = true;
                    self.doelpogingen_opdoel = true;
                }
            }
            self.doelpogingen_field_draw();
            self.doelpogingen_field_fill();
        };
        self.doelpogingen_field_build();

        /*
        //var selectpogingen_uit = true;
        //var selectpogingen_thuis = true;
        var selectpogingen_thuis_doel = true;
        var selectpogingen_uit_doel = true;
        var selectpogingen_thuis_target = true;
        var selectpogingen_uit_target = true;
        //self.select_pogingen_uit = function () {
        //    if (!selectpogingen_uit) {
        //        self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);
        //        selectpogingen_uit = true;
        //    } else {
        //        self.match.locatie_doelpogingen_filter.thuisTeam = [];
        //        selectpogingen_thuis = false;
        //    }
        //};
        //self.select_pogingen_thuis = function () {
        //    if (!selectpogingen_thuis) {
        //        self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);
        //        selectpogingen_thuis = true;
        //    } else {
        //        self.match.locatie_doelpogingen_filter.uitTeam = [];
        //        selectpogingen_uit = false;
        //    }
        //};
        self.select_pogingen_thuis_doel = function () {
            if (!selectpogingen_thuis_doel) {
                self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);

                selectpogingen_thuis_doel = true;
            } else {
                if (!selectpogingen_thuis_target) {
                    self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);
                    self.match.locatie_doelpogingen_filter.thuisTeam = angular.copy($filter('filter')(self.match.locatie_doelpogingen_filter.thuisTeam, {type: 'Doelpunt'}));
                } else {
                    self.match.locatie_doelpogingen_filter.thuisTeam = angular.copy($filter('filter')(self.match.locatie_doelpogingen_filter.thuisTeam, {type: 'Doelpunt'}));
                }
                selectpogingen_thuis_doel = false;
            }
        };
        self.select_pogingen_thuis_target = function () {
            if (!selectpogingen_thuis_target) {
                self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);

                selectpogingen_thuis_target = true;
            } else {
                if (!selectpogingen_thuis_doel) {
                    self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);
                    self.match.locatie_doelpogingen_filter.thuisTeam = angular.copy($filter('filter')(self.match.locatie_doelpogingen_filter.thuisTeam, {type: 'Redding'}));
                } else {
                    self.match.locatie_doelpogingen_filter.thuisTeam = angular.copy($filter('filter')(self.match.locatie_doelpogingen_filter.thuisTeam, {type: 'Redding'}));
                }
                selectpogingen_thuis_target = false;
            }
        };
        self.select_pogingen_uit_doel = function () {
            if (!selectpogingen_uit_doel) {
                self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);

                selectpogingen_uit_doel = true;
            } else {
                if (!selectpogingen_uit_target) {
                    self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);
                    self.match.locatie_doelpogingen_filter.uitTeam = angular.copy($filter('filter')(self.match.locatie_doelpogingen_filter.uitTeam, {type: 'Doelpunt'}));
                } else {
                    self.match.locatie_doelpogingen_filter.uitTeam = angular.copy($filter('filter')(self.match.locatie_doelpogingen_filter.uitTeam, {type: 'Doelpunt'}));
                }
                selectpogingen_uit_doel = false;
            }
        };
        self.select_pogingen_uit_target = function () {
            if (!selectpogingen_uit_target) {
                self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);

                selectpogingen_uit_target = true;
            } else {
                if (!selectpogingen_uit_doel) {
                    self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);
                    self.match.locatie_doelpogingen_filter.uitTeam = angular.copy($filter('filter')(self.match.locatie_doelpogingen_filter.uitTeam, {type: 'Redding'}));
                } else {
                    self.match.locatie_doelpogingen_filter.uitTeam = angular.copy($filter('filter')(self.match.locatie_doelpogingen_filter.uitTeam, {type: 'Redding'}));
                }
                selectpogingen_uit_target = false;
            }
        };*/

        // Heatmaps
        self.heatmap_thuis_show = true;
        self.heatmap_uit_show = true;
        self.heatmap_1e_helft_show = true;
        self.heatmap_2e_helft_show = false;

        // Heatmaps
        self.passes_per_zone_kort_show = true;
        self.passes_per_zone_middellang_show = false;
        self.passes_per_zone_lang_show = false;

        // Overtredingen
        self.overtredingen_table_show = false;
        var overtredingen_uit = true;
        var overtredingen_thuis = true;

        self.overtredingen_field_build = function () {
            if (self.loading_slug === 'team') {
                $timeout(function () {
                    if (self.loading === false) {
                        $timeout(function () {
                            $('.content#team').find('.overtredingen_field#overtredingen_field_hor_size #overtredingen_field').css({
                                'height': (($('.content#team').find('.overtredingen_field#overtredingen_field_hor_size').width() - 2) * 68 / 106).toFixed(0),
                                'width': ($('.content#team').find('.overtredingen_field#overtredingen_field_hor_size').width() - 2).toFixed(0)
                            });

                            var c = document.getElementById('overtredingen_field');
                            c.width = ($('.content#team').find('.overtredingen_field#overtredingen_field_hor_size').width() - 2).toFixed(0);
                            c.height = (($('.content#team').find('.overtredingen_field#overtredingen_field_hor_size').width() - 2) * 68 / 106).toFixed(0);
                            //var ctx = c.getContext("2d");

                            self.overtredingen_field_draw();
                            self.overtredingen_field_fill();
                        }, 500);
                    } else {
                        self.overtredingen_field_build();
                    }
                }, 2000);
            }
        };

        // Draws the soccer field
        self.overtredingen_field_draw = function () {
            var c = document.getElementById('overtredingen_field');
            var ctx = c.getContext("2d");
            ctx.clearRect(0,0,c.width,c.height);
            var x = c.width;
            var y = c.height;

            // How all the lines and circles are styled
            ctx.lineWidth = 1;
            //ctx.strokeStyle = "#848484";
            ctx.strokeStyle = "rgba(132,132,132, 0.5)";

            // Drawing middle white circles
            ctx.beginPath();
            ctx.arc(x / 2, y / 2, y*0.15, 0, 2 * Math.PI, false);
            ctx.moveTo(x / 2, y / 2);
            ctx.arc(x / 2, y / 2, 1, 0, 2 * Math.PI, false);

            // Drawing all outside lines
            ctx.moveTo(y*0.01, 0);
            ctx.lineTo(x - y*0.01, 0);
            ctx.moveTo(y*0.01, 0);
            ctx.lineTo(y*0.01, y);

            ctx.moveTo(x - y*0.01, y);
            ctx.lineTo(x - y*0.01, 0);
            ctx.moveTo(x - y*0.01, y);
            ctx.lineTo(y*0.01, y);

            // Drawing all other lines
            ctx.moveTo(x / 2, 0);
            ctx.lineTo(x / 2, y);

            ctx.moveTo(x - y*0.175, y / 2);
            ctx.arc(x - y*0.175, y / 2, 1, 0, 2 * Math.PI, false);
            ctx.moveTo(y*0.175, y / 2);
            ctx.arc(y*0.175, y / 2, 1, 0, 2 * Math.PI, false);
            ctx.moveTo(x - y*0.25, y / 2 + Math.sqrt(Math.pow(y*0.15, 2) - Math.pow(y*0.075, 2)));
            ctx.arc(x - y*0.175, y / 2, y*0.15, 0.33 * 0.5 * Math.PI + 0.5 * Math.PI, 1.5 * Math.PI - 0.33 * 0.5 * Math.PI, false);
            ctx.moveTo(y*0.25, y / 2 - Math.sqrt(Math.pow(y*0.15, 2) - Math.pow(y*0.075, 2)) );
            ctx.arc(y*0.175, y / 2, y*0.15, 0.33 * 0.5 * Math.PI + 1.5 * Math.PI, 2.5 * Math.PI - 0.33 * 0.5 * Math.PI, false);

            ctx.moveTo(y*0.01, 0);
            ctx.arc(y*0.01, 0, y*0.015, 2 * Math.PI, 2.5 * Math.PI, false);
            ctx.moveTo(x - y*0.01, 0);
            ctx.arc(x - y*0.01, 0, y*0.015, 0.5 * Math.PI, Math.PI, false);
            ctx.moveTo(y*0.01, y);
            ctx.arc(y*0.01, y, y*0.015, 1.5 * Math.PI, 2 * Math.PI, false);
            ctx.moveTo(x - y*0.01, y);
            ctx.arc(x - y*0.01, y, y*0.015, Math.PI, 1.5 * Math.PI, false);

            ctx.moveTo(x - y*0.01, y*0.45);
            ctx.lineTo(x, y*0.45);
            ctx.lineTo(x, y*0.55);
            ctx.lineTo(x - y*0.01, y*0.55);
            ctx.moveTo(y*0.01, y*0.45);
            ctx.lineTo(0, y*0.45);
            ctx.lineTo(0, y*0.55);
            ctx.lineTo(y*0.01, y*0.55);

            ctx.moveTo(x - y*0.01, y*0.4);
            ctx.lineTo(x - y*0.08, y*0.4);
            ctx.lineTo(x - y*0.08, y*0.6);
            ctx.lineTo(x - y*0.01, y*0.6);
            ctx.moveTo(y*0.01, y*0.4);
            ctx.lineTo(y*0.08, y*0.4);
            ctx.lineTo(y*0.08, y*0.6);
            ctx.lineTo(y*0.01, y*0.6);

            ctx.moveTo(x - y*0.01, y*0.25);
            ctx.lineTo(x - y*0.25, y*0.25);
            ctx.lineTo(x - y*0.25, y*0.75);
            ctx.lineTo(x - y*0.01, y*0.75);
            ctx.moveTo(y*0.01, y*0.25);
            ctx.lineTo(y*0.25, y*0.25);
            ctx.lineTo(y*0.25, y*0.75);
            ctx.lineTo(y*0.01, y*0.75);

            ctx.stroke();
            ctx.closePath();
        };

        self.overtredingen_field_fill = function () {
            var c = document.getElementById('overtredingen_field');
            var ctx = c.getContext("2d");

            var polygon = function (ctx, x, y, radius, sides, startAngle, anticlockwise) {
                if (sides < 3) return;
                var a = (Math.PI * 2)/sides;
                a = anticlockwise?-a:a;
                ctx.save();
                ctx.translate(x,y);
                ctx.rotate(startAngle);
                ctx.moveTo(radius,0);
                for (var i = 1; i < sides; i++) {
                    ctx.lineTo(radius*Math.cos(a*i),radius*Math.sin(a*i));
                }
                ctx.closePath();
                ctx.restore();
            };

            //var clear = function () {
            //    ctx.clearRect(0,0,c.width,c.height);
            //};

            c.onmousemove = function(e) {
                self.overtredingen_field_draw();

                // important: correct mouse position:
                //var x = e.clientX,
                //    y = e.clientY,
                //    r;
                //
                //angular.forEach(self.match.locatie_doelpogingen_filter.thuisTeam, function (value, key) {
                //    //drawPosition(value.breedte, value.lengte, value.personID, value.spelerNaam, value.rugnummer, value.teamNaam);
                //
                //    r = angular.copy(value);
                //    r.breedte = r.locationInFieldWidth / 100;
                //    r.lengte = r.locationInFieldLength / 100;
                //
                //    r.breedte = c.height * (1 - r.breedte);
                //    r.lengte = c.width * (1 - r.lengte);
                //
                //    ctx.beginPath();
                //    polygon(ctx, r.lengte, r.breedte, 5, 6, -Math.PI/2);
                //
                //    // check if we hover it, fill other
                //    if (ctx.isPointInPath(x, y)) {
                //        ctx.fillStyle = "rgba(3,125,201,1)";
                //        ctx.strokeStyle = "rgba(3,125,201,1)";
                //        ctx.fill();
                //        ctx.stroke();
                //    } else {
                //        ctx.fillStyle = "rgba(3,125,201,0.5)";
                //        ctx.strokeStyle = "rgba(3,125,201,0.5)";
                //        ctx.fill();
                //        ctx.stroke();
                //    }
                //
                //    ctx.closePath();
                //});
                //angular.forEach(self.match.locatie_doelpogingen_filter.uitTeam, function (value, key) {
                //    //drawPosition(value.breedte, value.lengte, value.personID, value.spelerNaam, value.rugnummer, value.teamNaam);
                //
                //    r = angular.copy(value);
                //    r.breedte = r.locationInFieldWidth / 100;
                //    r.lengte = r.locationInFieldLength / 100;
                //
                //    r.breedte = c.height * r.breedte;
                //    r.lengte = c.width * r.lengte;
                //
                //    ctx.beginPath();
                //    polygon(ctx, r.lengte, r.breedte, 5, 6, -Math.PI/2);
                //
                //    // check if we hover it, fill other
                //    if (ctx.isPointInPath(x, y)) {
                //        ctx.fillStyle = "rgba(236,117,0,1)";
                //        ctx.strokeStyle = "rgba(236,117,0,1)";
                //        ctx.fill();
                //        ctx.stroke();
                //    } else {
                //        ctx.fillStyle = "rgba(236,117,0,0.5)";
                //        ctx.strokeStyle = "rgba(236,117,0,0.5)";
                //        ctx.fill();
                //        ctx.stroke();
                //    }
                //
                //    ctx.closePath();
                //});
                angular.forEach(self.match.locatie_overtredingen_filter.thuisTeam, function (value, key) {
                    drawPosition(value.locationInFieldWidth, value.locationInFieldLength, value.personID, value.spelerNaam, value.rugnummer, value.minuut, true);
                });
                angular.forEach(self.match.locatie_overtredingen_filter.uitTeam, function (value, key) {
                    drawPosition(value.locationInFieldWidth, value.locationInFieldLength, value.personID, value.spelerNaam, value.rugnummer, value.minuut, false);
                });
            };

            // Draws the soccer field
            var drawPosition = function (bre, len, id, naam, nummer, min, thuisteam) {
                // change x and y from percentage to value of heigth and width of canvas
                bre /= 100;
                len /= 100;

                if (thuisteam) {
                    bre = c.height * bre;
                    len = c.width * len;

                    ctx.fillStyle = "rgba(3,125,201,0.4)"; // blue thuis
                    ctx.strokeStyle = "rgba(3,125,201,0.4)"; // blue thuis

                    // Drawing circle
                    ctx.beginPath();
                    polygon(ctx, len, bre, 5, 6, -Math.PI/2);
                    ctx.fill();
                    ctx.stroke();

                    // Drawing number


                    //URL of spelerfoto
                    //if ($filter('filter')(self.speler_profiel_thuis, {spelerID: id}, true) && $filter('filter')(self.speler_profiel_thuis, {spelerID: id}, true)[0].spelerPhoto) {
                    //    var photo = $filter('filter')(self.speler_profiel_thuis, {spelerID: id}, true)[0].spelerPhoto;
                    //}

                    ctx.closePath();
                } else if (!thuisteam) {
                    bre = c.height * (1 - bre);
                    len = c.width * (1 - len);

                    ctx.fillStyle = "rgba(236,117,0,0.4)"; // orange uit
                    ctx.strokeStyle = "rgba(236,117,0,0.4)"; // orange uit

                    // Drawing circle
                    ctx.beginPath();
                    polygon(ctx, len, bre, 5, 6, -Math.PI/2);
                    ctx.fill();
                    ctx.stroke();

                    // Drawing number


                    //URL of spelerfoto
                    //if ($filter('filter')(self.speler_profiel_uit, {spelerID: id}, true) && $filter('filter')(self.speler_profiel_uit, {spelerID: id}, true)[0].spelerPhoto) {
                    //    var photo = $filter('filter')(self.speler_profiel_uit, {spelerID: id}, true)[0].spelerPhoto
                    //}

                    ctx.closePath();
                }
            };

            angular.forEach(self.match.locatie_overtredingen_filter.thuisTeam, function (value, key) {
                drawPosition(value.locationInFieldWidth, value.locationInFieldLength, value.personID, value.spelerNaam, value.rugnummer, value.minuut, true);
            });
            angular.forEach(self.match.locatie_overtredingen_filter.uitTeam, function (value, key) {
                drawPosition(value.locationInFieldWidth, value.locationInFieldLength, value.personID, value.spelerNaam, value.rugnummer, value.minuut, false);
            });
        };

        self.selectovertredingen_player = function (id, min) {
            var c = document.getElementById('overtredingen_field');
            var ctx = c.getContext("2d");

            var polygon = function (ctx, x, y, radius, sides, startAngle, anticlockwise) {
                if (sides < 3) return;
                var a = (Math.PI * 2)/sides;
                a = anticlockwise?-a:a;
                ctx.save();
                ctx.translate(x,y);
                ctx.rotate(startAngle);
                ctx.moveTo(radius,0);
                for (var i = 1; i < sides; i++) {
                    ctx.lineTo(radius*Math.cos(a*i),radius*Math.sin(a*i));
                }
                ctx.closePath();
                ctx.restore();
            };

            //var clear = function () {
            //    ctx.clearRect(0,0,c.width,c.height);
            //};

            self.overtredingen_field_draw();

            var r;

            angular.forEach(self.match.locatie_overtredingen_filter.thuisTeam, function (value, key) {
                r = angular.copy(value);
                r.breedte = r.locationInFieldWidth / 100;
                r.lengte = r.locationInFieldLength / 100;

                r.breedte = c.height * r.breedte;
                r.lengte = c.width * r.lengte;

                ctx.beginPath();
                polygon(ctx, r.lengte, r.breedte, 5, 6, -Math.PI/2);

                // check if we hover it, fill other
                if (min && r.minuut === min && r.personID == id) {
                    ctx.fillStyle = "rgba(3,125,201,1)";
                    ctx.strokeStyle = "rgba(3,125,201,1)";
                    ctx.fill();
                    ctx.stroke();

                    $('.content#team').find('#locatieovertredingen .positions_players p.thuis#' + r.personID).css({
                        'color': 'rgba(3,125,201,1)'
                    });
                } else if (!min && r.personID == id) {
                    ctx.fillStyle = "rgba(3,125,201,1)";
                    ctx.strokeStyle = "rgba(3,125,201,1)";
                    ctx.fill();
                    ctx.stroke();

                    $('.content#team').find('#locatieovertredingen .positions_players p.thuis#' + r.personID).css({
                        'color': 'rgba(3,125,201,1)'
                    });
                } else {
                    ctx.fillStyle = "rgba(3,125,201,0.4)";
                    ctx.strokeStyle = "rgba(3,125,201,0.4)";
                    ctx.fill();
                    ctx.stroke();
                }

                ctx.closePath();
            });
            angular.forEach(self.match.locatie_overtredingen_filter.uitTeam, function (value, key) {
                r = angular.copy(value);
                r.breedte = r.locationInFieldWidth / 100;
                r.lengte = r.locationInFieldLength / 100;

                r.breedte = c.height * (1 - r.breedte);
                r.lengte = c.width * (1 - r.lengte);

                ctx.beginPath();
                polygon(ctx, r.lengte, r.breedte, 5, 6, -Math.PI/2);

                // check if we hover it, fill other
                if (min && r.minuut === min && r.personID == id) {
                    ctx.fillStyle = "rgba(236,117,0,1)";
                    ctx.strokeStyle = "rgba(236,117,0,1)";
                    ctx.fill();
                    ctx.stroke();

                    $('.content#team').find('#locatieovertredingen .positions_players p.uit#' + r.personID).css({
                        'color': 'rgba(236,117,0,1)'
                    });
                } else if (!min && r.personID == id) {
                    ctx.fillStyle = "rgba(236,117,0,1)";
                    ctx.strokeStyle = "rgba(236,117,0,1)";
                    ctx.fill();
                    ctx.stroke();

                    $('.content#team').find('#locatieovertredingen .positions_players p.uit#' + r.personID).css({
                        'color': 'rgba(236,117,0,1)'
                    });
                } else {
                    ctx.fillStyle = "rgba(236,117,0,0.4)";
                    ctx.strokeStyle = "rgba(236,117,0,0.4)";
                    ctx.fill();
                    ctx.stroke();
                }

                ctx.closePath();
            });
        };

        self.resetovertredingen_player = function () {
            $('.content#team').find('#locatieovertredingen .positions_players p.thuis').css({
                'color': 'rgba(3,125,201,0.4)'
            });
            $('.content#team').find('#locatieovertredingen .positions_players p.uit').css({
                'color': 'rgba(236,117,0,0.4)'
            });
        };

        self.selectovertredingen_uit = function () {
            if (!overtredingen_uit) {
                self.match.locatie_overtredingen_filter = angular.copy(self.match.locatie_overtredingen);
                overtredingen_uit = true;
            } else {
                self.match.locatie_overtredingen_filter.thuisTeam = [];
                overtredingen_thuis = false;
            }
            self.overtredingen_field_draw();
            self.overtredingen_field_fill();
        };
        self.selectovertredingen_thuis = function () {
            if (!overtredingen_thuis) {
                self.match.locatie_overtredingen_filter = angular.copy(self.match.locatie_overtredingen);
                overtredingen_thuis = true;
            } else {
                self.match.locatie_overtredingen_filter.uitTeam = [];
                overtredingen_uit = false;
            }
            self.overtredingen_field_draw();
            self.overtredingen_field_fill();
        };
        self.overtredingen_field_build();

        /*var selectovertredingen_uit = true;
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
        };*/


        // SPELERS

        //self.orderSpelers = 'personID';
        self.orderSpelersNaam = 'spelerNaam';
        //self.orderSpelersNaamType = ['-type', 'spelerNaam'];
        //
        //self.createLineTransform = function (x1,y1,x2,y2) {
        //    var angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        //    return 'rotate(' + angle + 'deg)';
        //};
        //self.createLineLength = function (x1,y1,x2,y2) {
        //    return Math.sqrt(Math.abs(x1 - x2) * Math.abs(x1 - x2) + Math.abs(y1 - y2) * Math.abs(y1 - y2));
        //};

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


        // LOGBOEK

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


        // MEER DEZE RONDE
        if (self.loading_slug === 'ronde') {
            $timeout(function() {
                var season = $sessionStorage.matchshort.seizoen;
                var round = $sessionStorage.matchshort.match_info.ronde;
                Api.MatchesSeason.query({
                    _season: season
                }, function (res) {
                    self.round_matches = $filter('orderBy')($filter('filter')(res, { match_info: { ronde: round } }, true), 'matchID');
                });
            }, 1000);
        }
    }]);