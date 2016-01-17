var fs          = require('fs');
var mongoose    = require('mongoose');
var _           = require('underscore');
var forEach     = require('array-foreach');
var Buffer      = require('buffer').Buffer;
var mailer      = require('express-mailer');

var Club        = require('../models/club');
var MatchData   = require('../models/match_data');
var Matches     = require('../models/matches');
var Spelers     = require('../models/spelers');
var TeamData    = require('../models/team_data');

module.exports = ImportController = {

    match : function(file_path, res)
    {
        var data;

        var Number_converter = function (value) {
            if (isNaN(Number(value)) || isNaN(value) || Number(value) == 'NaN' || value === 'NaN' || Number(value) == 'NA' || value === 'NA') {
                return 0;
            } else {
                return Number(value);
            }
        };
        
        fs.readFile(file_path, 'utf8', function handleFile(err, data1) {
            if (err) {
                console.log(err);
                res.mailer.send('mailer/error', {
                    to: 'contact@mpbeta.nl', // REQUIRED. This can be a comma delimited string just like a normal email to field.
                    subject: 'A 404 Error Has Occurred On soccerpc.nl', // REQUIRED.
                    // All additional properties are also passed to the template as local variables.
                    title: 'A 404 Error Has Occurred On soccerpc.nl',
                    error: err
                }, function (err1) {
                    if (err1) {
                        // handle error
                        console.log('Error sending error email\n\n' + err1 + '\n\n' + err);
                    }

                    console.log('Error email send to administrator\n\n' + err);
                });
                throw err;
            }
            data = JSON.parse(data1);

            var datetime = new Date();

            var match_short;
            var match_data;
            var team_data;
            var player_data;
            var items = {};

            var speler_profiel_thuis;
            var speler_profiel_uit;

            Spelers.find({clubID: data.wedstrijd_data.thuisTeamID[0]}, function (err, res0) {
                if (err) { console.log(err); throw err; }
                speler_profiel_thuis = res0;

                Spelers.find({clubID: data.wedstrijd_data.uitTeamID[0]}, function (err1, res1) {
                    if (err) { console.log(err); throw err; }
                    speler_profiel_uit = res1;

                    _.delay(function () {
                        if (data != null) {
                            items.matchID = data.wedstrijd_data.matchID[0];
                            items.thuisTeamID = data.wedstrijd_data.thuisTeamID[0];
                            items.uitTeamID = data.wedstrijd_data.uitTeamID[0];

                            match_short = {};
                            match_short.match_info = {};
                            match_short.match_info = data.wedstrijd_data.titel[0];
                            match_short.match_info.blessure_tijd = data.wedstrijd_data.blessure_tijd[0];
                            match_short.match_info.coach_uit = data.wedstrijd_data.coaches[0].uitCoach;
                            match_short.match_info.coach_thuis = data.wedstrijd_data.coaches[0].thuisCoach;
                            match_short.match_info.logo_thuis = match_short.match_info.wedstrijd.split(" - ", 1)[0] + '.jpg';
                            match_short.match_info.logo_uit = match_short.match_info.wedstrijd.split(" - ", 2)[1] + '.jpg';
                            match_short.match_info.thuis = match_short.match_info.wedstrijd.split(" - ", 1)[0];
                            match_short.match_info.uit = match_short.match_info.wedstrijd.split(" - ", 2)[1];
                            match_short.matchID = data.wedstrijd_data.matchID[0];
                            match_short.thuisTeamID = data.wedstrijd_data.thuisTeamID[0];
                            match_short.thuisTeamSlug = match_short.match_info.thuis.trim().toLowerCase().replace(/\s+/g, '');
                            match_short.uitTeamID = data.wedstrijd_data.uitTeamID[0];
                            match_short.uitTeamSlug = match_short.match_info.uit.trim().toLowerCase().replace(/\s+/g, '');
                            match_short.opmerkingen = data.wedstrijd_data.opmerkingen[0];

                            items.thuisTeamSlug = match_short.match_info.thuis.trim().toLowerCase().replace(/\s+/g, '');
                            items.uitTeamSlug = match_short.match_info.uit.trim().toLowerCase().replace(/\s+/g, '');
                            items.ronde = match_short.match_info.ronde;
                            items.datum = match_short.match_info.datum;
                            items.wedstrijd = match_short.match_info.wedstrijd;
                            items.eindstand = match_short.match_info.eindstand;

                            team_data = {};
                            team_data.thuis = {};
                            team_data.uit = {};
                            team_data.thuis.matchID = Number_converter(items.matchID);
                            team_data.uit.matchID = Number_converter(items.matchID);
                            team_data.thuis.ronde = Number_converter(match_short.match_info.ronde);
                            team_data.uit.ronde = Number_converter(match_short.match_info.ronde);
                            team_data.thuis.wedstrijd = match_short.match_info.wedstrijd;
                            team_data.uit.wedstrijd = match_short.match_info.wedstrijd;
                            team_data.thuis.datum = match_short.match_info.datum;
                            team_data.uit.datum = match_short.match_info.datum;
                            team_data.thuis.doelpunten_voor = Number_converter(match_short.match_info.eindstand.split(" - ", 1)[0]);
                            team_data.thuis.doelpunten_tegen = Number_converter(match_short.match_info.eindstand.split(" - ", 2)[1]);
                            team_data.uit.doelpunten_voor = Number_converter(match_short.match_info.eindstand.split(" - ", 2)[1]);
                            team_data.uit.doelpunten_tegen = Number_converter(match_short.match_info.eindstand.split(" - ", 1)[0]);
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

                            if (data.team_data) {
                                team_data.thuis.balbezit = Number_converter(_.where(data.team_matrix, {_row: 'Balbezit'})[0][items.thuisTeamID].split("%", 1)[0]);
                                team_data.uit.balbezit = Number_converter(_.where(data.team_matrix, {_row: 'Balbezit'})[0][items.uitTeamID].split("%", 1)[0]);
                                team_data.thuis.tot_passes = Number_converter(_.where(data.team_matrix, {_row: 'Tot. aantal passes'})[0][items.thuisTeamID]);
                                team_data.uit.tot_passes = Number_converter(_.where(data.team_matrix, {_row: 'Tot. aantal passes'})[0][items.uitTeamID]);
                                team_data.thuis.geslaagde_passes = Number_converter(_.where(data.team_matrix, {_row: 'Geslaagde passes'})[0][items.thuisTeamID].split("%", 1)[0]);
                                team_data.uit.geslaagde_passes = Number_converter(_.where(data.team_matrix, {_row: 'Geslaagde passes'})[0][items.uitTeamID].split("%", 1)[0]);
                                team_data.thuis.lengte_passes = Number_converter(_.where(data.team_matrix, {_row: 'Gem. lengte passes'})[0][items.thuisTeamID].split(" m.", 1)[0]);
                                team_data.uit.lengte_passes = Number_converter(_.where(data.team_matrix, {_row: 'Gem. lengte passes'})[0][items.uitTeamID].split(" m.", 1)[0]);
                                team_data.thuis.doelpogingen = Number_converter(_.where(data.team_matrix, {_row: 'Doelpogingen'})[0][items.thuisTeamID]);
                                team_data.uit.doelpogingen = Number_converter(_.where(data.team_matrix, {_row: 'Doelpogingen'})[0][items.uitTeamID]);
                                team_data.thuis.gewonnen_duels = Number_converter(_.where(data.team_matrix, {_row: 'Gewonnen duels'})[0][items.thuisTeamID].split("%", 1)[0]);
                                team_data.uit.gewonnen_duels = Number_converter(_.where(data.team_matrix, {_row: 'Gewonnen duels'})[0][items.uitTeamID].split("%", 1)[0]);
                                team_data.thuis.geel = Number_converter(_.where(data.team_matrix, {_row: 'Gele kaarten'})[0][items.thuisTeamID]);
                                team_data.uit.geel = Number_converter(_.where(data.team_matrix, {_row: 'Gele kaarten'})[0][items.uitTeamID]);
                                team_data.thuis.rood = Number_converter(_.where(data.team_matrix, {_row: 'Rode kaarten'})[0][items.thuisTeamID]);
                                team_data.uit.rood = Number_converter(_.where(data.team_matrix, {_row: 'Rode kaarten'})[0][items.uitTeamID]);

                                team_data.thuis.team_leeftijd = {};
                                team_data.uit.team_leeftijd = {};
                                if (data.team_data.team_leeftijd) {
                                    if (data.team_data.team_leeftijd.thuisLeeftijd_basis) {
                                        team_data.thuis.team_leeftijd.leeftijd_basis = data.team_data.team_leeftijd.thuisLeeftijd_basis[0];
                                    }
                                    if (data.team_data.team_leeftijd.thuisLeeftijd_bank) {
                                        team_data.thuis.team_leeftijd.leeftijd_bank = data.team_data.team_leeftijd.thuisLeeftijd_bank[0];
                                    }
                                    if (data.team_data.team_leeftijd.uitLeeftijd_basis) {
                                        team_data.uit.team_leeftijd.leeftijd_basis = data.team_data.team_leeftijd.uitLeeftijd_basis[0];
                                    }
                                    if (data.team_data.team_leeftijd.uitLeeftijd_bank) {
                                        team_data.uit.team_leeftijd.leeftijd_bank = data.team_data.team_leeftijd.uitLeeftijd_bank[0];
                                    }
                                }
                            } else {
                                team_data.thuis.balbezit = Number_converter(data.wedstrijd_data.balbezit.hele_wedstrijd[0][items.thuisTeamID]);
                                team_data.uit.balbezit = Number_converter(data.wedstrijd_data.balbezit.hele_wedstrijd[0][items.uitTeamID]);
                                team_data.thuis.geel = Number_converter(data.wedstrijd_data.overzicht_wedstrijdstatistieken[6][' ']);
                                team_data.uit.geel = Number_converter(data.wedstrijd_data.overzicht_wedstrijdstatistieken[6][' .2']);
                                team_data.thuis.rood = Number_converter(data.wedstrijd_data.overzicht_wedstrijdstatistieken[7][' ']);
                                team_data.uit.rood = Number_converter(data.wedstrijd_data.overzicht_wedstrijdstatistieken[7][' .2']);
                            }

                            // here we need an if statement for the correct season chosing
                            if (items.matchID >= 1203 && items.matchID <= 1582) {
                                items.seizoen = "2013-2014";
                                match_short.seizoen = "2013-2014";
                            } else if ((items.matchID >= 6495 && items.matchID <= 6502) || (items.matchID >= 6507 && items.matchID <= 6510) || (items.matchID >= 6515 && items.matchID <= 6518)) {
                                items.seizoen = "2013-2014 Play-offs";
                                match_short.seizoen = "2013-2014 Play-offs";

                                if (items.matchID >= 6507 && items.matchID <= 6510) {
                                    match_short.match_info.ronde = Number_converter(match_short.match_info.ronde) + 2;
                                    items.ronde = match_short.match_info.ronde;
                                    team_data.thuis.ronde = Number_converter(match_short.match_info.ronde);
                                    team_data.uit.ronde = Number_converter(match_short.match_info.ronde);
                                }
                                if (items.matchID >= 6515 && items.matchID <= 6518) {
                                    match_short.match_info.ronde = Number_converter(match_short.match_info.ronde) + 4;
                                    items.ronde = match_short.match_info.ronde;
                                    team_data.thuis.ronde = Number_converter(match_short.match_info.ronde);
                                    team_data.uit.ronde = Number_converter(match_short.match_info.ronde);
                                }
                            } else if (items.matchID >= 7288 && items.matchID <= 7667) {
                                items.seizoen = "2014-2015";
                                match_short.seizoen = "2014-2015";
                            } else if ((items.matchID >= 16377 && items.matchID <= 16380) || (items.matchID >= 16429 && items.matchID <= 16436) || (items.matchID >= 16451 && items.matchID <= 16454)) {
                                items.seizoen = "2014-2015 Play-offs";
                                match_short.seizoen = "2014-2015 Play-offs";

                                if (items.matchID >= 16429 && items.matchID <= 16436) {
                                    match_short.match_info.ronde = Number_converter(match_short.match_info.ronde) + 2;
                                    items.ronde = match_short.match_info.ronde;
                                    team_data.thuis.ronde = Number_converter(match_short.match_info.ronde);
                                    team_data.uit.ronde = Number_converter(match_short.match_info.ronde);
                                }
                                if (items.matchID >= 16451 && items.matchID <= 16454) {
                                    match_short.match_info.ronde = Number_converter(match_short.match_info.ronde) + 4;
                                    items.ronde = match_short.match_info.ronde;
                                    team_data.thuis.ronde = Number_converter(match_short.match_info.ronde);
                                    team_data.uit.ronde = Number_converter(match_short.match_info.ronde);

                                }
                            } else if (items.matchID >= 17009 && items.matchID <= 17350) {
                                items.seizoen = "2015-2016";
                                match_short.seizoen = "2015-2016";
                            } else {
                                items.seizoen = "2015-2016 Play-offs";
                                match_short.seizoen = "2015-2016 Play-offs";
                            }

                            // INFO:
                            // seizoen 1314: 1203 - 1582
                            // seizoen 1314 PO: 6495-6502, 6507-6510, 6515-6518.
                            // seizoen 1415: 7288-7667
                            // seizoen 1415 PO: 16377-16380, 16429-16436, 16451-16454
                            // seizoen 1516: 17009-17350
                            // Alle intervallen zijn inclusief de linker- en rechterwaarde.

                            // for now this is correct later maybe need a if statement to choose correct division
                            items.divisie = "Jupiler League";
                            match_short.divisie = "Jupiler League";

                            items.overzicht_lineup = data.wedstrijd_data.overzicht_lineup;

                            items.opstelling = {};
                            items.opstelling.thuis = data.wedstrijd_data.opstelling.thuis;
                            items.opstelling.thuis_formatie = data.wedstrijd_data.opstelling.thuis_formatie[0];
                            items.opstelling.uit = data.wedstrijd_data.opstelling.uit;
                            items.opstelling.uit_formatie = data.wedstrijd_data.opstelling.uit_formatie[0];
                            forEach(items.opstelling.thuis, function (value, key) {
                                if (!value.spelerPhoto) {
                                    if (_.where(speler_profiel_thuis, {spelerID: value.personID})) {
                                        forEach(_.where(speler_profiel_thuis, {spelerID: value.personID}), function (value1, key1) {
                                            if (value1.spelerPhoto) {
                                                value.spelerPhoto = value1.spelerPhoto;
                                            }
                                        });
                                    }
                                }
                            });
                            forEach(items.opstelling.uit, function (value, key) {
                                if (!value.spelerPhoto) {
                                    if (_.where(speler_profiel_uit, {spelerID: value.personID})) {
                                        forEach(_.where(speler_profiel_uit, {spelerID: value.personID}), function (value1, key1) {
                                            if (value1.spelerPhoto) {
                                                value.spelerPhoto = value1.spelerPhoto;
                                            }
                                        });
                                    }
                                }
                            });

                            items.overzicht_wedstrijd = {};
                            items.overzicht_wedstrijd.overzicht = [];
                            items.overzicht_wedstrijd.overzicht_eerste_helft = [];
                            items.overzicht_wedstrijd.overzicht_tweede_helft = [];
                            items.overzicht_wedstrijd.overzicht_eerste_helft_verlenging = [];
                            items.overzicht_wedstrijd.overzicht_tweede_helft_verlenging = [];
                            forEach(data.wedstrijd_data.overzicht_wedstrijd.overzicht, function (value, key) {
                                var temp = {};
                                temp.V1 = value[' '];
                                temp.V2 = value[' .1'];
                                temp.V3 = value[' .2'];
                                temp.V4 = value[' .3'];
                                temp.V5 = value[' .4'];
                                items.overzicht_wedstrijd.overzicht.push(temp);
                            });
                            items.overzicht_wedstrijd.overzicht.splice(0, 1);
                            forEach(data.wedstrijd_data.overzicht_wedstrijd.overzicht_eerste_helft, function (value, key) {
                                var temp = {};
                                temp.V1 = value[' '];
                                temp.V2 = value[' .1'];
                                temp.V3 = value[' .2'];
                                temp.V4 = value[' .3'];
                                temp.V5 = value[' .4'];
                                items.overzicht_wedstrijd.overzicht_eerste_helft.push(temp);
                            });
                            items.overzicht_wedstrijd.overzicht_eerste_helft.splice(0, 1);
                            forEach(data.wedstrijd_data.overzicht_wedstrijd.overzicht_tweede_helft, function (value, key) {
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
                                if (data.wedstrijd_data.overzicht_wedstrijd.overzicht_eerste_helft_verlenging.length > 0) {
                                    items.overzicht_wedstrijd.overzicht_eerste_helft_verlenging = [];
                                    forEach(data.wedstrijd_data.overzicht_wedstrijd.overzicht_eerste_helft_verlenging, function (value, key) {
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
                            }
                            if (data.wedstrijd_data.overzicht_wedstrijd.overzicht_tweede_helft_verlenging) {
                                if (data.wedstrijd_data.overzicht_wedstrijd.overzicht_tweede_helft_verlenging.length > 0) {
                                    items.overzicht_wedstrijd.overzicht_tweede_helft_verlenging = [];
                                    forEach(data.wedstrijd_data.overzicht_wedstrijd.overzicht_tweede_helft_verlenging, function (value, key) {
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
                            }

                            items.overzicht_wedstrijdstatistieken = [];
                            _.each(data.wedstrijd_data.overzicht_wedstrijdstatistieken, function (value, key) {
                                var temp = {};
                                temp.V1 = value[' '];
                                temp.V2 = value[' .1'];
                                temp.V3 = value[' .2'];
                                items.overzicht_wedstrijdstatistieken.push(temp);
                            });

                            items.balbezit = {};
                            items.balbezit.thuis = {};
                            items.balbezit.uit = {};
                            if (data.wedstrijd_data.balbezit.hele_wedstrijd) {
                                items.balbezit.thuis.hele_wedstrijd = data.wedstrijd_data.balbezit.hele_wedstrijd[0][items.thuisTeamID];
                                items.balbezit.uit.hele_wedstrijd = data.wedstrijd_data.balbezit.hele_wedstrijd[0][items.uitTeamID];
                            }
                            if (data.wedstrijd_data.balbezit.helft_1) {
                                items.balbezit.thuis.helft_1 = data.wedstrijd_data.balbezit.helft_1[0][items.thuisTeamID];
                                items.balbezit.uit.helft_1 = data.wedstrijd_data.balbezit.helft_1[0][items.uitTeamID];
                            }
                            if (data.wedstrijd_data.balbezit.helft_2) {
                                items.balbezit.thuis.helft_2 = data.wedstrijd_data.balbezit.helft_2[0][items.thuisTeamID];
                                items.balbezit.uit.helft_2 = data.wedstrijd_data.balbezit.helft_2[0][items.uitTeamID];
                            }
                            if (data.wedstrijd_data.balbezit.kwartier_1) {
                                items.balbezit.thuis.kwartier_1 = data.wedstrijd_data.balbezit.kwartier_1[0][items.thuisTeamID];
                                items.balbezit.uit.kwartier_1 = data.wedstrijd_data.balbezit.kwartier_1[0][items.uitTeamID];
                            }
                            if (data.wedstrijd_data.balbezit.kwartier_2) {
                                items.balbezit.thuis.kwartier_2 = data.wedstrijd_data.balbezit.kwartier_2[0][items.thuisTeamID];
                                items.balbezit.uit.kwartier_2 = data.wedstrijd_data.balbezit.kwartier_2[0][items.uitTeamID];
                            }
                            if (data.wedstrijd_data.balbezit.kwartier_3) {
                                items.balbezit.thuis.kwartier_3 = data.wedstrijd_data.balbezit.kwartier_3[0][items.thuisTeamID];
                                items.balbezit.uit.kwartier_3 = data.wedstrijd_data.balbezit.kwartier_3[0][items.uitTeamID];
                            }
                            if (data.wedstrijd_data.balbezit.kwartier_4) {
                                items.balbezit.thuis.kwartier_4 = data.wedstrijd_data.balbezit.kwartier_4[0][items.thuisTeamID];
                                items.balbezit.uit.kwartier_4 = data.wedstrijd_data.balbezit.kwartier_4[0][items.uitTeamID];
                            }
                            if (data.wedstrijd_data.balbezit.kwartier_5) {
                                items.balbezit.thuis.kwartier_5 = data.wedstrijd_data.balbezit.kwartier_5[0][items.thuisTeamID];
                                items.balbezit.uit.kwartier_5 = data.wedstrijd_data.balbezit.kwartier_5[0][items.uitTeamID];
                            }
                            if (data.wedstrijd_data.balbezit.kwartier_6) {
                                items.balbezit.thuis.kwartier_6 = data.wedstrijd_data.balbezit.kwartier_6[0][items.thuisTeamID];
                                items.balbezit.uit.kwartier_6 = data.wedstrijd_data.balbezit.kwartier_6[0][items.uitTeamID];
                            }

                            items.overzicht_doelpogingen = [];
                            _.each(data.wedstrijd_data.overzicht_doelpogingen, function (value, key) {
                                var temp = {};
                                temp.V1 = value[' '];
                                temp.V2 = value[' .1'];
                                temp.V3 = value[' .2'];
                                items.overzicht_doelpogingen.push(temp);
                            });

                            items.duel_overzicht = [];
                            _.each(data.wedstrijd_data.duel_overzicht, function (value, key) {
                                var temp = {};
                                temp.V1 = value[match_short.match_info.thuis];
                                temp.V2 = value[' '];
                                temp.V3 = value[match_short.match_info.uit];
                                items.duel_overzicht.push(temp);
                            });

                            items.overtredingen = [];
                            _.each(data.wedstrijd_data.overtredingen, function (value, key) {
                                var temp = {};
                                temp.V1 = String(value[items.thuisTeamID]);
                                temp.V2 = value.NA;
                                temp.V3 = String(value[items.uitTeamID]);
                                items.overtredingen.push(temp);
                            });

                            items.spelhervattingen = [];
                            _.each(data.wedstrijd_data.spelhervattingen, function (value, key) {
                                var temp = {};
                                temp.V1 = value[items.thuisTeamID];
                                temp.V2 = value.NA;
                                temp.V3 = value[items.uitTeamID];
                                items.spelhervattingen.push(temp);
                            });

                            items.passes = [];
                            _.each(data.wedstrijd_data.passes, function (value, key) {
                                var temp = {};
                                temp.V1 = value[items.thuisTeamID];
                                temp.V2 = value.NA;
                                temp.V3 = value[items.uitTeamID];
                                items.passes.push(temp);
                            });

                            items.spelers_thuisteam = [];
                            items.spelers_uitteam = [];
                            items.alle_spelers = data.wedstrijd_data.alle_spelers;

                            _.each(data.wedstrijd_data.spelers_thuisteam, function (value, key) {
                                if (items.spelers_thuisteam.indexOf(value) < 0) {
                                    _.each(items.alle_spelers, function (value1, key1) {
                                        if (value.personID == value1.personID) {
                                            value.spelerGeboortedatum = value1.geboorteDatum;
                                            value.spelerNationaliteit = value1.nationaliteit;
                                        }
                                    });
                                    items.spelers_thuisteam.push(value);
                                }
                            });
                            _.each(data.wedstrijd_data.spelers_uitteam, function (value, key) {
                                if (items.spelers_uitteam.indexOf(value) < 0) {
                                    _.each(items.alle_spelers, function (value1, key1) {
                                        if (value.personID == value1.personID) {
                                            value.spelerGeboortedatum = value1.geboorteDatum;
                                            value.spelerNationaliteit = value1.nationaliteit;
                                        }
                                    });
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
                                        value.spelerNaam = (data.wedstrijd_data.overzicht_lineup[k1].V2).split(" (")[0];
                                        value.rugnummer = data.wedstrijd_data.overzicht_lineup[k1].V1;
                                        if ((data.wedstrijd_data.overzicht_lineup[k1].V2).split(" (+", 2)[1]) {
                                            value.ingevallen = true;
                                        }
                                        if ((data.wedstrijd_data.overzicht_lineup[k1].V2).split(" (-", 2)[1]) {
                                            value.vervangen = true;
                                        }

                                        if (_.where(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]) {
                                            value.personID = (_.where(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]).personID;
                                            value.spelerGeboortedatum = (_.where(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]).spelerGeboortedatum;
                                            value.spelerNationaliteit = (_.where(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]).spelerNationaliteit;

                                            if (_.where(speler_profiel_thuis, {spelerID: value.personID})) {
                                                forEach(_.where(speler_profiel_thuis, {spelerID: value.personID}), function (value1, key1) {
                                                    if (value1.spelerPhoto) {
                                                        value.spelerPhoto = value1.spelerPhoto;
                                                    }
                                                });
                                            } else {
                                                var ingevallen = 0;
                                                var vervangen = 0;
                                                if (value.ingevallen) ingevallen = 1;
                                                if (value.vervangen) vervangen = 1;

                                                Spelers.create({
                                                    spelerID: Number_converter(value.personID),
                                                    spelerNaam: value.spelerNaam,
                                                    spelerGeboorteland: value.spelerNationaliteit,
                                                    spelerGeboortedatum: value.spelerGeboortedatum,
                                                    spelerRugnummer: Number_converter(value.rugnummer),
                                                    seizoen: 'Seizoen ' + items.seizoen,
                                                    clubNaam: match_short.match_info.thuis,
                                                    clubID: items.thuisTeamID,
                                                    wedstrijden: 1,
                                                    ingevallen: ingevallen,
                                                    vervangen: vervangen,
                                                    date_edited: datetime
                                                }, function (err, data) {
                                                });
                                            }
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
                                        value.spelerNaam = (data.wedstrijd_data.overzicht_lineup[k1 + 1].V2).split(" (")[0];
                                        value.rugnummer = data.wedstrijd_data.overzicht_lineup[k1 + 1].V1;
                                        if ((data.wedstrijd_data.overzicht_lineup[k1 + 1].V2).split(" (+", 2)[1]) {
                                            value.ingevallen = true;
                                        }
                                        if ((data.wedstrijd_data.overzicht_lineup[k1 + 1].V2).split(" (-", 2)[1]) {
                                            value.vervangen = true;
                                        }

                                        if (_.where(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]) {
                                            value.personID = (_.where(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]).personID;
                                            value.spelerGeboortedatum = (_.where(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]).spelerGeboortedatum;
                                            value.spelerNationaliteit = (_.where(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]).spelerNationaliteit;

                                            if (_.where(speler_profiel_thuis, {spelerID: value.personID})) {
                                                forEach(_.where(speler_profiel_thuis, {spelerID: value.personID}), function (value1, key1) {
                                                    if (value1.spelerPhoto) {
                                                        value.spelerPhoto = value1.spelerPhoto;
                                                    }
                                                });
                                            } else {
                                                var ingevallen = 0;
                                                var vervangen = 0;
                                                if (value.ingevallen) ingevallen = 1;
                                                if (value.vervangen) vervangen = 1;

                                                Spelers.create({
                                                    spelerID: Number_converter(value.personID),
                                                    spelerNaam: value.spelerNaam,
                                                    spelerGeboorteland: value.spelerNationaliteit,
                                                    spelerGeboortedatum: value.spelerGeboortedatum,
                                                    spelerRugnummer: Number_converter(value.rugnummer),
                                                    seizoen: 'Seizoen ' + items.seizoen,
                                                    clubNaam: match_short.match_info.thuis,
                                                    clubID: items.thuisTeamID,
                                                    wedstrijden: 1,
                                                    ingevallen: ingevallen,
                                                    vervangen: vervangen,
                                                    date_edited: datetime
                                                }, function (err, data) {
                                                });
                                            }
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
                                        value.spelerNaam = (data.wedstrijd_data.overzicht_lineup[k1 + 2].V2).split(" (")[0];
                                        value.rugnummer = data.wedstrijd_data.overzicht_lineup[k1 + 2].V1;
                                        if ((data.wedstrijd_data.overzicht_lineup[k1 + 2].V2).split(" (+", 2)[1]) {
                                            value.ingevallen = true;
                                        }
                                        if ((data.wedstrijd_data.overzicht_lineup[k1 + 2].V2).split(" (-", 2)[1]) {
                                            value.vervangen = true;
                                        }

                                        if (_.where(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]) {
                                            value.personID = (_.where(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]).personID;
                                            value.spelerGeboortedatum = (_.where(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]).spelerGeboortedatum;
                                            value.spelerNationaliteit = (_.where(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]).spelerNationaliteit;

                                            if (_.where(speler_profiel_thuis, {spelerID: value.personID})) {
                                                forEach(_.where(speler_profiel_thuis, {spelerID: value.personID}), function (value1, key1) {
                                                    if (value1.spelerPhoto) {
                                                        value.spelerPhoto = value1.spelerPhoto;
                                                    }
                                                });
                                            } else {
                                                var ingevallen = 0;
                                                var vervangen = 0;
                                                if (value.ingevallen) ingevallen = 1;
                                                if (value.vervangen) vervangen = 1;

                                                Spelers.create({
                                                    spelerID: Number_converter(value.personID),
                                                    spelerNaam: value.spelerNaam,
                                                    spelerGeboorteland: value.spelerNationaliteit,
                                                    spelerGeboortedatum: value.spelerGeboortedatum,
                                                    spelerRugnummer: Number_converter(value.rugnummer),
                                                    seizoen: 'Seizoen ' + items.seizoen,
                                                    clubNaam: match_short.match_info.thuis,
                                                    clubID: items.thuisTeamID,
                                                    wedstrijden: 1,
                                                    ingevallen: ingevallen,
                                                    vervangen: vervangen,
                                                    date_edited: datetime
                                                }, function (err, data) {
                                                });
                                            }
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
                                        value.spelerNaam = (data.wedstrijd_data.overzicht_lineup[k1 + 3].V2).split(" (")[0];
                                        value.rugnummer = data.wedstrijd_data.overzicht_lineup[k1 + 3].V1;
                                        if ((data.wedstrijd_data.overzicht_lineup[k1 + 3].V2).split(" (+", 2)[1]) {
                                            value.ingevallen = true;
                                        }
                                        if ((data.wedstrijd_data.overzicht_lineup[k1 + 3].V2).split(" (-", 2)[1]) {
                                            value.vervangen = true;
                                        }

                                        if (_.where(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]) {
                                            value.personID = (_.where(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]).personID;
                                            value.spelerGeboortedatum = (_.where(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]).spelerGeboortedatum;
                                            value.spelerNationaliteit = (_.where(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]).spelerNationaliteit;

                                            if (_.where(speler_profiel_thuis, {spelerID: value.personID})) {
                                                forEach(_.where(speler_profiel_thuis, {spelerID: value.personID}), function (value1, key1) {
                                                    if (value1.spelerPhoto) {
                                                        value.spelerPhoto = value1.spelerPhoto;
                                                    }
                                                });
                                            } else {
                                                var ingevallen = 0;
                                                var vervangen = 0;
                                                if (value.ingevallen) ingevallen = 1;
                                                if (value.vervangen) vervangen = 1;

                                                Spelers.create({
                                                    spelerID: Number_converter(value.personID),
                                                    spelerNaam: value.spelerNaam,
                                                    spelerGeboorteland: value.spelerNationaliteit,
                                                    spelerGeboortedatum: value.spelerGeboortedatum,
                                                    spelerRugnummer: Number_converter(value.rugnummer),
                                                    seizoen: 'Seizoen ' + items.seizoen,
                                                    clubNaam: match_short.match_info.thuis,
                                                    clubID: items.thuisTeamID,
                                                    wedstrijden: 1,
                                                    ingevallen: ingevallen,
                                                    vervangen: vervangen,
                                                    date_edited: datetime
                                                }, function (err, data) {
                                                });
                                            }
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
                                        value.spelerNaam = (data.wedstrijd_data.overzicht_lineup[k1 + 4].V2).split(" (")[0];
                                        value.rugnummer = data.wedstrijd_data.overzicht_lineup[k1 + 4].V1;
                                        if ((data.wedstrijd_data.overzicht_lineup[k1 + 4].V2).split(" (+", 2)[1]) {
                                            value.ingevallen = true;
                                        }
                                        if ((data.wedstrijd_data.overzicht_lineup[k1 + 4].V2).split(" (-", 2)[1]) {
                                            value.vervangen = true;
                                        }

                                        if (_.where(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]) {
                                            value.personID = (_.where(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]).personID;
                                            value.spelerGeboortedatum = (_.where(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]).spelerGeboortedatum;
                                            value.spelerNationaliteit = (_.where(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]).spelerNationaliteit;

                                            if (_.where(speler_profiel_thuis, {spelerID: value.personID})) {
                                                forEach(_.where(speler_profiel_thuis, {spelerID: value.personID}), function (value1, key1) {
                                                    if (value1.spelerPhoto) {
                                                        value.spelerPhoto = value1.spelerPhoto;
                                                    }
                                                });
                                            } else {
                                                var ingevallen = 0;
                                                var vervangen = 0;
                                                if (value.ingevallen) ingevallen = 1;
                                                if (value.vervangen) vervangen = 1;

                                                Spelers.create({
                                                    spelerID: Number_converter(value.personID),
                                                    spelerNaam: value.spelerNaam,
                                                    spelerGeboorteland: value.spelerNationaliteit,
                                                    spelerGeboortedatum: value.spelerGeboortedatum,
                                                    spelerRugnummer: Number_converter(value.rugnummer),
                                                    seizoen: 'Seizoen ' + items.seizoen,
                                                    clubNaam: match_short.match_info.thuis,
                                                    clubID: items.thuisTeamID,
                                                    wedstrijden: 1,
                                                    ingevallen: ingevallen,
                                                    vervangen: vervangen,
                                                    date_edited: datetime
                                                }, function (err, data) {
                                                });
                                            }
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
                                        value.spelerNaam = (data.wedstrijd_data.overzicht_lineup[k1 + 5].V2).split(" (")[0];
                                        value.rugnummer = data.wedstrijd_data.overzicht_lineup[k1 + 5].V1;
                                        if ((data.wedstrijd_data.overzicht_lineup[k1 + 5].V2).split(" (+", 2)[1]) {
                                            value.ingevallen = true;
                                        }
                                        if ((data.wedstrijd_data.overzicht_lineup[k1 + 5].V2).split(" (-", 2)[1]) {
                                            value.vervangen = true;
                                        }

                                        if (_.where(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]) {
                                            value.personID = (_.where(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]).personID;
                                            value.spelerGeboortedatum = (_.where(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]).spelerGeboortedatum;
                                            value.spelerNationaliteit = (_.where(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]).spelerNationaliteit;

                                            if (_.where(speler_profiel_thuis, {spelerID: value.personID})) {
                                                forEach(_.where(speler_profiel_thuis, {spelerID: value.personID}), function (value1, key1) {
                                                    if (value1.spelerPhoto) {
                                                        value.spelerPhoto = value1.spelerPhoto;
                                                    }
                                                });
                                            } else {
                                                var ingevallen = 0;
                                                var vervangen = 0;
                                                if (value.ingevallen) ingevallen = 1;
                                                if (value.vervangen) vervangen = 1;

                                                Spelers.create({
                                                    spelerID: Number_converter(value.personID),
                                                    spelerNaam: value.spelerNaam,
                                                    spelerGeboorteland: value.spelerNationaliteit,
                                                    spelerGeboortedatum: value.spelerGeboortedatum,
                                                    spelerRugnummer: Number_converter(value.rugnummer),
                                                    seizoen: 'Seizoen ' + items.seizoen,
                                                    clubNaam: match_short.match_info.thuis,
                                                    clubID: items.thuisTeamID,
                                                    wedstrijden: 1,
                                                    ingevallen: ingevallen,
                                                    vervangen: vervangen,
                                                    date_edited: datetime
                                                }, function (err, data) {
                                                });
                                            }
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
                                        value.spelerNaam = (data.wedstrijd_data.overzicht_lineup[k1 + 6].V2).split(" (")[0];
                                        value.rugnummer = data.wedstrijd_data.overzicht_lineup[k1 + 6].V1;
                                        if ((data.wedstrijd_data.overzicht_lineup[k1 + 6].V2).split(" (+", 2)[1]) {
                                            value.ingevallen = true;
                                        }
                                        if ((data.wedstrijd_data.overzicht_lineup[k1 + 6].V2).split(" (-", 2)[1]) {
                                            value.vervangen = true;
                                        }

                                        if (_.where(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]) {
                                            value.personID = (_.where(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]).personID;
                                            value.spelerGeboortedatum = (_.where(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]).spelerGeboortedatum;
                                            value.spelerNationaliteit = (_.where(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]).spelerNationaliteit;

                                            if (_.where(speler_profiel_thuis, {spelerID: value.personID})) {
                                                forEach(_.where(speler_profiel_thuis, {spelerID: value.personID}), function (value1, key1) {
                                                    if (value1.spelerPhoto) {
                                                        value.spelerPhoto = value1.spelerPhoto;
                                                    }
                                                });
                                            } else {
                                                var ingevallen = 0;
                                                var vervangen = 0;
                                                if (value.ingevallen) ingevallen = 1;
                                                if (value.vervangen) vervangen = 1;

                                                Spelers.create({
                                                    spelerID: Number_converter(value.personID),
                                                    spelerNaam: value.spelerNaam,
                                                    spelerGeboorteland: value.spelerNationaliteit,
                                                    spelerGeboortedatum: value.spelerGeboortedatum,
                                                    spelerRugnummer: Number_converter(value.rugnummer),
                                                    seizoen: 'Seizoen ' + items.seizoen,
                                                    clubNaam: match_short.match_info.thuis,
                                                    clubID: items.thuisTeamID,
                                                    wedstrijden: 1,
                                                    ingevallen: ingevallen,
                                                    vervangen: vervangen,
                                                    date_edited: datetime
                                                }, function (err, data) {
                                                });
                                            }
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
                                var value_uit = {};
                                if (data.wedstrijd_data.overzicht_lineup[k1].V3 !== ' ') {
                                    if (data.wedstrijd_data.overzicht_lineup[k1 - 1].V4 !== 'BANK') {
                                        value_uit = {};
                                        value_uit.spelerNaam = (data.wedstrijd_data.overzicht_lineup[k1].V4).split(" (")[0];
                                        value_uit.rugnummer = data.wedstrijd_data.overzicht_lineup[k1].V3;
                                        if ((data.wedstrijd_data.overzicht_lineup[k1].V4).split(" (+", 2)[1]) {
                                            value_uit.ingevallen = true;
                                        }
                                        if ((data.wedstrijd_data.overzicht_lineup[k1].V4).split(" (-", 2)[1]) {
                                            value_uit.vervangen = true;
                                        }

                                        if (_.where(items.spelers_uitteam, {spelerNaam: value_uit.spelerNaam})[0]) {
                                            value_uit.personID = (_.where(items.spelers_uitteam, {spelerNaam: value_uit.spelerNaam})[0]).personID;
                                            value_uit.spelerGeboortedatum = (_.where(items.spelers_uitteam, {spelerNaam: value_uit.spelerNaam})[0]).spelerGeboortedatum;
                                            value_uit.spelerNationaliteit = (_.where(items.spelers_uitteam, {spelerNaam: value_uit.spelerNaam})[0]).spelerNationaliteit;

                                            if (_.where(speler_profiel_uit, {spelerID: value_uit.personID})) {
                                                forEach(_.where(speler_profiel_uit, {spelerID: value_uit.personID}), function (value1, key1) {
                                                    if (value1.spelerPhoto) {
                                                        value_uit.spelerPhoto = value1.spelerPhoto;
                                                    }
                                                });
                                            } else {
                                                var ingevallen_uit = 0;
                                                var vervangen_uit = 0;
                                                if (value_uit.ingevallen) ingevallen_uit = 1;
                                                if (value_uit.vervangen) vervangen_uit = 1;

                                                Spelers.create({
                                                    spelerID: Number_converter(value_uit.personID),
                                                    spelerNaam: value_uit.spelerNaam,
                                                    spelerGeboorteland: value_uit.spelerNationaliteit,
                                                    spelerGeboortedatum: value_uit.spelerGeboortedatum,
                                                    spelerRugnummer: Number_converter(value_uit.rugnummer),
                                                    seizoen: 'Seizoen ' + items.seizoen,
                                                    clubNaam: match_short.match_info.thuis,
                                                    clubID: items.thuisTeamID,
                                                    wedstrijden: 1,
                                                    ingevallen: ingevallen_uit,
                                                    vervangen: vervangen_uit,
                                                    date_edited: datetime
                                                }, function (err, data) {
                                                });
                                            }
                                        }
                                        items.spelersuitteam.push(value_uit);
                                        k1++;
                                    } else {
                                        break;
                                    }
                                }
                                else if (data.wedstrijd_data.overzicht_lineup[k1 + 1].V3 !== ' ') {
                                    if (data.wedstrijd_data.overzicht_lineup[k1].V4 !== 'BANK') {
                                        value_uit = {};
                                        value_uit.spelerNaam = (data.wedstrijd_data.overzicht_lineup[k1 + 1].V4).split(" (")[0];
                                        value_uit.rugnummer = data.wedstrijd_data.overzicht_lineup[k1 + 1].V3;
                                        if ((data.wedstrijd_data.overzicht_lineup[k1 + 1].V4).split(" (+", 2)[1]) {
                                            value_uit.ingevallen = true;
                                        }
                                        if ((data.wedstrijd_data.overzicht_lineup[k1 + 1].V4).split(" (-", 2)[1]) {
                                            value_uit.vervangen = true;
                                        }

                                        if (_.where(items.spelers_uitteam, {spelerNaam: value_uit.spelerNaam})[0]) {
                                            value_uit.personID = (_.where(items.spelers_uitteam, {spelerNaam: value_uit.spelerNaam})[0]).personID;
                                            value_uit.spelerGeboortedatum = (_.where(items.spelers_uitteam, {spelerNaam: value_uit.spelerNaam})[0]).spelerGeboortedatum;
                                            value_uit.spelerNationaliteit = (_.where(items.spelers_uitteam, {spelerNaam: value_uit.spelerNaam})[0]).spelerNationaliteit;

                                            if (_.where(speler_profiel_uit, {spelerID: value_uit.personID})) {
                                                forEach(_.where(speler_profiel_uit, {spelerID: value_uit.personID}), function (value1, key1) {
                                                    if (value1.spelerPhoto) {
                                                        value_uit.spelerPhoto = value1.spelerPhoto;
                                                    }
                                                });
                                            } else {
                                                var ingevallen_uit = 0;
                                                var vervangen_uit = 0;
                                                if (value_uit.ingevallen) ingevallen_uit = 1;
                                                if (value_uit.vervangen) vervangen_uit = 1;

                                                Spelers.create({
                                                    spelerID: Number_converter(value_uit.personID),
                                                    spelerNaam: value_uit.spelerNaam,
                                                    spelerGeboorteland: value_uit.spelerNationaliteit,
                                                    spelerGeboortedatum: value_uit.spelerGeboortedatum,
                                                    spelerRugnummer: Number_converter(value_uit.rugnummer),
                                                    seizoen: 'Seizoen ' + items.seizoen,
                                                    clubNaam: match_short.match_info.thuis,
                                                    clubID: items.thuisTeamID,
                                                    wedstrijden: 1,
                                                    ingevallen: ingevallen_uit,
                                                    vervangen: vervangen_uit,
                                                    date_edited: datetime
                                                }, function (err, data) {
                                                });
                                            }
                                        }
                                        items.spelersuitteam.push(value_uit);
                                        k1 += 2;
                                    } else {
                                        break;
                                    }
                                }
                                else if (data.wedstrijd_data.overzicht_lineup[k1 + 2].V3 !== ' ') {
                                    if (data.wedstrijd_data.overzicht_lineup[k1 + 1].V4 !== 'BANK') {
                                        value_uit = {};
                                        value_uit.spelerNaam = (data.wedstrijd_data.overzicht_lineup[k1 + 2].V4).split(" (")[0];
                                        value_uit.rugnummer = data.wedstrijd_data.overzicht_lineup[k1 + 2].V3;
                                        if ((data.wedstrijd_data.overzicht_lineup[k1 + 2].V4).split(" (+", 2)[1]) {
                                            value_uit.ingevallen = true;
                                        }
                                        if ((data.wedstrijd_data.overzicht_lineup[k1 + 2].V4).split(" (-", 2)[1]) {
                                            value_uit.vervangen = true;
                                        }

                                        if (_.where(items.spelers_uitteam, {spelerNaam: value_uit.spelerNaam})[0]) {
                                            value_uit.personID = (_.where(items.spelers_uitteam, {spelerNaam: value_uit.spelerNaam})[0]).personID;
                                            value_uit.spelerGeboortedatum = (_.where(items.spelers_uitteam, {spelerNaam: value_uit.spelerNaam})[0]).spelerGeboortedatum;
                                            value_uit.spelerNationaliteit = (_.where(items.spelers_uitteam, {spelerNaam: value_uit.spelerNaam})[0]).spelerNationaliteit;

                                            if (_.where(speler_profiel_uit, {spelerID: value_uit.personID})) {
                                                forEach(_.where(speler_profiel_uit, {spelerID: value_uit.personID}), function (value1, key1) {
                                                    if (value1.spelerPhoto) {
                                                        value_uit.spelerPhoto = value1.spelerPhoto;
                                                    }
                                                });
                                            } else {
                                                var ingevallen_uit = 0;
                                                var vervangen_uit = 0;
                                                if (value_uit.ingevallen) ingevallen_uit = 1;
                                                if (value_uit.vervangen) vervangen_uit = 1;

                                                Spelers.create({
                                                    spelerID: Number_converter(value_uit.personID),
                                                    spelerNaam: value_uit.spelerNaam,
                                                    spelerGeboorteland: value_uit.spelerNationaliteit,
                                                    spelerGeboortedatum: value_uit.spelerGeboortedatum,
                                                    spelerRugnummer: Number_converter(value_uit.rugnummer),
                                                    seizoen: 'Seizoen ' + items.seizoen,
                                                    clubNaam: match_short.match_info.thuis,
                                                    clubID: items.thuisTeamID,
                                                    wedstrijden: 1,
                                                    ingevallen: ingevallen_uit,
                                                    vervangen: vervangen_uit,
                                                    date_edited: datetime
                                                }, function (err, data) {
                                                });
                                            }
                                        }
                                        items.spelersuitteam.push(value_uit);
                                        k1 += 3;
                                    } else {
                                        break;
                                    }
                                }
                                else if (data.wedstrijd_data.overzicht_lineup[k1 + 3].V3 !== ' ') {
                                    if (data.wedstrijd_data.overzicht_lineup[k1 + 2].V4 !== 'BANK') {
                                        value_uit = {};
                                        value_uit.spelerNaam = (data.wedstrijd_data.overzicht_lineup[k1 + 3].V4).split(" (")[0];
                                        value_uit.rugnummer = data.wedstrijd_data.overzicht_lineup[k1 + 3].V3;
                                        if ((data.wedstrijd_data.overzicht_lineup[k1 + 3].V4).split(" (+", 2)[1]) {
                                            value_uit.ingevallen = true;
                                        }
                                        if ((data.wedstrijd_data.overzicht_lineup[k1 + 3].V4).split(" (-", 2)[1]) {
                                            value_uit.vervangen = true;
                                        }

                                        if (_.where(items.spelers_uitteam, {spelerNaam: value_uit.spelerNaam})[0]) {
                                            value_uit.personID = (_.where(items.spelers_uitteam, {spelerNaam: value_uit.spelerNaam})[0]).personID;
                                            value_uit.spelerGeboortedatum = (_.where(items.spelers_uitteam, {spelerNaam: value_uit.spelerNaam})[0]).spelerGeboortedatum;
                                            value_uit.spelerNationaliteit = (_.where(items.spelers_uitteam, {spelerNaam: value_uit.spelerNaam})[0]).spelerNationaliteit;

                                            if (_.where(speler_profiel_uit, {spelerID: value_uit.personID})) {
                                                forEach(_.where(speler_profiel_uit, {spelerID: value_uit.personID}), function (value1, key1) {
                                                    if (value1.spelerPhoto) {
                                                        value_uit.spelerPhoto = value1.spelerPhoto;
                                                    }
                                                });
                                            } else {
                                                var ingevallen_uit = 0;
                                                var vervangen_uit = 0;
                                                if (value_uit.ingevallen) ingevallen_uit = 1;
                                                if (value_uit.vervangen) vervangen_uit = 1;

                                                Spelers.create({
                                                    spelerID: Number_converter(value_uit.personID),
                                                    spelerNaam: value_uit.spelerNaam,
                                                    spelerGeboorteland: value_uit.spelerNationaliteit,
                                                    spelerGeboortedatum: value_uit.spelerGeboortedatum,
                                                    spelerRugnummer: Number_converter(value_uit.rugnummer),
                                                    seizoen: 'Seizoen ' + items.seizoen,
                                                    clubNaam: match_short.match_info.thuis,
                                                    clubID: items.thuisTeamID,
                                                    wedstrijden: 1,
                                                    ingevallen: ingevallen_uit,
                                                    vervangen: vervangen_uit,
                                                    date_edited: datetime
                                                }, function (err, data) {
                                                });
                                            }
                                        }
                                        items.spelersuitteam.push(value_uit);
                                        k1 += 4;
                                    } else {
                                        break;
                                    }
                                }
                                else if (data.wedstrijd_data.overzicht_lineup[k1 + 4].V3 !== ' ') {
                                    if (data.wedstrijd_data.overzicht_lineup[k1 + 3].V4 !== 'BANK') {
                                        value_uit = {};
                                        value_uit.spelerNaam = (data.wedstrijd_data.overzicht_lineup[k1 + 4].V4).split(" (")[0];
                                        value_uit.rugnummer = data.wedstrijd_data.overzicht_lineup[k1 + 4].V3;
                                        if ((data.wedstrijd_data.overzicht_lineup[k1 + 4].V4).split(" (+", 2)[1]) {
                                            value_uit.ingevallen = true;
                                        }
                                        if ((data.wedstrijd_data.overzicht_lineup[k1 + 4].V4).split(" (-", 2)[1]) {
                                            value_uit.vervangen = true;
                                        }

                                        if (_.where(items.spelers_uitteam, {spelerNaam: value_uit.spelerNaam})[0]) {
                                            value_uit.personID = (_.where(items.spelers_uitteam, {spelerNaam: value_uit.spelerNaam})[0]).personID;
                                            value_uit.spelerGeboortedatum = (_.where(items.spelers_uitteam, {spelerNaam: value_uit.spelerNaam})[0]).spelerGeboortedatum;
                                            value_uit.spelerNationaliteit = (_.where(items.spelers_uitteam, {spelerNaam: value_uit.spelerNaam})[0]).spelerNationaliteit;

                                            if (_.where(speler_profiel_uit, {spelerID: value_uit.personID})) {
                                                forEach(_.where(speler_profiel_uit, {spelerID: value_uit.personID}), function (value1, key1) {
                                                    if (value1.spelerPhoto) {
                                                        value_uit.spelerPhoto = value1.spelerPhoto;
                                                    }
                                                });
                                            } else {
                                                var ingevallen_uit = 0;
                                                var vervangen_uit = 0;
                                                if (value_uit.ingevallen) ingevallen_uit = 1;
                                                if (value_uit.vervangen) vervangen_uit = 1;

                                                Spelers.create({
                                                    spelerID: Number_converter(value_uit.personID),
                                                    spelerNaam: value_uit.spelerNaam,
                                                    spelerGeboorteland: value_uit.spelerNationaliteit,
                                                    spelerGeboortedatum: value_uit.spelerGeboortedatum,
                                                    spelerRugnummer: Number_converter(value_uit.rugnummer),
                                                    seizoen: 'Seizoen ' + items.seizoen,
                                                    clubNaam: match_short.match_info.thuis,
                                                    clubID: items.thuisTeamID,
                                                    wedstrijden: 1,
                                                    ingevallen: ingevallen_uit,
                                                    vervangen: vervangen_uit,
                                                    date_edited: datetime
                                                }, function (err, data) {
                                                });
                                            }
                                        }
                                        items.spelersuitteam.push(value_uit);
                                        k1 += 5;
                                    } else {
                                        break;
                                    }
                                }
                                else if (data.wedstrijd_data.overzicht_lineup[k1 + 5].V3 !== ' ') {
                                    if (data.wedstrijd_data.overzicht_lineup[k1 + 4].V4 !== 'BANK') {
                                        value_uit = {};
                                        value_uit.spelerNaam = (data.wedstrijd_data.overzicht_lineup[k1 + 5].V4).split(" (")[0];
                                        value_uit.rugnummer = data.wedstrijd_data.overzicht_lineup[k1 + 5].V3;
                                        if ((data.wedstrijd_data.overzicht_lineup[k1 + 5].V4).split(" (+", 2)[1]) {
                                            value_uit.ingevallen = true;
                                        }
                                        if ((data.wedstrijd_data.overzicht_lineup[k1 + 5].V4).split(" (-", 2)[1]) {
                                            value_uit.vervangen = true;
                                        }

                                        if (_.where(items.spelers_uitteam, {spelerNaam: value_uit.spelerNaam})[0]) {
                                            value_uit.personID = (_.where(items.spelers_uitteam, {spelerNaam: value_uit.spelerNaam})[0]).personID;
                                            value_uit.spelerGeboortedatum = (_.where(items.spelers_uitteam, {spelerNaam: value_uit.spelerNaam})[0]).spelerGeboortedatum;
                                            value_uit.spelerNationaliteit = (_.where(items.spelers_uitteam, {spelerNaam: value_uit.spelerNaam})[0]).spelerNationaliteit;

                                            if (_.where(speler_profiel_uit, {spelerID: value_uit.personID})) {
                                                forEach(_.where(speler_profiel_uit, {spelerID: value_uit.personID}), function (value1, key1) {
                                                    if (value1.spelerPhoto) {
                                                        value_uit.spelerPhoto = value1.spelerPhoto;
                                                    }
                                                });
                                            } else {
                                                var ingevallen_uit = 0;
                                                var vervangen_uit = 0;
                                                if (value_uit.ingevallen) ingevallen_uit = 1;
                                                if (value_uit.vervangen) vervangen_uit = 1;

                                                Spelers.create({
                                                    spelerID: Number_converter(value_uit.personID),
                                                    spelerNaam: value_uit.spelerNaam,
                                                    spelerGeboorteland: value_uit.spelerNationaliteit,
                                                    spelerGeboortedatum: value_uit.spelerGeboortedatum,
                                                    spelerRugnummer: Number_converter(value_uit.rugnummer),
                                                    seizoen: 'Seizoen ' + items.seizoen,
                                                    clubNaam: match_short.match_info.thuis,
                                                    clubID: items.thuisTeamID,
                                                    wedstrijden: 1,
                                                    ingevallen: ingevallen_uit,
                                                    vervangen: vervangen_uit,
                                                    date_edited: datetime
                                                }, function (err, data) {
                                                });
                                            }
                                        }
                                        items.spelersuitteam.push(value_uit);
                                        k1 += 6;
                                    } else {
                                        break;
                                    }
                                }
                                else {
                                    if (data.wedstrijd_data.overzicht_lineup[k1 + 5].V4 !== 'BANK') {
                                        value_uit = {};
                                        value_uit.spelerNaam = (data.wedstrijd_data.overzicht_lineup[k1 + 6].V4).split(" (")[0];
                                        value_uit.rugnummer = data.wedstrijd_data.overzicht_lineup[k1 + 6].V3;
                                        if ((data.wedstrijd_data.overzicht_lineup[k1 + 6].V4).split(" (+", 2)[1]) {
                                            value_uit.ingevallen = true;
                                        }
                                        if ((data.wedstrijd_data.overzicht_lineup[k1 + 6].V4).split(" (-", 2)[1]) {
                                            value_uit.vervangen = true;
                                        }

                                        if (_.where(items.spelers_uitteam, {spelerNaam: value_uit.spelerNaam})[0]) {
                                            value_uit.personID = (_.where(items.spelers_uitteam, {spelerNaam: value_uit.spelerNaam})[0]).personID;
                                            value_uit.spelerGeboortedatum = (_.where(items.spelers_uitteam, {spelerNaam: value_uit.spelerNaam})[0]).spelerGeboortedatum;
                                            value_uit.spelerNationaliteit = (_.where(items.spelers_uitteam, {spelerNaam: value_uit.spelerNaam})[0]).spelerNationaliteit;

                                            if (_.where(speler_profiel_uit, {spelerID: value_uit.personID})) {
                                                forEach(_.where(speler_profiel_uit, {spelerID: value_uit.personID}), function (value1, key1) {
                                                    if (value1.spelerPhoto) {
                                                        value_uit.spelerPhoto = value1.spelerPhoto;
                                                    }
                                                });
                                            } else {
                                                var ingevallen_uit = 0;
                                                var vervangen_uit = 0;
                                                if (value_uit.ingevallen) ingevallen_uit = 1;
                                                if (value_uit.vervangen) vervangen_uit = 1;

                                                Spelers.create({
                                                    spelerID: Number_converter(value_uit.personID),
                                                    spelerNaam: value_uit.spelerNaam,
                                                    spelerGeboorteland: value_uit.spelerNationaliteit,
                                                    spelerGeboortedatum: value_uit.spelerGeboortedatum,
                                                    spelerRugnummer: Number_converter(value_uit.rugnummer),
                                                    seizoen: 'Seizoen ' + items.seizoen,
                                                    clubNaam: match_short.match_info.thuis,
                                                    clubID: items.thuisTeamID,
                                                    wedstrijden: 1,
                                                    ingevallen: ingevallen_uit,
                                                    vervangen: vervangen_uit,
                                                    date_edited: datetime
                                                }, function (err, data) {
                                                });
                                            }
                                        }
                                        items.spelersuitteam.push(value_uit);
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
                            forEach(items.spelersthuisteam, function (value, key) {
                                _.each(data.wedstrijd_data.gemiddelde_posities_helft1, function (value1, key1) {
                                    if (value1.personID[0] === value.personID) {
                                        var temp = {};
                                        temp.personID = value1.personID[0];
                                        temp.spelerNaam = value.spelerNaam;
                                        temp.rugnummer = value.rugnummer;
                                        temp.lengte = value1['gem.lengte'][0];
                                        temp.breedte = value1['gem.breedte'][0];
                                        temp.teamNaam = value1.teamNaam;
                                        items.gemiddelde_posities_helft1.push(temp);
                                    }
                                });
                                _.each(data.wedstrijd_data.gemiddelde_posities_helft2, function (value1, key1) {
                                    if (value1.personID[0] === value.personID) {
                                        var temp = {};
                                        temp.personID = value1.personID[0];
                                        temp.spelerNaam = value.spelerNaam;
                                        temp.rugnummer = value.rugnummer;
                                        temp.lengte = value1['gem.lengte'][0];
                                        temp.breedte = value1['gem.breedte'][0];
                                        temp.teamNaam = value1.teamNaam;
                                        items.gemiddelde_posities_helft2.push(temp);
                                    }
                                });
                                _.each(data.wedstrijd_data.gemiddelde_posities_kwartier1, function (value1, key1) {
                                    if (value1.personID[0] === value.personID) {
                                        var temp = {};
                                        temp.personID = value1.personID[0];
                                        temp.spelerNaam = value.spelerNaam;
                                        temp.rugnummer = value.rugnummer;
                                        temp.lengte = value1['gem.lengte'][0];
                                        temp.breedte = value1['gem.breedte'][0];
                                        temp.teamNaam = value1.teamNaam;
                                        items.gemiddelde_posities_kwartier1.push(temp);
                                    }
                                });
                                _.each(data.wedstrijd_data.gemiddelde_posities_kwartier2, function (value1, key1) {
                                    if (value1.personID[0] === value.personID) {
                                        var temp = {};
                                        temp.personID = value1.personID[0];
                                        temp.spelerNaam = value.spelerNaam;
                                        temp.rugnummer = value.rugnummer;
                                        temp.lengte = value1['gem.lengte'][0];
                                        temp.breedte = value1['gem.breedte'][0];
                                        temp.teamNaam = value1.teamNaam;
                                        items.gemiddelde_posities_kwartier2.push(temp);
                                    }
                                });
                                _.each(data.wedstrijd_data.gemiddelde_posities_kwartier3, function (value1, key1) {
                                    if (value1.personID[0] === value.personID) {
                                        var temp = {};
                                        temp.personID = value1.personID[0];
                                        temp.spelerNaam = value.spelerNaam;
                                        temp.rugnummer = value.rugnummer;
                                        temp.lengte = value1['gem.lengte'][0];
                                        temp.breedte = value1['gem.breedte'][0];
                                        temp.teamNaam = value1.teamNaam;
                                        items.gemiddelde_posities_kwartier3.push(temp);
                                    }
                                });
                                _.each(data.wedstrijd_data.gemiddelde_posities_kwartier4, function (value1, key1) {
                                    if (value1.personID[0] === value.personID) {
                                        var temp = {};
                                        temp.personID = value1.personID[0];
                                        temp.spelerNaam = value.spelerNaam;
                                        temp.rugnummer = value.rugnummer;
                                        temp.lengte = value1['gem.lengte'][0];
                                        temp.breedte = value1['gem.breedte'][0];
                                        temp.teamNaam = value1.teamNaam;
                                        items.gemiddelde_posities_kwartier4.push(temp);
                                    }
                                });
                                _.each(data.wedstrijd_data.gemiddelde_posities_kwartier5, function (value1, key1) {
                                    if (value1.personID[0] === value.personID) {
                                        var temp = {};
                                        temp.personID = value1.personID[0];
                                        temp.spelerNaam = value.spelerNaam;
                                        temp.rugnummer = value.rugnummer;
                                        temp.lengte = value1['gem.lengte'][0];
                                        temp.breedte = value1['gem.breedte'][0];
                                        temp.teamNaam = value1.teamNaam;
                                        items.gemiddelde_posities_kwartier5.push(temp);
                                    }
                                });
                                _.each(data.wedstrijd_data.gemiddelde_posities_kwartier6, function (value1, key1) {
                                    if (value1.personID[0] === value.personID) {
                                        var temp = {};
                                        temp.personID = value1.personID[0];
                                        temp.spelerNaam = value.spelerNaam;
                                        temp.rugnummer = value.rugnummer;
                                        temp.lengte = value1['gem.lengte'][0];
                                        temp.breedte = value1['gem.breedte'][0];
                                        temp.teamNaam = value1.teamNaam;
                                        items.gemiddelde_posities_kwartier6.push(temp);
                                    }
                                });
                            });
                            forEach(items.spelersuitteam, function (value, key) {
                                _.each(data.wedstrijd_data.gemiddelde_posities_helft1, function (value1, key1) {
                                    if (value1.personID[0] === value.personID) {
                                        var temp = {};
                                        temp.personID = value1.personID[0];
                                        temp.spelerNaam = value.spelerNaam;
                                        temp.rugnummer = value.rugnummer;
                                        temp.lengte = value1['gem.lengte'][0];
                                        temp.breedte = value1['gem.breedte'][0];
                                        temp.teamNaam = value1.teamNaam;
                                        items.gemiddelde_posities_helft1.push(temp);
                                    }
                                });
                                _.each(data.wedstrijd_data.gemiddelde_posities_helft2, function (value1, key1) {
                                    if (value1.personID[0] === value.personID) {
                                        var temp = {};
                                        temp.personID = value1.personID[0];
                                        temp.spelerNaam = value.spelerNaam;
                                        temp.rugnummer = value.rugnummer;
                                        temp.lengte = value1['gem.lengte'][0];
                                        temp.breedte = value1['gem.breedte'][0];
                                        temp.teamNaam = value1.teamNaam;
                                        items.gemiddelde_posities_helft2.push(temp);
                                    }
                                });
                                _.each(data.wedstrijd_data.gemiddelde_posities_kwartier1, function (value1, key1) {
                                    if (value1.personID[0] === value.personID) {
                                        var temp = {};
                                        temp.personID = value1.personID[0];
                                        temp.spelerNaam = value.spelerNaam;
                                        temp.rugnummer = value.rugnummer;
                                        temp.lengte = value1['gem.lengte'][0];
                                        temp.breedte = value1['gem.breedte'][0];
                                        temp.teamNaam = value1.teamNaam;
                                        items.gemiddelde_posities_kwartier1.push(temp);
                                    }
                                });
                                _.each(data.wedstrijd_data.gemiddelde_posities_kwartier2, function (value1, key1) {
                                    if (value1.personID[0] === value.personID) {
                                        var temp = {};
                                        temp.personID = value1.personID[0];
                                        temp.spelerNaam = value.spelerNaam;
                                        temp.rugnummer = value.rugnummer;
                                        temp.lengte = value1['gem.lengte'][0];
                                        temp.breedte = value1['gem.breedte'][0];
                                        temp.teamNaam = value1.teamNaam;
                                        items.gemiddelde_posities_kwartier2.push(temp);
                                    }
                                });
                                _.each(data.wedstrijd_data.gemiddelde_posities_kwartier3, function (value1, key1) {
                                    if (value1.personID[0] === value.personID) {
                                        var temp = {};
                                        temp.personID = value1.personID[0];
                                        temp.spelerNaam = value.spelerNaam;
                                        temp.rugnummer = value.rugnummer;
                                        temp.lengte = value1['gem.lengte'][0];
                                        temp.breedte = value1['gem.breedte'][0];
                                        temp.teamNaam = value1.teamNaam;
                                        items.gemiddelde_posities_kwartier3.push(temp);
                                    }
                                });
                                _.each(data.wedstrijd_data.gemiddelde_posities_kwartier4, function (value1, key1) {
                                    if (value1.personID[0] === value.personID) {
                                        var temp = {};
                                        temp.personID = value1.personID[0];
                                        temp.spelerNaam = value.spelerNaam;
                                        temp.rugnummer = value.rugnummer;
                                        temp.lengte = value1['gem.lengte'][0];
                                        temp.breedte = value1['gem.breedte'][0];
                                        temp.teamNaam = value1.teamNaam;
                                        items.gemiddelde_posities_kwartier4.push(temp);
                                    }
                                });
                                _.each(data.wedstrijd_data.gemiddelde_posities_kwartier5, function (value1, key1) {
                                    if (value1.personID[0] === value.personID) {
                                        var temp = {};
                                        temp.personID = value1.personID[0];
                                        temp.spelerNaam = value.spelerNaam;
                                        temp.rugnummer = value.rugnummer;
                                        temp.lengte = value1['gem.lengte'][0];
                                        temp.breedte = value1['gem.breedte'][0];
                                        temp.teamNaam = value1.teamNaam;
                                        items.gemiddelde_posities_kwartier5.push(temp);
                                    }
                                });
                                _.each(data.wedstrijd_data.gemiddelde_posities_kwartier6, function (value1, key1) {
                                    if (value1.personID[0] === value.personID) {
                                        var temp = {};
                                        temp.personID = value1.personID[0];
                                        temp.spelerNaam = value.spelerNaam;
                                        temp.rugnummer = value.rugnummer;
                                        temp.lengte = value1['gem.lengte'][0];
                                        temp.breedte = value1['gem.breedte'][0];
                                        temp.teamNaam = value1.teamNaam;
                                        items.gemiddelde_posities_kwartier6.push(temp);
                                    }
                                });
                            });

                            if (data.team_data) {
                                items.thuis_team_leeftijd = team_data.thuis.team_leeftijd;
                                items.uit_team_leeftijd = team_data.uit.team_leeftijd;

                                items.duel_matrix_hele_wedstrijd = data.team_data.duel_matrix_hele_wedstrijd;
                                items.duel_matrix_hele_wedstrijd_thuis_spelers_uitteam = [];
                                items.duel_matrix_hele_wedstrijd_uit_spelers_thuisteam = [];
                                items.duel_matrix_eerste_helft = data.team_data.duel_matrix_eerste_helft;
                                items.duel_matrix_eerste_helft_thuis_spelers_uitteam = [];
                                items.duel_matrix_eerste_helft_uit_spelers_thuisteam = [];
                                items.duel_matrix_tweede_helft = data.team_data.duel_matrix_tweede_helft;
                                items.duel_matrix_tweede_helft_thuis_spelers_uitteam = [];
                                items.duel_matrix_tweede_helft_uit_spelers_thuisteam = [];
                                forEach(data.wedstrijd_data.spelers_thuisteam, function (value, key) {
                                    forEach(items.duel_matrix_hele_wedstrijd.thuis, function (value1, key1) {
                                        if (Number_converter(value1['1']) === value.personID) value1['1'] = value.spelerNaam;
                                    });
                                    var del = true;
                                    if (del && items.duel_matrix_hele_wedstrijd.uit[0][value.personID] >= 0) del = false;
                                    if (!del) items.duel_matrix_hele_wedstrijd_uit_spelers_thuisteam.push(value);

                                    forEach(items.duel_matrix_eerste_helft.thuis, function (value1, key1) {
                                        if (Number_converter(value1['1']) === value.personID) value1['1'] = value.spelerNaam;
                                    });
                                    del = true;
                                    if (del && items.duel_matrix_eerste_helft.uit[0][value.personID] >= 0) del = false;
                                    if (!del) items.duel_matrix_eerste_helft_uit_spelers_thuisteam.push(value);

                                    forEach(items.duel_matrix_tweede_helft.thuis, function (value1, key1) {
                                        if (Number_converter(value1['1']) === value.personID) value1['1'] = value.spelerNaam;
                                    });
                                    del = true;
                                    if (del && items.duel_matrix_tweede_helft.uit[0][value.personID] >= 0) del = false;
                                    if (!del) items.duel_matrix_tweede_helft_uit_spelers_thuisteam.push(value);
                                });
                                forEach(data.wedstrijd_data.spelers_uitteam, function (value, key) {
                                    var del = true;
                                    if (del && items.duel_matrix_hele_wedstrijd.thuis[0][value.personID] >= 0) del = false;
                                    if (!del) items.duel_matrix_hele_wedstrijd_thuis_spelers_uitteam.push(value);
                                    forEach(items.duel_matrix_hele_wedstrijd.uit, function (value1, key1) {
                                        if (Number_converter(value1['1']) === value.personID) value1['1'] = value.spelerNaam;
                                    });

                                    del = true;
                                    if (del && items.duel_matrix_eerste_helft.thuis[0][value.personID] >= 0) del = false;
                                    if (!del) items.duel_matrix_eerste_helft_thuis_spelers_uitteam.push(value);
                                    forEach(items.duel_matrix_eerste_helft.uit, function (value1, key1) {
                                        if (Number_converter(value1['1']) === value.personID) value1['1'] = value.spelerNaam;
                                    });

                                    del = true;
                                    if (del && items.duel_matrix_tweede_helft.thuis[0][value.personID] >= 0) del = false;
                                    if (!del) items.duel_matrix_tweede_helft_thuis_spelers_uitteam.push(value);
                                    forEach(items.duel_matrix_tweede_helft.uit, function (value1, key1) {
                                        if (Number_converter(value1['1']) === value.personID) value1['1'] = value.spelerNaam;
                                    });
                                });

                                items.passes_per_zone = data.team_data.passes_per_zone;

                                items.locatie_doelpogingen = data.team_data.locatie_doelpogingen;
                                forEach(items.spelersthuisteam, function (value, key) {
                                    forEach(items.locatie_doelpogingen.thuisTeam, function (value1, key1) {
                                        if (value1.personID == value.personID) {
                                            value1.spelerNaam = value.spelerNaam;
                                            value1.rugnummer = value.rugnummer;
                                        }
                                    });
                                });
                                forEach(items.spelersuitteam, function (value, key) {
                                    forEach(items.locatie_doelpogingen.uitTeam, function (value1, key1) {
                                        if (value1.personID == value.personID) {
                                            value1.spelerNaam = value.spelerNaam;
                                            value1.rugnummer = value.rugnummer;
                                        }
                                    });
                                });

                                items.pass_matrix_helft1 = data.team_data.pass_matrix_helft1;
                                items.pass_matrix_helft1_thuis_spelers = [];
                                items.pass_matrix_helft1_uit_spelers = [];
                                items.pass_matrix_helft2 = data.team_data.pass_matrix_helft2;
                                items.pass_matrix_helft2_thuis_spelers = [];
                                items.pass_matrix_helft2_uit_spelers = [];
                                forEach(data.wedstrijd_data.spelers_thuisteam, function (value, key) {
                                    forEach(items.pass_matrix_helft1.thuis.passMatrix, function (value1, key1) {
                                        if (Number_converter(value1._row) === value.personID) {
                                            value1._row = value.spelerNaam;
                                            items.pass_matrix_helft1_thuis_spelers.push(value);
                                        }
                                    });
                                    forEach(items.pass_matrix_helft2.thuis.passMatrix, function (value1, key1) {
                                        if (Number_converter(value1._row) === value.personID) {
                                            value1._row = value.spelerNaam;
                                            items.pass_matrix_helft2_thuis_spelers.push(value);
                                        }
                                    });
                                    forEach(items.pass_matrix_helft1.thuis.passMatrix2, function (value1, key1) {
                                        if (Number_converter(value1._row) === value.personID) {
                                            value1._row = value.spelerNaam;
                                        }
                                    });
                                    forEach(items.pass_matrix_helft2.thuis.passMatrix2, function (value1, key1) {
                                        if (Number_converter(value1._row) === value.personID) {
                                            value1._row = value.spelerNaam;
                                        }
                                    });
                                });
                                forEach(data.wedstrijd_data.spelers_uitteam, function (value, key) {
                                    forEach(items.pass_matrix_helft1.uit.passMatrix, function (value1, key1) {
                                        if (Number_converter(value1._row) === value.personID) {
                                            value1._row = value.spelerNaam;
                                            items.pass_matrix_helft1_uit_spelers.push(value);
                                        }
                                    });
                                    forEach(items.pass_matrix_helft2.uit.passMatrix, function (value1, key1) {
                                        if (Number_converter(value1._row) === value.personID) {
                                            value1._row = value.spelerNaam;
                                            items.pass_matrix_helft2_uit_spelers.push(value);
                                        }
                                    });
                                    forEach(items.pass_matrix_helft1.uit.passMatrix2, function (value1, key1) {
                                        if (Number_converter(value1._row) === value.personID) {
                                            value1._row = value.spelerNaam;
                                        }
                                    });
                                    forEach(items.pass_matrix_helft2.uit.passMatrix2, function (value1, key1) {
                                        if (Number_converter(value1._row) === value.personID) {
                                            value1._row = value.spelerNaam;
                                        }
                                    });
                                });
                                if (data.team_data.pass_matrix_kwartier1.length > 0) {
                                    items.pass_matrix_kwartier1 = data.team_data.pass_matrix_kwartier1;
                                    items.pass_matrix_kwartier1_thuis_spelers = [];
                                    items.pass_matrix_kwartier1_uit_spelers = [];
                                }
                                if (data.team_data.pass_matrix_kwartier2.length > 0) {
                                    items.pass_matrix_kwartier2 = data.team_data.pass_matrix_kwartier2;
                                    items.pass_matrix_kwartier2_thuis_spelers = [];
                                    items.pass_matrix_kwartier2_uit_spelers = [];
                                }
                                if (data.team_data.pass_matrix_kwartier3.length > 0) {
                                    items.pass_matrix_kwartier3 = data.team_data.pass_matrix_kwartier3;
                                    items.pass_matrix_kwartier3_thuis_spelers = [];
                                    items.pass_matrix_kwartier3_uit_spelers = [];
                                }
                                if (data.team_data.pass_matrix_kwartier4.length > 0) {
                                    items.pass_matrix_kwartier4 = data.team_data.pass_matrix_kwartier4;
                                    items.pass_matrix_kwartier4_thuis_spelers = [];
                                    items.pass_matrix_kwartier4_uit_spelers = [];
                                }
                                if (data.team_data.pass_matrix_kwartier5.length > 0) {
                                    items.pass_matrix_kwartier5 = data.team_data.pass_matrix_kwartier5;
                                    items.pass_matrix_kwartier5_thuis_spelers = [];
                                    items.pass_matrix_kwartier5_uit_spelers = [];
                                }
                                if (data.team_data.pass_matrix_kwartier6.length > 0) {
                                    items.pass_matrix_kwartier6 = data.team_data.pass_matrix_kwartier6;
                                    items.pass_matrix_kwartier6_thuis_spelers = [];
                                    items.pass_matrix_kwartier6_uit_spelers = [];
                                }
                                forEach(data.wedstrijd_data.spelers_thuisteam, function (value, key) {
                                    if (data.team_data.pass_matrix_kwartier1.length > 0) {
                                        forEach(items.pass_matrix_kwartier1.thuis.passMatrix, function (value1, key1) {
                                            if (Number_converter(value1._row) === value.personID) {
                                                value1._row = value.spelerNaam;
                                                items.pass_matrix_kwartier1_thuis_spelers.push(value);
                                            }
                                        });
                                        forEach(items.pass_matrix_kwartier1.thuis.passMatrix2, function (value1, key1) {
                                            if (Number_converter(value1._row) === value.personID) {
                                                value1._row = value.spelerNaam;
                                            }
                                        });
                                    }
                                    if (data.team_data.pass_matrix_kwartier2.length > 0) {
                                        forEach(items.pass_matrix_kwartier2.thuis.passMatrix, function (value1, key1) {
                                            if (Number_converter(value1._row) === value.personID) {
                                                value1._row = value.spelerNaam;
                                                items.pass_matrix_kwartier2_thuis_spelers.push(value);
                                            }
                                        });
                                        forEach(items.pass_matrix_kwartier2.thuis.passMatrix2, function (value1, key1) {
                                            if (Number_converter(value1._row) === value.personID) {
                                                value1._row = value.spelerNaam;
                                            }
                                        });
                                    }
                                    if (data.team_data.pass_matrix_kwartier3.length > 0) {
                                        forEach(items.pass_matrix_kwartier3.thuis.passMatrix, function (value1, key1) {
                                            if (Number_converter(value1._row) === value.personID) {
                                                value1._row = value.spelerNaam;
                                                items.pass_matrix_kwartier3_thuis_spelers.push(value);
                                            }
                                        });
                                        forEach(items.pass_matrix_kwartier3.thuis.passMatrix2, function (value1, key1) {
                                            if (Number_converter(value1._row) === value.personID) {
                                                value1._row = value.spelerNaam;
                                            }
                                        });
                                    }
                                    if (data.team_data.pass_matrix_kwartier4.length > 0) {
                                        forEach(items.pass_matrix_kwartier4.thuis.passMatrix, function (value1, key1) {
                                            if (Number_converter(value1._row) === value.personID) {
                                                value1._row = value.spelerNaam;
                                                items.pass_matrix_kwartier4_thuis_spelers.push(value);
                                            }
                                        });
                                        forEach(items.pass_matrix_kwartier4.thuis.passMatrix2, function (value1, key1) {
                                            if (Number_converter(value1._row) === value.personID) {
                                                value1._row = value.spelerNaam;
                                            }
                                        });
                                    }
                                    if (data.team_data.pass_matrix_kwartier5.length > 0) {
                                        forEach(items.pass_matrix_kwartier5.thuis.passMatrix, function (value1, key1) {
                                            if (Number_converter(value1._row) === value.personID) {
                                                value1._row = value.spelerNaam;
                                                items.pass_matrix_kwartier5_thuis_spelers.push(value);
                                            }
                                        });
                                        forEach(items.pass_matrix_kwartier5.thuis.passMatrix2, function (value1, key1) {
                                            if (Number_converter(value1._row) === value.personID) {
                                                value1._row = value.spelerNaam;
                                            }
                                        });
                                    }
                                    if (data.team_data.pass_matrix_kwartier6.length > 0) {
                                        forEach(items.pass_matrix_kwartier6.thuis.passMatrix, function (value1, key1) {
                                            if (Number_converter(value1._row) === value.personID) {
                                                value1._row = value.spelerNaam;
                                                items.pass_matrix_kwartier6_thuis_spelers.push(value);
                                            }
                                        });
                                        forEach(items.pass_matrix_kwartier6.thuis.passMatrix2, function (value1, key1) {
                                            if (Number_converter(value1._row) === value.personID) {
                                                value1._row = value.spelerNaam;
                                            }
                                        });
                                    }
                                });
                                forEach(data.wedstrijd_data.spelers_uitteam, function (value, key) {
                                    if (data.team_data.pass_matrix_kwartier1.length > 0) {
                                        forEach(items.pass_matrix_kwartier1.uit.passMatrix, function (value1, key1) {
                                            if (Number_converter(value1._row) === value.personID) {
                                                value1._row = value.spelerNaam;
                                                items.pass_matrix_kwartier1_uit_spelers.push(value);
                                            }
                                        });
                                        forEach(items.pass_matrix_kwartier1.uit.passMatrix2, function (value1, key1) {
                                            if (Number_converter(value1._row) === value.personID) {
                                                value1._row = value.spelerNaam;
                                            }
                                        });
                                    }
                                    if (data.team_data.pass_matrix_kwartier2.length > 0) {
                                        forEach(items.pass_matrix_kwartier2.uit.passMatrix, function (value1, key1) {
                                            if (Number_converter(value1._row) === value.personID) {
                                                value1._row = value.spelerNaam;
                                                items.pass_matrix_kwartier2_uit_spelers.push(value);
                                            }
                                        });
                                        forEach(items.pass_matrix_kwartier2.uit.passMatrix2, function (value1, key1) {
                                            if (Number_converter(value1._row) === value.personID) {
                                                value1._row = value.spelerNaam;
                                            }
                                        });
                                    }
                                    if (data.team_data.pass_matrix_kwartier3.length > 0) {
                                        forEach(items.pass_matrix_kwartier3.uit.passMatrix, function (value1, key1) {
                                            if (Number_converter(value1._row) === value.personID) {
                                                value1._row = value.spelerNaam;
                                                items.pass_matrix_kwartier3_uit_spelers.push(value);
                                            }
                                        });
                                        forEach(items.pass_matrix_kwartier3.uit.passMatrix2, function (value1, key1) {
                                            if (Number_converter(value1._row) === value.personID) {
                                                value1._row = value.spelerNaam;
                                            }
                                        });
                                    }
                                    if (data.team_data.pass_matrix_kwartier4.length > 0) {
                                        forEach(items.pass_matrix_kwartier4.uit.passMatrix, function (value1, key1) {
                                            if (Number_converter(value1._row) === value.personID) {
                                                value1._row = value.spelerNaam;
                                                items.pass_matrix_kwartier4_uit_spelers.push(value);
                                            }
                                        });
                                        forEach(items.pass_matrix_kwartier4.uit.passMatrix2, function (value1, key1) {
                                            if (Number_converter(value1._row) === value.personID) {
                                                value1._row = value.spelerNaam;
                                            }
                                        });
                                    }
                                    if (data.team_data.pass_matrix_kwartier5.length > 0) {
                                        forEach(items.pass_matrix_kwartier5.uit.passMatrix, function (value1, key1) {
                                            if (Number_converter(value1._row) === value.personID) {
                                                value1._row = value.spelerNaam;
                                                items.pass_matrix_kwartier5_uit_spelers.push(value);
                                            }
                                        });
                                        forEach(items.pass_matrix_kwartier5.uit.passMatrix2, function (value1, key1) {
                                            if (Number_converter(value1._row) === value.personID) {
                                                value1._row = value.spelerNaam;
                                            }
                                        });
                                    }
                                    if (data.team_data.pass_matrix_kwartier6.length > 0) {
                                        forEach(items.pass_matrix_kwartier6.uit.passMatrix, function (value1, key1) {
                                            if (Number_converter(value1._row) === value.personID) {
                                                value1._row = value.spelerNaam;
                                                items.pass_matrix_kwartier6_uit_spelers.push(value);
                                            }
                                        });
                                        forEach(items.pass_matrix_kwartier6.uit.passMatrix2, function (value1, key1) {
                                            if (Number_converter(value1._row) === value.personID) {
                                                value1._row = value.spelerNaam;
                                            }
                                        });
                                    }
                                });

                                items.penalty_visualisatie = data.team_data.penalty_visualisatie;
                                forEach(items.penalty_visualisatie, function (value, key) {
                                    forEach(items.spelersthuisteam, function (value1, key1) {
                                        if (value1.personID == value.schutter) {
                                            value.schutter_personID = value.schutter;
                                            value.schutter = value1.spelerNaam;
                                            value.schutter_teamID = items.thuisTeamID;
                                        }
                                        if (value1.personID == value.keeper) {
                                            value.keeper_personID = value.keeper;
                                            value.keeper = value1.spelerNaam;
                                            value.keeper_teamID = items.thuisTeamID;
                                        }
                                    });
                                    forEach(items.spelersuitteam, function (value1, key1) {
                                        if (value1.personID == value.schutter) {
                                            value.schutter_personID = value.schutter;
                                            value.schutter = value1.spelerNaam;
                                            value.schutter_teamID = items.uitTeamID;
                                        }
                                        if (value1.personID == value.keeper) {
                                            value.keeper_personID = value.keeper;
                                            value.keeper = value1.spelerNaam;
                                            value.keeper_teamID = items.uitTeamID;
                                        }
                                    });
                                });

                                items.overzicht_overtredingen_per_speler = {};
                                items.overzicht_overtredingen_per_speler.thuis = [];
                                items.overzicht_overtredingen_per_speler.uit = [];
                                forEach(data.team_data.overzicht_overtredingen_per_speler.fouls_thuis, function (value1, key1) {
                                    forEach(data.wedstrijd_data.spelers_thuisteam, function (value, key) {
                                        if (Number_converter(value1.personID) == value.personID) {
                                            value1.spelerNaam = value.spelerNaam;
                                            value1.buitenspel = _.where(data.team_data.overzicht_overtredingen_per_speler.offside_thuis, {personID: value1.personID})[0].n;
                                        }
                                    });
                                    items.overzicht_overtredingen_per_speler.thuis.push(value1);
                                });
                                forEach(data.team_data.overzicht_overtredingen_per_speler.fouls_uit, function (value1, key1) {
                                    forEach(data.wedstrijd_data.spelers_uitteam, function (value, key) {
                                        if (Number_converter(value1.personID) == value.personID) {
                                            value1.spelerNaam = value.spelerNaam;
                                            value1.buitenspel = _.where(data.team_data.overzicht_overtredingen_per_speler.offside_uit, {personID: value1.personID})[0].n;
                                        }
                                    });
                                    items.overzicht_overtredingen_per_speler.uit.push(value1);
                                });

                                items.locatie_overtredingen = data.team_data.locatie_overtredingen;
                                forEach(items.spelersthuisteam, function (value, key) {
                                    forEach(items.locatie_overtredingen.thuisTeam, function (value1, key1) {
                                        if (value1.personID == value.personID) {
                                            value1.spelerNaam = value.spelerNaam;
                                            value1.rugnummer = value.rugnummer;
                                        }
                                    });
                                });
                                forEach(items.spelersuitteam, function (value, key) {
                                    forEach(items.locatie_overtredingen.uitTeam, function (value1, key1) {
                                        if (value1.personID == value.personID) {
                                            value1.spelerNaam = value.spelerNaam;
                                            value1.rugnummer = value.rugnummer;
                                        }
                                    });
                                });

                            }

                            player_data = {};
                            if (data.thuisSpelers_data) {
                                player_data.player_stats_thuis = [];
                                _.each(data.thuisSpelers_data, function (value, key) {
                                    var temp = {};
                                    temp.matchID = Number_converter((items.matchID));
                                    temp.match = (match_short.match_info.wedstrijd);
                                    temp.result = (match_short.match_info.eindstand);
                                    temp.date = (match_short.match_info.datum);
                                    temp.ronde = Number_converter(match_short.match_info.ronde);
                                    temp.teamID = (items.thuisTeamID);
                                    temp.type = (value.stat_matrix.type[0]);
                                    temp.personID = Number_converter(value.speler[0]);
                                    if (value.leeftijd) {
                                        temp.spelerLeeftijd = value.leeftijd[0];
                                    }
                                    if (value.nationaliteit) {
                                        temp.spelerNationaliteit = value.nationaliteit[0];
                                    }
                                    forEach(items.spelersthuisteam, function (value1, key1) {
                                        if (value1.personID == temp.personID) {
                                            temp.spelerNaam = (value1.spelerNaam);
                                            temp.spelerRugnummer = Number_converter((value1.rugnummer));
                                            temp.spelerPhoto = value1.spelerPhoto;
                                            temp.spelerGeboortedatum = value1.spelerGeboortedatum;
                                        }
                                    });
                                    if (temp.type == 'keeper') {
                                        temp.minuten = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Minuten'})[0][temp.personID]);
                                        temp.reddingen = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Reddingen'})[0][temp.personID]);
                                        temp.geslaagde_reddingen = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Geslaagde reddingen'})[0][temp.personID].split("%")[0]);
                                        temp.korte_passes = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Aantal korte passes'})[0][temp.personID]);
                                        temp.middellange_passes = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Aantal middellange passes'})[0][temp.personID]);
                                        temp.lange_passes = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Aantal lange passes'})[0][temp.personID]);
                                        temp.pass_percentage = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Geslaagde passes'})[0][temp.personID].split("%")[0]);
                                        temp.gevangen_ballen = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Gevangen ballen'})[0][temp.personID]);
                                        temp.weggestompte_ballen = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Weggestompte ballen'})[0][temp.personID]);
                                        temp.succesvolle_uittrappen = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Succesvolle uittrappen'})[0][temp.personID].split("%")[0]);
                                        temp.geel = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Gele kaarten'})[0][temp.personID]);
                                        temp.rood = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Rode kaart'})[0][temp.personID]);
                                        temp.doelpunten_tegen = Number_converter(match_short.match_info.eindstand.split(" - ", 2)[1]);
                                        temp.pass_lengte = Number_converter((Number_converter(value.pass_soorten_helft1[temp.personID][0].gem_len.split("m")[0]) + Number_converter(value.pass_soorten_helft2[temp.personID][0].gem_len.split("m")[0]) / 2).toFixed(1));
                                    } else {
                                        temp.minuten = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Minuten'})[0][temp.personID]);
                                        temp.doelpunten = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Doelpunten'})[0][temp.personID]);
                                        temp.aantal_passes = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Aantal passes'})[0][temp.personID]);
                                        temp.geslaagde_passes = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Geslaagde passes'})[0][temp.personID]);
                                        temp.pass_percentage = Number_converter(((Number_converter(temp.geslaagde_passes) / Number_converter(temp.aantal_passes)) * 100).toFixed(1));
                                        temp.doelpogingen = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Doelpogingen'})[0][temp.personID]);
                                        temp.doelpogingen_opdoel = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Doelpogingen op doel'})[0][temp.personID].split("%")[0]);
                                        temp.voorzetten = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Voorzetten'})[0][temp.personID]);
                                        temp.gewonnen_duels = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Gewonnen duels'})[0][temp.personID].split("%")[0]);
                                        temp.intercepties = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Intercepties'})[0][temp.personID]);
                                        temp.overtredingen = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Overtredingen'})[0][temp.personID]);
                                        temp.geel = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Gele kaarten'})[0][temp.personID]);
                                        temp.rood = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Rode kaart'})[0][temp.personID]);
                                        temp.verdedigende_duels = Number_converter((value.algemene_stats[6][0][0]));
                                        temp.aanvallende_duels = Number_converter((value.algemene_stats[4][0][0]));
                                        temp.pass_lengte = Number_converter((Number_converter(value.pass_soorten_helft1[temp.personID][0].gem_len.split("m")[0]) + Number_converter(value.pass_soorten_helft2[temp.personID][0].gem_len.split("m")[0]) / 2).toFixed(1));
                                    }
                                    player_data.player_stats_thuis.push(temp);
                                });

                                items.player_stats_full_thuis = [];
                                _.each(data.thuisSpelers_data, function (value, key) {
                                    var temp = {};
                                    temp.spelerType = (value.stat_matrix.type[0]);
                                    temp.personID = Number_converter(value.speler[0]);
                                    if (value.leeftijd) {
                                        temp.spelerLeeftijd = value.leeftijd[0];
                                    }
                                    if (value.nationaliteit) {
                                        temp.spelerNationaliteit = value.nationaliteit[0];
                                    }
                                    forEach(items.spelersthuisteam, function (value1, key1) {
                                        if (value1.personID == temp.personID) {
                                            temp.spelerNaam = (value1.spelerNaam);
                                            temp.spelerRugnummer = Number_converter((value1.rugnummer));
                                            temp.spelerPhoto = (value1.spelerPhoto);
                                            temp.spelerGeboortedatum = (value1.spelerGeboortedatum);
                                        }

                                        if (_.where(speler_profiel_thuis, {spelerID: value1.personID})) {
                                            forEach(_.where(speler_profiel_thuis, {spelerID: value1.personID}), function (value2, key2) {
                                                if (value2.seizoen === 'Seizoen ' + items.seizoen) {
                                                    if (!value2.spelerRugnummer) {
                                                        value2.spelerRugnummer = Number_converter((value1.rugnummer));
                                                    }
                                                    if (!value2.spelerType) {
                                                        value2.spelerType = temp.type;
                                                    }

                                                    var ingevallen = 0;
                                                    var vervangen = 0;
                                                    if (value1.ingevallen) ingevallen = 1;
                                                    if (value1.vervangen) vervangen = 1;
                                                    var doelpunten = 0;
                                                    var voorzetten = 0;
                                                    var minuten = 0;
                                                    var geel = 0;
                                                    var rood = 0;
                                                    if (_.where(value.stat_matrix.speler_mat, {_row: 'Doelpunten'})[0]) doelpunten = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Doelpunten'})[0][temp.personID]);
                                                    if (_.where(value.stat_matrix.speler_mat, {_row: 'Voorzetten'})[0]) voorzetten = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Voorzetten'})[0][temp.personID]);
                                                    if (_.where(value.stat_matrix.speler_mat, {_row: 'Minuten'})[0]) minuten = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Minuten'})[0][temp.personID]);
                                                    if (_.where(value.stat_matrix.speler_mat, {_row: 'Gele kaarten'})[0]) geel = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Gele kaarten'})[0][temp.personID]);
                                                    if (_.where(value.stat_matrix.speler_mat, {_row: 'Rode kaart'})[0]) rood = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Rode kaart'})[0][temp.personID]);

                                                    if (!value2.laatste_ronde_sync || value2.laatste_ronde_sync == null || value2.laatste_ronde_sync === "null" || value2.laatste_ronde_sync === undefined) {
                                                        Spelers.update({
                                                            _id: value2._id
                                                        }, {
                                                            spelerGeboorteland: value1.spelerNationaliteit,
                                                            spelerGeboortedatum: value1.spelerGeboortedatum,
                                                            spelerRugnummer: value2.spelerRugnummer,
                                                            spelerType: value2.spelerType,
                                                            date_edited: datetime,

                                                            laatste_ronde_sync: items.ronde,
                                                            wedstrijden: 1,
                                                            hele_wedstrijd: 0,
                                                            ingevallen: ingevallen || 0,
                                                            vervangen: vervangen || 0,
                                                            doelpunten: doelpunten || 0,
                                                            voorzetten: voorzetten || 0,
                                                            penalties: (Number_converter((value.algemene_stats[9][0][0])) + Number_converter((value.algemene_stats[10][0][0]))) || 0,
                                                            minuten: minuten || 0,
                                                            geel: geel || 0,
                                                            rood: rood || 0,
                                                            tweede_geel: Number_converter((value.algemene_stats[15][0][0])) || 0
                                                        }, function (err, data) {
                                                            if (err) throw err;
                                                        });
                                                    } else if (value2.laatste_ronde_sync != items.ronde && value2.laatste_ronde_sync < items.ronde) {
                                                        Spelers.update({
                                                            _id: value2._id
                                                        }, {
                                                            spelerGeboorteland: value1.spelerNationaliteit,
                                                            spelerGeboortedatum: value1.spelerGeboortedatum,
                                                            spelerRugnummer: value2.spelerRugnummer,
                                                            spelerType: value2.spelerType,
                                                            date_edited: datetime,

                                                            laatste_ronde_sync: items.ronde,
                                                            wedstrijden: value2.wedstrijden + 1,
                                                            hele_wedstrijd: value2.hele_wedstrijd,
                                                            ingevallen: value2.ingevallen + ingevallen,
                                                            vervangen: value2.vervangen + vervangen,
                                                            doelpunten: value2.doelpunten + doelpunten,
                                                            voorzetten: value2.voorzetten + voorzetten,
                                                            penalties: value2.penalties + Number_converter((value.algemene_stats[9][0][0])) + Number_converter((value.algemene_stats[10][0][0])),
                                                            minuten: value2.minuten + minuten,
                                                            geel: value2.geel + geel,
                                                            rood: value2.rood + rood,
                                                            tweede_geel: value2.tweede_geel + Number_converter((value.algemene_stats[15][0][0]))
                                                        }, function (err, data) {
                                                            if (err) throw err;
                                                        });
                                                    }
                                                }
                                            });
                                            if (!_.where(_.where(speler_profiel_thuis, {spelerID: value1.personID}), {seizoen: 'Seizoen ' + items.seizoen})) {
                                                var ingevallen = 0;
                                                var vervangen = 0;
                                                if (value1.ingevallen) ingevallen = 1;
                                                if (value1.vervangen) vervangen = 1;
                                                var doelpunten = 0;
                                                var voorzetten = 0;
                                                var minuten = 0;
                                                var geel = 0;
                                                var rood = 0;
                                                if (_.where(value.stat_matrix.speler_mat, {_row: 'Doelpunten'})[0]) doelpunten = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Doelpunten'})[0][temp.personID]);
                                                if (_.where(value.stat_matrix.speler_mat, {_row: 'Voorzetten'})[0]) voorzetten = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Voorzetten'})[0][temp.personID]);
                                                if (_.where(value.stat_matrix.speler_mat, {_row: 'Minuten'})[0]) minuten = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Minuten'})[0][temp.personID]);
                                                if (_.where(value.stat_matrix.speler_mat, {_row: 'Gele kaarten'})[0]) geel = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Gele kaarten'})[0][temp.personID]);
                                                if (_.where(value.stat_matrix.speler_mat, {_row: 'Rode kaart'})[0]) rood = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Rode kaart'})[0][temp.personID]);

                                                Spelers.create({
                                                    spelerID: Number_converter(value1.personID),
                                                    spelerNaam: value1.spelerNaam,
                                                    spelerGeboorteland: value1.spelerNationaliteit,
                                                    spelerGeboortedatum: value1.spelerGeboortedatum,
                                                    spelerRugnummer: Number_converter(value1.rugnummer),
                                                    seizoen: 'Seizoen ' + items.seizoen,
                                                    clubNaam: match_short.match_info.thuis,
                                                    clubID: items.thuisTeamID,
                                                    date_edited: datetime,

                                                    laatste_ronde_sync: items.ronde,
                                                    wedstrijden: 1,
                                                    hele_wedstrijd: 0,
                                                    ingevallen: ingevallen || 0,
                                                    vervangen: vervangen || 0,
                                                    doelpunten: doelpunten || 0,
                                                    voorzetten: voorzetten || 0,
                                                    penalties: Number_converter((value.algemene_stats[9][0][0])) + Number_converter((value.algemene_stats[10][0][0])),
                                                    minuten: minuten || 0,
                                                    geel: geel || 0,
                                                    rood: rood || 0,
                                                    tweede_geel: Number_converter((value.algemene_stats[15][0][0]))
                                                }, function (err, data) {
                                                });
                                            }
                                        } else {
                                            var ingevallen = 0;
                                            var vervangen = 0;
                                            if (value1.ingevallen) ingevallen = 1;
                                            if (value1.vervangen) vervangen = 1;
                                            var doelpunten = 0;
                                            var voorzetten = 0;
                                            var minuten = 0;
                                            var geel = 0;
                                            var rood = 0;
                                            if (_.where(value.stat_matrix.speler_mat, {_row: 'Doelpunten'})[0]) doelpunten = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Doelpunten'})[0][temp.personID]);
                                            if (_.where(value.stat_matrix.speler_mat, {_row: 'Voorzetten'})[0]) voorzetten = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Voorzetten'})[0][temp.personID]);
                                            if (_.where(value.stat_matrix.speler_mat, {_row: 'Minuten'})[0]) minuten = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Minuten'})[0][temp.personID]);
                                            if (_.where(value.stat_matrix.speler_mat, {_row: 'Gele kaarten'})[0]) geel = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Gele kaarten'})[0][temp.personID]);
                                            if (_.where(value.stat_matrix.speler_mat, {_row: 'Rode kaart'})[0]) rood = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Rode kaart'})[0][temp.personID]);

                                            Spelers.create({
                                                spelerID: Number_converter(value1.personID),
                                                spelerNaam: value1.spelerNaam,
                                                spelerGeboorteland: value1.spelerNationaliteit,
                                                spelerGeboortedatum: value1.spelerGeboortedatum,
                                                spelerRugnummer: Number_converter(value1.rugnummer),
                                                seizoen: 'Seizoen ' + items.seizoen,
                                                clubNaam: match_short.match_info.thuis,
                                                clubID: items.thuisTeamID,
                                                date_edited: datetime,

                                                laatste_ronde_sync: items.ronde,
                                                wedstrijden: 1,
                                                hele_wedstrijd: 0,
                                                ingevallen: ingevallen || 0,
                                                vervangen: vervangen || 0,
                                                doelpunten: doelpunten || 0,
                                                voorzetten: voorzetten || 0,
                                                penalties: Number_converter((value.algemene_stats[9][0][0])) + Number_converter((value.algemene_stats[10][0][0])),
                                                minuten: minuten || 0,
                                                geel: geel || 0,
                                                rood: rood || 0,
                                                tweede_geel: Number_converter((value.algemene_stats[15][0][0]))
                                            }, function (err, data) {
                                            });
                                        }
                                    });
                                    if (temp.spelerType == 'keeper') {
                                        temp.minuten = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Minuten'})[0][temp.personID]);
                                        temp.reddingen = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Reddingen'})[0][temp.personID]);
                                        temp.geslaagde_reddingen = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Geslaagde reddingen'})[0][temp.personID].split("%")[0]);
                                        temp.korte_passes = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Aantal korte passes'})[0][temp.personID]);
                                        temp.middellange_passes = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Aantal middellange passes'})[0][temp.personID]);
                                        temp.lange_passes = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Aantal lange passes'})[0][temp.personID]);
                                        temp.pass_percentage = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Geslaagde passes'})[0][temp.personID].split("%")[0]);
                                        temp.gevangen_ballen = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Gevangen ballen'})[0][temp.personID]);
                                        temp.weggestompte_ballen = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Weggestompte ballen'})[0][temp.personID]);
                                        temp.succesvolle_uittrappen = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Succesvolle uittrappen'})[0][temp.personID].split("%")[0]);
                                        temp.geel = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Gele kaarten'})[0][temp.personID]);
                                        temp.rood = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Rode kaart'})[0][temp.personID]);
                                        temp.doelpunten_tegen = Number_converter(match_short.match_info.eindstand.split(" - ", 2)[1]);
                                        temp.pass_lengte = Number_converter((Number_converter(value.pass_soorten_helft1[temp.personID][0].gem_len.split("m")[0]) + Number_converter(value.pass_soorten_helft2[temp.personID][0].gem_len.split("m")[0]) / 2).toFixed(1));

                                        temp.doelpunten = Number_converter((value.algemene_stats[1][0][0]));

                                        temp.locatie_reddingen = [];
                                        forEach(value.locaties_reddingen, function (value1, key1) {
                                            var temp1 = {};
                                            temp1.zend_length = Number_converter(value1.zend_length);
                                            temp1.zend_width = Number_converter(value1.zend_width);
                                            temp1.ontvang_length = Number_converter(value1.ontvang_length);
                                            temp1.ontvang_width = Number_converter(value1.ontvang_width);
                                            temp1.actie = (value1.actie);

                                            temp.locatie_reddingen.push(temp1);
                                        });

                                        temp.locatie_uittrappen = [];
                                        forEach(value.locaties_uittrappen, function (value1, key1) {
                                            var temp1 = {};
                                            temp1.zend_length = Number_converter(value1.zend_lengte);
                                            temp1.zend_width = Number_converter(value1.zend_breedte);
                                            temp1.ontvang_length = Number_converter(value1.ontvang_lengte[0]);
                                            temp1.ontvang_width = Number_converter(value1.ontvang_breedte[0]);
                                            forEach(items.spelersthuisteam, function (value1, key1) {
                                                if (value1.personID == value1.teamgenoot) {
                                                    temp1.teamgenootID = (value1.personID);
                                                    temp1.teamgenoot = (value1.spelerNaam);
                                                }
                                            });
                                            forEach(items.spelersuitteam, function (value1, key1) {
                                                if (value1.personID == value1.teamgenoot) {
                                                    temp1.teamgenootID = (value1.personID);
                                                    temp1.teamgenoot = (value1.spelerNaam);
                                                }
                                            });
                                            temp.locatie_uittrappen.push(temp1);
                                        });
                                    } else {
                                        temp.minuten = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Minuten'})[0][temp.personID]);
                                        temp.doelpunten = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Doelpunten'})[0][temp.personID]);
                                        temp.aantal_passes = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Aantal passes'})[0][temp.personID]);
                                        temp.geslaagde_passes = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Geslaagde passes'})[0][temp.personID]);
                                        temp.pass_percentage = Number_converter((Number_converter(temp.geslaagde_passes) / Number_converter(temp.aantal_passes)) * 100).toFixed(1);
                                        temp.doelpogingen = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Doelpogingen'})[0][temp.personID]);
                                        temp.doelpogingen_opdoel = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Doelpogingen op doel'})[0][temp.personID].split("%")[0]);
                                        temp.voorzetten = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Voorzetten'})[0][temp.personID]);
                                        temp.gewonnen_duels = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Gewonnen duels'})[0][temp.personID].split("%")[0]);
                                        temp.intercepties = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Intercepties'})[0][temp.personID]);
                                        temp.overtredingen = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Overtredingen'})[0][temp.personID]);
                                        temp.geel = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Gele kaarten'})[0][temp.personID]);
                                        temp.rood = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Rode kaart'})[0][temp.personID]);
                                        temp.verdedigende_duels = Number_converter((value.algemene_stats[6][0][0]));
                                        temp.aanvallende_duels = Number_converter((value.algemene_stats[4][0][0]));
                                        temp.pass_lengte = Number_converter((Number_converter(value.pass_soorten_helft1[temp.personID][0].gem_len.split("m")[0]) + Number_converter(value.pass_soorten_helft2[temp.personID][0].gem_len.split("m")[0]) / 2).toFixed(1));

                                        temp.aanvallende_acties_helft1 = {};
                                        temp.aanvallende_acties_helft1.aanvallende_duels = (value.aanvallende_acties_helft1[0][0][0]);
                                        temp.aanvallende_acties_helft1.aanvallende_duels_gewonnen = (value.aanvallende_acties_helft1[1][0][0]);
                                        temp.aanvallende_acties_helft1.dribbels = (value.aanvallende_acties_helft1[2][0][0]);
                                        temp.aanvallende_acties_helft1.schoten = (value.aanvallende_acties_helft1[3][0][0]);
                                        temp.aanvallende_acties_helft1.schoten_doel = (value.aanvallende_acties_helft1[4][0][0]);
                                        temp.aanvallende_acties_helft1.schoten_ijzer = (value.aanvallende_acties_helft1[5][0][0]);
                                        temp.aanvallende_acties_helft1.schoten_naast = (value.aanvallende_acties_helft1[6][0][0]);
                                        temp.aanvallende_acties_helft1.schoten_over = (value.aanvallende_acties_helft1[7][0][0]);
                                        temp.aanvallende_acties_helft1.schoten_geblokkeerd = (value.aanvallende_acties_helft1[8][0][0]);
                                        temp.aanvallende_acties_helft1.schoten_binnen16 = (value.aanvallende_acties_helft1[9][0][0]);
                                        temp.aanvallende_acties_helft1.schoten_buiten16 = (value.aanvallende_acties_helft1[10][0][0]);
                                        temp.aanvallende_acties_helft1.sleutel_acties = (value.aanvallende_acties_helft1[11][0][0]);
                                        temp.aanvallende_acties_helft1.sleutel_passes = (value.aanvallende_acties_helft1[12][0][0]);
                                        temp.aanvallende_acties_helft1.kruisballen = (value.aanvallende_acties_helft1[13][0][0]);

                                        temp.aanvallende_acties_helft2 = {};
                                        temp.aanvallende_acties_helft2.aanvallende_duels = (value.aanvallende_acties_helft2[0][0][0]);
                                        temp.aanvallende_acties_helft2.aanvallende_duels_gewonnen = (value.aanvallende_acties_helft2[1][0][0]);
                                        temp.aanvallende_acties_helft2.dribbels = (value.aanvallende_acties_helft2[2][0][0]);
                                        temp.aanvallende_acties_helft2.schoten = (value.aanvallende_acties_helft2[3][0][0]);
                                        temp.aanvallende_acties_helft2.schoten_doel = (value.aanvallende_acties_helft2[4][0][0]);
                                        temp.aanvallende_acties_helft2.schoten_ijzer = (value.aanvallende_acties_helft2[5][0][0]);
                                        temp.aanvallende_acties_helft2.schoten_naast = (value.aanvallende_acties_helft2[6][0][0]);
                                        temp.aanvallende_acties_helft2.schoten_over = (value.aanvallende_acties_helft2[7][0][0]);
                                        temp.aanvallende_acties_helft2.schoten_geblokkeerd = (value.aanvallende_acties_helft2[8][0][0]);
                                        temp.aanvallende_acties_helft2.schoten_binnen16 = (value.aanvallende_acties_helft2[9][0][0]);
                                        temp.aanvallende_acties_helft2.schoten_buiten16 = (value.aanvallende_acties_helft2[10][0][0]);
                                        temp.aanvallende_acties_helft2.sleutel_acties = (value.aanvallende_acties_helft2[11][0][0]);
                                        temp.aanvallende_acties_helft2.sleutel_passes = (value.aanvallende_acties_helft2[12][0][0]);
                                        temp.aanvallende_acties_helft2.kruisballen = (value.aanvallende_acties_helft2[13][0][0]);

                                        temp.dode_spel_momenten = {};
                                        temp.dode_spel_momenten.ingooien = (value.dode_spel_momenten[0][0][0]);
                                        temp.dode_spel_momenten.hoekschoppen = (value.dode_spel_momenten[1][0][0]);
                                        temp.dode_spel_momenten.vrije_trappen = (value.dode_spel_momenten[2][0][0]);
                                        temp.dode_spel_momenten.vrije_trappen_direct = (value.dode_spel_momenten[3][0][0]);
                                        temp.dode_spel_momenten.vrije_trappen_indirect = (value.dode_spel_momenten[4][0][0]);

                                        temp.locatie_voorzetten = [];
                                        forEach(value.locatie_voorzetten[temp.personID], function (value1, key1) {
                                            var temp1 = {};
                                            temp1.zend_lengte = (value1.zend_lengte);
                                            temp1.zend_breedte = (value1.zend_breedte);
                                            temp1.doelpoging_na_3 = (value1.doelpoging_na_3);

                                            temp.locatie_voorzetten.push(temp1);
                                        });

                                        temp.locatie_aanvallende_duels = [];
                                        forEach(value.locaties_aanvallende_duels[temp.personID], function (value1, key1) {
                                            var temp1 = {};
                                            temp1.locationInFieldLength = (value1.locationInFieldLength);
                                            temp1.locationInFieldWidth = (value1.locationInFieldWidth);
                                            temp1.gewonnen = (value1.gewonnen);
                                            temp1.duel_type = (value1.duel_type);

                                            temp.locatie_aanvallende_duels.push(temp1);
                                        });

                                        temp.locatie_doelpogingen = [];
                                        forEach(value.locaties_doelpogingen[temp.personID], function (value1, key1) {
                                            var temp1 = {};
                                            temp1.locationInFieldLength = (value1.locationInFieldLength);
                                            temp1.locationInFieldWidth = (value1.locationInFieldWidth);
                                            temp1.lichaamsdeel = (value1.lichaamsdeel);
                                            temp1.minuut_tot_string = (value1.minuut_tot_string);
                                            temp1.type = (value1.type);

                                            temp.locatie_doelpogingen.push(temp1);
                                        });
                                    }

                                    temp.eigen_doelpunten = Number_converter((value.algemene_stats[2][0][0]));
                                    temp.aantal_acties = Number_converter((value.algemene_stats[3][0][0]));
                                    temp.aantal_aanvallende_duels = Number_converter((value.algemene_stats[4][0][0]));
                                    temp.aantal_aanvallende_duels_gewonnen = Number_converter((value.algemene_stats[5][0][0]));
                                    temp.aantal_verdedigende_duels = Number_converter((value.algemene_stats[6][0][0]));
                                    temp.aantal_verdedigende_duels_gewonnen = Number_converter((value.algemene_stats[7][0][0]));
                                    temp.assists = Number_converter((value.algemene_stats[8][0][0]));
                                    temp.penalties_gescoord = Number_converter((value.algemene_stats[9][0][0]));
                                    temp.penalties_gemist = Number_converter((value.algemene_stats[10][0][0]));
                                    temp.aantal_buitenspel = Number_converter((value.algemene_stats[11][0][0]));
                                    temp.overtredingen_tegen = Number_converter((value.algemene_stats[12][0][0]));
                                    temp.overtredingen_mee = Number_converter((value.algemene_stats[13][0][0]));
                                    temp.tweede_geel = Number_converter((value.algemene_stats[15][0][0]));

                                    temp.verdedigende_acties_helft1 = {};
                                    temp.verdedigende_acties_helft1.verdedigende_duels = (value.verdedigende_acties_helft1[0][0][0]);
                                    temp.verdedigende_acties_helft1.verdedigende_duels_gewonnen = (value.verdedigende_acties_helft1[1][0][0]);
                                    temp.verdedigende_acties_helft1.intercepties = (value.verdedigende_acties_helft1[2][0][0]);
                                    temp.verdedigende_acties_helft1.luchtduels = (value.verdedigende_acties_helft1[3][0][0]);
                                    temp.verdedigende_acties_helft1.slidingduels = (value.verdedigende_acties_helft1[4][0][0]);
                                    temp.verdedigende_acties_helft1.staande_duels = (value.verdedigende_acties_helft1[5][0][0]);
                                    temp.verdedigende_acties_helft1.wegwerken = (value.verdedigende_acties_helft1[6][0][0]);
                                    temp.verdedigende_acties_helft1.blokkeren_schot = (value.verdedigende_acties_helft1[7][0][0]);

                                    temp.verdedigende_acties_helft2 = {};
                                    temp.verdedigende_acties_helft2.verdedigende_duels = (value.verdedigende_acties_helft2[0][0][0]);
                                    temp.verdedigende_acties_helft2.verdedigende_duels_gewonnen = (value.verdedigende_acties_helft2[1][0][0]);
                                    temp.verdedigende_acties_helft2.intercepties = (value.verdedigende_acties_helft2[2][0][0]);
                                    temp.verdedigende_acties_helft2.luchtduels = (value.verdedigende_acties_helft2[3][0][0]);
                                    temp.verdedigende_acties_helft2.slidingduels = (value.verdedigende_acties_helft2[4][0][0]);
                                    temp.verdedigende_acties_helft2.staande_duels = (value.verdedigende_acties_helft2[5][0][0]);
                                    temp.verdedigende_acties_helft2.wegwerken = (value.verdedigende_acties_helft2[6][0][0]);
                                    temp.verdedigende_acties_helft2.blokkeren_schot = (value.verdedigende_acties_helft2[7][0][0]);

                                    temp.passes_helft1 = [];
                                    forEach(value.passes_helft1[temp.personID], function (value1, key1) {
                                        var temp1 = {};
                                        temp1.aan = value1['Passes gegeven aan'];
                                        temp1.van = value1['Passes gekregen van'];
                                        forEach(items.spelersthuisteam, function (value2, key2) {
                                            if (value2.personID == value1._row) {
                                                temp1.personID = (value2.personID);
                                                temp1._row = (value2.spelerNaam);
                                            }
                                        });
                                        forEach(items.spelersuitteam, function (value2, key2) {
                                            if (value2.personID == value1._row) {
                                                temp1.personID = (value2.personID);
                                                temp1._row = (value2.spelerNaam);
                                            }
                                        });
                                        if (value1._row == 'TOTAAL') {
                                            temp1._row = 'Totaal';
                                        }
                                        temp.passes_helft1.push(temp1);
                                    });

                                    temp.passes_helft2 = [];
                                    forEach(value.passes_helft2[temp.personID], function (value1, key1) {
                                        var temp1 = {};
                                        temp1.aan = value1['Passes gegeven aan'];
                                        temp1.van = value1['Passes gekregen van'];
                                        forEach(items.spelersthuisteam, function (value2, key2) {
                                            if (value2.personID == value1._row) {
                                                temp1.personID = (value2.personID);
                                                temp1._row = (value2.spelerNaam);
                                            }
                                        });
                                        forEach(items.spelersuitteam, function (value2, key2) {
                                            if (value2.personID == value1._row) {
                                                temp1.personID = (value2.personID);
                                                temp1._row = (value2.spelerNaam);
                                            }
                                        });
                                        if (value1._row == 'TOTAAL') {
                                            temp1._row = 'Totaal';
                                        }
                                        temp.passes_helft2.push(temp1);
                                    });

                                    temp.pass_soorten_helft1 = value.pass_soorten_helft1[temp.personID][0];
                                    temp.pass_soorten_helft2 = value.pass_soorten_helft2[temp.personID][0];

                                    temp.locatie_verdedigende_duels = [];
                                    forEach(value.locaties_verdedigende_duels[temp.personID], function (value1, key1) {
                                        var temp1 = {};
                                        temp1.locationInFieldLength = (value1.locationInFieldLength);
                                        temp1.locationInFieldWidth = (value1.locationInFieldWidth);
                                        temp1.gewonnen = (value1.gewonnen);
                                        temp1.duel_type = (value1.duel_type);

                                        temp.locatie_verdedigende_duels.push(temp1);
                                    });

                                    items.player_stats_full_thuis.push(temp);
                                });
                            }
                            if (data.uitSpelers_data) {
                                player_data.player_stats_uit = [];
                                _.each(data.uitSpelers_data, function (value, key) {
                                    var temp = {};
                                    temp.matchID = Number_converter((items.matchID));
                                    temp.match = (match_short.match_info.wedstrijd);
                                    temp.result = (match_short.match_info.eindstand);
                                    temp.date = (match_short.match_info.datum);
                                    temp.ronde = Number_converter(match_short.match_info.ronde);
                                    temp.teamID = (items.thuisTeamID);
                                    temp.type = (value.stat_matrix.type[0]);
                                    temp.personID = Number_converter(value.speler[0]);
                                    if (value.leeftijd) {
                                        temp.spelerLeeftijd = value.leeftijd[0];
                                    }
                                    if (value.nationaliteit) {
                                        temp.spelerNationaliteit = value.nationaliteit[0];
                                    }
                                    forEach(items.spelersuitteam, function (value1, key1) {
                                        if (value1.personID == temp.personID) {
                                            temp.spelerNaam = (value1.spelerNaam);
                                            temp.spelerRugnummer = Number_converter((value1.rugnummer));
                                            temp.spelerPhoto = (value1.spelerPhoto);
                                            temp.spelerGeboortedatum = (value1.spelerGeboortedatum);
                                        }
                                    });
                                    if (temp.type == 'keeper') {
                                        temp.minuten = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Minuten'})[0][temp.personID]);
                                        temp.reddingen = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Reddingen'})[0][temp.personID]);
                                        temp.geslaagde_reddingen = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Geslaagde reddingen'})[0][temp.personID].split("%")[0]);
                                        temp.korte_passes = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Aantal korte passes'})[0][temp.personID]);
                                        temp.middellange_passes = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Aantal middellange passes'})[0][temp.personID]);
                                        temp.lange_passes = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Aantal lange passes'})[0][temp.personID]);
                                        temp.pass_percentage = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Geslaagde passes'})[0][temp.personID].split("%")[0]);
                                        temp.gevangen_ballen = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Gevangen ballen'})[0][temp.personID]);
                                        temp.weggestompte_ballen = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Weggestompte ballen'})[0][temp.personID]);
                                        temp.succesvolle_uittrappen = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Succesvolle uittrappen'})[0][temp.personID].split("%")[0]);
                                        temp.geel = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Gele kaarten'})[0][temp.personID]);
                                        temp.rood = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Rode kaart'})[0][temp.personID]);
                                        temp.doelpunten_tegen = Number_converter(match_short.match_info.eindstand.split(" - ", 1)[0]);
                                        temp.pass_lengte = Number_converter((Number_converter(value.pass_soorten_helft1[temp.personID][0].gem_len.split("m")[0]) + Number_converter(value.pass_soorten_helft2[temp.personID][0].gem_len.split("m")[0]) / 2).toFixed(1));
                                    } else {
                                        temp.minuten = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Minuten'})[0][temp.personID]);
                                        temp.doelpunten = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Doelpunten'})[0][temp.personID]);
                                        temp.aantal_passes = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Aantal passes'})[0][temp.personID]);
                                        temp.geslaagde_passes = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Geslaagde passes'})[0][temp.personID]);
                                        temp.pass_percentage = Number_converter(((Number_converter(temp.geslaagde_passes) / Number_converter(temp.aantal_passes)) * 100).toFixed(1));
                                        temp.doelpogingen = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Doelpogingen'})[0][temp.personID]);
                                        temp.doelpogingen_opdoel = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Doelpogingen op doel'})[0][temp.personID].split("%")[0]);
                                        temp.voorzetten = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Voorzetten'})[0][temp.personID]);
                                        temp.gewonnen_duels = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Gewonnen duels'})[0][temp.personID].split("%")[0]);
                                        temp.intercepties = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Intercepties'})[0][temp.personID]);
                                        temp.overtredingen = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Overtredingen'})[0][temp.personID]);
                                        temp.geel = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Gele kaarten'})[0][temp.personID]);
                                        temp.rood = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Rode kaart'})[0][temp.personID]);
                                        temp.verdedigende_duels = Number_converter((value.algemene_stats[6][0][0]));
                                        temp.aanvallende_duels = Number_converter((value.algemene_stats[4][0][0]));
                                        temp.pass_lengte = Number_converter((Number_converter(value.pass_soorten_helft1[temp.personID][0].gem_len.split("m")[0]) + Number_converter(value.pass_soorten_helft2[temp.personID][0].gem_len.split("m")[0]) / 2).toFixed(1));
                                    }
                                    player_data.player_stats_uit.push(temp);
                                });

                                items.player_stats_full_uit = [];
                                _.each(data.uitSpelers_data, function (value, key) {
                                    var temp = {};
                                    temp.spelerType = (value.stat_matrix.type[0]);
                                    temp.personID = Number_converter(value.speler[0]);
                                    if (value.leeftijd) {
                                        temp.spelerLeeftijd = value.leeftijd[0];
                                    }
                                    if (value.nationaliteit) {
                                        temp.spelerNationaliteit = value.nationaliteit[0];
                                    }
                                    forEach(items.spelersuitteam, function (value1, key1) {
                                        if (value1.personID == temp.personID) {
                                            temp.spelerNaam = (value1.spelerNaam);
                                            temp.spelerRugnummer = Number_converter((value1.rugnummer));
                                            temp.spelerPhoto = (value1.spelerPhoto);
                                            temp.spelerGeboortedatum = (value1.spelerGeboortedatum);
                                        }

                                        if (_.where(speler_profiel_uit, {spelerID: value1.personID})) {
                                            forEach(_.where(speler_profiel_uit, {spelerID: value1.personID}), function (value2, key2) {
                                                if (value2.seizoen === 'Seizoen ' + items.seizoen) {
                                                    if (!value2.spelerRugnummer) {
                                                        value2.spelerRugnummer = Number_converter((value1.rugnummer));
                                                    }
                                                    if (!value2.spelerType) {
                                                        value2.spelerType = temp.type;
                                                    }

                                                    var ingevallen = 0;
                                                    var vervangen = 0;
                                                    if (value1.ingevallen) ingevallen = 1;
                                                    if (value1.vervangen) vervangen = 1;
                                                    var doelpunten = 0;
                                                    var voorzetten = 0;
                                                    var minuten = 0;
                                                    var geel = 0;
                                                    var rood = 0;
                                                    if (_.where(value.stat_matrix.speler_mat, {_row: 'Doelpunten'})[0]) doelpunten = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Doelpunten'})[0][temp.personID]);
                                                    if (_.where(value.stat_matrix.speler_mat, {_row: 'Voorzetten'})[0]) voorzetten = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Voorzetten'})[0][temp.personID]);
                                                    if (_.where(value.stat_matrix.speler_mat, {_row: 'Minuten'})[0]) minuten = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Minuten'})[0][temp.personID]);
                                                    if (_.where(value.stat_matrix.speler_mat, {_row: 'Gele kaarten'})[0]) geel = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Gele kaarten'})[0][temp.personID]);
                                                    if (_.where(value.stat_matrix.speler_mat, {_row: 'Rode kaart'})[0]) rood = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Rode kaart'})[0][temp.personID]);

                                                    if (!value2.laatste_ronde_sync || value2.laatste_ronde_sync == null || value2.laatste_ronde_sync === "null" || value2.laatste_ronde_sync === undefined) {
                                                        Spelers.update({
                                                            _id: value2._id
                                                        }, {
                                                            spelerGeboorteland: value1.spelerNationaliteit,
                                                            spelerGeboortedatum: value1.spelerGeboortedatum,
                                                            spelerRugnummer: value2.spelerRugnummer,
                                                            spelerType: value2.spelerType,
                                                            date_edited: datetime,

                                                            laatste_ronde_sync: items.ronde,
                                                            wedstrijden: 1,
                                                            hele_wedstrijd: 0,
                                                            ingevallen: ingevallen || 0,
                                                            vervangen: vervangen || 0,
                                                            doelpunten: doelpunten || 0,
                                                            voorzetten: voorzetten || 0,
                                                            penalties: (Number_converter((value.algemene_stats[9][0][0])) + Number_converter((value.algemene_stats[10][0][0]))) || 0,
                                                            minuten: minuten || 0,
                                                            geel: geel || 0,
                                                            rood: rood || 0,
                                                            tweede_geel: Number_converter((value.algemene_stats[15][0][0])) || 0
                                                        }, function (err, data) {
                                                            if (err) throw err;
                                                        });
                                                    } else if (value2.laatste_ronde_sync != items.ronde && value2.laatste_ronde_sync < items.ronde) {
                                                        Spelers.update({
                                                            _id: value2._id
                                                        }, {
                                                            spelerGeboorteland: value1.spelerNationaliteit,
                                                            spelerGeboortedatum: value1.spelerGeboortedatum,
                                                            spelerRugnummer: value2.spelerRugnummer,
                                                            spelerType: value2.spelerType,
                                                            date_edited: datetime,

                                                            laatste_ronde_sync: items.ronde,
                                                            wedstrijden: value2.wedstrijden + 1,
                                                            hele_wedstrijd: value2.hele_wedstrijd,
                                                            ingevallen: value2.ingevallen + ingevallen,
                                                            vervangen: value2.vervangen + vervangen,
                                                            doelpunten: value2.doelpunten + doelpunten,
                                                            voorzetten: value2.voorzetten + voorzetten,
                                                            penalties: value2.penalties + Number_converter((value.algemene_stats[9][0][0])) + Number_converter((value.algemene_stats[10][0][0])),
                                                            minuten: value2.minuten + minuten,
                                                            geel: value2.geel + geel,
                                                            rood: value2.rood + rood,
                                                            tweede_geel: value2.tweede_geel + Number_converter((value.algemene_stats[15][0][0]))
                                                        }, function (err, data) {
                                                            if (err) throw err;
                                                        });
                                                    }
                                                }
                                            });
                                            if (!_.where(_.where(speler_profiel_uit, {spelerID: value1.personID}), {seizoen: 'Seizoen ' + items.seizoen})) {
                                                var ingevallen = 0;
                                                var vervangen = 0;
                                                if (value1.ingevallen) ingevallen = 1;
                                                if (value1.vervangen) vervangen = 1;
                                                var doelpunten = 0;
                                                var voorzetten = 0;
                                                var minuten = 0;
                                                var geel = 0;
                                                var rood = 0;
                                                if (_.where(value.stat_matrix.speler_mat, {_row: 'Doelpunten'})[0]) doelpunten = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Doelpunten'})[0][temp.personID]);
                                                if (_.where(value.stat_matrix.speler_mat, {_row: 'Voorzetten'})[0]) voorzetten = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Voorzetten'})[0][temp.personID]);
                                                if (_.where(value.stat_matrix.speler_mat, {_row: 'Minuten'})[0]) minuten = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Minuten'})[0][temp.personID]);
                                                if (_.where(value.stat_matrix.speler_mat, {_row: 'Gele kaarten'})[0]) geel = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Gele kaarten'})[0][temp.personID]);
                                                if (_.where(value.stat_matrix.speler_mat, {_row: 'Rode kaart'})[0]) rood = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Rode kaart'})[0][temp.personID]);

                                                Spelers.create({
                                                    spelerID: Number_converter(value1.personID),
                                                    spelerNaam: value1.spelerNaam,
                                                    spelerGeboorteland: value1.spelerNationaliteit,
                                                    spelerGeboortedatum: value1.spelerGeboortedatum,
                                                    spelerRugnummer: Number_converter(value1.rugnummer),
                                                    seizoen: 'Seizoen ' + items.seizoen,
                                                    clubNaam: match_short.match_info.uit,
                                                    clubID: items.uitTeamID,
                                                    date_edited: datetime,

                                                    laatste_ronde_sync: items.ronde,
                                                    wedstrijden: 1,
                                                    hele_wedstrijd: 0,
                                                    ingevallen: ingevallen || 0,
                                                    vervangen: vervangen || 0,
                                                    doelpunten: doelpunten || 0,
                                                    voorzetten: voorzetten || 0,
                                                    penalties: (Number_converter((value.algemene_stats[9][0][0])) + Number_converter((value.algemene_stats[10][0][0]))) || 0,
                                                    minuten: minuten || 0,
                                                    geel: geel || 0,
                                                    rood: rood || 0,
                                                    tweede_geel: Number_converter((value.algemene_stats[15][0][0])) || 0
                                                }, function (err, data) {
                                                });
                                            }
                                        } else {
                                            var ingevallen = 0;
                                            var vervangen = 0;
                                            if (value1.ingevallen) ingevallen = 1;
                                            if (value1.vervangen) vervangen = 1;
                                            var doelpunten = 0;
                                            var voorzetten = 0;
                                            var minuten = 0;
                                            var geel = 0;
                                            var rood = 0;
                                            if (_.where(value.stat_matrix.speler_mat, {_row: 'Doelpunten'})[0]) doelpunten = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Doelpunten'})[0][temp.personID]);
                                            if (_.where(value.stat_matrix.speler_mat, {_row: 'Voorzetten'})[0]) voorzetten = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Voorzetten'})[0][temp.personID]);
                                            if (_.where(value.stat_matrix.speler_mat, {_row: 'Minuten'})[0]) minuten = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Minuten'})[0][temp.personID]);
                                            if (_.where(value.stat_matrix.speler_mat, {_row: 'Gele kaarten'})[0]) geel = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Gele kaarten'})[0][temp.personID]);
                                            if (_.where(value.stat_matrix.speler_mat, {_row: 'Rode kaart'})[0]) rood = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Rode kaart'})[0][temp.personID]);

                                            Spelers.create({
                                                spelerID: Number_converter(value1.personID),
                                                spelerNaam: value1.spelerNaam,
                                                spelerGeboorteland: value1.spelerNationaliteit,
                                                spelerGeboortedatum: value1.spelerGeboortedatum,
                                                spelerRugnummer: Number_converter(value1.rugnummer),
                                                seizoen: 'Seizoen ' + items.seizoen,
                                                clubNaam: match_short.match_info.thuis,
                                                clubID: items.thuisTeamID,
                                                date_edited: datetime,

                                                laatste_ronde_sync: items.ronde,
                                                wedstrijden: 1,
                                                hele_wedstrijd: 0,
                                                ingevallen: ingevallen || 0,
                                                vervangen: vervangen || 0,
                                                doelpunten: doelpunten || 0,
                                                voorzetten: voorzetten || 0,
                                                penalties: (Number_converter((value.algemene_stats[9][0][0])) + Number_converter((value.algemene_stats[10][0][0]))) || 0,
                                                minuten: minuten || 0,
                                                geel: geel || 0,
                                                rood: rood || 0,
                                                tweede_geel: Number_converter((value.algemene_stats[15][0][0])) || 0
                                            }, function (err, data) {
                                            });
                                        }
                                    });
                                    if (temp.spelerType == 'keeper') {
                                        temp.minuten = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Minuten'})[0][temp.personID]);
                                        temp.reddingen = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Reddingen'})[0][temp.personID]);
                                        temp.geslaagde_reddingen = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Geslaagde reddingen'})[0][temp.personID].split("%")[0]);
                                        temp.korte_passes = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Aantal korte passes'})[0][temp.personID]);
                                        temp.middellange_passes = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Aantal middellange passes'})[0][temp.personID]);
                                        temp.lange_passes = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Aantal lange passes'})[0][temp.personID]);
                                        temp.pass_percentage = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Geslaagde passes'})[0][temp.personID].split("%")[0]);
                                        temp.gevangen_ballen = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Gevangen ballen'})[0][temp.personID]);
                                        temp.weggestompte_ballen = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Weggestompte ballen'})[0][temp.personID]);
                                        temp.succesvolle_uittrappen = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Succesvolle uittrappen'})[0][temp.personID].split("%")[0]);
                                        temp.geel = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Gele kaarten'})[0][temp.personID]);
                                        temp.rood = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Rode kaart'})[0][temp.personID]);
                                        temp.doelpunten_tegen = Number_converter(match_short.match_info.eindstand.split(" - ", 1)[0]);
                                        temp.pass_lengte = Number_converter((Number_converter(value.pass_soorten_helft1[temp.personID][0].gem_len.split("m")[0]) + Number_converter(value.pass_soorten_helft2[temp.personID][0].gem_len.split("m")[0]) / 2).toFixed(1));

                                        temp.doelpunten = Number_converter((value.algemene_stats[1][0][0]));

                                        temp.locatie_reddingen = [];
                                        forEach(value.locaties_reddingen, function (value, key1) {
                                            var temp1 = {};
                                            temp1.zend_length = Number_converter(value.zend_length);
                                            temp1.zend_width = Number_converter(value.zend_width);
                                            temp1.ontvang_length = Number_converter(value.ontvang_length);
                                            temp1.ontvang_width = Number_converter(value.ontvang_width);
                                            temp1.actie = (value.actie);

                                            temp.locatie_reddingen.push(temp1);
                                        });

                                        temp.locatie_uittrappen = [];
                                        forEach(value.locaties_uittrappen, function (value, key1) {
                                            var temp1 = {};
                                            temp1.zend_length = Number_converter(value.zend_lengte);
                                            temp1.zend_width = Number_converter(value.zend_breedte);
                                            temp1.ontvang_length = Number_converter(value.ontvang_lengte[0]);
                                            temp1.ontvang_width = Number_converter(value.ontvang_breedte[0]);
                                            forEach(items.spelersthuisteam, function (value1, key1) {
                                                if (value1.personID == value.teamgenoot) {
                                                    temp1.teamgenootID = (value1.personID);
                                                    temp1.teamgenoot = (value1.spelerNaam);
                                                }
                                            });
                                            forEach(items.spelersuitteam, function (value1, key1) {
                                                if (value1.personID == value.teamgenoot) {
                                                    temp1.teamgenootID = (value1.personID);
                                                    temp1.teamgenoot = (value1.spelerNaam);
                                                }
                                            });
                                            temp.locatie_uittrappen.push(temp1);
                                        });
                                    } else {
                                        temp.minuten = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Minuten'})[0][temp.personID]);
                                        temp.doelpunten = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Doelpunten'})[0][temp.personID]);
                                        temp.aantal_passes = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Aantal passes'})[0][temp.personID]);
                                        temp.geslaagde_passes = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Geslaagde passes'})[0][temp.personID]);
                                        temp.pass_percentage = Number_converter((Number_converter(temp.geslaagde_passes) / Number_converter(temp.aantal_passes)) * 100).toFixed(1);
                                        temp.doelpogingen = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Doelpogingen'})[0][temp.personID]);
                                        temp.doelpogingen_opdoel = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Doelpogingen op doel'})[0][temp.personID].split("%")[0]);
                                        temp.voorzetten = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Voorzetten'})[0][temp.personID]);
                                        temp.gewonnen_duels = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Gewonnen duels'})[0][temp.personID].split("%")[0]);
                                        temp.intercepties = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Intercepties'})[0][temp.personID]);
                                        temp.overtredingen = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Overtredingen'})[0][temp.personID]);
                                        temp.geel = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Gele kaarten'})[0][temp.personID]);
                                        temp.rood = Number_converter(_.where(value.stat_matrix.speler_mat, {_row: 'Rode kaart'})[0][temp.personID]);
                                        temp.verdedigende_duels = Number_converter((value.algemene_stats[6][0][0]));
                                        temp.aanvallende_duels = Number_converter((value.algemene_stats[4][0][0]));
                                        temp.pass_lengte = Number_converter((Number_converter(value.pass_soorten_helft1[temp.personID][0].gem_len.split("m")[0]) + Number_converter(value.pass_soorten_helft2[temp.personID][0].gem_len.split("m")[0]) / 2).toFixed(1));

                                        temp.aanvallende_acties_helft1 = {};
                                        temp.aanvallende_acties_helft1.aanvallende_duels = (value.aanvallende_acties_helft1[0][0][0]);
                                        temp.aanvallende_acties_helft1.aanvallende_duels_gewonnen = (value.aanvallende_acties_helft1[1][0][0]);
                                        temp.aanvallende_acties_helft1.dribbels = (value.aanvallende_acties_helft1[2][0][0]);
                                        temp.aanvallende_acties_helft1.schoten = (value.aanvallende_acties_helft1[3][0][0]);
                                        temp.aanvallende_acties_helft1.schoten_doel = (value.aanvallende_acties_helft1[4][0][0]);
                                        temp.aanvallende_acties_helft1.schoten_ijzer = (value.aanvallende_acties_helft1[5][0][0]);
                                        temp.aanvallende_acties_helft1.schoten_naast = (value.aanvallende_acties_helft1[6][0][0]);
                                        temp.aanvallende_acties_helft1.schoten_over = (value.aanvallende_acties_helft1[7][0][0]);
                                        temp.aanvallende_acties_helft1.schoten_geblokkeerd = (value.aanvallende_acties_helft1[8][0][0]);
                                        temp.aanvallende_acties_helft1.schoten_binnen16 = (value.aanvallende_acties_helft1[9][0][0]);
                                        temp.aanvallende_acties_helft1.schoten_buiten16 = (value.aanvallende_acties_helft1[10][0][0]);
                                        temp.aanvallende_acties_helft1.sleutel_acties = (value.aanvallende_acties_helft1[11][0][0]);
                                        temp.aanvallende_acties_helft1.sleutel_passes = (value.aanvallende_acties_helft1[12][0][0]);
                                        temp.aanvallende_acties_helft1.kruisballen = (value.aanvallende_acties_helft1[13][0][0]);

                                        temp.aanvallende_acties_helft2 = {};
                                        temp.aanvallende_acties_helft2.aanvallende_duels = (value.aanvallende_acties_helft2[0][0][0]);
                                        temp.aanvallende_acties_helft2.aanvallende_duels_gewonnen = (value.aanvallende_acties_helft2[1][0][0]);
                                        temp.aanvallende_acties_helft2.dribbels = (value.aanvallende_acties_helft2[2][0][0]);
                                        temp.aanvallende_acties_helft2.schoten = (value.aanvallende_acties_helft2[3][0][0]);
                                        temp.aanvallende_acties_helft2.schoten_doel = (value.aanvallende_acties_helft2[4][0][0]);
                                        temp.aanvallende_acties_helft2.schoten_ijzer = (value.aanvallende_acties_helft2[5][0][0]);
                                        temp.aanvallende_acties_helft2.schoten_naast = (value.aanvallende_acties_helft2[6][0][0]);
                                        temp.aanvallende_acties_helft2.schoten_over = (value.aanvallende_acties_helft2[7][0][0]);
                                        temp.aanvallende_acties_helft2.schoten_geblokkeerd = (value.aanvallende_acties_helft2[8][0][0]);
                                        temp.aanvallende_acties_helft2.schoten_binnen16 = (value.aanvallende_acties_helft2[9][0][0]);
                                        temp.aanvallende_acties_helft2.schoten_buiten16 = (value.aanvallende_acties_helft2[10][0][0]);
                                        temp.aanvallende_acties_helft2.sleutel_acties = (value.aanvallende_acties_helft2[11][0][0]);
                                        temp.aanvallende_acties_helft2.sleutel_passes = (value.aanvallende_acties_helft2[12][0][0]);
                                        temp.aanvallende_acties_helft2.kruisballen = (value.aanvallende_acties_helft2[13][0][0]);

                                        temp.dode_spel_momenten = {};
                                        temp.dode_spel_momenten.ingooien = (value.dode_spel_momenten[0][0][0]);
                                        temp.dode_spel_momenten.hoekschoppen = (value.dode_spel_momenten[1][0][0]);
                                        temp.dode_spel_momenten.vrije_trappen = (value.dode_spel_momenten[2][0][0]);
                                        temp.dode_spel_momenten.vrije_trappen_direct = (value.dode_spel_momenten[3][0][0]);
                                        temp.dode_spel_momenten.vrije_trappen_indirect = (value.dode_spel_momenten[4][0][0]);

                                        temp.locatie_voorzetten = [];
                                        forEach(value.locatie_voorzetten[temp.personID], function (value, key1) {
                                            var temp1 = {};
                                            temp1.zend_lengte = (value.zend_lengte);
                                            temp1.zend_breedte = (value.zend_breedte);
                                            temp1.doelpoging_na_3 = (value.doelpoging_na_3);

                                            temp.locatie_voorzetten.push(temp1);
                                        });

                                        temp.locatie_aanvallende_duels = [];
                                        forEach(value.locaties_aanvallende_duels[temp.personID], function (value, key1) {
                                            var temp1 = {};
                                            temp1.locationInFieldLength = (value.locationInFieldLength);
                                            temp1.locationInFieldWidth = (value.locationInFieldWidth);
                                            temp1.gewonnen = (value.gewonnen);
                                            temp1.duel_type = (value.duel_type);

                                            temp.locatie_aanvallende_duels.push(temp1);
                                        });

                                        temp.locatie_doelpogingen = [];
                                        forEach(value.locaties_doelpogingen[temp.personID], function (value, key1) {
                                            var temp1 = {};
                                            temp1.locationInFieldLength = (value.locationInFieldLength);
                                            temp1.locationInFieldWidth = (value.locationInFieldWidth);
                                            temp1.lichaamsdeel = (value.lichaamsdeel);
                                            temp1.minuut_tot_string = (value.minuut_tot_string);
                                            temp1.type = (value.type);

                                            temp.locatie_doelpogingen.push(temp1);
                                        });
                                    }

                                    temp.eigen_doelpunten = Number_converter((value.algemene_stats[2][0][0]));
                                    temp.aantal_acties = Number_converter((value.algemene_stats[3][0][0]));
                                    temp.aantal_aanvallende_duels = Number_converter((value.algemene_stats[4][0][0]));
                                    temp.aantal_aanvallende_duels_gewonnen = Number_converter((value.algemene_stats[5][0][0]));
                                    temp.aantal_verdedigende_duels = Number_converter((value.algemene_stats[6][0][0]));
                                    temp.aantal_verdedigende_duels_gewonnen = Number_converter((value.algemene_stats[7][0][0]));
                                    temp.assists = Number_converter((value.algemene_stats[8][0][0]));
                                    temp.penalties_gescoord = Number_converter((value.algemene_stats[9][0][0]));
                                    temp.penalties_gemist = Number_converter((value.algemene_stats[10][0][0]));
                                    temp.aantal_buitenspel = Number_converter((value.algemene_stats[11][0][0]));
                                    temp.overtredingen_tegen = Number_converter((value.algemene_stats[12][0][0]));
                                    temp.overtredingen_mee = Number_converter((value.algemene_stats[13][0][0]));
                                    temp.tweede_geel = Number_converter((value.algemene_stats[15][0][0]));

                                    temp.verdedigende_acties_helft1 = {};
                                    temp.verdedigende_acties_helft1.verdedigende_duels = (value.verdedigende_acties_helft1[0][0][0]);
                                    temp.verdedigende_acties_helft1.verdedigende_duels_gewonnen = (value.verdedigende_acties_helft1[1][0][0]);
                                    temp.verdedigende_acties_helft1.intercepties = (value.verdedigende_acties_helft1[2][0][0]);
                                    temp.verdedigende_acties_helft1.luchtduels = (value.verdedigende_acties_helft1[3][0][0]);
                                    temp.verdedigende_acties_helft1.slidingduels = (value.verdedigende_acties_helft1[4][0][0]);
                                    temp.verdedigende_acties_helft1.staande_duels = (value.verdedigende_acties_helft1[5][0][0]);
                                    temp.verdedigende_acties_helft1.wegwerken = (value.verdedigende_acties_helft1[6][0][0]);
                                    temp.verdedigende_acties_helft1.blokkeren_schot = (value.verdedigende_acties_helft1[7][0][0]);

                                    temp.verdedigende_acties_helft2 = {};
                                    temp.verdedigende_acties_helft2.verdedigende_duels = (value.verdedigende_acties_helft2[0][0][0]);
                                    temp.verdedigende_acties_helft2.verdedigende_duels_gewonnen = (value.verdedigende_acties_helft2[1][0][0]);
                                    temp.verdedigende_acties_helft2.intercepties = (value.verdedigende_acties_helft2[2][0][0]);
                                    temp.verdedigende_acties_helft2.luchtduels = (value.verdedigende_acties_helft2[3][0][0]);
                                    temp.verdedigende_acties_helft2.slidingduels = (value.verdedigende_acties_helft2[4][0][0]);
                                    temp.verdedigende_acties_helft2.staande_duels = (value.verdedigende_acties_helft2[5][0][0]);
                                    temp.verdedigende_acties_helft2.wegwerken = (value.verdedigende_acties_helft2[6][0][0]);
                                    temp.verdedigende_acties_helft2.blokkeren_schot = (value.verdedigende_acties_helft2[7][0][0]);

                                    temp.passes_helft1 = [];
                                    forEach(value.passes_helft1[temp.personID], function (value, key1) {
                                        var temp1 = {};
                                        temp1.aan = value['Passes gegeven aan'];
                                        temp1.van = value['Passes gekregen van'];
                                        forEach(items.spelersthuisteam, function (value1, key1) {
                                            if (value1.personID == value._row) {
                                                temp1.personID = (value1.personID);
                                                temp1._row = (value1.spelerNaam);
                                            }
                                        });
                                        forEach(items.spelersuitteam, function (value1, key1) {
                                            if (value1.personID == value._row) {
                                                temp1.personID = (value1.personID);
                                                temp1._row = (value1.spelerNaam);
                                            }
                                        });
                                        if (value._row == 'TOTAAL') {
                                            temp1._row = 'Totaal';
                                        }
                                        temp.passes_helft1.push(temp1);
                                    });

                                    temp.passes_helft2 = [];
                                    forEach(value.passes_helft2[temp.personID], function (value, key1) {
                                        var temp1 = {};
                                        temp1.aan = value['Passes gegeven aan'];
                                        temp1.van = value['Passes gekregen van'];
                                        forEach(items.spelersthuisteam, function (value1, key1) {
                                            if (value1.personID == value._row) {
                                                temp1.personID = (value1.personID);
                                                temp1._row = (value1.spelerNaam);
                                            }
                                        });
                                        forEach(items.spelersuitteam, function (value1, key1) {
                                            if (value1.personID == value._row) {
                                                temp1.personID = (value1.personID);
                                                temp1._row = (value1.spelerNaam);
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
                                    forEach(value.locaties_verdedigende_duels[temp.personID], function (value, key1) {
                                        var temp1 = {};
                                        temp1.locationInFieldLength = (value.locationInFieldLength);
                                        temp1.locationInFieldWidth = (value.locationInFieldWidth);
                                        temp1.gewonnen = (value.gewonnen);
                                        temp1.duel_type = (value.duel_type);

                                        temp.locatie_verdedigende_duels.push(temp1);
                                    });

                                    items.player_stats_full_uit.push(temp);
                                });
                            }

                            if (match_short.match_info.thuis === 'Almere City FC') {
                                match_short.match_info.thuis_kort = 'Almere City';
                            }
                            else if (match_short.match_info.thuis === 'Roda JC Kerkrade') {
                                match_short.match_info.thuis_kort = 'Roda JC';
                            }
                            else if (match_short.match_info.thuis === 'FC Eindhoven') {
                                match_short.match_info.thuis_kort = 'Eindhoven';
                            }
                            else if (match_short.match_info.thuis === 'FC Volendam') {
                                match_short.match_info.thuis_kort = 'Volendam';
                            }
                            else if (match_short.match_info.thuis === 'FC Den Bosch') {
                                match_short.match_info.thuis_kort = 'Den Bosch';
                            }
                            else if (match_short.match_info.thuis === 'SC Telstar') {
                                match_short.match_info.thuis_kort = 'Telstar';
                            }
                            else if (match_short.match_info.thuis === 'VVV-Venlo') {
                                match_short.match_info.thuis_kort = 'VVV';
                            }
                            else {
                                match_short.match_info.thuis_kort = (match_short.match_info.thuis);
                            }

                            if (match_short.match_info.uit === 'Almere City FC') {
                                match_short.match_info.uit_kort = 'Almere City';
                            }
                            else if (match_short.match_info.uit === 'Roda JC Kerkrade') {
                                match_short.match_info.uit_kort = 'Roda JC';
                            }
                            else if (match_short.match_info.uit === 'FC Eindhoven') {
                                match_short.match_info.uit_kort = 'Eindhoven';
                            }
                            else if (match_short.match_info.uit === 'FC Volendam') {
                                match_short.match_info.uit_kort = 'Volendam';
                            }
                            else if (match_short.match_info.uit === 'FC Den Bosch') {
                                match_short.match_info.uit_kort = 'Den Bosch';
                            }
                            else if (match_short.match_info.uit === 'SC Telstar') {
                                match_short.match_info.uit_kort = 'Telstar';
                            }
                            else if (match_short.match_info.uit === 'VVV-Venlo') {
                                match_short.match_info.uit_kort = 'VVV';
                            }
                            else {
                                match_short.match_info.uit_kort = (match_short.match_info.uit);
                            }

                            match_data = {};
                            match_data = items;
                        }
                    }, 100);
                    _.delay(function () {
                        if (data && match_data && match_short && team_data) {

                            if (team_data.thuis) {
                                var club_slug = match_short.thuisTeamSlug;
                                var team_slug;

                                // check if club exists, otherwise create one
                                Club.findOne({_slug: club_slug}, function (err, res) {
                                    var clubdata = res;

                                    if (clubdata == null) {
                                        // create team and teamID with the season
                                        var teams = [];
                                        var teamstemp = {};
                                        teamstemp.team_name = '1';
                                        teamstemp.team_slug = club_slug + '_' + teamstemp.team_name.trim().toLowerCase().replace(/\s+/g, '');
                                        teamstemp.teamID = [];
                                        var teamstemp2 = {};
                                        teamstemp2.ID = match_short.thuisTeamID;
                                        teamstemp2.season = match_short.seizoen;
                                        teamstemp.teamID.push(teamstemp2);
                                        teamstemp.coach = match_short.match_info.coach_thuis;
                                        teamstemp.divisie = match_short.divisie;
                                        teams.push(teamstemp);

                                        match_short.thuisTeamSlug = teamstemp.team_slug;
                                        items.thuisTeamSlug = teamstemp.team_slug;
                                        team_slug = teamstemp.team_slug;

                                        Club.create({
                                            _slug: club_slug,
                                            name: match_short.match_info.thuis,
                                            logo: match_short.match_info.thuis + '.jpg',
                                            teams: teams,
                                            date_edited: datetime
                                        }, function (err, data) {
                                            if (err) console.log(err);
                                        });
                                    } else {
                                        // check if team exists, otherwise create one or both
                                        // check if teamID exits otherwise create for the season
                                        if (_.where(clubdata.teams, {divisie: match_short.divisie})) {
                                            var teamstemp3 = '';
                                            teamstemp3 = _.where(clubdata.teams, {divisie: match_short.divisie})[0];
                                            if (!(_.where(teamstemp3.teamID, {season: match_short.seizoen})[0])) {
                                                // create teamID
                                                forEach(clubdata.teams, function (value, key) {
                                                    if (value.divisie == match_short.divisie) {
                                                        var temp = {};
                                                        temp.ID = match_short.thuisTeamID;
                                                        temp.season = match_short.seizoen;
                                                        value.teamID.push(temp);
                                                    }
                                                });

                                                Club.update({
                                                    _id: clubdata._id
                                                }, {
                                                    teams: clubdata.teams,
                                                    date_edited: datetime
                                                }, function (err, data) {
                                                    if (err) console.log(err);
                                                });
                                            }
                                            team_slug = teamstemp3.team_slug;
                                            //match_short.match_info.coach_thuis = teamstemp3.coach;
                                            match_short.thuisTeamSlug = teamstemp3.team_slug;
                                            items.thuisTeamSlug = teamstemp3.team_slug;
                                        } else {
                                            // create team + teamID
                                            var teamstemp4 = {};
                                            teamstemp4.team_name = '1';
                                            teamstemp4.team_slug = club_slug + '_' + teamstemp4.team_name.trim().toLowerCase().replace(/\s+/g, '');
                                            teamstemp4.teamID = [];
                                            var teamstemp5 = {};
                                            teamstemp5.ID = match_short.thuisTeamID;
                                            teamstemp5.season = match_short.seizoen;
                                            teamstemp4.teamID.push(teamstemp5);
                                            teamstemp4.coach = match_short.match_info.coach_thuis;
                                            teamstemp4.divisie = match_short.divisie;
                                            clubdata.teams.push(teamstemp4);

                                            match_short.thuisTeamSlug = teamstemp4.team_slug;
                                            items.thuisTeamSlug = teamstemp4.team_slug;
                                            team_slug = teamstemp4.team_slug;

                                            Club.update({
                                                _id: clubdata._id
                                            }, {
                                                teams: clubdata.teams,
                                                date_edited: datetime
                                            }, function (err, data) {
                                                if (err) console.log(err);
                                            });
                                        }
                                    }

                                    TeamData.findOne({team_slug: team_slug}, function (err, res) {
                                        var teamdata = res;

                                        // if not working right why?
                                        if (teamdata == null) {
                                            // create teamdata
                                            // create season and round and add teamdata
                                            teamdata = {};
                                            teamdata.team_slug = team_slug;
                                            teamdata.team_name = '1';
                                            teamdata.divisie = match_short.divisie;
                                            teamdata.club_name = match_short.match_info.thuis;
                                            teamdata.club_slug = club_slug;
                                            teamdata.team_data = [];
                                            var team_data_temp3 = {};
                                            team_data_temp3.season = match_short.seizoen;
                                            team_data_temp3.matches = [];
                                            team_data_temp3.matches.push(team_data.thuis);
                                            teamdata.team_data.push(team_data_temp3);

                                            // create all players and create season and round and add playerdata
                                            teamdata.player_data = [];
                                            forEach(player_data.player_stats_thuis, function (value, key1) {
                                                var temp = {};
                                                temp.playerID = value.personID;
                                                temp.spelerNaam = value.spelerNaam;
                                                temp.spelerType = value.type;
                                                temp.spelerRugnummer = value.spelerRugnummer;
                                                temp.spelerPhoto = value.spelerPhoto;
                                                temp.spelerNationaliteit = value.spelerNationaliteit;
                                                temp.spelerGeboortedatum = value.spelerGeboortedatum;
                                                temp.matches = [];
                                                var temp1 = {};
                                                temp1.season = match_short.seizoen;
                                                temp1.match = [];
                                                var temp2 = {};
                                                temp2.spelerLeeftijd = value.spelerLeeftijd;
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

                                            TeamData.create(teamdata, function (err, data) {
                                                if (err) console.log(err);
                                            });
                                        } else {
                                            // check season and round, and change or add teamdata
                                            if (teamdata.team_data) {

                                                // Working properly for now if statement
                                                if (_.where(teamdata.team_data, {season: match_short.seizoen})[0]) {
                                                    forEach(teamdata.team_data, function (value, key) {
                                                        if (value.season == match_short.seizoen) {
                                                            // check if round exists
                                                            if (_.where(value.matches, {ronde: team_data.thuis.ronde})[0]) {
                                                                forEach(value.matches, function (value1, key1) {
                                                                    if (value1.ronde == team_data.thuis.ronde) {
                                                                        value1.wedstrijd = team_data.thuis.wedstrijd;
                                                                        value1.datum = team_data.thuis.datum;
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
                                                                        value1.team_leeftijd = team_data.thuis.team_leeftijd;
                                                                    }
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
                                                _.each(player_data.player_stats_thuis, function (value, key) {
                                                    if (!(_.where(teamdata.player_data, {playerID: value.personID})[0])) {
                                                        var temp = {};
                                                        temp.playerID = value.personID;
                                                        temp.spelerNaam = value.spelerNaam;
                                                        temp.spelerType = value.type;
                                                        temp.spelerRugnummer = value.spelerRugnummer;
                                                        temp.spelerPhoto = value.spelerPhoto;
                                                        temp.spelerNationaliteit = value.spelerNationaliteit;
                                                        temp.spelerGeboortedatum = value.spelerGeboortedatum;
                                                        temp.matches = [];

                                                        var temp1 = {};
                                                        temp1.season = match_short.seizoen;
                                                        temp1.match = [];

                                                        var temp2 = {};
                                                        temp2.spelerLeeftijd = value.spelerLeeftijd;
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
                                                    } else {
                                                        forEach(teamdata.player_data, function (value1, key1) {
                                                            if (value.personID == value1.playerID && value.type == value1.spelerType) {
                                                                value1.spelerNaam = value.spelerNaam;
                                                                value1.spelerRugnummer = value.spelerRugnummer;
                                                                value1.spelerPhoto = value.spelerPhoto;
                                                                value1.spelerNationaliteit = value.spelerNationaliteit;
                                                                value1.spelerGeboortedatum = value.spelerGeboortedatum;

                                                                if (value1.matches) {
                                                                    if (_.where(value1.matches, {season: match_short.seizoen})[0]) {
                                                                        forEach(value1.matches, function (value2, key2) {
                                                                            if (value2.season == match_short.seizoen) {
                                                                                // check if round exists
                                                                                if (_.where(value2.match, {ronde: value.ronde})[0]) {
                                                                                    forEach(value2.match, function (value3, key3) {
                                                                                        if (value3.ronde == value.ronde) {
                                                                                            value3.spelerLeeftijd = value.spelerLeeftijd;
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
                                                                                    temp2.spelerLeeftijd = value.spelerLeeftijd;
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
                                                                        var temp11 = {};
                                                                        temp11.season = match_short.seizoen;
                                                                        temp11.match = [];

                                                                        var temp21 = {};
                                                                        temp21.spelerLeeftijd = value.spelerLeeftijd;
                                                                        temp21.wedstrijd = value.match;
                                                                        temp21.eindstand = value.result;
                                                                        temp21.datum = value.date;
                                                                        temp21.ronde = value.ronde;
                                                                        temp21.matchID = value.matchID;
                                                                        temp21.minuten = value.minuten;
                                                                        temp21.pass_percentage = value.pass_percentage;
                                                                        temp21.pass_lengte = value.pass_lengte;
                                                                        temp21.geel = value.geel;
                                                                        temp21.rood = value.rood;
                                                                        temp21.doelpunten = value.doelpunten;
                                                                        temp21.aantal_passes = value.aantal_passes;
                                                                        temp21.geslaagde_passes = value.geslaagde_passes;
                                                                        temp21.voorzetten = value.voorzetten;
                                                                        temp21.doelpogingen = value.doelpogingen;
                                                                        temp21.doelpogingen_opdoel = value.doelpogingen_opdoel;
                                                                        temp21.aanvallende_duels = value.aanvallende_duels;
                                                                        temp21.verdedigende_duels = value.verdedigende_duels;
                                                                        temp21.gewonnen_duels = value.gewonnen_duels;
                                                                        temp21.intercepties = value.intercepties;
                                                                        temp21.overtredingen = value.overtredingen;
                                                                        temp21.reddingen = value.reddingen;
                                                                        temp21.geslaagde_reddingen = value.geslaagde_reddingen;
                                                                        temp21.korte_passes = value.korte_passes;
                                                                        temp21.middellange_passes = value.middellange_passes;
                                                                        temp21.lange_passes = value.lange_passes;
                                                                        temp21.succesvolle_uittrappen = value.succesvolle_uittrappen;
                                                                        temp21.gevangen_ballen = value.gevangen_ballen;
                                                                        temp21.weggestompte_ballen = value.weggestompte_ballen;
                                                                        temp21.doelpunten_tegen = value.doelpunten_tegen;

                                                                        temp11.match.push(temp21);

                                                                        value1.matches.push(temp11);
                                                                    }
                                                                } else {
                                                                    value1.matches = [];

                                                                    var temp12 = {};
                                                                    temp12.season = match_short.seizoen;
                                                                    temp12.match = [];

                                                                    var temp22 = {};
                                                                    temp22.spelerLeeftijd = value.spelerLeeftijd;
                                                                    temp22.wedstrijd = value.match;
                                                                    temp22.eindstand = value.result;
                                                                    temp22.datum = value.date;
                                                                    temp22.ronde = value.ronde;
                                                                    temp22.matchID = value.matchID;
                                                                    temp22.minuten = value.minuten;
                                                                    temp22.pass_percentage = value.pass_percentage;
                                                                    temp22.pass_lengte = value.pass_lengte;
                                                                    temp22.geel = value.geel;
                                                                    temp22.rood = value.rood;
                                                                    temp22.doelpunten = value.doelpunten;
                                                                    temp22.aantal_passes = value.aantal_passes;
                                                                    temp22.geslaagde_passes = value.geslaagde_passes;
                                                                    temp22.voorzetten = value.voorzetten;
                                                                    temp22.doelpogingen = value.doelpogingen;
                                                                    temp22.doelpogingen_opdoel = value.doelpogingen_opdoel;
                                                                    temp22.aanvallende_duels = value.aanvallende_duels;
                                                                    temp22.verdedigende_duels = value.verdedigende_duels;
                                                                    temp22.gewonnen_duels = value.gewonnen_duels;
                                                                    temp22.intercepties = value.intercepties;
                                                                    temp22.overtredingen = value.overtredingen;
                                                                    temp22.reddingen = value.reddingen;
                                                                    temp22.geslaagde_reddingen = value.geslaagde_reddingen;
                                                                    temp22.korte_passes = value.korte_passes;
                                                                    temp22.middellange_passes = value.middellange_passes;
                                                                    temp22.lange_passes = value.lange_passes;
                                                                    temp22.succesvolle_uittrappen = value.succesvolle_uittrappen;
                                                                    temp22.gevangen_ballen = value.gevangen_ballen;
                                                                    temp22.weggestompte_ballen = value.weggestompte_ballen;
                                                                    temp22.doelpunten_tegen = value.doelpunten_tegen;

                                                                    temp12.match.push(temp22);

                                                                    value1.matches.push(temp12);
                                                                }
                                                            }
                                                        });
                                                    }
                                                });

                                                TeamData.update({
                                                    _id: teamdata._id
                                                }, {
                                                    team_data: teamdata.team_data,
                                                    player_data: teamdata.player_data,
                                                    date_edited: datetime
                                                }, function (err, data) {
                                                    if (err) console.log(err);
                                                });
                                            } else {
                                                teamdata.player_data = [];
                                                _.each(player_data.player_stats_thuis, function (value, key1) {
                                                    var temp = {};
                                                    temp.playerID = value.personID;
                                                    temp.spelerNaam = value.spelerNaam;
                                                    temp.spelerType = value.type;
                                                    temp.spelerRugnummer = value.spelerRugnummer;
                                                    temp.spelerPhoto = value.spelerPhoto;
                                                    temp.spelerNationaliteit = value.spelerNationaliteit;
                                                    temp.spelerGeboortedatum = value.spelerGeboortedatum;
                                                    temp.matches = [];

                                                    var temp1 = {};
                                                    temp1.season = match_short.seizoen;
                                                    temp1.match = [];

                                                    var temp2 = {};
                                                    temp2.spelerLeeftijd = value.spelerLeeftijd;
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

                                                TeamData.update({
                                                    _id: teamdata._id
                                                }, {
                                                    team_data: teamdata.team_data,
                                                    player_data: teamdata.player_data,
                                                    date_edited: datetime
                                                }, function (err, data) {
                                                    if (err) console.log(err);
                                                });
                                            }
                                        }
                                    });
                                });
                            }
                            if (team_data.uit) {
                                var club_slug_uit = match_short.uitTeamSlug;
                                var team_slug_uit;

                                // check if club exists, otherwise create one
                                Club.findOne({_slug: club_slug_uit}, function (err, res) {
                                    var clubdata_uit = res;

                                    if (clubdata_uit == null) {
                                        // create team and teamID with the season
                                        var teams = [];
                                        var teamstemp = {};
                                        teamstemp.team_name = '1';
                                        teamstemp.team_slug = club_slug_uit + '_' + teamstemp.team_name.trim().toLowerCase().replace(/\s+/g, '');
                                        teamstemp.teamID = [];
                                        var teamstemp2 = {};
                                        teamstemp2.ID = match_short.uitTeamID;
                                        teamstemp2.season = match_short.seizoen;
                                        teamstemp.teamID.push(teamstemp2);
                                        teamstemp.coach = match_short.match_info.coach_uit;
                                        teamstemp.divisie = match_short.divisie;
                                        teams.push(teamstemp);

                                        match_short.uitTeamSlug = teamstemp.team_slug;
                                        items.uitTeamSlug = teamstemp.team_slug;
                                        team_slug_uit = teamstemp.team_slug;

                                        Club.create({
                                            _slug: club_slug_uit,
                                            name: match_short.match_info.uit,
                                            logo: match_short.match_info.uit + '.jpg',
                                            teams: teams,
                                            date_edited: datetime
                                        }, function (err, data) {
                                            if (err) console.log(err);
                                        });
                                    } else {
                                        // check if team exists, otherwise create one or both
                                        if (_.where(clubdata_uit.teams, {divisie: match_short.divisie})) {
                                            var teamstemp3 = '';
                                            teamstemp3 = _.where(clubdata_uit.teams, {divisie: match_short.divisie})[0];
                                            if (!(_.where(teamstemp3.teamID, {season: match_short.seizoen})[0])) {
                                                // create teamID
                                                forEach(clubdata_uit.teams, function (value, key) {
                                                    if (value.divisie == match_short.divisie) {
                                                        var temp = {};
                                                        temp.ID = match_short.thuisTeamID;
                                                        temp.season = match_short.seizoen;
                                                        value.teamID.push(temp);
                                                    }
                                                });

                                                Club.update({
                                                    _id: clubdata_uit._id
                                                }, {
                                                    teams: clubdata_uit.teams,
                                                    date_edited: datetime
                                                }, function (err, data) {
                                                    if (err) console.log(err);
                                                });
                                            }
                                            team_slug_uit = teamstemp3.team_slug;
                                            //match_short.match_info.coach_uit = teamstemp3.coach;
                                            match_short.uitTeamSlug = teamstemp3.team_slug;
                                            items.uitTeamSlug = teamstemp3.team_slug;
                                        } else {
                                            // create team + teamID
                                            var teamstemp4 = {};
                                            teamstemp4.team_name = '1';
                                            teamstemp4.team_slug = club_slug_uit + '_' + teamstemp4.team_name.trim().toLowerCase().replace(/\s+/g, '');
                                            teamstemp4.teamID = [];
                                            var teamstemp5 = {};
                                            teamstemp5.ID = match_short.uitTeamID;
                                            teamstemp5.season = match_short.seizoen;
                                            teamstemp4.teamID.push(teamstemp5);
                                            teamstemp4.coach = match_short.match_info.coach_uit;
                                            teamstemp4.divisie = match_short.divisie;
                                            clubdata_uit.teams.push(teamstemp4);

                                            match_short.uitTeamSlug = teamstemp4.team_slug;
                                            items.uitTeamSlug = teamstemp4.team_slug;
                                            team_slug_uit = teamstemp4.team_slug;

                                            Club.update({
                                                _id: clubdata_uit._id
                                            }, {
                                                teams: clubdata_uit.teams,
                                                date_edited: datetime
                                            }, function (err, data) {
                                                if (err) console.log(err);
                                            });
                                        }
                                    }

                                    TeamData.findOne({team_slug: team_slug_uit}, function (err, res) {
                                        var teamdata_uit = res;

                                        if (teamdata_uit == null) {
                                            // create teamdata_uit
                                            // create season and round and add teamdata_uit
                                            teamdata_uit = {};
                                            teamdata_uit.team_slug = team_slug_uit;
                                            teamdata_uit.team_name = '1';
                                            teamdata_uit.divisie = match_short.divisie;
                                            teamdata_uit.club_name = match_short.match_info.uit;
                                            teamdata_uit.club_slug = club_slug_uit;
                                            teamdata_uit.team_data = [];
                                            var team_data_temp3 = {};
                                            team_data_temp3.season = match_short.seizoen;
                                            team_data_temp3.matches = [];
                                            team_data_temp3.matches.push(team_data.uit);
                                            teamdata_uit.team_data.push(team_data_temp3);

                                            // create all players and create season and round and add playerdata
                                            teamdata_uit.player_data = [];
                                            forEach(player_data.player_stats_uit, function (value, key1) {
                                                var temp = {};
                                                temp.playerID = value.personID;
                                                temp.spelerNaam = value.spelerNaam;
                                                temp.spelerType = value.type;
                                                temp.spelerRugnummer = value.spelerRugnummer;
                                                temp.spelerPhoto = value.spelerPhoto;
                                                temp.spelerNationaliteit = value.spelerNationaliteit;
                                                temp.spelerGeboortedatum = value.spelerGeboortedatum;
                                                temp.matches = [];
                                                var temp1 = {};
                                                temp1.season = match_short.seizoen;
                                                temp1.match = [];
                                                var temp2 = {};
                                                temp2.spelerLeeftijd = value.spelerLeeftijd;
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

                                            TeamData.create(teamdata_uit, function (err, data) {
                                                if (err) console.log(err);
                                            });
                                        } else {
                                            // check season and round, and change or add teamdata_uit
                                            if (teamdata_uit.team_data) {
                                                // Working properly for now if statement
                                                if (_.where(teamdata_uit.team_data, {season: match_short.seizoen})[0]) {
                                                    forEach(teamdata_uit.team_data, function (value, key) {
                                                        if (value.season == match_short.seizoen) {
                                                            // check if round exists
                                                            if (_.where(value.matches, {ronde: team_data.uit.ronde})[0]) {
                                                                forEach(value.matches, function (value1, key1) {
                                                                    if (value1.ronde == team_data.uit.ronde) {
                                                                        value1.wedstrijd = team_data.uit.wedstrijd;
                                                                        value1.datum = team_data.uit.datum;
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
                                                                        value1.team_leeftijd = team_data.uit.team_leeftijd;
                                                                    }
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
                                                _.each(player_data.player_stats_uit, function (value, key) {
                                                    if (!(_.where(teamdata_uit.player_data, {playerID: value.personID})[0])) {
                                                        var temp = {};
                                                        temp.playerID = value.personID;
                                                        temp.spelerNaam = value.spelerNaam;
                                                        temp.spelerType = value.type;
                                                        temp.spelerRugnummer = value.spelerRugnummer;
                                                        temp.spelerPhoto = value.spelerPhoto;
                                                        temp.spelerNationaliteit = value.spelerNationaliteit;
                                                        temp.spelerGeboortedatum = value.spelerGeboortedatum;
                                                        temp.matches = [];

                                                        var temp1 = {};
                                                        temp1.season = match_short.seizoen;
                                                        temp1.match = [];

                                                        var temp2 = {};
                                                        temp2.spelerLeeftijd = value.spelerLeeftijd;
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
                                                    } else {
                                                        forEach(teamdata_uit.player_data, function (value1, key1) {
                                                            if (value.personID == value1.playerID && value.type == value1.spelerType) {
                                                                value1.spelerNaam = value.spelerNaam;
                                                                value1.spelerRugnummer = value.spelerRugnummer;
                                                                value1.spelerPhoto = value.spelerPhoto;
                                                                value1.spelerNationaliteit = value.spelerNationaliteit;
                                                                value1.spelerGeboortedatum = value.spelerGeboortedatum;

                                                                if (value1.matches) {
                                                                    if (_.where(value1.matches, {season: match_short.seizoen})[0]) {
                                                                        forEach(value1.matches, function (value2, key2) {
                                                                            if (value2.season == match_short.seizoen) {
                                                                                // check if round exists
                                                                                if (_.where(value2.match, {ronde: value.ronde})[0]) {
                                                                                    forEach(value2.match, function (value3, key3) {
                                                                                        if (value3.ronde == value.ronde) {
                                                                                            value3.spelerLeeftijd = value.spelerLeeftijd;
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
                                                                                    temp2.spelerLeeftijd = value.spelerLeeftijd;
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
                                                                        var temp11 = {};
                                                                        temp11.season = match_short.seizoen;
                                                                        temp11.match = [];

                                                                        var temp21 = {};
                                                                        temp21.spelerLeeftijd = value.spelerLeeftijd;
                                                                        temp21.wedstrijd = value.match;
                                                                        temp21.eindstand = value.result;
                                                                        temp21.datum = value.date;
                                                                        temp21.ronde = value.ronde;
                                                                        temp21.matchID = value.matchID;
                                                                        temp21.minuten = value.minuten;
                                                                        temp21.pass_percentage = value.pass_percentage;
                                                                        temp21.pass_lengte = value.pass_lengte;
                                                                        temp21.geel = value.geel;
                                                                        temp21.rood = value.rood;
                                                                        temp21.doelpunten = value.doelpunten;
                                                                        temp21.aantal_passes = value.aantal_passes;
                                                                        temp21.geslaagde_passes = value.geslaagde_passes;
                                                                        temp21.voorzetten = value.voorzetten;
                                                                        temp21.doelpogingen = value.doelpogingen;
                                                                        temp21.doelpogingen_opdoel = value.doelpogingen_opdoel;
                                                                        temp21.aanvallende_duels = value.aanvallende_duels;
                                                                        temp21.verdedigende_duels = value.verdedigende_duels;
                                                                        temp21.gewonnen_duels = value.gewonnen_duels;
                                                                        temp21.intercepties = value.intercepties;
                                                                        temp21.overtredingen = value.overtredingen;
                                                                        temp21.reddingen = value.reddingen;
                                                                        temp21.geslaagde_reddingen = value.geslaagde_reddingen;
                                                                        temp21.korte_passes = value.korte_passes;
                                                                        temp21.middellange_passes = value.middellange_passes;
                                                                        temp21.lange_passes = value.lange_passes;
                                                                        temp21.succesvolle_uittrappen = value.succesvolle_uittrappen;
                                                                        temp21.gevangen_ballen = value.gevangen_ballen;
                                                                        temp21.weggestompte_ballen = value.weggestompte_ballen;
                                                                        temp21.doelpunten_tegen = value.doelpunten_tegen;

                                                                        temp11.match.push(temp21);

                                                                        value1.matches.push(temp11);
                                                                    }
                                                                } else {
                                                                    value1.matches = [];

                                                                    var temp12 = {};
                                                                    temp12.season = match_short.seizoen;
                                                                    temp12.match = [];

                                                                    var temp22 = {};
                                                                    temp22.spelerLeeftijd = value.spelerLeeftijd;
                                                                    temp22.wedstrijd = value.match;
                                                                    temp22.eindstand = value.result;
                                                                    temp22.datum = value.date;
                                                                    temp22.ronde = value.ronde;
                                                                    temp22.matchID = value.matchID;
                                                                    temp22.minuten = value.minuten;
                                                                    temp22.pass_percentage = value.pass_percentage;
                                                                    temp22.pass_lengte = value.pass_lengte;
                                                                    temp22.geel = value.geel;
                                                                    temp22.rood = value.rood;
                                                                    temp22.doelpunten = value.doelpunten;
                                                                    temp22.aantal_passes = value.aantal_passes;
                                                                    temp22.geslaagde_passes = value.geslaagde_passes;
                                                                    temp22.voorzetten = value.voorzetten;
                                                                    temp22.doelpogingen = value.doelpogingen;
                                                                    temp22.doelpogingen_opdoel = value.doelpogingen_opdoel;
                                                                    temp22.aanvallende_duels = value.aanvallende_duels;
                                                                    temp22.verdedigende_duels = value.verdedigende_duels;
                                                                    temp22.gewonnen_duels = value.gewonnen_duels;
                                                                    temp22.intercepties = value.intercepties;
                                                                    temp22.overtredingen = value.overtredingen;
                                                                    temp22.reddingen = value.reddingen;
                                                                    temp22.geslaagde_reddingen = value.geslaagde_reddingen;
                                                                    temp22.korte_passes = value.korte_passes;
                                                                    temp22.middellange_passes = value.middellange_passes;
                                                                    temp22.lange_passes = value.lange_passes;
                                                                    temp22.succesvolle_uittrappen = value.succesvolle_uittrappen;
                                                                    temp22.gevangen_ballen = value.gevangen_ballen;
                                                                    temp22.weggestompte_ballen = value.weggestompte_ballen;
                                                                    temp22.doelpunten_tegen = value.doelpunten_tegen;

                                                                    temp12.match.push(temp22);

                                                                    value1.matches.push(temp12);
                                                                }
                                                            }
                                                        });
                                                    }
                                                });

                                                TeamData.update({
                                                    _id: teamdata_uit._id
                                                }, {
                                                    team_data: teamdata_uit.team_data,
                                                    player_data: teamdata_uit.player_data,
                                                    date_edited: datetime
                                                }, function (err, data) {
                                                    if (err) console.log(err);
                                                });
                                            } else {
                                                teamdata_uit.player_data = [];
                                                _.each(player_data.player_stats_uit, function (value, key1) {
                                                    var temp = {};
                                                    temp.playerID = value.personID;
                                                    temp.spelerNaam = value.spelerNaam;
                                                    temp.spelerType = value.type;
                                                    temp.spelerRugnummer = value.spelerRugnummer;
                                                    temp.spelerPhoto = value.spelerPhoto;
                                                    temp.spelerNationaliteit = value.spelerNationaliteit;
                                                    temp.spelerGeboortedatum = value.spelerGeboortedatum;
                                                    temp.matches = [];

                                                    var temp1 = {};
                                                    temp1.season = match_short.seizoen;
                                                    temp1.match = [];

                                                    var temp2 = {};
                                                    temp2.spelerLeeftijd = value.spelerLeeftijd;
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

                                                TeamData.update({
                                                    _id: teamdata_uit._id
                                                }, {
                                                    team_data: teamdata_uit.team_data,
                                                    player_data: teamdata_uit.player_data,
                                                    date_edited: datetime
                                                }, function (err, data) {
                                                    if (err) console.log(err);
                                                });
                                            }
                                        }
                                    });
                                });
                            }
                        }

                        if (data != null) {
                            if (match_data.matchID) {
                                Matches.findOne({matchID: match_data.matchID}, function (err, res) {
                                    var matchshort = res;

                                    if (matchshort == null) {
                                        Matches.create(match_short, function (err, data) {
                                            if (err) console.log(err);
                                        });
                                    } else {
                                        Matches.update({
                                            _id: matchshort._id
                                        }, match_short, function (err, data) {
                                            if (err) console.log(err);
                                        });
                                    }
                                });
                            } else {
                                Matches.findOne({matchID: items.matchID}, function (err, res) {
                                    var matchshort = res;

                                    if (matchshort == null) {
                                        Matches.create(match_short, function (err, data) {
                                            if (err) console.log(err);
                                        });
                                    } else {
                                        Matches.update({
                                            _id: matchshort._id
                                        }, match_short, function (err, data) {
                                            if (err) console.log(err);
                                        });
                                    }
                                });
                            }

                            if (match_data.matchID) {
                                MatchData.findOne({matchID: match_data.matchID}, function (err, res1) {
                                    var matchdata = res1;

                                    match_data = {};
                                    match_data = items;

                                    if (matchdata == null) {
                                        MatchData.create(match_data, function (err, data) {
                                            if (err) console.log(err);

                                            Club.findOne({_slug: match_short.thuisTeamSlug}, function (err22, res22) {
                                                if (err22) console.log(err22);
                                                forEach(res22.teams, function (value, key) {
                                                    if (value.divisie == match_short.divisie) {
                                                        forEach(value.contact, function (value1, key1) {
                                                            res.mailer.send('mailer/match_upload', {
                                                                to: value1.email, // REQUIRED. This can be a comma delimited string just like a normal email to field.
                                                                subject: 'Nieuwe wedstrijd ' + res22.name + ' online op soccerpc.nl', // REQUIRED.
                                                                // All additional properties are also passed to the template as local variables.
                                                                title: 'Nieuwe wedstrijd ' + res22.name + ' online op soccerpc.nl',
                                                                club: res22.name,
                                                                match: match_short
                                                            }, function (err1) {
                                                                if (err1) {
                                                                    // handle error
                                                                    console.log('Error sending new upload email\n\n' + err1 + '\n\n');
                                                                }
                                                                console.log('New upload email send to club\n\n');
                                                            });
                                                        });
                                                    }
                                                });
                                            });

                                            Club.findOne({_slug: match_short.uitTeamSlug}, function (err22, res22) {
                                                if (err22) console.log(err22);
                                                forEach(res22.teams, function (value, key) {
                                                    if (value.divisie == match_short.divisie) {
                                                        forEach(value.contact, function (value1, key1) {
                                                            res.mailer.send('mailer/match_upload', {
                                                                to: value1.email, // REQUIRED. This can be a comma delimited string just like a normal email to field.
                                                                subject: 'Nieuwe wedstrijd ' + res22.name + ' online op soccerpc.nl', // REQUIRED.
                                                                // All additional properties are also passed to the template as local variables.
                                                                title: 'Nieuwe wedstrijd ' + res22.name + ' online op soccerpc.nl',
                                                                club: res22.name,
                                                                match: match_short
                                                            }, function (err1) {
                                                                if (err1) {
                                                                    // handle error
                                                                    console.log('Error sending new upload email\n\n' + err1 + '\n\n');
                                                                }
                                                                console.log('New upload email send to club\n\n');
                                                            });
                                                        });
                                                    }
                                                });
                                            });
                                        });
                                    } else {
                                        MatchData.update({
                                            _id: matchdata._id
                                        }, match_data, function (err, data) {
                                            if (err) console.log(err);

                                            Club.findOne({_slug: match_short.thuisTeamSlug}, function (err22, res22) {
                                                if (err22) console.log(err22);
                                                forEach(res22.teams, function (value, key) {
                                                    if (value.divisie == match_short.divisie) {
                                                        forEach(value.contact, function (value1, key1) {
                                                            res.mailer.send('mailer/match_upload', {
                                                                to: value1.email, // REQUIRED. This can be a comma delimited string just like a normal email to field.
                                                                subject: 'Nieuwe wedstrijd ' + res22.name + ' online op soccerpc.nl', // REQUIRED.
                                                                // All additional properties are also passed to the template as local variables.
                                                                title: 'Nieuwe wedstrijd ' + res22.name + ' online op soccerpc.nl',
                                                                club: res22.name,
                                                                match: match_short
                                                            }, function (err1) {
                                                                if (err1) {
                                                                    // handle error
                                                                    console.log('Error sending new upload email\n\n' + err1 + '\n\n');
                                                                }
                                                                console.log('New upload email send to club\n\n');
                                                            });
                                                        });
                                                    }
                                                });
                                            });

                                            Club.findOne({_slug: match_short.uitTeamSlug}, function (err22, res22) {
                                                if (err22) console.log(err22);
                                                forEach(res22.teams, function (value, key) {
                                                    if (value.divisie == match_short.divisie) {
                                                        forEach(value.contact, function (value1, key1) {
                                                            res.mailer.send('mailer/match_upload', {
                                                                to: value1.email, // REQUIRED. This can be a comma delimited string just like a normal email to field.
                                                                subject: 'Nieuwe wedstrijd ' + res22.name + ' online op soccerpc.nl', // REQUIRED.
                                                                // All additional properties are also passed to the template as local variables.
                                                                title: 'Nieuwe wedstrijd ' + res22.name + ' online op soccerpc.nl',
                                                                club: res22.name,
                                                                match: match_short
                                                            }, function (err1) {
                                                                if (err1) {
                                                                    // handle error
                                                                    console.log('Error sending new upload email\n\n' + err1 + '\n\n');
                                                                }
                                                                console.log('New upload email send to club\n\n');
                                                            });
                                                        });
                                                    }
                                                });
                                            });
                                        });
                                    }
                                });
                            } else {
                                MatchData.findOne({matchID: items.matchID}, function (err1, res1) {
                                    var matchdata = res1;

                                    match_data = {};
                                    match_data = items;

                                    if (matchdata == null) {
                                        MatchData.create(match_data, function (err, data) {
                                            if (err) console.log(err);

                                            Club.findOne({_slug: match_short.thuisTeamSlug}, function (err22, res22) {
                                                if (err22) console.log(err22);
                                                forEach(res22.teams, function (value, key) {
                                                    if (value.divisie == match_short.divisie) {
                                                        forEach(value.contact, function (value1, key1) {
                                                            res.mailer.send('mailer/match_upload', {
                                                                to: value1.email, // REQUIRED. This can be a comma delimited string just like a normal email to field.
                                                                subject: 'Nieuwe wedstrijd ' + res22.name + ' online op soccerpc.nl', // REQUIRED.
                                                                // All additional properties are also passed to the template as local variables.
                                                                title: 'Nieuwe wedstrijd ' + res22.name + ' online op soccerpc.nl',
                                                                club: res22.name,
                                                                match: match_short
                                                            }, function (err1) {
                                                                if (err1) {
                                                                    // handle error
                                                                    console.log('Error sending new upload email\n\n' + err1 + '\n\n');
                                                                }
                                                                console.log('New upload email send to club\n\n');
                                                            });
                                                        });
                                                    }
                                                });
                                            });

                                            Club.findOne({_slug: match_short.uitTeamSlug}, function (err22, res22) {
                                                if (err22) console.log(err22);
                                                forEach(res22.teams, function (value, key) {
                                                    if (value.divisie == match_short.divisie) {
                                                        forEach(value.contact, function (value1, key1) {
                                                            res.mailer.send('mailer/match_upload', {
                                                                to: value1.email, // REQUIRED. This can be a comma delimited string just like a normal email to field.
                                                                subject: 'Nieuwe wedstrijd ' + res22.name + ' online op soccerpc.nl', // REQUIRED.
                                                                // All additional properties are also passed to the template as local variables.
                                                                title: 'Nieuwe wedstrijd ' + res22.name + ' online op soccerpc.nl',
                                                                club: res22.name,
                                                                match: match_short
                                                            }, function (err1) {
                                                                if (err1) {
                                                                    // handle error
                                                                    console.log('Error sending new upload email\n\n' + err1 + '\n\n');
                                                                }
                                                                console.log('New upload email send to club\n\n');
                                                            });
                                                        });
                                                    }
                                                });
                                            });
                                        });
                                    } else {
                                        MatchData.update({
                                            _id: matchdata._id
                                        }, match_data, function (err, data) {
                                            if (err) console.log(err);

                                            Club.findOne({_slug: match_short.thuisTeamSlug}, function (err22, res22) {
                                                if (err22) console.log(err22);
                                                forEach(res22.teams, function (value, key) {
                                                    if (value.divisie == match_short.divisie) {
                                                        forEach(value.contact, function (value1, key1) {
                                                            res.mailer.send('mailer/match_upload', {
                                                                to: value1.email, // REQUIRED. This can be a comma delimited string just like a normal email to field.
                                                                subject: 'Nieuwe wedstrijd ' + res22.name + ' online op soccerpc.nl', // REQUIRED.
                                                                // All additional properties are also passed to the template as local variables.
                                                                title: 'Nieuwe wedstrijd ' + res22.name + ' online op soccerpc.nl',
                                                                club: res22.name,
                                                                match: match_short
                                                            }, function (err1) {
                                                                if (err1) {
                                                                    // handle error
                                                                    console.log('Error sending new upload email\n\n' + err1 + '\n\n');
                                                                }
                                                                console.log('New upload email send to club\n\n');
                                                            });
                                                        });
                                                    }
                                                });
                                            });

                                            Club.findOne({_slug: match_short.uitTeamSlug}, function (err22, res22) {
                                                if (err22) console.log(err22);
                                                forEach(res22.teams, function (value, key) {
                                                    if (value.divisie == match_short.divisie) {
                                                        forEach(value.contact, function (value1, key1) {
                                                            res.mailer.send('mailer/match_upload', {
                                                                to: value1.email, // REQUIRED. This can be a comma delimited string just like a normal email to field.
                                                                subject: 'Nieuwe wedstrijd ' + res22.name + ' online op soccerpc.nl', // REQUIRED.
                                                                // All additional properties are also passed to the template as local variables.
                                                                title: 'Nieuwe wedstrijd ' + res22.name + ' online op soccerpc.nl',
                                                                club: res22.name,
                                                                match: match_short
                                                            }, function (err1) {
                                                                if (err1) {
                                                                    // handle error
                                                                    console.log('Error sending new upload email\n\n' + err1 + '\n\n');
                                                                }
                                                                console.log('New upload email send to club\n\n');
                                                            });
                                                        });
                                                    }
                                                });
                                            });
                                        });
                                    }
                                });
                            }
                        }
                    }, 4000);
                });
            });
        });

        //var send_mail = function(email_address1, club1, match_short1) {
        //    res.mailer.send('mailer/match_upload', {
        //        to: email_address1, // REQUIRED. This can be a comma delimited string just like a normal email to field.
        //        subject: 'Nieuwe wedstrijd ' + club1 + ' online op soccerpc.nl', // REQUIRED.
        //        // All additional properties are also passed to the template as local variables.
        //        title: 'Nieuwe wedstrijd ' + club1 + ' online op soccerpc.nl',
        //        club: club1,
        //        match: match_short1
        //    }, function (err1) {
        //        if (err1) {
        //            // handle error
        //            console.log('Error sending new upload email\n\n' + err1 + '\n\n');
        //        }
        //        console.log('New upload email send to club\n\n');
        //    });
        //};
    }
};