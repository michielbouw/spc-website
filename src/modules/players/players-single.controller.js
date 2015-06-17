angular.module('mainapp.players')
    .controller('mainapp.players.PlayersSingleController', ['$scope', 'Api', 'AuthenticationService', '$location', '$rootScope', '$timeout',
        function($scope, Api, AuthenticationService, $location, $rootScope, $timeout)
    {
        var self = this;

        self.season_index = "2014-2015";
        self.chosenseason = "2014-2015";
        self.seasonInitFunc = function () {
            self.chosenseason = self.season_index;
        };

        self.spelerStats = {};
        self.spelerStats['2014-2015'] = [{
            "ronde": 1,
            "matchID": 11,
            "punten": 3,
            "goals": 2,
            "goalstegen": 1,
            "schotzekerheid": 43,
            "balbezit": 55,
            "passzekerheid": 54,
            "geel": 2,
            "rood": 0
        }, {
            "ronde": 2,
            "matchID": 12,
            "punten": 0,
            "goals": 1,
            "goalstegen": 3,
            "schotzekerheid": 22,
            "balbezit": 34,
            "passzekerheid": 27,
            "geel": 3,
            "rood": 1
        }, {
            "ronde": 3,
            "matchID": 13,
            "punten": 1,
            "goals": 0,
            "goalstegen": 0,
            "schotzekerheid": 13,
            "balbezit": 34,
            "passzekerheid": 21,
            "geel": 1,
            "rood": 0
        }, {
            "ronde": 4,
            "matchID": 14,
            "punten": 3,
            "goals": 4,
            "goalstegen": 0,
            "schotzekerheid": 68,
            "balbezit": 51,
            "passzekerheid": 33,
            "geel": 0,
            "rood": 0
        }, {
            "ronde": 5,
            "matchID": 15,
            "punten": 1,
            "goals": 1,
            "goalstegen": 1,
            "schotzekerheid": 13,
            "balbezit": 46,
            "passzekerheid": 29,
            "geel": 1,
            "rood": 0
        }];

        var statslength = self.spelerStats[self.chosenseason].length;
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
        $scope.$watch('rounds', function() {
            var i;
            if (self.roundsfilterfrom() !== self.roundsfilterto()) {
                self.stats.puntenArr = [];
                self.stats.puntenArr.push('data1');
                for (i = self.roundsfilterfrom()-1; i < self.roundsfilterto(); i++) {
                    self.stats.puntenArr.push(self.spelerStats[self.chosenseason][i].punten);
                }

                self.stats.goals = 0;
                self.stats.goalsArr = [];
                self.stats.goalsArr.push('data1');
                for (i = self.roundsfilterfrom()-1; i < self.roundsfilterto(); i++) {
                    self.stats.goals += self.spelerStats[self.chosenseason][i].goals;
                    self.stats.goalsArr.push(self.spelerStats[self.chosenseason][i].goals);
                }
                self.stats.goalstegen = 0;
                self.stats.goalstegenArr = [];
                self.stats.goalstegenArr.push('data2');
                for (i = self.roundsfilterfrom()-1; i < self.roundsfilterto(); i++) {
                    self.stats.goalstegen += self.spelerStats[self.chosenseason][i].goalstegen;
                    self.stats.goalstegenArr.push(self.spelerStats[self.chosenseason][i].goalstegen);
                }
                self.stats.schotzekerheid = 0;
                self.stats.schotzekerheidArr = [];
                self.stats.schotzekerheidArr.push('data1');
                for (i = self.roundsfilterfrom()-1; i < self.roundsfilterto(); i++) {
                    self.stats.schotzekerheid += self.spelerStats[self.chosenseason][i].schotzekerheid;
                    self.stats.schotzekerheidArr.push(self.spelerStats[self.chosenseason][i].schotzekerheid);
                }
                self.stats.schotzekerheid /= (self.roundsfilterto() - self.roundsfilterfrom() + 1);
                self.stats.balbezit = 0;
                self.stats.balbezitArr = [];
                self.stats.balbezitArr.push('data3');
                for (i = self.roundsfilterfrom()-1; i < self.roundsfilterto(); i++) {
                    self.stats.balbezit += self.spelerStats[self.chosenseason][i].balbezit;
                    self.stats.balbezitArr.push(self.spelerStats[self.chosenseason][i].balbezit);
                }
                self.stats.balbezit /= (self.roundsfilterto() - self.roundsfilterfrom() + 1);
                self.stats.passzekerheid = 0;
                self.stats.passzekerheidArr = [];
                self.stats.passzekerheidArr.push('data2');
                for (i = self.roundsfilterfrom()-1; i < self.roundsfilterto(); i++) {
                    self.stats.passzekerheid += self.spelerStats[self.chosenseason][i].passzekerheid;
                    self.stats.passzekerheidArr.push(self.spelerStats[self.chosenseason][i].passzekerheid);
                }
                self.stats.passzekerheid /= (self.roundsfilterto() - self.roundsfilterfrom() + 1);
                self.stats.geel = 0;
                self.stats.geelArr = [];
                self.stats.geelArr.push('data1');
                for (i = self.roundsfilterfrom()-1; i < self.roundsfilterto(); i++) {
                    self.stats.geel += self.spelerStats[self.chosenseason][i].geel;
                    self.stats.geelArr.push(self.spelerStats[self.chosenseason][i].geel);
                }
                self.stats.rood = 0;
                self.stats.roodArr = [];
                self.stats.roodArr.push('data2');
                for (i = self.roundsfilterfrom()-1; i < self.roundsfilterto(); i++) {
                    self.stats.rood += self.spelerStats[self.chosenseason][i].rood;
                    self.stats.roodArr.push(self.spelerStats[self.chosenseason][i].rood);
                }

                self.stats.xAxis = [];
                self.stats.xAxis.push('x');
                for (i = self.roundsfilterfrom(); i <= self.roundsfilterto(); i++) {
                    self.stats.xAxis.push(i);
                }

                self.showGraph1();
                self.showGraph2();
                self.showGraph3();
                self.showGraph4();
                self.showGraph5();
            } else {
                self.stats.puntenArr = [];
                self.stats.puntenArr.push('data1');
                self.stats.puntenArr.push(self.spelerStats[self.chosenseason][self.roundsfilterfrom() - 1].punten);

                self.stats.goals = self.spelerStats[self.chosenseason][self.roundsfilterfrom() - 1].goals;
                self.stats.goalsArr = [];
                self.stats.goalsArr.push('data1');
                self.stats.goalsArr.push(self.spelerStats[self.chosenseason][self.roundsfilterfrom()-1].goals);

                self.stats.goalstegen = self.spelerStats[self.chosenseason][self.roundsfilterfrom() - 1].goalstegen;
                self.stats.goalstegenArr = [];
                self.stats.goalstegenArr.push('data2');
                self.stats.goalstegenArr.push(self.spelerStats[self.chosenseason][self.roundsfilterfrom()-1].goalstegen);

                self.stats.schotzekerheid = self.spelerStats[self.chosenseason][self.roundsfilterfrom() - 1].schotzekerheid;
                self.stats.schotzekerheidArr = [];
                self.stats.schotzekerheidArr.push('data1');
                self.stats.schotzekerheidArr.push(self.spelerStats[self.chosenseason][self.roundsfilterfrom()-1].schotzekerheid);

                self.stats.balbezit = self.spelerStats[self.chosenseason][self.roundsfilterfrom() - 1].balbezit;
                self.stats.balbezitArr = [];
                self.stats.balbezitArr.push('data3');
                self.stats.balbezitArr.push(self.spelerStats[self.chosenseason][self.roundsfilterfrom()-1].balbezit);

                self.stats.passzekerheid = self.spelerStats[self.chosenseason][self.roundsfilterfrom() - 1].passzekerheid;
                self.stats.passzekerheidArr = [];
                self.stats.passzekerheidArr.push('data2');
                self.stats.passzekerheidArr.push(self.spelerStats[self.chosenseason][self.roundsfilterfrom()-1].passzekerheid);

                self.stats.geel = self.spelerStats[self.chosenseason][self.roundsfilterfrom() - 1].geel;
                self.stats.geelArr = [];
                self.stats.geelArr.push('data1');
                self.stats.geelArr.push(self.spelerStats[self.chosenseason][self.roundsfilterfrom()-1].geel);

                self.stats.rood = self.spelerStats[self.chosenseason][self.roundsfilterfrom() - 1].rood;
                self.stats.roodArr = [];
                self.stats.roodArr.push('data2');
                self.stats.roodArr.push(self.spelerStats[self.chosenseason][self.roundsfilterfrom()-1].rood);

                self.stats.xAxis = [];
                self.stats.xAxis.push('x');
                self.stats.xAxis.push(self.roundsfilterfrom());

                self.showGraph1();
                self.showGraph2();
                self.showGraph3();
                self.showGraph4();
                self.showGraph5();
            }
        }, true);

        self.chartpercentages = null;
        self.showGraph1 = function() {
            self.chartpercentages = c3.generate({
                bindto: '#chart-percentages',
                data: {
                    xs: {
                        'data1': 'x',
                        'data2': 'x'
                    },
                    columns: [
                        self.stats.xAxis,
                        self.stats.passzekerheidArr,
                        self.stats.schotzekerheidArr
                    ],
                    names: {
                        data1: 'Pass zekerheid (%)',
                        data2: 'Schot zekerheid (%)'
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
        self.chartpasses = null;
        self.showGraph2 = function() {
            self.chartpasses = c3.generate({
                bindto: '#chart-passes',
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
                        data1: 'Pass lengte'
                    }
                },
                color: {
                    pattern: ['#18385F', '#4F81BC']
                },
                axis: {
                    y: {
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
        };
        self.chartgoals = null;
        self.showGraph3 = function() {
            self.chartgoals = c3.generate({
                bindto: '#chart-goals',
                data: {
                    xs: {
                        'data1': 'x'
                    },
                    columns: [
                        self.stats.xAxis,
                        self.stats.goalsArr
                    ],
                    names: {
                        data1: 'Goals'
                    }
                },
                color: {
                    pattern: ['#18385F', '#4F81BC']
                },
                axis: {
                    y: {
                        label: {
                            text: 'Aantal goals',
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
        self.chartgeel = null;
        self.showGraph4 = function() {
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
        self.chartactions = null;
        self.showGraph5 = function() {
            self.chartactions = c3.generate({
                bindto: '#chart-actions',
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
                        data1: 'Verdedigende acties',
                        data2: 'Aanvallende acties'
                    }
                },
                color: {
                    pattern: ['#18385F', '#4F81BC']
                },
                axis: {
                    y: {
                        label: {
                            text: 'Aantal acties',
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
        };
    }]);