angular.module('mainapp.players')
    .controller('mainapp.players.PlayersSingleController', ['$scope', 'Api', '$filter', '$routeParams', '$rootScope', '$location', '$timeout', '$sessionStorage',
        function($scope, Api, $filter, $routeParams, $rootScope, $location, $timeout, $sessionStorage)
    {
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
    }]);