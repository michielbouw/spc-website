angular.module('mainapp.club')
    .controller('mainapp.club.ClubStatsController', ['$scope', 'Api', '$filter', '$routeParams', '$rootScope', '$location', '$timeout',
        function($scope, Api, $filter, $routeParams, $rootScope, $location, $timeout)
    {
        var self = this;

        self.team_data = [];
        self.orderMatches = 'ronde';
        self.season_matches = [];
        $scope.rounds = [1, 1];

        if ((!$routeParams.team_slug || $routeParams.team_slug === '') && $rootScope.currentClub.teams[0].team_slug) {
            $location.path('/club/' + $rootScope.currentClub.teams[0].team_slug);
        } else if (!rootScope.currentClub || !$rootScope.currentClub.teams[0].team_slug) {
            $location.path('/club/fceindhoven_1eelftal');
        } else {
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
                if (temp0 !== 1) {
                    for (var i = 1; i < temp1; i++) {
                        var temp = {};
                        temp.ronde = i;
                        self.season_matches.push(temp);
                    }
                    self.season_matches = $filter('orderBy')(self.season_matches, self.orderMatches);
                }
                angular.element(document).ready(function () {
                    $('.slider-control .slider').slider({
                        range: true,
                        min: temp0,
                        max: temp1
                    });
                });
                if (temp0 == temp1) {
                    $scope.rounds = [temp0, temp1];
                } else if ((temp1 - temp0) <= 0) {
                    $scope.rounds = [temp0, temp1];
                } else if ((temp1 - 5) <= 0) {
                    $scope.rounds = [1];
                    $scope.rounds.push(temp1);
                } else if ((temp1 - 5) > 0) {
                    $scope.rounds = [temp1 - 5];
                    $scope.rounds.push(temp1);
                } else {
                    $scope.rounds = [1, 1];
                }
            });
        }

        self.seasonInitFunc = function () {
            if (self.team_data && self.season_index) {
                self.season_matches = $filter('orderBy')(($filter('filter')(self.team_data, {season: self.season_index}, true)[0]).matches, self.orderMatches);

                var statslength = self.season_matches.length;
                var temp0 = self.season_matches[0].ronde;
                var temp1 = self.season_matches[statslength - 1].ronde;
                if (temp0 !== 1) {
                    for (var i = 1; i < temp1; i++) {
                        var temp = {};
                        temp.ronde = i;
                        self.season_matches.push(temp);
                    }
                    self.season_matches = $filter('orderBy')(self.season_matches, self.orderMatches);
                }
                angular.element(document).ready(function () {
                    $('.slider-control .slider').slider({
                        range: true,
                        min: temp0,
                        max: temp1
                    });
                });
                if (temp0 == temp1) {
                    $scope.rounds = [temp0, temp1];
                } else if ((temp1 - temp0) <= 0) {
                    $scope.rounds = [temp0, temp1];
                } else if ((temp1 - 5) <= 0) {
                    $scope.rounds = [1];
                    $scope.rounds.push(temp1);
                } else if ((temp1 - 5) > 0) {
                    $scope.rounds = [temp1 - 5];
                    $scope.rounds.push(temp1);
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
                        self.stats.goalsArr.push('data1');
                        for (i = self.roundsfilterfrom() - 1; i < self.roundsfilterto(); i++) {
                            self.stats.goals += self.season_matches[i].doelpunten_voor;
                            self.stats.goalsArr.push(self.season_matches[i].doelpunten_voor);
                        }
                        self.stats.goalstegen = 0;
                        self.stats.goalstegenArr = [];
                        self.stats.goalstegenArr.push('data2');
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
                        self.stats.lengte_passesArr.push('data1');
                        for (i = self.roundsfilterfrom() - 1; i < self.roundsfilterto(); i++) {
                            self.stats.lengte_passes += self.season_matches[i].lengte_passes;
                            self.stats.lengte_passesArr.push(self.season_matches[i].lengte_passes);
                        }
                        self.stats.tot_passes = 0;
                        self.stats.tot_passesArr = [];
                        self.stats.tot_passesArr.push('data2');
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
                        self.stats.goalsArr.push('data1');
                        self.stats.goalsArr.push(self.season_matches[self.roundsfilterfrom() - 1].doelpunten_voor);

                        self.stats.goalstegen = self.season_matches[self.roundsfilterfrom() - 1].doelpunten_tegen;
                        self.stats.goalstegenArr = [];
                        self.stats.goalstegenArr.push('data2');
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
                        self.stats.lengte_passesArr.push('data1');
                        self.stats.lengte_passesArr.push(self.season_matches[self.roundsfilterfrom() - 1].lengte_passes);

                        self.stats.tot_passes = self.season_matches[self.roundsfilterfrom() - 1].tot_passes;
                        self.stats.tot_passesArr = [];
                        self.stats.tot_passesArr.push('data2');
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
                                'data2': 'x'
                            },
                            columns: [
                                self.stats.xAxis,
                                self.stats.goalsArr,
                                self.stats.goalstegenArr
                            ],
                            names: {
                                data1: 'Goals voor',
                                data2: 'Goals tegen'
                            }
                        },
                        color: {
                            pattern: ['#18385F', '#4F81BC']
                        },
                        axis: {
                            y: {
                                label: {
                                    text: 'Goals',
                                    position: 'outer-middle'
                                },
                                padding: {top: 10, bottom: 0},
                                min: 0,
                                tick: {
                                    format: d3.format("d"),
                                    values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
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
        self.chartgeel = null;
        self.showGraph3 = function() {
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
        };
    }]);