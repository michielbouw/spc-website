angular.module('mainapp.club')
    .controller('mainapp.club.ClubStatsController', ['$scope', 'Api', 'AuthenticationService', '$location', '$rootScope', '$timeout',
        function($scope, Api, AuthenticationService, $location, $rootScope, $timeout)
    {
        var self = this;

        self.season_index = "2014-2015";
        self.chosenseason = "2014-2015";
        self.seasonInitFunc = function () {
            self.chosenseason = self.season_index;
        };

        self.clubStats = {};
        self.clubStats['2014-2015'] = [{
            ronde: 1,
            matchID: 11,
            punten: 3,
            goals: 2,
            goalstegen: 1,
            schotzekerheid: 43,
            balbezit: 55,
            passzekerheid: 54,
            geel: 2,
            rood: 0
        }, {
            ronde: 2,
            matchID: 12,
            punten: 0,
            goals: 1,
            goalstegen: 3,
            schotzekerheid: 22,
            balbezit: 34,
            passzekerheid: 27,
            geel: 3,
            rood: 1
        }, {
            ronde: 3,
            matchID: 13,
            punten: 1,
            goals: 0,
            goalstegen: 0,
            schotzekerheid: 13,
            balbezit: 34,
            passzekerheid: 21,
            geel: 1,
            rood: 0
        }, {
            ronde: 4,
            matchID: 14,
            punten: 3,
            goals: 4,
            goalstegen: 0,
            schotzekerheid: 38,
            balbezit: 51,
            passzekerheid: 33,
            geel: 0,
            rood: 0
        }, {
            ronde: 5,
            matchID: 15,
            punten: 1,
            goals: 1,
            goalstegen: 1,
            schotzekerheid: 13,
            balbezit: 46,
            passzekerheid: 29,
            geel: 1,
            rood: 0
        }];

        var statslength = self.clubStats[self.chosenseason].length;
        //$scope.rounds = [1];
        if ((Number(statslength) - 5) > 0) $scope.rounds = [Number(statslength) - 5];
        if ((Number(statslength) - 5) <= 0) $scope.rounds = [1];
        $scope.rounds.push(Number(statslength));

        self.roundsfilterfrom = function () {
            return $scope.rounds[0];
        };
        self.roundsfilterto = function () {
            return $scope.rounds[1];
        };

        self.stats = {};
        self.$watch('rounds', function() {
            if (self.roundsfilterfrom() !== self.roundsfilterto()) {
                self.stats.puntenArr = [];
                self.stats.puntenArr.push('data1');
                for (var i = self.roundsfilterfrom()-1; i < self.roundsfilterto(); i++) {
                    self.stats.puntenArr.push(self.clubStats[self.chosenseason][i].punten);
                }

                self.stats.goals = 0;
                self.stats.goalsArr = [];
                self.stats.goalsArr.push('data1');
                for (var i = self.roundsfilterfrom()-1; i < self.roundsfilterto(); i++) {
                    self.stats.goals += self.clubStats[self.chosenseason][i].goals;
                    self.stats.goalsArr.push(self.clubStats[self.chosenseason][i].goals);
                }
                self.stats.goalstegen = 0;
                self.stats.goalstegenArr = [];
                self.stats.goalstegenArr.push('data2');
                for (var i = self.roundsfilterfrom()-1; i < self.roundsfilterto(); i++) {
                    self.stats.goalstegen += self.clubStats[self.chosenseason][i].goalstegen;
                    self.stats.goalstegenArr.push(self.clubStats[self.chosenseason][i].goalstegen);
                }
                self.stats.schotzekerheid = 0;
                self.stats.schotzekerheidArr = [];
                self.stats.schotzekerheidArr.push('data1');
                for (var i = self.roundsfilterfrom()-1; i < self.roundsfilterto(); i++) {
                    self.stats.schotzekerheid += self.clubStats[self.chosenseason][i].schotzekerheid;
                    self.stats.schotzekerheidArr.push(self.clubStats[self.chosenseason][i].schotzekerheid);
                }
                self.stats.schotzekerheid /= (self.roundsfilterto() - self.roundsfilterfrom() + 1);
                self.stats.balbezit = 0;
                self.stats.balbezitArr = [];
                self.stats.balbezitArr.push('data3');
                for (var i = self.roundsfilterfrom()-1; i < self.roundsfilterto(); i++) {
                    self.stats.balbezit += self.clubStats[self.chosenseason][i].balbezit;
                    self.stats.balbezitArr.push(self.clubStats[self.chosenseason][i].balbezit);
                }
                self.stats.balbezit /= (self.roundsfilterto() - self.roundsfilterfrom() + 1);
                self.stats.passzekerheid = 0;
                self.stats.passzekerheidArr = [];
                self.stats.passzekerheidArr.push('data2');
                for (var i = self.roundsfilterfrom()-1; i < self.roundsfilterto(); i++) {
                    self.stats.passzekerheid += self.clubStats[self.chosenseason][i].passzekerheid;
                    self.stats.passzekerheidArr.push(self.clubStats[self.chosenseason][i].passzekerheid);
                }
                self.stats.passzekerheid /= (self.roundsfilterto() - self.roundsfilterfrom() + 1);
                self.stats.geel = 0;
                self.stats.geelArr = [];
                self.stats.geelArr.push('data1');
                for (var i = self.roundsfilterfrom()-1; i < self.roundsfilterto(); i++) {
                    self.stats.geel += self.clubStats[self.chosenseason][i].geel;
                    self.stats.geelArr.push(self.clubStats[self.chosenseason][i].geel);
                }
                self.stats.rood = 0;
                self.stats.roodArr = [];
                self.stats.roodArr.push('data2');
                for (var i = self.roundsfilterfrom()-1; i < self.roundsfilterto(); i++) {
                    self.stats.rood += self.clubStats[self.chosenseason][i].rood;
                    self.stats.roodArr.push(self.clubStats[self.chosenseason][i].rood);
                }

                self.stats.xAxis = [];
                self.stats.xAxis.push('x');
                for (var i = self.roundsfilterfrom(); i <= self.roundsfilterto(); i++) {
                    self.stats.xAxis.push(i);
                }

                self.showGraph0();
                self.showGraph1();
                self.showGraph2();
                self.showGraph3();
            } else {
                self.stats.puntenArr = [];
                self.stats.puntenArr.push('data1');
                self.stats.puntenArr.push(self.clubStats[self.chosenseason][self.roundsfilterfrom() - 1].punten);

                self.stats.goals = self.clubStats[self.chosenseason][self.roundsfilterfrom() - 1].goals;
                self.stats.goalsArr = [];
                self.stats.goalsArr.push('data1');
                self.stats.goalsArr.push(self.clubStats[self.chosenseason][self.roundsfilterfrom()-1].goals);

                self.stats.goalstegen = self.clubStats[self.chosenseason][self.roundsfilterfrom() - 1].goalstegen;
                self.stats.goalstegenArr = [];
                self.stats.goalstegenArr.push('data2');
                self.stats.goalstegenArr.push(self.clubStats[self.chosenseason][self.roundsfilterfrom()-1].goalstegen);

                self.stats.schotzekerheid = self.clubStats[self.chosenseason][self.roundsfilterfrom() - 1].schotzekerheid;
                self.stats.schotzekerheidArr = [];
                self.stats.schotzekerheidArr.push('data1');
                self.stats.schotzekerheidArr.push(self.clubStats[self.chosenseason][self.roundsfilterfrom()-1].schotzekerheid);

                self.stats.balbezit = self.clubStats[self.chosenseason][self.roundsfilterfrom() - 1].balbezit;
                self.stats.balbezitArr = [];
                self.stats.balbezitArr.push('data3');
                self.stats.balbezitArr.push(self.clubStats[self.chosenseason][self.roundsfilterfrom()-1].balbezit);

                self.stats.passzekerheid = self.clubStats[self.chosenseason][self.roundsfilterfrom() - 1].passzekerheid;
                self.stats.passzekerheidArr = [];
                self.stats.passzekerheidArr.push('data2');
                self.stats.passzekerheidArr.push(self.clubStats[self.chosenseason][self.roundsfilterfrom()-1].passzekerheid);

                self.stats.geel = self.clubStats[self.chosenseason][self.roundsfilterfrom() - 1].geel;
                self.stats.geelArr = [];
                self.stats.geelArr.push('data1');
                self.stats.geelArr.push(self.clubStats[self.chosenseason][self.roundsfilterfrom()-1].geel);

                self.stats.rood = self.clubStats[self.chosenseason][self.roundsfilterfrom() - 1].rood;
                self.stats.roodArr = [];
                self.stats.roodArr.push('data2');
                self.stats.roodArr.push(self.clubStats[self.chosenseason][self.roundsfilterfrom()-1].rood);

                self.stats.xAxis = [];
                self.stats.xAxis.push('x');
                self.stats.xAxis.push(self.roundsfilterfrom());

                self.showGraph0();
                self.showGraph1();
                self.showGraph2();
                self.showGraph3();
            }
        }, true);

        self.chart = null;
        self.showGraph0 = function() {
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
        };
        self.chartgoals = null;
        self.showGraph1 = function() {
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
        };
        self.chartpercentages = null;
        self.showGraph2 = function() {
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
                        self.stats.schotzekerheidArr,
                        self.stats.passzekerheidArr,
                        self.stats.balbezitArr
                    ],
                    names: {
                        data1: 'Schot zekerheid (%)',
                        data2: 'Pass zekerheid (%)',
                        data3: 'Gem. balbezit (%)'
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
        };
        self.chartgeel = null;
        self.showGraph3 = function() {
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
        };
    }]);