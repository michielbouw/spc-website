angular.module('mainapp.match')
    .controller('mainapp.match.MatchSingleModulesPlayerController', ['$scope', '$filter', 'Api', 'AuthenticationService', '$location',
        '$rootScope', '$routeParams', '$sessionStorage',
        function($scope, $filter, Api, AuthenticationService, $location, $rootScope, $routeParams, $sessionStorage)
    {
        var self = this;
        self.datetime = new Date();

        self.matchshort = {};
        self.match = {};
        self.player = {};
        self.player_list = [];

        self.loading = true;

        self.loading_sub = Number($routeParams.sub) || '';

        self.loading_id = $routeParams._id;

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

            if ($filter('filter')(self.match.player_stats_full_thuis, {personID: self.loading_sub}, true) && $filter('filter')(self.match.player_stats_full_thuis, {personID: self.loading_sub}, true)[0]) {
                self.player = $filter('filter')(self.match.player_stats_full_thuis, {personID: self.loading_sub}, true)[0];
                self.player.team = self.matchshort.match_info.thuis;
                self.player_list = self.match.spelersthuisteam;
            } else if ($filter('filter')(self.match.player_stats_full_uit, {personID: self.loading_sub}, true) && $filter('filter')(self.match.player_stats_full_uit, {personID: self.loading_sub}, true)[0]) {
                self.player = $filter('filter')(self.match.player_stats_full_uit, {personID: self.loading_sub}, true)[0];
                self.player.team = self.matchshort.match_info.uit;
                self.player_list = self.match.spelersuitteam;
            }

            self.loading = false;
        } else {
            delete $sessionStorage.matchdata;

            Api.MatchDataID.get({
                _id: $routeParams._id
            }, function (res) {
                self.match = res;
                $sessionStorage.matchdata = res;

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

                if ($filter('filter')(self.match.player_stats_full_thuis, {personID: self.loading_sub}, true) && $filter('filter')(self.match.player_stats_full_thuis, {personID: self.loading_sub}, true)[0]) {
                    self.player = $filter('filter')(self.match.player_stats_full_thuis, {personID: self.loading_sub}, true)[0];
                    self.player.team = self.matchshort.match_info.thuis;
                    self.player_list = self.match.spelersthuisteam;
                } else if ($filter('filter')(self.match.player_stats_full_uit, {personID: self.loading_sub}, true) && $filter('filter')(self.match.player_stats_full_uit, {personID: self.loading_sub}, true)[0]) {
                    self.player = $filter('filter')(self.match.player_stats_full_uit, {personID: self.loading_sub}, true)[0];
                    self.player.team = self.matchshort.match_info.uit;
                    self.player_list = self.match.spelersuitteam;
                }

                self.loading = false;
            });
        }

        // Spelers
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

        //self.player1InitFunc = function (i) {
        //    self.speler1 = $filter('filter')(self.match.player_stats_full_thuis, {personID: i}, true)[0];
        //};
        //self.player2InitFunc = function (i) {
        //    self.speler2 = $filter('filter')(self.match.player_stats_full_thuis, {personID: i}, true)[0];
        //};
        //self.player3InitFunc = function (i) {
        //    self.speler3 = $filter('filter')(self.match.player_stats_full_uit, {personID: i}, true)[0];
        //};
        //self.player4InitFunc = function (i) {
        //    self.speler4 = $filter('filter')(self.match.player_stats_full_uit, {personID: i}, true)[0];
        //};
    }]);