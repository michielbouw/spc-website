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
                $scope.rounds = [temp0, temp1];

                self.match = $filter('filter')(self.season_matches, {ronde: $scope.rounds[1]}, true)[0];

                $timeout(function () {
                    angular.element(document).ready(function () {
                        $('.slider-control .slider').slider({
                            range: true,
                            min: temp0,
                            max: temp1,
                            values: $scope.rounds
                        });
                        $('.content-club-select .round0').css('margin-left', $('.content-club-select .slider-control .slider .ui-slider-handle:nth-of-type(1)').position().left - 0.25 * $('.content-club-select .round0').width() );
                        if ($scope.rounds[0] == $scope.rounds[1]) {
                            $('.content-club-select .round1').css('margin-left', $('.content-club-select .slider-control .slider .ui-slider-handle:nth-of-type(2)').position().left - 0.5 * $('.content-club-select .round1').width() - 0.5 * $('.content-club-select .round0').width());
                        } else {
                            $('.content-club-select .round1').css('margin-left', $('.content-club-select .slider-control .slider .ui-slider-handle:nth-of-type(2)').position().left - 0.5 * $('.content-club-select .round1').width() - $('.content-club-select .slider-control .slider .ui-slider-handle:nth-of-type(1)').position().left - 0.5 * $('.content-club-select .round0').width());
                        }
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

                self.vs = 'Gemiddelde JL';
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
                $scope.rounds = [temp0, temp1];

                self.match = $filter('filter')(self.season_matches, {ronde: $scope.rounds[1]}, true)[0];

                $timeout(function () {
                    angular.element(document).ready(function () {
                        $('.slider-control .slider').slider({
                            range: true,
                            min: temp0,
                            max: temp1,
                            values: $scope.rounds
                        });
                        $('.content-club-select .round0').css('margin-left', $('.content-club-select .slider-control .slider .ui-slider-handle:nth-of-type(1)').position().left - 0.25 * $('.content-club-select .round0').width() );
                        if ($scope.rounds[0] == $scope.rounds[1]) {
                            $('.content-club-select .round1').css('margin-left', $('.content-club-select .slider-control .slider .ui-slider-handle:nth-of-type(2)').position().left - 0.5 * $('.content-club-select .round1').width() - 0.5 * $('.content-club-select .round0').width());
                        } else {
                            $('.content-club-select .round1').css('margin-left', $('.content-club-select .slider-control .slider .ui-slider-handle:nth-of-type(2)').position().left - 0.5 * $('.content-club-select .round1').width() - $('.content-club-select .slider-control .slider .ui-slider-handle:nth-of-type(1)').position().left - 0.5 * $('.content-club-select .round0').width());
                        }
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

                self.vs = 'Gemiddelde JL';
                self.vsInitFunc();
            }
        };

        self.vsInitFunc = function () {
            var statslength;
            var count;
            var i;
            self.stats_vs = {};

            if (self.vs == 'Gemiddelde JL') {
                if (self.season_index) {
                    self.loading = true;
                    Api.TeamData.query(function (res) {
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

                        angular.forEach(res, function(value, key) {
                            if ($filter('filter')(value.team_data, {season: self.season_index}, true)[0]) {
                                var season_matches_temp = $filter('orderBy')(($filter('filter')(value.team_data, {season: self.season_index}, true)[0]).matches, self.orderMatches);

                                statslength = season_matches_temp.length;

                                for (i = 0; i < statslength; i++) {
                                    if (season_matches_temp[i].wedstrijd && season_matches_temp[i].doelpogingen) {
                                        self.stats_vs.doelpogingen += season_matches_temp[i].doelpogingen;
                                        self.stats_vs.goals += season_matches_temp[i].doelpunten_voor;
                                        self.stats_vs.goalstegen += season_matches_temp[i].doelpunten_tegen;
                                        self.stats_vs.balbezit += season_matches_temp[i].balbezit;
                                        self.stats_vs.gewonnen_duels += season_matches_temp[i].gewonnen_duels;
                                        self.stats_vs.passzekerheid += season_matches_temp[i].geslaagde_passes;
                                        self.stats_vs.lengte_passes += season_matches_temp[i].lengte_passes;
                                        self.stats_vs.tot_passes += season_matches_temp[i].tot_passes;
                                        self.stats_vs.geel += season_matches_temp[i].geel;
                                        self.stats_vs.rood += season_matches_temp[i].rood;

                                        count++;
                                    }
                                }
                            }
                        });

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

                        self.loading = false;
                    }, function() {
                        $location.path('/club');
                    });
                }
            } else if (self.vs == 'Gemiddelde team') {
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
                if (self.season_index) {
                    Api.TeamData.query(function (res) {
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

                        angular.forEach(res, function(value, key) {
                            if ($filter('filter')(value.team_data, {season: self.season_index}, true)[0]) {
                                var season_matches_temp = $filter('orderBy')(($filter('filter')(value.team_data, {season: self.season_index}, true)[0]).matches, self.orderMatches);

                                statslength = season_matches_temp.length;

                                for (i = 0; i < statslength; i++) {
                                    if (season_matches_temp[i].wedstrijd && season_matches_temp[i].doelpogingen) {
                                        self.stats_vs.doelpogingen += season_matches_temp[i].doelpogingen;
                                        self.stats_vs.goals += season_matches_temp[i].doelpunten_voor;
                                        self.stats_vs.goalstegen += season_matches_temp[i].doelpunten_tegen;
                                        self.stats_vs.balbezit += season_matches_temp[i].balbezit;
                                        self.stats_vs.gewonnen_duels += season_matches_temp[i].gewonnen_duels;
                                        self.stats_vs.passzekerheid += season_matches_temp[i].geslaagde_passes;
                                        self.stats_vs.lengte_passes += season_matches_temp[i].lengte_passes;
                                        self.stats_vs.tot_passes += season_matches_temp[i].tot_passes;
                                        self.stats_vs.geel += season_matches_temp[i].geel;
                                        self.stats_vs.rood += season_matches_temp[i].rood;

                                        count++;
                                    }
                                }
                            }
                        });

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
                    }, function() {
                        $location.path('/club');
                    });
                }
            }
        };
        self.vs = 'Gemiddeld JL';
        self.vsInitFunc();

        self.roundfilterfrom = function () {
            return $scope.rounds[0];
        };
        self.roundfilter = function () {
            return $scope.rounds[1];
        };

        $scope.$watch('rounds', function() {
            $timeout(function () {
                $('.content-club-select .round0').css('margin-left', $('.content-club-select .slider-control .slider .ui-slider-handle:nth-of-type(1)').position().left - 0.25 * $('.content-club-select .round0').width() );
                if ($scope.rounds[0] == $scope.rounds[1]) {
                    $('.content-club-select .round1').css('margin-left', $('.content-club-select .slider-control .slider .ui-slider-handle:nth-of-type(2)').position().left - 0.5 * $('.content-club-select .round1').width() - 0.5 * $('.content-club-select .round0').width());
                } else {
                    $('.content-club-select .round1').css('margin-left', $('.content-club-select .slider-control .slider .ui-slider-handle:nth-of-type(2)').position().left - 0.5 * $('.content-club-select .round1').width() - $('.content-club-select .slider-control .slider .ui-slider-handle:nth-of-type(1)').position().left - 0.5 * $('.content-club-select .round0').width());
                }
            }, 400);

            self.match = $filter('filter')(self.season_matches, {ronde: self.roundfilter()}, true)[0];

            $timeout(function () {
                if (self.season_matches.length > 0) {
                    if (self.roundfilterfrom() == self.roundfilter()) {
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
                    } else {
                        var count = 0;

                        self.stats.punten = 0;
                        self.stats.doelpogingen = 0;
                        self.stats.goals = 0;
                        self.stats.goalstegen = 0;
                        self.stats.balbezit = 0;
                        self.stats.gewonnen_duels = 0;
                        self.stats.passzekerheid = 0;
                        self.stats.lengte_passes = 0;
                        self.stats.tot_passes = 0;
                        self.stats.geel = 0;
                        self.stats.rood = 0;

                        for (var i = self.roundfilterfrom() - 1; i < self.roundfilter(); i++) {
                            if (self.season_matches[i].wedstrijd && self.season_matches[i].doelpogingen) {
                                self.stats.punten += self.season_matches[i].punten;

                                self.stats.doelpogingen += self.season_matches[i].doelpogingen;

                                self.stats.goals += self.season_matches[i].doelpunten_voor;

                                self.stats.goalstegen += self.season_matches[i].doelpunten_tegen;

                                self.stats.balbezit += self.season_matches[i].balbezit;

                                self.stats.gewonnen_duels += self.season_matches[i].gewonnen_duels;

                                self.stats.passzekerheid += self.season_matches[i].geslaagde_passes;

                                self.stats.lengte_passes += self.season_matches[i].lengte_passes;

                                self.stats.tot_passes += self.season_matches[i].tot_passes;

                                self.stats.geel += self.season_matches[i].geel;

                                self.stats.rood += self.season_matches[i].rood;

                                count++;
                            }
                        }

                        self.stats.punten /= count;
                        self.stats.doelpogingen /= count;
                        self.stats.goals /= count;
                        self.stats.goalstegen /= count;
                        self.stats.balbezit /= count;
                        self.stats.gewonnen_duels /= count;
                        self.stats.passzekerheid /= count;
                        self.stats.lengte_passes /= count;
                        self.stats.tot_passes /= count;
                        self.stats.geel /= count;
                        self.stats.rood /= count;
                    }
                }
            }, 200);
        }, true);
    }]);