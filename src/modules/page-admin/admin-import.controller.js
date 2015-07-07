angular.module('mainapp.pageAdmin')
    .controller('mainapp.pageAdmin.AdminImportController', ['Api', 'Upload', '$filter', '$rootScope', '$location', '$http',
        function(Api, Upload, $filter, $rootScope, $location, $http) {

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
            var data;

            var ended1;
            var ended2;
            var ended3;
            var ended4;

            $http({
                method: 'GET',
                url: '/media/data/' + file_path,
                header: {
                    'Content-Type' : 'application/json;charset=UTF-8'
                }
            })
                .success(function (data, status, headers, config) {
                    var data = data;
                    var match_short;
                    var match_data;
                    var team_data;
                    var player_data;

                    if (data) {
                        var items = {};
                        items.matchID = data.wedstrijd_data.matchID[0];
                        items.thuisTeamID = data.wedstrijd_data.thuisTeamID[0];
                        items.uitTeamID = data.wedstrijd_data.uitTeamID[0];

                        //items.match_info = {};
                        //items.match_info = data.wedstrijd_data.titel[0];
                        //items.match_info.blessure_tijd = data.wedstrijd_data.blessure_tijd[0];
                        //items.match_info.coachuit = "Voornaam Achter";
                        //items.match_info.coachthuis = "Voor Achternaam";
                        //items.match_info.logo_thuis = items.match_info.wedstrijd.split(" - ", 1)[0] + '.jpg';
                        //items.match_info.logo_uit = items.match_info.wedstrijd.split(" - ", 2)[1] + '.jpg';
                        //items.match_info.thuis = items.match_info.wedstrijd.split(" - ", 1)[0];
                        //items.match_info.uit = items.match_info.wedstrijd.split(" - ", 2)[1];

                        match_short = {};
                        match_short.match_info = {};
                        match_short.match_info = data.wedstrijd_data.titel[0];
                        match_short.match_info.blessure_tijd = data.wedstrijd_data.blessure_tijd[0];
                        //match_short.match_info.coachuit = "Voornaam Achter";
                        //match_short.match_info.coachthuis = "Voor Achternaam";
                        match_short.match_info.logo_thuis = match_short.match_info.wedstrijd.split(" - ", 1)[0] + '.jpg';
                        match_short.match_info.logo_uit = match_short.match_info.wedstrijd.split(" - ", 2)[1] + '.jpg';
                        match_short.match_info.thuis = match_short.match_info.wedstrijd.split(" - ", 1)[0];
                        match_short.match_info.uit = match_short.match_info.wedstrijd.split(" - ", 2)[1];
                        match_short.matchID = data.wedstrijd_data.matchID[0];
                        match_short.thuisTeamID = data.wedstrijd_data.thuisTeamID[0];
                        match_short.thuisTeamSlug = match_short.match_info.thuis.trim().toLowerCase().replace(/\s+/g, '');
                        match_short.uitTeamID = data.wedstrijd_data.uitTeamID[0];
                        match_short.uitTeamSlug = match_short.match_info.uit.trim().toLowerCase().replace(/\s+/g, '');

                        // here we need an if statement for the correct season chosing
                        if (items.matchID >= 16000) {
                            items.seizoen = "2014-2015 Play-offs";
                            match_short.seizoen = "2014-2015 Play-offs";
                        } else if (items.matchID > 7200 && items.matchID < 16000) {
                            items.seizoen = "2014-2015";
                            match_short.seizoen = "2014-2015";
                        }

                        // for now this is correct later maybe need a if statement to choose correct division
                        items.divisie = "Jupiler League";
                        match_short.divisie = "Jupiler League";

                        items.thuisTeamSlug = match_short.match_info.thuis.trim().toLowerCase().replace(/\s+/g, '');
                        items.uitTeamSlug = match_short.match_info.uit.trim().toLowerCase().replace(/\s+/g, '');
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
                        items.balbezit.thuis = {};
                        items.balbezit.thuis.hele_wedstrijd = data.wedstrijd_data.balbezit.hele_wedstrijd[0][items.thuisTeamID];
                        items.balbezit.thuis.helft_1 = data.wedstrijd_data.balbezit.helft_1[0][items.thuisTeamID];
                        items.balbezit.thuis.helft_2 = data.wedstrijd_data.balbezit.helft_2[0][items.thuisTeamID];
                        items.balbezit.thuis.kwartier_1 = data.wedstrijd_data.balbezit.kwartier_1[0][items.thuisTeamID];
                        items.balbezit.thuis.kwartier_2 = data.wedstrijd_data.balbezit.kwartier_2[0][items.thuisTeamID];
                        items.balbezit.thuis.kwartier_3 = data.wedstrijd_data.balbezit.kwartier_3[0][items.thuisTeamID];
                        items.balbezit.thuis.kwartier_4 = data.wedstrijd_data.balbezit.kwartier_4[0][items.thuisTeamID];
                        items.balbezit.thuis.kwartier_5 = data.wedstrijd_data.balbezit.kwartier_5[0][items.thuisTeamID];
                        items.balbezit.thuis.kwartier_6 = data.wedstrijd_data.balbezit.kwartier_6[0][items.thuisTeamID];
                        items.balbezit.uit = {};
                        items.balbezit.uit.hele_wedstrijd = data.wedstrijd_data.balbezit.hele_wedstrijd[0][items.uitTeamID];
                        items.balbezit.uit.helft_1 = data.wedstrijd_data.balbezit.helft_1[0][items.uitTeamID];
                        items.balbezit.uit.helft_2 = data.wedstrijd_data.balbezit.helft_2[0][items.uitTeamID];
                        items.balbezit.uit.kwartier_1 = data.wedstrijd_data.balbezit.kwartier_1[0][items.uitTeamID];
                        items.balbezit.uit.kwartier_2 = data.wedstrijd_data.balbezit.kwartier_2[0][items.uitTeamID];
                        items.balbezit.uit.kwartier_3 = data.wedstrijd_data.balbezit.kwartier_3[0][items.uitTeamID];
                        items.balbezit.uit.kwartier_4 = data.wedstrijd_data.balbezit.kwartier_4[0][items.uitTeamID];
                        items.balbezit.uit.kwartier_5 = data.wedstrijd_data.balbezit.kwartier_5[0][items.uitTeamID];
                        items.balbezit.uit.kwartier_6 = data.wedstrijd_data.balbezit.kwartier_6[0][items.uitTeamID];

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
                            temp.V1 = value[match_short.match_info.thuis];
                            temp.V2 = value[' '];
                            temp.V3 = value[match_short.match_info.uit];
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
                        team_data.thuis.matchID = Number(angular.copy(items.matchID));
                        team_data.uit.matchID = Number(angular.copy(items.matchID));
                        team_data.thuis.ronde = Number(angular.copy(match_short.match_info.ronde));
                        team_data.uit.ronde = Number(angular.copy(match_short.match_info.ronde));
                        team_data.thuis.wedstrijd = angular.copy(match_short.match_info.wedstrijd);
                        team_data.uit.wedstrijd = angular.copy(match_short.match_info.wedstrijd);
                        team_data.thuis.doelpunten_voor = Number(match_short.match_info.eindstand.split(" - ", 1)[0]);
                        team_data.thuis.doelpunten_tegen = Number(match_short.match_info.eindstand.split(" - ", 2)[1]);
                        team_data.uit.doelpunten_voor = Number(match_short.match_info.eindstand.split(" - ", 2)[1]);
                        team_data.uit.doelpunten_tegen = Number(match_short.match_info.eindstand.split(" - ", 1)[0]);
                        if (match_short.match_info.eindstand.split(" - ", 1)[0] > match_short.match_info.eindstand.split(" - ", 2)[1]) {
                            team_data.thuis.punten = 3;
                            team_data.uit.punten = 0;
                        } else if (match_short.match_info.eindstand.split(" - ", 1)[0] < match_short.match_info.eindstand.split(" - ", 2)[1]) {
                            team_data.thuis.punten = 0;
                            team_data.uit.punten = 3;
                        } else if (match_short.match_info.eindstand.split(" - ", 1)[0] == match_short.match_info.eindstand.split(" - ", 2)[1]) {
                            team_data.thuis.punten = 1;
                            team_data.uit.punten = 1;
                        }
                        team_data.thuis.balbezit = Number($filter('filter')(data.team_matrix, {_row: 'Balbezit'}, true)[0][items.thuisTeamID].split("%", 1)[0]);
                        team_data.uit.balbezit = Number($filter('filter')(data.team_matrix, {_row: 'Balbezit'}, true)[0][items.uitTeamID].split("%", 1)[0]);
                        team_data.thuis.tot_passes = Number($filter('filter')(data.team_matrix, {_row: 'Tot. aantal passes'}, true)[0][items.thuisTeamID]);
                        team_data.uit.tot_passes = Number($filter('filter')(data.team_matrix, {_row: 'Tot. aantal passes'}, true)[0][items.uitTeamID]);
                        team_data.thuis.geslaagde_passes = Number($filter('filter')(data.team_matrix, {_row: 'Geslaagde passes'}, true)[0][items.thuisTeamID].split("%", 1)[0]);
                        team_data.uit.geslaagde_passes = Number($filter('filter')(data.team_matrix, {_row: 'Geslaagde passes'}, true)[0][items.uitTeamID].split("%", 1)[0]);
                        team_data.thuis.lengte_passes = Number($filter('filter')(data.team_matrix, {_row: 'Gem. lengte passes'}, true)[0][items.thuisTeamID].split(" m.", 1)[0]);
                        team_data.uit.lengte_passes = Number($filter('filter')(data.team_matrix, {_row: 'Gem. lengte passes'}, true)[0][items.uitTeamID].split(" m.", 1)[0]);
                        team_data.thuis.doelpogingen = Number($filter('filter')(data.team_matrix, {_row: 'Doelpogingen'}, true)[0][items.thuisTeamID]);
                        team_data.uit.doelpogingen = Number($filter('filter')(data.team_matrix, {_row: 'Doelpogingen'}, true)[0][items.uitTeamID]);
                        team_data.thuis.gewonnen_duels = Number($filter('filter')(data.team_matrix, {_row: 'Gewonnen duels'}, true)[0][items.thuisTeamID].split("%", 1)[0]);
                        team_data.uit.gewonnen_duels = Number($filter('filter')(data.team_matrix, {_row: 'Gewonnen duels'}, true)[0][items.uitTeamID].split("%", 1)[0]);
                        team_data.thuis.geel = Number($filter('filter')(data.team_matrix, {_row: 'Gele kaarten'}, true)[0][items.thuisTeamID]);
                        team_data.uit.geel = Number($filter('filter')(data.team_matrix, {_row: 'Gele kaarten'}, true)[0][items.uitTeamID]);
                        team_data.thuis.rood = Number($filter('filter')(data.team_matrix, {_row: 'Rode kaarten'}, true)[0][items.thuisTeamID]);
                        team_data.uit.rood = Number($filter('filter')(data.team_matrix, {_row: 'Rode kaarten'}, true)[0][items.uitTeamID]);

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
                            temp.matchID = Number(angular.copy(items.matchID));
                            temp.match = angular.copy(match_short.match_info.wedstrijd);
                            temp.result = angular.copy(match_short.match_info.eindstand);
                            temp.date = angular.copy(match_short.match_info.datum);
                            temp.ronde = Number(angular.copy(match_short.match_info.ronde));
                            temp.teamID = angular.copy(items.thuisTeamID);
                            temp.type = angular.copy(value.stat_matrix.type[0]);
                            temp.personID = angular.copy(value.speler[0]);
                            angular.forEach(items.spelersthuisteam, function (value1, key1) {
                                if (value1.personID == value.speler[0]) {
                                    temp.spelerNaam = angular.copy(value1.spelerNaam);
                                    temp.rugnummer = Number(angular.copy(value1.rugnummer));
                                }
                            });
                            if (temp.type == 'keeper') {
                                temp.minuten = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Minuten'}, true)[0][temp.personID]);
                                temp.reddingen = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Reddingen'}, true)[0][temp.personID]);
                                temp.geslaagde_reddingen = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Geslaagde reddingen'}, true)[0][temp.personID].split("%")[0]);
                                temp.korte_passes = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Aantal korte passes'}, true)[0][temp.personID]);
                                temp.middellange_passes = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Aantal middellange passes'}, true)[0][temp.personID]);
                                temp.lange_passes = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Aantal lange passes'}, true)[0][temp.personID]);
                                temp.pass_percentage = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Geslaagde passes'}, true)[0][temp.personID].split("%")[0]);
                                temp.gevangen_ballen = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Gevangen ballen'}, true)[0][temp.personID]);
                                temp.weggestompte_ballen = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Weggestompte ballen'}, true)[0][temp.personID]);
                                temp.succesvolle_uittrappen = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Succesvolle uittrappen'}, true)[0][temp.personID].split("%")[0]);
                                temp.geel = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Gele kaarten'}, true)[0][temp.personID]);
                                temp.rood = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Rode kaart'}, true)[0][temp.personID]);
                                temp.doelpunten_tegen = Number(match_short.match_info.eindstand.split(" - ", 1)[0]);
                                temp.pass_lengte = Number((Number(value.pass_soorten_helft1[temp.personID][0].gem_len.split("m")[0]) + Number(value.pass_soorten_helft2[temp.personID][0].gem_len.split("m")[0]) / 2).toFixed(1));
                            } else {
                                temp.minuten = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Minuten'}, true)[0][temp.personID]);
                                temp.doelpunten = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Doelpunten'}, true)[0][temp.personID]);
                                temp.aantal_passes = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Aantal passes'}, true)[0][temp.personID]);
                                temp.geslaagde_passes = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Geslaagde passes'}, true)[0][temp.personID]);
                                temp.pass_percentage = Number(((Number(temp.geslaagde_passes) / Number(temp.aantal_passes)) * 100).toFixed(1));
                                temp.doelpogingen = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Doelpogingen'}, true)[0][temp.personID]);
                                temp.doelpogingen_opdoel = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Doelpogingen op doel'}, true)[0][temp.personID].split("%")[0]);
                                temp.voorzetten = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Voorzetten'}, true)[0][temp.personID]);
                                temp.gewonnen_duels = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Gewonnen duels'}, true)[0][temp.personID].split("%")[0]);
                                temp.intercepties = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Intercepties'}, true)[0][temp.personID]);
                                temp.overtredingen = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Overtredingen'}, true)[0][temp.personID]);
                                temp.geel = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Gele kaarten'}, true)[0][temp.personID]);
                                temp.rood = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Rode kaart'}, true)[0][temp.personID]);
                                temp.verdedigende_duels = Number(angular.copy(value.algemene_stats[6][0][0]));
                                temp.aanvallende_duels = Number(angular.copy(value.algemene_stats[4][0][0]));
                                temp.pass_lengte = Number((Number(value.pass_soorten_helft1[temp.personID][0].gem_len.split("m")[0]) + Number(value.pass_soorten_helft2[temp.personID][0].gem_len.split("m")[0]) / 2).toFixed(1));
                            }
                            player_data.player_stats_thuis.push(temp);
                        });
                        angular.forEach(data.uitSpelers_data, function (value, key) {
                            var temp = {};
                            temp.matchID = Number(angular.copy(items.matchID));
                            temp.match = angular.copy(match_short.match_info.wedstrijd);
                            temp.result = angular.copy(match_short.match_info.eindstand);
                            temp.date = angular.copy(match_short.match_info.datum);
                            temp.ronde = Number(angular.copy(match_short.match_info.ronde));
                            temp.teamID = angular.copy(items.thuisTeamID);
                            temp.type = angular.copy(value.stat_matrix.type[0]);
                            temp.personID = angular.copy(value.speler[0]);
                            angular.forEach(items.spelersuitteam, function (value1, key1) {
                                if (value1.personID == value.speler[0]) {
                                    temp.spelerNaam = angular.copy(value1.spelerNaam);
                                    temp.rugnummer = Number(angular.copy(value1.rugnummer));
                                }
                            });
                            if (temp.type == 'keeper') {
                                temp.minuten = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Minuten'}, true)[0][temp.personID]);
                                temp.reddingen = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Reddingen'}, true)[0][temp.personID]);
                                temp.geslaagde_reddingen = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Geslaagde reddingen'}, true)[0][temp.personID].split("%")[0]);
                                temp.korte_passes = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Aantal korte passes'}, true)[0][temp.personID]);
                                temp.middellange_passes = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Aantal middellange passes'}, true)[0][temp.personID]);
                                temp.lange_passes = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Aantal lange passes'}, true)[0][temp.personID]);
                                temp.pass_percentage = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Geslaagde passes'}, true)[0][temp.personID].split("%")[0]);
                                temp.gevangen_ballen = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Gevangen ballen'}, true)[0][temp.personID]);
                                temp.weggestompte_ballen = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Weggestompte ballen'}, true)[0][temp.personID]);
                                temp.succesvolle_uittrappen = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Succesvolle uittrappen'}, true)[0][temp.personID].split("%")[0]);
                                temp.geel = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Gele kaarten'}, true)[0][temp.personID]);
                                temp.rood = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Rode kaart'}, true)[0][temp.personID]);
                                temp.doelpunten_tegen = Number(match_short.match_info.eindstand.split(" - ", 1)[0]);
                                temp.pass_lengte = Number((Number(value.pass_soorten_helft1[temp.personID][0].gem_len.split("m")[0]) + Number(value.pass_soorten_helft2[temp.personID][0].gem_len.split("m")[0]) / 2).toFixed(1));
                            } else {
                                temp.minuten = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Minuten'}, true)[0][temp.personID]);
                                temp.doelpunten = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Doelpunten'}, true)[0][temp.personID]);
                                temp.aantal_passes = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Aantal passes'}, true)[0][temp.personID]);
                                temp.geslaagde_passes = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Geslaagde passes'}, true)[0][temp.personID]);
                                temp.pass_percentage = Number(((Number(temp.geslaagde_passes) / Number(temp.aantal_passes)) * 100).toFixed(1));
                                temp.doelpogingen = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Doelpogingen'}, true)[0][temp.personID]);
                                temp.doelpogingen_opdoel = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Doelpogingen op doel'}, true)[0][temp.personID].split("%")[0]);
                                temp.voorzetten = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Voorzetten'}, true)[0][temp.personID]);
                                temp.gewonnen_duels = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Gewonnen duels'}, true)[0][temp.personID].split("%")[0]);
                                temp.intercepties = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Intercepties'}, true)[0][temp.personID]);
                                temp.overtredingen = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Overtredingen'}, true)[0][temp.personID]);
                                temp.geel = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Gele kaarten'}, true)[0][temp.personID]);
                                temp.rood = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Rode kaart'}, true)[0][temp.personID]);
                                temp.verdedigende_duels = Number(angular.copy(value.algemene_stats[6][0][0]));
                                temp.aanvallende_duels = Number(angular.copy(value.algemene_stats[4][0][0]));
                                temp.pass_lengte = Number((Number(value.pass_soorten_helft1[temp.personID][0].gem_len.split("m")[0]) + Number(value.pass_soorten_helft2[temp.personID][0].gem_len.split("m")[0]) / 2).toFixed(1));
                            }
                            player_data.player_stats_uit.push(temp);
                        });

                        items.player_stats_full_thuis = [];
                        items.player_stats_full_uit = [];
                        angular.forEach(data.thuisSpelers_data, function (value, key) {
                            var temp = {};
                            temp.spelerType = angular.copy(value.stat_matrix.type[0]);
                            temp.personID = angular.copy(value.speler[0]);
                            angular.forEach(items.spelersthuisteam, function (value1, key1) {
                                if (value1.personID == value.speler[0]) {
                                    temp.spelerNaam = angular.copy(value1.spelerNaam);
                                    temp.spelerRugnummer = Number(angular.copy(value1.rugnummer));
                                }
                            });
                            if (temp.spelerType == 'keeper') {
                                temp.minuten = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Minuten'}, true)[0][temp.personID]);
                                temp.reddingen = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Reddingen'}, true)[0][temp.personID]);
                                temp.geslaagde_reddingen = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Geslaagde reddingen'}, true)[0][temp.personID].split("%")[0]);
                                temp.korte_passes = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Aantal korte passes'}, true)[0][temp.personID]);
                                temp.middellange_passes = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Aantal middellange passes'}, true)[0][temp.personID]);
                                temp.lange_passes = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Aantal lange passes'}, true)[0][temp.personID]);
                                temp.pass_percentage = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Geslaagde passes'}, true)[0][temp.personID].split("%")[0]);
                                temp.gevangen_ballen = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Gevangen ballen'}, true)[0][temp.personID]);
                                temp.weggestompte_ballen = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Weggestompte ballen'}, true)[0][temp.personID]);
                                temp.succesvolle_uittrappen = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Succesvolle uittrappen'}, true)[0][temp.personID].split("%")[0]);
                                temp.geel = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Gele kaarten'}, true)[0][temp.personID]);
                                temp.rood = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Rode kaart'}, true)[0][temp.personID]);
                                temp.doelpunten_tegen = Number(match_short.match_info.eindstand.split(" - ", 1)[0]);
                                temp.pass_lengte = Number((Number(value.pass_soorten_helft1[temp.personID][0].gem_len.split("m")[0]) + Number(value.pass_soorten_helft2[temp.personID][0].gem_len.split("m")[0]) / 2).toFixed(1));

                                temp.doelpunten = Number(angular.copy(value.algemene_stats[1][0][0]));

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
                                temp.minuten = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Minuten'}, true)[0][temp.personID]);
                                temp.doelpunten = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Doelpunten'}, true)[0][temp.personID]);
                                temp.aantal_passes = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Aantal passes'}, true)[0][temp.personID]);
                                temp.geslaagde_passes = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Geslaagde passes'}, true)[0][temp.personID]);
                                temp.pass_percentage = Number(((Number(temp.geslaagde_passes) / Number(temp.aantal_passes)) * 100).toFixed(1));
                                temp.doelpogingen = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Doelpogingen'}, true)[0][temp.personID]);
                                temp.doelpogingen_opdoel = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Doelpogingen op doel'}, true)[0][temp.personID].split("%")[0]);
                                temp.voorzetten = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Voorzetten'}, true)[0][temp.personID]);
                                temp.gewonnen_duels = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Gewonnen duels'}, true)[0][temp.personID].split("%")[0]);
                                temp.intercepties = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Intercepties'}, true)[0][temp.personID]);
                                temp.overtredingen = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Overtredingen'}, true)[0][temp.personID]);
                                temp.geel = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Gele kaarten'}, true)[0][temp.personID]);
                                temp.rood = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Rode kaart'}, true)[0][temp.personID]);
                                temp.verdedigende_duels = Number(angular.copy(value.algemene_stats[6][0][0]));
                                temp.aanvallende_duels = Number(angular.copy(value.algemene_stats[4][0][0]));
                                temp.pass_lengte = Number((Number(value.pass_soorten_helft1[temp.personID][0].gem_len.split("m")[0]) + Number(value.pass_soorten_helft2[temp.personID][0].gem_len.split("m")[0]) / 2).toFixed(1));

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
                                temp.aanvallende_acties_helft1.schoten_binnen16 = angular.copy(value.aanvallende_acties_helft1[9][0][0]);
                                temp.aanvallende_acties_helft1.schoten_buiten16 = angular.copy(value.aanvallende_acties_helft1[10][0][0]);
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

                            temp.eigen_doelpunten = Number(angular.copy(value.algemene_stats[2][0][0]));
                            temp.aantal_acties = Number(angular.copy(value.algemene_stats[3][0][0]));
                            temp.aantal_aanvallende_duels = Number(angular.copy(value.algemene_stats[4][0][0]));
                            temp.aantal_aanvallende_duels_gewonnen = Number(angular.copy(value.algemene_stats[5][0][0]));
                            temp.aantal_verdedigende_duels = Number(angular.copy(value.algemene_stats[6][0][0]));
                            temp.aantal_verdedigende_duels_gewonnen = Number(angular.copy(value.algemene_stats[7][0][0]));
                            temp.assists = Number(angular.copy(value.algemene_stats[8][0][0]));
                            temp.penalties_gescoord = Number(angular.copy(value.algemene_stats[9][0][0]));
                            temp.penalties_gemist = Number(angular.copy(value.algemene_stats[10][0][0]));
                            temp.aantal_buitenspel = Number(angular.copy(value.algemene_stats[11][0][0]));
                            temp.overtredingen_tegen = Number(angular.copy(value.algemene_stats[12][0][0]));
                            temp.overtredingen_mee = Number(angular.copy(value.algemene_stats[13][0][0]));
                            temp.tweede_geel = Number(angular.copy(value.algemene_stats[15][0][0]));

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
                            temp.spelerType = angular.copy(value.stat_matrix.type[0]);
                            temp.personID = angular.copy(value.speler[0]);
                            angular.forEach(items.spelersuitteam, function (value1, key1) {
                                if (value1.personID == value.speler[0]) {
                                    temp.spelerNaam = angular.copy(value1.spelerNaam);
                                    temp.spelerRugnummer = angular.copy(value1.rugnummer);
                                }
                            });
                            if (temp.spelerType == 'keeper') {
                                temp.minuten = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Minuten'}, true)[0][temp.personID]);
                                temp.reddingen = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Reddingen'}, true)[0][temp.personID]);
                                temp.geslaagde_reddingen = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Geslaagde reddingen'}, true)[0][temp.personID].split("%")[0]);
                                temp.korte_passes = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Aantal korte passes'}, true)[0][temp.personID]);
                                temp.middellange_passes = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Aantal middellange passes'}, true)[0][temp.personID]);
                                temp.lange_passes = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Aantal lange passes'}, true)[0][temp.personID]);
                                temp.pass_percentage = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Geslaagde passes'}, true)[0][temp.personID].split("%")[0]);
                                temp.gevangen_ballen = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Gevangen ballen'}, true)[0][temp.personID]);
                                temp.weggestompte_ballen = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Weggestompte ballen'}, true)[0][temp.personID]);
                                temp.succesvolle_uittrappen = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Succesvolle uittrappen'}, true)[0][temp.personID].split("%")[0]);
                                temp.geel = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Gele kaarten'}, true)[0][temp.personID]);
                                temp.rood = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Rode kaart'}, true)[0][temp.personID]);
                                temp.doelpunten_tegen = Number(match_short.match_info.eindstand.split(" - ", 1)[0]);
                                temp.pass_lengte = Number((Number(value.pass_soorten_helft1[temp.personID][0].gem_len.split("m")[0]) + Number(value.pass_soorten_helft2[temp.personID][0].gem_len.split("m")[0]) / 2).toFixed(1));

                                temp.doelpunten = Number(angular.copy(value.algemene_stats[1][0][0]));

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
                                temp.minuten = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Minuten'}, true)[0][temp.personID]);
                                temp.doelpunten = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Doelpunten'}, true)[0][temp.personID]);
                                temp.aantal_passes = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Aantal passes'}, true)[0][temp.personID]);
                                temp.geslaagde_passes = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Geslaagde passes'}, true)[0][temp.personID]);
                                temp.pass_percentage = Number(((Number(temp.geslaagde_passes) / Number(temp.aantal_passes)) * 100).toFixed(1));
                                temp.doelpogingen = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Doelpogingen'}, true)[0][temp.personID]);
                                temp.doelpogingen_opdoel = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Doelpogingen op doel'}, true)[0][temp.personID].split("%")[0]);
                                temp.voorzetten = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Voorzetten'}, true)[0][temp.personID]);
                                temp.gewonnen_duels = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Gewonnen duels'}, true)[0][temp.personID].split("%")[0]);
                                temp.intercepties = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Intercepties'}, true)[0][temp.personID]);
                                temp.overtredingen = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Overtredingen'}, true)[0][temp.personID]);
                                temp.geel = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Gele kaarten'}, true)[0][temp.personID]);
                                temp.rood = Number($filter('filter')(value.stat_matrix.speler_mat, {_row: 'Rode kaart'}, true)[0][temp.personID]);
                                temp.verdedigende_duels = Number(angular.copy(value.algemene_stats[6][0][0]));
                                temp.aanvallende_duels = Number(angular.copy(value.algemene_stats[4][0][0]));
                                temp.pass_lengte = Number((Number(value.pass_soorten_helft1[temp.personID][0].gem_len.split("m")[0]) + Number(value.pass_soorten_helft2[temp.personID][0].gem_len.split("m")[0]) / 2).toFixed(1));

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
                                temp.aanvallende_acties_helft2.schoten_binnen16 = angular.copy(value.aanvallende_acties_helft2[9][0][0]);
                                temp.aanvallende_acties_helft2.schoten_buiten16 = angular.copy(value.aanvallende_acties_helft2[10][0][0]);
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

                            temp.eigen_doelpunten = Number(angular.copy(value.algemene_stats[2][0][0]));
                            temp.aantal_acties = Number(angular.copy(value.algemene_stats[3][0][0]));
                            temp.aantal_aanvallende_duels = Number(angular.copy(value.algemene_stats[4][0][0]));
                            temp.aantal_aanvallende_duels_gewonnen = Number(angular.copy(value.algemene_stats[5][0][0]));
                            temp.aantal_verdedigende_duels = Number(angular.copy(value.algemene_stats[6][0][0]));
                            temp.aantal_verdedigende_duels_gewonnen = Number(angular.copy(value.algemene_stats[7][0][0]));
                            temp.assists = Number(angular.copy(value.algemene_stats[8][0][0]));
                            temp.penalties_gescoord = Number(angular.copy(value.algemene_stats[9][0][0]));
                            temp.penalties_gemist = Number(angular.copy(value.algemene_stats[10][0][0]));
                            temp.aantal_buitenspel = Number(angular.copy(value.algemene_stats[11][0][0]));
                            temp.overtredingen_tegen = Number(angular.copy(value.algemene_stats[12][0][0]));
                            temp.overtredingen_mee = Number(angular.copy(value.algemene_stats[13][0][0]));
                            temp.tweede_geel = Number(angular.copy(value.algemene_stats[15][0][0]));

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

                        if (match_short.match_info.thuis === 'Almere City FC') {
                            match_short.match_info.thuis_kort = 'Almere City';
                        }
                        else if (match_short.match_info.thuis === 'Roda JC Kerkrade') {
                            match_short.match_info.thuis_kort = 'Roda JC';
                        }
                        else {
                            match_short.match_info.thuis_kort = angular.copy(match_short.match_info.thuis);
                        }

                        if (match_short.match_info.uit === 'Almere City FC') {
                            match_short.match_info.uit_kort = 'Almere City';
                        }
                        else if (match_short.match_info.uit === 'Roda JC Kerkrade') {
                            match_short.match_info.uit_kort = 'Roda JC';
                        }
                        else {
                            match_short.match_info.uit_kort = angular.copy(match_short.match_info.uit);
                        }

                        match_data = angular.copy(items);
                    }

                    if (data && match_data && match_short && team_data && player_data) {
                        $rootScope.errorImport = '';

                        if (team_data.thuis) {
                            var club_slug = match_short.thuisTeamSlug;
                            var team_slug;

                            // check if club exists, otherwise create one
                            Api.Club.get({
                                _slug: club_slug
                            }, function (res) {
                                var clubdata = res;

                                if (!clubdata._slug) {
                                    // create team and teamID with the season
                                    var teams = [];
                                    var teamstemp = {};
                                    teamstemp.team_name = '1e elftal';
                                    teamstemp.team_slug = club_slug + '_' + teamstemp.team_name.trim().toLowerCase().replace(/\s+/g, '');
                                    teamstemp.teamID = [];
                                    var teamstemp2 = {};
                                    teamstemp2.ID = match_short.thuisTeamID;
                                    teamstemp2.season = match_short.seizoen;
                                    teamstemp.teamID.push(teamstemp2);
                                    teamstemp.coach = '';
                                    teamstemp.divisie = match_short.divisie;
                                    teams.push(teamstemp);

                                    match_short.match_info.coach_thuis = '';
                                    match_short.thuisTeamSlug = teamstemp.team_slug;
                                    items.thuisTeamSlug = teamstemp.team_slug;
                                    team_slug = teamstemp.team_slug;

                                    Api.Clubs.post({
                                        _slug: club_slug,
                                        name: match_short.match_info.thuis,
                                        logo: match_short.match_info.thuis + '.jpg',
                                        teams: teams,
                                        date_edited: self.datetime
                                    }, function (res) {
                                    }, function () {
                                    });
                                } else {
                                    // check if team exists, otherwise create one or both
                                    // check if teamID exits otherwise create for the season
                                    if ($filter('filter')(clubdata.teams, {divisie: match_short.divisie}, true)) {
                                        var teamstemp3 = '';
                                        teamstemp3 = $filter('filter')(clubdata.teams, {divisie: match_short.divisie}, true)[0];
                                        if (!($filter('filter')(teamstemp3.teamID, {season: match_short.seizoen}, true)[0])) {
                                            // create teamID
                                            angular.forEach(clubdata.teams, function (value, key) {
                                                if (value.divisie == match_short.divisie) {
                                                    var temp = {};
                                                    temp.ID = match_short.thuisTeamID;
                                                    temp.season = match_short.seizoen;
                                                    value.teamID.push(temp);
                                                }
                                            });

                                            Api.Club.put({
                                                _slug: clubdata._id
                                            }, {
                                                teams: clubdata.teams,
                                                date_edited: self.datetime
                                            }, function (res) {
                                            }, function () {
                                            });
                                        }
                                        team_slug = teamstemp3.team_slug;
                                        match_short.match_info.coach_thuis = teamstemp3.coach;
                                        match_short.thuisTeamSlug = teamstemp3.team_slug;
                                        items.thuisTeamSlug = teamstemp3.team_slug;
                                    } else {
                                        // create team + teamID
                                        var teamstemp4 = {};
                                        teamstemp4.team_name = '1e elftal';
                                        teamstemp4.team_slug = club_slug + '_' + teamstemp4.team_name.trim().toLowerCase().replace(/\s+/g, '');
                                        teamstemp4.teamID = [];
                                        var teamstemp5 = {};
                                        teamstemp5.ID = match_short.thuisTeamID;
                                        teamstemp5.season = match_short.seizoen;
                                        teamstemp4.teamID.push(teamstemp5);
                                        teamstemp4.coach = '';
                                        teamstemp4.divisie = match_short.divisie;
                                        clubdata.teams.push(teamstemp4);

                                        match_short.match_info.coach_thuis = '';
                                        match_short.thuisTeamSlug = teamstemp4.team_slug;
                                        items.thuisTeamSlug = teamstemp4.team_slug;
                                        team_slug = teamstemp4.team_slug;

                                        Api.Club.put({
                                            _slug: clubdata._id
                                        }, {
                                            teams: clubdata.teams,
                                            date_edited: self.datetime
                                        }, function (res) {
                                        }, function () {
                                        });
                                    }
                                }

                                Api.TeamDataItem.get({
                                    _slug: team_slug
                                }, function (res) {
                                    var teamdata = res;

                                    // if not working right why?
                                    if (!teamdata.team_slug) {
                                        // create teamdata
                                        // create season and round and add teamdata
                                        teamdata = {};
                                        teamdata.team_slug = team_slug;
                                        teamdata.team_name = '1e elftal';
                                        teamdata.divisie = match_short.divisie;
                                        teamdata.club_name = match_short.match_info.thuis;
                                        teamdata.club_slug = match_short.thuisTeamSlug;
                                        teamdata.team_data = [];
                                        var team_data_temp3 = {};
                                        team_data_temp3.season = match_short.seizoen;
                                        team_data_temp3.matches = [];
                                        team_data_temp3.matches.push(team_data.thuis);
                                        teamdata.team_data.push(team_data_temp3);

                                        // create all players and create season and round and add playerdata
                                        teamdata.player_data = [];
                                        angular.forEach(player_data.player_stats_thuis, function (value, key1) {
                                            var temp = {};
                                            temp.playerID = value.personID;
                                            temp.spelerNaam = value.spelerNaam;
                                            temp.spelerType = value.type;
                                            temp.spelerRugnummer = value.rugnummer;
                                            temp.matches = [];
                                            var temp1 = {};
                                            temp1.season = match_short.seizoen;
                                            temp1.match = [];
                                            var temp2 = {};
                                            temp2.wedstrijd = value.match;
                                            temp2.eindstand = value.result;
                                            temp2.datum = value.date;
                                            temp2.ronde = value.ronde;
                                            temp2.matchID = value.matchID;
                                            temp2.minuten = value.minuten;
                                            temp2.pass_percentage = value.pass_percentage;
                                            temp2.pass_lengte = value.pass_lengte;
                                            temp2.geel = value.geel;
                                            temp2.rood = value.rood;
                                            temp2.doelpunten = value.doelpunten;
                                            temp2.aantal_passes = value.aantal_passes;
                                            temp2.geslaagde_passes = value.geslaagde_passes;
                                            temp2.voorzetten = value.voorzetten;
                                            temp2.doelpogingen = value.doelpogingen;
                                            temp2.doelpogingen_opdoel = value.doelpogingen_opdoel;
                                            temp2.aanvallende_duels = value.aanvallende_duels;
                                            temp2.verdedigende_duels = value.verdedigende_duels;
                                            temp2.gewonnen_duels = value.gewonnen_duels;
                                            temp2.intercepties = value.intercepties;
                                            temp2.overtredingen = value.overtredingen;
                                            temp2.reddingen = value.reddingen;
                                            temp2.geslaagde_reddingen = value.geslaagde_reddingen;
                                            temp2.korte_passes = value.korte_passes;
                                            temp2.middellange_passes = value.middellange_passes;
                                            temp2.lange_passes = value.lange_passes;
                                            temp2.succesvolle_uittrappen = value.succesvolle_uittrappen;
                                            temp2.gevangen_ballen = value.gevangen_ballen;
                                            temp2.weggestompte_ballen = value.weggestompte_ballen;
                                            temp2.doelpunten_tegen = value.doelpunten_tegen;
                                            temp1.match.push(temp2);
                                            temp.matches.push(temp1);

                                            teamdata.player_data.push(temp);
                                        });

                                        Api.TeamData.post(teamdata, function () {
                                            ended1 = true;
                                        }, function () {
                                            $rootScope.errorImport = 'Oeps er ging iets mis, teamdata niet geimporteerd';
                                        });
                                    } else {
                                        // check season and round, and change or add teamdata
                                        if (teamdata.team_data) {
                                            if ($filter('filter')(teamdata.team_data, {season: match_short.seizoen}, true)) {
                                                angular.forEach(teamdata.team_data, function (value, key) {
                                                    if (value.season == match_short.seizoen) {
                                                        // check if round exists
                                                        if ($filter('filter')(value.matches, {ronde: team_data.thuis.ronde}, true)) {
                                                            angular.forEach(value.matches, function (value1, key1) {
                                                                value1.wedstrijd = team_data.thuis.wedstrijd;
                                                                value1.matchID = team_data.thuis.matchID;
                                                                value1.doelpunten_voor = team_data.thuis.doelpunten_voor;
                                                                value1.doelpunten_tegen = team_data.thuis.doelpunten_tegen;
                                                                value1.punten = team_data.thuis.punten;
                                                                value1.balbezit = team_data.thuis.balbezit;
                                                                value1.tot_passes = team_data.thuis.tot_passes;
                                                                value1.geslaagde_passes = team_data.thuis.geslaagde_passes;
                                                                value1.lengte_passes = team_data.thuis.lengte_passes;
                                                                value1.doelpogingen = team_data.thuis.doelpogingen;
                                                                value1.gewonnen_duels = team_data.thuis.gewonnen_duels;
                                                                value1.geel = team_data.thuis.geel;
                                                                value1.rood = team_data.thuis.rood;
                                                            });
                                                        } else {
                                                            value.matches.push(team_data.thuis);
                                                        }
                                                    }
                                                });
                                            } else {
                                                var team_data_temp = {};
                                                team_data_temp.season = match_short.seizoen;
                                                team_data_temp.matches = [];
                                                team_data_temp.matches.push(team_data.thuis);
                                                teamdata.team_data.push(team_data_temp);
                                            }
                                        } else {
                                            teamdata.team_data = [];
                                            var team_data_temp2 = {};
                                            team_data_temp2.season = match_short.seizoen;
                                            team_data_temp2.matches = [];
                                            team_data_temp2.matches.push(team_data.thuis);
                                            teamdata.team_data.push(team_data_temp2);
                                        }

                                        // check player and change or create, check season and round, and change or add playerdata
                                        if (teamdata.player_data) {
                                            angular.forEach(player_data.player_stats_thuis, function (value, key) {
                                                angular.forEach(player_data, function (value1, key1) {
                                                    if (value.personID == value1.playerID && value.type == value1.spelerType) {
                                                        value1.spelerNaam = value.spelerNaam;
                                                        value1.spelerRugnummer = value.rugnummer;

                                                        if (value1.matches) {
                                                            if ($filter('filter')(value1.matches, {season: match_short.seizoen}, true)) {
                                                                angular.forEach(value1.matches, function (value2, key2) {
                                                                    if (value2.season == match_short.seizoen) {
                                                                        // check if round exists
                                                                        if ($filter('filter')(value2.match, {ronde: value.ronde}, true)) {
                                                                            angular.forEach(value2.match, function (value3, key3) {
                                                                                if (value3.ronde == value.ronde) {
                                                                                    value3.wedstrijd = value.match;
                                                                                    value3.eindstand = value.result;
                                                                                    value3.datum = value.date;
                                                                                    value3.ronde = value.ronde;
                                                                                    value3.matchID = value.matchID;
                                                                                    value3.minuten = value.minuten;
                                                                                    value3.pass_percentage = value.pass_percentage;
                                                                                    value3.pass_lengte = value.pass_lengte;
                                                                                    value3.geel = value.geel;
                                                                                    value3.rood = value.rood;
                                                                                    value3.doelpunten = value.doelpunten;
                                                                                    value3.aantal_passes = value.aantal_passes;
                                                                                    value3.geslaagde_passes = value.geslaagde_passes;
                                                                                    value3.voorzetten = value.voorzetten;
                                                                                    value3.doelpogingen = value.doelpogingen;
                                                                                    value3.doelpogingen_opdoel = value.doelpogingen_opdoel;
                                                                                    value3.aanvallende_duels = value.aanvallende_duels;
                                                                                    value3.verdedigende_duels = value.verdedigende_duels;
                                                                                    value3.gewonnen_duels = value.gewonnen_duels;
                                                                                    value3.intercepties = value.intercepties;
                                                                                    value3.overtredingen = value.overtredingen;
                                                                                    value3.reddingen = value.reddingen;
                                                                                    value3.geslaagde_reddingen = value.geslaagde_reddingen;
                                                                                    value3.korte_passes = value.korte_passes;
                                                                                    value3.middellange_passes = value.middellange_passes;
                                                                                    value3.lange_passes = value.lange_passes;
                                                                                    value3.succesvolle_uittrappen = value.succesvolle_uittrappen;
                                                                                    value3.gevangen_ballen = value.gevangen_ballen;
                                                                                    value3.weggestompte_ballen = value.weggestompte_ballen;
                                                                                    value3.doelpunten_tegen = value.doelpunten_tegen;
                                                                                }
                                                                            });
                                                                        } else {
                                                                            var temp2 = {};
                                                                            temp2.wedstrijd = value.match;
                                                                            temp2.eindstand = value.result;
                                                                            temp2.datum = value.date;
                                                                            temp2.ronde = value.ronde;
                                                                            temp2.matchID = value.matchID;
                                                                            temp2.minuten = value.minuten;
                                                                            temp2.pass_percentage = value.pass_percentage;
                                                                            temp2.pass_lengte = value.pass_lengte;
                                                                            temp2.geel = value.geel;
                                                                            temp2.rood = value.rood;
                                                                            temp2.doelpunten = value.doelpunten;
                                                                            temp2.aantal_passes = value.aantal_passes;
                                                                            temp2.geslaagde_passes = value.geslaagde_passes;
                                                                            temp2.voorzetten = value.voorzetten;
                                                                            temp2.doelpogingen = value.doelpogingen;
                                                                            temp2.doelpogingen_opdoel = value.doelpogingen_opdoel;
                                                                            temp2.aanvallende_duels = value.aanvallende_duels;
                                                                            temp2.verdedigende_duels = value.verdedigende_duels;
                                                                            temp2.gewonnen_duels = value.gewonnen_duels;
                                                                            temp2.intercepties = value.intercepties;
                                                                            temp2.overtredingen = value.overtredingen;
                                                                            temp2.reddingen = value.reddingen;
                                                                            temp2.geslaagde_reddingen = value.geslaagde_reddingen;
                                                                            temp2.korte_passes = value.korte_passes;
                                                                            temp2.middellange_passes = value.middellange_passes;
                                                                            temp2.lange_passes = value.lange_passes;
                                                                            temp2.succesvolle_uittrappen = value.succesvolle_uittrappen;
                                                                            temp2.gevangen_ballen = value.gevangen_ballen;
                                                                            temp2.weggestompte_ballen = value.weggestompte_ballen;
                                                                            temp2.doelpunten_tegen = value.doelpunten_tegen;

                                                                            value2.match.push(temp2);
                                                                        }
                                                                    }
                                                                });
                                                            } else {
                                                                var temp1 = {};
                                                                temp1.season = match_short.seizoen;
                                                                temp1.match = [];

                                                                var temp2 = {};
                                                                temp2.wedstrijd = value.match;
                                                                temp2.eindstand = value.result;
                                                                temp2.datum = value.date;
                                                                temp2.ronde = value.ronde;
                                                                temp2.matchID = value.matchID;
                                                                temp2.minuten = value.minuten;
                                                                temp2.pass_percentage = value.pass_percentage;
                                                                temp2.pass_lengte = value.pass_lengte;
                                                                temp2.geel = value.geel;
                                                                temp2.rood = value.rood;
                                                                temp2.doelpunten = value.doelpunten;
                                                                temp2.aantal_passes = value.aantal_passes;
                                                                temp2.geslaagde_passes = value.geslaagde_passes;
                                                                temp2.voorzetten = value.voorzetten;
                                                                temp2.doelpogingen = value.doelpogingen;
                                                                temp2.doelpogingen_opdoel = value.doelpogingen_opdoel;
                                                                temp2.aanvallende_duels = value.aanvallende_duels;
                                                                temp2.verdedigende_duels = value.verdedigende_duels;
                                                                temp2.gewonnen_duels = value.gewonnen_duels;
                                                                temp2.intercepties = value.intercepties;
                                                                temp2.overtredingen = value.overtredingen;
                                                                temp2.reddingen = value.reddingen;
                                                                temp2.geslaagde_reddingen = value.geslaagde_reddingen;
                                                                temp2.korte_passes = value.korte_passes;
                                                                temp2.middellange_passes = value.middellange_passes;
                                                                temp2.lange_passes = value.lange_passes;
                                                                temp2.succesvolle_uittrappen = value.succesvolle_uittrappen;
                                                                temp2.gevangen_ballen = value.gevangen_ballen;
                                                                temp2.weggestompte_ballen = value.weggestompte_ballen;
                                                                temp2.doelpunten_tegen = value.doelpunten_tegen;

                                                                temp1.match.push(temp2);

                                                                value1.matches.push(temp1);
                                                            }
                                                        } else {
                                                            value1.matches = [];

                                                            var temp1 = {};
                                                            temp1.season = match_short.seizoen;
                                                            temp1.match = [];

                                                            var temp2 = {};
                                                            temp2.wedstrijd = value.match;
                                                            temp2.eindstand = value.result;
                                                            temp2.datum = value.date;
                                                            temp2.ronde = value.ronde;
                                                            temp2.matchID = value.matchID;
                                                            temp2.minuten = value.minuten;
                                                            temp2.pass_percentage = value.pass_percentage;
                                                            temp2.pass_lengte = value.pass_lengte;
                                                            temp2.geel = value.geel;
                                                            temp2.rood = value.rood;
                                                            temp2.doelpunten = value.doelpunten;
                                                            temp2.aantal_passes = value.aantal_passes;
                                                            temp2.geslaagde_passes = value.geslaagde_passes;
                                                            temp2.voorzetten = value.voorzetten;
                                                            temp2.doelpogingen = value.doelpogingen;
                                                            temp2.doelpogingen_opdoel = value.doelpogingen_opdoel;
                                                            temp2.aanvallende_duels = value.aanvallende_duels;
                                                            temp2.verdedigende_duels = value.verdedigende_duels;
                                                            temp2.gewonnen_duels = value.gewonnen_duels;
                                                            temp2.intercepties = value.intercepties;
                                                            temp2.overtredingen = value.overtredingen;
                                                            temp2.reddingen = value.reddingen;
                                                            temp2.geslaagde_reddingen = value.geslaagde_reddingen;
                                                            temp2.korte_passes = value.korte_passes;
                                                            temp2.middellange_passes = value.middellange_passes;
                                                            temp2.lange_passes = value.lange_passes;
                                                            temp2.succesvolle_uittrappen = value.succesvolle_uittrappen;
                                                            temp2.gevangen_ballen = value.gevangen_ballen;
                                                            temp2.weggestompte_ballen = value.weggestompte_ballen;
                                                            temp2.doelpunten_tegen = value.doelpunten_tegen;

                                                            temp1.match.push(temp2);

                                                            value1.matches.push(temp1);
                                                        }
                                                    }
                                                });
                                            });
                                        } else {
                                            teamdata.player_data = [];
                                            angular.forEach(player_data.player_stats_thuis, function (value, key1) {
                                                var temp = {};
                                                temp.playerID = value.personID;
                                                temp.spelerNaam = value.spelerNaam;
                                                temp.spelerType = value.type;
                                                temp.spelerRugnummer = value.rugnummer;
                                                temp.matches = [];

                                                var temp1 = {};
                                                temp1.season = match_short.seizoen;
                                                temp1.match = [];

                                                var temp2 = {};
                                                temp2.wedstrijd = value.match;
                                                temp2.eindstand = value.result;
                                                temp2.datum = value.date;
                                                temp2.ronde = value.ronde;
                                                temp2.matchID = value.matchID;
                                                temp2.minuten = value.minuten;
                                                temp2.pass_percentage = value.pass_percentage;
                                                temp2.pass_lengte = value.pass_lengte;
                                                temp2.geel = value.geel;
                                                temp2.rood = value.rood;
                                                temp2.doelpunten = value.doelpunten;
                                                temp2.aantal_passes = value.aantal_passes;
                                                temp2.geslaagde_passes = value.geslaagde_passes;
                                                temp2.voorzetten = value.voorzetten;
                                                temp2.doelpogingen = value.doelpogingen;
                                                temp2.doelpogingen_opdoel = value.doelpogingen_opdoel;
                                                temp2.aanvallende_duels = value.aanvallende_duels;
                                                temp2.verdedigende_duels = value.verdedigende_duels;
                                                temp2.gewonnen_duels = value.gewonnen_duels;
                                                temp2.intercepties = value.intercepties;
                                                temp2.overtredingen = value.overtredingen;
                                                temp2.reddingen = value.reddingen;
                                                temp2.geslaagde_reddingen = value.geslaagde_reddingen;
                                                temp2.korte_passes = value.korte_passes;
                                                temp2.middellange_passes = value.middellange_passes;
                                                temp2.lange_passes = value.lange_passes;
                                                temp2.succesvolle_uittrappen = value.succesvolle_uittrappen;
                                                temp2.gevangen_ballen = value.gevangen_ballen;
                                                temp2.weggestompte_ballen = value.weggestompte_ballen;
                                                temp2.doelpunten_tegen = value.doelpunten_tegen;

                                                temp1.match.push(temp2);

                                                temp.matches.push(temp1);

                                                teamdata.player_data.push(temp);
                                            });
                                        }

                                        Api.TeamDataItem.put({
                                            _slug: teamdata._id
                                        }, {
                                            team_data: teamdata.team_data,
                                            player_data: teamdata.player_data,
                                            date_edited: self.datetime
                                        }, function () {
                                            ended1 = true;
                                        }, function () {
                                            $rootScope.errorImport = 'Oeps er ging iets mis, teamdata niet geimporteerd';
                                        });
                                    }
                                });
                            });
                        }
                        if (team_data.uit) {
                            var club_slug_uit = match_short.uitTeamSlug;
                            var team_slug_uit;

                            // check if club exists, otherwise create one
                            Api.Club.get({
                                _slug: club_slug_uit
                            }, function (res) {
                                var clubdata_uit = res;

                                if (!clubdata_uit._slug) {
                                    // create team and teamID with the season
                                    var teams = [];
                                    var teamstemp = {};
                                    teamstemp.team_name = '1e elftal';
                                    teamstemp.team_slug = club_slug_uit + '_' + teamstemp.team_name.trim().toLowerCase().replace(/\s+/g, '');
                                    teamstemp.teamID = [];
                                    var teamstemp2 = {};
                                    teamstemp2.ID = match_short.uitTeamID;
                                    teamstemp2.season = match_short.seizoen;
                                    teamstemp.teamID.push(teamstemp2);
                                    teamstemp.coach = '';
                                    teamstemp.divisie = match_short.divisie;
                                    teams.push(teamstemp);

                                    match_short.match_info.coach_uit = '';
                                    match_short.uitTeamSlug = teamstemp.team_slug;
                                    items.uitTeamSlug = teamstemp.team_slug;
                                    team_slug_uit = teamstemp.team_slug;

                                    Api.Clubs.post({
                                        _slug: club_slug_uit,
                                        name: match_short.match_info.uit,
                                        logo: match_short.match_info.uit + '.jpg',
                                        teams: teams,
                                        date_edited: self.datetime
                                    }, function (res) {
                                    }, function () {
                                    });
                                } else {
                                    // check if team exists, otherwise create one or both
                                    if ($filter('filter')(clubdata_uit.teams, {divisie: match_short.divisie}, true)) {
                                        var teamstemp3 = '';
                                        teamstemp3 = $filter('filter')(clubdata_uit.teams, {divisie: match_short.divisie}, true)[0];
                                        if (!($filter('filter')(teamstemp3.teamID, {season: match_short.seizoen}, true)[0])) {
                                            // create teamID
                                            angular.forEach(clubdata_uit.teams, function (value, key) {
                                                if (value.divisie == match_short.divisie) {
                                                    var temp = {};
                                                    temp.ID = match_short.thuisTeamID;
                                                    temp.season = match_short.seizoen;
                                                    value.teamID.push(temp);
                                                }
                                            });

                                            Api.Club.put({
                                                _slug: clubdata_uit._id
                                            }, {
                                                teams: clubdata_uit.teams,
                                                date_edited: self.datetime
                                            }, function (res) {
                                            }, function () {
                                            });
                                        }
                                        team_slug_uit = teamstemp3.team_slug;
                                        match_short.match_info.coach_uit = teamstemp3.coach;
                                        match_short.uitTeamSlug = teamstemp3.team_slug;
                                        items.uitTeamSlug = teamstemp3.team_slug;
                                    } else {
                                        // create team + teamID
                                        var teamstemp4 = {};
                                        teamstemp4.team_name = '1e elftal';
                                        teamstemp4.team_slug = club_slug_uit + '_' + teamstemp4.team_name.trim().toLowerCase().replace(/\s+/g, '');
                                        teamstemp4.teamID = [];
                                        var teamstemp5 = {};
                                        teamstemp5.ID = match_short.uitTeamID;
                                        teamstemp5.season = match_short.seizoen;
                                        teamstemp4.teamID.push(teamstemp5);
                                        teamstemp4.coach = '';
                                        teamstemp4.divisie = match_short.divisie;
                                        clubdata_uit.teams.push(teamstemp4);

                                        match_short.match_info.coach_uit = '';
                                        match_short.uitTeamSlug = teamstemp4.team_slug;
                                        items.uitTeamSlug = teamstemp4.team_slug;
                                        team_slug_uit = teamstemp4.team_slug;

                                        Api.Club.put({
                                            _slug: clubdata_uit._id
                                        }, {
                                            teams: clubdata_uit.teams,
                                            date_edited: self.datetime
                                        }, function (res) {
                                        }, function () {
                                        });
                                    }
                                }

                                Api.TeamDataItem.get({
                                    _slug: team_slug_uit
                                }, function (res) {
                                    var teamdata_uit = res;

                                    if (!teamdata_uit.team_slug) {
                                        // create teamdata_uit
                                        // create season and round and add teamdata_uit
                                        teamdata_uit = {};
                                        teamdata_uit.team_slug = team_slug_uit;
                                        teamdata_uit.team_name = '1e elftal';
                                        teamdata_uit.divisie = match_short.divisie;
                                        teamdata_uit.club_name = match_short.match_info.uit;
                                        teamdata_uit.club_slug = match_short.uitTeamSlug;
                                        teamdata_uit.team_data = [];
                                        var team_data_temp3 = {};
                                        team_data_temp3.season = match_short.seizoen;
                                        team_data_temp3.matches = [];
                                        team_data_temp3.matches.push(team_data.uit);
                                        teamdata_uit.team_data.push(team_data_temp3);

                                        // create all players and create season and round and add playerdata
                                        teamdata_uit.player_data = [];
                                        angular.forEach(player_data.player_stats_uit, function (value, key1) {
                                            var temp = {};
                                            temp.playerID = value.personID;
                                            temp.spelerNaam = value.spelerNaam;
                                            temp.spelerType = value.type;
                                            temp.spelerRugnummer = value.rugnummer;
                                            temp.matches = [];
                                            var temp1 = {};
                                            temp1.season = match_short.seizoen;
                                            temp1.match = [];
                                            var temp2 = {};
                                            temp2.wedstrijd = value.match;
                                            temp2.eindstand = value.result;
                                            temp2.datum = value.date;
                                            temp2.ronde = value.ronde;
                                            temp2.matchID = value.matchID;
                                            temp2.minuten = value.minuten;
                                            temp2.pass_percentage = value.pass_percentage;
                                            temp2.pass_lengte = value.pass_lengte;
                                            temp2.geel = value.geel;
                                            temp2.rood = value.rood;
                                            temp2.doelpunten = value.doelpunten;
                                            temp2.aantal_passes = value.aantal_passes;
                                            temp2.geslaagde_passes = value.geslaagde_passes;
                                            temp2.voorzetten = value.voorzetten;
                                            temp2.doelpogingen = value.doelpogingen;
                                            temp2.doelpogingen_opdoel = value.doelpogingen_opdoel;
                                            temp2.aanvallende_duels = value.aanvallende_duels;
                                            temp2.verdedigende_duels = value.verdedigende_duels;
                                            temp2.gewonnen_duels = value.gewonnen_duels;
                                            temp2.intercepties = value.intercepties;
                                            temp2.overtredingen = value.overtredingen;
                                            temp2.reddingen = value.reddingen;
                                            temp2.geslaagde_reddingen = value.geslaagde_reddingen;
                                            temp2.korte_passes = value.korte_passes;
                                            temp2.middellange_passes = value.middellange_passes;
                                            temp2.lange_passes = value.lange_passes;
                                            temp2.succesvolle_uittrappen = value.succesvolle_uittrappen;
                                            temp2.gevangen_ballen = value.gevangen_ballen;
                                            temp2.weggestompte_ballen = value.weggestompte_ballen;
                                            temp2.doelpunten_tegen = value.doelpunten_tegen;
                                            temp1.match.push(temp2);
                                            temp.matches.push(temp1);

                                            teamdata_uit.player_data.push(temp);
                                        });

                                        Api.TeamData.post(teamdata_uit, function () {
                                            ended2 = true;
                                        }, function () {
                                            $rootScope.errorImport = 'Oeps er ging iets mis, teamdata niet geimporteerd';
                                        });
                                    } else {
                                        // check season and round, and change or add teamdata_uit
                                        if (teamdata_uit.team_data) {
                                            if ($filter('filter')(teamdata_uit.team_data, {season: match_short.seizoen}, true)) {
                                                angular.forEach(teamdata_uit.team_data, function (value, key) {
                                                    if (value.season == match_short.seizoen) {
                                                        // check if round exists
                                                        if ($filter('filter')(value.matches, {ronde: team_data.uit.ronde}, true)) {
                                                            angular.forEach(value.matches, function (value1, key1) {
                                                                value1.wedstrijd = team_data.uit.wedstrijd;
                                                                value1.matchID = team_data.uit.matchID;
                                                                value1.doelpunten_voor = team_data.uit.doelpunten_voor;
                                                                value1.doelpunten_tegen = team_data.uit.doelpunten_tegen;
                                                                value1.punten = team_data.uit.punten;
                                                                value1.balbezit = team_data.uit.balbezit;
                                                                value1.tot_passes = team_data.uit.tot_passes;
                                                                value1.geslaagde_passes = team_data.uit.geslaagde_passes;
                                                                value1.lengte_passes = team_data.uit.lengte_passes;
                                                                value1.doelpogingen = team_data.uit.doelpogingen;
                                                                value1.gewonnen_duels = team_data.uit.gewonnen_duels;
                                                                value1.geel = team_data.uit.geel;
                                                                value1.rood = team_data.uit.rood;
                                                            });
                                                        } else {
                                                            value.matches.push(team_data.uit);
                                                        }
                                                    }
                                                });
                                            } else {
                                                var team_data_temp = {};
                                                team_data_temp.season = match_short.seizoen;
                                                team_data_temp.matches = [];
                                                team_data_temp.matches.push(team_data.uit);
                                                teamdata_uit.team_data.push(team_data_temp);
                                            }
                                        } else {
                                            teamdata_uit.team_data = [];
                                            var team_data_temp2 = {};
                                            team_data_temp2.season = match_short.seizoen;
                                            team_data_temp2.matches = [];
                                            team_data_temp2.matches.push(team_data.uit);
                                            teamdata_uit.team_data.push(team_data_temp2);
                                        }

                                        // check player and change or create, check season and round, and change or add playerdata
                                        if (teamdata_uit.player_data) {
                                            angular.forEach(player_data.player_stats_uit, function (value, key) {
                                                angular.forEach(player_data, function (value1, key1) {
                                                    if (value.personID == value1.playerID && value.type == value1.spelerType) {
                                                        value1.spelerNaam = value.spelerNaam;
                                                        value1.spelerRugnummer = value.rugnummer;

                                                        if (value1.matches) {
                                                            if ($filter('filter')(value1.matches, {season: match_short.seizoen}, true)) {
                                                                angular.forEach(value1.matches, function (value2, key2) {
                                                                    if (value2.season == match_short.seizoen) {
                                                                        // check if round exists
                                                                        if ($filter('filter')(value2.match, {ronde: value.ronde}, true)) {
                                                                            angular.forEach(value2.match, function (value3, key3) {
                                                                                if (value3.ronde == value.ronde) {
                                                                                    value3.wedstrijd = value.match;
                                                                                    value3.eindstand = value.result;
                                                                                    value3.datum = value.date;
                                                                                    value3.ronde = value.ronde;
                                                                                    value3.matchID = value.matchID;
                                                                                    value3.minuten = value.minuten;
                                                                                    value3.pass_percentage = value.pass_percentage;
                                                                                    value3.pass_lengte = value.pass_lengte;
                                                                                    value3.geel = value.geel;
                                                                                    value3.rood = value.rood;
                                                                                    value3.doelpunten = value.doelpunten;
                                                                                    value3.aantal_passes = value.aantal_passes;
                                                                                    value3.geslaagde_passes = value.geslaagde_passes;
                                                                                    value3.voorzetten = value.voorzetten;
                                                                                    value3.doelpogingen = value.doelpogingen;
                                                                                    value3.doelpogingen_opdoel = value.doelpogingen_opdoel;
                                                                                    value3.aanvallende_duels = value.aanvallende_duels;
                                                                                    value3.verdedigende_duels = value.verdedigende_duels;
                                                                                    value3.gewonnen_duels = value.gewonnen_duels;
                                                                                    value3.intercepties = value.intercepties;
                                                                                    value3.overtredingen = value.overtredingen;
                                                                                    value3.reddingen = value.reddingen;
                                                                                    value3.geslaagde_reddingen = value.geslaagde_reddingen;
                                                                                    value3.korte_passes = value.korte_passes;
                                                                                    value3.middellange_passes = value.middellange_passes;
                                                                                    value3.lange_passes = value.lange_passes;
                                                                                    value3.succesvolle_uittrappen = value.succesvolle_uittrappen;
                                                                                    value3.gevangen_ballen = value.gevangen_ballen;
                                                                                    value3.weggestompte_ballen = value.weggestompte_ballen;
                                                                                    value3.doelpunten_tegen = value.doelpunten_tegen;
                                                                                }
                                                                            });
                                                                        } else {
                                                                            var temp2 = {};
                                                                            temp2.wedstrijd = value.match;
                                                                            temp2.eindstand = value.result;
                                                                            temp2.datum = value.date;
                                                                            temp2.ronde = value.ronde;
                                                                            temp2.matchID = value.matchID;
                                                                            temp2.minuten = value.minuten;
                                                                            temp2.pass_percentage = value.pass_percentage;
                                                                            temp2.pass_lengte = value.pass_lengte;
                                                                            temp2.geel = value.geel;
                                                                            temp2.rood = value.rood;
                                                                            temp2.doelpunten = value.doelpunten;
                                                                            temp2.aantal_passes = value.aantal_passes;
                                                                            temp2.geslaagde_passes = value.geslaagde_passes;
                                                                            temp2.voorzetten = value.voorzetten;
                                                                            temp2.doelpogingen = value.doelpogingen;
                                                                            temp2.doelpogingen_opdoel = value.doelpogingen_opdoel;
                                                                            temp2.aanvallende_duels = value.aanvallende_duels;
                                                                            temp2.verdedigende_duels = value.verdedigende_duels;
                                                                            temp2.gewonnen_duels = value.gewonnen_duels;
                                                                            temp2.intercepties = value.intercepties;
                                                                            temp2.overtredingen = value.overtredingen;
                                                                            temp2.reddingen = value.reddingen;
                                                                            temp2.geslaagde_reddingen = value.geslaagde_reddingen;
                                                                            temp2.korte_passes = value.korte_passes;
                                                                            temp2.middellange_passes = value.middellange_passes;
                                                                            temp2.lange_passes = value.lange_passes;
                                                                            temp2.succesvolle_uittrappen = value.succesvolle_uittrappen;
                                                                            temp2.gevangen_ballen = value.gevangen_ballen;
                                                                            temp2.weggestompte_ballen = value.weggestompte_ballen;
                                                                            temp2.doelpunten_tegen = value.doelpunten_tegen;

                                                                            value2.match.push(temp2);
                                                                        }
                                                                    }
                                                                });
                                                            } else {
                                                                var temp1 = {};
                                                                temp1.season = match_short.seizoen;
                                                                temp1.match = [];

                                                                var temp2 = {};
                                                                temp2.wedstrijd = value.match;
                                                                temp2.eindstand = value.result;
                                                                temp2.datum = value.date;
                                                                temp2.ronde = value.ronde;
                                                                temp2.matchID = value.matchID;
                                                                temp2.minuten = value.minuten;
                                                                temp2.pass_percentage = value.pass_percentage;
                                                                temp2.pass_lengte = value.pass_lengte;
                                                                temp2.geel = value.geel;
                                                                temp2.rood = value.rood;
                                                                temp2.doelpunten = value.doelpunten;
                                                                temp2.aantal_passes = value.aantal_passes;
                                                                temp2.geslaagde_passes = value.geslaagde_passes;
                                                                temp2.voorzetten = value.voorzetten;
                                                                temp2.doelpogingen = value.doelpogingen;
                                                                temp2.doelpogingen_opdoel = value.doelpogingen_opdoel;
                                                                temp2.aanvallende_duels = value.aanvallende_duels;
                                                                temp2.verdedigende_duels = value.verdedigende_duels;
                                                                temp2.gewonnen_duels = value.gewonnen_duels;
                                                                temp2.intercepties = value.intercepties;
                                                                temp2.overtredingen = value.overtredingen;
                                                                temp2.reddingen = value.reddingen;
                                                                temp2.geslaagde_reddingen = value.geslaagde_reddingen;
                                                                temp2.korte_passes = value.korte_passes;
                                                                temp2.middellange_passes = value.middellange_passes;
                                                                temp2.lange_passes = value.lange_passes;
                                                                temp2.succesvolle_uittrappen = value.succesvolle_uittrappen;
                                                                temp2.gevangen_ballen = value.gevangen_ballen;
                                                                temp2.weggestompte_ballen = value.weggestompte_ballen;
                                                                temp2.doelpunten_tegen = value.doelpunten_tegen;

                                                                temp1.match.push(temp2);

                                                                value1.matches.push(temp1);
                                                            }
                                                        } else {
                                                            value1.matches = [];

                                                            var temp1 = {};
                                                            temp1.season = match_short.seizoen;
                                                            temp1.match = [];

                                                            var temp2 = {};
                                                            temp2.wedstrijd = value.match;
                                                            temp2.eindstand = value.result;
                                                            temp2.datum = value.date;
                                                            temp2.ronde = value.ronde;
                                                            temp2.matchID = value.matchID;
                                                            temp2.minuten = value.minuten;
                                                            temp2.pass_percentage = value.pass_percentage;
                                                            temp2.pass_lengte = value.pass_lengte;
                                                            temp2.geel = value.geel;
                                                            temp2.rood = value.rood;
                                                            temp2.doelpunten = value.doelpunten;
                                                            temp2.aantal_passes = value.aantal_passes;
                                                            temp2.geslaagde_passes = value.geslaagde_passes;
                                                            temp2.voorzetten = value.voorzetten;
                                                            temp2.doelpogingen = value.doelpogingen;
                                                            temp2.doelpogingen_opdoel = value.doelpogingen_opdoel;
                                                            temp2.aanvallende_duels = value.aanvallende_duels;
                                                            temp2.verdedigende_duels = value.verdedigende_duels;
                                                            temp2.gewonnen_duels = value.gewonnen_duels;
                                                            temp2.intercepties = value.intercepties;
                                                            temp2.overtredingen = value.overtredingen;
                                                            temp2.reddingen = value.reddingen;
                                                            temp2.geslaagde_reddingen = value.geslaagde_reddingen;
                                                            temp2.korte_passes = value.korte_passes;
                                                            temp2.middellange_passes = value.middellange_passes;
                                                            temp2.lange_passes = value.lange_passes;
                                                            temp2.succesvolle_uittrappen = value.succesvolle_uittrappen;
                                                            temp2.gevangen_ballen = value.gevangen_ballen;
                                                            temp2.weggestompte_ballen = value.weggestompte_ballen;
                                                            temp2.doelpunten_tegen = value.doelpunten_tegen;

                                                            temp1.match.push(temp2);

                                                            value1.matches.push(temp1);
                                                        }
                                                    }
                                                });
                                            });
                                        } else {
                                            teamdata_uit.player_data = [];
                                            angular.forEach(player_data.player_stats_uit, function (value, key1) {
                                                var temp = {};
                                                temp.playerID = value.personID;
                                                temp.spelerNaam = value.spelerNaam;
                                                temp.spelerType = value.type;
                                                temp.spelerRugnummer = value.rugnummer;
                                                temp.matches = [];

                                                var temp1 = {};
                                                temp1.season = match_short.seizoen;
                                                temp1.match = [];

                                                var temp2 = {};
                                                temp2.wedstrijd = value.match;
                                                temp2.eindstand = value.result;
                                                temp2.datum = value.date;
                                                temp2.ronde = value.ronde;
                                                temp2.matchID = value.matchID;
                                                temp2.minuten = value.minuten;
                                                temp2.pass_percentage = value.pass_percentage;
                                                temp2.pass_lengte = value.pass_lengte;
                                                temp2.geel = value.geel;
                                                temp2.rood = value.rood;
                                                temp2.doelpunten = value.doelpunten;
                                                temp2.aantal_passes = value.aantal_passes;
                                                temp2.geslaagde_passes = value.geslaagde_passes;
                                                temp2.voorzetten = value.voorzetten;
                                                temp2.doelpogingen = value.doelpogingen;
                                                temp2.doelpogingen_opdoel = value.doelpogingen_opdoel;
                                                temp2.aanvallende_duels = value.aanvallende_duels;
                                                temp2.verdedigende_duels = value.verdedigende_duels;
                                                temp2.gewonnen_duels = value.gewonnen_duels;
                                                temp2.intercepties = value.intercepties;
                                                temp2.overtredingen = value.overtredingen;
                                                temp2.reddingen = value.reddingen;
                                                temp2.geslaagde_reddingen = value.geslaagde_reddingen;
                                                temp2.korte_passes = value.korte_passes;
                                                temp2.middellange_passes = value.middellange_passes;
                                                temp2.lange_passes = value.lange_passes;
                                                temp2.succesvolle_uittrappen = value.succesvolle_uittrappen;
                                                temp2.gevangen_ballen = value.gevangen_ballen;
                                                temp2.weggestompte_ballen = value.weggestompte_ballen;
                                                temp2.doelpunten_tegen = value.doelpunten_tegen;

                                                temp1.match.push(temp2);

                                                temp.matches.push(temp1);

                                                teamdata_uit.player_data.push(temp);
                                            });
                                        }

                                        Api.TeamDataItem.put({
                                            _slug: teamdata_uit._id
                                        }, {
                                            team_data: teamdata_uit.team_data,
                                            player_data: teamdata_uit.player_data,
                                            date_edited: self.datetime
                                        }, function () {
                                            ended2 = true;
                                        }, function () {
                                            $rootScope.errorImport = 'Oeps er ging iets mis, teamdata niet geimporteerd';
                                        });
                                    }
                                });
                            });
                        }
                    }

                    if (data && match_data && match_short) {
                        $rootScope.errorImport = '';
                        Api.Match.get({
                            _id: match_data.matchID
                        }, function (res) {
                            var matchshort = res;

                            if (!matchshort.matchID) {
                                Api.Matches.post(match_short, function () {
                                    ended3 = true;
                                }, function () {
                                    $rootScope.errorImport = 'De data is niet correct geimporteerd in de database, mogelijk is de opmaakt van de data file niet correct.';
                                });
                            } else {
                                Api.Match.put({
                                    _id: matchshort._id
                                }, match_short, function () {
                                    ended3 = true;
                                }, function () {
                                    $rootScope.errorImport = 'De data is niet correct geimporteerd in de database, mogelijk is de opmaakt van de data file niet correct.';
                                });
                            }
                        });
                    }

                    if (data && match_data) {
                        $rootScope.errorImport = '';
                        Api.MatchDataID.get({
                            _id: match_data.matchID
                        }, function (res) {
                            var matchdata = res;

                            match_data = angular.copy(items);

                            if (!matchdata.matchID) {
                                Api.MatchData.post(match_data, function () {
                                    ended4 = true;
                                }, function () {
                                    $rootScope.errorImport = 'De data is niet correct geimporteerd in de database, mogelijk is de opmaakt van de data file niet correct.';
                                });
                            } else {
                                Api.MatchDataItem.put({
                                    _id: matchdata._id
                                }, match_data, function () {
                                    ended4 = true;
                                }, function () {
                                    $rootScope.errorImport = 'De data is niet correct geimporteerd in de database, mogelijk is de opmaakt van de data file niet correct.';
                                });
                            }
                        });
                    }

                    if (ended1 && ended2 && ended3 && ended4) {
                        $location.path('/admin');
                    }
                });
        };
    }]);