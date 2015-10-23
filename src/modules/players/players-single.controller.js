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
                            self.chart_keeper.datasets[1].label = self.player_stats.spelerNaam || 'Huidige speler';
                            self.chart_keeper.datasets[0].label = self.vs_naam;
                            self.chart_keeper.datasets[0].data = [self.stats_vs.geslaagde_reddingen.toFixed(1), self.stats_vs.passzekerheid.toFixed(1), self.stats_vs.succesvolle_uittrappen.toFixed(1), self.stats_vs.perc_korte_passes.toFixed(1), self.stats_vs.perc_middellange_passes.toFixed(1), self.stats_vs.perc_lange_passes.toFixed(1)];
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
                            self.chart_player.datasets[1].label = self.player_stats.spelerNaam || 'Huidige speler';
                            self.chart_player.datasets[0].label = self.vs_naam;
                            self.chart_player.datasets[0].data = [self.stats_vs.doelpogingen_opdoel.toFixed(1), self.stats_vs.passzekerheid.toFixed(1), self.stats_vs.gewonnen_duels.toFixed(1), self.stats_vs.perc_verdedigende_duels.toFixed(1), self.stats_vs.perc_aanvallende_duels.toFixed(1)];
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
                                self.chart_keeper.datasets[1].label = self.player_stats.spelerNaam || 'Huidige speler';
                                self.chart_keeper.datasets[0].label = player_stats_temp.spelerNaam;
                                self.chart_keeper.datasets[0].data = [self.stats_vs.geslaagde_reddingen.toFixed(1), self.stats_vs.passzekerheid.toFixed(1), self.stats_vs.succesvolle_uittrappen.toFixed(1), self.stats_vs.perc_korte_passes.toFixed(1), self.stats_vs.perc_middellange_passes.toFixed(1), self.stats_vs.perc_lange_passes.toFixed(1)];
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
                                self.chart_player.datasets[1].label = self.player_stats.spelerNaam || 'Huidige speler';
                                self.chart_player.datasets[0].label = player_stats_temp.spelerNaam;
                                self.chart_player.datasets[0].data = [self.stats_vs.doelpogingen_opdoel.toFixed(1), self.stats_vs.passzekerheid.toFixed(1), self.stats_vs.gewonnen_duels.toFixed(1), self.stats_vs.perc_verdedigende_duels.toFixed(1), self.stats_vs.perc_aanvallende_duels.toFixed(1)];
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
                            self.chart_keeper.datasets[1].label = self.player_stats.spelerNaam || 'Huidige speler';
                            self.chart_keeper.datasets[0].label = player_stats_temp1.spelerNaam;
                            self.chart_keeper.datasets[0].data = [self.stats_vs.geslaagde_reddingen.toFixed(1), self.stats_vs.passzekerheid.toFixed(1), self.stats_vs.succesvolle_uittrappen.toFixed(1), self.stats_vs.perc_korte_passes.toFixed(1), self.stats_vs.perc_middellange_passes.toFixed(1), self.stats_vs.perc_lange_passes.toFixed(1)];
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
                            self.chart_player.datasets[1].label = self.player_stats.spelerNaam || 'Huidige speler';
                            self.chart_player.datasets[0].label = player_stats_temp1.spelerNaam;
                            self.chart_player.datasets[0].data = [self.stats_vs.doelpogingen_opdoel.toFixed(1), self.stats_vs.passzekerheid.toFixed(1), self.stats_vs.gewonnen_duels.toFixed(1), self.stats_vs.perc_verdedigende_duels.toFixed(1), self.stats_vs.perc_aanvallende_duels.toFixed(1)];
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
                                self.chart_keeper.datasets[1].label = self.player_stats.spelerNaam || 'Huidige speler';
                                self.chart_keeper.datasets[0].label = player_stats_temp.spelerNaam;
                                self.chart_keeper.datasets[0].data = [self.stats_vs.geslaagde_reddingen.toFixed(1), self.stats_vs.passzekerheid.toFixed(1), self.stats_vs.succesvolle_uittrappen.toFixed(1), self.stats_vs.perc_korte_passes.toFixed(1), self.stats_vs.perc_middellange_passes.toFixed(1), self.stats_vs.perc_lange_passes.toFixed(1)];
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
                                self.chart_player.datasets[1].label = self.player_stats.spelerNaam || 'Huidige speler';
                                self.chart_player.datasets[0].label = player_stats_temp.spelerNaam;
                                self.chart_player.datasets[0].data = [self.stats_vs.doelpogingen_opdoel.toFixed(1), self.stats_vs.passzekerheid.toFixed(1), self.stats_vs.gewonnen_duels.toFixed(1), self.stats_vs.perc_verdedigende_duels.toFixed(1), self.stats_vs.perc_aanvallende_duels.toFixed(1)];
                            }, 400);
                        }
                    }
                }
            }
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
                            self.chart_keeper.datasets[1].data = [self.stats.geslaagde_reddingen.toFixed(1), self.stats.passzekerheid.toFixed(1), self.stats.succesvolle_uittrappen.toFixed(1), self.stats.perc_korte_passes.toFixed(1), self.stats.perc_middellange_passes.toFixed(1), self.stats.perc_lange_passes.toFixed(1)];
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
                            self.chart_player.datasets[1].data = [self.stats.doelpogingen_opdoel.toFixed(1), self.stats.passzekerheid.toFixed(1), self.stats.gewonnen_duels.toFixed(1), self.stats.perc_verdedigende_duels.toFixed(1), self.stats.perc_aanvallende_duels.toFixed(1)];
                        }, 500);
                    }
                }
            }, 200);
        }, true);

        $timeout(function () {
            if (self.player_stats.spelerType !== 'keeper') {
                // Chart.js Data
                self.chart_player = {
                    labels: ['Schotzekerheid', 'Passzekerheid', 'Gewonnen duels', 'verdedigende duels', 'aanvallende duels'],
                    datasets: [
                        {
                            label: self.vs_naam,
                            fillColor: 'rgba(151,151,151,0.5)',
                            strokeColor: 'rgba(151,151,151,0.5)',
                            pointColor: '#979797',
                            pointStrokeColor: '#fff',
                            pointHighlightFill: '#fff',
                            pointHighlightStroke: '#979797',
                            data: [self.stats_vs.doelpogingen_opdoel.toFixed(1), self.stats_vs.passzekerheid.toFixed(1), self.stats_vs.gewonnen_duels.toFixed(1), self.stats_vs.perc_verdedigende_duels.toFixed(1), self.stats_vs.perc_aanvallende_duels.toFixed(1)]
                        },
                        {
                            label: self.player_stats.spelerNaam || 'Huidige speler',
                            fillColor: 'rgba(3,125,201,0.6)',
                            strokeColor: '#fff',
                            pointColor: '#037dc9',
                            pointStrokeColor: '#fff',
                            pointHighlightFill: '#fff',
                            pointHighlightStroke: '#037dc9',
                            data: [self.stats.doelpogingen_opdoel.toFixed(1), self.stats.passzekerheid.toFixed(1), self.stats.gewonnen_duels.toFixed(1), self.stats.perc_verdedigende_duels.toFixed(1), self.stats.perc_aanvallende_duels.toFixed(1)]
                        }
                    ]
                };
            }
            if (self.player_stats.spelerType == 'keeper') {
                self.chart_keeper = {
                    labels: ['Geslaagde reddingen', 'Passzekerheid', 'Succesvolle uittrappen', 'korte passes', 'middellange passes', 'lange passes'],
                    datasets: [
                        {
                            label: self.vs_naam,
                            fillColor: 'rgba(151,151,151,0.5)',
                            strokeColor: 'rgba(151,151,151,0.5)',
                            pointColor: '#979797',
                            pointStrokeColor: '#fff',
                            pointHighlightFill: '#fff',
                            pointHighlightStroke: '#979797',
                            data: [self.stats_vs.geslaagde_reddingen.toFixed(1), self.stats_vs.passzekerheid.toFixed(1), self.stats_vs.succesvolle_uittrappen.toFixed(1), self.stats_vs.perc_korte_passes.toFixed(1), self.stats_vs.perc_middellange_passes.toFixed(1), self.stats_vs.perc_lange_passes.toFixed(1)]
                        },
                        {
                            label: self.player_stats.spelerNaam,
                            fillColor: 'rgba(3,125,201,0.6)',
                            strokeColor: '#fff',
                            pointColor: '#037dc9',
                            pointStrokeColor: '#fff',
                            pointHighlightFill: '#fff',
                            pointHighlightStroke: '#037dc9',
                            data: [self.stats.geslaagde_reddingen.toFixed(1), self.stats.passzekerheid.toFixed(1), self.stats.succesvolle_uittrappen.toFixed(1), self.stats.perc_korte_passes.toFixed(1), self.stats.perc_middellange_passes.toFixed(1), self.stats.perc_lange_passes.toFixed(1)]
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
                angleLineColor: '#fff',

                //Number - Pixel width of the angle line
                angleLineWidth: 1,

                //String - Point label font declaration
                pointLabelFontFamily: '"Helvetica"',

                //String - Point label font weight
                pointLabelFontStyle: 'bold',

                //Number - Point label font size in pixels
                pointLabelFontSize: 14,

                //String - Point label font colour
                pointLabelFontColor: '#037dc9',

                //Boolean - Whether to show a dot for each point
                pointDot: false,

                //Number - Radius of each point dot in pixels
                pointDotRadius: 2,

                //Number - Pixel width of point dot stroke
                pointDotStrokeWidth: 1,

                //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
                pointHitDetectionRadius: 20,

                //Boolean - Whether to show a stroke for datasets
                datasetStroke: true,

                //Number - Pixel width of dataset stroke
                datasetStrokeWidth: 4,

                //Boolean - Whether to fill the dataset with a colour
                datasetFill: true,

                //String - A legend template
                legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li style="color:<%=datasets[i].pointColor%>"><span style="background-color:<%=datasets[i].pointColor%>"></span><strong><%if(datasets[i].label){%><%=datasets[i].label%><%}%></strong></li><%}%></ul>'
            };
        }, 500);
    }]);