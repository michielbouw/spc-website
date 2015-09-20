angular.module('mainapp.club')
    .controller('mainapp.club.ClubStatsController', ['$scope', 'Api', '$filter', '$routeParams', '$rootScope', '$location', '$timeout', '$sessionStorage',
        function($scope, Api, $filter, $routeParams, $rootScope, $location, $timeout, $sessionStorage)
    {
        var self = this;
        self.team_data = [];
        self.orderMatches = 'ronde';
        self.season_matches = [];
        self.match = {};
        self.stats = {};
        self.stats_vs = {};
        self.vs = '.. kies ..';

        if ((!$routeParams.team_slug || $routeParams.team_slug === '') && $rootScope.currentClub && $rootScope.currentClub.teams[0].team_slug) {
            $location.path('/club/' + $rootScope.currentClub.teams[0].team_slug);
        } else if ((!$routeParams.team_slug || $routeParams.team_slug === '') && (!$rootScope.currentClub || !$rootScope.currentClub.teams[0].team_slug)) {
            $location.path('/club/fceindhoven_1');
        } else {
            if ( ($rootScope.currentClub && $rootScope.currentClub.teams[0] && $rootScope.currentClub.teams[0].team_slug !== $routeParams.team_slug) && ($rootScope.currentClub && $rootScope.currentClub.teams[1] && $rootScope.currentClub.teams[1].team_slug !== $routeParams.team_slug) && $sessionStorage.role !== 'admin' ) {
                $location.path('/404');
            }

            Api.TeamDataItem.get({
                _slug: $routeParams.team_slug
            }, function (res) {
                self.team_name = res.team_name;
                self.club_name = res.club_name;
                self.divisie = res.divisie;
                self.team_data = res.team_data;

                self.season_index = res.team_data[res.team_data.length - 1].season;
                self.season_matches_init = $filter('orderBy')(($filter('filter')(res.team_data, {season: self.season_index}, true)[0]).matches, self.orderMatches);
                self.season_matches = $filter('orderBy')(($filter('filter')(res.team_data, {season: self.season_index}, true)[0]).matches, self.orderMatches);

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

                self.match = $filter('filter')(self.season_matches, {ronde: $scope.round}, true)[0];

                $timeout(function () {
                    angular.element(document).ready(function () {
                        $('.slider-control .slider').slider({
                            min: temp0,
                            value: $scope.round
                        });
                        $('.content-club-select .round').css('margin-left', $('.content-club-select .slider-control .slider .ui-slider-range').width() );
                    });
                }, 400);

                self.vs = 'Gemiddeld team';
                self.vsInitFunc();
            }, function() {
                $location.path('/404');
            });
        }

        self.seasonInitFunc = function () {
            if (self.team_data && self.season_index) {
                self.season_matches = $filter('orderBy')(($filter('filter')(self.team_data, {season: self.season_index}, true)[0]).matches, self.orderMatches);

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
                $scope.round = temp1;

                self.match = $filter('filter')(self.season_matches, {ronde: $scope.round}, true)[0];

                $timeout(function () {
                    angular.element(document).ready(function () {
                        $('.slider-control .slider').slider({
                            min: temp0,
                            value: $scope.round
                        });
                        $('.content-club-select .round').css('margin-left', $('.content-club-select .slider-control .slider .ui-slider-range').width() );
                    });
                }, 400);
            }
        };

        self.vsInitFunc = function () {
            var statslength;
            var count;
            var i;
            self.stats_vs = {};

            if (self.vs == 'Gemiddeld team') {
                if (self.team_data && self.season_index) {
                    var stats_vs_temp = $filter('orderBy')(($filter('filter')(self.team_data, {season: self.season_index}, true)[0]).matches, self.orderMatches);

                    statslength = stats_vs_temp.length;
                    count = 0;

                    self.stats_vs.doelpogingen = 0;
                    self.stats_vs.goals = 0;
                    self.stats_vs.goalstegen = 0;
                    self.stats_vs.balbezit = 0;
                    self.stats_vs.gewonnen_duels = 0;
                    self.stats_vs.passzekerheid = 0;
                    self.stats_vs.lengte_passes = 0;
                    self.stats_vs.tot_passes = 0;
                    self.stats_vs.geel = 0;
                    self.stats_vs.rood = 0;

                    for (i = 0; i < statslength; i++) {
                        if (stats_vs_temp[i].wedstrijd && stats_vs_temp[i].doelpogingen) {
                            self.stats_vs.doelpogingen += stats_vs_temp[i].doelpogingen;
                            self.stats_vs.goals += stats_vs_temp[i].doelpunten_voor;
                            self.stats_vs.goalstegen += stats_vs_temp[i].doelpunten_tegen;
                            self.stats_vs.balbezit += stats_vs_temp[i].balbezit;
                            self.stats_vs.gewonnen_duels += stats_vs_temp[i].gewonnen_duels;
                            self.stats_vs.passzekerheid += stats_vs_temp[i].geslaagde_passes;
                            self.stats_vs.lengte_passes += stats_vs_temp[i].lengte_passes;
                            self.stats_vs.tot_passes += stats_vs_temp[i].tot_passes;
                            self.stats_vs.geel += stats_vs_temp[i].geel;
                            self.stats_vs.rood += stats_vs_temp[i].rood;

                            count++;
                        }
                    }

                    self.stats_vs.doelpogingen /= count;
                    self.stats_vs.goals /= count;
                    self.stats_vs.goalstegen /= count;
                    self.stats_vs.balbezit /= count;
                    self.stats_vs.gewonnen_duels /= count;
                    self.stats_vs.passzekerheid /= count;
                    self.stats_vs.lengte_passes /= count;
                    self.stats_vs.tot_passes /= count;
                    self.stats_vs.geel /= count;
                    self.stats_vs.rood /= count;
                }
            } else if (self.vs == '1e helft seizoen team') {
                // winterstop is na ronde:
                // self.season_index == '2013-2014' -> ronde == 18
                // self.season_index == '2014-2015' -> ronde == 19
                // self.season_index == '2015-2016' -> ronde == 19
                if (self.team_data && self.season_index) {
                    var stats_vs_temp1 = $filter('orderBy')(($filter('filter')(self.team_data, {season: self.season_index}, true)[0]).matches, self.orderMatches);

                    statslength = stats_vs_temp1.length;
                    var temp0 = stats_vs_temp1[0].ronde;
                    if (temp0 !== 1) {
                        for (var j = 1; j < temp0; j++) {
                            var temp1 = {};
                            temp1.ronde = j;
                            stats_vs_temp1.push(temp1);
                        }
                        stats_vs_temp1 = $filter('orderBy')(stats_vs_temp1, self.orderMatches);
                    }
                    count = 0;

                    var i_end = statslength;
                    if (self.season_index == '2013-2014') {
                        i_end = 18;
                    } else if (self.season_index == '2014-2015') {
                        i_end = 19;
                    } else if (self.season_index == '2015-2016') {
                        i_end = 19;
                    }

                    self.stats_vs.doelpogingen = 0;
                    self.stats_vs.goals = 0;
                    self.stats_vs.goalstegen = 0;
                    self.stats_vs.balbezit = 0;
                    self.stats_vs.gewonnen_duels = 0;
                    self.stats_vs.passzekerheid = 0;
                    self.stats_vs.lengte_passes = 0;
                    self.stats_vs.tot_passes = 0;
                    self.stats_vs.geel = 0;
                    self.stats_vs.rood = 0;

                    for (i = 0; i < i_end && i < statslength; i++) {
                        if (stats_vs_temp1[i].wedstrijd && stats_vs_temp1[i].doelpogingen) {
                            if (stats_vs_temp1[i].ronde > i_end) {
                                break;
                            }

                            self.stats_vs.doelpogingen += stats_vs_temp1[i].doelpogingen;
                            self.stats_vs.goals += stats_vs_temp1[i].doelpunten_voor;
                            self.stats_vs.goalstegen += stats_vs_temp1[i].doelpunten_tegen;
                            self.stats_vs.balbezit += stats_vs_temp1[i].balbezit;
                            self.stats_vs.gewonnen_duels += stats_vs_temp1[i].gewonnen_duels;
                            self.stats_vs.passzekerheid += stats_vs_temp1[i].geslaagde_passes;
                            self.stats_vs.lengte_passes += stats_vs_temp1[i].lengte_passes;
                            self.stats_vs.tot_passes += stats_vs_temp1[i].tot_passes;
                            self.stats_vs.geel += stats_vs_temp1[i].geel;
                            self.stats_vs.rood += stats_vs_temp1[i].rood;

                            count++;
                        }
                    }

                    self.stats_vs.doelpogingen /= count;
                    self.stats_vs.goals /= count;
                    self.stats_vs.goalstegen /= count;
                    self.stats_vs.balbezit /= count;
                    self.stats_vs.gewonnen_duels /= count;
                    self.stats_vs.passzekerheid /= count;
                    self.stats_vs.lengte_passes /= count;
                    self.stats_vs.tot_passes /= count;
                    self.stats_vs.geel /= count;
                    self.stats_vs.rood /= count;
                }
            } else if (self.vs == '2e helft seizoen team') {
                // winterstop is na ronde:
                // self.season_index == '2013-2014' -> ronde == 18
                // self.season_index == '2014-2015' -> ronde == 19
                // self.season_index == '2015-2016' -> ronde == 19
                if (self.team_data && self.season_index) {
                    var stats_vs_temp2 = $filter('orderBy')(($filter('filter')(self.team_data, {season: self.season_index}, true)[0]).matches, self.orderMatches);

                    statslength = stats_vs_temp2.length;
                    var temp00 = stats_vs_temp2[0].ronde;
                    if (temp00 !== 1) {
                        for (var k = 1; k < temp00; k++) {
                            var temp2 = {};
                            temp2.ronde = k;
                            stats_vs_temp2.push(temp2);
                        }
                        stats_vs_temp2 = $filter('orderBy')(stats_vs_temp2, self.orderMatches);
                    }
                    count = 0;

                    var i_start = statslength;
                    if (self.season_index == '2013-2014') {
                        i_start = 18;
                    } else if (self.season_index == '2014-2015') {
                        i_start = 19;
                    } else if (self.season_index == '2015-2016') {
                        i_start = 19;
                    }

                    self.stats_vs.doelpogingen = 0;
                    self.stats_vs.goals = 0;
                    self.stats_vs.goalstegen = 0;
                    self.stats_vs.balbezit = 0;
                    self.stats_vs.gewonnen_duels = 0;
                    self.stats_vs.passzekerheid = 0;
                    self.stats_vs.lengte_passes = 0;
                    self.stats_vs.tot_passes = 0;
                    self.stats_vs.geel = 0;
                    self.stats_vs.rood = 0;

                    for (i = i_start; i < statslength; i++) {
                        if (stats_vs_temp2[i].wedstrijd && stats_vs_temp2[i].doelpogingen) {
                            if (stats_vs_temp2[i].ronde <= i_start) {
                                continue;
                            }

                            self.stats_vs.doelpogingen += stats_vs_temp2[i].doelpogingen;
                            self.stats_vs.goals += stats_vs_temp2[i].doelpunten_voor;
                            self.stats_vs.goalstegen += stats_vs_temp2[i].doelpunten_tegen;
                            self.stats_vs.balbezit += stats_vs_temp2[i].balbezit;
                            self.stats_vs.gewonnen_duels += stats_vs_temp2[i].gewonnen_duels;
                            self.stats_vs.passzekerheid += stats_vs_temp2[i].geslaagde_passes;
                            self.stats_vs.lengte_passes += stats_vs_temp2[i].lengte_passes;
                            self.stats_vs.tot_passes += stats_vs_temp2[i].tot_passes;
                            self.stats_vs.geel += stats_vs_temp2[i].geel;
                            self.stats_vs.rood += stats_vs_temp2[i].rood;

                            count++;
                        }
                    }

                    self.stats_vs.doelpogingen /= count;
                    self.stats_vs.goals /= count;
                    self.stats_vs.goalstegen /= count;
                    self.stats_vs.balbezit /= count;
                    self.stats_vs.gewonnen_duels /= count;
                    self.stats_vs.passzekerheid /= count;
                    self.stats_vs.lengte_passes /= count;
                    self.stats_vs.tot_passes /= count;
                    self.stats_vs.geel /= count;
                    self.stats_vs.rood /= count;
                }
            } else {
                if (self.team_data && self.season_index) {
                    var stats_vs_temp0 = $filter('orderBy')(($filter('filter')(self.team_data, {season: self.season_index}, true)[0]).matches, self.orderMatches);

                    statslength = stats_vs_temp0.length;
                    count = 0;

                    self.stats_vs.doelpogingen = 0;
                    self.stats_vs.goals = 0;
                    self.stats_vs.goalstegen = 0;
                    self.stats_vs.balbezit = 0;
                    self.stats_vs.gewonnen_duels = 0;
                    self.stats_vs.passzekerheid = 0;
                    self.stats_vs.lengte_passes = 0;
                    self.stats_vs.tot_passes = 0;
                    self.stats_vs.geel = 0;
                    self.stats_vs.rood = 0;

                    for (i = 0; i < statslength; i++) {
                        if (stats_vs_temp0[i].wedstrijd && stats_vs_temp0[i].doelpogingen) {
                            self.stats_vs.doelpogingen += stats_vs_temp0[i].doelpogingen;
                            self.stats_vs.goals += stats_vs_temp0[i].doelpunten_voor;
                            self.stats_vs.goalstegen += stats_vs_temp0[i].doelpunten_tegen;
                            self.stats_vs.balbezit += stats_vs_temp0[i].balbezit;
                            self.stats_vs.gewonnen_duels += stats_vs_temp0[i].gewonnen_duels;
                            self.stats_vs.passzekerheid += stats_vs_temp0[i].geslaagde_passes;
                            self.stats_vs.lengte_passes += stats_vs_temp0[i].lengte_passes;
                            self.stats_vs.tot_passes += stats_vs_temp0[i].tot_passes;
                            self.stats_vs.geel += stats_vs_temp0[i].geel;
                            self.stats_vs.rood += stats_vs_temp0[i].rood;

                            count++;
                        }
                    }

                    self.stats_vs.doelpogingen /= count;
                    self.stats_vs.goals /= count;
                    self.stats_vs.goalstegen /= count;
                    self.stats_vs.balbezit /= count;
                    self.stats_vs.gewonnen_duels /= count;
                    self.stats_vs.passzekerheid /= count;
                    self.stats_vs.lengte_passes /= count;
                    self.stats_vs.tot_passes /= count;
                    self.stats_vs.geel /= count;
                    self.stats_vs.rood /= count;
                }
            }
        };
        self.vs = 'Gemiddeld team';
        self.vsInitFunc();

        self.roundfilter = function () {
            return $scope.round;
        };

        $scope.$watch('round', function() {
            $timeout(function () {
                $('.content-club-select .round').css('margin-left', $('.content-club-select .slider-control .slider .ui-slider-range').width() );
            }, 0);

            self.match = $filter('filter')(self.season_matches, {ronde: $scope.round}, true)[0];

            $timeout(function () {
                if (self.season_matches.length > 0) {
                    self.stats.punten = self.season_matches[self.roundfilter() - 1].punten;

                    self.stats.doelpogingen = self.season_matches[self.roundfilter() - 1].doelpogingen;

                    self.stats.goals = self.season_matches[self.roundfilter() - 1].doelpunten_voor;

                    self.stats.goalstegen = self.season_matches[self.roundfilter() - 1].doelpunten_tegen;

                    self.stats.balbezit = self.season_matches[self.roundfilter() - 1].balbezit;

                    self.stats.gewonnen_duels = self.season_matches[self.roundfilter() - 1].gewonnen_duels;

                    self.stats.passzekerheid = self.season_matches[self.roundfilter() - 1].geslaagde_passes;

                    self.stats.lengte_passes = self.season_matches[self.roundfilter() - 1].lengte_passes;

                    self.stats.tot_passes = self.season_matches[self.roundfilter() - 1].tot_passes;

                    self.stats.geel = self.season_matches[self.roundfilter() - 1].geel;

                    self.stats.rood = self.season_matches[self.roundfilter() - 1].rood;
                }
            }, 200);
        }, true);

        /*self.team_data = [];
        self.orderMatches = 'ronde';
        self.season_matches = [];
        $scope.rounds = [1, 1];

        if ((!$routeParams.team_slug || $routeParams.team_slug === '') && $rootScope.currentClub && $rootScope.currentClub.teams[0].team_slug) {
            $location.path('/club/' + $rootScope.currentClub.teams[0].team_slug);
        } else if ((!$routeParams.team_slug || $routeParams.team_slug === '') && (!$rootScope.currentClub || !$rootScope.currentClub.teams[0].team_slug)) {
            $location.path('/club/fceindhoven_1');
        } else {
            if ( ($rootScope.currentClub && $rootScope.currentClub.teams[0] && $rootScope.currentClub.teams[0].team_slug !== $routeParams.team_slug) && ($rootScope.currentClub && $rootScope.currentClub.teams[1] && $rootScope.currentClub.teams[1].team_slug !== $routeParams.team_slug) && $sessionStorage.role !== 'admin' ) {
                $location.path('/404');
            }

            Api.TeamDataItem.get({
                _slug: $routeParams.team_slug
            }, function (res) {
                self.team_name = res.team_name;
                self.club_name = res.club_name;
                self.divisie = res.divisie;
                self.team_data = res.team_data;

                self.season_index = res.team_data[res.team_data.length - 1].season;
                self.season_matches = $filter('orderBy')(($filter('filter')(res.team_data, {season: self.season_index}, true)[0]).matches, self.orderMatches);

                var statslength = self.season_matches.length;
                var temp0 = self.season_matches[0].ronde;
                var temp1 = self.season_matches[statslength - 1].ronde;
                $scope.rounds = [temp0, temp1];
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
            if (self.team_data && self.season_index) {
                self.season_matches = $filter('orderBy')(($filter('filter')(self.team_data, {season: self.season_index}, true)[0]).matches, self.orderMatches);

                var statslength = self.season_matches.length;
                var temp0 = self.season_matches[0].ronde;
                var temp1 = self.season_matches[statslength - 1].ronde;
                $scope.rounds = [temp0, temp1];
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
                        self.stats.puntenArr = [];
                        self.stats.puntenArr.push('data1');
                        for (i = self.roundsfilterfrom() - 1; i < self.roundsfilterto(); i++) {
                            self.stats.puntenArr.push(self.season_matches[i].punten);
                        }
                        self.stats.doelpogingen = 0;
                        self.stats.doelpogingenArr = [];
                        self.stats.doelpogingenArr.push('data1');
                        for (i = self.roundsfilterfrom() - 1; i < self.roundsfilterto(); i++) {
                            self.stats.doelpogingen += self.season_matches[i].doelpogingen;
                            self.stats.doelpogingenArr.push(self.season_matches[i].doelpogingen);
                        }
                        self.stats.goals = 0;
                        self.stats.goalsArr = [];
                        self.stats.goalsArr.push('data2');
                        for (i = self.roundsfilterfrom() - 1; i < self.roundsfilterto(); i++) {
                            self.stats.goals += self.season_matches[i].doelpunten_voor;
                            self.stats.goalsArr.push(self.season_matches[i].doelpunten_voor);
                        }
                        self.stats.goalstegen = 0;
                        self.stats.goalstegenArr = [];
                        self.stats.goalstegenArr.push('data3');
                        for (i = self.roundsfilterfrom() - 1; i < self.roundsfilterto(); i++) {
                            self.stats.goalstegen += self.season_matches[i].doelpunten_tegen;
                            self.stats.goalstegenArr.push(self.season_matches[i].doelpunten_tegen);
                        }
                        self.stats.balbezit = 0;
                        self.stats.balbezitArr = [];
                        self.stats.balbezitArr.push('data1');
                        for (i = self.roundsfilterfrom() - 1; i < self.roundsfilterto(); i++) {
                            self.stats.balbezit += self.season_matches[i].balbezit;
                            self.stats.balbezitArr.push(self.season_matches[i].balbezit);
                        }
                        self.stats.balbezit /= (self.roundsfilterto() - self.roundsfilterfrom() + 1);
                        self.stats.gewonnen_duels = 0;
                        self.stats.gewonnen_duelsArr = [];
                        self.stats.gewonnen_duelsArr.push('data2');
                        for (i = self.roundsfilterfrom() - 1; i < self.roundsfilterto(); i++) {
                            self.stats.gewonnen_duels += self.season_matches[i].gewonnen_duels;
                            self.stats.gewonnen_duelsArr.push(self.season_matches[i].gewonnen_duels);
                        }
                        self.stats.gewonnen_duels /= (self.roundsfilterto() - self.roundsfilterfrom() + 1);
                        self.stats.passzekerheid = 0;
                        self.stats.passzekerheidArr = [];
                        self.stats.passzekerheidArr.push('data3');
                        for (i = self.roundsfilterfrom() - 1; i < self.roundsfilterto(); i++) {
                            self.stats.passzekerheid += self.season_matches[i].geslaagde_passes;
                            self.stats.passzekerheidArr.push(self.season_matches[i].geslaagde_passes);
                        }
                        self.stats.passzekerheid /= (self.roundsfilterto() - self.roundsfilterfrom() + 1);
                        self.stats.lengte_passes = 0;
                        self.stats.lengte_passesArr = [];
                        self.stats.lengte_passesArr.push('data2');
                        for (i = self.roundsfilterfrom() - 1; i < self.roundsfilterto(); i++) {
                            self.stats.lengte_passes += self.season_matches[i].lengte_passes;
                            self.stats.lengte_passesArr.push(self.season_matches[i].lengte_passes);
                        }
                        self.stats.lengte_passes /= (self.roundsfilterto() - self.roundsfilterfrom() + 1);
                        self.stats.tot_passes = 0;
                        self.stats.tot_passesArr = [];
                        self.stats.tot_passesArr.push('data1');
                        for (i = self.roundsfilterfrom() - 1; i < self.roundsfilterto(); i++) {
                            self.stats.tot_passes += self.season_matches[i].tot_passes;
                            self.stats.tot_passesArr.push(self.season_matches[i].tot_passes);
                        }
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

                        self.showGraph0();
                        self.showGraph1();
                        self.showGraph2();
                        self.showGraph3();
                        self.showGraph4();
                    } else {
                        self.stats.puntenArr = [];
                        self.stats.puntenArr.push('data1');
                        self.stats.puntenArr.push(self.season_matches[self.roundsfilterfrom() - 1].punten);

                        self.stats.doelpogingen = self.season_matches[self.roundsfilterfrom() - 1].doelpogingen;
                        self.stats.doelpogingenArr = [];
                        self.stats.doelpogingenArr.push('data1');
                        self.stats.doelpogingenArr.push(self.season_matches[self.roundsfilterfrom() - 1].doelpogingen);

                        self.stats.goals = self.season_matches[self.roundsfilterfrom() - 1].doelpunten_voor;
                        self.stats.goalsArr = [];
                        self.stats.goalsArr.push('data2');
                        self.stats.goalsArr.push(self.season_matches[self.roundsfilterfrom() - 1].doelpunten_voor);

                        self.stats.goalstegen = self.season_matches[self.roundsfilterfrom() - 1].doelpunten_tegen;
                        self.stats.goalstegenArr = [];
                        self.stats.goalstegenArr.push('data3');
                        self.stats.goalstegenArr.push(self.season_matches[self.roundsfilterfrom() - 1].doelpunten_tegen);

                        self.stats.balbezit = self.season_matches[self.roundsfilterfrom() - 1].balbezit;
                        self.stats.balbezitArr = [];
                        self.stats.balbezitArr.push('data1');
                        self.stats.balbezitArr.push(self.season_matches[self.roundsfilterfrom() - 1].balbezit);

                        self.stats.gewonnen_duels = self.season_matches[self.roundsfilterfrom() - 1].gewonnen_duels;
                        self.stats.gewonnen_duelsArr = [];
                        self.stats.gewonnen_duelsArr.push('data2');
                        self.stats.gewonnen_duelsArr.push(self.season_matches[self.roundsfilterfrom() - 1].gewonnen_duels);

                        self.stats.passzekerheid = self.season_matches[self.roundsfilterfrom() - 1].geslaagde_passes;
                        self.stats.passzekerheidArr = [];
                        self.stats.passzekerheidArr.push('data3');
                        self.stats.passzekerheidArr.push(self.season_matches[self.roundsfilterfrom() - 1].geslaagde_passes);

                        self.stats.lengte_passes = self.season_matches[self.roundsfilterfrom() - 1].lengte_passes;
                        self.stats.lengte_passesArr = [];
                        self.stats.lengte_passesArr.push('data2');
                        self.stats.lengte_passesArr.push(self.season_matches[self.roundsfilterfrom() - 1].lengte_passes);

                        self.stats.tot_passes = self.season_matches[self.roundsfilterfrom() - 1].tot_passes;
                        self.stats.tot_passesArr = [];
                        self.stats.tot_passesArr.push('data1');
                        self.stats.tot_passesArr.push(self.season_matches[self.roundsfilterfrom() - 1].tot_passes);

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

                        self.showGraph0();
                        self.showGraph1();
                        self.showGraph2();
                        self.showGraph3();
                        self.showGraph4();
                    }
                }
            }, 200);
        }, true);

        self.chart = null;
        self.showGraph0 = function() {
            if (self.season_matches.length > 0) {
                $timeout(function () {
                    self.chart = c3.generate({
                        bindto: '#chart',
                        data: {
                            xs: {
                                'data1': 'x'
                            },
                            columns: [
                                self.stats.xAxis,
                                self.stats.puntenArr
                            ],
                            axes: {
                                data1: 'y'
                            },
                            names: {
                                data1: 'Punten'
                            }
                        },
                        color: {
                            pattern: ['#18385F', '#4F81BC']
                        },
                        axis: {
                            y: {
                                label: {
                                    text: 'Punten',
                                    position: 'outer-middle'
                                },
                                padding: {top: 10, bottom: 0},
                                min: 0,
                                max: 3,
                                tick: {
                                    format: d3.format("d"),
                                    values: [0, 1, 2, 3]
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
        self.showGraph1 = function() {
            if (self.season_matches.length > 0) {
                $timeout(function () {
                    self.chartgoals = c3.generate({
                        bindto: '#chart-goals',
                        data: {
                            xs: {
                                'data1': 'x',
                                'data2': 'x',
                                'data3': 'x'
                            },
                            columns: [
                                self.stats.xAxis,
                                self.stats.doelpogingenArr,
                                self.stats.goalsArr,
                                self.stats.goalstegenArr
                            ],
                            axes: {
                                data1: 'y',
                                data2: 'y2',
                                data3: 'y2'
                            },
                            names: {
                                data1: 'Doelpogingen',
                                data2: 'Goals voor',
                                data3: 'Goals tegen'
                            }
                        },
                        color: {
                            pattern: ['#18385F', '#4F81BC', '#979797']
                        },
                        axis: {
                            y: {
                                label: {
                                    text: 'Doelpogingen',
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
                                    text: 'Goals',
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
        self.chartpercentages = null;
        self.showGraph2 = function() {
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
                                self.stats.balbezitArr,
                                self.stats.gewonnen_duelsArr,
                                self.stats.passzekerheidArr
                            ],
                            names: {
                                data1: 'Gem. balbezit (%)',
                                data2: 'Gewonnen duels (%)',
                                data3: 'Pass zekerheid (%)'
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
        self.chartpasses = null;
        self.showGraph3 = function() {
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
                                self.stats.tot_passesArr,
                                self.stats.lengte_passesArr
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
        self.chartgeel = null;
        self.showGraph4 = function() {
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
                                    text: 'Hoeveelheid',
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
        };*/
    }]);