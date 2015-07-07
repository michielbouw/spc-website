angular.module('mainapp.match')
    .controller('mainapp.match.MatchSingleController', ['$scope', '$filter', 'Api', 'AuthenticationService', '$location', '$rootScope', '$routeParams',
        function($scope, $filter, Api, AuthenticationService, $location, $rootScope, $routeParams)
    {
        var self = this;
        self.datetime = new Date();

        self.matchshort = {};
        self.match = {};
        Api.Match.get({
            _id: $routeParams._id
        }, function (res) {
            if ($rootScope.currentClub) {
                if ($rootScope.currentUser.role == 'admin') {
                    self.matchshort = res;
                } else if ($rootScope.currentClub.spc_package == 'extra' || $rootScope.currentClub.spc_package == 'league') {
                    self.matchshort = res;
                } else if ($rootScope.currentClub.spc_package == 'club' && ($rootScope.currentClub.name == res.match_info.thuis || $rootScope.currentClub.name == res.match_info.uit)) {
                    self.matchshort = res;
                } else {
                    $location.path('/wedstrijd');
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

                        if (res.data.role == 'admin') {
                            self.matchshort = res;
                        } else {
                            Api.Club.get({
                                _slug: res.data.club_slug
                            }, function (res) {
                                $rootScope.currentClub.colors = res.colors;
                                $rootScope.currentClub.spc_package = res.spc_package;

                                if ($rootScope.currentUser.role == 'admin') {
                                    self.matchshort = res;
                                } else if ($rootScope.currentClub.spc_package == 'extra' || $rootScope.currentClub.spc_package == 'league') {
                                    self.matchshort = res;
                                } else if ($rootScope.currentClub.spc_package == 'club' && ($rootScope.currentClub.name == res.match_info.thuis || $rootScope.currentClub.name == res.match_info.uit)) {
                                    self.matchshort = res;
                                } else {
                                    $location.path('/wedstrijd');
                                }
                            });
                        }
                    });
                }
            }
        });
        Api.MatchDataID.get({
            _id: $routeParams._id
        }, function (res) {
            self.match = res;
            self.match.gemiddelde_posities = angular.copy(self.match.gemiddelde_posities_helft1);
            self.match.locatie_doelpogingen_filter = angular.copy(self.match.locatie_doelpogingen);
            self.match.locatie_overtredingen_filter = angular.copy(self.match.locatie_overtredingen);

            if ($rootScope.currentClub) {
                var teams = $rootScope.currentClub.teams;
                var teamslug = '';
                if ($filter('filter')(teams, {team_slug: self.match.thuisTeamSlug}, true)) {
                    teamslug = $filter('filter')(teams, {team_slug: self.match.thuisTeamSlug}, true)[0].team_slug;

                    if (teamslug == self.match.thuisTeamSlug || teamslug == self.match.uitTeamSlug) {
                        Api.TeamDataItem.get({
                            _slug: teamslug
                        }, function (res) {
                            self.team_data = res;
                            if ($filter('filter')(res.team_data, {season: self.match.seizoen}, true)) {
                                var temp = $filter('filter')(res.team_data, {season: self.match.seizoen}, true)[0];
                                self.teamdata = $filter('filter')(temp.matches, {matchID: self.match.matchID}, true)[0];
                                self.playerdata = res.player_data;

                                self.spelerscores = [];
                                angular.forEach(self.playerdata, function (value, key) {
                                    var temp = {};
                                    temp.spelerNaam = value.spelerNaam;
                                    temp.playerID = value.playerID;
                                    var temp1 = $filter('filter')(value.matches, {season: self.match.seizoen}, true)[0];
                                    var player = $filter('filter')(temp1.match, {matchID: self.match.matchID}, true)[0];
                                    if (player.scores) {
                                        temp.scores = player.scores;
                                    } else {
                                        temp.scores = {};
                                        temp.scores.score_from_coach = 0;
                                    }
                                    self.spelerscores.push(temp);
                                });
                            }
                        });
                    }
                } else if ($filter('filter')(teams, {team_slug: self.match.uitTeamSlug}, true)) {
                    teamslug = $filter('filter')(teams, {team_slug: self.match.uitTeamSlug}, true)[0].team_slug;

                    if (teamslug == self.match.thuisTeamSlug || teamslug == self.match.uitTeamSlug) {
                        Api.TeamDataItem.get({
                            _slug: teamslug
                        }, function (res) {
                            self.team_data = res;
                            if ($filter('filter')(res.team_data, {season: self.match.seizoen}, true)) {
                                var temp = $filter('filter')(res.team_data, {season: self.match.seizoen}, true)[0];
                                self.teamdata = $filter('filter')(temp.matches, {matchID: self.match.matchID}, true)[0];
                                self.playerdata = res.player_data;

                                self.spelerscores = [];
                                angular.forEach(self.playerdata, function (value, key) {
                                    var temp = {};
                                    temp.spelerNaam = value.spelerNaam;
                                    temp.playerID = value.playerID;
                                    var temp1 = $filter('filter')(value.matches, {season: self.match.seizoen}, true)[0];
                                    var player = $filter('filter')(temp1.match, {matchID: self.match.matchID}, true)[0];
                                    if (player.scores) {
                                        temp.scores = player.scores;
                                    } else {
                                        temp.scores = {};
                                        temp.scores.score_from_coach = 0;
                                    }
                                    self.spelerscores.push(temp);
                                });
                            }
                        });
                    }
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

                        var teams = $rootScope.currentClub.teams;
                        var teamslug = '';
                        if ($filter('filter')(teams, {team_slug: self.match.thuisTeamSlug}, true)) {
                            teamslug = $filter('filter')(teams, {team_slug: self.match.thuisTeamSlug}, true)[0].team_slug;

                            if (teamslug == self.match.thuisTeamSlug || teamslug == self.match.uitTeamSlug) {
                                Api.TeamDataItem.get({
                                    _slug: teamslug
                                }, function (res) {
                                    self.team_data = res;
                                    if ($filter('filter')(res.team_data, {season: self.match.seizoen}, true)) {
                                        var temp = $filter('filter')(res.team_data, {season: self.match.seizoen}, true)[0];
                                        self.teamdata = $filter('filter')(temp.matches, {matchID: self.match.matchID}, true)[0];
                                        self.playerdata = res.player_data;

                                        self.spelerscores = [];
                                        angular.forEach(self.playerdata, function (value, key) {
                                            var temp = {};
                                            temp.spelerNaam = value.spelerNaam;
                                            temp.playerID = value.playerID;
                                            var temp1 = $filter('filter')(value.matches, {season: self.match.seizoen}, true)[0];
                                            var player = $filter('filter')(temp1.match, {matchID: self.match.matchID}, true)[0];
                                            if (player.scores) {
                                                temp.scores = player.scores;
                                            } else {
                                                temp.scores = {};
                                                temp.scores.score_from_coach = 0;
                                            }
                                            self.spelerscores.push(temp);
                                        });
                                    }
                                });
                            }
                        } else if ($filter('filter')(teams, {team_slug: self.match.uitTeamSlug}, true)) {
                            teamslug = $filter('filter')(teams, {team_slug: self.match.uitTeamSlug}, true)[0].team_slug;

                            if (teamslug == self.match.thuisTeamSlug || teamslug == self.match.uitTeamSlug) {
                                Api.TeamDataItem.get({
                                    _slug: teamslug
                                }, function (res) {
                                    self.team_data = res;
                                    if ($filter('filter')(res.team_data, {season: self.match.seizoen}, true)) {
                                        var temp = $filter('filter')(res.team_data, {season: self.match.seizoen}, true)[0];
                                        self.teamdata = $filter('filter')(temp.matches, {matchID: self.match.matchID}, true)[0];
                                        self.playerdata = res.player_data;

                                        self.spelerscores = [];
                                        angular.forEach(self.playerdata, function (value, key) {
                                            var temp = {};
                                            temp.spelerNaam = value.spelerNaam;
                                            temp.playerID = value.playerID;
                                            var temp1 = $filter('filter')(value.matches, {season: self.match.seizoen}, true)[0];
                                            var player = $filter('filter')(temp1.match, {matchID: self.match.matchID}, true)[0];
                                            if (player.scores) {
                                                temp.scores = player.scores;
                                            } else {
                                                temp.scores = {};
                                                temp.scores.score_from_coach = 0;
                                            }
                                            self.spelerscores.push(temp);
                                        });
                                    }
                                });
                            }
                        }
                    }, function () {
                    });
                }
            }
        });

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
            self.spelerlog = player.player_log;
        };

        $rootScope.infoSaveLog = '';
        self.savePlayerLog = function () {
            $rootScope.infoSaveLog = '';
            if ($filter('filter')(self.team_data.team_data, {season: self.match.seizoen}, true)) {
                angular.forEach(self.playerdata, function (value, key) {
                    angular.forEach(self.spelerscores, function (value1, key1) {
                        if (value.playerID == value1.playerID) {
                            var temp1 = $filter('filter')(value.matches, {season: self.match.seizoen}, true)[0];
                            var player = $filter('filter')(temp1.match, {matchID: self.match.matchID}, true)[0];
                            player.scores = value1.scores;
                        }
                    });
                });
                Api.TeamDataItem.put({
                    _slug: self.team_data._id
                }, {
                    player_data: self.playerdata,
                    date_edited: self.datetime
                }, function (res) {
                    $rootScope.infoSaveLog = 'Opgeslagen';
                });
            }
        };
    }]);