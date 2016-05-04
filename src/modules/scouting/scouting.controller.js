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
        self.archive_season_select = '';
        self.archive_match_select = '';
        self.player_slug_select = '';
        self.player_season_select = '';
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

        // if not $sessionStorage.currentClub.spc_package == 'extra', not permitted, go to club
        // if user role == 'technische-staff+' or 'admin' load: '/scouting'
        // else load: '/scouting/{{ currentclub.teams.team_slug }}'
        if ($rootScope.currentClub && $rootScope.currentClub.teams[0].team_slug) {
            if ($sessionStorage.currentClub.spc_package !== 'extra') {
                $location.path('/club');
            } else if ($sessionStorage.currentUser.role !== 'technische-staff+' && $sessionStorage.currentUser.role !== 'admin') {
                $location.path('/scouting/' + $rootScope.currentClub.teams[0].team_slug);
            } else {
                self.club_url = '/scouting/' + $rootScope.currentClub.teams[0].team_slug;
            }
        } else if (!$rootScope.currentClub || !$rootScope.currentClub.teams[0].team_slug) {
            if ($sessionStorage.currentClub.spc_package !== 'extra') {
                $location.path('/club');
            } else if ($sessionStorage.currentUser.role !== 'technische-staff+' && $sessionStorage.currentUser.role !== 'admin') {
                $location.path('/scouting/fceindhoven_1');
            } else {
                self.club_url = '/scouting/fceindhoven_1';
            }
        } else {
            if ($sessionStorage.currentClub.spc_package !== 'extra') {
                $location.path('/club');
            } else if ($sessionStorage.currentUser.role !== 'technische-staff+' && $sessionStorage.currentUser.role !== 'admin') {
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
        Api.ScoutingData.query(function (res) {
            self.scouting_data = res;

            if ($rootScope.currentUser.middle_name) {
                editor_name = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.middle_name + ' ' + $rootScope.currentUser.last_name;
            } else {
                editor_name = $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.last_name;
            }
        });

        self.selectClub = function () {
            // select club from list and get data
            Api.ScoutingDataItem.get({
                _slug: self.club_slug_select
            }, function (res) {
                self.scouting_data_club = res;
                self.club_name = res.club_name;
                self.divisie = res.divisie;
                self.team_data = res.team_data;
                self.player_data = res.player_data;

                self.season_select = '';
                self.archive_season_select = '';
                self.player_slug_select = '';
            });
        };

        self.selectPlayer = function () {
            // select data from player_data for current player slug
            self.player_stats = $filter('filter')(self.player_data, {spelerNaam_slug: self.player_slug_select}, true)[0];
            self.player_season_select = '';
            self.player_season_stats = '';
        };
        self.selectPlayerSeason = function () {
            // if current player has current season select this seasons matches.match
            if ($filter('filter')(self.player_stats.matches, {season: self.player_season_select}, true) && $filter('filter')(self.player_stats.matches, {season: self.player_season_select}, true)[0]) {
                self.player_season_stats = ($filter('filter')(self.player_stats.matches, {season: self.player_season_select}, true)[0]).match;
            }
            self.playererror = '';
        };
        self.savePlayer = function () {
            // save all player_data from current player from current club
            // edited content automatically changed because of (unsafe) relations

            //console.log(JSON.stringify(self.scouting_data_club.player_data));

            Api.ScoutingDataItem.put({
                _slug: self.scouting_data_club._id
            }, {
                player_data: self.player_data,
                editor: editor_name,
                date_edited: self.datetime
            }, function () {
                Api.ScoutingDataItem.get({
                    _slug: self.club_slug_select
                }, function (res) {
                    self.scouting_data_club = res;
                    self.team_data = res.team_data;
                    self.player_data = res.player_data;
                    // refresh view
                    self.selectPlayer();
                });

                self.playererror = 'Opgeslagen';
            }, function () {
                self.playererror = 'Er ging iets mis, excuus voor het ongemak.';
            });
        };

        self.selectArchiveSeason = function () {
            // if team_data has current season select this seasons team_data.matches
            if ($filter('filter')(self.team_data, {season: self.archive_season_select}, true) && $filter('filter')(self.team_data, {season: self.archive_season_select}, true)[0]) {
                self.archive_season = ($filter('filter')(self.team_data, {season: self.archive_season_select}, true)[0]).matches;
            }
            self.archive_match_select = '';
        };
        self.selectArchiveMatch = function () {
            self.archive_stats = [];
            self.archive_stats_temp = [];

            // select match data from player_data for current season
            angular.forEach(self.player_data, function (value, key) {
                if ($filter('filter')(value.matches, {season: self.archive_season_select}, true) && $filter('filter')(value.matches, {season: self.archive_season_select}, true)[0]) {
                    if (($filter('filter')(value.matches, {season: self.archive_season_select}, true)[0]).match) {
                        var temp_season = ($filter('filter')(value.matches, {season: self.archive_season_select}, true)[0]).match;

                        // if match exists:
                        if ($filter('filter')(temp_season, {wedstrijd_slug: self.archive_match_select}, true) && $filter('filter')(temp_season, {wedstrijd_slug: self.archive_match_select}, true)[0]) {
                            var temp = $filter('filter')(temp_season, {wedstrijd_slug: self.archive_match_select}, true)[0];
                            temp.spelerNaam_slug = angular.copy(value.spelerNaam_slug);
                            temp.spelerNaam = angular.copy(value.spelerNaam);

                            self.archive_stats.push(temp);
                        }
                    }
                }
            });

            // select match data from team_data for current season
            self.archive_match = $filter('filter')(self.archive_season, {wedstrijd_slug: self.archive_match_select}, true)[0];

            // if opstellingThuis/Uit is empty then create array to make it editable
            if (!self.archive_match.opstellingThuis) {
                self.archive_match.opstellingThuis = {};
            }
            if (!self.archive_match.opstellingUit) {
                self.archive_match.opstellingUit = {};
            }

            self.archiveerror = '';
        };
        self.saveArchive = function () {
            // save all team_data and player_data from current club
            // edited content automatically changed because of (unsafe) relations

            //console.log(JSON.stringify(self.scouting_data_club.team_data));
            //console.log(JSON.stringify(self.scouting_data_club.player_data));

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
                    // refresh view
                    self.selectArchiveSeason();
                });

                self.archiveerror = 'Opgeslagen';
            }, function () {
                self.archiveerror = 'Er ging iets mis, excuus voor het ongemak.';
            });
        };
        self.addArchiveField = function () {
            // add field for player_data in extra table with current match info
            if (self.archive_match_select !== '') {
                var temp = {};
                temp.wedstrijd_slug = self.archive_match.wedstrijd_slug;
                temp.datum = self.archive_match.datum;
                temp.thuis = self.archive_match.thuis;
                temp.uit = self.archive_match.uit;
                temp.eindstand = self.archive_match.eindstand;
                self.archive_stats_temp.push(temp);
            }
        };
        self.delArchiveTempField = function (i) {
            // remove field for player_data
            self.archive_stats_temp.splice(i, 1);
        };
        self.changeArchiveField = function (i, player) {
            // convert data from extra table to player_data with correct player

            // temp = archive_stats_temp data with $index i
            // select player from self.player_data with player (= spelerNaam_slug)
            var temp = self.archive_stats_temp[i];
            var tempplayer = $filter('filter')(self.player_data, {spelerNaam_slug: player}, true)[0];

            // if current season is in matches select this season
            if ($filter('filter')(tempplayer.matches, {season: self.archive_season_select}, true) && $filter('filter')(tempplayer.matches, {season: self.archive_season_select}, true)[0]) {
                var tempplayerseason = $filter('filter')(tempplayer.matches, {season: self.archive_season_select}, true)[0];
                // if match array exists:
                if (tempplayerseason.match) {
                    tempplayerseason.match.push(temp);
                } else {
                    // create match array
                    tempplayerseason.match = [];
                    tempplayerseason.match.push(temp);
                }
            } else {
                // create new season from self.archive_season_select
                var temp1season = {};
                temp1season.season = self.archive_season_select;
                temp1season.match = [];
                temp1season.match.push(temp);
                tempplayer.matches.push(temp1season);
            }
            // refresh view
            self.selectArchiveMatch();
        };

        self.selectSeason = function () {
            // if self.season_select is not empty:
            if (self.season_select !== '') {
                // create match team_data for current season (empty offcourse)
                self.team_stats_temp = {};
                self.team_stats_temp.season = self.season_select;
                self.team_stats_temp.opstellingThuis = {};
                self.team_stats_temp.opstellinguit = {};

                // create match player_data for current season (empty offcourse)
                self.player_stats_temp = [];
                var temp = {};
                temp.spelerNaam_slug = '';
                temp.season = self.season_select;
                temp.match = {};
                self.player_stats_temp.push(temp);
            }
            self.error = '';
        };
        self.addField = function () {
            // add field for player_data in extra array
            if (self.season_select !== '') {
                var temp = {};
                temp.spelerNaam_slug = '';
                temp.season = self.season_select;
                temp.match = {};
                self.player_stats_temp.push(temp);
            }
        };
        self.delField = function (i) {
            // remove field for player_data
            self.player_stats_temp.splice(i, 1);
        };
        self.changeField = function (i, player) {
            // convert data from extra array to player_stats_temp with correct player
            self.player_stats_temp[i].spelerNaam_slug = player;
        };
        self.save = function () {
            // save all team_data and player_data from current club
            // edited content will not be changed automatically changed because of safe relations

            // if all required fields are filled in:
            if (self.season_select !== '' && self.team_stats_temp.thuis && self.team_stats_temp.uit && self.team_stats_temp.datum) {
                // create match info
                self.team_stats_temp.wedstrijd = self.team_stats_temp.thuis + ' - ' + self.team_stats_temp.uit;
                self.team_stats_temp.wedstrijd_slug = self.team_stats_temp.wedstrijd.trim().toLowerCase().replace(/\s+/g, '');
                self.team_stats_temp.wedstrijd_slug += self.team_stats_temp.datum.trim().toLowerCase().replace(/\s+/g, '');

                // if season exists:
                if ($filter('filter')(self.scouting_data_club.team_data, {season: self.season_select}, true) && $filter('filter')(self.scouting_data_club.team_data, {season: self.season_select}, true)[0]) {
                    // select season_matches
                    var season_matches = ($filter('filter')(self.scouting_data_club.team_data, {season: self.season_select}, true)[0]).matches;

                    // if match exists:
                    if ($filter('filter')(season_matches, {wedstrijd_slug: self.team_stats_temp.wedstrijd_slug}, true) && $filter('filter')(season_matches, {wedstrijd_slug: self.team_stats_temp.wedstrijd_slug}, true)[0]) {
                        // edit this match data
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
                        // create new match
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
                    // create new season and match
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

                // for each added player
                angular.forEach(self.player_stats_temp, function (value, key) {
                    // if player exists:
                    if ($filter('filter')(self.scouting_data_club.player_data, {spelerNaam_slug: value.spelerNaam_temp}, true) && $filter('filter')(self.scouting_data_club.player_data, {spelerNaam_slug: value.spelerNaam_temp}, true)[0]) {
                        // select player and player matches
                        var player = $filter('filter')(self.scouting_data_club.player_data, {spelerNaam_slug: value.spelerNaam_slug}, true)[0];
                        var player_matches = ($filter('filter')(self.scouting_data_club.player_data, {spelerNaam_slug: value.spelerNaam_slug}, true)[0]).matches;

                        // if season exists:
                        if ($filter('filter')(player_matches, {season: self.season_select}, true) && $filter('filter')(player_matches, {season: self.season_select}, true)[0]) {
                            // select season match(es)
                            var player_season_matches = ($filter('filter')(player_matches, {season: self.season_select}, true)[0]).match;

                            // if match exists:
                            if ($filter('filter')(player_season_matches, {wedstrijd_slug: self.team_stats_temp.wedstrijd_slug}, true) && $filter('filter')(player_season_matches, {wedstrijd_slug: self.team_stats_temp.wedstrijd_slug}, true)[0]) {
                                // edit this match data
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
                                        value1.tweebenigheid = value.match.tweebenigheid;

                                        value1.opmerking = value.match.opmerking;
                                        value1.date_added = self.datetime;
                                    }
                                });
                            } else {
                                // create new match
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
                                temp21.tweebenigheid = value.match.tweebenigheid;

                                temp21.opmerking = value.match.opmerking;
                                temp21.date_added = self.datetime;
                                player_season_matches.push(temp21);
                            }
                        } else {
                            // create season and match
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
                            temp2.tweebenigheid = value.match.tweebenigheid;

                            temp2.opmerking = value.match.opmerking;
                            temp2.date_added = self.datetime;
                            temp1.match.push(temp2);
                            player.matches = [];
                            player.matches.push(temp1);
                        }
                    }
                });

                //console.log(JSON.stringify(self.scouting_data_club.team_data));
                //console.log(JSON.stringify(self.scouting_data_club.player_data));

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
                        // refresh view
                        self.selectSeason();
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
            // add new club
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
            // add new player for current club
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
        self.openModalAddPlayer = function (size, club_name) {
            var modalInstance = $uibModal.open({
                templateUrl: 'modalAddPlayer.html',
                controller: 'ModalAddPlayerInstance',
                size: size,
                resolve: {
                    club_select: function () {
                        return club_name;
                    }
                }
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
    .controller('ModalAddPlayerInstance', function ($scope, $uibModalInstance, club_select) {
        $scope.club_select = club_select;

        $scope.ok = function (player_temp) {
            $uibModalInstance.close(player_temp);
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });