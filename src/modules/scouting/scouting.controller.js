angular.module('mainapp.scouting')
    .controller('mainapp.scouting.ScoutingController', ['Api', '$location', '$rootScope', '$routeParams', '$sessionStorage',
        '$uibModal', '$filter',
        function(Api, $location, $rootScope, $routeParams, $sessionStorage, $uibModal, $filter)
    {
        var self = this;
        self.datetime = new Date();

        self.club_url = '';
        self.club_slug_select = '';
        self.player_slug_select = '';
        self.season_select = '';
        self.scouting_data = [];
        self.team_data = [];
        self.player_data = [];
        self.club_temp = {};
        self.club_temp.club_name = '';
        self.club_temp.divisie = '';
        self.club_temp.error = false;
        self.player_temp = {};
        self.player_temp.spelerNaam = '';
        self.player_temp.error = false;

        if ($rootScope.currentClub && $rootScope.currentClub.teams[0].team_slug) {
            if ($sessionStorage.currentUser.role !== 'technische-staff+' && $sessionStorage.currentUser.role !== 'admin') {
                $location.path('/scouting/' + $rootScope.currentClub.teams[0].team_slug);
            } else {
                self.club_url = '/scouting/' + $rootScope.currentClub.teams[0].team_slug;
            }
        } else if (!$rootScope.currentClub || !$rootScope.currentClub.teams[0].team_slug) {
            if ($sessionStorage.currentUser.role !== 'technische-staff+' && $sessionStorage.currentUser.role !== 'admin') {
                $location.path('/scouting/fceindhoven_1');
            } else {
                self.club_url = '/scouting/fceindhoven_1';
            }
        } else {
            if ($sessionStorage.currentUser.role !== 'technische-staff+' && $sessionStorage.currentUser.role !== 'admin') {
                if (($rootScope.currentClub && $rootScope.currentClub.teams[0] && $rootScope.currentClub.teams[0].team_slug !== $routeParams.team_slug) && ($rootScope.currentClub && $rootScope.currentClub.teams[1] && $rootScope.currentClub.teams[1].team_slug !== $routeParams.team_slug) && $sessionStorage.role !== 'admin') {
                    self.club_url = '/404';
                }
            } else {
                if (($rootScope.currentClub && $rootScope.currentClub.teams[0] && $rootScope.currentClub.teams[0].team_slug !== $routeParams.team_slug) && ($rootScope.currentClub && $rootScope.currentClub.teams[1] && $rootScope.currentClub.teams[1].team_slug !== $routeParams.team_slug) && $sessionStorage.role !== 'admin') {
                    self.club_url = '/404';
                }
            }
        }

        var editor_name;
        if ($rootScope.currentUser.middle_name) {
            editor_name = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.middle_name + ' ' + $rootScope.currentUser.last_name;
        } else {
            editor_name = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.last_name;
        }

        Api.ScoutingData.query(function (res) {
            self.scouting_data = res;
        });

        self.selectClub = function () {
            Api.ScoutingDataItem.get({
                _slug: self.club_slug_select
            }, function (res) {
                self.scouting_data_club = res;
                self.club_name = res.club_name;
                self.divisie = res.divisie;
                self.team_data = res.team_data;
                self.player_data = res.player_data;
            });
        };

        self.selectPlayer = function () {
            self.player_stats = angular.copy($filter('filter')(self.player_data, {spelerNaam_slug: self.player_slug_select}, true)[0]);
        };
        self.selectPlayerSeason = function () {
            self.player_season_stats = angular.copy(($filter('filter')(self.player_stats.matches, {season: self.player_season_select}, true)[0]).match);
        };

        self.selectArchiveSeason = function () {
            self.archive_season = ($filter('filter')(self.team_data, {season: self.archive_season_select}, true)[0]).matches;
        };
        self.selectArchiveMatch = function () {
            self.archive_stats = [];
            angular.forEach(self.player_data, function (value, key) {
                var temp_season = ($filter('filter')(value.matches, {season: self.archive_season_select}, true)[0]).match;
                var temp = $filter('filter')(temp_season, {wedstrijd_slug: self.archive_match_select}, true)[0];
                temp.spelerNaam_slug = angular.copy(value.spelerNaam_slug);
                temp.spelerNaam = angular.copy(value.spelerNaam);

                self.archive_stats.push(temp);
            });

            self.archive_match = $filter('filter')(self.archive_season, {wedstrijd_slug: self.archive_match_select}, true)[0];
            if (!self.archive_match.opstellingThuis) {
                self.archive_match.opstellingThuis = {};
            }
            if (!self.archive_match.opstellingUit) {
                self.archive_match.opstellingUit = {};
            }
        };
        self.selectArchiveSave = function () {
            Api.ScoutingDataItem.put({
                _slug: self.scouting_data_club._id
            }, {
                team_data: self.scouting_data_club.team_data,
                player_data: self.scouting_data_club.player_data,
                editor: editor_name,
                date_edited: self.datetime
            }, function () {
                Api.ScoutingDataItem.get({
                    _slug: self.club_slug_select
                }, function (res) {
                    self.scouting_data_club = res;
                    self.team_data = res.team_data;
                    self.player_data = res.player_data;

                    self.selectArchiveSeason();
                    self.selectArchiveMatch();
                });

                self.archiveerror = 'Opgeslagen';
            }, function () {
                self.archiveerror = 'Er ging iets mis, excuus voor het ongemak.';
            });
        };

        self.selectSeason = function () {
            if (self.season_select !== '') {
                self.team_stats_temp = {};
                self.team_stats_temp.season = self.season_select;
                self.team_stats_temp.opstellingThuis = {};
                self.team_stats_temp.opstellinguit = {};

                self.player_stats_temp = [];
                var temp = {};
                temp.spelerNaam_slug = '';
                temp.season = self.season_select;
                temp.match = {};
                self.player_stats_temp.push(temp);
            }
        };

        self.addField = function () {
            if (self.season_select !== '') {
                var temp = {};
                temp.spelerNaam_slug = '';
                temp.season = self.season_select;
                temp.match = {};
                self.player_stats_temp.push(temp);
            }
        };
        self.changeField = function (i, player) {
            self.player_stats_temp[i].spelerNaam_slug = player;
        };

        self.save = function () {
            if (self.season_select !== '' && self.team_stats_temp.thuis && self.team_stats_temp.uit && self.team_stats_temp.datum) {
                self.team_stats_temp.wedstrijd = self.team_stats_temp.thuis + ' - ' + self.team_stats_temp.uit;
                self.team_stats_temp.wedstrijd_slug = self.team_stats_temp.wedstrijd.trim().toLowerCase().replace(/\s+/g, '');
                self.team_stats_temp.wedstrijd_slug += self.team_stats_temp.datum.trim().toLowerCase().replace(/\s+/g, '');

                if ($filter('filter')(self.scouting_data_club.team_data, {season: self.season_select}, true) && $filter('filter')(self.scouting_data_club.team_data, {season: self.season_select}, true)[0]) {
                    var season_matches = ($filter('filter')(self.scouting_data_club.team_data, {season: self.season_select}, true)[0]).matches;
                    if ($filter('filter')(season_matches, {wedstrijd_slug: self.team_stats_temp.wedstrijd_slug}, true) && $filter('filter')(season_matches, {wedstrijd_slug: self.team_stats_temp.wedstrijd_slug}, true)[0]) {
                        angular.forEach(season_matches, function (value, key) {
                            if (value.wedstrijd_slug === self.team_stats_temp.wedstrijd_slug) {
                                value.datum = self.team_stats_temp.datum;
                                value.thuis = self.team_stats_temp.thuis;
                                value.uit = self.team_stats_temp.uit;
                                value.eindstand = self.team_stats_temp.eindstand;
                                value.opstellingThuisNaam = self.team_stats_temp.opstellingThuisNaam;
                                value.opstellingThuisType = self.team_stats_temp.opstellingThuisType;
                                value.opstellingThuis = self.team_stats_temp.opstellingThuis;
                                value.opstellingUitNaam = self.team_stats_temp.opstellingUitNaam;
                                value.opstellingUitType = self.team_stats_temp.opstellingUitType;
                                value.opstellingUit = self.team_stats_temp.opstellingUit;
                                value.opmerking = self.team_stats_temp.opmerking;
                                value.date_added = self.datetime;
                            }
                        });
                    } else {
                        var temp21 = {};
                        temp21.wedstrijd_slug = self.team_stats_temp.wedstrijd_slug;
                        temp21.datum = self.team_stats_temp.datum;
                        temp21.thuis = self.team_stats_temp.thuis;
                        temp21.uit = self.team_stats_temp.uit;
                        temp21.eindstand = self.team_stats_temp.eindstand;
                        temp21.opstellingThuisNaam = self.team_stats_temp.opstellingThuisNaam;
                        temp21.opstellingThuisType = self.team_stats_temp.opstellingThuisType;
                        temp21.opstellingThuis = self.team_stats_temp.opstellingThuis;
                        temp21.opstellingUitNaam = self.team_stats_temp.opstellingUitNaam;
                        temp21.opstellingUitType = self.team_stats_temp.opstellingUitType;
                        temp21.opstellingUit = self.team_stats_temp.opstellingUit;
                        temp21.opmerking = self.team_stats_temp.opmerking;
                        temp21.date_added = self.datetime;
                        season_matches.push(temp21);
                    }
                } else {
                    var temp1 = {};
                    temp1.season = self.season_select;
                    temp1.matches = [];
                    var temp2 = {};
                    temp2.wedstrijd_slug = self.team_stats_temp.wedstrijd_slug;
                    temp2.datum = self.team_stats_temp.datum;
                    temp2.thuis = self.team_stats_temp.thuis;
                    temp2.uit = self.team_stats_temp.uit;
                    temp2.eindstand = self.team_stats_temp.eindstand;
                    temp2.opstellingThuisNaam = self.team_stats_temp.opstellingThuisNaam;
                    temp2.opstellingThuisType = self.team_stats_temp.opstellingThuisType;
                    temp2.opstellingThuis = self.team_stats_temp.opstellingThuis;
                    temp2.opstellingUitNaam = self.team_stats_temp.opstellingUitNaam;
                    temp2.opstellingUitType = self.team_stats_temp.opstellingUitType;
                    temp2.opstellingUit = self.team_stats_temp.opstellingUit;
                    temp2.opmerking = self.team_stats_temp.opmerking;
                    temp2.date_added = self.datetime;
                    temp1.matches.push(temp2);
                    self.scouting_data_club.team_data = [];
                    self.scouting_data_club.team_data.push(temp1);
                }

                angular.forEach(self.player_stats_temp, function (value, key) {
                    if ($filter('filter')(self.scouting_data_club.player_data, {spelerNaam_slug: value.spelerNaam_temp}, true) && $filter('filter')(self.scouting_data_club.player_data, {spelerNaam_slug: value.spelerNaam_temp}, true)[0]) {
                        var player = $filter('filter')(self.scouting_data_club.player_data, {spelerNaam_slug: value.spelerNaam_slug}, true)[0];
                        var player_matches = ($filter('filter')(self.scouting_data_club.player_data, {spelerNaam_slug: value.spelerNaam_slug}, true)[0]).matches;

                        if ($filter('filter')(player_matches, {season: self.season_select}, true) && $filter('filter')(player_matches, {season: self.season_select}, true)[0]) {
                            var player_season_matches = ($filter('filter')(player_matches, {season: self.season_select}, true)[0]).match;

                            if ($filter('filter')(player_season_matches, {wedstrijd_slug: self.team_stats_temp.wedstrijd_slug}, true) && $filter('filter')(player_season_matches, {wedstrijd_slug: self.team_stats_temp.wedstrijd_slug}, true)[0]) {
                                angular.forEach(player_season_matches, function (value1, key1) {
                                    if (value1.wedstrijd_slug === self.team_stats_temp.wedstrijd_slug) {
                                        value1.datum = self.team_stats_temp.datum;
                                        value1.thuis = self.team_stats_temp.thuis;
                                        value1.uit = self.team_stats_temp.uit;
                                        value1.eindstand = self.team_stats_temp.eindstand;

                                        value1.positie1 = value.match.positie1;
                                        value1.positie2 = value.match.positie1;
                                        value1.lengte = value.match.lengte;
                                        value1.snelheid = value.match.snelheid;
                                        value1.explosiviteit = value.match.explosiviteit;
                                        value1.handelingssnelheid = value.match.handelingssnelheid;
                                        value1.atletischVermogen = value.match.atletischVermogen;
                                        value1.wendbaarheid = value.match.wendbaarheid;
                                        value1.duelkracht = value.match.duelkracht;
                                        value1.passing = value.match.passing;
                                        value1.afronding = value.match.afronding;

                                        value1.opmerking = value.match.opmerking;
                                        value1.date_added = self.datetime;
                                    }
                                });
                            } else {
                                var temp21 = {};
                                temp21.wedstrijd_slug = self.team_stats_temp.wedstrijd_slug;
                                temp21.datum = self.team_stats_temp.datum;
                                temp21.thuis = self.team_stats_temp.thuis;
                                temp21.uit = self.team_stats_temp.uit;
                                temp21.eindstand = self.team_stats_temp.eindstand;

                                temp21.positie1 = value.match.positie1;
                                temp21.positie2 = value.match.positie1;
                                temp21.lengte = value.match.lengte;
                                temp21.snelheid = value.match.snelheid;
                                temp21.explosiviteit = value.match.explosiviteit;
                                temp21.handelingssnelheid = value.match.handelingssnelheid;
                                temp21.atletischVermogen = value.match.atletischVermogen;
                                temp21.wendbaarheid = value.match.wendbaarheid;
                                temp21.duelkracht = value.match.duelkracht;
                                temp21.passing = value.match.passing;
                                temp21.afronding = value.match.afronding;

                                temp21.opmerking = value.match.opmerking;
                                temp21.date_added = self.datetime;
                                player_season_matches.push(temp21);
                            }
                        } else {
                            var temp1 = {};
                            temp1.season = self.season_select;
                            temp1.match = [];
                            var temp2 = {};
                            temp2.wedstrijd_slug = self.team_stats_temp.wedstrijd_slug;
                            temp2.datum = self.team_stats_temp.datum;
                            temp2.thuis = self.team_stats_temp.thuis;
                            temp2.uit = self.team_stats_temp.uit;
                            temp2.eindstand = self.team_stats_temp.eindstand;

                            temp2.positie1 = value.match.positie1;
                            temp2.positie2 = value.match.positie1;
                            temp2.lengte = value.match.lengte;
                            temp2.snelheid = value.match.snelheid;
                            temp2.explosiviteit = value.match.explosiviteit;
                            temp2.handelingssnelheid = value.match.handelingssnelheid;
                            temp2.atletischVermogen = value.match.atletischVermogen;
                            temp2.wendbaarheid = value.match.wendbaarheid;
                            temp2.duelkracht = value.match.duelkracht;
                            temp2.passing = value.match.passing;
                            temp2.afronding = value.match.afronding;

                            temp2.opmerking = value.match.opmerking;
                            temp2.date_added = self.datetime;
                            temp1.match.push(temp2);
                            player.matches = [];
                            player.matches.push(temp1);
                        }
                    }
                });

                console.log(JSON.stringify(self.scouting_data_club.team_data));
                console.log(JSON.stringify(self.scouting_data_club.player_data));

                Api.ScoutingDataItem.put({
                    _slug: self.scouting_data_club._id
                }, {
                    team_data: self.scouting_data_club.team_data,
                    player_data: self.scouting_data_club.player_data,
                    editor: editor_name,
                    date_edited: self.datetime
                }, function () {
                    Api.ScoutingDataItem.get({
                        _slug: self.club_slug_select
                    }, function (res) {
                        self.scouting_data_club = res;
                        self.team_data = res.team_data;
                        self.player_data = res.player_data;
                    });

                    self.error = 'Opgeslagen';
                }, function () {
                    self.error = 'Er ging iets mis, excuus voor het ongemak.';
                });
            } else {
                self.error = 'Niet alle verplichte velden zijn ingevuld!';
            }
        };

        self.addClub = function (club_temp) {
            self.club_temp = club_temp;
            var club_slug = self.club_temp.club_name.trim().toLowerCase().replace(/\s+/g, '');
            club_slug += self.club_temp.divisie.trim().toLowerCase().replace(/\s+/g, '');

            Api.ScoutingData.post({
                divisie: self.club_temp.divisie,
                club_slug: club_slug,
                club_name: self.club_temp.club_name,
                team_data: [],
                player_data: [],
                editor: editor_name
            }, function (res) {
                self.club_temp.club_name = '';
                self.club_temp.divisie = '';
                self.club_temp.error = false;

                Api.ScoutingData.query(function (res) {
                    self.scouting_data = res;
                });
            }, function () {
                self.club_temp.error = 'Er ging iets mis of deze club/divisie combinatie bestaat al';
                self.openModalAdd('md');
            });
        };

        self.addPlayer = function (player_temp) {
            self.player_temp = player_temp;
            var spelerNaam_slug = self.player_temp.spelerNaam.trim().toLowerCase().replace(/\s+/g, '');

            var speler = {};
            speler.spelerNaam_slug = spelerNaam_slug;
            speler.spelerNaam = self.player_temp.spelerNaam;
            speler.spelerType = self.player_temp.spelerType;
            speler.spelerPositie = self.player_temp.spelerPositie;
            speler.spelerGeboortedatum = self.player_temp.spelerGeboortedatum;
            speler.matches = [];
            self.scouting_data_club.player_data.push(speler);

            Api.ScoutingDataItem.put({
                _slug: self.scouting_data_club._id
            }, {
                player_data: self.scouting_data_club.player_data,
                editor: editor_name,
                date_edited: self.datetime
            }, function () {
                self.player_temp = {};
                self.player_temp.error = false;

                Api.ScoutingDataItem.get({
                    _slug: self.club_slug_select
                }, function (res) {
                    self.scouting_data_club = res;
                    self.player_data = res.player_data;
                });
            }, function () {
                self.player_temp.error = 'Er ging iets mis of deze club/divisie combinatie bestaat al';
                self.openModalAddPlayer('md');
            });
        };

        self.openModalAdd = function (size) {
            var modalInstance = $uibModal.open({
                templateUrl: 'modalAdd.html',
                controller: 'ModalAddInstance',
                size: size
            });
            modalInstance.result.then(function (club_temp) {
                self.addClub(club_temp);
            }, function () {
                //
            });
        };
        self.openModalAddPlayer = function (size) {
            var modalInstance = $uibModal.open({
                templateUrl: 'modalAddPlayer.html',
                controller: 'ModalAddInstance',
                size: size
            });
            modalInstance.result.then(function (player_temp) {
                self.addPlayer(player_temp);
            }, function () {
                //
            });
        };
    }])
    .controller('ModalAddInstance', function ($scope, $uibModalInstance) {
        $scope.ok = function (club_temp) {
            $uibModalInstance.close(club_temp);
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('ModalAddPlayerInstance', function ($scope, $uibModalInstance) {
        $scope.ok = function (club_temp) {
            $uibModalInstance.close(club_temp);
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });