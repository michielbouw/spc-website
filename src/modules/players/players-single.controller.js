angular.module('mainapp.players')
    .controller('mainapp.players.PlayersSingleController', ['$scope', 'Api', '$filter', '$routeParams', '$rootScope', '$location', '$timeout', '$sessionStorage',
        function($scope, Api, $filter, $routeParams, $rootScope, $location, $timeout, $sessionStorage)
    {
        var self = this;
        self.orderMatches = 'ronde';
        self.player_data = [];
        self.player_stats = {};
        self.season_matches = [];
        self.match = {};
        self.matches_played = 0;
        self.stats = {};
        self.stats_vs = {};
        self.vs = '.. kies ..';

        if ((!$routeParams.playerid || $routeParams.playerid === '') && $rootScope.currentClub && $rootScope.currentClub.teams[0].team_slug) {
            $location.path('/spelers/' + $rootScope.currentClub.teams[0].team_slug);
        } else if ((!$routeParams.playerid || $routeParams.playerid === '') && (!$rootScope.currentClub || !$rootScope.currentClub.teams[0].team_slug)) {
            $location.path('/404');
        } else {
            if ( ($rootScope.currentClub && $rootScope.currentClub.teams[0] && $rootScope.currentClub.teams[0].team_slug !== $routeParams.team_slug) && ($rootScope.currentClub && $rootScope.currentClub.teams[1] && $rootScope.currentClub.teams[1].team_slug !== $routeParams.team_slug) && $sessionStorage.role !== 'admin' ) {
                $location.path('/404');
            }

            Api.TeamDataItem.get({
                _slug: $routeParams.team_slug
            }, function (res) {
                self._id = res._id;
                self.player_data = res.player_data;
                self.team_name = res.team_name;
                self.club_name = res.club_name;
                self.divisie = res.divisie;
                self.team_slug = $routeParams.team_slug;
                self.playerID = Number($routeParams.playerid);

                self.player_stats = angular.copy($filter('filter')(self.player_data, {playerID: self.playerID}, true)[0]);
                self.season_index = self.player_stats.matches[self.player_stats.matches.length - 1].season;
                self.season_matches_init = $filter('orderBy')(($filter('filter')( self.player_stats.matches, {season: self.season_index}, true)[0]).match, self.orderMatches);
                self.season_matches = $filter('orderBy')(($filter('filter')( self.player_stats.matches, {season: self.season_index}, true)[0]).match, self.orderMatches);

                Api.SpelersID.query({
                    _id: self.playerID
                },function(res1) {
                    angular.forEach(res1, function(value, key) {
                        if (value.spelerPhoto && !self.player_stats.spelerPhoto && self.season_index.indexOf(value.seizoen.substring(8,9)) >= 0){
                            self.player_stats.spelerPhoto = value.spelerPhoto;
                        }
                    });
                });

                if (self.player_stats.spelerType == 'keeper') {
                    self.clean_sheets = 0;
                    for (var c = self.season_matches.length - 1; c >= 0; c--) {
                        if (self.season_matches[c].doelpunten_tegen === 0) {
                            self.clean_sheets += 1;
                        } else {
                            break;
                        }
                    }
                }

                self.matches_played = self.season_matches.length;

                var statslength = self.season_matches.length;
                var temp0 = self.season_matches[0].ronde;
                var temp1 = self.season_matches[statslength - 1].ronde;
                if (temp0 !== 1) {
                    for (var i = 1; i < temp0; i++) {
                        var temp = {};
                        temp.ronde = i;
                        self.season_matches.push(temp);
                    }
                    self.season_matches = $filter('orderBy')(self.season_matches, self.orderMatches);
                }
                for (var j = 0; j < statslength; j++) {
                    if ((j+1) != self.season_matches[j].ronde) {
                        var tempp = {};
                        tempp.ronde = j+1;

                        self.season_matches.push(tempp);
                    }
                    self.season_matches = $filter('orderBy')(self.season_matches, self.orderMatches);
                    statslength = self.season_matches.length;
                }
                $scope.round = temp1;

                // set match to last on rounds interval
                self.match = $filter('filter')(self.season_matches, {ronde: $scope.round}, true)[0];

                $timeout(function () {
                    angular.element(document).ready(function () {
                        $('.slider-control .slider').slider({
                            min: temp0,
                            value: $scope.round
                        });
                        $('.content-players-select .round').css('margin-left', $('.content-players-select .slider-control .slider .ui-slider-range').width() );
                    });
                }, 400);

                self.vs = self.playerID;
                self.vs_info = 'Gemiddelde seizoen';
                self.vsInitFunc();
            }, function() {
                $location.path('/404');
            });
        }

        self.roundfilter = function () {
            return $scope.round;
        };

        self.seasonInitFunc = function () {
            if (self.player_stats && self.season_index) {
                self.season_matches_init = $filter('orderBy')(($filter('filter')( self.player_stats.matches, {season: self.season_index}, true)[0]).match, self.orderMatches);
                self.season_matches = $filter('orderBy')(($filter('filter')( self.player_stats.matches, {season: self.season_index}, true)[0]).match, self.orderMatches);

                if (self.player_stats.spelerType == 'keeper') {
                    self.clean_sheets = 0;
                    for (var c = self.season_matches.length - 1; c >= 0; c--) {
                        if (self.season_matches[c].doelpunten_tegen === 0) {
                            self.clean_sheets += 1;
                        } else {
                            break;
                        }
                    }
                }

                self.matches_played = self.season_matches.length;

                var statslength = self.season_matches.length;
                var temp0 = self.season_matches[0].ronde;
                var temp1 = self.season_matches[statslength - 1].ronde;
                if (temp0 !== 1) {
                    for (var i = 1; i < temp0; i++) {
                        var temp = {};
                        temp.ronde = i;
                        self.season_matches.push(temp);
                    }
                    self.season_matches = $filter('orderBy')(self.season_matches, self.orderMatches);
                }
                for (var j = 0; j < statslength; j++) {
                    if ((j+1) != self.season_matches[j].ronde) {
                        var tempp = {};
                        tempp.ronde = j+1;

                        self.season_matches.push(tempp);
                    }
                    self.season_matches = $filter('orderBy')(self.season_matches, self.orderMatches);
                    statslength = self.season_matches.length;
                }
                $scope.round = temp1;

                // set match to last on rounds interval
                self.match = $filter('filter')(self.season_matches, {ronde: $scope.round}, true)[0];

                $timeout(function () {
                    angular.element(document).ready(function () {
                        $('.slider-control .slider').slider({
                            min: temp0,
                            value: $scope.round
                        });
                        $('.content-players-select .round').css('margin-left', $('.content-players-select .slider-control .slider .ui-slider-range').width() );
                    });
                }, 400);

                self.vs = self.playerID;
                self.vs_info = 'Gemiddelde seizoen';
                self.vsInitFunc();
            }
        };

        self.vsInitFunc = function () {
            var statslength;
            var count1, count2;
            var i;
            self.stats_vs = {};

            if (self.playerID == self.vs && self.vs_info == 'Gemiddelde seizoen') {
                self.vs_naam = self.vs_info;
                if (self.player_data && self.season_index) {
                    var temp = $filter('filter')(self.player_data, {playerID: self.playerID}, true)[0];
                    var stats_vs_temp = $filter('orderBy')(($filter('filter')(temp.matches, {season: self.season_index}, true)[0]).match, self.orderMatches);

                    statslength = stats_vs_temp.length;
                    count1 = 0;

                    self.stats_vs.passzekerheid = 0;
                    self.stats_vs.pass_lengte = 0;
                    self.stats_vs.geel = 0;
                    self.stats_vs.rood = 0;
                    if (self.player_stats.spelerType == 'keeper') {
                        self.stats_vs.doelpunten_tegen = 0;
                        self.stats_vs.reddingen = 0;
                        self.stats_vs.gevangen_ballen = 0;
                        self.stats_vs.weggestompte_ballen = 0;
                        self.stats_vs.geslaagde_reddingen = 0;
                        self.stats_vs.korte_passes = 0;
                        self.stats_vs.middellange_passes = 0;
                        self.stats_vs.lange_passes = 0;
                        self.stats_vs.perc_korte_passes = 0;
                        self.stats_vs.perc_middellange_passes = 0;
                        self.stats_vs.perc_lange_passes = 0;
                        self.stats_vs.succesvolle_uittrappen = 0;
                    } else {
                        self.stats_vs.doelpunten = 0;
                        self.stats_vs.doelpogingen = 0;
                        self.stats_vs.doelpogingen_opdoel = 0;
                        self.stats_vs.aantal_passes = 0;
                        self.stats_vs.verdedigende_duels = 0;
                        self.stats_vs.aanvallende_duels = 0;
                        self.stats_vs.perc_verdedigende_duels = 0;
                        self.stats_vs.perc_aanvallende_duels = 0;
                        self.stats_vs.intercepties = 0;
                        self.stats_vs.overtredingen = 0;
                        self.stats_vs.gewonnen_duels = 0;
                    }

                    for (i = 0; i < statslength; i++) {
                        if (stats_vs_temp[i]) {
                            if (isNaN(stats_vs_temp[i].pass_percentage)) {
                                self.stats_vs.passzekerheid += 0;
                            } else {
                                self.stats_vs.passzekerheid += stats_vs_temp[i].pass_percentage;
                            }

                            if (isNaN(stats_vs_temp[i].pass_lengte)) {
                                self.stats_vs.pass_lengte += 0;
                            } else {
                                self.stats_vs.pass_lengte += stats_vs_temp[i].pass_lengte;
                            }

                            self.stats_vs.geel += stats_vs_temp[i].geel;
                            self.stats_vs.rood += stats_vs_temp[i].rood;

                            if (self.player_stats.spelerType == 'keeper') {
                                self.stats_vs.doelpunten_tegen += stats_vs_temp[i].doelpunten_tegen;
                                self.stats_vs.reddingen += stats_vs_temp[i].reddingen;
                                self.stats_vs.gevangen_ballen += stats_vs_temp[i].gevangen_ballen;
                                self.stats_vs.weggestompte_ballen += stats_vs_temp[i].weggestompte_ballen;

                                if (isNaN(stats_vs_temp[i].geslaagde_reddingen)) {
                                    self.stats_vs.geslaagde_reddingen += 0;
                                } else {
                                    self.stats_vs.geslaagde_reddingen += stats_vs_temp[i].geslaagde_reddingen;
                                }

                                self.stats_vs.korte_passes += stats_vs_temp[i].korte_passes;
                                self.stats_vs.middellange_passes += stats_vs_temp[i].middellange_passes;
                                self.stats_vs.lange_passes += stats_vs_temp[i].lange_passes;
                                self.stats_vs.perc_korte_passes += 100 * (stats_vs_temp[i].korte_passes / (stats_vs_temp[i].korte_passes + stats_vs_temp[i].middellange_passes + stats_vs_temp[i].lange_passes));
                                self.stats_vs.perc_middellange_passes += 100 * (stats_vs_temp[i].middellange_passes / (stats_vs_temp[i].korte_passes + stats_vs_temp[i].middellange_passes + stats_vs_temp[i].lange_passes));
                                self.stats_vs.perc_lange_passes += 100 * (stats_vs_temp[i].lange_passes / (stats_vs_temp[i].korte_passes + stats_vs_temp[i].middellange_passes + stats_vs_temp[i].lange_passes));

                                if (isNaN(stats_vs_temp[i].succesvolle_uittrappen)) {
                                    self.stats_vs.succesvolle_uittrappen += 0;
                                } else {
                                    self.stats_vs.succesvolle_uittrappen += stats_vs_temp[i].succesvolle_uittrappen;
                                }
                            } else {
                                self.stats_vs.doelpunten += stats_vs_temp[i].doelpunten;
                                self.stats_vs.doelpogingen += stats_vs_temp[i].doelpogingen;

                                if (isNaN(stats_vs_temp[i].doelpogingen_opdoel)) {
                                    self.stats_vs.doelpogingen_opdoel += 0;
                                } else {
                                    self.stats_vs.doelpogingen_opdoel += Number(stats_vs_temp[i].doelpogingen_opdoel);
                                }

                                self.stats_vs.aantal_passes += stats_vs_temp[i].aantal_passes;
                                self.stats_vs.verdedigende_duels += stats_vs_temp[i].verdedigende_duels;
                                self.stats_vs.aanvallende_duels += stats_vs_temp[i].aanvallende_duels;
                                self.stats_vs.perc_verdedigende_duels += 100 * (stats_vs_temp[i].verdedigende_duels / (stats_vs_temp[i].verdedigende_duels + stats_vs_temp[i].aanvallende_duels));
                                self.stats_vs.perc_aanvallende_duels += 100 * (stats_vs_temp[i].aanvallende_duels / (stats_vs_temp[i].verdedigende_duels + stats_vs_temp[i].aanvallende_duels));
                                self.stats_vs.intercepties += stats_vs_temp[i].intercepties;
                                self.stats_vs.overtredingen += stats_vs_temp[i].overtredingen;

                                if (isNaN(stats_vs_temp[i].gewonnen_duels)) {
                                    self.stats_vs.gewonnen_duels += 0;
                                } else {
                                    self.stats_vs.gewonnen_duels += stats_vs_temp[i].gewonnen_duels;
                                }
                            }

                            count1++;
                        }
                    }

                    self.stats_vs.passzekerheid /= count1;
                    self.stats_vs.pass_lengte /= count1;
                    self.stats_vs.geel /= count1;
                    self.stats_vs.rood /= count1;
                    if (self.player_stats.spelerType == 'keeper') {
                        self.stats_vs.doelpunten_tegen /= count1;
                        self.stats_vs.reddingen /= count1;
                        self.stats_vs.gevangen_ballen /= count1;
                        self.stats_vs.weggestompte_ballen /= count1;
                        self.stats_vs.geslaagde_reddingen /= count1;
                        self.stats_vs.korte_passes /= count1;
                        self.stats_vs.middellange_passes /= count1;
                        self.stats_vs.lange_passes /= count1;
                        self.stats_vs.perc_korte_passes /= count1;
                        self.stats_vs.perc_middellange_passes /= count1;
                        self.stats_vs.perc_lange_passes /= count1;
                        self.stats_vs.succesvolle_uittrappen /= count1;

                        $timeout(function () {
                            self.chart_keeper.datasets[0].label = self.player_stats.spelerNaam || 'Huidige speler';
                            self.chart_keeper.datasets[1].label = self.vs_naam;
                            self.chart_keeper.datasets[1].data = [self.stats_vs.geslaagde_reddingen.toFixed(1), self.stats_vs.passzekerheid.toFixed(1), self.stats_vs.succesvolle_uittrappen.toFixed(1), self.stats_vs.perc_korte_passes.toFixed(1), self.stats_vs.perc_middellange_passes.toFixed(1), self.stats_vs.perc_lange_passes.toFixed(1)];
                        }, 400);
                    } else {
                        self.stats_vs.doelpunten /= count1;
                        self.stats_vs.doelpogingen /= count1;
                        self.stats_vs.doelpogingen_opdoel /= count1;
                        self.stats_vs.aantal_passes /= count1;
                        self.stats_vs.verdedigende_duels /= count1;
                        self.stats_vs.aanvallende_duels /= count1;
                        self.stats_vs.perc_verdedigende_duels /= count1;
                        self.stats_vs.perc_aanvallende_duels /= count1;
                        self.stats_vs.intercepties /= count1;
                        self.stats_vs.overtredingen /= count1;
                        self.stats_vs.gewonnen_duels /= count1;

                        $timeout(function () {
                            self.chart_player.datasets[0].label = self.player_stats.spelerNaam || 'Huidige speler';
                            self.chart_player.datasets[1].label = self.vs_naam;
                            self.chart_player.datasets[1].data = [self.stats_vs.doelpogingen_opdoel.toFixed(1), self.stats_vs.passzekerheid.toFixed(1), self.stats_vs.gewonnen_duels.toFixed(1), self.stats_vs.perc_verdedigende_duels.toFixed(1), self.stats_vs.perc_aanvallende_duels.toFixed(1)];
                        }, 400);
                    }
                }
            } else { // other player from list with playerID
                var player_id = self.vs;
                self.player_stats_vs = angular.copy($filter('filter')(self.player_data, {playerID: player_id}, true)[0]);
                if (player_id == self.playerID) {
                    self.vs_naam = self.vs_info;
                } else {
                    self.vs_naam = self.player_stats_vs.spelerNaam;
                }

                if (self.vs_info === 'Deze ronde') {
                    var player_stats_temp = self.player_stats_vs;
                    var season_matches_temp = $filter('orderBy')(($filter('filter')( player_stats_temp.matches, {season: self.season_index}, true)[0]).match, self.orderMatches);

                    Api.SpelersID.query({
                        _id: player_id
                    },function(res1) {
                        angular.forEach(res1, function(value, key) {
                            if (value.spelerPhoto && !self.player_stats_vs.spelerPhoto && self.season_index.indexOf(value.seizoen.substring(8,9)) >= 0){
                                self.player_stats_vs.spelerPhoto = value.spelerPhoto;
                            }
                        });
                    });

                    statslength = season_matches_temp.length;
                    var temp0 = season_matches_temp[0].ronde;
                    if (temp0 !== 1) {
                        for (var ii = 1; ii < temp0; ii++) {
                            var temp00 = {};
                            temp00.ronde = ii;
                            season_matches_temp.push(temp00);
                        }
                        season_matches_temp = $filter('orderBy')(season_matches_temp, self.orderMatches);
                    }
                    for (var j = 0; j < statslength; j++) {
                        if ((j+1) != season_matches_temp[j].ronde) {
                            var tempp = {};
                            tempp.ronde = j+1;

                            season_matches_temp.push(tempp);
                        }
                        season_matches_temp = $filter('orderBy')(season_matches_temp, self.orderMatches);
                        statslength = season_matches_temp.length;
                    }

                    if (season_matches_temp.length > 0) {
                        if (isNaN(season_matches_temp[self.roundfilter() - 1].pass_percentage)) {
                            self.stats_vs.passzekerheid = 0;
                        } else {
                            self.stats_vs.passzekerheid = season_matches_temp[self.roundfilter() - 1].pass_percentage;
                        }

                        if (isNaN(season_matches_temp[self.roundfilter() - 1].pass_lengte)) {
                            self.stats_vs.pass_lengte = 0;
                        } else {
                            self.stats_vs.pass_lengte = season_matches_temp[self.roundfilter() - 1].pass_lengte;
                        }

                        self.stats_vs.geel = season_matches_temp[self.roundfilter() - 1].geel;

                        self.stats_vs.rood = season_matches_temp[self.roundfilter() - 1].rood;

                        if (self.player_stats.spelerType == 'keeper') {
                            self.stats_vs.doelpunten_tegen = season_matches_temp[self.roundfilter() - 1].doelpunten_tegen;

                            self.stats_vs.reddingen = season_matches_temp[self.roundfilter() - 1].reddingen;

                            self.stats_vs.gevangen_ballen = season_matches_temp[self.roundfilter() - 1].gevangen_ballen;

                            self.stats_vs.weggestompte_ballen = season_matches_temp[self.roundfilter() - 1].weggestompte_ballen;

                            if (isNaN(season_matches_temp[self.roundfilter() - 1].geslaagde_reddingen)) {
                                self.stats_vs.geslaagde_reddingen = 0;
                            } else {
                                self.stats_vs.geslaagde_reddingen = season_matches_temp[self.roundfilter() - 1].geslaagde_reddingen;
                            }

                            self.stats_vs.korte_passes = season_matches_temp[self.roundfilter() - 1].korte_passes;
                            self.stats_vs.middellange_passes = season_matches_temp[self.roundfilter() - 1].middellange_passes;
                            self.stats_vs.lange_passes = season_matches_temp[self.roundfilter() - 1].lange_passes;
                            self.stats_vs.perc_korte_passes = 100 * (season_matches_temp[self.roundfilter() - 1].korte_passes / (season_matches_temp[self.roundfilter() - 1].korte_passes + season_matches_temp[self.roundfilter() - 1].middellange_passes + season_matches_temp[self.roundfilter() - 1].lange_passes));
                            self.stats_vs.perc_middellange_passes = 100 * (season_matches_temp[self.roundfilter() - 1].middellange_passes / (season_matches_temp[self.roundfilter() - 1].korte_passes + season_matches_temp[self.roundfilter() - 1].middellange_passes + season_matches_temp[self.roundfilter() - 1].lange_passes));
                            self.stats_vs.perc_lange_passes = 100 * (season_matches_temp[self.roundfilter() - 1].lange_passes / (season_matches_temp[self.roundfilter() - 1].korte_passes + season_matches_temp[self.roundfilter() - 1].middellange_passes + season_matches_temp[self.roundfilter() - 1].lange_passes));

                            if (isNaN(season_matches_temp[self.roundfilter() - 1].succesvolle_uittrappen)) {
                                self.stats_vs.succesvolle_uittrappen = 0;
                            } else {
                                self.stats_vs.succesvolle_uittrappen = season_matches_temp[self.roundfilter() - 1].succesvolle_uittrappen;
                            }

                            $timeout(function () {
                                self.chart_keeper.datasets[0].label = self.player_stats.spelerNaam || 'Huidige speler';
                                self.chart_keeper.datasets[1].label = player_stats_temp.spelerNaam;
                                self.chart_keeper.datasets[1].data = [self.stats_vs.geslaagde_reddingen.toFixed(1), self.stats_vs.passzekerheid.toFixed(1), self.stats_vs.succesvolle_uittrappen.toFixed(1), self.stats_vs.perc_korte_passes.toFixed(1), self.stats_vs.perc_middellange_passes.toFixed(1), self.stats_vs.perc_lange_passes.toFixed(1)];
                            }, 400);
                        } else {
                            self.stats_vs.doelpunten = season_matches_temp[self.roundfilter() - 1].doelpunten;

                            self.stats_vs.doelpogingen = season_matches_temp[self.roundfilter() - 1].doelpogingen;

                            if (isNaN(season_matches_temp[self.roundfilter() - 1].doelpogingen_opdoel)) {
                                self.stats_vs.doelpogingen_opdoel = 0;
                            } else {
                                self.stats_vs.doelpogingen_opdoel = Number(season_matches_temp[self.roundfilter() - 1].doelpogingen_opdoel);
                            }

                            self.stats_vs.aantal_passes = season_matches_temp[self.roundfilter() - 1].aantal_passes;

                            self.stats_vs.verdedigende_duels = season_matches_temp[self.roundfilter() - 1].verdedigende_duels;
                            self.stats_vs.aanvallende_duels = season_matches_temp[self.roundfilter() - 1].aanvallende_duels;
                            self.stats_vs.perc_verdedigende_duels = 100 * (season_matches_temp[self.roundfilter() - 1].verdedigende_duels / (season_matches_temp[self.roundfilter() - 1].verdedigende_duels + season_matches_temp[self.roundfilter() - 1].aanvallende_duels));
                            self.stats_vs.perc_aanvallende_duels = 100 * (season_matches_temp[self.roundfilter() - 1].aanvallende_duels / (season_matches_temp[self.roundfilter() - 1].verdedigende_duels + season_matches_temp[self.roundfilter() - 1].aanvallende_duels));

                            self.stats_vs.intercepties = season_matches_temp[self.roundfilter() - 1].intercepties;

                            self.stats_vs.overtredingen = season_matches_temp[self.roundfilter() - 1].overtredingen;

                            if (isNaN(season_matches_temp[self.roundfilter() - 1].gewonnen_duels)) {
                                self.stats_vs.gewonnen_duels = 0;
                            } else {
                                self.stats_vs.gewonnen_duels = season_matches_temp[self.roundfilter() - 1].gewonnen_duels;
                            }

                            $timeout(function () {
                                self.chart_player.datasets[0].label = self.player_stats.spelerNaam || 'Huidige speler';
                                self.chart_player.datasets[1].label = player_stats_temp.spelerNaam;
                                self.chart_player.datasets[1].data = [self.stats_vs.doelpogingen_opdoel.toFixed(1), self.stats_vs.passzekerheid.toFixed(1), self.stats_vs.gewonnen_duels.toFixed(1), self.stats_vs.perc_verdedigende_duels.toFixed(1), self.stats_vs.perc_aanvallende_duels.toFixed(1)];
                            }, 400);
                        }
                    }
                } else if (self.vs_info === 'Gemiddelde seizoen') {
                    var player_stats_temp1 = self.player_stats_vs;
                    var season_matches_temp1 = $filter('orderBy')(($filter('filter')( player_stats_temp1.matches, {season: self.season_index}, true)[0]).match, self.orderMatches);

                    Api.SpelersID.query({
                        _id: player_id
                    },function(res1) {
                        angular.forEach(res1, function(value, key) {
                            if (value.spelerPhoto && !self.player_stats_vs.spelerPhoto && self.season_index.indexOf(value.seizoen.substring(8,9)) >= 0){
                                self.player_stats_vs.spelerPhoto = value.spelerPhoto;
                            }
                        });
                    });

                    statslength = season_matches_temp1.length;
                    count1 = 0;

                    self.stats_vs.passzekerheid = 0;
                    self.stats_vs.pass_lengte = 0;
                    self.stats_vs.geel = 0;
                    self.stats_vs.rood = 0;
                    if (self.player_stats.spelerType == 'keeper') {
                        self.stats_vs.doelpunten_tegen = 0;
                        self.stats_vs.reddingen = 0;
                        self.stats_vs.gevangen_ballen = 0;
                        self.stats_vs.weggestompte_ballen = 0;
                        self.stats_vs.geslaagde_reddingen = 0;
                        self.stats_vs.korte_passes = 0;
                        self.stats_vs.middellange_passes = 0;
                        self.stats_vs.lange_passes = 0;
                        self.stats_vs.perc_korte_passes = 0;
                        self.stats_vs.perc_middellange_passes = 0;
                        self.stats_vs.perc_lange_passes = 0;
                        self.stats_vs.succesvolle_uittrappen = 0;
                    } else {
                        self.stats_vs.doelpunten = 0;
                        self.stats_vs.doelpogingen = 0;
                        self.stats_vs.doelpogingen_opdoel = 0;
                        self.stats_vs.aantal_passes = 0;
                        self.stats_vs.verdedigende_duels = 0;
                        self.stats_vs.aanvallende_duels = 0;
                        self.stats_vs.perc_verdedigende_duels = 0;
                        self.stats_vs.perc_aanvallende_duels = 0;
                        self.stats_vs.intercepties = 0;
                        self.stats_vs.overtredingen = 0;
                        self.stats_vs.gewonnen_duels = 0;
                    }

                    for (i = 0; i < statslength; i++) {
                        if (season_matches_temp1[i]) {
                            if (isNaN(season_matches_temp1[i].pass_percentage)) {
                                self.stats_vs.passzekerheid += 0;
                            } else {
                                self.stats_vs.passzekerheid += season_matches_temp1[i].pass_percentage;
                            }

                            if (isNaN(season_matches_temp1[i].pass_lengte)) {
                                self.stats_vs.pass_lengte += 0;
                            } else {
                                self.stats_vs.pass_lengte += season_matches_temp1[i].pass_lengte;
                            }

                            self.stats_vs.geel += season_matches_temp1[i].geel;
                            self.stats_vs.rood += season_matches_temp1[i].rood;

                            if (self.player_stats.spelerType == 'keeper') {
                                self.stats_vs.doelpunten_tegen += season_matches_temp1[i].doelpunten_tegen;
                                self.stats_vs.reddingen += season_matches_temp1[i].reddingen;
                                self.stats_vs.gevangen_ballen += season_matches_temp1[i].gevangen_ballen;
                                self.stats_vs.weggestompte_ballen += season_matches_temp1[i].weggestompte_ballen;

                                if (isNaN(season_matches_temp1[i].geslaagde_reddingen)) {
                                    self.stats_vs.geslaagde_reddingen += 0;
                                } else {
                                    self.stats_vs.geslaagde_reddingen += season_matches_temp1[i].geslaagde_reddingen;
                                }

                                self.stats_vs.korte_passes += season_matches_temp1[i].korte_passes;
                                self.stats_vs.middellange_passes += season_matches_temp1[i].middellange_passes;
                                self.stats_vs.lange_passes += season_matches_temp1[i].lange_passes;
                                self.stats_vs.perc_korte_passes += 100 * (season_matches_temp1[i].korte_passes / (season_matches_temp1[i].korte_passes + season_matches_temp1[i].middellange_passes + season_matches_temp1[i].lange_passes));
                                self.stats_vs.perc_middellange_passes += 100 * (season_matches_temp1[i].middellange_passes / (season_matches_temp1[i].korte_passes + season_matches_temp1[i].middellange_passes + season_matches_temp1[i].lange_passes));
                                self.stats_vs.perc_lange_passes += 100 * (season_matches_temp1[i].lange_passes / (season_matches_temp1[i].korte_passes + season_matches_temp1[i].middellange_passes + season_matches_temp1[i].lange_passes));

                                if (isNaN(season_matches_temp1[i].succesvolle_uittrappen)) {
                                    self.stats_vs.succesvolle_uittrappen += 0;
                                } else {
                                    self.stats_vs.succesvolle_uittrappen += season_matches_temp1[i].succesvolle_uittrappen;
                                }
                            } else {
                                self.stats_vs.doelpunten += season_matches_temp1[i].doelpunten;
                                self.stats_vs.doelpogingen += season_matches_temp1[i].doelpogingen;

                                if (isNaN(season_matches_temp1[i].doelpogingen_opdoel)) {
                                    self.stats_vs.doelpogingen_opdoel += 0;
                                } else {
                                    self.stats_vs.doelpogingen_opdoel += Number(season_matches_temp1[i].doelpogingen_opdoel);
                                }

                                self.stats_vs.aantal_passes += season_matches_temp1[i].aantal_passes;
                                self.stats_vs.verdedigende_duels += season_matches_temp1[i].verdedigende_duels;
                                self.stats_vs.aanvallende_duels += season_matches_temp1[i].aanvallende_duels;
                                self.stats_vs.perc_verdedigende_duels += 100 * (season_matches_temp1[i].verdedigende_duels / (season_matches_temp1[i].verdedigende_duels + season_matches_temp1[i].aanvallende_duels));
                                self.stats_vs.perc_aanvallende_duels += 100 * (season_matches_temp1[i].aanvallende_duels / (season_matches_temp1[i].verdedigende_duels + season_matches_temp1[i].aanvallende_duels));
                                self.stats_vs.intercepties += season_matches_temp1[i].intercepties;
                                self.stats_vs.overtredingen += season_matches_temp1[i].overtredingen;

                                if (isNaN(season_matches_temp1[i].gewonnen_duels)) {
                                    self.stats_vs.gewonnen_duels += 0;
                                } else {
                                    self.stats_vs.gewonnen_duels += season_matches_temp1[i].gewonnen_duels;
                                }
                            }

                            count1++;
                        }
                    }

                    self.stats_vs.passzekerheid /= count1;
                    self.stats_vs.pass_lengte /= count1;
                    self.stats_vs.geel /= count1;
                    self.stats_vs.rood /= count1;
                    if (self.player_stats.spelerType == 'keeper') {
                        self.stats_vs.doelpunten_tegen /= count1;
                        self.stats_vs.reddingen /= count1;
                        self.stats_vs.gevangen_ballen /= count1;
                        self.stats_vs.weggestompte_ballen /= count1;
                        self.stats_vs.geslaagde_reddingen /= count1;
                        self.stats_vs.korte_passes /= count1;
                        self.stats_vs.middellange_passes /= count1;
                        self.stats_vs.lange_passes /= count1;
                        self.stats_vs.perc_korte_passes /= count1;
                        self.stats_vs.perc_middellange_passes /= count1;
                        self.stats_vs.perc_lange_passes /= count1;
                        self.stats_vs.succesvolle_uittrappen /= count1;

                        $timeout(function () {
                            self.chart_keeper.datasets[0].label = self.player_stats.spelerNaam || 'Huidige speler';
                            self.chart_keeper.datasets[1].label = player_stats_temp1.spelerNaam;
                            self.chart_keeper.datasets[1].data = [self.stats_vs.geslaagde_reddingen.toFixed(1), self.stats_vs.passzekerheid.toFixed(1), self.stats_vs.succesvolle_uittrappen.toFixed(1), self.stats_vs.perc_korte_passes.toFixed(1), self.stats_vs.perc_middellange_passes.toFixed(1), self.stats_vs.perc_lange_passes.toFixed(1)];
                        }, 400);
                    } else {
                        self.stats_vs.doelpunten /= count1;
                        self.stats_vs.doelpogingen /= count1;
                        self.stats_vs.doelpogingen_opdoel /= count1;
                        self.stats_vs.aantal_passes /= count1;
                        self.stats_vs.verdedigende_duels /= count1;
                        self.stats_vs.aanvallende_duels /= count1;
                        self.stats_vs.perc_verdedigende_duels /= count1;
                        self.stats_vs.perc_aanvallende_duels /= count1;
                        self.stats_vs.intercepties /= count1;
                        self.stats_vs.overtredingen /= count1;
                        self.stats_vs.gewonnen_duels /= count1;

                        $timeout(function () {
                            self.chart_player.datasets[0].label = self.player_stats.spelerNaam || 'Huidige speler';
                            self.chart_player.datasets[1].label = player_stats_temp1.spelerNaam;
                            self.chart_player.datasets[1].data = [self.stats_vs.doelpogingen_opdoel.toFixed(1), self.stats_vs.passzekerheid.toFixed(1), self.stats_vs.gewonnen_duels.toFixed(1), self.stats_vs.perc_verdedigende_duels.toFixed(1), self.stats_vs.perc_aanvallende_duels.toFixed(1)];
                        }, 400);
                    }
                } else {
                    var player_stats_temp2 = angular.copy($filter('filter')(self.player_data, {playerID: player_id}, true)[0]);
                    var season_matches_temp2 = $filter('orderBy')(($filter('filter')( player_stats_temp2.matches, {season: self.season_index}, true)[0]).match, self.orderMatches);

                    Api.SpelersID.query({
                        _id: player_id
                    },function(res1) {
                        angular.forEach(res1, function(value, key) {
                            if (value.spelerPhoto && !self.player_stats.spelerPhoto && self.season_index.indexOf(value.seizoen.substring(8,9)) >= 0){
                                player_stats.spelerPhoto = value.spelerPhoto;
                            }
                        });
                    });

                    statslength = season_matches_temp2.length;
                    var temp01 = season_matches_temp2[0].ronde;
                    if (temp01 !== 1) {
                        for (var ij = 1; ij < temp01; ij++) {
                            var temp001 = {};
                            temp001.ronde = ij;
                            season_matches_temp2.push(temp001);
                        }
                        season_matches_temp2 = $filter('orderBy')(season_matches_temp2, self.orderMatches);
                    }
                    for (var j1 = 0; j1 < statslength; j1++) {
                        if ((j1+1) != season_matches_temp2[j1].ronde) {
                            var tempp1 = {};
                            tempp1.ronde = j1+1;

                            season_matches_temp2.push(tempp1);
                        }
                        season_matches_temp2 = $filter('orderBy')(season_matches_temp2, self.orderMatches);
                        statslength = season_matches_temp2.length;
                    }

                    if (season_matches_temp2.length > 0) {
                        if (isNaN(season_matches_temp2[self.roundfilter() - 1].pass_percentage)) {
                            self.stats_vs.passzekerheid = 0;
                        } else {
                            self.stats_vs.passzekerheid = season_matches_temp2[self.roundfilter() - 1].pass_percentage;
                        }

                        if (isNaN(season_matches_temp2[self.roundfilter() - 1].pass_lengte)) {
                            self.stats_vs.pass_lengte = 0;
                        } else {
                            self.stats_vs.pass_lengte = season_matches_temp2[self.roundfilter() - 1].pass_lengte;
                        }

                        self.stats_vs.geel = season_matches_temp2[self.roundfilter() - 1].geel;

                        self.stats_vs.rood = season_matches_temp2[self.roundfilter() - 1].rood;

                        if (self.player_stats.spelerType == 'keeper') {
                            self.stats_vs.doelpunten_tegen = season_matches_temp2[self.roundfilter() - 1].doelpunten_tegen;

                            self.stats_vs.reddingen = season_matches_temp2[self.roundfilter() - 1].reddingen;

                            self.stats_vs.gevangen_ballen = season_matches_temp2[self.roundfilter() - 1].gevangen_ballen;

                            self.stats_vs.weggestompte_ballen = season_matches_temp2[self.roundfilter() - 1].weggestompte_ballen;

                            if (isNaN(season_matches_temp2[self.roundfilter() - 1].geslaagde_reddingen)) {
                                self.stats_vs.geslaagde_reddingen = 0;
                            } else {
                                self.stats_vs.geslaagde_reddingen = season_matches_temp2[self.roundfilter() - 1].geslaagde_reddingen;
                            }

                            self.stats_vs.korte_passes = season_matches_temp2[self.roundfilter() - 1].korte_passes;
                            self.stats_vs.middellange_passes = season_matches_temp2[self.roundfilter() - 1].middellange_passes;
                            self.stats_vs.lange_passes = season_matches_temp2[self.roundfilter() - 1].lange_passes;
                            self.stats_vs.perc_korte_passes = 100 * (season_matches_temp2[self.roundfilter() - 1].korte_passes / (season_matches_temp2[self.roundfilter() - 1].korte_passes + season_matches_temp2[self.roundfilter() - 1].middellange_passes + season_matches_temp2[self.roundfilter() - 1].lange_passes));
                            self.stats_vs.perc_middellange_passes = 100 * (season_matches_temp2[self.roundfilter() - 1].middellange_passes / (season_matches_temp2[self.roundfilter() - 1].korte_passes + season_matches_temp2[self.roundfilter() - 1].middellange_passes + season_matches_temp2[self.roundfilter() - 1].lange_passes));
                            self.stats_vs.perc_lange_passes = 100 * (season_matches_temp2[self.roundfilter() - 1].lange_passes / (season_matches_temp2[self.roundfilter() - 1].korte_passes + season_matches_temp2[self.roundfilter() - 1].middellange_passes + season_matches_temp2[self.roundfilter() - 1].lange_passes));

                            if (isNaN(season_matches_temp2[self.roundfilter() - 1].succesvolle_uittrappen)) {
                                self.stats_vs.succesvolle_uittrappen = 0;
                            } else {
                                self.stats_vs.succesvolle_uittrappen = season_matches_temp2[self.roundfilter() - 1].succesvolle_uittrappen;
                            }

                            $timeout(function () {
                                self.chart_keeper.datasets[0].label = self.player_stats.spelerNaam || 'Huidige speler';
                                self.chart_keeper.datasets[1].label = player_stats_temp.spelerNaam;
                                self.chart_keeper.datasets[1].data = [self.stats_vs.geslaagde_reddingen.toFixed(1), self.stats_vs.passzekerheid.toFixed(1), self.stats_vs.succesvolle_uittrappen.toFixed(1), self.stats_vs.perc_korte_passes.toFixed(1), self.stats_vs.perc_middellange_passes.toFixed(1), self.stats_vs.perc_lange_passes.toFixed(1)];
                            }, 400);
                        } else {
                            self.stats_vs.doelpunten = season_matches_temp2[self.roundfilter() - 1].doelpunten;

                            self.stats_vs.doelpogingen = season_matches_temp2[self.roundfilter() - 1].doelpogingen;

                            if (isNaN(season_matches_temp2[self.roundfilter() - 1].doelpogingen_opdoel)) {
                                self.stats_vs.doelpogingen_opdoel = 0;
                            } else {
                                self.stats_vs.doelpogingen_opdoel = Number(season_matches_temp2[self.roundfilter() - 1].doelpogingen_opdoel);
                            }

                            self.stats_vs.aantal_passes = season_matches_temp2[self.roundfilter() - 1].aantal_passes;

                            self.stats_vs.verdedigende_duels = season_matches_temp2[self.roundfilter() - 1].verdedigende_duels;
                            self.stats_vs.aanvallende_duels = season_matches_temp2[self.roundfilter() - 1].aanvallende_duels;
                            self.stats_vs.perc_verdedigende_duels = 100 * (season_matches_temp2[self.roundfilter() - 1].verdedigende_duels / (season_matches_temp2[self.roundfilter() - 1].verdedigende_duels + season_matches_temp2[self.roundfilter() - 1].aanvallende_duels));
                            self.stats_vs.perc_aanvallende_duels = 100 * (season_matches_temp2[self.roundfilter() - 1].aanvallende_duels / (season_matches_temp2[self.roundfilter() - 1].verdedigende_duels + season_matches_temp2[self.roundfilter() - 1].aanvallende_duels));

                            self.stats_vs.intercepties = season_matches_temp2[self.roundfilter() - 1].intercepties;

                            self.stats_vs.overtredingen = season_matches_temp2[self.roundfilter() - 1].overtredingen;

                            if (isNaN(season_matches_temp2[self.roundfilter() - 1].gewonnen_duels)) {
                                self.stats_vs.gewonnen_duels = 0;
                            } else {
                                self.stats_vs.gewonnen_duels = season_matches_temp2[self.roundfilter() - 1].gewonnen_duels;
                            }

                            $timeout(function () {
                                self.chart_player.datasets[0].label = self.player_stats.spelerNaam || 'Huidige speler';
                                self.chart_player.datasets[1].label = player_stats_temp.spelerNaam;
                                self.chart_player.datasets[1].data = [self.stats_vs.doelpogingen_opdoel.toFixed(1), self.stats_vs.passzekerheid.toFixed(1), self.stats_vs.gewonnen_duels.toFixed(1), self.stats_vs.perc_verdedigende_duels.toFixed(1), self.stats_vs.perc_aanvallende_duels.toFixed(1)];
                            }, 400);
                        }
                    }
                }
            }
                /*
            } else if (self.vs == 'Gemiddelde team ronde') {
                if (self.player_data && self.season_index) {
                    count2 = 0;

                    self.stats_vs.passzekerheid = 0;
                    self.stats_vs.pass_lengte = 0;
                    self.stats_vs.geel = 0;
                    self.stats_vs.rood = 0;
                    if (self.player_stats.spelerType == 'keeper') {
                        self.stats_vs.doelpunten_tegen = 0;
                        self.stats_vs.reddingen = 0;
                        self.stats_vs.gevangen_ballen = 0;
                        self.stats_vs.weggestompte_ballen = 0;
                        self.stats_vs.geslaagde_reddingen = 0;
                        self.stats_vs.korte_passes = 0;
                        self.stats_vs.middellange_passes = 0;
                        self.stats_vs.lange_passes = 0;
                        self.stats_vs.perc_korte_passes = 0;
                        self.stats_vs.perc_middellange_passes = 0;
                        self.stats_vs.perc_lange_passes = 0;
                        self.stats_vs.succesvolle_uittrappen = 0;
                    } else {
                        self.stats_vs.doelpunten = 0;
                        self.stats_vs.doelpogingen = 0;
                        self.stats_vs.doelpogingen_opdoel = 0;
                        self.stats_vs.aantal_passes = 0;
                        self.stats_vs.verdedigende_duels = 0;
                        self.stats_vs.aanvallende_duels = 0;
                        self.stats_vs.perc_verdedigende_duels = 0;
                        self.stats_vs.perc_aanvallende_duels = 0;
                        self.stats_vs.intercepties = 0;
                        self.stats_vs.overtredingen = 0;
                        self.stats_vs.gewonnen_duels = 0;
                    }

                    angular.forEach(self.player_data, function(value, key) {
                        if ($filter('filter')(value.matches, {season: self.season_index}, true)[0] && value.spelerType == self.player_stats.spelerType) {
                            var stats_vs_temp1 = $filter('orderBy')(($filter('filter')(value.matches, {season: self.season_index}, true)[0]).match, self.orderMatches);

                            statslength = stats_vs_temp1.length;
                            var temp0 = stats_vs_temp1[0].ronde;
                            if (temp0 !== 1) {
                                for (var i = 1; i < temp0; i++) {
                                    var temp1 = {};
                                    temp1.ronde = i;
                                    stats_vs_temp1.push(temp1);
                                }
                                stats_vs_temp1 = $filter('orderBy')(stats_vs_temp1, self.orderMatches);
                            }

                            if (stats_vs_temp1[self.roundfilter() - 1]) {
                                var temp = {};

                                if (isNaN(stats_vs_temp1[self.roundfilter() - 1].pass_percentage)) {
                                    temp.passzekerheid = 0;
                                } else {
                                    temp.passzekerheid = stats_vs_temp1[self.roundfilter() - 1].pass_percentage;
                                }

                                if (isNaN(stats_vs_temp1[self.roundfilter() - 1].pass_lengte)) {
                                    temp.pass_lengte = 0;
                                } else {
                                    temp.pass_lengte = stats_vs_temp1[self.roundfilter() - 1].pass_lengte;
                                }

                                temp.geel = stats_vs_temp1[self.roundfilter() - 1].geel;

                                temp.rood = stats_vs_temp1[self.roundfilter() - 1].rood;

                                if (self.player_stats.spelerType == 'keeper') {
                                    temp.doelpunten_tegen = stats_vs_temp1[self.roundfilter() - 1].doelpunten_tegen;

                                    temp.reddingen = stats_vs_temp1[self.roundfilter() - 1].reddingen;

                                    temp.gevangen_ballen = stats_vs_temp1[self.roundfilter() - 1].gevangen_ballen;

                                    temp.weggestompte_ballen = stats_vs_temp1[self.roundfilter() - 1].weggestompte_ballen;

                                    if (isNaN(stats_vs_temp1[self.roundfilter() - 1].geslaagde_reddingen)) {
                                        temp.geslaagde_reddingen = 0;
                                    } else {
                                        temp.geslaagde_reddingen = stats_vs_temp1[self.roundfilter() - 1].geslaagde_reddingen;
                                    }

                                    temp.korte_passes = stats_vs_temp1[self.roundfilter() - 1].korte_passes;
                                    temp.middellange_passes = stats_vs_temp1[self.roundfilter() - 1].middellange_passes;
                                    temp.lange_passes = stats_vs_temp1[self.roundfilter() - 1].lange_passes;
                                    temp.perc_korte_passes = 100 * (stats_vs_temp1[self.roundfilter() - 1].korte_passes / (stats_vs_temp1[self.roundfilter() - 1].korte_passes + stats_vs_temp1[self.roundfilter() - 1].middellange_passes + stats_vs_temp1[self.roundfilter() - 1].lange_passes));
                                    temp.perc_middellange_passes = 100 * (stats_vs_temp1[self.roundfilter() - 1].middellange_passes / (stats_vs_temp1[self.roundfilter() - 1].korte_passes + stats_vs_temp1[self.roundfilter() - 1].middellange_passes + stats_vs_temp1[self.roundfilter() - 1].lange_passes));
                                    temp.perc_lange_passes = 100 * (stats_vs_temp1[self.roundfilter() - 1].lange_passes / (stats_vs_temp1[self.roundfilter() - 1].korte_passes + stats_vs_temp1[self.roundfilter() - 1].middellange_passes + stats_vs_temp1[self.roundfilter() - 1].lange_passes));

                                    if (isNaN(stats_vs_temp1[self.roundfilter() - 1].succesvolle_uittrappen)) {
                                        temp.succesvolle_uittrappen = 0;
                                    } else {
                                        temp.succesvolle_uittrappen = stats_vs_temp1[self.roundfilter() - 1].succesvolle_uittrappen;
                                    }
                                } else {
                                    temp.doelpunten = stats_vs_temp1[self.roundfilter() - 1].doelpunten;

                                    temp.doelpogingen = stats_vs_temp1[self.roundfilter() - 1].doelpogingen;

                                    if (isNaN(stats_vs_temp1[self.roundfilter() - 1].doelpogingen_opdoel)) {
                                        temp.doelpogingen_opdoel = 0;
                                    } else {
                                        temp.doelpogingen_opdoel = Number(stats_vs_temp1[self.roundfilter() - 1].doelpogingen_opdoel);
                                    }

                                    temp.aantal_passes = stats_vs_temp1[self.roundfilter() - 1].aantal_passes;

                                    temp.verdedigende_duels = stats_vs_temp1[self.roundfilter() - 1].verdedigende_duels;
                                    temp.aanvallende_duels = stats_vs_temp1[self.roundfilter() - 1].aanvallende_duels;
                                    temp.perc_verdedigende_duels = 100 * (stats_vs_temp1[self.roundfilter() - 1].verdedigende_duels / (stats_vs_temp1[self.roundfilter() - 1].verdedigende_duels + stats_vs_temp1[self.roundfilter() - 1].aanvallende_duels));
                                    temp.perc_aanvallende_duels = 100 * (stats_vs_temp1[self.roundfilter() - 1].aanvallende_duels / (stats_vs_temp1[self.roundfilter() - 1].verdedigende_duels + stats_vs_temp1[self.roundfilter() - 1].aanvallende_duels));

                                    temp.intercepties = stats_vs_temp1[self.roundfilter() - 1].intercepties;

                                    temp.overtredingen = stats_vs_temp1[self.roundfilter() - 1].overtredingen;

                                    if (isNaN(stats_vs_temp1[self.roundfilter() - 1].gewonnen_duels)) {
                                        temp.gewonnen_duels = 0;
                                    } else {
                                        temp.gewonnen_duels = stats_vs_temp1[self.roundfilter() - 1].gewonnen_duels;
                                    }
                                }

                                self.stats_vs.passzekerheid += temp.passzekerheid;
                                self.stats_vs.pass_lengte += temp.pass_lengte;
                                self.stats_vs.geel += temp.geel;
                                self.stats_vs.rood += temp.rood;
                                if (self.player_stats.spelerType == 'keeper') {
                                    self.stats_vs.doelpunten_tegen += temp.doelpunten_tegen;
                                    self.stats_vs.reddingen += temp.reddingen;
                                    self.stats_vs.gevangen_ballen += temp.gevangen_ballen;
                                    self.stats_vs.weggestompte_ballen += temp.weggestompte_ballen;
                                    self.stats_vs.geslaagde_reddingen += temp.geslaagde_reddingen;
                                    self.stats_vs.korte_passes += temp.korte_passes;
                                    self.stats_vs.middellange_passes += temp.middellange_passes;
                                    self.stats_vs.lange_passes += temp.lange_passes;
                                    self.stats_vs.perc_korte_passes += temp.perc_korte_passes;
                                    self.stats_vs.perc_middellange_passes += temp.perc_middellange_passes;
                                    self.stats_vs.perc_lange_passes += temp.perc_lange_passes;
                                    self.stats_vs.succesvolle_uittrappen += temp.succesvolle_uittrappen;
                                } else {
                                    self.stats_vs.doelpunten += temp.doelpunten;
                                    self.stats_vs.doelpogingen += temp.doelpogingen;
                                    self.stats_vs.doelpogingen_opdoel += temp.doelpogingen_opdoel;
                                    self.stats_vs.aantal_passes += temp.aantal_passes;
                                    self.stats_vs.verdedigende_duels += temp.verdedigende_duels;
                                    self.stats_vs.aanvallende_duels += temp.aanvallende_duels;
                                    self.stats_vs.perc_verdedigende_duels += temp.perc_verdedigende_duels;
                                    self.stats_vs.perc_aanvallende_duels += temp.perc_aanvallende_duels;
                                    self.stats_vs.intercepties += temp.intercepties;
                                    self.stats_vs.overtredingen += temp.overtredingen;
                                    self.stats_vs.gewonnen_duels += temp.gewonnen_duels;
                                }

                                count2++;
                            }
                        }
                    });

                    self.stats_vs.passzekerheid /= count2;
                    self.stats_vs.pass_lengte /= count2;
                    self.stats_vs.geel /= count2;
                    self.stats_vs.rood /= count2;
                    if (self.player_stats.spelerType == 'keeper') {
                        self.stats_vs.doelpunten_tegen /= count2;
                        self.stats_vs.reddingen /= count2;
                        self.stats_vs.gevangen_ballen /= count2;
                        self.stats_vs.weggestompte_ballen /= count2;
                        self.stats_vs.geslaagde_reddingen /= count2;
                        self.stats_vs.korte_passes /= count2;
                        self.stats_vs.middellange_passes /= count2;
                        self.stats_vs.lange_passes /= count2;
                        self.stats_vs.perc_korte_passes /= count2;
                        self.stats_vs.perc_middellange_passes /= count2;
                        self.stats_vs.perc_lange_passes /= count2;
                        self.stats_vs.succesvolle_uittrappen /= count2;

                        $timeout(function () {
                            self.chart_keeper.datasets[0].label = self.player_stats.spelerNaam || 'Huidige speler';
                            self.chart_keeper.datasets[1].label = self.vs;
                            self.chart_keeper.datasets[1].data = [self.stats_vs.geslaagde_reddingen.toFixed(1), self.stats_vs.passzekerheid.toFixed(1), self.stats_vs.succesvolle_uittrappen.toFixed(1), self.stats_vs.perc_korte_passes.toFixed(1), self.stats_vs.perc_middellange_passes.toFixed(1), self.stats_vs.perc_lange_passes.toFixed(1)];
                        }, 400);
                    } else {
                        self.stats_vs.doelpunten /= count2;
                        self.stats_vs.doelpogingen /= count2;
                        self.stats_vs.doelpogingen_opdoel /= count2;
                        self.stats_vs.aantal_passes /= count2;
                        self.stats_vs.verdedigende_duels /= count2;
                        self.stats_vs.aanvallende_duels /= count2;
                        self.stats_vs.perc_verdedigende_duels /= count2;
                        self.stats_vs.perc_aanvallende_duels /= count2;
                        self.stats_vs.intercepties /= count2;
                        self.stats_vs.overtredingen /= count2;
                        self.stats_vs.gewonnen_duels /= count2;

                        $timeout(function () {
                            self.chart_player.datasets[0].label = self.player_stats.spelerNaam || 'Huidige speler';
                            self.chart_player.datasets[1].label = self.vs;
                            self.chart_player.datasets[1].data = [self.stats_vs.doelpogingen_opdoel.toFixed(1), self.stats_vs.passzekerheid.toFixed(1), self.stats_vs.gewonnen_duels.toFixed(1), self.stats_vs.perc_verdedigende_duels.toFixed(1), self.stats_vs.perc_aanvallende_duels.toFixed(1)];
                        }, 400);
                    }
                }
            } else if (self.vs == 'Gemiddelde team seizoen') {
                if (self.player_data && self.season_index) {
                    count2 = 0;

                    self.stats_vs.passzekerheid = 0;
                    self.stats_vs.pass_lengte = 0;
                    self.stats_vs.geel = 0;
                    self.stats_vs.rood = 0;
                    if (self.player_stats.spelerType == 'keeper') {
                        self.stats_vs.doelpunten_tegen = 0;
                        self.stats_vs.reddingen = 0;
                        self.stats_vs.gevangen_ballen = 0;
                        self.stats_vs.weggestompte_ballen = 0;
                        self.stats_vs.geslaagde_reddingen = 0;
                        self.stats_vs.korte_passes = 0;
                        self.stats_vs.middellange_passes = 0;
                        self.stats_vs.lange_passes = 0;
                        self.stats_vs.perc_korte_passes = 0;
                        self.stats_vs.perc_middellange_passes = 0;
                        self.stats_vs.perc_lange_passes = 0;
                        self.stats_vs.succesvolle_uittrappen = 0;
                    } else {
                        self.stats_vs.doelpunten = 0;
                        self.stats_vs.doelpogingen = 0;
                        self.stats_vs.doelpogingen_opdoel = 0;
                        self.stats_vs.aantal_passes = 0;
                        self.stats_vs.verdedigende_duels = 0;
                        self.stats_vs.aanvallende_duels = 0;
                        self.stats_vs.perc_verdedigende_duels = 0;
                        self.stats_vs.perc_aanvallende_duels = 0;
                        self.stats_vs.intercepties = 0;
                        self.stats_vs.overtredingen = 0;
                        self.stats_vs.gewonnen_duels = 0;
                    }

                    angular.forEach(self.player_data, function(value, key) {
                        if ($filter('filter')(value.matches, {season: self.season_index}, true)[0] && value.spelerType == self.player_stats.spelerType) {
                            var stats_vs_temp2 = $filter('orderBy')(($filter('filter')(value.matches, {season: self.season_index}, true)[0]).match, self.orderMatches);
                            var temp = {};

                            statslength = stats_vs_temp2.length;
                            count1 = 0;

                            temp.passzekerheid = 0;
                            temp.pass_lengte = 0;
                            temp.geel = 0;
                            temp.rood = 0;
                            if (self.player_stats.spelerType == 'keeper') {
                                temp.doelpunten_tegen = 0;
                                temp.reddingen = 0;
                                temp.gevangen_ballen = 0;
                                temp.weggestompte_ballen = 0;
                                temp.geslaagde_reddingen = 0;
                                temp.korte_passes = 0;
                                temp.middellange_passes = 0;
                                temp.lange_passes = 0;
                                temp.perc_korte_passes = 0;
                                temp.perc_middellange_passes = 0;
                                temp.perc_lange_passes = 0;
                                temp.succesvolle_uittrappen = 0;
                            } else {
                                temp.doelpunten = 0;
                                temp.doelpogingen = 0;
                                temp.doelpogingen_opdoel = 0;
                                temp.aantal_passes = 0;
                                temp.verdedigende_duels = 0;
                                temp.aanvallende_duels = 0;
                                temp.perc_verdedigende_duels = 0;
                                temp.perc_aanvallende_duels = 0;
                                temp.intercepties = 0;
                                temp.overtredingen = 0;
                                temp.gewonnen_duels = 0;
                            }

                            for (i = 0; i < statslength; i++) {
                                if (stats_vs_temp2[i]) {
                                    if (isNaN(stats_vs_temp2[i].pass_percentage)) {
                                        temp.passzekerheid += 0;
                                    } else {
                                        temp.passzekerheid += stats_vs_temp2[i].pass_percentage;
                                    }

                                    if (isNaN(stats_vs_temp2[i].pass_lengte)) {
                                        temp.pass_lengte += 0;
                                    } else {
                                        temp.pass_lengte += stats_vs_temp2[i].pass_lengte;
                                    }

                                    temp.geel += stats_vs_temp2[i].geel;
                                    temp.rood += stats_vs_temp2[i].rood;

                                    if (self.player_stats.spelerType == 'keeper') {
                                        temp.doelpunten_tegen += stats_vs_temp2[i].doelpunten_tegen;
                                        temp.reddingen += stats_vs_temp2[i].reddingen;
                                        temp.gevangen_ballen += stats_vs_temp2[i].gevangen_ballen;
                                        temp.weggestompte_ballen += stats_vs_temp2[i].weggestompte_ballen;

                                        if (isNaN(stats_vs_temp2[i].geslaagde_reddingen)) {
                                            temp.geslaagde_reddingen += 0;
                                        } else {
                                            temp.geslaagde_reddingen += stats_vs_temp2[i].geslaagde_reddingen;
                                        }

                                        temp.korte_passes += stats_vs_temp2[i].korte_passes;
                                        temp.middellange_passes += stats_vs_temp2[i].middellange_passes;
                                        temp.lange_passes += stats_vs_temp2[i].lange_passes;
                                        temp.perc_korte_passes += 100 * (stats_vs_temp2[i].korte_passes / (stats_vs_temp2[i].korte_passes + stats_vs_temp2[i].middellange_passes + stats_vs_temp2[i].lange_passes));
                                        temp.perc_middellange_passes += 100 * (stats_vs_temp2[i].middellange_passes / (stats_vs_temp2[i].korte_passes + stats_vs_temp2[i].middellange_passes + stats_vs_temp2[i].lange_passes));
                                        temp.perc_lange_passes += 100 * (stats_vs_temp2[i].lange_passes / (stats_vs_temp2[i].korte_passes + stats_vs_temp2[i].middellange_passes + stats_vs_temp2[i].lange_passes));

                                        if (isNaN(stats_vs_temp2[i].succesvolle_uittrappen)) {
                                            temp.succesvolle_uittrappen += 0;
                                        } else {
                                            temp.succesvolle_uittrappen += stats_vs_temp2[i].succesvolle_uittrappen;
                                        }
                                    } else {
                                        temp.doelpunten += stats_vs_temp2[i].doelpunten;
                                        temp.doelpogingen += stats_vs_temp2[i].doelpogingen;

                                        if (isNaN(stats_vs_temp2[i].doelpogingen_opdoel)) {
                                            temp.doelpogingen_opdoel += 0;
                                        } else {
                                            temp.doelpogingen_opdoel += Number(stats_vs_temp2[i].doelpogingen_opdoel);
                                        }

                                        temp.aantal_passes += stats_vs_temp2[i].aantal_passes;
                                        temp.verdedigende_duels += stats_vs_temp2[i].verdedigende_duels;
                                        temp.aanvallende_duels += stats_vs_temp2[i].aanvallende_duels;
                                        temp.perc_verdedigende_duels += 100 * (stats_vs_temp2[i].verdedigende_duels / (stats_vs_temp2[i].verdedigende_duels + stats_vs_temp2[i].aanvallende_duels));
                                        temp.perc_aanvallende_duels += 100 * (stats_vs_temp2[i].aanvallende_duels / (stats_vs_temp2[i].verdedigende_duels + stats_vs_temp2[i].aanvallende_duels));
                                        temp.intercepties += stats_vs_temp2[i].intercepties;
                                        temp.overtredingen += stats_vs_temp2[i].overtredingen;

                                        if (isNaN(stats_vs_temp2[i].gewonnen_duels)) {
                                            temp.gewonnen_duels += 0;
                                        } else {
                                            temp.gewonnen_duels += stats_vs_temp2[i].gewonnen_duels;
                                        }
                                    }

                                    count1++;
                                }
                            }

                            temp.passzekerheid /= count1;
                            temp.pass_lengte /= count1;
                            temp.geel /= count1;
                            temp.rood /= count1;
                            if (self.player_stats.spelerType == 'keeper') {
                                temp.doelpunten_tegen /= count1;
                                temp.reddingen /= count1;
                                temp.gevangen_ballen /= count1;
                                temp.weggestompte_ballen /= count1;
                                temp.geslaagde_reddingen /= count1;
                                temp.korte_passes /= count1;
                                temp.middellange_passes /= count1;
                                temp.lange_passes /= count1;
                                temp.perc_korte_passes /= count1;
                                temp.perc_middellange_passes /= count1;
                                temp.perc_lange_passes /= count1;
                                temp.succesvolle_uittrappen /= count1;
                            } else {
                                temp.doelpunten /= count1;
                                temp.doelpogingen /= count1;
                                temp.doelpogingen_opdoel /= count1;
                                temp.aantal_passes /= count1;
                                temp.verdedigende_duels /= count1;
                                temp.aanvallende_duels /= count1;
                                temp.perc_verdedigende_duels /= count1;
                                temp.perc_aanvallende_duels /= count1;
                                temp.intercepties /= count1;
                                temp.overtredingen /= count1;
                                temp.gewonnen_duels /= count1;
                            }

                            self.stats_vs.passzekerheid += temp.passzekerheid;
                            self.stats_vs.pass_lengte += temp.pass_lengte;
                            self.stats_vs.geel += temp.geel;
                            self.stats_vs.rood += temp.rood;
                            if (self.player_stats.spelerType == 'keeper') {
                                self.stats_vs.doelpunten_tegen += temp.doelpunten_tegen;
                                self.stats_vs.reddingen += temp.reddingen;
                                self.stats_vs.gevangen_ballen += temp.gevangen_ballen;
                                self.stats_vs.weggestompte_ballen += temp.weggestompte_ballen;
                                self.stats_vs.geslaagde_reddingen += temp.geslaagde_reddingen;
                                self.stats_vs.korte_passes += temp.korte_passes;
                                self.stats_vs.middellange_passes += temp.middellange_passes;
                                self.stats_vs.lange_passes += temp.lange_passes;
                                self.stats_vs.perc_korte_passes += temp.perc_korte_passes;
                                self.stats_vs.perc_middellange_passes += temp.perc_middellange_passes;
                                self.stats_vs.perc_lange_passes += temp.perc_lange_passes;
                                self.stats_vs.succesvolle_uittrappen += temp.succesvolle_uittrappen;
                            } else {
                                self.stats_vs.doelpunten += temp.doelpunten;
                                self.stats_vs.doelpogingen += temp.doelpogingen;
                                self.stats_vs.doelpogingen_opdoel += temp.doelpogingen_opdoel;
                                self.stats_vs.aantal_passes += temp.aantal_passes;
                                self.stats_vs.verdedigende_duels += temp.verdedigende_duels;
                                self.stats_vs.aanvallende_duels += temp.aanvallende_duels;
                                self.stats_vs.perc_verdedigende_duels += temp.perc_verdedigende_duels;
                                self.stats_vs.perc_aanvallende_duels += temp.perc_aanvallende_duels;
                                self.stats_vs.intercepties += temp.intercepties;
                                self.stats_vs.overtredingen += temp.overtredingen;
                                self.stats_vs.gewonnen_duels += temp.gewonnen_duels;
                            }

                            count2++;
                        }
                    });

                    self.stats_vs.passzekerheid /= count2;
                    self.stats_vs.pass_lengte /= count2;
                    self.stats_vs.geel /= count2;
                    self.stats_vs.rood /= count2;
                    if (self.player_stats.spelerType == 'keeper') {
                        self.stats_vs.doelpunten_tegen /= count2;
                        self.stats_vs.reddingen /= count2;
                        self.stats_vs.gevangen_ballen /= count2;
                        self.stats_vs.weggestompte_ballen /= count2;
                        self.stats_vs.geslaagde_reddingen /= count2;
                        self.stats_vs.korte_passes /= count2;
                        self.stats_vs.middellange_passes /= count2;
                        self.stats_vs.lange_passes /= count2;
                        self.stats_vs.perc_korte_passes /= count2;
                        self.stats_vs.perc_middellange_passes /= count2;
                        self.stats_vs.perc_lange_passes /= count2;
                        self.stats_vs.succesvolle_uittrappen /= count2;

                        $timeout(function () {
                            self.chart_keeper.datasets[0].label = self.player_stats.spelerNaam || 'Huidige speler';
                            self.chart_keeper.datasets[1].label = self.vs;
                            self.chart_keeper.datasets[1].data = [self.stats_vs.geslaagde_reddingen.toFixed(1), self.stats_vs.passzekerheid.toFixed(1), self.stats_vs.succesvolle_uittrappen.toFixed(1), self.stats_vs.perc_korte_passes.toFixed(1), self.stats_vs.perc_middellange_passes.toFixed(1), self.stats_vs.perc_lange_passes.toFixed(1)];
                        }, 400);
                    } else {
                        self.stats_vs.doelpunten /= count2;
                        self.stats_vs.doelpogingen /= count2;
                        self.stats_vs.doelpogingen_opdoel /= count2;
                        self.stats_vs.aantal_passes /= count2;
                        self.stats_vs.verdedigende_duels /= count2;
                        self.stats_vs.aanvallende_duels /= count2;
                        self.stats_vs.perc_verdedigende_duels /= count2;
                        self.stats_vs.perc_aanvallende_duels /= count2;
                        self.stats_vs.intercepties /= count2;
                        self.stats_vs.overtredingen /= count2;
                        self.stats_vs.gewonnen_duels /= count2;

                        $timeout(function () {
                            self.chart_player.datasets[0].label = self.player_stats.spelerNaam || 'Huidige speler';
                            self.chart_player.datasets[1].label = self.vs;
                            self.chart_player.datasets[1].data = [self.stats_vs.doelpogingen_opdoel.toFixed(1), self.stats_vs.passzekerheid.toFixed(1), self.stats_vs.gewonnen_duels.toFixed(1), self.stats_vs.perc_verdedigende_duels.toFixed(1), self.stats_vs.perc_aanvallende_duels.toFixed(1)];
                        }, 400);
                    }
                }
            }*/
        };
        self.vs = self.playerID;
        self.vs_info = 'Gemiddelde seizoen';
        self.vsInitFunc();

        $rootScope.infoSaveLog = '';
        self.savePlayerLog = function () {
            $rootScope.infoSaveLog = '';
            Api.TeamDataItem.put({
                _slug: self._id
            }, {
                player_data: self.player_data,
                date_edited: self.datetime
            }, function (res) {
                $rootScope.infoSaveLog = 'Opgeslagen';
            });
        };
        self.playerlogtemp = '';
        $rootScope.infoAddPlayerLog = '';
        self.addPlayerLog = function () {
            var editor_name;
            if ($rootScope.currentUser.middle_name) {
                editor_name = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.middle_name + ' ' + $rootScope.currentUser.last_name;
            } else {
                editor_name = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.last_name;
            }

            $rootScope.infoAddPlayerLog = '';
            var logtemp = {};
            logtemp.pub_date = new Date();
            logtemp.author = editor_name;
            logtemp.text = self.playerlogtemp;
            self.match.player_log.push(logtemp);

            Api.TeamDataItem.put({
                _slug: self._id
            }, {
                player_data: self.player_data,
                date_edited: self.datetime
            }, function (res) {
                $rootScope.infoAddPlayerLog = 'Opgeslagen';
            });
        };

        $scope.$watch('round', function() {
            $timeout(function () {
                $('.content-players-select .round').css('margin-left', $('.content-players-select .slider-control .slider .ui-slider-range').width() );
            }, 0);

            self.match = $filter('filter')(self.season_matches, {ronde: $scope.round}, true)[0];

            $timeout(function () {
                if (self.season_matches.length > 0) {
                    if (isNaN(self.season_matches[self.roundfilter() - 1].pass_percentage)) {
                        self.stats.passzekerheid = 0;
                    } else {
                        self.stats.passzekerheid = self.season_matches[self.roundfilter() - 1].pass_percentage;
                    }

                    if (isNaN(self.season_matches[self.roundfilter() - 1].pass_lengte)) {
                        self.stats.pass_lengte = 0;
                    } else {
                        self.stats.pass_lengte = self.season_matches[self.roundfilter() - 1].pass_lengte;
                    }

                    self.stats.geel = self.season_matches[self.roundfilter() - 1].geel;

                    self.stats.rood = self.season_matches[self.roundfilter() - 1].rood;

                    if (self.player_stats.spelerType == 'keeper') {
                        self.stats.doelpunten_tegen = self.season_matches[self.roundfilter() - 1].doelpunten_tegen;

                        self.stats.reddingen = self.season_matches[self.roundfilter() - 1].reddingen;

                        self.stats.gevangen_ballen = self.season_matches[self.roundfilter() - 1].gevangen_ballen;

                        self.stats.weggestompte_ballen = self.season_matches[self.roundfilter() - 1].weggestompte_ballen;

                        if (isNaN(self.season_matches[self.roundfilter() - 1].geslaagde_reddingen)) {
                            self.stats.geslaagde_reddingen = 0;
                        } else {
                            self.stats.geslaagde_reddingen = self.season_matches[self.roundfilter() - 1].geslaagde_reddingen;
                        }

                        self.stats.korte_passes = self.season_matches[self.roundfilter() - 1].korte_passes;
                        self.stats.middellange_passes = self.season_matches[self.roundfilter() - 1].middellange_passes;
                        self.stats.lange_passes = self.season_matches[self.roundfilter() - 1].lange_passes;
                        self.stats.perc_korte_passes = 100 * (self.season_matches[self.roundfilter() - 1].korte_passes / (self.season_matches[self.roundfilter() - 1].korte_passes + self.season_matches[self.roundfilter() - 1].middellange_passes + self.season_matches[self.roundfilter() - 1].lange_passes));
                        self.stats.perc_middellange_passes = 100 * (self.season_matches[self.roundfilter() - 1].middellange_passes / (self.season_matches[self.roundfilter() - 1].korte_passes + self.season_matches[self.roundfilter() - 1].middellange_passes + self.season_matches[self.roundfilter() - 1].lange_passes));
                        self.stats.perc_lange_passes = 100 * (self.season_matches[self.roundfilter() - 1].lange_passes / (self.season_matches[self.roundfilter() - 1].korte_passes + self.season_matches[self.roundfilter() - 1].middellange_passes + self.season_matches[self.roundfilter() - 1].lange_passes));

                        if (isNaN(self.season_matches[self.roundfilter() - 1].succesvolle_uittrappen)) {
                            self.stats.succesvolle_uittrappen = 0;
                        } else {
                            self.stats.succesvolle_uittrappen = self.season_matches[self.roundfilter() - 1].succesvolle_uittrappen;
                        }

                        $timeout(function () {
                            self.chart_keeper.datasets[0].data = [self.stats.geslaagde_reddingen.toFixed(1), self.stats.passzekerheid.toFixed(1), self.stats.succesvolle_uittrappen.toFixed(1), self.stats.perc_korte_passes.toFixed(1), self.stats.perc_middellange_passes.toFixed(1), self.stats.perc_lange_passes.toFixed(1)];
                        }, 400);
                    } else {
                        self.stats.doelpunten = self.season_matches[self.roundfilter() - 1].doelpunten;

                        self.stats.doelpogingen = self.season_matches[self.roundfilter() - 1].doelpogingen;

                        if (isNaN(self.season_matches[self.roundfilter() - 1].doelpogingen_opdoel)) {
                            self.stats.doelpogingen_opdoel = 0;
                        } else {
                            self.stats.doelpogingen_opdoel = Number(self.season_matches[self.roundfilter() - 1].doelpogingen_opdoel);
                        }

                        self.stats.aantal_passes = self.season_matches[self.roundfilter() - 1].aantal_passes;

                        self.stats.verdedigende_duels = self.season_matches[self.roundfilter() - 1].verdedigende_duels;
                        self.stats.aanvallende_duels = self.season_matches[self.roundfilter() - 1].aanvallende_duels;
                        self.stats.perc_verdedigende_duels = 100 * (self.season_matches[self.roundfilter() - 1].verdedigende_duels / (self.season_matches[self.roundfilter() - 1].verdedigende_duels + self.season_matches[self.roundfilter() - 1].aanvallende_duels));
                        self.stats.perc_aanvallende_duels = 100 * (self.season_matches[self.roundfilter() - 1].aanvallende_duels / (self.season_matches[self.roundfilter() - 1].verdedigende_duels + self.season_matches[self.roundfilter() - 1].aanvallende_duels));

                        self.stats.intercepties = self.season_matches[self.roundfilter() - 1].intercepties;

                        self.stats.overtredingen = self.season_matches[self.roundfilter() - 1].overtredingen;

                        if (isNaN(self.season_matches[self.roundfilter() - 1].gewonnen_duels)) {
                            self.stats.gewonnen_duels = 0;
                        } else {
                            self.stats.gewonnen_duels = self.season_matches[self.roundfilter() - 1].gewonnen_duels;
                        }

                        $timeout(function () {
                            self.chart_player.datasets[0].data = [self.stats.doelpogingen_opdoel.toFixed(1), self.stats.passzekerheid.toFixed(1), self.stats.gewonnen_duels.toFixed(1), self.stats.perc_verdedigende_duels.toFixed(1), self.stats.perc_aanvallende_duels.toFixed(1)];
                        }, 500);
                    }
                }
            }, 200);
        }, true);

        $timeout(function () {
            if (self.player_stats.spelerType !== 'keeper') {
                // Chart.js Data
                self.chart_player = {
                    labels: ['Schotzekerheid %', 'Passzekerheid %', 'Gewonnen duels %', '% verdedigende duels', '% aanvallende duels'],
                    datasets: [
                        {
                            label: self.player_stats.spelerNaam || 'Huidige speler',
                            fillColor: 'rgba(3,125,201,0.1)',
                            strokeColor: 'rgba(3,125,201,0.8)',
                            pointColor: '#037dc9',
                            pointStrokeColor: '#fff',
                            pointHighlightFill: '#fff',
                            pointHighlightStroke: '#037dc9',
                            //data: []
                            data: [self.stats.doelpogingen_opdoel.toFixed(1), self.stats.passzekerheid.toFixed(1), self.stats.gewonnen_duels.toFixed(1), self.stats.perc_verdedigende_duels.toFixed(1), self.stats.perc_aanvallende_duels.toFixed(1)]
                        },
                        {
                            label: self.vs_naam,
                            fillColor: 'rgba(151,151,151,0.1)',
                            strokeColor: 'rgba(151,151,151,0.8)',
                            pointColor: '#979797',
                            pointStrokeColor: '#fff',
                            pointHighlightFill: '#fff',
                            pointHighlightStroke: '#979797',
                            data: [self.stats_vs.doelpogingen_opdoel.toFixed(1), self.stats_vs.passzekerheid.toFixed(1), self.stats_vs.gewonnen_duels.toFixed(1), self.stats_vs.perc_verdedigende_duels.toFixed(1), self.stats_vs.perc_aanvallende_duels.toFixed(1)]
                        }
                    ]
                };
            }
            if (self.player_stats.spelerType == 'keeper') {
                self.chart_keeper = {
                    labels: ['Geslaagde reddingen %', 'Passzekerheid %', 'Succesvolle uittrappen %', '% korte passes', '% middellange passes', '% lange passes'],
                    datasets: [
                        {
                            label: self.player_stats.spelerNaam,
                            fillColor: 'rgba(3,125,201,0.2)',
                            strokeColor: 'rgba(3,125,201,0.8)',
                            pointColor: '#037dc9',
                            pointStrokeColor: '#fff',
                            pointHighlightFill: '#fff',
                            pointHighlightStroke: '#037dc9',
                            data: [self.stats.geslaagde_reddingen.toFixed(1), self.stats.passzekerheid.toFixed(1), self.stats.succesvolle_uittrappen.toFixed(1), self.stats.perc_korte_passes.toFixed(1), self.stats.perc_middellange_passes.toFixed(1), self.stats.perc_lange_passes.toFixed(1)]
                        },
                        {
                            label: self.vs_naam,
                            fillColor: 'rgba(151,151,151,0.2)',
                            strokeColor: 'rgba(151,151,151,0.8)',
                            pointColor: '#979797',
                            pointStrokeColor: '#fff',
                            pointHighlightFill: '#fff',
                            pointHighlightStroke: '#979797',
                            data: [self.stats_vs.geslaagde_reddingen.toFixed(1), self.stats_vs.passzekerheid.toFixed(1), self.stats_vs.succesvolle_uittrappen.toFixed(1), self.stats_vs.perc_korte_passes.toFixed(1), self.stats_vs.perc_middellange_passes.toFixed(1), self.stats_vs.perc_lange_passes.toFixed(1)]
                        }
                    ]
                };
            }

            self.legend_player = '';
            self.legend_keeper = '';
            // Chart.js Options
            self.options = {
                // Sets the chart to be responsive
                responsive: true,

                //Boolean - Whether to show lines for each scale point
                scaleShowLine: true,

                //Boolean - Whether we show the angle lines out of the radar
                angleShowLineOut: true,

                //Boolean - Whether to show labels on the scale
                scaleShowLabels: false,

                // Boolean - Whether the scale should begin at zero
                scaleBeginAtZero: true,

                //String - Colour of the angle line
                angleLineColor: 'rgba(0,0,0,.1)',

                //Number - Pixel width of the angle line
                angleLineWidth: 1,

                //String - Point label font declaration
                pointLabelFontFamily: '"Helvetica"',

                //String - Point label font weight
                pointLabelFontStyle: 'normal',

                //Number - Point label font size in pixels
                pointLabelFontSize: 14,

                //String - Point label font colour
                pointLabelFontColor: '#037dc9',

                //Boolean - Whether to show a dot for each point
                pointDot: true,

                //Number - Radius of each point dot in pixels
                pointDotRadius: 3,

                //Number - Pixel width of point dot stroke
                pointDotStrokeWidth: 1,

                //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
                pointHitDetectionRadius: 20,

                //Boolean - Whether to show a stroke for datasets
                datasetStroke: true,

                //Number - Pixel width of dataset stroke
                datasetStrokeWidth: 2,

                //Boolean - Whether to fill the dataset with a colour
                datasetFill: true,

                //String - A legend template
                legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li style="color:<%=datasets[i].strokeColor%>"><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
            };
        }, 500);

        /*
        var self = this;

        self.orderMatches = 'ronde';
        self.player_stats = {};
        self.season_matches = [];
        self.matches_played = 0;
        $scope.rounds = [1, 1];

        if ((!$routeParams.playerid || $routeParams.playerid === '') && $rootScope.currentClub && $rootScope.currentClub.teams[0].team_slug) {
            $location.path('/spelers/' + $rootScope.currentClub.teams[0].team_slug);
        } else if ((!$routeParams.playerid || $routeParams.playerid === '') && (!$rootScope.currentClub || !$rootScope.currentClub.teams[0].team_slug)) {
            $location.path('/404');
        } else {
            if ( ($rootScope.currentClub && $rootScope.currentClub.teams[0] && $rootScope.currentClub.teams[0].team_slug !== $routeParams.team_slug) && ($rootScope.currentClub && $rootScope.currentClub.teams[1] && $rootScope.currentClub.teams[1].team_slug !== $routeParams.team_slug) && $sessionStorage.role !== 'admin' ) {
                $location.path('/404');
            }

            Api.TeamDataItem.get({
                _slug: $routeParams.team_slug
            }, function (res) {
                self._id = res._id;
                self.player_data = res.player_data;

                self.team_name = res.team_name;
                self.club_name = res.club_name;
                self.divisie = res.divisie;
                self.playerID = Number($routeParams.playerid);

                self.player_stats = $filter('filter')(self.player_data, {playerID: self.playerID}, true)[0];
                self.season_index = self.player_stats.matches[self.player_stats.matches.length - 1].season;
                self.season_matches = $filter('orderBy')(($filter('filter')( self.player_stats.matches, {season: self.season_index}, true)[0]).match, self.orderMatches);

                if (self.player_stats.spelerType == 'keeper') {
                    self.clean_sheets = 0;
                    for (var c = self.season_matches.length - 1; c >= 0; c--) {
                        if (self.season_matches[c].doelpunten_tegen === 0) {
                            self.clean_sheets += 1;
                        } else {
                            break;
                        }
                    }
                }

                self.matches_played = self.season_matches.length;
                var statslength = self.season_matches.length;

                // set match to last on rounds interval
                self.match_index = self.season_matches[statslength - 1].matchID;
                self.match = {};
                self.match = $filter('filter')(self.season_matches, {matchID: self.match_index}, true)[0];

                var temp0 = self.season_matches[0].ronde;
                var temp1 = self.season_matches[statslength - 1].ronde;
                if (temp0 !== 1) {
                    for (var i = 1; i < temp0; i++) {
                        var temp = {};
                        temp.ronde = i;
                        self.season_matches.push(temp);
                    }
                    self.season_matches = $filter('orderBy')(self.season_matches, self.orderMatches);
                }
                $timeout(function () {
                    angular.element(document).ready(function () {
                        $('.slider-control .slider').slider({
                            range: true,
                            min: temp0,
                            values: $scope.rounds
                            //max: temp1
                        });
                    });
                }, 400);
                if (temp0 == temp1) {
                    $scope.rounds = [temp0, temp1];
                } else if ((temp1 - temp0) <= 0) {
                    $scope.rounds = [temp0, temp1];
                } else if ((temp1 - 5) <= 0) {
                    if (temp1 - temp0 < 4) {
                        $scope.rounds = [temp0, temp1];
                    } else {
                        $scope.rounds = [1];
                        $scope.rounds.push(temp1);
                    }
                } else if ((temp1 - 5) > 0) {
                    if (temp1 - temp0 < 4) {
                        $scope.rounds = [temp0, temp1];
                    } else {
                        $scope.rounds = [temp1 - 5];
                        $scope.rounds.push(temp1);
                    }
                } else {
                    $scope.rounds = [1, 1];
                }
            }, function() {
                $location.path('/404');
            });
        }

        self.seasonInitFunc = function () {
            $scope.rounds = [1, 1];
            if (self.player_stats && self.season_index) {
                self.season_matches = $filter('orderBy')(($filter('filter')(self.player_stats.matches, {season: self.season_index}, true)[0]).match, self.orderMatches);

                if (self.player_stats.spelerType == 'keeper') {
                    self.clean_sheets = 0;
                    for (var c = self.season_matches.length - 1; c >= 0; c--) {
                        if (self.season_matches[c].doelpunten_tegen === 0) {
                            self.clean_sheets += 1;
                        } else {
                            break;
                        }
                    }
                }

                self.matches_played = self.season_matches.length;
                var statslength = self.season_matches.length;

                // set match to last on rounds interval
                self.match_index = self.season_matches[statslength - 1].matchID;
                self.match = {};
                self.match = $filter('filter')(self.season_matches, {matchID: self.match_index}, true)[0];

                var temp0 = self.season_matches[0].ronde;
                var temp1 = self.season_matches[statslength - 1].ronde;
                if (temp0 !== 1) {
                    for (var i = 1; i < temp0; i++) {
                        var temp = {};
                        temp.ronde = i;
                        self.season_matches.push(temp);
                    }
                    self.season_matches = $filter('orderBy')(self.season_matches, self.orderMatches);
                }
                $timeout(function () {
                    angular.element(document).ready(function () {
                        $('.slider-control .slider').slider({
                            range: true,
                            min: temp0,
                            values: $scope.rounds
                            //max: temp1
                        });
                    });
                }, 400);
                if (temp0 == temp1) {
                    $scope.rounds = [temp0, temp1];
                } else if ((temp1 - temp0) <= 0) {
                    $scope.rounds = [temp0, temp1];
                } else if ((temp1 - 5) <= 0) {
                    if (temp1 - temp0 < 4) {
                        $scope.rounds = [temp0, temp1];
                    } else {
                        $scope.rounds = [1];
                        $scope.rounds.push(temp1);
                    }
                } else if ((temp1 - 5) > 0) {
                    if (temp1 - temp0 < 4) {
                        $scope.rounds = [temp0, temp1];
                    } else {
                        $scope.rounds = [temp1 - 5];
                        $scope.rounds.push(temp1);
                    }
                } else {
                    $scope.rounds = [1, 1];
                }
            }
        };

        self.matchInitFunc = function () {
            self.match = {};
            self.match = $filter('filter')(self.season_matches, {matchID: self.match_index}, true)[0];
        };

        $rootScope.infoSaveLog = '';
        self.savePlayerLog = function () {
            $rootScope.infoSaveLog = '';
            Api.TeamDataItem.put({
                _slug: self._id
            }, {
                player_data: self.player_data,
                date_edited: self.datetime
            }, function (res) {
                $rootScope.infoSaveLog = 'Opgeslagen';
            });
        };
        self.playerlogtemp = '';
        $rootScope.infoAddPlayerLog = '';
        self.addPlayerLog = function () {
            var editor_name;
            if ($rootScope.currentUser.middle_name) {
                editor_name = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.middle_name + ' ' + $rootScope.currentUser.last_name;
            } else {
                editor_name = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.last_name;
            }

            $rootScope.infoAddPlayerLog = '';
            var logtemp = {};
            logtemp.pub_date = new Date();
            logtemp.author = editor_name;
            logtemp.text = self.playerlogtemp;
            self.match.player_log.push(logtemp);

            Api.TeamDataItem.put({
                _slug: self._id
            }, {
                player_data: self.player_data,
                date_edited: self.datetime
            }, function (res) {
                $rootScope.infoAddPlayerLog = 'Opgeslagen';
            });
        };

        self.roundsfilterfrom = function () {
            return $scope.rounds[0];
        };
        self.roundsfilterto = function () {
            return $scope.rounds[1];
        };

        self.stats = {};
        $scope.$watch('rounds', function() {
            $timeout(function () {
                if (self.season_matches.length > 0) {
                    var i;
                    if (self.roundsfilterfrom() !== self.roundsfilterto()) {
                        self.stats.passzekerheid = 0;
                        self.stats.passzekerheidArr = [];
                        self.stats.passzekerheidArr.push('data2');
                        for (i = self.roundsfilterfrom() - 1; i < self.roundsfilterto(); i++) {
                            if (isNaN(self.season_matches[i].pass_percentage)) {
                                self.stats.passzekerheidArr.push(0);
                            } else {
                                self.stats.passzekerheid += Number(self.season_matches[i].pass_percentage);
                                self.stats.passzekerheidArr.push(Number(self.season_matches[i].pass_percentage));
                            }
                        }
                        self.stats.passzekerheid /= (self.roundsfilterto() - self.roundsfilterfrom() + 1);
                        self.stats.geel = 0;
                        self.stats.geelArr = [];
                        self.stats.geelArr.push('data1');
                        for (i = self.roundsfilterfrom() - 1; i < self.roundsfilterto(); i++) {
                            self.stats.geel += self.season_matches[i].geel;
                            self.stats.geelArr.push(self.season_matches[i].geel);
                        }
                        self.stats.rood = 0;
                        self.stats.roodArr = [];
                        self.stats.roodArr.push('data2');
                        for (i = self.roundsfilterfrom() - 1; i < self.roundsfilterto(); i++) {
                            self.stats.rood += self.season_matches[i].rood;
                            self.stats.roodArr.push(self.season_matches[i].rood);
                        }
                        self.stats.xAxis = [];
                        self.stats.xAxis.push('x');
                        for (i = self.roundsfilterfrom(); i <= self.roundsfilterto(); i++) {
                            self.stats.xAxis.push(i);
                        }

                        if (self.player_stats.spelerType == 'keeper') {
                            self.stats.doelpunten_tegen = 0;
                            self.stats.doelpunten_tegenArr = [];
                            self.stats.doelpunten_tegenArr.push('data1');
                            for (i = self.roundsfilterfrom() - 1; i < self.roundsfilterto(); i++) {
                                self.stats.doelpunten_tegen += self.season_matches[i].doelpunten_tegen;
                                self.stats.doelpunten_tegenArr.push(self.season_matches[i].doelpunten_tegen);
                            }
                            self.stats.reddingen = 0;
                            self.stats.reddingenArr = [];
                            self.stats.reddingenArr.push('data2');
                            for (i = self.roundsfilterfrom() - 1; i < self.roundsfilterto(); i++) {
                                self.stats.reddingen += self.season_matches[i].reddingen;
                                self.stats.reddingenArr.push(self.season_matches[i].reddingen);
                            }
                            self.stats.gevangen_ballen = 0;
                            self.stats.gevangen_ballenArr = [];
                            self.stats.gevangen_ballenArr.push('data3');
                            for (i = self.roundsfilterfrom() - 1; i < self.roundsfilterto(); i++) {
                                self.stats.gevangen_ballen += self.season_matches[i].gevangen_ballen;
                                self.stats.gevangen_ballenArr.push(self.season_matches[i].gevangen_ballen);
                            }
                            self.stats.weggestompte_ballen = 0;
                            self.stats.weggestompte_ballenArr = [];
                            self.stats.weggestompte_ballenArr.push('data4');
                            for (i = self.roundsfilterfrom() - 1; i < self.roundsfilterto(); i++) {
                                self.stats.weggestompte_ballen += self.season_matches[i].weggestompte_ballen;
                                self.stats.weggestompte_ballenArr.push(self.season_matches[i].weggestompte_ballen);
                            }
                            self.stats.geslaagde_reddingen = 0;
                            self.stats.geslaagde_reddingenArr = [];
                            self.stats.geslaagde_reddingenArr.push('data1');
                            for (i = self.roundsfilterfrom() - 1; i < self.roundsfilterto(); i++) {
                                if (isNaN(self.season_matches[i].geslaagde_reddingen)) {
                                    self.stats.geslaagde_reddingenArr.push(0);
                                } else {
                                    self.stats.geslaagde_reddingen += Number(self.season_matches[i].geslaagde_reddingen);
                                    self.stats.geslaagde_reddingenArr.push(Number(self.season_matches[i].geslaagde_reddingen));
                                }
                            }
                            self.stats.geslaagde_reddingen /= (self.roundsfilterto() - self.roundsfilterfrom() + 1);
                            self.stats.korte_passes = 0;
                            self.stats.korte_passesArr = [];
                            self.stats.korte_passesArr.push('data1');
                            for (i = self.roundsfilterfrom() - 1; i < self.roundsfilterto(); i++) {
                                self.stats.korte_passes += self.season_matches[i].korte_passes;
                                self.stats.korte_passesArr.push(self.season_matches[i].korte_passes);
                            }
                            self.stats.middellange_passes = 0;
                            self.stats.middellange_passesArr = [];
                            self.stats.middellange_passesArr.push('data2');
                            for (i = self.roundsfilterfrom() - 1; i < self.roundsfilterto(); i++) {
                                self.stats.middellange_passes += self.season_matches[i].middellange_passes;
                                self.stats.middellange_passesArr.push(self.season_matches[i].middellange_passes);
                            }
                            self.stats.lange_passes = 0;
                            self.stats.lange_passesArr = [];
                            self.stats.lange_passesArr.push('data3');
                            for (i = self.roundsfilterfrom() - 1; i < self.roundsfilterto(); i++) {
                                self.stats.lange_passes += self.season_matches[i].lange_passes;
                                self.stats.lange_passesArr.push(self.season_matches[i].lange_passes);
                            }
                            self.stats.pass_lengte = 0;
                            self.stats.pass_lengteArr = [];
                            self.stats.pass_lengteArr.push('data4');
                            for (i = self.roundsfilterfrom() - 1; i < self.roundsfilterto(); i++) {
                                if (isNaN(self.season_matches[i].pass_lengte)) {
                                    self.stats.pass_lengteArr.push(0);
                                } else {
                                    self.stats.pass_lengte += Number(self.season_matches[i].pass_lengte);
                                    self.stats.pass_lengteArr.push(Number(self.season_matches[i].pass_lengte));
                                }
                            }
                            self.stats.pass_lengte /= (self.roundsfilterto() - self.roundsfilterfrom() + 1);
                            self.stats.succesvolle_uittrappen = 0;
                            self.stats.succesvolle_uittrappenArr = [];
                            self.stats.succesvolle_uittrappenArr.push('data3');
                            for (i = self.roundsfilterfrom() - 1; i < self.roundsfilterto(); i++) {
                                if (isNaN(self.season_matches[i].succesvolle_uittrappen)) {
                                    self.stats.succesvolle_uittrappenArr.push(0);
                                } else {
                                    self.stats.succesvolle_uittrappen += Number(self.season_matches[i].succesvolle_uittrappen);
                                    self.stats.succesvolle_uittrappenArr.push(Number(self.season_matches[i].succesvolle_uittrappen));
                                }
                            }
                            self.stats.succesvolle_uittrappen /= (self.roundsfilterto() - self.roundsfilterfrom() + 1);

                            self.showGraph2();
                            self.showGraph4();
                            self.showGraph6();
                        } else {
                            self.stats.doelpunten = 0;
                            self.stats.doelpuntenArr = [];
                            self.stats.doelpuntenArr.push('data1');
                            for (i = self.roundsfilterfrom() - 1; i < self.roundsfilterto(); i++) {
                                self.stats.doelpunten += self.season_matches[i].doelpunten;
                                self.stats.doelpuntenArr.push(self.season_matches[i].doelpunten);
                            }
                            self.stats.doelpogingen = 0;
                            self.stats.doelpogingenArr = [];
                            self.stats.doelpogingenArr.push('data2');
                            for (i = self.roundsfilterfrom() - 1; i < self.roundsfilterto(); i++) {
                                self.stats.doelpogingen += self.season_matches[i].doelpogingen;
                                self.stats.doelpogingenArr.push(self.season_matches[i].doelpogingen);
                            }
                            self.stats.doelpogingen_opdoel = 0;
                            self.stats.doelpogingen_opdoelArr = [];
                            self.stats.doelpogingen_opdoelArr.push('data1');
                            for (i = self.roundsfilterfrom() - 1; i < self.roundsfilterto(); i++) {
                                if (isNaN(self.season_matches[i].doelpogingen_opdoel)) {
                                    self.stats.doelpogingen_opdoelArr.push(0);
                                } else {
                                    self.stats.doelpogingen_opdoel += Number(self.season_matches[i].doelpogingen_opdoel);
                                    self.stats.doelpogingen_opdoelArr.push(Number(self.season_matches[i].doelpogingen_opdoel));
                                }
                            }
                            self.stats.doelpogingen_opdoel /= (self.roundsfilterto() - self.roundsfilterfrom() + 1);
                            self.stats.aantal_passes = 0;
                            self.stats.aantal_passesArr = [];
                            self.stats.aantal_passesArr.push('data1');
                            for (i = self.roundsfilterfrom() - 1; i < self.roundsfilterto(); i++) {
                                self.stats.aantal_passes += self.season_matches[i].aantal_passes;
                                self.stats.aantal_passesArr.push(self.season_matches[i].aantal_passes);
                            }
                            self.stats.pass_lengte = 0;
                            self.stats.pass_lengteArr = [];
                            self.stats.pass_lengteArr.push('data2');
                            for (i = self.roundsfilterfrom() - 1; i < self.roundsfilterto(); i++) {
                                if (isNaN(self.season_matches[i].pass_lengte)) {
                                    self.stats.pass_lengteArr.push(0);
                                } else {
                                    self.stats.pass_lengte += Number(self.season_matches[i].pass_lengte);
                                    self.stats.pass_lengteArr.push(Number(self.season_matches[i].pass_lengte));
                                }
                            }
                            self.stats.pass_lengte /= (self.roundsfilterto() - self.roundsfilterfrom() + 1);
                            self.stats.verdedigende_duels = 0;
                            self.stats.verdedigende_duelsArr = [];
                            self.stats.verdedigende_duelsArr.push('data1');
                            for (i = self.roundsfilterfrom() - 1; i < self.roundsfilterto(); i++) {
                                self.stats.verdedigende_duels += self.season_matches[i].verdedigende_duels;
                                self.stats.verdedigende_duelsArr.push(self.season_matches[i].verdedigende_duels);
                            }
                            self.stats.aanvallende_duels = 0;
                            self.stats.aanvallende_duelsArr = [];
                            self.stats.aanvallende_duelsArr.push('data2');
                            for (i = self.roundsfilterfrom() - 1; i < self.roundsfilterto(); i++) {
                                self.stats.aanvallende_duels += self.season_matches[i].aanvallende_duels;
                                self.stats.aanvallende_duelsArr.push(self.season_matches[i].aanvallende_duels);
                            }
                            self.stats.intercepties = 0;
                            self.stats.interceptiesArr = [];
                            self.stats.interceptiesArr.push('data3');
                            for (i = self.roundsfilterfrom() - 1; i < self.roundsfilterto(); i++) {
                                self.stats.intercepties += self.season_matches[i].intercepties;
                                self.stats.interceptiesArr.push(self.season_matches[i].intercepties);
                            }
                            self.stats.overtredingen = 0;
                            self.stats.overtredingenArr = [];
                            self.stats.overtredingenArr.push('data4');
                            for (i = self.roundsfilterfrom() - 1; i < self.roundsfilterto(); i++) {
                                self.stats.overtredingen += self.season_matches[i].overtredingen;
                                self.stats.overtredingenArr.push(self.season_matches[i].overtredingen);
                            }
                            self.stats.gewonnen_duels = 0;
                            self.stats.gewonnen_duelsArr = [];
                            self.stats.gewonnen_duelsArr.push('data3');
                            for (i = self.roundsfilterfrom() - 1; i < self.roundsfilterto(); i++) {
                                if (isNaN(self.season_matches[i].gewonnen_duels)) {
                                    self.stats.gewonnen_duelsArr.push(0);
                                } else {
                                    self.stats.gewonnen_duels += Number(self.season_matches[i].gewonnen_duels);
                                    self.stats.gewonnen_duelsArr.push(Number(self.season_matches[i].gewonnen_duels));
                                }
                            }
                            self.stats.gewonnen_duels /= (self.roundsfilterto() - self.roundsfilterfrom() + 1);

                            self.showGraph1();
                            self.showGraph3();
                            self.showGraph5();
                            self.showGraph7();
                        }

                        self.showGraph8();
                    } else {
                        self.stats.passzekerheidArr = [];
                        self.stats.passzekerheidArr.push('data2');
                        if (isNaN(self.season_matches[self.roundsfilterfrom() - 1].pass_percentage)) {
                            self.stats.passzekerheid = 0;
                            self.stats.passzekerheidArr.push(0);
                        } else {
                            self.stats.passzekerheid = self.season_matches[self.roundsfilterfrom() - 1].pass_percentage;
                            self.stats.passzekerheidArr.push(Number(self.season_matches[self.roundsfilterfrom() - 1].pass_percentage));
                        }

                        self.stats.geel = self.season_matches[self.roundsfilterfrom() - 1].geel;
                        self.stats.geelArr = [];
                        self.stats.geelArr.push('data1');
                        self.stats.geelArr.push(self.season_matches[self.roundsfilterfrom() - 1].geel);

                        self.stats.rood = self.season_matches[self.roundsfilterfrom() - 1].rood;
                        self.stats.roodArr = [];
                        self.stats.roodArr.push('data2');
                        self.stats.roodArr.push(self.season_matches[self.roundsfilterfrom() - 1].rood);

                        self.stats.xAxis = [];
                        self.stats.xAxis.push('x');
                        self.stats.xAxis.push(self.roundsfilterfrom());

                        if (self.player_stats.spelerType == 'keeper') {
                            self.stats.doelpunten_tegen = self.season_matches[self.roundsfilterfrom() - 1].doelpunten_tegen;
                            self.stats.doelpunten_tegenArr = [];
                            self.stats.doelpunten_tegenArr.push('data1');
                            self.stats.doelpunten_tegenArr.push(self.season_matches[self.roundsfilterfrom() - 1].doelpunten_tegen);

                            self.stats.reddingen = self.season_matches[self.roundsfilterfrom() - 1].reddingen;
                            self.stats.reddingenArr = [];
                            self.stats.reddingenArr.push('data2');
                            self.stats.reddingenArr.push(self.season_matches[self.roundsfilterfrom() - 1].reddingen);

                            self.stats.gevangen_ballen = self.season_matches[self.roundsfilterfrom() - 1].gevangen_ballen;
                            self.stats.gevangen_ballenArr = [];
                            self.stats.gevangen_ballenArr.push('data3');
                            self.stats.gevangen_ballenArr.push(self.season_matches[self.roundsfilterfrom() - 1].gevangen_ballen);

                            self.stats.weggestompte_ballen = self.season_matches[self.roundsfilterfrom() - 1].weggestompte_ballen;
                            self.stats.weggestompte_ballenArr = [];
                            self.stats.weggestompte_ballenArr.push('data4');
                            self.stats.weggestompte_ballenArr.push(self.season_matches[self.roundsfilterfrom() - 1].weggestompte_ballen);

                            self.stats.geslaagde_reddingenArr = [];
                            self.stats.geslaagde_reddingenArr.push('data1');
                            if (isNaN(self.season_matches[self.roundsfilterfrom() - 1].geslaagde_reddingen)) {
                                self.stats.geslaagde_reddingen = 0;
                                self.stats.geslaagde_reddingenArr.push(0);
                            } else {
                                self.stats.geslaagde_reddingen = self.season_matches[self.roundsfilterfrom() - 1].geslaagde_reddingen;
                                self.stats.geslaagde_reddingenArr.push(Number(self.season_matches[self.roundsfilterfrom() - 1].geslaagde_reddingen));
                            }

                            self.stats.korte_passes = self.season_matches[self.roundsfilterfrom() - 1].korte_passes;
                            self.stats.korte_passesArr = [];
                            self.stats.korte_passesArr.push('data1');
                            self.stats.korte_passesArr.push(self.season_matches[self.roundsfilterfrom() - 1].korte_passes);

                            self.stats.middellange_passes = self.season_matches[self.roundsfilterfrom() - 1].middellange_passes;
                            self.stats.middellange_passesArr = [];
                            self.stats.middellange_passesArr.push('data2');
                            self.stats.middellange_passesArr.push(self.season_matches[self.roundsfilterfrom() - 1].middellange_passes);

                            self.stats.lange_passes = self.season_matches[self.roundsfilterfrom() - 1].lange_passes;
                            self.stats.lange_passesArr = [];
                            self.stats.lange_passesArr.push('data3');
                            self.stats.lange_passesArr.push(self.season_matches[self.roundsfilterfrom() - 1].lange_passes);

                            self.stats.pass_lengteArr = [];
                            self.stats.pass_lengteArr.push('data4');
                            if (isNaN(self.season_matches[self.roundsfilterfrom() - 1].pass_lengte)) {
                                self.stats.pass_lengte = 0;
                                self.stats.pass_lengteArr.push(0);
                            } else {
                                self.stats.pass_lengte = self.season_matches[self.roundsfilterfrom() - 1].pass_lengte;
                                self.stats.pass_lengteArr.push(Number(self.season_matches[self.roundsfilterfrom() - 1].pass_lengte));
                            }

                            self.stats.succesvolle_uittrappenArr = [];
                            self.stats.succesvolle_uittrappenArr.push('data3');
                            if (isNaN(self.season_matches[self.roundsfilterfrom() - 1].succesvolle_uittrappen)) {
                                self.stats.succesvolle_uittrappen = 0;
                                self.stats.succesvolle_uittrappenArr.push(0);
                            } else {
                                self.stats.succesvolle_uittrappen = self.season_matches[self.roundsfilterfrom() - 1].succesvolle_uittrappen;
                                self.stats.succesvolle_uittrappenArr.push(Number(self.season_matches[self.roundsfilterfrom() - 1].succesvolle_uittrappen));
                            }

                            self.showGraph2();
                            self.showGraph4();
                            self.showGraph6();
                        } else {
                            self.stats.doelpunten = self.season_matches[self.roundsfilterfrom() - 1].doelpunten;
                            self.stats.doelpuntenArr = [];
                            self.stats.doelpuntenArr.push('data1');
                            self.stats.doelpuntenArr.push(self.season_matches[self.roundsfilterfrom() - 1].doelpunten);

                            self.stats.doelpogingen = self.season_matches[self.roundsfilterfrom() - 1].doelpogingen;
                            self.stats.doelpogingenArr = [];
                            self.stats.doelpogingenArr.push('data2');
                            self.stats.doelpogingenArr.push(self.season_matches[self.roundsfilterfrom() - 1].doelpogingen);

                            self.stats.doelpogingen_opdoelArr = [];
                            self.stats.doelpogingen_opdoelArr.push('data1');
                            if (isNaN(self.season_matches[self.roundsfilterfrom() - 1].doelpogingen_opdoel)) {
                                self.stats.doelpogingen_opdoel = 0;
                                self.stats.doelpogingen_opdoelArr.push(0);
                            } else {
                                self.stats.doelpogingen_opdoel = Number(self.season_matches[self.roundsfilterfrom() - 1].doelpogingen_opdoel);
                                self.stats.doelpogingen_opdoelArr.push(Number(self.season_matches[self.roundsfilterfrom() - 1].doelpogingen_opdoel));
                            }

                            self.stats.aantal_passes = self.season_matches[self.roundsfilterfrom() - 1].aantal_passes;
                            self.stats.aantal_passesArr = [];
                            self.stats.aantal_passesArr.push('data1');
                            self.stats.aantal_passesArr.push(self.season_matches[self.roundsfilterfrom() - 1].aantal_passes);

                            self.stats.pass_lengteArr = [];
                            self.stats.pass_lengteArr.push('data2');
                            if (isNaN(self.season_matches[self.roundsfilterfrom() - 1].pass_lengte)) {
                                self.stats.pass_lengte = 0;
                                self.stats.pass_lengteArr.push(0);
                            } else {
                                self.stats.pass_lengte = self.season_matches[self.roundsfilterfrom() - 1].pass_lengte;
                                self.stats.pass_lengteArr.push(Number(self.season_matches[self.roundsfilterfrom() - 1].pass_lengte));
                            }

                            self.stats.verdedigende_duels = self.season_matches[self.roundsfilterfrom() - 1].verdedigende_duels;
                            self.stats.verdedigende_duelsArr = [];
                            self.stats.verdedigende_duelsArr.push('data1');
                            self.stats.verdedigende_duelsArr.push(self.season_matches[self.roundsfilterfrom() - 1].verdedigende_duels);

                            self.stats.aanvallende_duels = self.season_matches[self.roundsfilterfrom() - 1].aanvallende_duels;
                            self.stats.aanvallende_duelsArr = [];
                            self.stats.aanvallende_duelsArr.push('data2');
                            self.stats.aanvallende_duelsArr.push(self.season_matches[self.roundsfilterfrom() - 1].aanvallende_duels);

                            self.stats.intercepties = self.season_matches[self.roundsfilterfrom() - 1].intercepties;
                            self.stats.interceptiesArr = [];
                            self.stats.interceptiesArr.push('data3');
                            self.stats.interceptiesArr.push(self.season_matches[self.roundsfilterfrom() - 1].intercepties);

                            self.stats.overtredingen = self.season_matches[self.roundsfilterfrom() - 1].overtredingen;
                            self.stats.overtredingenArr = [];
                            self.stats.overtredingenArr.push('data4');
                            self.stats.overtredingenArr.push(self.season_matches[self.roundsfilterfrom() - 1].overtredingen);

                            self.stats.gewonnen_duelsArr = [];
                            self.stats.gewonnen_duelsArr.push('data3');
                            if (isNaN(self.season_matches[self.roundsfilterfrom() - 1].gewonnen_duels)) {
                                self.stats.gewonnen_duels = 0;
                                self.stats.gewonnen_duelsArr.push(0);
                            } else {
                                self.stats.gewonnen_duels = self.season_matches[self.roundsfilterfrom() - 1].gewonnen_duels;
                                self.stats.gewonnen_duelsArr.push(Number(self.season_matches[self.roundsfilterfrom() - 1].gewonnen_duels));
                            }

                            self.showGraph1();
                            self.showGraph3();
                            self.showGraph5();
                            self.showGraph7();
                        }

                        self.showGraph8();
                    }
                }
            }, 200);
        }, true);

        self.chartpercentages = null;
        self.showGraph1 = function() {
            if (self.season_matches.length > 0) {
                $timeout(function () {
                    self.chartpercentages = c3.generate({
                        bindto: '#chart-percentages',
                        data: {
                            xs: {
                                'data1': 'x',
                                'data2': 'x',
                                'data3': 'x'
                            },
                            columns: [
                                self.stats.xAxis,
                                self.stats.doelpogingen_opdoelArr,
                                self.stats.passzekerheidArr,
                                self.stats.gewonnen_duelsArr
                            ],
                            names: {
                                data1: 'Doelpogingen op doel (%)',
                                data2: 'Pass zekerheid (%)',
                                data3: 'Gewonnen duels (%)'
                            },
                            type: 'bar'
                        },
                        color: {
                            pattern: ['#18385F', '#4F81BC', '#979797']
                        },
                        axis: {
                            y: {
                                label: {
                                    text: 'Percentage (%)',
                                    position: 'outer-middle'
                                },
                                padding: {top: 0, bottom: 0},
                                min: 0,
                                max: 100,
                                tick: {
                                    format: d3.format("d")
                                }
                            },
                            x: {
                                label: {
                                    text: 'Ronde',
                                    position: 'outer-center'
                                }
                            }
                        }
                    });
                }, 500);
            }
        };
        self.chartpercentages2 = null;
        self.showGraph2 = function() {
            if (self.season_matches.length > 0) {
                $timeout(function () {
                    self.chartpercentages2 = c3.generate({
                        bindto: '#chart-percentages2',
                        data: {
                            xs: {
                                'data1': 'x',
                                'data2': 'x',
                                'data3': 'x'
                            },
                            columns: [
                                self.stats.xAxis,
                                self.stats.geslaagde_reddingenArr,
                                self.stats.passzekerheidArr,
                                self.stats.succesvolle_uittrappenArr
                            ],
                            names: {
                                data1: 'Geslaagde reddingen (%)',
                                data2: 'Pass zekerheid (%)',
                                data3: 'Succesvolle uittrappen (%)'
                            },
                            type: 'bar'
                        },
                        color: {
                            pattern: ['#18385F', '#4F81BC', '#979797']
                        },
                        axis: {
                            y: {
                                label: {
                                    text: 'Percentage (%)',
                                    position: 'outer-middle'
                                },
                                padding: {top: 0, bottom: 0},
                                min: 0,
                                max: 100,
                                tick: {
                                    format: d3.format("d")
                                }
                            },
                            x: {
                                label: {
                                    text: 'Ronde',
                                    position: 'outer-center'
                                }
                            }
                        }
                    });
                }, 500);
            }
        };
        self.chartgoals = null;
        self.showGraph3 = function() {
            if (self.season_matches.length > 0) {
                $timeout(function () {
                    self.chartgoals = c3.generate({
                        bindto: '#chart-goals',
                        data: {
                            xs: {
                                'data1': 'x',
                                'data2': 'x'
                            },
                            columns: [
                                self.stats.xAxis,
                                self.stats.doelpuntenArr,
                                self.stats.doelpogingenArr
                            ],
                            names: {
                                data1: 'Doelpunten',
                                data2: 'Doelpogingen'
                            }
                        },
                        color: {
                            pattern: ['#18385F', '#4F81BC', '#979797']
                        },
                        axis: {
                            y: {
                                label: {
                                    text: 'Aantal',
                                    position: 'outer-middle'
                                },
                                padding: {top: 10, bottom: 0},
                                min: 0,
                                tick: {
                                    format: d3.format("d"),
                                    values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
                                }
                            },
                            x: {
                                label: {
                                    text: 'Ronde',
                                    position: 'outer-center'
                                }
                            }
                        }
                    });
                }, 500);
            }
        };
        self.chartreddingen = null;
        self.showGraph4 = function() {
            if (self.season_matches.length > 0) {
                $timeout(function () {
                    self.chartreddingen = c3.generate({
                        bindto: '#chart-reddingen',
                        data: {
                            xs: {
                                'data1': 'x',
                                'data2': 'x',
                                'data3': 'x',
                                'data4': 'x'
                            },
                            columns: [
                                self.stats.xAxis,
                                self.stats.doelpunten_tegenArr,
                                self.stats.reddingenArr,
                                self.stats.gevangen_ballenArr,
                                self.stats.weggestompte_ballenArr
                            ],
                            names: {
                                data1: 'Doelpunten tegen',
                                data2: 'Reddingen',
                                data3: 'Gevangen ballen',
                                data4: 'Weggestompte ballen'
                            }
                        },
                        color: {
                            pattern: ['#18385F', '#4F81BC', '#979797', '#D22238']
                        },
                        axis: {
                            y: {
                                label: {
                                    text: 'Aantal',
                                    position: 'outer-middle'
                                },
                                padding: {top: 10, bottom: 0},
                                min: 0,
                                tick: {
                                    format: d3.format("d"),
                                    values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
                                }
                            },
                            x: {
                                label: {
                                    text: 'Ronde',
                                    position: 'outer-center'
                                }
                            }
                        }
                    });
                }, 500);
            }
        };
        self.chartpasses = null;
        self.showGraph5 = function() {
            if (self.season_matches.length > 0) {
                $timeout(function () {
                    self.chartpasses = c3.generate({
                        bindto: '#chart-passes',
                        data: {
                            xs: {
                                'data1': 'x',
                                'data2': 'x'
                            },
                            columns: [
                                self.stats.xAxis,
                                self.stats.aantal_passesArr,
                                self.stats.pass_lengteArr
                            ],
                            axes: {
                                data1: 'y',
                                data2: 'y2'
                            },
                            names: {
                                data1: 'Aantal passes',
                                data2: 'Pass lengte'
                            }
                        },
                        color: {
                            pattern: ['#18385F', '#4F81BC']
                        },
                        axis: {
                            y: {
                                label: {
                                    text: 'Aantal passes',
                                    position: 'outer-middle'
                                },
                                padding: {top: 10, bottom: 0},
                                min: 0,
                                tick: {
                                    format: d3.format("d")
                                }
                            },
                            y2: {
                                show: true,
                                label: {
                                    text: 'Pass lengte (in m)',
                                    position: 'outer-middle'
                                },
                                padding: {top: 10, bottom: 0},
                                min: 0,
                                tick: {
                                    format: d3.format("d")
                                }
                            },
                            x: {
                                label: {
                                    text: 'Ronde',
                                    position: 'outer-center'
                                }
                            }
                        }
                    });
                }, 500);
            }
        };
        self.chartpasses2 = null;
        self.showGraph6 = function() {
            if (self.season_matches.length > 0) {
                $timeout(function () {
                    self.chartpasses2 = c3.generate({
                        bindto: '#chart-passes2',
                        data: {
                            xs: {
                                'data1': 'x',
                                'data2': 'x',
                                'data3': 'x',
                                'data4': 'x'
                            },
                            columns: [
                                self.stats.xAxis,
                                self.stats.korte_passesArr,
                                self.stats.middellange_passesArr,
                                self.stats.lange_passesArr,
                                self.stats.pass_lengteArr
                            ],
                            axes: {
                                data1: 'y',
                                data2: 'y',
                                data3: 'y',
                                data4: 'y2'
                            },
                            names: {
                                data1: 'Korte passes',
                                data2: 'Middellange passes',
                                data3: 'Lange passes',
                                data4: 'Pass lengte'
                            }
                        },
                        color: {
                            pattern: ['#18385F', '#4F81BC', '#979797', '#D22238']
                        },
                        axis: {
                            y: {
                                label: {
                                    text: 'Aantal passes',
                                    position: 'outer-middle'
                                },
                                padding: {top: 10, bottom: 0},
                                min: 0,
                                tick: {
                                    format: d3.format("d")
                                }
                            },
                            y2: {
                                show: true,
                                label: {
                                    text: 'Pass lengte (in m)',
                                    position: 'outer-middle'
                                },
                                padding: {top: 10, bottom: 0},
                                min: 0,
                                tick: {
                                    format: d3.format("d")
                                }
                            },
                            x: {
                                label: {
                                    text: 'Ronde',
                                    position: 'outer-center'
                                }
                            }
                        }
                    });
                }, 500);
            }
        };
        self.chartactions = null;
        self.showGraph7 = function() {
            if (self.season_matches.length > 0) {
                $timeout(function () {
                    self.chartactions= c3.generate({
                        bindto: '#chart-actions',
                        data: {
                            xs: {
                                'data1': 'x',
                                'data2': 'x',
                                'data3': 'x',
                                'data4': 'x'
                            },
                            columns: [
                                self.stats.xAxis,
                                self.stats.verdedigende_duelsArr,
                                self.stats.aanvallende_duelsArr,
                                self.stats.interceptiesArr,
                                self.stats.overtredingenArr
                            ],
                            names: {
                                data1: 'Verdedigende duels',
                                data2: 'Aanvallende duels',
                                data3: 'Intercepties',
                                data4: 'Overtredingen'
                            }
                        },
                        color: {
                            pattern: ['#18385F', '#4F81BC', '#979797', '#D22238']
                        },
                        axis: {
                            y: {
                                label: {
                                    text: 'Aantal',
                                    position: 'outer-middle'
                                },
                                padding: {top: 10, bottom: 0},
                                min: 0,
                                tick: {
                                    format: d3.format("d")
                                }
                            },
                            x: {
                                label: {
                                    text: 'Ronde',
                                    position: 'outer-center'
                                }
                            }
                        }
                    });
                }, 500);
            }
        };
        self.chartgeel = null;
        self.showGraph8 = function() {
            if (self.season_matches.length > 0) {
                $timeout(function () {
                    self.chartgeel = c3.generate({
                        bindto: '#chart-geel',
                        data: {
                            xs: {
                                'data1': 'x',
                                'data2': 'x'
                            },
                            columns: [
                                self.stats.xAxis,
                                self.stats.geelArr,
                                self.stats.roodArr
                            ],
                            names: {
                                data1: 'Geel',
                                data2: 'Rood'
                            },
                            type: 'bar'
                        },
                        color: {
                            pattern: ['#ffcc00', '#ED1C24']
                        },
                        axis: {
                            y: {
                                label: {
                                    text: 'Aantal',
                                    position: 'outer-middle'
                                },
                                padding: {top: 0, bottom: 0},
                                min: 0,
                                tick: {
                                    format: d3.format("d")
                                }
                            },
                            x: {
                                label: {
                                    text: 'Ronde',
                                    position: 'outer-center'
                                }
                            }
                        }
                    });
                }, 500);
            }
        };
        */
    }]);