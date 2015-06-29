angular.module('mainapp.pageAdmin')
    .controller('mainapp.pageAdmin.AdminImportController', ['Api', 'Upload', '$filter', '$rootScope', '$location',
        function(Api, Upload, $filter, $rootScope, $location) {

        var self = this;
        self.datetime = new Date();

        self.temp = {};

        $rootScope.errorImport = '';
        self.uploadMatch = function (files) {
            $rootScope.errorImport = '';
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    Upload.upload({
                        url: 'api/media/' + self.temp.matchID,
                        method: 'POST',
                        file: file
                    })
                        /* jshint ignore:start */
                        .progress(function (evt) {
                            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                            console.log(' progress: ' + progressPercentage + '% ' + evt.config.file.name + '. file size (bytes): ' + evt.config.file.size);
                        })
                        .success(function (res) {
                            console.log('file ' + res + ' uploaded.');
                            if (res.split('.').pop() == 'json') {
                                self.processMatchDataFile(res);
                            }
                        })
                        .error(function () {
                            console.log('Something went wrong, could be the file size.');
                            $rootScope.errorImport = 'Something went wrong, could be the file size.';
                        });
                        /* jshint ignore:end */
                }
            }
        };

        self.uploadPlayers = function (files) {
            $rootScope.errorImport = '';
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    Upload.upload({
                        url: 'api/media/players',
                        method: 'POST',
                        file: file
                    })
                        /* jshint ignore:start */
                        .progress(function (evt) {
                            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                            console.log(' progress: ' + progressPercentage + '% ' + evt.config.file.name + '. file size (bytes): ' + evt.config.file.size);
                        })
                        .success(function (res) {
                            console.log('file ' + res + ' uploaded.');
                            $location.path('/admin');
                        })
                        .error(function () {
                            console.log('Something went wrong, could be the file size.');
                            $rootScope.errorImport = 'Something went wrong, could be the file size.';
                        });
                        /* jshint ignore:end */
                }
            }
        };

        // function for processing the match data file (.json) and push it to the correct model in the database
        self.processMatchDataFile = function (file_path) {
            var data = require('./media/data/' + file_path);
            var match_short;
            var match_data;
            var team_data;
            var player_data;

            if (data) {
                var items = {};
                items.matchID = data.wedstrijd_data.matchID[0];
                items.thuisTeamID = data.wedstrijd_data.thuisTeamID[0];
                items.uitTeamID = data.wedstrijd_data.uitTeamID[0];
                items.seizoen = "2014-2015 Play-offs";
                items.divisie = "Jupiler League";

                items.match_info = {};
                items.match_info = data.wedstrijd_data.titel[0];
                items.match_info.blessure_tijd = data.wedstrijd_data.blessure_tijd[0];
                items.match_info.coachuit = "Voornaam Achter";
                items.match_info.coachthuis = "Voor Achternaam";
                items.match_info.logo_thuis = items.match_info.wedstrijd.split(" - ", 1)[0] + '.jpg';
                items.match_info.logo_uit = items.match_info.wedstrijd.split(" - ", 2)[1] + '.jpg';
                items.match_info.thuis = items.match_info.wedstrijd.split(" - ", 1)[0];
                items.match_info.uit = items.match_info.wedstrijd.split(" - ", 2)[1];

                match_short = {};
                match_short.match_info = {};
                match_short.match_info = data.wedstrijd_data.titel[0];
                match_short.match_info.blessure_tijd = data.wedstrijd_data.blessure_tijd[0];
                match_short.match_info.coachuit = "Voornaam Achter";
                match_short.match_info.coachthuis = "Voor Achternaam";
                match_short.match_info.logo_thuis = items.match_info.wedstrijd.split(" - ", 1)[0] + '.jpg';
                match_short.match_info.logo_uit = items.match_info.wedstrijd.split(" - ", 2)[1] + '.jpg';
                match_short.match_info.thuis = items.match_info.wedstrijd.split(" - ", 1)[0];
                match_short.match_info.uit = items.match_info.wedstrijd.split(" - ", 2)[1];
                match_short.matchID = data.wedstrijd_data.matchID[0];
                match_short.thuisTeamID = data.wedstrijd_data.thuisTeamID[0];
                match_short.thuisTeamSlug = match_short.match_info.thuis.trim().toLowerCase().replace(/\s+/g, '');
                match_short.uitTeamID = data.wedstrijd_data.uitTeamID[0];
                match_short.uitTeamSlug = match_short.match_info.thuis.trim().toLowerCase().replace(/\s+/g, '');
                match_short.seizoen = "2014-2015 Play-offs";
                match_short.divisie = "Jupiler League";

                items.ronde = match_short.match_info.ronde;
                items.datum = match_short.match_info.datum;
                items.wedstrijd = match_short.match_info.wedstrijd;
                items.eindstand = match_short.match_info.eindstand;

                items.overzicht_lineup = data.wedstrijd_data.overzicht_lineup;

                items.opstelling = {};
                items.opstelling.thuis = data.wedstrijd_data.opstelling.thuis;
                items.opstelling.thuis_formatie = data.wedstrijd_data.opstelling.thuis_formatie[0];
                items.opstelling.uit = data.wedstrijd_data.opstelling.uit;
                items.opstelling.uit_formatie = data.wedstrijd_data.opstelling.uit_formatie[0];

                items.overzicht_wedstrijd = {};
                items.overzicht_wedstrijd.overzicht = [];
                items.overzicht_wedstrijd.overzicht_eerste_helft = [];
                items.overzicht_wedstrijd.overzicht_tweede_helft = [];
                angular.forEach(data.wedstrijd_data.overzicht_wedstrijd.overzicht, function (value, key) {
                    var temp = {};
                    temp.V1 = value[' '];
                    temp.V2 = value[' .1'];
                    temp.V3 = value[' .2'];
                    temp.V4 = value[' .3'];
                    temp.V5 = value[' .4'];
                    items.overzicht_wedstrijd.overzicht.push(temp);
                });
                items.overzicht_wedstrijd.overzicht.splice(0, 1);
                angular.forEach(data.wedstrijd_data.overzicht_wedstrijd.overzicht_eerste_helft, function (value, key) {
                    var temp = {};
                    temp.V1 = value[' '];
                    temp.V2 = value[' .1'];
                    temp.V3 = value[' .2'];
                    temp.V4 = value[' .3'];
                    temp.V5 = value[' .4'];
                    items.overzicht_wedstrijd.overzicht_eerste_helft.push(temp);
                });
                items.overzicht_wedstrijd.overzicht_eerste_helft.splice(0, 1);
                angular.forEach(data.wedstrijd_data.overzicht_wedstrijd.overzicht_tweede_helft, function (value, key) {
                    var temp = {};
                    temp.V1 = value[' '];
                    temp.V2 = value[' .1'];
                    temp.V3 = value[' .2'];
                    temp.V4 = value[' .3'];
                    temp.V5 = value[' .4'];
                    items.overzicht_wedstrijd.overzicht_tweede_helft.push(temp);
                });
                items.overzicht_wedstrijd.overzicht_tweede_helft.splice(0, 1);
                if (data.wedstrijd_data.overzicht_wedstrijd.overzicht_eerste_helft_verlenging) {
                    items.overzicht_wedstrijd.overzicht_eerste_helft_verlenging = [];
                    angular.forEach(data.wedstrijd_data.overzicht_wedstrijd.overzicht_eerste_helft_verlenging, function (value, key) {
                        var temp = {};
                        temp.V1 = value[' '];
                        temp.V2 = value[' .1'];
                        temp.V3 = value[' .2'];
                        temp.V4 = value[' .3'];
                        temp.V5 = value[' .4'];
                        items.overzicht_wedstrijd.overzicht_eerste_helft_verlenging.push(temp);
                    });
                    items.overzicht_wedstrijd.overzicht_eerste_helft_verlenging.splice(0, 1);
                }
                if (data.wedstrijd_data.overzicht_wedstrijd.overzicht_tweede_helft_verlenging) {
                    items.overzicht_wedstrijd.overzicht_tweede_helft_verlenging = [];
                    angular.forEach(data.wedstrijd_data.overzicht_wedstrijd.overzicht_tweede_helft_verlenging, function (value, key) {
                        var temp = {};
                        temp.V1 = value[' '];
                        temp.V2 = value[' .1'];
                        temp.V3 = value[' .2'];
                        temp.V4 = value[' .3'];
                        temp.V5 = value[' .4'];
                        items.overzicht_wedstrijd.overzicht_tweede_helft_verlenging.push(temp);
                    });
                    items.overzicht_wedstrijd.overzicht_tweede_helft_verlenging.splice(0, 1);
                }

                items.overzicht_wedstrijdstatistieken = [];
                angular.forEach(data.wedstrijd_data.overzicht_wedstrijdstatistieken, function (value, key) {
                    var temp = {};
                    temp.V1 = value[' '];
                    temp.V2 = value[' .1'];
                    temp.V3 = value[' .2'];
                    items.overzicht_wedstrijdstatistieken.push(temp);
                });

                items.balbezit = {};
                items.balbezit.hele_wedstrijd = data.wedstrijd_data.balbezit.hele_wedstrijd[0];
                items.balbezit.helft_1 = data.wedstrijd_data.balbezit.helft_1[0];
                items.balbezit.helft_2 = data.wedstrijd_data.balbezit.helft_2[0];
                items.balbezit.kwartier_1 = data.wedstrijd_data.balbezit.kwartier_1[0];
                items.balbezit.kwartier_2 = data.wedstrijd_data.balbezit.kwartier_2[0];
                items.balbezit.kwartier_3 = data.wedstrijd_data.balbezit.kwartier_3[0];
                items.balbezit.kwartier_4 = data.wedstrijd_data.balbezit.kwartier_4[0];
                items.balbezit.kwartier_5 = data.wedstrijd_data.balbezit.kwartier_5[0];
                items.balbezit.kwartier_6 = data.wedstrijd_data.balbezit.kwartier_6[0];

                items.overzicht_doelpogingen = [];
                angular.forEach(data.wedstrijd_data.overzicht_doelpogingen, function (value, key) {
                    var temp = {};
                    temp.V1 = value[' '];
                    temp.V2 = value[' .1'];
                    temp.V3 = value[' .2'];
                    items.overzicht_doelpogingen.push(temp);
                });

                items.duel_overzicht = [];
                angular.forEach(data.wedstrijd_data.duel_overzicht, function (value, key) {
                    var temp = {};
                    temp.V1 = value[items.match_info.thuis];
                    temp.V2 = value[' '];
                    temp.V3 = value[items.match_info.uit];
                    items.duel_overzicht.push(temp);
                });

                items.overtredingen = [];
                angular.forEach(data.wedstrijd_data.overtredingen, function (value, key) {
                    var temp = {};
                    temp.V1 = String(value[items.thuisTeamID]);
                    temp.V2 = value.NA;
                    temp.V3 = String(value[items.uitTeamID]);
                    items.overtredingen.push(temp);
                });

                items.spelhervattingen = [];
                angular.forEach(data.wedstrijd_data.spelhervattingen, function (value, key) {
                    var temp = {};
                    temp.V1 = value[items.thuisTeamID];
                    temp.V2 = value.NA;
                    temp.V3 = value[items.uitTeamID];
                    items.spelhervattingen.push(temp);
                });

                items.passes = [];
                angular.forEach(data.wedstrijd_data.passes, function (value, key) {
                    var temp = {};
                    temp.V1 = value[items.thuisTeamID];
                    temp.V2 = value.NA;
                    temp.V3 = value[items.uitTeamID];
                    items.passes.push(temp);
                });

                items.spelers_thuisteam = [];
                angular.forEach(data.wedstrijd_data.spelers_thuisteam, function (value, key) {
                    if (items.spelers_thuisteam.indexOf(value) < 0) {
                        items.spelers_thuisteam.push(value);
                    }
                });
                items.spelers_uitteam = [];
                angular.forEach(data.wedstrijd_data.spelers_uitteam, function (value, key) {
                    if (items.spelers_uitteam.indexOf(value) < 0) {
                        items.spelers_uitteam.push(value);
                    }
                });

                items.spelersthuisteam = [];
                var k1;
                for (k1 = 2; k1 < items.overzicht_lineup.length;) {
                    var value = {};
                    if (data.wedstrijd_data.overzicht_lineup[k1].V1 !== ' ') {
                        if (data.wedstrijd_data.overzicht_lineup[k1 - 1].V2 !== 'BANK') {
                            value = {};
                            value.spelerNaam = angular.copy(data.wedstrijd_data.overzicht_lineup[k1].V2).split(" (")[0];
                            value.rugnummer = angular.copy(data.wedstrijd_data.overzicht_lineup[k1].V1);
                            if ($filter('filter')(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]) {
                                value.personID = angular.copy($filter('filter')(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]).personID;
                            }
                            items.spelersthuisteam.push(value);
                            k1++;
                        } else {
                            break;
                        }
                    }
                    else if (data.wedstrijd_data.overzicht_lineup[k1 + 1].V1 !== ' ') {
                        if (data.wedstrijd_data.overzicht_lineup[k1].V2 !== 'BANK') {
                            value = {};
                            value.spelerNaam = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 1].V2).split(" (")[0];
                            value.rugnummer = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 1].V1);
                            if ($filter('filter')(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]) {
                                value.personID = angular.copy($filter('filter')(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]).personID;
                            }
                            items.spelersthuisteam.push(value);
                            k1 += 2;
                        } else {
                            break;
                        }
                    }
                    else if (data.wedstrijd_data.overzicht_lineup[k1 + 2].V1 !== ' ') {
                        if (data.wedstrijd_data.overzicht_lineup[k1 + 1].V2 !== 'BANK') {
                            value = {};
                            value.spelerNaam = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 2].V2).split(" (")[0];
                            value.rugnummer = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 2].V1);
                            if ($filter('filter')(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]) {
                                value.personID = angular.copy($filter('filter')(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]).personID;
                            }
                            items.spelersthuisteam.push(value);
                            k1 += 3;
                        } else {
                            break;
                        }
                    }
                    else if (data.wedstrijd_data.overzicht_lineup[k1 + 3].V1 !== ' ') {
                        if (data.wedstrijd_data.overzicht_lineup[k1 + 2].V2 !== 'BANK') {
                            value = {};
                            value.spelerNaam = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 3].V2).split(" (")[0];
                            value.rugnummer = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 3].V1);
                            if ($filter('filter')(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]) {
                                value.personID = angular.copy($filter('filter')(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]).personID;
                            }
                            items.spelersthuisteam.push(value);
                            k1 += 4;
                        } else {
                            break;
                        }
                    }
                    else if (data.wedstrijd_data.overzicht_lineup[k1 + 4].V1 !== ' ') {
                        if (data.wedstrijd_data.overzicht_lineup[k1 + 3].V2 !== 'BANK') {
                            value = {};
                            value.spelerNaam = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 4].V2).split(" (")[0];
                            value.rugnummer = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 4].V1);
                            if ($filter('filter')(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]) {
                                value.personID = angular.copy($filter('filter')(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]).personID;
                            }
                            items.spelersthuisteam.push(value);
                            k1 += 5;
                        } else {
                            break;
                        }
                    }
                    else if (data.wedstrijd_data.overzicht_lineup[k1 + 5].V1 !== ' ') {
                        if (data.wedstrijd_data.overzicht_lineup[k1 + 4].V2 !== 'BANK') {
                            value = {};
                            value.spelerNaam = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 5].V2).split(" (")[0];
                            value.rugnummer = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 5].V1);
                            if ($filter('filter')(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]) {
                                value.personID = angular.copy($filter('filter')(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]).personID;
                            }
                            items.spelersthuisteam.push(value);
                            k1 += 6;
                        } else {
                            break;
                        }
                    }
                    else {
                        if (data.wedstrijd_data.overzicht_lineup[k1 + 5].V2 !== 'BANK') {
                            value = {};
                            value.spelerNaam = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 6].V2).split(" (")[0];
                            value.rugnummer = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 6].V1);
                            if ($filter('filter')(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]) {
                                value.personID = angular.copy($filter('filter')(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]).personID;
                            }
                            items.spelersthuisteam.push(value);
                            k1 += 7;
                        } else {
                            break;
                        }
                    }
                }

                items.spelersuitteam = [];
                for (k1 = 2; k1 < items.overzicht_lineup.length;) {
                    var value = {};
                    if (data.wedstrijd_data.overzicht_lineup[k1].V3 !== ' ') {
                        if (data.wedstrijd_data.overzicht_lineup[k1 - 1].V4 !== 'BANK') {
                            value = {};
                            value.spelerNaam = angular.copy(data.wedstrijd_data.overzicht_lineup[k1].V4).split(" (")[0];
                            value.rugnummer = angular.copy(data.wedstrijd_data.overzicht_lineup[k1].V3);
                            if ($filter('filter')(items.spelers_uitteam, {spelerNaam: value.spelerNaam})[0]) {
                                value.personID = angular.copy($filter('filter')(items.spelers_uitteam, {spelerNaam: value.spelerNaam})[0]).personID;
                            }
                            items.spelersuitteam.push(value);
                            k1++;
                        } else {
                            break;
                        }
                    }
                    else if (data.wedstrijd_data.overzicht_lineup[k1 + 1].V3 !== ' ') {
                        if (data.wedstrijd_data.overzicht_lineup[k1].V4 !== 'BANK') {
                            value = {};
                            value.spelerNaam = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 1].V4).split(" (")[0];
                            value.rugnummer = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 1].V3);
                            if ($filter('filter')(items.spelers_uitteam, {spelerNaam: value.spelerNaam})[0]) {
                                value.personID = angular.copy($filter('filter')(items.spelers_uitteam, {spelerNaam: value.spelerNaam})[0]).personID;
                            }
                            items.spelersuitteam.push(value);
                            k1 += 2;
                        } else {
                            break;
                        }
                    }
                    else if (data.wedstrijd_data.overzicht_lineup[k1 + 2].V3 !== ' ') {
                        if (data.wedstrijd_data.overzicht_lineup[k1 + 1].V4 !== 'BANK') {
                            value = {};
                            value.spelerNaam = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 2].V4).split(" (")[0];
                            value.rugnummer = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 2].V3);
                            if ($filter('filter')(items.spelers_uitteam, {spelerNaam: value.spelerNaam})[0]) {
                                value.personID = angular.copy($filter('filter')(items.spelers_uitteam, {spelerNaam: value.spelerNaam})[0]).personID;
                            }
                            items.spelersuitteam.push(value);
                            k1 += 3;
                        } else {
                            break;
                        }
                    }
                    else if (data.wedstrijd_data.overzicht_lineup[k1 + 3].V3 !== ' ') {
                        if (data.wedstrijd_data.overzicht_lineup[k1 + 2].V4 !== 'BANK') {
                            value = {};
                            value.spelerNaam = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 3].V4).split(" (")[0];
                            value.rugnummer = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 3].V3);
                            if ($filter('filter')(items.spelers_uitteam, {spelerNaam: value.spelerNaam})[0]) {
                                value.personID = angular.copy($filter('filter')(items.spelers_uitteam, {spelerNaam: value.spelerNaam})[0]).personID;
                            }
                            items.spelersuitteam.push(value);
                            k1 += 4;
                        } else {
                            break;
                        }
                    }
                    else if (data.wedstrijd_data.overzicht_lineup[k1 + 4].V3 !== ' ') {
                        if (data.wedstrijd_data.overzicht_lineup[k1 + 3].V4 !== 'BANK') {
                            value = {};
                            value.spelerNaam = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 4].V4).split(" (")[0];
                            value.rugnummer = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 4].V3);
                            if ($filter('filter')(items.spelers_uitteam, {spelerNaam: value.spelerNaam})[0]) {
                                value.personID = angular.copy($filter('filter')(items.spelers_uitteam, {spelerNaam: value.spelerNaam})[0]).personID;
                            }
                            items.spelersuitteam.push(value);
                            k1 += 5;
                        } else {
                            break;
                        }
                    }
                    else if (data.wedstrijd_data.overzicht_lineup[k1 + 5].V3 !== ' ') {
                        if (data.wedstrijd_data.overzicht_lineup[k1 + 4].V4 !== 'BANK') {
                            value = {};
                            value.spelerNaam = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 5].V4).split(" (")[0];
                            value.rugnummer = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 5].V3);
                            if ($filter('filter')(items.spelers_uitteam, {spelerNaam: value.spelerNaam})[0]) {
                                value.personID = angular.copy($filter('filter')(items.spelers_uitteam, {spelerNaam: value.spelerNaam})[0]).personID;
                            }
                            items.spelersuitteam.push(value);
                            k1 += 6;
                        } else {
                            break;
                        }
                    }
                    else {
                        if (data.wedstrijd_data.overzicht_lineup[k1 + 5].V4 !== 'BANK') {
                            value = {};
                            value.spelerNaam = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 6].V4).split(" (")[0];
                            value.rugnummer = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 6].V3);
                            if ($filter('filter')(items.spelers_uitteam, {spelerNaam: value.spelerNaam})[0]) {
                                value.personID = angular.copy($filter('filter')(items.spelers_uitteam, {spelerNaam: value.spelerNaam})[0]).personID;
                            }
                            items.spelersuitteam.push(value);
                            k1 += 7;
                        } else {
                            break;
                        }
                    }
                }

                items.gemiddelde_posities_helft1 = [];
                items.gemiddelde_posities_helft2 = [];
                items.gemiddelde_posities_kwartier1 = [];
                items.gemiddelde_posities_kwartier2 = [];
                items.gemiddelde_posities_kwartier3 = [];
                items.gemiddelde_posities_kwartier4 = [];
                items.gemiddelde_posities_kwartier5 = [];
                items.gemiddelde_posities_kwartier6 = [];
                angular.forEach(items.spelersthuisteam, function (value, key) {
                    angular.forEach(data.wedstrijd_data.gemiddelde_posities_helft1, function (value1, key1) {
                        if (value1.personID[0] === value.personID) {
                            var temp = {};
                            temp.personID = value1.personID[0];
                            temp.spelerNaam = angular.copy(value.spelerNaam);
                            temp.rugnummer = angular.copy(value.rugnummer);
                            temp.lengte = value1['gem.lengte'][0];
                            temp.breedte = value1['gem.breedte'][0];
                            temp.teamNaam = value1.teamNaam;
                            items.gemiddelde_posities_helft1.push(temp);
                        }
                    });
                    angular.forEach(data.wedstrijd_data.gemiddelde_posities_helft2, function (value1, key1) {
                        if (value1.personID[0] === value.personID) {
                            var temp = {};
                            temp.personID = value1.personID[0];
                            temp.spelerNaam = angular.copy(value.spelerNaam);
                            temp.rugnummer = angular.copy(value.rugnummer);
                            temp.lengte = value1['gem.lengte'][0];
                            temp.breedte = value1['gem.breedte'][0];
                            temp.teamNaam = value1.teamNaam;
                            items.gemiddelde_posities_helft2.push(temp);
                        }
                    });
                    angular.forEach(data.wedstrijd_data.gemiddelde_posities_kwartier1, function (value1, key1) {
                        if (value1.personID[0] === value.personID) {
                            var temp = {};
                            temp.personID = value1.personID[0];
                            temp.spelerNaam = angular.copy(value.spelerNaam);
                            temp.rugnummer = angular.copy(value.rugnummer);
                            temp.lengte = value1['gem.lengte'][0];
                            temp.breedte = value1['gem.breedte'][0];
                            temp.teamNaam = value1.teamNaam;
                            items.gemiddelde_posities_kwartier1.push(temp);
                        }
                    });
                    angular.forEach(data.wedstrijd_data.gemiddelde_posities_kwartier2, function (value1, key1) {
                        if (value1.personID[0] === value.personID) {
                            var temp = {};
                            temp.personID = value1.personID[0];
                            temp.spelerNaam = angular.copy(value.spelerNaam);
                            temp.rugnummer = angular.copy(value.rugnummer);
                            temp.lengte = value1['gem.lengte'][0];
                            temp.breedte = value1['gem.breedte'][0];
                            temp.teamNaam = value1.teamNaam;
                            items.gemiddelde_posities_kwartier2.push(temp);
                        }
                    });
                    angular.forEach(data.wedstrijd_data.gemiddelde_posities_kwartier3, function (value1, key1) {
                        if (value1.personID[0] === value.personID) {
                            var temp = {};
                            temp.personID = value1.personID[0];
                            temp.spelerNaam = angular.copy(value.spelerNaam);
                            temp.rugnummer = angular.copy(value.rugnummer);
                            temp.lengte = value1['gem.lengte'][0];
                            temp.breedte = value1['gem.breedte'][0];
                            temp.teamNaam = value1.teamNaam;
                            items.gemiddelde_posities_kwartier3.push(temp);
                        }
                    });
                    angular.forEach(data.wedstrijd_data.gemiddelde_posities_kwartier4, function (value1, key1) {
                        if (value1.personID[0] === value.personID) {
                            var temp = {};
                            temp.personID = value1.personID[0];
                            temp.spelerNaam = angular.copy(value.spelerNaam);
                            temp.rugnummer = angular.copy(value.rugnummer);
                            temp.lengte = value1['gem.lengte'][0];
                            temp.breedte = value1['gem.breedte'][0];
                            temp.teamNaam = value1.teamNaam;
                            items.gemiddelde_posities_kwartier4.push(temp);
                        }
                    });
                    angular.forEach(data.wedstrijd_data.gemiddelde_posities_kwartier5, function (value1, key1) {
                        if (value1.personID[0] === value.personID) {
                            var temp = {};
                            temp.personID = value1.personID[0];
                            temp.spelerNaam = angular.copy(value.spelerNaam);
                            temp.rugnummer = angular.copy(value.rugnummer);
                            temp.lengte = value1['gem.lengte'][0];
                            temp.breedte = value1['gem.breedte'][0];
                            temp.teamNaam = value1.teamNaam;
                            items.gemiddelde_posities_kwartier5.push(temp);
                        }
                    });
                    angular.forEach(data.wedstrijd_data.gemiddelde_posities_kwartier6, function (value1, key1) {
                        if (value1.personID[0] === value.personID) {
                            var temp = {};
                            temp.personID = value1.personID[0];
                            temp.spelerNaam = angular.copy(value.spelerNaam);
                            temp.rugnummer = angular.copy(value.rugnummer);
                            temp.lengte = value1['gem.lengte'][0];
                            temp.breedte = value1['gem.breedte'][0];
                            temp.teamNaam = value1.teamNaam;
                            items.gemiddelde_posities_kwartier6.push(temp);
                        }
                    });
                });
                angular.forEach(items.spelersuitteam, function (value, key) {
                    angular.forEach(data.wedstrijd_data.gemiddelde_posities_helft1, function (value1, key1) {
                        if (value1.personID[0] === value.personID) {
                            var temp = {};
                            temp.personID = value1.personID[0];
                            temp.spelerNaam = angular.copy(value.spelerNaam);
                            temp.rugnummer = angular.copy(value.rugnummer);
                            temp.lengte = value1['gem.lengte'][0];
                            temp.breedte = value1['gem.breedte'][0];
                            temp.teamNaam = value1.teamNaam;
                            items.gemiddelde_posities_helft1.push(temp);
                        }
                    });
                    angular.forEach(data.wedstrijd_data.gemiddelde_posities_helft2, function (value1, key1) {
                        if (value1.personID[0] === value.personID) {
                            var temp = {};
                            temp.personID = value1.personID[0];
                            temp.spelerNaam = angular.copy(value.spelerNaam);
                            temp.rugnummer = angular.copy(value.rugnummer);
                            temp.lengte = value1['gem.lengte'][0];
                            temp.breedte = value1['gem.breedte'][0];
                            temp.teamNaam = value1.teamNaam;
                            items.gemiddelde_posities_helft2.push(temp);
                        }
                    });
                    angular.forEach(data.wedstrijd_data.gemiddelde_posities_kwartier1, function (value1, key1) {
                        if (value1.personID[0] === value.personID) {
                            var temp = {};
                            temp.personID = value1.personID[0];
                            temp.spelerNaam = angular.copy(value.spelerNaam);
                            temp.rugnummer = angular.copy(value.rugnummer);
                            temp.lengte = value1['gem.lengte'][0];
                            temp.breedte = value1['gem.breedte'][0];
                            temp.teamNaam = value1.teamNaam;
                            items.gemiddelde_posities_kwartier1.push(temp);
                        }
                    });
                    angular.forEach(data.wedstrijd_data.gemiddelde_posities_kwartier2, function (value1, key1) {
                        if (value1.personID[0] === value.personID) {
                            var temp = {};
                            temp.personID = value1.personID[0];
                            temp.spelerNaam = angular.copy(value.spelerNaam);
                            temp.rugnummer = angular.copy(value.rugnummer);
                            temp.lengte = value1['gem.lengte'][0];
                            temp.breedte = value1['gem.breedte'][0];
                            temp.teamNaam = value1.teamNaam;
                            items.gemiddelde_posities_kwartier2.push(temp);
                        }
                    });
                    angular.forEach(data.wedstrijd_data.gemiddelde_posities_kwartier3, function (value1, key1) {
                        if (value1.personID[0] === value.personID) {
                            var temp = {};
                            temp.personID = value1.personID[0];
                            temp.spelerNaam = angular.copy(value.spelerNaam);
                            temp.rugnummer = angular.copy(value.rugnummer);
                            temp.lengte = value1['gem.lengte'][0];
                            temp.breedte = value1['gem.breedte'][0];
                            temp.teamNaam = value1.teamNaam;
                            items.gemiddelde_posities_kwartier3.push(temp);
                        }
                    });
                    angular.forEach(data.wedstrijd_data.gemiddelde_posities_kwartier4, function (value1, key1) {
                        if (value1.personID[0] === value.personID) {
                            var temp = {};
                            temp.personID = value1.personID[0];
                            temp.spelerNaam = angular.copy(value.spelerNaam);
                            temp.rugnummer = angular.copy(value.rugnummer);
                            temp.lengte = value1['gem.lengte'][0];
                            temp.breedte = value1['gem.breedte'][0];
                            temp.teamNaam = value1.teamNaam;
                            items.gemiddelde_posities_kwartier4.push(temp);
                        }
                    });
                    angular.forEach(data.wedstrijd_data.gemiddelde_posities_kwartier5, function (value1, key1) {
                        if (value1.personID[0] === value.personID) {
                            var temp = {};
                            temp.personID = value1.personID[0];
                            temp.spelerNaam = angular.copy(value.spelerNaam);
                            temp.rugnummer = angular.copy(value.rugnummer);
                            temp.lengte = value1['gem.lengte'][0];
                            temp.breedte = value1['gem.breedte'][0];
                            temp.teamNaam = value1.teamNaam;
                            items.gemiddelde_posities_kwartier5.push(temp);
                        }
                    });
                    angular.forEach(data.wedstrijd_data.gemiddelde_posities_kwartier6, function (value1, key1) {
                        if (value1.personID[0] === value.personID) {
                            var temp = {};
                            temp.personID = value1.personID[0];
                            temp.spelerNaam = angular.copy(value.spelerNaam);
                            temp.rugnummer = angular.copy(value.rugnummer);
                            temp.lengte = value1['gem.lengte'][0];
                            temp.breedte = value1['gem.breedte'][0];
                            temp.teamNaam = value1.teamNaam;
                            items.gemiddelde_posities_kwartier6.push(temp);
                        }
                    });
                });

                team_data = {};
                team_data.thuis = {};
                team_data.uit = {};
                team_data.thuis.matchID = angular.copy(items.matchID);
                team_data.uit.matchID = angular.copy(items.matchID);
                team_data.thuis.ronde = angular.copy(items.match_info.ronde);
                team_data.uit.ronde = angular.copy(items.match_info.ronde);
                team_data.thuis.wedstrijd = angular.copy(items.match_info.wedstrijd);
                team_data.uit.wedstrijd = angular.copy(items.match_info.wedstrijd);
                team_data.thuis.doelpunten_voor = items.match_info.eindstand.split(" - ", 1)[0];
                team_data.thuis.doelpunten_tegen = items.match_info.eindstand.split(" - ", 2)[1];
                team_data.uit.doelpunten_voor = items.match_info.eindstand.split(" - ", 2)[1];
                team_data.uit.doelpunten_tegen = items.match_info.eindstand.split(" - ", 1)[0];
                if (items.match_info.eindstand.split(" - ", 1)[0] > items.match_info.eindstand.split(" - ", 2)[1]) {
                    team_data.thuis.punten = 3;
                    team_data.uit.punten = 0;
                } else if (items.match_info.eindstand.split(" - ", 1)[0] < items.match_info.eindstand.split(" - ", 2)[1]) {
                    team_data.thuis.punten = 0;
                    team_data.uit.punten = 3;
                } else if (items.match_info.eindstand.split(" - ", 1)[0] == items.match_info.eindstand.split(" - ", 2)[1]) {
                    team_data.thuis.punten = 1;
                    team_data.uit.punten = 1;
                }
                team_data.thuis.balbezit = $filter('filter')(data.team_matrix, {_row: 'Balbezit'}, true)[0][items.thuisTeamID];
                team_data.uit.balbezit = $filter('filter')(data.team_matrix, {_row: 'Balbezit'}, true)[0][items.uitTeamID];
                team_data.thuis.tot_passes = $filter('filter')(data.team_matrix, {_row: 'Tot. aantal passes'}, true)[0][items.thuisTeamID];
                team_data.uit.tot_passes = $filter('filter')(data.team_matrix, {_row: 'Tot. aantal passes'}, true)[0][items.uitTeamID];
                team_data.thuis.geslaagde_passes = $filter('filter')(data.team_matrix, {_row: 'Geslaagde passes'}, true)[0][items.thuisTeamID];
                team_data.uit.geslaagde_passes = $filter('filter')(data.team_matrix, {_row: 'Geslaagde passes'}, true)[0][items.uitTeamID];
                team_data.thuis.lengte_passes = $filter('filter')(data.team_matrix, {_row: 'Gem. lengte passes'}, true)[0][items.thuisTeamID];
                team_data.uit.lengte_passes = $filter('filter')(data.team_matrix, {_row: 'Gem. lengte passes'}, true)[0][items.uitTeamID];
                team_data.thuis.doelpogingen = $filter('filter')(data.team_matrix, {_row: 'Doelpogingen'}, true)[0][items.thuisTeamID];
                team_data.uit.doelpogingen = $filter('filter')(data.team_matrix, {_row: 'Doelpogingen'}, true)[0][items.uitTeamID];
                team_data.thuis.gewonnen_duels = $filter('filter')(data.team_matrix, {_row: 'Gewonnen duels'}, true)[0][items.thuisTeamID];
                team_data.uit.gewonnen_duels = $filter('filter')(data.team_matrix, {_row: 'Gewonnen duels'}, true)[0][items.uitTeamID];
                team_data.thuis.geel = $filter('filter')(data.team_matrix, {_row: 'Gele kaarten'}, true)[0][items.thuisTeamID];
                team_data.uit.geel = $filter('filter')(data.team_matrix, {_row: 'Gele kaarten'}, true)[0][items.uitTeamID];
                team_data.thuis.rood = $filter('filter')(data.team_matrix, {_row: 'Rode kaarten'}, true)[0][items.thuisTeamID];
                team_data.uit.rood = $filter('filter')(data.team_matrix, {_row: 'Rode kaarten'}, true)[0][items.uitTeamID];

                items.duel_matrix_hele_wedstrijd = data.team_data.duel_matrix_hele_wedstrijd;
                items.duel_matrix_hele_wedstrijd_thuis_spelers_uitteam = [];
                items.duel_matrix_hele_wedstrijd_uit_spelers_thuisteam = [];
                items.duel_matrix_eerste_helft = data.team_data.duel_matrix_eerste_helft;
                items.duel_matrix_eerste_helft_thuis_spelers_uitteam = [];
                items.duel_matrix_eerste_helft_uit_spelers_thuisteam = [];
                items.duel_matrix_tweede_helft = data.team_data.duel_matrix_tweede_helft;
                items.duel_matrix_tweede_helft_thuis_spelers_uitteam = [];
                items.duel_matrix_tweede_helft_uit_spelers_thuisteam = [];
                angular.forEach(data.wedstrijd_data.spelers_thuisteam, function (value, key) {
                    angular.forEach(items.duel_matrix_hele_wedstrijd.thuis, function (value1, key1) {
                        if (Number(value1['1']) === value.personID) value1['1'] = angular.copy(value.spelerNaam);
                    });
                    var del = true;
                    if (del && items.duel_matrix_hele_wedstrijd.uit[0][value.personID] >= 0) del = false;
                    if (!del) items.duel_matrix_hele_wedstrijd_uit_spelers_thuisteam.push(value);

                    angular.forEach(items.duel_matrix_eerste_helft.thuis, function (value1, key1) {
                        if (Number(value1['1']) === value.personID) value1['1'] = angular.copy(value.spelerNaam);
                    });
                    del = true;
                    if (del && items.duel_matrix_eerste_helft.uit[0][value.personID] >= 0) del = false;
                    if (!del) items.duel_matrix_eerste_helft_uit_spelers_thuisteam.push(value);

                    angular.forEach(items.duel_matrix_tweede_helft.thuis, function (value1, key1) {
                        if (Number(value1['1']) === value.personID) value1['1'] = angular.copy(value.spelerNaam);
                    });
                    del = true;
                    if (del && items.duel_matrix_tweede_helft.uit[0][value.personID] >= 0) del = false;
                    if (!del) items.duel_matrix_tweede_helft_uit_spelers_thuisteam.push(value);
                });
                angular.forEach(data.wedstrijd_data.spelers_uitteam, function (value, key) {
                    var del = true;
                    if (del && items.duel_matrix_hele_wedstrijd.thuis[0][value.personID] >= 0) del = false;
                    if (!del) items.duel_matrix_hele_wedstrijd_thuis_spelers_uitteam.push(value);
                    angular.forEach(items.duel_matrix_hele_wedstrijd.uit, function (value1, key1) {
                        if (Number(value1['1']) === value.personID) value1['1'] = angular.copy(value.spelerNaam);
                    });

                    del = true;
                    if (del && items.duel_matrix_eerste_helft.thuis[0][value.personID] >= 0) del = false;
                    if (!del) items.duel_matrix_eerste_helft_thuis_spelers_uitteam.push(value);
                    angular.forEach(items.duel_matrix_eerste_helft.uit, function (value1, key1) {
                        if (Number(value1['1']) === value.personID) value1['1'] = angular.copy(value.spelerNaam);
                    });

                    del = true;
                    if (del && items.duel_matrix_tweede_helft.thuis[0][value.personID] >= 0) del = false;
                    if (!del) items.duel_matrix_tweede_helft_thuis_spelers_uitteam.push(value);
                    angular.forEach(items.duel_matrix_tweede_helft.uit, function (value1, key1) {
                        if (Number(value1['1']) === value.personID) value1['1'] = angular.copy(value.spelerNaam);
                    });
                });

                items.passes_per_zone = data.team_data.passes_per_zone;

                items.locatie_doelpogingen = data.team_data.locatie_doelpogingen;
                angular.forEach(items.spelersthuisteam, function (value, key) {
                    angular.forEach(items.locatie_doelpogingen.thuisTeam, function (value1, key1) {
                        if (value1.personID == value.personID) {
                            value1.spelerNaam = angular.copy(value.spelerNaam);
                            value1.rugnummer = angular.copy(value.rugnummer);
                        }
                    });
                });
                angular.forEach(items.spelersuitteam, function (value, key) {
                    angular.forEach(items.locatie_doelpogingen.uitTeam, function (value1, key1) {
                        if (value1.personID == value.personID) {
                            value1.spelerNaam = angular.copy(value.spelerNaam);
                            value1.rugnummer = angular.copy(value.rugnummer);
                        }
                    });
                });

                items.pass_matrix_helft1 = data.team_data.pass_matrix_helft1;
                items.pass_matrix_helft1_thuis_spelers = [];
                items.pass_matrix_helft1_uit_spelers = [];
                items.pass_matrix_helft2 = data.team_data.pass_matrix_helft2;
                items.pass_matrix_helft2_thuis_spelers = [];
                items.pass_matrix_helft2_uit_spelers = [];
                angular.forEach(data.wedstrijd_data.spelers_thuisteam, function (value, key) {
                    angular.forEach(items.pass_matrix_helft1.thuis.passMatrix, function (value1, key1) {
                        if (Number(value1._row) === value.personID) {
                            value1._row = angular.copy(value.spelerNaam);
                            items.pass_matrix_helft1_thuis_spelers.push(value);
                        }
                    });
                    angular.forEach(items.pass_matrix_helft2.thuis.passMatrix, function (value1, key1) {
                        if (Number(value1._row) === value.personID) {
                            value1._row = angular.copy(value.spelerNaam);
                            items.pass_matrix_helft2_thuis_spelers.push(value);
                        }
                    });
                    angular.forEach(items.pass_matrix_helft1.thuis.passMatrix2, function (value1, key1) {
                        if (Number(value1._row) === value.personID) {
                            value1._row = angular.copy(value.spelerNaam);
                        }
                    });
                    angular.forEach(items.pass_matrix_helft2.thuis.passMatrix2, function (value1, key1) {
                        if (Number(value1._row) === value.personID) {
                            value1._row = angular.copy(value.spelerNaam);
                        }
                    });
                });
                angular.forEach(data.wedstrijd_data.spelers_uitteam, function (value, key) {
                    angular.forEach(items.pass_matrix_helft1.uit.passMatrix, function (value1, key1) {
                        if (Number(value1._row) === value.personID) {
                            value1._row = angular.copy(value.spelerNaam);
                            items.pass_matrix_helft1_uit_spelers.push(value);
                        }
                    });
                    angular.forEach(items.pass_matrix_helft2.uit.passMatrix, function (value1, key1) {
                        if (Number(value1._row) === value.personID) {
                            value1._row = angular.copy(value.spelerNaam);
                            items.pass_matrix_helft2_uit_spelers.push(value);
                        }
                    });
                    angular.forEach(items.pass_matrix_helft1.uit.passMatrix2, function (value1, key1) {
                        if (Number(value1._row) === value.personID) {
                            value1._row = angular.copy(value.spelerNaam);
                        }
                    });
                    angular.forEach(items.pass_matrix_helft2.uit.passMatrix2, function (value1, key1) {
                        if (Number(value1._row) === value.personID) {
                            value1._row = angular.copy(value.spelerNaam);
                        }
                    });
                });

                items.penalty_visualisatie = data.team_data.penalty_visualisatie;
                angular.forEach(items.penalty_visualisatie, function (value, key) {
                    angular.forEach(items.spelersthuisteam, function (value1, key1) {
                        if (value1.personID == value.schutter) {
                            value.schutter_personID = angular.copy(value.schutter);
                            value.schutter = angular.copy(value1.spelerNaam);
                        }
                        if (value1.personID == value.keeper) {
                            value.keeper_personID = angular.copy(value.keeper);
                            value.keeper = angular.copy(value1.spelerNaam);
                        }
                    });
                    angular.forEach(items.spelersuitteam, function (value1, key1) {
                        if (value1.personID == value.schutter) {
                            value.schutter_personID = angular.copy(value.schutter);
                            value.schutter = angular.copy(value1.spelerNaam);
                        }
                        if (value1.personID == value.keeper) {
                            value.keeper_personID = angular.copy(value.keeper);
                            value.keeper = angular.copy(value1.spelerNaam);
                        }
                    });
                });

                items.overzicht_overtredingen_per_speler = {};
                items.overzicht_overtredingen_per_speler.thuis = [];
                items.overzicht_overtredingen_per_speler.uit = [];
                angular.forEach(data.team_data.overzicht_overtredingen_per_speler.fouls_thuis, function (value1, key1) {
                    angular.forEach(data.wedstrijd_data.spelers_thuisteam, function (value, key) {
                        if (Number(value1.personID) == value.personID) {
                            value1.spelerNaam = angular.copy(value.spelerNaam);
                            value1.buitenspel = $filter('filter')(data.team_data.overzicht_overtredingen_per_speler.offside_thuis, {personID: value1.personID}, true)[0].n;
                        }
                    });
                    items.overzicht_overtredingen_per_speler.thuis.push(value1);
                });
                angular.forEach(data.team_data.overzicht_overtredingen_per_speler.fouls_uit, function (value1, key1) {
                    angular.forEach(data.wedstrijd_data.spelers_uitteam, function (value, key) {
                        if (Number(value1.personID) == value.personID) {
                            value1.spelerNaam = angular.copy(value.spelerNaam);
                            value1.buitenspel = $filter('filter')(data.team_data.overzicht_overtredingen_per_speler.offside_uit, {personID: value1.personID}, true)[0].n;
                        }
                    });
                    items.overzicht_overtredingen_per_speler.uit.push(value1);
                });

                items.locatie_overtredingen = data.team_data.locatie_overtredingen;
                angular.forEach(items.spelersthuisteam, function (value, key) {
                    angular.forEach(items.locatie_overtredingen.thuisTeam, function (value1, key1) {
                        if (value1.personID == value.personID) {
                            value1.spelerNaam = angular.copy(value.spelerNaam);
                            value1.rugnummer = angular.copy(value.rugnummer);
                        }
                    });
                });
                angular.forEach(items.spelersuitteam, function (value, key) {
                    angular.forEach(items.locatie_overtredingen.uitTeam, function (value1, key1) {
                        if (value1.personID == value.personID) {
                            value1.spelerNaam = angular.copy(value.spelerNaam);
                            value1.rugnummer = angular.copy(value.rugnummer);
                        }
                    });
                });

                player_data = {};
                player_data.player_stats_thuis = [];
                player_data.player_stats_uit = [];
                angular.forEach(data.thuisSpelers_data, function (value, key) {
                    var temp = {};
                    temp.matchID = angular.copy(items.matchID);
                    temp.match = angular.copy(items.match_info.wedstrijd);
                    temp.result = angular.copy(items.match_info.eindstand);
                    temp.date = angular.copy(items.match_info.datum);
                    temp.ronde = angular.copy(items.match_info.ronde);
                    temp.teamID = angular.copy(items.thuisTeamID);
                    temp.type = angular.copy(value.stat_matrix.type[0]);
                    temp.personID = angular.copy(value.speler[0]);
                    angular.forEach(items.spelersthuisteam, function (value1, key1) {
                        if (value1.personID == value.speler[0]) {
                            temp.spelerNaam = angular.copy(value1.spelerNaam);
                            temp.rugnummer = angular.copy(value1.rugnummer);
                        }
                    });
                    if (temp.type == 'keeper') {
                        temp.minuten = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Minuten'}, true)[0][temp.personID];
                        temp.reddingen = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Reddingen'}, true)[0][temp.personID];
                        temp.geslaagde_reddingen = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Geslaagde reddingen'}, true)[0][temp.personID].split("%")[0];
                        temp.korte_passes = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Aantal korte passes'}, true)[0][temp.personID];
                        temp.middellange_passes = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Aantal middellange passes'}, true)[0][temp.personID];
                        temp.lange_passes = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Aantal lange passes'}, true)[0][temp.personID];
                        temp.pass_percentage = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Geslaagde passes'}, true)[0][temp.personID].split("%")[0];
                        temp.gevangen_ballen = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Gevangen ballen'}, true)[0][temp.personID];
                        temp.weggestompte_ballen = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Weggestompte ballen'}, true)[0][temp.personID];
                        temp.succesvolle_uittrappen = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Succesvolle uittrappen'}, true)[0][temp.personID].split("%")[0];
                        temp.geel = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Gele kaarten'}, true)[0][temp.personID];
                        temp.rood = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Rode kaart'}, true)[0][temp.personID];
                        temp.doelpunten_tegen = items.match_info.eindstand.split(" - ", 1)[0];
                        temp.pass_lengte = String((Number(value.pass_soorten_helft1[temp.personID][0].gem_len.split("m")[0]) + Number(value.pass_soorten_helft2[temp.personID][0].gem_len.split("m")[0]) / 2).toFixed(1)) + 'm.';
                    } else {
                        temp.minuten = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Minuten'}, true)[0][temp.personID];
                        temp.doelpunten = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Doelpunten'}, true)[0][temp.personID];
                        temp.aantal_passes = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Aantal passes'}, true)[0][temp.personID];
                        temp.geslaagde_passes = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Geslaagde passes'}, true)[0][temp.personID];
                        temp.pass_percentage = ((Number(temp.geslaagde_passes) / Number(temp.aantal_passes)) * 100).toFixed(1);
                        temp.doelpogingen = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Doelpogingen'}, true)[0][temp.personID];
                        temp.doelpogingen_opdoel = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Doelpogingen op doel'}, true)[0][temp.personID].split("%")[0];
                        temp.voorzetten = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Voorzetten'}, true)[0][temp.personID];
                        temp.gewonnen_duels = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Gewonnen duels'}, true)[0][temp.personID].split("%")[0];
                        temp.intercepties = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Intercepties'}, true)[0][temp.personID];
                        temp.overtredingen = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Overtredingen'}, true)[0][temp.personID];
                        temp.geel = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Gele kaarten'}, true)[0][temp.personID];
                        temp.rood = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Rode kaart'}, true)[0][temp.personID];
                        temp.verdedigende_duels = angular.copy(value.algemene_stats[6][0][0]);
                        temp.aanvallende_duels = angular.copy(value.algemene_stats[4][0][0]);
                        temp.pass_lengte = String((Number(value.pass_soorten_helft1[temp.personID][0].gem_len.split("m")[0]) + Number(value.pass_soorten_helft2[temp.personID][0].gem_len.split("m")[0]) / 2).toFixed(1)) + 'm.';
                    }
                    player_data.player_stats_thuis.push(temp);
                });
                angular.forEach(data.uitSpelers_data, function (value, key) {
                    var temp = {};
                    temp.matchID = angular.copy(items.matchID);
                    temp.match = angular.copy(items.match_info.wedstrijd);
                    temp.result = angular.copy(items.match_info.eindstand);
                    temp.date = angular.copy(items.match_info.datum);
                    temp.ronde = angular.copy(items.match_info.ronde);
                    temp.teamID = angular.copy(items.thuisTeamID);
                    temp.type = angular.copy(value.stat_matrix.type[0]);
                    temp.personID = angular.copy(value.speler[0]);
                    angular.forEach(items.spelersuitteam, function (value1, key1) {
                        if (value1.personID == value.speler[0]) {
                            temp.spelerNaam = angular.copy(value1.spelerNaam);
                            temp.rugnummer = angular.copy(value1.rugnummer);
                        }
                    });
                    if (temp.type == 'keeper') {
                        temp.minuten = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Minuten'}, true)[0][temp.personID];
                        temp.reddingen = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Reddingen'}, true)[0][temp.personID];
                        temp.geslaagde_reddingen = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Geslaagde reddingen'}, true)[0][temp.personID].split("%")[0];
                        temp.korte_passes = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Aantal korte passes'}, true)[0][temp.personID];
                        temp.middellange_passes = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Aantal middellange passes'}, true)[0][temp.personID];
                        temp.lange_passes = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Aantal lange passes'}, true)[0][temp.personID];
                        temp.pass_percentage = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Geslaagde passes'}, true)[0][temp.personID].split("%")[0];
                        temp.gevangen_ballen = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Gevangen ballen'}, true)[0][temp.personID];
                        temp.weggestompte_ballen = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Weggestompte ballen'}, true)[0][temp.personID];
                        temp.succesvolle_uittrappen = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Succesvolle uittrappen'}, true)[0][temp.personID].split("%")[0];
                        temp.geel = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Gele kaarten'}, true)[0][temp.personID];
                        temp.rood = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Rode kaart'}, true)[0][temp.personID];
                        temp.doelpunten_tegen = items.match_info.eindstand.split(" - ", 1)[0];
                        temp.pass_lengte = String((Number(value.pass_soorten_helft1[temp.personID][0].gem_len.split("m")[0]) + Number(value.pass_soorten_helft2[temp.personID][0].gem_len.split("m")[0]) / 2).toFixed(1)) + 'm.';
                    } else {
                        temp.minuten = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Minuten'}, true)[0][temp.personID];
                        temp.doelpunten = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Doelpunten'}, true)[0][temp.personID];
                        temp.aantal_passes = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Aantal passes'}, true)[0][temp.personID];
                        temp.geslaagde_passes = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Geslaagde passes'}, true)[0][temp.personID];
                        temp.pass_percentage = ((Number(temp.geslaagde_passes) / Number(temp.aantal_passes)) * 100).toFixed(1);
                        temp.doelpogingen = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Doelpogingen'}, true)[0][temp.personID];
                        temp.doelpogingen_opdoel = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Doelpogingen op doel'}, true)[0][temp.personID].split("%")[0];
                        temp.voorzetten = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Voorzetten'}, true)[0][temp.personID];
                        temp.gewonnen_duels = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Gewonnen duels'}, true)[0][temp.personID].split("%")[0];
                        temp.intercepties = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Intercepties'}, true)[0][temp.personID];
                        temp.overtredingen = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Overtredingen'}, true)[0][temp.personID];
                        temp.geel = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Gele kaarten'}, true)[0][temp.personID];
                        temp.rood = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Rode kaart'}, true)[0][temp.personID];
                        temp.verdedigende_duels = angular.copy(value.algemene_stats[6][0][0]);
                        temp.aanvallende_duels = angular.copy(value.algemene_stats[4][0][0]);
                        temp.pass_lengte = String((Number(value.pass_soorten_helft1[temp.personID][0].gem_len.split("m")[0]) + Number(value.pass_soorten_helft2[temp.personID][0].gem_len.split("m")[0]) / 2).toFixed(1)) + 'm.';
                    }
                    player_data.player_stats_uit.push(temp);
                });

                items.player_stats_full_thuis = [];
                items.player_stats_full_uit = [];
                angular.forEach(data.thuisSpelers_data, function (value, key) {
                    var temp = {};
                    temp.type = angular.copy(value.stat_matrix.type[0]);
                    temp.personID = angular.copy(value.speler[0]);
                    angular.forEach(items.spelersthuisteam, function (value1, key1) {
                        if (value1.personID == value.speler[0]) {
                            temp.spelerNaam = angular.copy(value1.spelerNaam);
                            temp.rugnummer = angular.copy(value1.rugnummer);
                        }
                    });
                    if (temp.type == 'keeper') {
                        temp.minuten = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Minuten'}, true)[0][temp.personID];
                        temp.reddingen = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Reddingen'}, true)[0][temp.personID];
                        temp.geslaagde_reddingen = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Geslaagde reddingen'}, true)[0][temp.personID].split("%")[0];
                        temp.korte_passes = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Aantal korte passes'}, true)[0][temp.personID];
                        temp.middellange_passes = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Aantal middellange passes'}, true)[0][temp.personID];
                        temp.lange_passes = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Aantal lange passes'}, true)[0][temp.personID];
                        temp.pass_percentage = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Geslaagde passes'}, true)[0][temp.personID].split("%")[0];
                        temp.gevangen_ballen = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Gevangen ballen'}, true)[0][temp.personID];
                        temp.weggestompte_ballen = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Weggestompte ballen'}, true)[0][temp.personID];
                        temp.succesvolle_uittrappen = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Succesvolle uittrappen'}, true)[0][temp.personID].split("%")[0];
                        temp.geel = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Gele kaarten'}, true)[0][temp.personID];
                        temp.rood = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Rode kaart'}, true)[0][temp.personID];
                        temp.doelpunten_tegen = items.match_info.eindstand.split(" - ", 1)[0];
                        temp.pass_lengte = String((Number(value.pass_soorten_helft1[temp.personID][0].gem_len.split("m")[0]) + Number(value.pass_soorten_helft2[temp.personID][0].gem_len.split("m")[0]) / 2).toFixed(1)) + 'm.';

                        temp.locatie_reddingen = [];
                        angular.forEach(value.locaties_reddingen, function (value, key1) {
                            var temp1 = {};
                            temp1.zend_length = angular.copy(value.zend_length);
                            temp1.zend_width = angular.copy(value.zend_width);
                            temp1.ontvang_length = angular.copy(value.ontvang_length);
                            temp1.ontvang_width = angular.copy(value.ontvang_width);
                            temp1.actie = angular.copy(value.actie);

                            temp.locatie_reddingen.push(temp1);
                        });

                        temp.locatie_uittrappen = [];
                        angular.forEach(value.locaties_uittrappen, function (value, key1) {
                            var temp1 = {};
                            temp1.zend_length = angular.copy(value.zend_lengte);
                            temp1.zend_width = angular.copy(value.zend_breedte);
                            temp1.ontvang_length = angular.copy(value.ontvang_lengte[0]);
                            temp1.ontvang_width = angular.copy(value.ontvang_breedte[0]);
                            angular.forEach(items.spelersthuisteam, function (value1, key1) {
                                if (value1.personID == value.teamgenoot) {
                                    temp1.teamgenootID = angular.copy(value1.personID);
                                    temp1.teamgenoot = angular.copy(value1.spelerNaam);
                                }
                            });
                            angular.forEach(items.spelersuitteam, function (value1, key1) {
                                if (value1.personID == value.teamgenoot) {
                                    temp1.teamgenootID = angular.copy(value1.personID);
                                    temp1.teamgenoot = angular.copy(value1.spelerNaam);
                                }
                            });
                            temp.locatie_uittrappen.push(temp1);
                        });
                    } else {
                        temp.minuten = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Minuten'}, true)[0][temp.personID];
                        temp.doelpunten = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Doelpunten'}, true)[0][temp.personID];
                        temp.aantal_passes = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Aantal passes'}, true)[0][temp.personID];
                        temp.geslaagde_passes = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Geslaagde passes'}, true)[0][temp.personID];
                        temp.pass_percentage = ((Number(temp.geslaagde_passes) / Number(temp.aantal_passes)) * 100).toFixed(1);
                        temp.doelpogingen = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Doelpogingen'}, true)[0][temp.personID];
                        temp.doelpogingen_opdoel = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Doelpogingen op doel'}, true)[0][temp.personID].split("%")[0];
                        temp.voorzetten = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Voorzetten'}, true)[0][temp.personID];
                        temp.gewonnen_duels = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Gewonnen duels'}, true)[0][temp.personID].split("%")[0];
                        temp.intercepties = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Intercepties'}, true)[0][temp.personID];
                        temp.overtredingen = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Overtredingen'}, true)[0][temp.personID];
                        temp.geel = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Gele kaarten'}, true)[0][temp.personID];
                        temp.rood = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Rode kaart'}, true)[0][temp.personID];
                        temp.verdedigende_duels = angular.copy(value.algemene_stats[6][0][0]);
                        temp.aanvallende_duels = angular.copy(value.algemene_stats[4][0][0]);
                        temp.pass_lengte = String((Number(value.pass_soorten_helft1[temp.personID][0].gem_len.split("m")[0]) + Number(value.pass_soorten_helft2[temp.personID][0].gem_len.split("m")[0]) / 2).toFixed(1)) + 'm.';

                        temp.aanvallende_acties_helft1 = {};
                        temp.aanvallende_acties_helft1.aanvallende_duels = angular.copy(value.aanvallende_acties_helft1[0][0][0]);
                        temp.aanvallende_acties_helft1.aanvallende_duels_gewonnen = angular.copy(value.aanvallende_acties_helft1[1][0][0]);
                        temp.aanvallende_acties_helft1.dribbels = angular.copy(value.aanvallende_acties_helft1[2][0][0]);
                        temp.aanvallende_acties_helft1.schoten = angular.copy(value.aanvallende_acties_helft1[3][0][0]);
                        temp.aanvallende_acties_helft1.schoten_doel = angular.copy(value.aanvallende_acties_helft1[4][0][0]);
                        temp.aanvallende_acties_helft1.schoten_ijzer = angular.copy(value.aanvallende_acties_helft1[5][0][0]);
                        temp.aanvallende_acties_helft1.schoten_naast = angular.copy(value.aanvallende_acties_helft1[6][0][0]);
                        temp.aanvallende_acties_helft1.schoten_over = angular.copy(value.aanvallende_acties_helft1[7][0][0]);
                        temp.aanvallende_acties_helft1.schoten_geblokkeerd = angular.copy(value.aanvallende_acties_helft1[8][0][0]);
                        temp.aanvallende_acties_helft1.schoten_binnen_16 = angular.copy(value.aanvallende_acties_helft1[9][0][0]);
                        temp.aanvallende_acties_helft1.schoten_buiten_16 = angular.copy(value.aanvallende_acties_helft1[10][0][0]);
                        temp.aanvallende_acties_helft1.sleutel_acties = angular.copy(value.aanvallende_acties_helft1[11][0][0]);
                        temp.aanvallende_acties_helft1.sleutel_passes = angular.copy(value.aanvallende_acties_helft1[12][0][0]);
                        temp.aanvallende_acties_helft1.kruisballen = angular.copy(value.aanvallende_acties_helft1[13][0][0]);

                        temp.aanvallende_acties_helft2 = {};
                        temp.aanvallende_acties_helft2.aanvallende_duels = angular.copy(value.aanvallende_acties_helft2[0][0][0]);
                        temp.aanvallende_acties_helft2.aanvallende_duels_gewonnen = angular.copy(value.aanvallende_acties_helft2[1][0][0]);
                        temp.aanvallende_acties_helft2.dribbels = angular.copy(value.aanvallende_acties_helft2[2][0][0]);
                        temp.aanvallende_acties_helft2.schoten = angular.copy(value.aanvallende_acties_helft2[3][0][0]);
                        temp.aanvallende_acties_helft2.schoten_doel = angular.copy(value.aanvallende_acties_helft2[4][0][0]);
                        temp.aanvallende_acties_helft2.schoten_ijzer = angular.copy(value.aanvallende_acties_helft2[5][0][0]);
                        temp.aanvallende_acties_helft2.schoten_naast = angular.copy(value.aanvallende_acties_helft2[6][0][0]);
                        temp.aanvallende_acties_helft2.schoten_over = angular.copy(value.aanvallende_acties_helft2[7][0][0]);
                        temp.aanvallende_acties_helft2.schoten_geblokkeerd = angular.copy(value.aanvallende_acties_helft2[8][0][0]);
                        temp.aanvallende_acties_helft2.schoten_binnen_16 = angular.copy(value.aanvallende_acties_helft2[9][0][0]);
                        temp.aanvallende_acties_helft2.schoten_buiten_16 = angular.copy(value.aanvallende_acties_helft2[10][0][0]);
                        temp.aanvallende_acties_helft2.sleutel_acties = angular.copy(value.aanvallende_acties_helft2[11][0][0]);
                        temp.aanvallende_acties_helft2.sleutel_passes = angular.copy(value.aanvallende_acties_helft2[12][0][0]);
                        temp.aanvallende_acties_helft2.kruisballen = angular.copy(value.aanvallende_acties_helft2[13][0][0]);

                        temp.dode_spel_momenten = {};
                        temp.dode_spel_momenten.ingooien = angular.copy(value.dode_spel_momenten[0][0][0]);
                        temp.dode_spel_momenten.hoekschoppen = angular.copy(value.dode_spel_momenten[1][0][0]);
                        temp.dode_spel_momenten.vrije_trappen = angular.copy(value.dode_spel_momenten[2][0][0]);
                        temp.dode_spel_momenten.vrije_trappen_direct = angular.copy(value.dode_spel_momenten[3][0][0]);
                        temp.dode_spel_momenten.vrije_trappen_indirect = angular.copy(value.dode_spel_momenten[4][0][0]);

                        temp.locatie_voorzetten = [];
                        angular.forEach(value.locatie_voorzetten[temp.personID], function (value, key1) {
                            var temp1 = {};
                            temp1.zend_lengte = angular.copy(value.zend_lengte);
                            temp1.zend_breedte = angular.copy(value.zend_breedte);
                            temp1.doelpoging_na_3 = angular.copy(value.doelpoging_na_3);

                            temp.locatie_voorzetten.push(temp1);
                        });

                        temp.locatie_aanvallende_duels = [];
                        angular.forEach(value.locaties_aanvallende_duels[temp.personID], function (value, key1) {
                            var temp1 = {};
                            temp1.locationInFieldLength = angular.copy(value.locationInFieldLength);
                            temp1.locationInFieldWidth = angular.copy(value.locationInFieldWidth);
                            temp1.gewonnen = angular.copy(value.gewonnen);
                            temp1.duel_type = angular.copy(value.duel_type);

                            temp.locatie_aanvallende_duels.push(temp1);
                        });

                        temp.locatie_doelpogingen = [];
                        angular.forEach(value.locaties_doelpogingen[temp.personID], function (value, key1) {
                            var temp1 = {};
                            temp1.locationInFieldLength = angular.copy(value.locationInFieldLength);
                            temp1.locationInFieldWidth = angular.copy(value.locationInFieldWidth);
                            temp1.lichaamsdeel = angular.copy(value.lichaamsdeel);
                            temp1.minuut_tot_string = angular.copy(value.minuut_tot_string);
                            temp1.type = angular.copy(value.type);

                            temp.locatie_doelpogingen.push(temp1);
                        });
                    }

                    temp.algemene_stats = {};
                    temp.algemene_stats.minuten = angular.copy(value.algemene_stats[0][0][0]);
                    temp.algemene_stats.doelpunten = angular.copy(value.algemene_stats[1][0][0]);
                    temp.algemene_stats.eigen_doelpunten = angular.copy(value.algemene_stats[2][0][0]);
                    temp.algemene_stats.aantal_acties = angular.copy(value.algemene_stats[3][0][0]);
                    temp.algemene_stats.aantal_aanvallende_duels = angular.copy(value.algemene_stats[4][0][0]);
                    temp.algemene_stats.aantal_aanvallende_duels_gewonnen = angular.copy(value.algemene_stats[5][0][0]);
                    temp.algemene_stats.aantal_verdedigende_duels = angular.copy(value.algemene_stats[6][0][0]);
                    temp.algemene_stats.aantal_verdedigende_duels_gewonnen = angular.copy(value.algemene_stats[7][0][0]);
                    temp.algemene_stats.assists = angular.copy(value.algemene_stats[8][0][0]);
                    temp.algemene_stats.penalties_gescoord = angular.copy(value.algemene_stats[9][0][0]);
                    temp.algemene_stats.penalties_gemist = angular.copy(value.algemene_stats[10][0][0]);
                    temp.algemene_stats.aantal_buitenspel = angular.copy(value.algemene_stats[11][0][0]);
                    temp.algemene_stats.overtredingen_tegen = angular.copy(value.algemene_stats[12][0][0]);
                    temp.algemene_stats.overtredingen_mee = angular.copy(value.algemene_stats[13][0][0]);
                    temp.algemene_stats.geel = angular.copy(value.algemene_stats[14][0][0]);
                    temp.algemene_stats.tweede_geel = angular.copy(value.algemene_stats[15][0][0]);
                    temp.algemene_stats.rood = angular.copy(value.algemene_stats[16][0][0]);

                    temp.verdedigende_acties_helft1 = {};
                    temp.verdedigende_acties_helft1.verdedigende_duels = angular.copy(value.verdedigende_acties_helft1[0][0][0]);
                    temp.verdedigende_acties_helft1.verdedigende_duels_gewonnen = angular.copy(value.verdedigende_acties_helft1[1][0][0]);
                    temp.verdedigende_acties_helft1.intercepties = angular.copy(value.verdedigende_acties_helft1[2][0][0]);
                    temp.verdedigende_acties_helft1.luchtduels = angular.copy(value.verdedigende_acties_helft1[3][0][0]);
                    temp.verdedigende_acties_helft1.slidingduels = angular.copy(value.verdedigende_acties_helft1[4][0][0]);
                    temp.verdedigende_acties_helft1.staande_duels = angular.copy(value.verdedigende_acties_helft1[5][0][0]);
                    temp.verdedigende_acties_helft1.wegwerken = angular.copy(value.verdedigende_acties_helft1[6][0][0]);
                    temp.verdedigende_acties_helft1.blokkeren_schot = angular.copy(value.verdedigende_acties_helft1[7][0][0]);

                    temp.verdedigende_acties_helft2 = {};
                    temp.verdedigende_acties_helft2.verdedigende_duels = angular.copy(value.verdedigende_acties_helft2[0][0][0]);
                    temp.verdedigende_acties_helft2.verdedigende_duels_gewonnen = angular.copy(value.verdedigende_acties_helft2[1][0][0]);
                    temp.verdedigende_acties_helft2.intercepties = angular.copy(value.verdedigende_acties_helft2[2][0][0]);
                    temp.verdedigende_acties_helft2.luchtduels = angular.copy(value.verdedigende_acties_helft2[3][0][0]);
                    temp.verdedigende_acties_helft2.slidingduels = angular.copy(value.verdedigende_acties_helft2[4][0][0]);
                    temp.verdedigende_acties_helft2.staande_duels = angular.copy(value.verdedigende_acties_helft2[5][0][0]);
                    temp.verdedigende_acties_helft2.wegwerken = angular.copy(value.verdedigende_acties_helft2[6][0][0]);
                    temp.verdedigende_acties_helft2.blokkeren_schot = angular.copy(value.verdedigende_acties_helft2[7][0][0]);

                    temp.passes_helft1 = [];
                    angular.forEach(value.passes_helft1[temp.personID], function (value, key1) {
                        var temp1 = {};
                        temp1.aan = value['Passes gegeven aan'];
                        temp1.van = value['Passes gekregen van'];
                        angular.forEach(items.spelersthuisteam, function (value1, key1) {
                            if (value1.personID == value._row) {
                                temp1.personID = angular.copy(value1.personID);
                                temp1._row = angular.copy(value1.spelerNaam);
                            }
                        });
                        angular.forEach(items.spelersuitteam, function (value1, key1) {
                            if (value1.personID == value._row) {
                                temp1.personID = angular.copy(value1.personID);
                                temp1._row = angular.copy(value1.spelerNaam);
                            }
                        });
                        if (value._row == 'TOTAAL') {
                            temp1._row = 'Totaal';
                        }
                        temp.passes_helft1.push(temp1);
                    });

                    temp.passes_helft2 = [];
                    angular.forEach(value.passes_helft2[temp.personID], function (value, key1) {
                        var temp1 = {};
                        temp1.aan = value['Passes gegeven aan'];
                        temp1.van = value['Passes gekregen van'];
                        angular.forEach(items.spelersthuisteam, function (value1, key1) {
                            if (value1.personID == value._row) {
                                temp1.personID = angular.copy(value1.personID);
                                temp1._row = angular.copy(value1.spelerNaam);
                            }
                        });
                        angular.forEach(items.spelersuitteam, function (value1, key1) {
                            if (value1.personID == value._row) {
                                temp1.personID = angular.copy(value1.personID);
                                temp1._row = angular.copy(value1.spelerNaam);
                            }
                        });
                        if (value._row == 'TOTAAL') {
                            temp1._row = 'Totaal';
                        }
                        temp.passes_helft2.push(temp1);
                    });

                    temp.pass_soorten_helft1 = value.pass_soorten_helft1[temp.personID][0];
                    temp.pass_soorten_helft2 = value.pass_soorten_helft2[temp.personID][0];

                    temp.locatie_verdedigende_duels = [];
                    angular.forEach(value.locaties_verdedigende_duels[temp.personID], function (value, key1) {
                        var temp1 = {};
                        temp1.locationInFieldLength = angular.copy(value.locationInFieldLength);
                        temp1.locationInFieldWidth = angular.copy(value.locationInFieldWidth);
                        temp1.gewonnen = angular.copy(value.gewonnen);
                        temp1.duel_type = angular.copy(value.duel_type);

                        temp.locatie_verdedigende_duels.push(temp1);
                    });

                    items.player_stats_full_thuis.push(temp);
                });
                angular.forEach(data.uitSpelers_data, function (value, key) {
                    var temp = {};
                    temp.type = angular.copy(value.stat_matrix.type[0]);
                    temp.personID = angular.copy(value.speler[0]);
                    angular.forEach(items.spelersuitteam, function (value1, key1) {
                        if (value1.personID == value.speler[0]) {
                            temp.spelerNaam = angular.copy(value1.spelerNaam);
                            temp.rugnummer = angular.copy(value1.rugnummer);
                        }
                    });
                    if (temp.type == 'keeper') {
                        temp.minuten = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Minuten'}, true)[0][temp.personID];
                        temp.reddingen = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Reddingen'}, true)[0][temp.personID];
                        temp.geslaagde_reddingen = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Geslaagde reddingen'}, true)[0][temp.personID].split("%")[0];
                        temp.korte_passes = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Aantal korte passes'}, true)[0][temp.personID];
                        temp.middellange_passes = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Aantal middellange passes'}, true)[0][temp.personID];
                        temp.lange_passes = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Aantal lange passes'}, true)[0][temp.personID];
                        temp.pass_percentage = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Geslaagde passes'}, true)[0][temp.personID].split("%")[0];
                        temp.gevangen_ballen = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Gevangen ballen'}, true)[0][temp.personID];
                        temp.weggestompte_ballen = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Weggestompte ballen'}, true)[0][temp.personID];
                        temp.succesvolle_uittrappen = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Succesvolle uittrappen'}, true)[0][temp.personID].split("%")[0];
                        temp.geel = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Gele kaarten'}, true)[0][temp.personID];
                        temp.rood = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Rode kaart'}, true)[0][temp.personID];
                        temp.doelpunten_tegen = items.match_info.eindstand.split(" - ", 1)[0];
                        temp.pass_lengte = String((Number(value.pass_soorten_helft1[temp.personID][0].gem_len.split("m")[0]) + Number(value.pass_soorten_helft2[temp.personID][0].gem_len.split("m")[0]) / 2).toFixed(1)) + 'm.';

                        temp.locatie_reddingen = [];
                        angular.forEach(value.locaties_reddingen, function (value, key1) {
                            var temp1 = {};
                            temp1.zend_length = angular.copy(value.zend_length);
                            temp1.zend_width = angular.copy(value.zend_width);
                            temp1.ontvang_length = angular.copy(value.ontvang_length);
                            temp1.ontvang_width = angular.copy(value.ontvang_width);
                            temp1.actie = angular.copy(value.actie);

                            temp.locatie_reddingen.push(temp1);
                        });

                        temp.locatie_uittrappen = [];
                        angular.forEach(value.locaties_uittrappen, function (value, key1) {
                            var temp1 = {};
                            temp1.zend_length = angular.copy(value.zend_lengte);
                            temp1.zend_width = angular.copy(value.zend_breedte);
                            temp1.ontvang_length = angular.copy(value.ontvang_lengte[0]);
                            temp1.ontvang_width = angular.copy(value.ontvang_breedte[0]);
                            angular.forEach(items.spelersthuisteam, function (value1, key1) {
                                if (value1.personID == value.teamgenoot) {
                                    temp1.teamgenootID = angular.copy(value1.personID);
                                    temp1.teamgenoot = angular.copy(value1.spelerNaam);
                                }
                            });
                            angular.forEach(items.spelersuitteam, function (value1, key1) {
                                if (value1.personID == value.teamgenoot) {
                                    temp1.teamgenootID = angular.copy(value1.personID);
                                    temp1.teamgenoot = angular.copy(value1.spelerNaam);
                                }
                            });
                            temp.locatie_uittrappen.push(temp1);
                        });
                    } else {
                        temp.minuten = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Minuten'}, true)[0][temp.personID];
                        temp.doelpunten = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Doelpunten'}, true)[0][temp.personID];
                        temp.aantal_passes = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Aantal passes'}, true)[0][temp.personID];
                        temp.geslaagde_passes = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Geslaagde passes'}, true)[0][temp.personID];
                        temp.pass_percentage = ((Number(temp.geslaagde_passes) / Number(temp.aantal_passes)) * 100).toFixed(1);
                        temp.doelpogingen = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Doelpogingen'}, true)[0][temp.personID];
                        temp.doelpogingen_opdoel = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Doelpogingen op doel'}, true)[0][temp.personID].split("%")[0];
                        temp.voorzetten = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Voorzetten'}, true)[0][temp.personID];
                        temp.gewonnen_duels = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Gewonnen duels'}, true)[0][temp.personID].split("%")[0];
                        temp.intercepties = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Intercepties'}, true)[0][temp.personID];
                        temp.overtredingen = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Overtredingen'}, true)[0][temp.personID];
                        temp.geel = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Gele kaarten'}, true)[0][temp.personID];
                        temp.rood = $filter('filter')(value.stat_matrix.speler_mat, {_row: 'Rode kaart'}, true)[0][temp.personID];
                        temp.verdedigende_duels = angular.copy(value.algemene_stats[6][0][0]);
                        temp.aanvallende_duels = angular.copy(value.algemene_stats[4][0][0]);
                        temp.pass_lengte = String((Number(value.pass_soorten_helft1[temp.personID][0].gem_len.split("m")[0]) + Number(value.pass_soorten_helft2[temp.personID][0].gem_len.split("m")[0]) / 2).toFixed(1)) + 'm.';

                        temp.aanvallende_acties_helft1 = {};
                        temp.aanvallende_acties_helft1.aanvallende_duels = angular.copy(value.aanvallende_acties_helft1[0][0][0]);
                        temp.aanvallende_acties_helft1.aanvallende_duels_gewonnen = angular.copy(value.aanvallende_acties_helft1[1][0][0]);
                        temp.aanvallende_acties_helft1.dribbels = angular.copy(value.aanvallende_acties_helft1[2][0][0]);
                        temp.aanvallende_acties_helft1.schoten = angular.copy(value.aanvallende_acties_helft1[3][0][0]);
                        temp.aanvallende_acties_helft1.schoten_doel = angular.copy(value.aanvallende_acties_helft1[4][0][0]);
                        temp.aanvallende_acties_helft1.schoten_ijzer = angular.copy(value.aanvallende_acties_helft1[5][0][0]);
                        temp.aanvallende_acties_helft1.schoten_naast = angular.copy(value.aanvallende_acties_helft1[6][0][0]);
                        temp.aanvallende_acties_helft1.schoten_over = angular.copy(value.aanvallende_acties_helft1[7][0][0]);
                        temp.aanvallende_acties_helft1.schoten_geblokkeerd = angular.copy(value.aanvallende_acties_helft1[8][0][0]);
                        temp.aanvallende_acties_helft1.schoten_binnen_16 = angular.copy(value.aanvallende_acties_helft1[9][0][0]);
                        temp.aanvallende_acties_helft1.schoten_buiten_16 = angular.copy(value.aanvallende_acties_helft1[10][0][0]);
                        temp.aanvallende_acties_helft1.sleutel_acties = angular.copy(value.aanvallende_acties_helft1[11][0][0]);
                        temp.aanvallende_acties_helft1.sleutel_passes = angular.copy(value.aanvallende_acties_helft1[12][0][0]);
                        temp.aanvallende_acties_helft1.kruisballen = angular.copy(value.aanvallende_acties_helft1[13][0][0]);

                        temp.aanvallende_acties_helft2 = {};
                        temp.aanvallende_acties_helft2.aanvallende_duels = angular.copy(value.aanvallende_acties_helft2[0][0][0]);
                        temp.aanvallende_acties_helft2.aanvallende_duels_gewonnen = angular.copy(value.aanvallende_acties_helft2[1][0][0]);
                        temp.aanvallende_acties_helft2.dribbels = angular.copy(value.aanvallende_acties_helft2[2][0][0]);
                        temp.aanvallende_acties_helft2.schoten = angular.copy(value.aanvallende_acties_helft2[3][0][0]);
                        temp.aanvallende_acties_helft2.schoten_doel = angular.copy(value.aanvallende_acties_helft2[4][0][0]);
                        temp.aanvallende_acties_helft2.schoten_ijzer = angular.copy(value.aanvallende_acties_helft2[5][0][0]);
                        temp.aanvallende_acties_helft2.schoten_naast = angular.copy(value.aanvallende_acties_helft2[6][0][0]);
                        temp.aanvallende_acties_helft2.schoten_over = angular.copy(value.aanvallende_acties_helft2[7][0][0]);
                        temp.aanvallende_acties_helft2.schoten_geblokkeerd = angular.copy(value.aanvallende_acties_helft2[8][0][0]);
                        temp.aanvallende_acties_helft2.schoten_binnen_16 = angular.copy(value.aanvallende_acties_helft2[9][0][0]);
                        temp.aanvallende_acties_helft2.schoten_buiten_16 = angular.copy(value.aanvallende_acties_helft2[10][0][0]);
                        temp.aanvallende_acties_helft2.sleutel_acties = angular.copy(value.aanvallende_acties_helft2[11][0][0]);
                        temp.aanvallende_acties_helft2.sleutel_passes = angular.copy(value.aanvallende_acties_helft2[12][0][0]);
                        temp.aanvallende_acties_helft2.kruisballen = angular.copy(value.aanvallende_acties_helft2[13][0][0]);

                        temp.dode_spel_momenten = {};
                        temp.dode_spel_momenten.ingooien = angular.copy(value.dode_spel_momenten[0][0][0]);
                        temp.dode_spel_momenten.hoekschoppen = angular.copy(value.dode_spel_momenten[1][0][0]);
                        temp.dode_spel_momenten.vrije_trappen = angular.copy(value.dode_spel_momenten[2][0][0]);
                        temp.dode_spel_momenten.vrije_trappen_direct = angular.copy(value.dode_spel_momenten[3][0][0]);
                        temp.dode_spel_momenten.vrije_trappen_indirect = angular.copy(value.dode_spel_momenten[4][0][0]);

                        temp.locatie_voorzetten = [];
                        angular.forEach(value.locatie_voorzetten[temp.personID], function (value, key1) {
                            var temp1 = {};
                            temp1.zend_lengte = angular.copy(value.zend_lengte);
                            temp1.zend_breedte = angular.copy(value.zend_breedte);
                            temp1.doelpoging_na_3 = angular.copy(value.doelpoging_na_3);

                            temp.locatie_voorzetten.push(temp1);
                        });

                        temp.locatie_aanvallende_duels = [];
                        angular.forEach(value.locaties_aanvallende_duels[temp.personID], function (value, key1) {
                            var temp1 = {};
                            temp1.locationInFieldLength = angular.copy(value.locationInFieldLength);
                            temp1.locationInFieldWidth = angular.copy(value.locationInFieldWidth);
                            temp1.gewonnen = angular.copy(value.gewonnen);
                            temp1.duel_type = angular.copy(value.duel_type);

                            temp.locatie_aanvallende_duels.push(temp1);
                        });

                        temp.locatie_doelpogingen = [];
                        angular.forEach(value.locaties_doelpogingen[temp.personID], function (value, key1) {
                            var temp1 = {};
                            temp1.locationInFieldLength = angular.copy(value.locationInFieldLength);
                            temp1.locationInFieldWidth = angular.copy(value.locationInFieldWidth);
                            temp1.lichaamsdeel = angular.copy(value.lichaamsdeel);
                            temp1.minuut_tot_string = angular.copy(value.minuut_tot_string);
                            temp1.type = angular.copy(value.type);

                            temp.locatie_doelpogingen.push(temp1);
                        });
                    }

                    temp.algemene_stats = {};
                    temp.algemene_stats.minuten = angular.copy(value.algemene_stats[0][0][0]);
                    temp.algemene_stats.doelpunten = angular.copy(value.algemene_stats[1][0][0]);
                    temp.algemene_stats.eigen_doelpunten = angular.copy(value.algemene_stats[2][0][0]);
                    temp.algemene_stats.aantal_acties = angular.copy(value.algemene_stats[3][0][0]);
                    temp.algemene_stats.aantal_aanvallende_duels = angular.copy(value.algemene_stats[4][0][0]);
                    temp.algemene_stats.aantal_aanvallende_duels_gewonnen = angular.copy(value.algemene_stats[5][0][0]);
                    temp.algemene_stats.aantal_verdedigende_duels = angular.copy(value.algemene_stats[6][0][0]);
                    temp.algemene_stats.aantal_verdedigende_duels_gewonnen = angular.copy(value.algemene_stats[7][0][0]);
                    temp.algemene_stats.assists = angular.copy(value.algemene_stats[8][0][0]);
                    temp.algemene_stats.penalties_gescoord = angular.copy(value.algemene_stats[9][0][0]);
                    temp.algemene_stats.penalties_gemist = angular.copy(value.algemene_stats[10][0][0]);
                    temp.algemene_stats.aantal_buitenspel = angular.copy(value.algemene_stats[11][0][0]);
                    temp.algemene_stats.overtredingen_tegen = angular.copy(value.algemene_stats[12][0][0]);
                    temp.algemene_stats.overtredingen_mee = angular.copy(value.algemene_stats[13][0][0]);
                    temp.algemene_stats.geel = angular.copy(value.algemene_stats[14][0][0]);
                    temp.algemene_stats.tweede_geel = angular.copy(value.algemene_stats[15][0][0]);
                    temp.algemene_stats.rood = angular.copy(value.algemene_stats[16][0][0]);

                    temp.verdedigende_acties_helft1 = {};
                    temp.verdedigende_acties_helft1.verdedigende_duels = angular.copy(value.verdedigende_acties_helft1[0][0][0]);
                    temp.verdedigende_acties_helft1.verdedigende_duels_gewonnen = angular.copy(value.verdedigende_acties_helft1[1][0][0]);
                    temp.verdedigende_acties_helft1.intercepties = angular.copy(value.verdedigende_acties_helft1[2][0][0]);
                    temp.verdedigende_acties_helft1.luchtduels = angular.copy(value.verdedigende_acties_helft1[3][0][0]);
                    temp.verdedigende_acties_helft1.slidingduels = angular.copy(value.verdedigende_acties_helft1[4][0][0]);
                    temp.verdedigende_acties_helft1.staande_duels = angular.copy(value.verdedigende_acties_helft1[5][0][0]);
                    temp.verdedigende_acties_helft1.wegwerken = angular.copy(value.verdedigende_acties_helft1[6][0][0]);
                    temp.verdedigende_acties_helft1.blokkeren_schot = angular.copy(value.verdedigende_acties_helft1[7][0][0]);

                    temp.verdedigende_acties_helft2 = {};
                    temp.verdedigende_acties_helft2.verdedigende_duels = angular.copy(value.verdedigende_acties_helft2[0][0][0]);
                    temp.verdedigende_acties_helft2.verdedigende_duels_gewonnen = angular.copy(value.verdedigende_acties_helft2[1][0][0]);
                    temp.verdedigende_acties_helft2.intercepties = angular.copy(value.verdedigende_acties_helft2[2][0][0]);
                    temp.verdedigende_acties_helft2.luchtduels = angular.copy(value.verdedigende_acties_helft2[3][0][0]);
                    temp.verdedigende_acties_helft2.slidingduels = angular.copy(value.verdedigende_acties_helft2[4][0][0]);
                    temp.verdedigende_acties_helft2.staande_duels = angular.copy(value.verdedigende_acties_helft2[5][0][0]);
                    temp.verdedigende_acties_helft2.wegwerken = angular.copy(value.verdedigende_acties_helft2[6][0][0]);
                    temp.verdedigende_acties_helft2.blokkeren_schot = angular.copy(value.verdedigende_acties_helft2[7][0][0]);

                    temp.passes_helft1 = [];
                    angular.forEach(value.passes_helft1[temp.personID], function (value, key1) {
                        var temp1 = {};
                        temp1.aan = value['Passes gegeven aan'];
                        temp1.van = value['Passes gekregen van'];
                        angular.forEach(items.spelersthuisteam, function (value1, key1) {
                            if (value1.personID == value._row) {
                                temp1.personID = angular.copy(value1.personID);
                                temp1._row = angular.copy(value1.spelerNaam);
                            }
                        });
                        angular.forEach(items.spelersuitteam, function (value1, key1) {
                            if (value1.personID == value._row) {
                                temp1.personID = angular.copy(value1.personID);
                                temp1._row = angular.copy(value1.spelerNaam);
                            }
                        });
                        if (value._row == 'TOTAAL') {
                            temp1._row = 'Totaal';
                        }
                        temp.passes_helft1.push(temp1);
                    });

                    temp.passes_helft2 = [];
                    angular.forEach(value.passes_helft2[temp.personID], function (value, key1) {
                        var temp1 = {};
                        temp1.aan = value['Passes gegeven aan'];
                        temp1.van = value['Passes gekregen van'];
                        angular.forEach(items.spelersthuisteam, function (value1, key1) {
                            if (value1.personID == value._row) {
                                temp1.personID = angular.copy(value1.personID);
                                temp1._row = angular.copy(value1.spelerNaam);
                            }
                        });
                        angular.forEach(items.spelersuitteam, function (value1, key1) {
                            if (value1.personID == value._row) {
                                temp1.personID = angular.copy(value1.personID);
                                temp1._row = angular.copy(value1.spelerNaam);
                            }
                        });
                        if (value._row == 'TOTAAL') {
                            temp1._row = 'Totaal';
                        }
                        temp.passes_helft2.push(temp1);
                    });

                    temp.pass_soorten_helft1 = value.pass_soorten_helft1[temp.personID][0];
                    temp.pass_soorten_helft2 = value.pass_soorten_helft2[temp.personID][0];

                    temp.locatie_verdedigende_duels = [];
                    angular.forEach(value.locaties_verdedigende_duels[temp.personID], function (value, key1) {
                        var temp1 = {};
                        temp1.locationInFieldLength = angular.copy(value.locationInFieldLength);
                        temp1.locationInFieldWidth = angular.copy(value.locationInFieldWidth);
                        temp1.gewonnen = angular.copy(value.gewonnen);
                        temp1.duel_type = angular.copy(value.duel_type);

                        temp.locatie_verdedigende_duels.push(temp1);
                    });

                    items.player_stats_full_uit.push(temp);
                });

                if (items.match_info.thuis === 'Almere City FC') {
                    items.match_info.thuis_kort = 'Almere City';
                }
                else if (items.match_info.thuis === 'Roda JC Kerkrade') {
                    items.match_info.thuis_kort = 'Roda JC';
                }
                else {
                    items.match_info.thuis_kort = angular.copy(items.match_info.thuis);
                }

                if (items.match_info.uit === 'Almere City FC') {
                    items.match_info.uit_kort = 'Almere City';
                }
                else if (items.match_info.uit === 'Roda JC Kerkrade') {
                    items.match_info.uit_kort = 'Roda JC';
                }
                else {
                    items.match_info.uit_kort = angular.copy(items.match_info.uit);
                }

                match_data = angular.copy(items);
            }

            var ended1; var ended2;

            if (data && match_short) {
                $rootScope.errorImport = '';
                var matchshort;
                Api.Match.get({
                    _id: match_data.matchID
                }, function (res) {
                    matchshort = res;
                });

                if (matchshort) {
                    Api.Match.put({
                        _id: matchshort._id
                    }, match_short, function () {
                        ended1 = true;
                    }, function () {
                        $rootScope.errorImport = 'De data is niet correct geimporteerd in de database, mogelijk is de opmaakt van de data file niet correct.';
                    });
                } else {
                    Api.Matches.post(match_short, function () {
                        ended1 = true;
                    }, function () {
                        $rootScope.errorImport = 'De data is niet correct geimporteerd in de database, mogelijk is de opmaakt van de data file niet correct.';
                    });
                }
            }

            if (data && match_data) {
                $rootScope.errorImport = '';
                var matchdata;
                Api.MatchDataID.get({
                    _id: match_data.matchID
                }, function (res) {
                    matchdata = res;
                });

                if (matchdata) {
                    Api.MatchDataItem.put({
                        _id: matchdata._id
                    }, match_data, function () {
                        ended1 = true;
                    }, function () {
                        $rootScope.errorImport = 'De data is niet correct geimporteerd in de database, mogelijk is de opmaakt van de data file niet correct.';
                    });
                } else {
                    Api.MatchData.post(match_data, function () {
                        ended1 = true;
                    }, function () {
                        $rootScope.errorImport = 'De data is niet correct geimporteerd in de database, mogelijk is de opmaakt van de data file niet correct.';
                    });
                }
            }

            if (data && team_data && player_data) {
                $rootScope.errorImport = '';

                if (team_data.thuis) {
                    var team_slug = match_short.thuisTeamSlug;

                    // check if club exists and check if team exists, otherwise create one or both
                    // check if teamID exits otherwise create for the season

                    var teamdata;
                    Api.TeamDataItem.get({
                        _slug: team_slug
                    }, function (res) {
                        teamdata = res;
                    });

                    if (teamdata) {
                        // check season and round, and change or add teamdata

                        // check player and change or create, check season and round, and change or add playerdata

                        //Api.TeamDataItem.put({
                        //    _slug: teamdata._id
                        //}, {
                        //    // ...
                        //}, function () {
                        //    ended2 = true;
                        //}, function () {
                        //    $rootScope.errorImport = 'Oeps er ging iets mis, ';
                        //});

                    } else {
                        // create season and round and add teamdata

                        // create all players and create season and round and add playerdata

                        Api.TeamData.post({
                            //...
                        }, function () {
                            ended2 = true;
                        }, function () {
                            $rootScope.errorImport = 'Oeps er ging iets mis, ';
                        });
                    }
                }
                if (team_data.uit) {
                    var team_slug_uit = match_short.uitTeamSlug;

                    var teamdata_uit;
                    Api.TeamDataItem.get({
                        _slug: team_slug_uit
                    }, function (res) {
                        teamdata = res;
                    });

                    if (teamdata_uit) {
                        // check season and round, and change or add teamdata

                        // check player and change or create, check season and round, and change or add playerdata

                        //Api.TeamDataItem.put({
                        //    _slug: teamdata_uit._id
                        //}, {
                        //    // ...
                        //}, function () {
                        //    ended2 = true;
                        //}, function () {
                        //    $rootScope.errorImport = 'Oeps er ging iets mis, ';
                        //});

                    } else {
                        // create season and round and add teamdata

                        // create all players and create season and round and add playerdata

                        Api.TeamData.post({
                            //...
                        }, function () {
                            ended2 = true;
                        }, function () {
                            $rootScope.errorImport = 'Oeps er ging iets mis, ';
                        });
                    }
                }
            }

            if (ended1 && ended2) {
                $location.path('/admin');
            }
        };
    }]);