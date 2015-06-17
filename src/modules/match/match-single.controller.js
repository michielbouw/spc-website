angular.module('mainapp.match')
    .controller('mainapp.match.MatchSingleController', ['$scope', 'Api', 'AuthenticationService', '$location', '$rootScope', '$timeout',
        function($scope, Api, AuthenticationService, $location, $rootScope, $timeout)
    {
        var self = this;

      // temp system -------------------------------------------------------------------------------------------------
        $scope.matches = [];

        var data = {
            "wedstrijd_data": {
                "matchID": [16435],
                "thuisTeamID": [1527],
                "uitTeamID": [1530],
                "titel": [
                    {
                        "wedstrijd": "FC Eindhoven - FC Volendam",
                        "eindstand": "1 - 1",
                        "ruststand": "0 - 0",
                        "speeldag": "dinsdag",
                        "datum": "25-05-2015",
                        "tijd": "14:30",
                        "ronde": 2,
                        "scheids": "Dennis Higler"
                    }
                ],
                "spelers_thuisteam": [
                    {
                        "personID": 940,
                        "spelerNaam": "Tom  Muyters"
                    },
                    {
                        "personID": 902,
                        "spelerNaam": "Timothy  Durwael"
                    },
                    {
                        "personID": 3359,
                        "spelerNaam": "Norichio  Nieveld"
                    },
                    {
                        "personID": 5366,
                        "spelerNaam": "Chiró  N'Toko"
                    },
                    {
                        "personID": 18298,
                        "spelerNaam": "Maxime  Gunst"
                    },
                    {
                        "personID": 10527,
                        "spelerNaam": "Jens van Son"
                    },
                    {
                        "personID": 336,
                        "spelerNaam": "Roald van Hout"
                    },
                    {
                        "personID": 13035,
                        "spelerNaam": "Anthony van der Hurk"
                    },
                    {
                        "personID": 5418,
                        "spelerNaam": "Fries  Deschilder"
                    },
                    {
                        "personID": 10668,
                        "spelerNaam": "Branco van den Boomen"
                    },
                    {
                        "personID": 16733,
                        "spelerNaam": "Joey  Sleegers"
                    },
                    {
                        "personID": 606,
                        "spelerNaam": "Tom  Boere"
                    },
                    {
                        "personID": 18294,
                        "spelerNaam": "Torino  Hunte"
                    },
                    {
                        "personID": 14674,
                        "spelerNaam": "Chiel  Kramer"
                    },
                    {
                        "personID": 13463,
                        "spelerNaam": "Paul  Beekmans"
                    },
                    {
                        "personID": 10526,
                        "spelerNaam": "Ivo  Rossen"
                    },
                    {
                        "personID": 18295,
                        "spelerNaam": "Tibeau  Swinnen"
                    },
                    {
                        "personID": 7966,
                        "spelerNaam": "Sebastiaan de Wilde"
                    }
                ],
                "spelers_uitteam": [
                    {
                        "personID": 323,
                        "spelerNaam": "Theo  Zwarthoed"
                    },
                    {
                        "personID": 11072,
                        "spelerNaam": "Sofian  Akouili"
                    },
                    {
                        "personID": 355,
                        "spelerNaam": "Henny  Schilder"
                    },
                    {
                        "personID": 2300,
                        "spelerNaam": "Erik  Schouten"
                    },
                    {
                        "personID": 25857,
                        "spelerNaam": "Jermano Lo Fo Sang"
                    },
                    {
                        "personID": 3343,
                        "spelerNaam": "Ties  Evers"
                    },
                    {
                        "personID": 14351,
                        "spelerNaam": "Brandley  Kuwas"
                    },
                    {
                        "personID": 4993,
                        "spelerNaam": "Raymond  Fafiani"
                    },
                    {
                        "personID": 1204,
                        "spelerNaam": "Tom  Overtoom"
                    },
                    {
                        "personID": 4994,
                        "spelerNaam": "Kevin  Brands"
                    },
                    {
                        "personID": 11476,
                        "spelerNaam": "Ludcinio  Marengo"
                    },
                    {
                        "personID": 16399,
                        "spelerNaam": "Rafik  El Hamdi"
                    },
                    {
                        "personID": 25856,
                        "spelerNaam": "Denzel Pryor"
                    },
                    {
                        "personID": 25854,
                        "spelerNaam": "Gendridge Pryor"
                    },
                    {
                        "personID": 12760,
                        "spelerNaam": "Kevin van Kippersluis"
                    },
                    {
                        "personID": 13493,
                        "spelerNaam": "Theo  Timmermans"
                    },
                    {
                        "personID": 13481,
                        "spelerNaam": "Guyon  Philips"
                    },
                    {
                        "personID": 25858,
                        "spelerNaam": "Bert Steltenpool"
                    }
                ],
                "overzicht_lineup": [
                    {
                        "V1": " ",
                        "V2": "FC Eindhoven",
                        "V3": " ",
                        "V4": "FC Volendam"
                    },
                    {
                        "V1": " ",
                        "V2": " ",
                        "V3": " ",
                        "V4": " "
                    },
                    {
                        "V1": "1",
                        "V2": "Tom  Muyters",
                        "V3": "1",
                        "V4": "Theo  Zwarthoed"
                    },
                    {
                        "V1": "2",
                        "V2": "Timothy  Durwael",
                        "V3": "2",
                        "V4": "Sofian  Akouili"
                    },
                    {
                        "V1": "3",
                        "V2": "Norichio  Nieveld",
                        "V3": "3",
                        "V4": "Henny  Schilder"
                    },
                    {
                        "V1": "4",
                        "V2": "Chiró  N'Toko",
                        "V3": "4",
                        "V4": "Erik  Schouten"
                    },
                    {
                        "V1": "5",
                        "V2": "Maxime  Gunst",
                        "V3": "5",
                        "V4": "Jermano Lo Fo Sang"
                    },
                    {
                        "V1": "6",
                        "V2": "Jens van Son",
                        "V3": "6",
                        "V4": "Ties  Evers"
                    },
                    {
                        "V1": "7",
                        "V2": "Roald van Hout (-63')",
                        "V3": "7",
                        "V4": "Brandley  Kuwas (-89')"
                    },
                    {
                        "V1": "9",
                        "V2": "Anthony van der Hurk (-63')",
                        "V3": "8",
                        "V4": "Raymond  Fafiani"
                    },
                    {
                        "V1": "14",
                        "V2": "Fries  Deschilder",
                        "V3": "9",
                        "V4": "Tom  Overtoom (-79')"
                    },
                    {
                        "V1": "17",
                        "V2": "Branco van den Boomen",
                        "V3": "10",
                        "V4": "Kevin  Brands"
                    },
                    {
                        "V1": "26",
                        "V2": "Joey  Sleegers (-89')",
                        "V3": "11",
                        "V4": "Ludcinio  Marengo"
                    },
                    {
                        "V1": " ",
                        "V2": " ",
                        "V3": " ",
                        "V4": " "
                    },
                    {
                        "V1": " ",
                        "V2": "INGEVALLEN",
                        "V3": " ",
                        "V4": "INGEVALLEN"
                    },
                    {
                        "V1": "10",
                        "V2": "Tom  Boere (+63')",
                        "V3": "14",
                        "V4": "Gendridge Pryor (+89')"
                    },
                    {
                        "V1": "11",
                        "V2": "Torino  Hunte (+63')",
                        "V3": "15",
                        "V4": "Kevin van Kippersluis (+79')"
                    },
                    {
                        "V1": "18",
                        "V2": "Paul  Beekmans (+89')",
                        "V3": " ",
                        "V4": " "
                    },
                    {
                        "V1": " ",
                        "V2": " ",
                        "V3": " ",
                        "V4": " "
                    },
                    {
                        "V1": " ",
                        "V2": " ",
                        "V3": " ",
                        "V4": " "
                    },
                    {
                        "V1": " ",
                        "V2": "BANK",
                        "V3": " ",
                        "V4": "BANK"
                    },
                    {
                        "V1": "12",
                        "V2": "Chiel  Kramer",
                        "V3": "12",
                        "V4": "Rafik  El Hamdi"
                    },
                    {
                        "V1": "20",
                        "V2": "Ivo  Rossen",
                        "V3": "13",
                        "V4": "Denzel Pryor"
                    },
                    {
                        "V1": "21",
                        "V2": "Tibeau  Swinnen",
                        "V3": "16",
                        "V4": "Theo  Timmermans"
                    },
                    {
                        "V1": "22",
                        "V2": "Sebastiaan de Wilde",
                        "V3": "17",
                        "V4": "Guyon  Philips"
                    },
                    {
                        "V1": " ",
                        "V2": " ",
                        "V3": "18",
                        "V4": "Bert Steltenpool"
                    }
                ],
                "opstelling": {
                    "thuis": [
                        {
                            "personID": 940,
                            "spelerNaam": "Tom  Muyters",
                            "positieID": 1,
                            "positieNaam": "goalkeeper",
                            "shirtNummer": 1
                        },
                        {
                            "personID": 18298,
                            "spelerNaam": "Maxime  Gunst",
                            "positieID": 3,
                            "positieNaam": "left-back",
                            "shirtNummer": 5
                        },
                        {
                            "personID": 5366,
                            "spelerNaam": "Chiró  N'Toko",
                            "positieID": 4,
                            "positieNaam": "left-centre-back",
                            "shirtNummer": 4
                        },
                        {
                            "personID": 3359,
                            "spelerNaam": "Norichio  Nieveld",
                            "positieID": 6,
                            "positieNaam": "right-centre-back",
                            "shirtNummer": 3
                        },
                        {
                            "personID": 902,
                            "spelerNaam": "Timothy  Durwael",
                            "positieID": 7,
                            "positieNaam": "right-back",
                            "shirtNummer": 2
                        },
                        {
                            "personID": 5418,
                            "spelerNaam": "Fries  Deschilder",
                            "positieID": 13,
                            "positieNaam": "left-midfield",
                            "shirtNummer": 14
                        },
                        {
                            "personID": 10668,
                            "spelerNaam": "Branco van den Boomen",
                            "positieID": 15,
                            "positieNaam": "centre-midfield",
                            "shirtNummer": 17
                        },
                        {
                            "personID": 10527,
                            "spelerNaam": "Jens van Son",
                            "positieID": 17,
                            "positieNaam": "right-midfield",
                            "shirtNummer": 6
                        },
                        {
                            "personID": 16733,
                            "spelerNaam": "Joey  Sleegers",
                            "positieID": 23,
                            "positieNaam": "left-winger",
                            "shirtNummer": 26
                        },
                        {
                            "personID": 336,
                            "spelerNaam": "Roald van Hout",
                            "positieID": 25,
                            "positieNaam": "right-winger",
                            "shirtNummer": 7
                        },
                        {
                            "personID": 13035,
                            "spelerNaam": "Anthony van der Hurk",
                            "positieID": 27,
                            "positieNaam": "centre-forward ",
                            "shirtNummer": 9
                        }
                    ],
                    "thuis_formatie": ["4-3-3"],
                    "uit": [
                        {
                            "personID": 323,
                            "spelerNaam": "Theo  Zwarthoed",
                            "positieID": 1,
                            "positieNaam": "goalkeeper",
                            "shirtNummer": 1
                        },
                        {
                            "personID": 25857,
                            "spelerNaam": "Jermano Lo Fo Sang",
                            "positieID": 3,
                            "positieNaam": "left-back",
                            "shirtNummer": 5
                        },
                        {
                            "personID": 2300,
                            "spelerNaam": "Erik  Schouten",
                            "positieID": 4,
                            "positieNaam": "left-centre-back",
                            "shirtNummer": 4
                        },
                        {
                            "personID": 355,
                            "spelerNaam": "Henny  Schilder",
                            "positieID": 6,
                            "positieNaam": "right-centre-back",
                            "shirtNummer": 3
                        },
                        {
                            "personID": 11072,
                            "spelerNaam": "Sofian  Akouili",
                            "positieID": 7,
                            "positieNaam": "right-back",
                            "shirtNummer": 2
                        },
                        {
                            "personID": 4993,
                            "spelerNaam": "Raymond  Fafiani",
                            "positieID": 13,
                            "positieNaam": "left-midfield",
                            "shirtNummer": 8
                        },
                        {
                            "personID": 1204,
                            "spelerNaam": "Tom  Overtoom",
                            "positieID": 15,
                            "positieNaam": "centre-midfield",
                            "shirtNummer": 9
                        },
                        {
                            "personID": 3343,
                            "spelerNaam": "Ties  Evers",
                            "positieID": 17,
                            "positieNaam": "right-midfield",
                            "shirtNummer": 6
                        },
                        {
                            "personID": 11476,
                            "spelerNaam": "Ludcinio  Marengo",
                            "positieID": 23,
                            "positieNaam": "left-winger",
                            "shirtNummer": 11
                        },
                        {
                            "personID": 14351,
                            "spelerNaam": "Brandley  Kuwas",
                            "positieID": 25,
                            "positieNaam": "right-winger",
                            "shirtNummer": 7
                        },
                        {
                            "personID": 4994,
                            "spelerNaam": "Kevin  Brands",
                            "positieID": 27,
                            "positieNaam": "centre-forward ",
                            "shirtNummer": 10
                        }
                    ],
                    "uit_formatie": ["4-3-3"]
                },
                "overzicht_wedstrijd": {
                    "overzicht": [
                        {
                            " ": "FC Eindhoven",
                            " .1": " ",
                            " .2": " ",
                            " .3": " ",
                            " .4": "FC Volendam"
                        },
                        {
                            " ": " ",
                            " .1": " ",
                            " .2": "60'",
                            " .3": "goal",
                            " .4": "Brandley  Kuwas"
                        },
                        {
                            " ": "Tom  Boere",
                            " .1": "ingevallen",
                            " .2": "63'",
                            " .3": " ",
                            " .4": " "
                        },
                        {
                            " ": "Anthony van der Hurk",
                            " .1": "vervangen",
                            " .2": "63'",
                            " .3": " ",
                            " .4": " "
                        },
                        {
                            " ": "Torino  Hunte",
                            " .1": "ingevallen",
                            " .2": "63'",
                            " .3": " ",
                            " .4": " "
                        },
                        {
                            " ": "Roald van Hout",
                            " .1": "vervangen",
                            " .2": "63'",
                            " .3": " ",
                            " .4": " "
                        },
                        {
                            " ": " ",
                            " .1": " ",
                            " .2": "70'",
                            " .3": "geel",
                            " .4": "Tom  Overtoom"
                        },
                        {
                            " ": "Norichio  Nieveld",
                            " .1": "geel",
                            " .2": "78'",
                            " .3": " ",
                            " .4": " "
                        },
                        {
                            " ": " ",
                            " .1": " ",
                            " .2": "79'",
                            " .3": "ingevallen",
                            " .4": "Kevin van Kippersluis"
                        },
                        {
                            " ": " ",
                            " .1": " ",
                            " .2": "79'",
                            " .3": "vervangen",
                            " .4": "Tom  Overtoom"
                        },
                        {
                            " ": " ",
                            " .1": " ",
                            " .2": "80'",
                            " .3": "geel",
                            " .4": "Jermano Lo Fo Sang"
                        },
                        {
                            " ": "Branco van den Boomen",
                            " .1": "geel",
                            " .2": "82'",
                            " .3": " ",
                            " .4": " "
                        },
                        {
                            " ": " ",
                            " .1": " ",
                            " .2": "89'",
                            " .3": "ingevallen",
                            " .4": "Gendridge Pryor"
                        },
                        {
                            " ": " ",
                            " .1": " ",
                            " .2": "89'",
                            " .3": "vervangen",
                            " .4": "Brandley  Kuwas"
                        },
                        {
                            " ": "Paul  Beekmans",
                            " .1": "ingevallen",
                            " .2": "89'",
                            " .3": " ",
                            " .4": " "
                        },
                        {
                            " ": "Joey  Sleegers",
                            " .1": "vervangen",
                            " .2": "89'",
                            " .3": " ",
                            " .4": " "
                        },
                        {
                            " ": "Tom  Muyters",
                            " .1": "goal",
                            " .2": "90+4'",
                            " .3": " ",
                            " .4": " "
                        }
                    ],
                    "overzicht_eerste_helft": [
                        {
                            " ": "FC Eindhoven",
                            " .1": " ",
                            " .2": " ",
                            " .3": " ",
                            " .4": "FC Volendam"
                        }
                    ],
                    "overzicht_tweede_helft": [
                        {
                            " ": "FC Eindhoven",
                            " .1": " ",
                            " .2": " ",
                            " .3": " ",
                            " .4": "FC Volendam"
                        },
                        {
                            " ": " ",
                            " .1": " ",
                            " .2": "60'",
                            " .3": "goal",
                            " .4": "Brandley  Kuwas"
                        },
                        {
                            " ": "Tom  Boere",
                            " .1": "ingevallen",
                            " .2": "63'",
                            " .3": " ",
                            " .4": " "
                        },
                        {
                            " ": "Anthony van der Hurk",
                            " .1": "vervangen",
                            " .2": "63'",
                            " .3": " ",
                            " .4": " "
                        },
                        {
                            " ": "Torino  Hunte",
                            " .1": "ingevallen",
                            " .2": "63'",
                            " .3": " ",
                            " .4": " "
                        },
                        {
                            " ": "Roald van Hout",
                            " .1": "vervangen",
                            " .2": "63'",
                            " .3": " ",
                            " .4": " "
                        },
                        {
                            " ": " ",
                            " .1": " ",
                            " .2": "70'",
                            " .3": "geel",
                            " .4": "Tom  Overtoom"
                        },
                        {
                            " ": "Norichio  Nieveld",
                            " .1": "geel",
                            " .2": "78'",
                            " .3": " ",
                            " .4": " "
                        },
                        {
                            " ": " ",
                            " .1": " ",
                            " .2": "79'",
                            " .3": "ingevallen",
                            " .4": "Kevin van Kippersluis"
                        },
                        {
                            " ": " ",
                            " .1": " ",
                            " .2": "79'",
                            " .3": "vervangen",
                            " .4": "Tom  Overtoom"
                        },
                        {
                            " ": " ",
                            " .1": " ",
                            " .2": "80'",
                            " .3": "geel",
                            " .4": "Jermano Lo Fo Sang"
                        },
                        {
                            " ": "Branco van den Boomen",
                            " .1": "geel",
                            " .2": "82'",
                            " .3": " ",
                            " .4": " "
                        },
                        {
                            " ": " ",
                            " .1": " ",
                            " .2": "89'",
                            " .3": "ingevallen",
                            " .4": "Gendridge Pryor"
                        },
                        {
                            " ": " ",
                            " .1": " ",
                            " .2": "89'",
                            " .3": "vervangen",
                            " .4": "Brandley  Kuwas"
                        },
                        {
                            " ": "Paul  Beekmans",
                            " .1": "ingevallen",
                            " .2": "89'",
                            " .3": " ",
                            " .4": " "
                        },
                        {
                            " ": "Joey  Sleegers",
                            " .1": "vervangen",
                            " .2": "89'",
                            " .3": " ",
                            " .4": " "
                        },
                        {
                            " ": "Tom  Muyters",
                            " .1": "goal",
                            " .2": "90+4'",
                            " .3": " ",
                            " .4": " "
                        }
                    ]
                },
                "blessure_tijd": [
                    {
                        "sec_1ehelft": 135,
                        "sec_2ehelft": 306,
                        "blessuretijd_1ehelft": "02min. 15sec.",
                        "blessuretijd_2ehelft": "05min. 06sec."
                    }
                ],
                "overzicht_wedstrijdstatistieken": [
                    {
                        " ": "FC Eindhoven",
                        " .1": " ",
                        " .2": "FC Volendam"
                    },
                    {
                        " ": "4",
                        " .1": "buitenspel",
                        " .2": "6"
                    },
                    {
                        " ": "9",
                        " .1": "hoekschoppen",
                        " .2": "3"
                    },
                    {
                        " ": "34",
                        " .1": "inworpen",
                        " .2": "30"
                    },
                    {
                        " ": "0",
                        " .1": "eigen doelpunt",
                        " .2": "0"
                    },
                    {
                        " ": "14",
                        " .1": "overtreding",
                        " .2": "16"
                    },
                    {
                        " ": "2",
                        " .1": "gele kaarten",
                        " .2": "2"
                    },
                    {
                        " ": "0",
                        " .1": "rode kaarten",
                        " .2": "0"
                    },
                    {
                        " ": "3",
                        " .1": "wissels",
                        " .2": "2"
                    }
                ],
                "balbezit": {
                    "hele_wedstrijd": [
                        {
                            "1527": 62,
                            "1530": 38
                        }
                    ],
                    "helft_1": [
                        {
                            "1527": 65,
                            "1530": 35
                        }
                    ],
                    "helft_2": [
                        {
                            "1527": 58,
                            "1530": 42
                        }
                    ],
                    "kwartier_1": [
                        {
                            "1527": 51,
                            "1530": 49
                        }
                    ],
                    "kwartier_2": [
                        {
                            "1527": 71,
                            "1530": 29
                        }
                    ],
                    "kwartier_3": [
                        {
                            "1527": 72,
                            "1530": 28
                        }
                    ],
                    "kwartier_4": [
                        {
                            "1527": 65,
                            "1530": 35
                        }
                    ],
                    "kwartier_5": [
                        {
                            "1527": 62,
                            "1530": 38
                        }
                    ],
                    "kwartier_6": [
                        {
                            "1527": 49,
                            "1530": 51
                        }
                    ]
                },
                "passes": [
                    {
                        "1527": " ",
                        "NA": "PASSES",
                        "1530": " "
                    },
                    {
                        "1527": "389",
                        "NA": "totaal",
                        "1530": "241"
                    },
                    {
                        "1527": "68%",
                        "NA": "%succesvolle passes",
                        "1530": "56%"
                    },
                    {
                        "1527": "7",
                        "NA": "sleutelpasses",
                        "1530": "9"
                    },
                    {
                        "1527": "34",
                        "NA": "cross-passes",
                        "1530": "2"
                    },
                    {
                        "1527": " ",
                        "NA": " ",
                        "1530": " "
                    },
                    {
                        "1527": "208",
                        "NA": "passes vooruit",
                        "1530": "136"
                    },
                    {
                        "1527": "77",
                        "NA": "passes breed",
                        "1530": "44"
                    },
                    {
                        "1527": "104",
                        "NA": "passes achteruit",
                        "1530": "61"
                    },
                    {
                        "1527": " ",
                        "NA": " ",
                        "1530": " "
                    },
                    {
                        "1527": "69",
                        "NA": "korte passes",
                        "1530": "55"
                    },
                    {
                        "1527": "129",
                        "NA": "middellange passes",
                        "1530": "70"
                    },
                    {
                        "1527": "191",
                        "NA": "lange passes",
                        "1530": "116"
                    },
                    {
                        "1527": "23.5 m.",
                        "NA": "gem. passlengte",
                        "1530": "21.3 m."
                    },
                    {
                        "1527": "95.4 m.",
                        "NA": "langste pass",
                        "1530": "89.3 m."
                    }
                ],
                "overzicht_doelpogingen": [
                    {
                        " ": "FC Eindhoven",
                        " .1": " ",
                        " .2": "FC Volendam"
                    },
                    {
                        " ": "16",
                        " .1": "DOELPOGINGEN",
                        " .2": "11"
                    },
                    {
                        " ": " ",
                        " .1": " ",
                        " .2": " "
                    },
                    {
                        " ": " ",
                        " .1": "SCHOTEN",
                        " .2": " "
                    },
                    {
                        " ": "15",
                        " .1": "totaal",
                        " .2": "10"
                    },
                    {
                        " ": "5",
                        " .1": "op doel",
                        " .2": "4"
                    },
                    {
                        " ": "0",
                        " .1": "op het ijzer",
                        " .2": "1"
                    },
                    {
                        " ": "4",
                        " .1": "naast",
                        " .2": "3"
                    },
                    {
                        " ": "1",
                        " .1": "over",
                        " .2": "0"
                    },
                    {
                        " ": "5",
                        " .1": "geblokkeerd",
                        " .2": "2"
                    },
                    {
                        " ": "10",
                        " .1": "binnen strafschopgebied",
                        " .2": "6"
                    },
                    {
                        " ": "5",
                        " .1": "buiten strafschopgebied",
                        " .2": "4"
                    },
                    {
                        " ": " ",
                        " .1": " ",
                        " .2": " "
                    },
                    {
                        " ": " ",
                        " .1": "PENALTIES",
                        " .2": " "
                    },
                    {
                        " ": "0",
                        " .1": "totaal",
                        " .2": "0"
                    },
                    {
                        " ": "0",
                        " .1": "gescoord",
                        " .2": "0"
                    },
                    {
                        " ": "0",
                        " .1": "gemist",
                        " .2": "0"
                    },
                    {
                        " ": " ",
                        " .1": " ",
                        " .2": " "
                    },
                    {
                        " ": " ",
                        " .1": "DIRECT GENOMEN VRIJE TRAPPEN",
                        " .2": " "
                    },
                    {
                        " ": "1",
                        " .1": "totaal",
                        " .2": "1"
                    },
                    {
                        " ": "0",
                        " .1": "gescoord",
                        " .2": "0"
                    },
                    {
                        " ": "0",
                        " .1": "naast",
                        " .2": "0"
                    },
                    {
                        " ": "0",
                        " .1": "over",
                        " .2": "1"
                    },
                    {
                        " ": "0",
                        " .1": "op het ijzer",
                        " .2": "0"
                    }
                ],
                "duel_overzicht": [
                    {
                        "FC Eindhoven": "173",
                        " ": "duels (totaal)",
                        "FC Volendam": "173"
                    },
                    {
                        "FC Eindhoven": " ",
                        " ": " ",
                        "FC Volendam": " "
                    },
                    {
                        "FC Eindhoven": "98",
                        " ": "aanvallende duels",
                        "FC Volendam": "75"
                    },
                    {
                        "FC Eindhoven": "55",
                        " ": "aanvallende duels gewonnen",
                        "FC Volendam": "40"
                    },
                    {
                        "FC Eindhoven": "75",
                        " ": "verdedigende duels",
                        "FC Volendam": "98"
                    },
                    {
                        "FC Eindhoven": "35",
                        " ": "verdedigende duels gewonnen",
                        "FC Volendam": "43"
                    },
                    {
                        "FC Eindhoven": " ",
                        " ": " ",
                        "FC Volendam": " "
                    },
                    {
                        "FC Eindhoven": "33",
                        " ": "achterin",
                        "FC Volendam": "76"
                    },
                    {
                        "FC Eindhoven": "63",
                        " ": "middenveld",
                        "FC Volendam": "63"
                    },
                    {
                        "FC Eindhoven": "77",
                        " ": "voorin",
                        "FC Volendam": "34"
                    },
                    {
                        "FC Eindhoven": " ",
                        " ": " ",
                        "FC Volendam": " "
                    },
                    {
                        "FC Eindhoven": "33",
                        " ": "lucht duels",
                        "FC Volendam": "33"
                    },
                    {
                        "FC Eindhoven": "12",
                        " ": "sliding duels",
                        "FC Volendam": "12"
                    },
                    {
                        "FC Eindhoven": "128",
                        " ": "staande duels",
                        "FC Volendam": "128"
                    }
                ],
                "overtredingen": [
                    {
                        "1527": 2,
                        "NA": "geel",
                        "1530": 2
                    },
                    {
                        "1527": 0,
                        "NA": "tweede geel",
                        "1530": 0
                    },
                    {
                        "1527": 0,
                        "NA": "direct rood",
                        "1530": 0
                    },
                    {
                        "1527": 14,
                        "NA": "overtredingen",
                        "1530": 16
                    },
                    {
                        "1527": 4,
                        "NA": "buitenspel",
                        "1530": 6
                    }
                ],
                "spelhervattingen": [
                    {
                        "1527": " ",
                        "NA": "VRIJE TRAPPEN",
                        "1530": " "
                    },
                    {
                        "1527": "22",
                        "NA": "totaal",
                        "1530": "18"
                    },
                    {
                        "1527": "21",
                        "NA": "indirect genomen",
                        "1530": "17"
                    },
                    {
                        "1527": " ",
                        "NA": " ",
                        "1530": " "
                    },
                    {
                        "1527": " ",
                        "NA": "HOEKSCHOPPEN",
                        "1530": " "
                    },
                    {
                        "1527": "9",
                        "NA": "totaal",
                        "1530": "3"
                    },
                    {
                        "1527": "5",
                        "NA": "van links",
                        "1530": "2"
                    },
                    {
                        "1527": "4",
                        "NA": "van rechts",
                        "1530": "1"
                    },
                    {
                        "1527": "3",
                        "NA": "indraaiend",
                        "1530": "2"
                    },
                    {
                        "1527": "5",
                        "NA": "uitdraaiend",
                        "1530": "0"
                    },
                    {
                        "1527": "1",
                        "NA": "recht",
                        "1530": "1"
                    },
                    {
                        "1527": " ",
                        "NA": " ",
                        "1530": " "
                    },
                    {
                        "1527": " ",
                        "NA": "INWORPEN",
                        "1530": " "
                    },
                    {
                        "1527": "34",
                        "NA": "totaal",
                        "1530": "30"
                    },
                    {
                        "1527": "11",
                        "NA": "op eigen helft",
                        "1530": "19"
                    },
                    {
                        "1527": "23",
                        "NA": "op helft tegenstander",
                        "1530": "11"
                    }
                ],
                "gemiddelde_posities_helft1": [
                    {
                        "personID": [940],
                        "gem.lengte": [14.5115],
                        "gem.breedte": [46.9769],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [902],
                        "gem.lengte": [49.9767],
                        "gem.breedte": [81.1267],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [3359],
                        "gem.lengte": [41.4698],
                        "gem.breedte": [31.327],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [5366],
                        "gem.lengte": [40.2821],
                        "gem.breedte": [58.8205],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [18298],
                        "gem.lengte": [53.7608],
                        "gem.breedte": [11.4725],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [10527],
                        "gem.lengte": [60.2687],
                        "gem.breedte": [67.65],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [10668],
                        "gem.lengte": [52.87],
                        "gem.breedte": [38.7983],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [5418],
                        "gem.lengte": [61.6143],
                        "gem.breedte": [39.2929],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [336],
                        "gem.lengte": [81.3027],
                        "gem.breedte": [73.7243],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [13035],
                        "gem.lengte": [71.0885],
                        "gem.breedte": [39.95],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [16733],
                        "gem.lengte": [71.6308],
                        "gem.breedte": [25.7923],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [11072],
                        "gem.lengte": [32.6057],
                        "gem.breedte": [86.62],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [355],
                        "gem.lengte": [27.2136],
                        "gem.breedte": [69.4182],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [2300],
                        "gem.lengte": [19.2125],
                        "gem.breedte": [45.5292],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [25857],
                        "gem.lengte": [22.1417],
                        "gem.breedte": [17.7111],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [3343],
                        "gem.lengte": [39.8062],
                        "gem.breedte": [58.2437],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [1204],
                        "gem.lengte": [39.6423],
                        "gem.breedte": [64.0654],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [4993],
                        "gem.lengte": [38.5],
                        "gem.breedte": [30.5639],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [14351],
                        "gem.lengte": [60.1121],
                        "gem.breedte": [85.5091],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [4994],
                        "gem.lengte": [50.4833],
                        "gem.breedte": [55.6889],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [11476],
                        "gem.lengte": [55.8778],
                        "gem.breedte": [24.5667],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [323],
                        "gem.lengte": [7.7323],
                        "gem.breedte": [51.9323],
                        "teamNaam": "FC Volendam"
                    }
                ],
                "gemiddelde_posities_helft2": [
                    {
                        "personID": [940],
                        "gem.lengte": [19.6759],
                        "gem.breedte": [47.7931],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [902],
                        "gem.lengte": [46.0947],
                        "gem.breedte": [87.1132],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [3359],
                        "gem.lengte": [38.8109],
                        "gem.breedte": [46.8543],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [5366],
                        "gem.lengte": [54.6852],
                        "gem.breedte": [61.3963],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [18298],
                        "gem.lengte": [48.9032],
                        "gem.breedte": [19.2355],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [10527],
                        "gem.lengte": [61.096],
                        "gem.breedte": [60.576],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [10668],
                        "gem.lengte": [57.1189],
                        "gem.breedte": [55.5604],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [5418],
                        "gem.lengte": [60.22],
                        "gem.breedte": [46.912],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [336],
                        "gem.lengte": [71.2],
                        "gem.breedte": [74.94],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [13035],
                        "gem.lengte": [70.4889],
                        "gem.breedte": [40.0778],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [16733],
                        "gem.lengte": [59.6727],
                        "gem.breedte": [41.4091],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [606],
                        "gem.lengte": [80.2727],
                        "gem.breedte": [58.7727],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [18294],
                        "gem.lengte": [68.4684],
                        "gem.breedte": [80.9105],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [13463],
                        "gem.lengte": [46.6],
                        "gem.breedte": [53.6],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [11072],
                        "gem.lengte": [34.7481],
                        "gem.breedte": [74.6963],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [355],
                        "gem.lengte": [22.95],
                        "gem.breedte": [48.775],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [2300],
                        "gem.lengte": [32.7059],
                        "gem.breedte": [43.6353],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [25857],
                        "gem.lengte": [33.7059],
                        "gem.breedte": [17.8647],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [3343],
                        "gem.lengte": [46.4238],
                        "gem.breedte": [59.7],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [1204],
                        "gem.lengte": [61.6],
                        "gem.breedte": [62.8826],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [4993],
                        "gem.lengte": [52.4467],
                        "gem.breedte": [29.6267],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [14351],
                        "gem.lengte": [71.095],
                        "gem.breedte": [56.875],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [4994],
                        "gem.lengte": [66.5289],
                        "gem.breedte": [63.3368],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [11476],
                        "gem.lengte": [67.3829],
                        "gem.breedte": [32.0229],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [323],
                        "gem.lengte": [9.1243],
                        "gem.breedte": [48.473],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [25854],
                        "gem.lengte": [72.5667],
                        "gem.breedte": [69.9333],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [12760],
                        "gem.lengte": [46.2923],
                        "gem.breedte": [20.5462],
                        "teamNaam": "FC Volendam"
                    }
                ],
                "gemiddelde_posities_kwartier1": [
                    {
                        "personID": [940],
                        "gem.lengte": [14.41],
                        "gem.breedte": [47.67],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [902],
                        "gem.lengte": [42.3182],
                        "gem.breedte": [74.7182],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [3359],
                        "gem.lengte": [34.2429],
                        "gem.breedte": [28],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [5366],
                        "gem.lengte": [43.92],
                        "gem.breedte": [60.73],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [18298],
                        "gem.lengte": [55.0385],
                        "gem.breedte": [9.4308],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [10527],
                        "gem.lengte": [58.45],
                        "gem.breedte": [69.96],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [10668],
                        "gem.lengte": [51.1273],
                        "gem.breedte": [31.4364],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [5418],
                        "gem.lengte": [63.75],
                        "gem.breedte": [30.36],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [336],
                        "gem.lengte": [79.5231],
                        "gem.breedte": [66.8538],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [13035],
                        "gem.lengte": [71.5625],
                        "gem.breedte": [34.8375],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [16733],
                        "gem.lengte": [66.69],
                        "gem.breedte": [15.93],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [11072],
                        "gem.lengte": [38.26],
                        "gem.breedte": [95.99],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [355],
                        "gem.lengte": [23.5111],
                        "gem.breedte": [74.4444],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [2300],
                        "gem.lengte": [19.1],
                        "gem.breedte": [42.9941],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [25857],
                        "gem.lengte": [24.7353],
                        "gem.breedte": [17.0647],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [3343],
                        "gem.lengte": [36.7333],
                        "gem.breedte": [58.4333],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [1204],
                        "gem.lengte": [43.9769],
                        "gem.breedte": [59.0231],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [4993],
                        "gem.lengte": [37.0867],
                        "gem.breedte": [28.0733],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [14351],
                        "gem.lengte": [68.8917],
                        "gem.breedte": [91.1],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [4994],
                        "gem.lengte": [58.5364],
                        "gem.breedte": [60.8],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [11476],
                        "gem.lengte": [63.15],
                        "gem.breedte": [25.6667],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [323],
                        "gem.lengte": [9.1364],
                        "gem.breedte": [53.4818],
                        "teamNaam": "FC Volendam"
                    }
                ],
                "gemiddelde_posities_kwartier2": [
                    {
                        "personID": [940],
                        "gem.lengte": [13.75],
                        "gem.breedte": [48.77],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [902],
                        "gem.lengte": [46.8778],
                        "gem.breedte": [84.9556],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [3359],
                        "gem.lengte": [43.9103],
                        "gem.breedte": [32.1793],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [5366],
                        "gem.lengte": [39.9643],
                        "gem.breedte": [63.9571],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [18298],
                        "gem.lengte": [53.5353],
                        "gem.breedte": [13.4353],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [10527],
                        "gem.lengte": [57.58],
                        "gem.breedte": [72.58],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [10668],
                        "gem.lengte": [47.0842],
                        "gem.breedte": [43.3526],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [5418],
                        "gem.lengte": [54.2125],
                        "gem.breedte": [35.0875],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [336],
                        "gem.lengte": [74.1167],
                        "gem.breedte": [65.2333],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [13035],
                        "gem.lengte": [67.7857],
                        "gem.breedte": [47.4857],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [16733],
                        "gem.lengte": [72.7],
                        "gem.breedte": [20.8],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [11072],
                        "gem.lengte": [27.2091],
                        "gem.breedte": [84.1],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [355],
                        "gem.lengte": [29.66],
                        "gem.breedte": [77.08],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [2300],
                        "gem.lengte": [25.1],
                        "gem.breedte": [32],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [25857],
                        "gem.lengte": [21.48],
                        "gem.breedte": [17.35],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [3343],
                        "gem.lengte": [45.0286],
                        "gem.breedte": [56.9286],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [1204],
                        "gem.lengte": [27.52],
                        "gem.breedte": [69.36],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [4993],
                        "gem.lengte": [48.1818],
                        "gem.breedte": [22.6455],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [14351],
                        "gem.lengte": [50.7667],
                        "gem.breedte": [88.3833],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [4994],
                        "gem.lengte": [40.15],
                        "gem.breedte": [51.05],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [11476],
                        "gem.lengte": [55.7556],
                        "gem.breedte": [18.1889],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [323],
                        "gem.lengte": [7.6375],
                        "gem.breedte": [49.6875],
                        "teamNaam": "FC Volendam"
                    }
                ],
                "gemiddelde_posities_kwartier3": [
                    {
                        "personID": [940],
                        "gem.lengte": [15.95],
                        "gem.breedte": [42.8333],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [902],
                        "gem.lengte": [61.19],
                        "gem.breedte": [84.73],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [3359],
                        "gem.lengte": [42.99],
                        "gem.breedte": [32.42],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [5366],
                        "gem.lengte": [38.1533],
                        "gem.breedte": [52.7533],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [18298],
                        "gem.lengte": [53.1524],
                        "gem.breedte": [11.1476],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [10527],
                        "gem.lengte": [64.025],
                        "gem.breedte": [61.6167],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [10668],
                        "gem.lengte": [60.6737],
                        "gem.breedte": [42.7684],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [5418],
                        "gem.lengte": [65.4],
                        "gem.breedte": [51.59],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [336],
                        "gem.lengte": [84.9833],
                        "gem.breedte": [81.5167],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [13035],
                        "gem.lengte": [72.8455],
                        "gem.breedte": [38.8727],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [16733],
                        "gem.lengte": [75.6364],
                        "gem.breedte": [37.0273],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [11072],
                        "gem.lengte": [32.8071],
                        "gem.breedte": [81.9071],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [355],
                        "gem.lengte": [29.85],
                        "gem.breedte": [58.975],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [2300],
                        "gem.lengte": [18.55],
                        "gem.breedte": [54.9667],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [25857],
                        "gem.lengte": [17.9778],
                        "gem.breedte": [19.3333],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [3343],
                        "gem.lengte": [33.7667],
                        "gem.breedte": [60.9333],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [1204],
                        "gem.lengte": [40.175],
                        "gem.breedte": [68.95],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [4993],
                        "gem.lengte": [29.97],
                        "gem.breedte": [43.01],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [14351],
                        "gem.lengte": [56.8267],
                        "gem.breedte": [79.8867],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [4994],
                        "gem.lengte": [34.7333],
                        "gem.breedte": [43.1333],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [11476],
                        "gem.lengte": [41.5167],
                        "gem.breedte": [31.9333],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [323],
                        "gem.lengte": [6.5083],
                        "gem.breedte": [52.0083],
                        "teamNaam": "FC Volendam"
                    }
                ],
                "gemiddelde_posities_kwartier4": [
                    {
                        "personID": [940],
                        "gem.lengte": [12.9889],
                        "gem.breedte": [45.8667],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [902],
                        "gem.lengte": [52.35],
                        "gem.breedte": [85.18],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [3359],
                        "gem.lengte": [36.1588],
                        "gem.breedte": [40.2235],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [5366],
                        "gem.lengte": [44.87],
                        "gem.breedte": [73.77],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [18298],
                        "gem.lengte": [50.55],
                        "gem.breedte": [19.9062],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [10527],
                        "gem.lengte": [68.0923],
                        "gem.breedte": [62.2385],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [10668],
                        "gem.lengte": [57.4278],
                        "gem.breedte": [48.5389],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [5418],
                        "gem.lengte": [71.175],
                        "gem.breedte": [31.325],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [336],
                        "gem.lengte": [70.8286],
                        "gem.breedte": [73.8143],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [13035],
                        "gem.lengte": [66.8167],
                        "gem.breedte": [32.1333],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [16733],
                        "gem.lengte": [50.475],
                        "gem.breedte": [24.55],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [11072],
                        "gem.lengte": [42.6538],
                        "gem.breedte": [79.9615],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [355],
                        "gem.lengte": [30.5],
                        "gem.breedte": [52],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [2300],
                        "gem.lengte": [19.8333],
                        "gem.breedte": [48.8833],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [25857],
                        "gem.lengte": [27.8875],
                        "gem.breedte": [20.425],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [3343],
                        "gem.lengte": [32.375],
                        "gem.breedte": [41.6],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [1204],
                        "gem.lengte": [71.3],
                        "gem.breedte": [74.5857],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [4993],
                        "gem.lengte": [39.0333],
                        "gem.breedte": [21.6333],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [14351],
                        "gem.lengte": [77.1],
                        "gem.breedte": [62.1],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [4994],
                        "gem.lengte": [59.525],
                        "gem.breedte": [53.5375],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [11476],
                        "gem.lengte": [60.35],
                        "gem.breedte": [22.4],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [323],
                        "gem.lengte": [9.0312],
                        "gem.breedte": [49.2313],
                        "teamNaam": "FC Volendam"
                    }
                ],
                "gemiddelde_posities_kwartier5": [
                    {
                        "personID": [940],
                        "gem.lengte": [10.4167],
                        "gem.breedte": [48.3333],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [902],
                        "gem.lengte": [55.52],
                        "gem.breedte": [94.99],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [3359],
                        "gem.lengte": [40.7786],
                        "gem.breedte": [47.5357],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [5366],
                        "gem.lengte": [57.8333],
                        "gem.breedte": [57.475],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [18298],
                        "gem.lengte": [44.3],
                        "gem.breedte": [15.4667],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [10527],
                        "gem.lengte": [52.0667],
                        "gem.breedte": [65.7333],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [10668],
                        "gem.lengte": [59.2786],
                        "gem.breedte": [57.1786],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [5418],
                        "gem.lengte": [54.75],
                        "gem.breedte": [54.3125],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [336],
                        "gem.lengte": [76.4],
                        "gem.breedte": [90.7],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [13035],
                        "gem.lengte": [77.8333],
                        "gem.breedte": [55.9667],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [16733],
                        "gem.lengte": [78.45],
                        "gem.breedte": [49.25],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [606],
                        "gem.lengte": [85.3333],
                        "gem.breedte": [46.9333],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [18294],
                        "gem.lengte": [74.9375],
                        "gem.breedte": [79.5125],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [11072],
                        "gem.lengte": [33.9667],
                        "gem.breedte": [73.0111],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [355],
                        "gem.lengte": [18.4],
                        "gem.breedte": [43.475],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [2300],
                        "gem.lengte": [50.2],
                        "gem.breedte": [43.6667],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [25857],
                        "gem.lengte": [25.4857],
                        "gem.breedte": [14.3857],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [3343],
                        "gem.lengte": [33.5167],
                        "gem.breedte": [50.5167],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [1204],
                        "gem.lengte": [58.5],
                        "gem.breedte": [68.33],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [4993],
                        "gem.lengte": [65.9667],
                        "gem.breedte": [73.6333],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [14351],
                        "gem.lengte": [61.4944],
                        "gem.breedte": [63.2611],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [4994],
                        "gem.lengte": [70.7],
                        "gem.breedte": [72.9182],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [11476],
                        "gem.lengte": [66.8],
                        "gem.breedte": [48.85],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [323],
                        "gem.lengte": [10.4333],
                        "gem.breedte": [46.3333],
                        "teamNaam": "FC Volendam"
                    }
                ],
                "gemiddelde_posities_kwartier6": [
                    {
                        "personID": [940],
                        "gem.lengte": [27.9429],
                        "gem.breedte": [48.8],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [902],
                        "gem.lengte": [37.3833],
                        "gem.breedte": [83.8111],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [3359],
                        "gem.lengte": [39.98],
                        "gem.breedte": [53.7333],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [5366],
                        "gem.lengte": [66.76],
                        "gem.breedte": [46.06],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [18298],
                        "gem.lengte": [58.5333],
                        "gem.breedte": [30.7333],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [10527],
                        "gem.lengte": [54.9667],
                        "gem.breedte": [51.8167],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [10668],
                        "gem.lengte": [55.4143],
                        "gem.breedte": [60.5],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [5418],
                        "gem.lengte": [55.3444],
                        "gem.breedte": [54.1889],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [16733],
                        "gem.lengte": [59.52],
                        "gem.breedte": [51.76],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [606],
                        "gem.lengte": [78.375],
                        "gem.breedte": [63.2125],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [18294],
                        "gem.lengte": [63.7636],
                        "gem.breedte": [81.9273],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [13463],
                        "gem.lengte": [46.6],
                        "gem.breedte": [53.6],
                        "teamNaam": "FC Eindhoven"
                    },
                    {
                        "personID": [11072],
                        "gem.lengte": [15.6],
                        "gem.breedte": [64.04],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [355],
                        "gem.lengte": [22.06],
                        "gem.breedte": [51.08],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [2300],
                        "gem.lengte": [35.8],
                        "gem.breedte": [39.6875],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [25857],
                        "gem.lengte": [39.1842],
                        "gem.breedte": [18.0684],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [3343],
                        "gem.lengte": [58.5727],
                        "gem.breedte": [71.2909],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [1204],
                        "gem.lengte": [55.45],
                        "gem.breedte": [40.15],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [4993],
                        "gem.lengte": [52.4111],
                        "gem.breedte": [17.6222],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [14351],
                        "gem.lengte": [80.4917],
                        "gem.breedte": [42.9417],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [4994],
                        "gem.lengte": [67.0632],
                        "gem.breedte": [61.9158],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [11476],
                        "gem.lengte": [72.46],
                        "gem.breedte": [27.22],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [323],
                        "gem.lengte": [8.7],
                        "gem.breedte": [48.52],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [25854],
                        "gem.lengte": [72.5667],
                        "gem.breedte": [69.9333],
                        "teamNaam": "FC Volendam"
                    },
                    {
                        "personID": [12760],
                        "gem.lengte": [46.2923],
                        "gem.breedte": [20.5462],
                        "teamNaam": "FC Volendam"
                    }
                ]
            },
            "team_matrix": [
                {
                    "1527": "62%",
                    "1530": "38%",
                    "_row": "Balbezit"
                },
                {
                    "1527": "389",
                    "1530": "241",
                    "_row": "Tot. aantal passes"
                },
                {
                    "1527": "68%",
                    "1530": "56%",
                    "_row": "Geslaagde passes"
                },
                {
                    "1527": "23.5 m.",
                    "1530": "21.3 m.",
                    "_row": "Gem. lengte passes"
                },
                {
                    "1527": "16",
                    "1530": "11",
                    "_row": "Doelpogingen"
                },
                {
                    "1527": "52%",
                    "1530": "48%",
                    "_row": "Gewonnen duels"
                },
                {
                    "1527": "2",
                    "1530": "2",
                    "_row": "Gele kaarten"
                },
                {
                    "1527": "0",
                    "1530": "0",
                    "_row": "Rode kaarten"
                }
            ],
            "team_data": {
                "duel_matrix_hele_wedstrijd": {
                    "thuis": [
                        {
                            "1": "336",
                            "323": 1,
                            "355": 0,
                            "1204": 0,
                            "2300": 2,
                            "3343": 0,
                            "4993": 3,
                            "4994": 0,
                            "11072": 0,
                            "11476": 1,
                            "12760": 0,
                            "14351": 0,
                            "25854": 0,
                            "25857": 11,
                            "TOTAAL": 18,
                            "_row": "1"
                        },
                        {
                            "1": "606",
                            "323": 0,
                            "355": 1,
                            "1204": 0,
                            "2300": 2,
                            "3343": 1,
                            "4993": 0,
                            "4994": 0,
                            "11072": 1,
                            "11476": 0,
                            "12760": 0,
                            "14351": 0,
                            "25854": 0,
                            "25857": 0,
                            "TOTAAL": 5,
                            "_row": "2"
                        },
                        {
                            "1": "902",
                            "323": 0,
                            "355": 0,
                            "1204": 0,
                            "2300": 0,
                            "3343": 0,
                            "4993": 0,
                            "4994": 0,
                            "11072": 0,
                            "11476": 9,
                            "12760": 1,
                            "14351": 1,
                            "25854": 0,
                            "25857": 0,
                            "TOTAAL": 11,
                            "_row": "3"
                        },
                        {
                            "1": "3359",
                            "323": 0,
                            "355": 0,
                            "1204": 1,
                            "2300": 0,
                            "3343": 4,
                            "4993": 0,
                            "4994": 4,
                            "11072": 1,
                            "11476": 1,
                            "12760": 0,
                            "14351": 3,
                            "25854": 0,
                            "25857": 1,
                            "TOTAAL": 15,
                            "_row": "4"
                        },
                        {
                            "1": "5366",
                            "323": 0,
                            "355": 3,
                            "1204": 1,
                            "2300": 2,
                            "3343": 0,
                            "4993": 0,
                            "4994": 8,
                            "11072": 1,
                            "11476": 0,
                            "12760": 0,
                            "14351": 0,
                            "25854": 0,
                            "25857": 0,
                            "TOTAAL": 15,
                            "_row": "5"
                        },
                        {
                            "1": "5418",
                            "323": 0,
                            "355": 0,
                            "1204": 1,
                            "2300": 0,
                            "3343": 7,
                            "4993": 0,
                            "4994": 0,
                            "11072": 1,
                            "11476": 1,
                            "12760": 0,
                            "14351": 1,
                            "25854": 1,
                            "25857": 0,
                            "TOTAAL": 12,
                            "_row": "6"
                        },
                        {
                            "1": "10527",
                            "323": 0,
                            "355": 0,
                            "1204": 1,
                            "2300": 0,
                            "3343": 0,
                            "4993": 5,
                            "4994": 3,
                            "11072": 0,
                            "11476": 4,
                            "12760": 0,
                            "14351": 2,
                            "25854": 0,
                            "25857": 1,
                            "TOTAAL": 16,
                            "_row": "7"
                        },
                        {
                            "1": "10668",
                            "323": 0,
                            "355": 0,
                            "1204": 4,
                            "2300": 0,
                            "3343": 0,
                            "4993": 2,
                            "4994": 6,
                            "11072": 0,
                            "11476": 2,
                            "12760": 1,
                            "14351": 6,
                            "25854": 0,
                            "25857": 0,
                            "TOTAAL": 21,
                            "_row": "8"
                        },
                        {
                            "1": "13035",
                            "323": 1,
                            "355": 11,
                            "1204": 1,
                            "2300": 2,
                            "3343": 0,
                            "4993": 1,
                            "4994": 0,
                            "11072": 3,
                            "11476": 0,
                            "12760": 0,
                            "14351": 0,
                            "25854": 0,
                            "25857": 0,
                            "TOTAAL": 19,
                            "_row": "9"
                        },
                        {
                            "1": "13463",
                            "323": 0,
                            "355": 0,
                            "1204": 0,
                            "2300": 0,
                            "3343": 0,
                            "4993": 0,
                            "4994": 1,
                            "11072": 0,
                            "11476": 0,
                            "12760": 0,
                            "14351": 0,
                            "25854": 0,
                            "25857": 0,
                            "TOTAAL": 1,
                            "_row": "10"
                        },
                        {
                            "1": "16733",
                            "323": 0,
                            "355": 0,
                            "1204": 3,
                            "2300": 1,
                            "3343": 1,
                            "4993": 0,
                            "4994": 1,
                            "11072": 7,
                            "11476": 0,
                            "12760": 0,
                            "14351": 1,
                            "25854": 0,
                            "25857": 1,
                            "TOTAAL": 15,
                            "_row": "11"
                        },
                        {
                            "1": "18294",
                            "323": 0,
                            "355": 0,
                            "1204": 1,
                            "2300": 1,
                            "3343": 0,
                            "4993": 1,
                            "4994": 0,
                            "11072": 0,
                            "11476": 1,
                            "12760": 0,
                            "14351": 0,
                            "25854": 0,
                            "25857": 6,
                            "TOTAAL": 10,
                            "_row": "12"
                        },
                        {
                            "1": "18298",
                            "323": 0,
                            "355": 0,
                            "1204": 1,
                            "2300": 0,
                            "3343": 0,
                            "4993": 0,
                            "4994": 1,
                            "11072": 1,
                            "11476": 0,
                            "12760": 0,
                            "14351": 12,
                            "25854": 0,
                            "25857": 0,
                            "TOTAAL": 15,
                            "_row": "13"
                        },
                        {
                            "1": "",
                            "323": 2,
                            "355": 15,
                            "1204": 14,
                            "2300": 10,
                            "3343": 13,
                            "4993": 12,
                            "4994": 24,
                            "11072": 15,
                            "11476": 19,
                            "12760": 2,
                            "14351": 26,
                            "25854": 1,
                            "25857": 20,
                            "TOTAAL": 173,
                            "_row": "TOTAAL"
                        }
                    ],
                    "uit": [
                        {
                            "1": "323",
                            "336": 1,
                            "606": 0,
                            "902": 0,
                            "3359": 0,
                            "5366": 0,
                            "5418": 0,
                            "10527": 0,
                            "10668": 0,
                            "13035": 1,
                            "13463": 0,
                            "16733": 0,
                            "18294": 0,
                            "18298": 0,
                            "TOTAAL": 2,
                            "_row": "1"
                        },
                        {
                            "1": "355",
                            "336": 0,
                            "606": 1,
                            "902": 0,
                            "3359": 0,
                            "5366": 3,
                            "5418": 0,
                            "10527": 0,
                            "10668": 0,
                            "13035": 11,
                            "13463": 0,
                            "16733": 0,
                            "18294": 0,
                            "18298": 0,
                            "TOTAAL": 15,
                            "_row": "2"
                        },
                        {
                            "1": "1204",
                            "336": 0,
                            "606": 0,
                            "902": 0,
                            "3359": 1,
                            "5366": 1,
                            "5418": 1,
                            "10527": 1,
                            "10668": 4,
                            "13035": 1,
                            "13463": 0,
                            "16733": 3,
                            "18294": 1,
                            "18298": 1,
                            "TOTAAL": 14,
                            "_row": "3"
                        },
                        {
                            "1": "2300",
                            "336": 2,
                            "606": 2,
                            "902": 0,
                            "3359": 0,
                            "5366": 2,
                            "5418": 0,
                            "10527": 0,
                            "10668": 0,
                            "13035": 2,
                            "13463": 0,
                            "16733": 1,
                            "18294": 1,
                            "18298": 0,
                            "TOTAAL": 10,
                            "_row": "4"
                        },
                        {
                            "1": "3343",
                            "336": 0,
                            "606": 1,
                            "902": 0,
                            "3359": 4,
                            "5366": 0,
                            "5418": 7,
                            "10527": 0,
                            "10668": 0,
                            "13035": 0,
                            "13463": 0,
                            "16733": 1,
                            "18294": 0,
                            "18298": 0,
                            "TOTAAL": 13,
                            "_row": "5"
                        },
                        {
                            "1": "4993",
                            "336": 3,
                            "606": 0,
                            "902": 0,
                            "3359": 0,
                            "5366": 0,
                            "5418": 0,
                            "10527": 5,
                            "10668": 2,
                            "13035": 1,
                            "13463": 0,
                            "16733": 0,
                            "18294": 1,
                            "18298": 0,
                            "TOTAAL": 12,
                            "_row": "6"
                        },
                        {
                            "1": "4994",
                            "336": 0,
                            "606": 0,
                            "902": 0,
                            "3359": 4,
                            "5366": 8,
                            "5418": 0,
                            "10527": 3,
                            "10668": 6,
                            "13035": 0,
                            "13463": 1,
                            "16733": 1,
                            "18294": 0,
                            "18298": 1,
                            "TOTAAL": 24,
                            "_row": "7"
                        },
                        {
                            "1": "11072",
                            "336": 0,
                            "606": 1,
                            "902": 0,
                            "3359": 1,
                            "5366": 1,
                            "5418": 1,
                            "10527": 0,
                            "10668": 0,
                            "13035": 3,
                            "13463": 0,
                            "16733": 7,
                            "18294": 0,
                            "18298": 1,
                            "TOTAAL": 15,
                            "_row": "8"
                        },
                        {
                            "1": "11476",
                            "336": 1,
                            "606": 0,
                            "902": 9,
                            "3359": 1,
                            "5366": 0,
                            "5418": 1,
                            "10527": 4,
                            "10668": 2,
                            "13035": 0,
                            "13463": 0,
                            "16733": 0,
                            "18294": 1,
                            "18298": 0,
                            "TOTAAL": 19,
                            "_row": "9"
                        },
                        {
                            "1": "12760",
                            "336": 0,
                            "606": 0,
                            "902": 1,
                            "3359": 0,
                            "5366": 0,
                            "5418": 0,
                            "10527": 0,
                            "10668": 1,
                            "13035": 0,
                            "13463": 0,
                            "16733": 0,
                            "18294": 0,
                            "18298": 0,
                            "TOTAAL": 2,
                            "_row": "10"
                        },
                        {
                            "1": "14351",
                            "336": 0,
                            "606": 0,
                            "902": 1,
                            "3359": 3,
                            "5366": 0,
                            "5418": 1,
                            "10527": 2,
                            "10668": 6,
                            "13035": 0,
                            "13463": 0,
                            "16733": 1,
                            "18294": 0,
                            "18298": 12,
                            "TOTAAL": 26,
                            "_row": "11"
                        },
                        {
                            "1": "25854",
                            "336": 0,
                            "606": 0,
                            "902": 0,
                            "3359": 0,
                            "5366": 0,
                            "5418": 1,
                            "10527": 0,
                            "10668": 0,
                            "13035": 0,
                            "13463": 0,
                            "16733": 0,
                            "18294": 0,
                            "18298": 0,
                            "TOTAAL": 1,
                            "_row": "12"
                        },
                        {
                            "1": "25857",
                            "336": 11,
                            "606": 0,
                            "902": 0,
                            "3359": 1,
                            "5366": 0,
                            "5418": 0,
                            "10527": 1,
                            "10668": 0,
                            "13035": 0,
                            "13463": 0,
                            "16733": 1,
                            "18294": 6,
                            "18298": 0,
                            "TOTAAL": 20,
                            "_row": "13"
                        },
                        {
                            "1": "",
                            "336": 18,
                            "606": 5,
                            "902": 11,
                            "3359": 15,
                            "5366": 15,
                            "5418": 12,
                            "10527": 16,
                            "10668": 21,
                            "13035": 19,
                            "13463": 1,
                            "16733": 15,
                            "18294": 10,
                            "18298": 15,
                            "TOTAAL": 173,
                            "_row": "TOTAAL"
                        }
                    ]
                },
                "duel_matrix_eerste_helft": {
                    "thuis": [
                        {
                            "1": "336",
                            "323": 1,
                            "355": 0,
                            "1204": 0,
                            "2300": 2,
                            "3343": 0,
                            "4993": 3,
                            "4994": 0,
                            "11072": 0,
                            "11476": 1,
                            "14351": 0,
                            "25857": 8,
                            "TOTAAL": 15,
                            "_row": "1"
                        },
                        {
                            "1": "902",
                            "323": 0,
                            "355": 0,
                            "1204": 0,
                            "2300": 0,
                            "3343": 0,
                            "4993": 0,
                            "4994": 0,
                            "11072": 0,
                            "11476": 6,
                            "14351": 0,
                            "25857": 0,
                            "TOTAAL": 6,
                            "_row": "2"
                        },
                        {
                            "1": "3359",
                            "323": 0,
                            "355": 0,
                            "1204": 1,
                            "2300": 0,
                            "3343": 1,
                            "4993": 0,
                            "4994": 2,
                            "11072": 1,
                            "11476": 0,
                            "14351": 2,
                            "25857": 0,
                            "TOTAAL": 7,
                            "_row": "3"
                        },
                        {
                            "1": "5366",
                            "323": 0,
                            "355": 0,
                            "1204": 1,
                            "2300": 0,
                            "3343": 0,
                            "4993": 0,
                            "4994": 4,
                            "11072": 0,
                            "11476": 0,
                            "14351": 0,
                            "25857": 0,
                            "TOTAAL": 5,
                            "_row": "4"
                        },
                        {
                            "1": "5418",
                            "323": 0,
                            "355": 0,
                            "1204": 0,
                            "2300": 0,
                            "3343": 4,
                            "4993": 0,
                            "4994": 0,
                            "11072": 1,
                            "11476": 0,
                            "14351": 0,
                            "25857": 0,
                            "TOTAAL": 5,
                            "_row": "5"
                        },
                        {
                            "1": "10527",
                            "323": 0,
                            "355": 0,
                            "1204": 0,
                            "2300": 0,
                            "3343": 0,
                            "4993": 4,
                            "4994": 1,
                            "11072": 0,
                            "11476": 3,
                            "14351": 1,
                            "25857": 0,
                            "TOTAAL": 9,
                            "_row": "6"
                        },
                        {
                            "1": "10668",
                            "323": 0,
                            "355": 0,
                            "1204": 2,
                            "2300": 0,
                            "3343": 0,
                            "4993": 0,
                            "4994": 2,
                            "11072": 0,
                            "11476": 1,
                            "14351": 3,
                            "25857": 0,
                            "TOTAAL": 8,
                            "_row": "7"
                        },
                        {
                            "1": "13035",
                            "323": 1,
                            "355": 9,
                            "1204": 1,
                            "2300": 1,
                            "3343": 0,
                            "4993": 1,
                            "4994": 0,
                            "11072": 3,
                            "11476": 0,
                            "14351": 0,
                            "25857": 0,
                            "TOTAAL": 16,
                            "_row": "8"
                        },
                        {
                            "1": "16733",
                            "323": 0,
                            "355": 0,
                            "1204": 3,
                            "2300": 1,
                            "3343": 1,
                            "4993": 0,
                            "4994": 0,
                            "11072": 5,
                            "11476": 0,
                            "14351": 1,
                            "25857": 0,
                            "TOTAAL": 11,
                            "_row": "9"
                        },
                        {
                            "1": "18298",
                            "323": 0,
                            "355": 0,
                            "1204": 1,
                            "2300": 0,
                            "3343": 0,
                            "4993": 0,
                            "4994": 0,
                            "11072": 0,
                            "11476": 0,
                            "14351": 6,
                            "25857": 0,
                            "TOTAAL": 7,
                            "_row": "10"
                        },
                        {
                            "1": "",
                            "323": 2,
                            "355": 9,
                            "1204": 9,
                            "2300": 4,
                            "3343": 6,
                            "4993": 8,
                            "4994": 9,
                            "11072": 10,
                            "11476": 11,
                            "14351": 13,
                            "25857": 8,
                            "TOTAAL": 89,
                            "_row": "TOTAAL"
                        }
                    ],
                    "uit": [
                        {
                            "1": "323",
                            "336": 1,
                            "902": 0,
                            "3359": 0,
                            "5366": 0,
                            "5418": 0,
                            "10527": 0,
                            "10668": 0,
                            "13035": 1,
                            "16733": 0,
                            "18298": 0,
                            "TOTAAL": 2,
                            "_row": "1"
                        },
                        {
                            "1": "355",
                            "336": 0,
                            "902": 0,
                            "3359": 0,
                            "5366": 0,
                            "5418": 0,
                            "10527": 0,
                            "10668": 0,
                            "13035": 9,
                            "16733": 0,
                            "18298": 0,
                            "TOTAAL": 9,
                            "_row": "2"
                        },
                        {
                            "1": "1204",
                            "336": 0,
                            "902": 0,
                            "3359": 1,
                            "5366": 1,
                            "5418": 0,
                            "10527": 0,
                            "10668": 2,
                            "13035": 1,
                            "16733": 3,
                            "18298": 1,
                            "TOTAAL": 9,
                            "_row": "3"
                        },
                        {
                            "1": "2300",
                            "336": 2,
                            "902": 0,
                            "3359": 0,
                            "5366": 0,
                            "5418": 0,
                            "10527": 0,
                            "10668": 0,
                            "13035": 1,
                            "16733": 1,
                            "18298": 0,
                            "TOTAAL": 4,
                            "_row": "4"
                        },
                        {
                            "1": "3343",
                            "336": 0,
                            "902": 0,
                            "3359": 1,
                            "5366": 0,
                            "5418": 4,
                            "10527": 0,
                            "10668": 0,
                            "13035": 0,
                            "16733": 1,
                            "18298": 0,
                            "TOTAAL": 6,
                            "_row": "5"
                        },
                        {
                            "1": "4993",
                            "336": 3,
                            "902": 0,
                            "3359": 0,
                            "5366": 0,
                            "5418": 0,
                            "10527": 4,
                            "10668": 0,
                            "13035": 1,
                            "16733": 0,
                            "18298": 0,
                            "TOTAAL": 8,
                            "_row": "6"
                        },
                        {
                            "1": "4994",
                            "336": 0,
                            "902": 0,
                            "3359": 2,
                            "5366": 4,
                            "5418": 0,
                            "10527": 1,
                            "10668": 2,
                            "13035": 0,
                            "16733": 0,
                            "18298": 0,
                            "TOTAAL": 9,
                            "_row": "7"
                        },
                        {
                            "1": "11072",
                            "336": 0,
                            "902": 0,
                            "3359": 1,
                            "5366": 0,
                            "5418": 1,
                            "10527": 0,
                            "10668": 0,
                            "13035": 3,
                            "16733": 5,
                            "18298": 0,
                            "TOTAAL": 10,
                            "_row": "8"
                        },
                        {
                            "1": "11476",
                            "336": 1,
                            "902": 6,
                            "3359": 0,
                            "5366": 0,
                            "5418": 0,
                            "10527": 3,
                            "10668": 1,
                            "13035": 0,
                            "16733": 0,
                            "18298": 0,
                            "TOTAAL": 11,
                            "_row": "9"
                        },
                        {
                            "1": "14351",
                            "336": 0,
                            "902": 0,
                            "3359": 2,
                            "5366": 0,
                            "5418": 0,
                            "10527": 1,
                            "10668": 3,
                            "13035": 0,
                            "16733": 1,
                            "18298": 6,
                            "TOTAAL": 13,
                            "_row": "10"
                        },
                        {
                            "1": "25857",
                            "336": 8,
                            "902": 0,
                            "3359": 0,
                            "5366": 0,
                            "5418": 0,
                            "10527": 0,
                            "10668": 0,
                            "13035": 0,
                            "16733": 0,
                            "18298": 0,
                            "TOTAAL": 8,
                            "_row": "11"
                        },
                        {
                            "1": "",
                            "336": 15,
                            "902": 6,
                            "3359": 7,
                            "5366": 5,
                            "5418": 5,
                            "10527": 9,
                            "10668": 8,
                            "13035": 16,
                            "16733": 11,
                            "18298": 7,
                            "TOTAAL": 89,
                            "_row": "TOTAAL"
                        }
                    ]
                },
                "duel_matrix_tweede_helft": {
                    "thuis": [
                        {
                            "1": "336",
                            "355": 0,
                            "1204": 0,
                            "2300": 0,
                            "3343": 0,
                            "4993": 0,
                            "4994": 0,
                            "11072": 0,
                            "11476": 0,
                            "12760": 0,
                            "14351": 0,
                            "25854": 0,
                            "25857": 3,
                            "TOTAAL": 3,
                            "_row": "1"
                        },
                        {
                            "1": "606",
                            "355": 1,
                            "1204": 0,
                            "2300": 2,
                            "3343": 1,
                            "4993": 0,
                            "4994": 0,
                            "11072": 1,
                            "11476": 0,
                            "12760": 0,
                            "14351": 0,
                            "25854": 0,
                            "25857": 0,
                            "TOTAAL": 5,
                            "_row": "2"
                        },
                        {
                            "1": "902",
                            "355": 0,
                            "1204": 0,
                            "2300": 0,
                            "3343": 0,
                            "4993": 0,
                            "4994": 0,
                            "11072": 0,
                            "11476": 3,
                            "12760": 1,
                            "14351": 1,
                            "25854": 0,
                            "25857": 0,
                            "TOTAAL": 5,
                            "_row": "3"
                        },
                        {
                            "1": "3359",
                            "355": 0,
                            "1204": 0,
                            "2300": 0,
                            "3343": 3,
                            "4993": 0,
                            "4994": 2,
                            "11072": 0,
                            "11476": 1,
                            "12760": 0,
                            "14351": 1,
                            "25854": 0,
                            "25857": 1,
                            "TOTAAL": 8,
                            "_row": "4"
                        },
                        {
                            "1": "5366",
                            "355": 3,
                            "1204": 0,
                            "2300": 2,
                            "3343": 0,
                            "4993": 0,
                            "4994": 4,
                            "11072": 1,
                            "11476": 0,
                            "12760": 0,
                            "14351": 0,
                            "25854": 0,
                            "25857": 0,
                            "TOTAAL": 10,
                            "_row": "5"
                        },
                        {
                            "1": "5418",
                            "355": 0,
                            "1204": 1,
                            "2300": 0,
                            "3343": 3,
                            "4993": 0,
                            "4994": 0,
                            "11072": 0,
                            "11476": 1,
                            "12760": 0,
                            "14351": 1,
                            "25854": 1,
                            "25857": 0,
                            "TOTAAL": 7,
                            "_row": "6"
                        },
                        {
                            "1": "10527",
                            "355": 0,
                            "1204": 1,
                            "2300": 0,
                            "3343": 0,
                            "4993": 1,
                            "4994": 2,
                            "11072": 0,
                            "11476": 1,
                            "12760": 0,
                            "14351": 1,
                            "25854": 0,
                            "25857": 1,
                            "TOTAAL": 7,
                            "_row": "7"
                        },
                        {
                            "1": "10668",
                            "355": 0,
                            "1204": 2,
                            "2300": 0,
                            "3343": 0,
                            "4993": 2,
                            "4994": 4,
                            "11072": 0,
                            "11476": 1,
                            "12760": 1,
                            "14351": 3,
                            "25854": 0,
                            "25857": 0,
                            "TOTAAL": 13,
                            "_row": "8"
                        },
                        {
                            "1": "13035",
                            "355": 2,
                            "1204": 0,
                            "2300": 1,
                            "3343": 0,
                            "4993": 0,
                            "4994": 0,
                            "11072": 0,
                            "11476": 0,
                            "12760": 0,
                            "14351": 0,
                            "25854": 0,
                            "25857": 0,
                            "TOTAAL": 3,
                            "_row": "9"
                        },
                        {
                            "1": "13463",
                            "355": 0,
                            "1204": 0,
                            "2300": 0,
                            "3343": 0,
                            "4993": 0,
                            "4994": 1,
                            "11072": 0,
                            "11476": 0,
                            "12760": 0,
                            "14351": 0,
                            "25854": 0,
                            "25857": 0,
                            "TOTAAL": 1,
                            "_row": "10"
                        },
                        {
                            "1": "16733",
                            "355": 0,
                            "1204": 0,
                            "2300": 0,
                            "3343": 0,
                            "4993": 0,
                            "4994": 1,
                            "11072": 2,
                            "11476": 0,
                            "12760": 0,
                            "14351": 0,
                            "25854": 0,
                            "25857": 1,
                            "TOTAAL": 4,
                            "_row": "11"
                        },
                        {
                            "1": "18294",
                            "355": 0,
                            "1204": 1,
                            "2300": 1,
                            "3343": 0,
                            "4993": 1,
                            "4994": 0,
                            "11072": 0,
                            "11476": 1,
                            "12760": 0,
                            "14351": 0,
                            "25854": 0,
                            "25857": 6,
                            "TOTAAL": 10,
                            "_row": "12"
                        },
                        {
                            "1": "18298",
                            "355": 0,
                            "1204": 0,
                            "2300": 0,
                            "3343": 0,
                            "4993": 0,
                            "4994": 1,
                            "11072": 1,
                            "11476": 0,
                            "12760": 0,
                            "14351": 6,
                            "25854": 0,
                            "25857": 0,
                            "TOTAAL": 8,
                            "_row": "13"
                        },
                        {
                            "1": "",
                            "355": 6,
                            "1204": 5,
                            "2300": 6,
                            "3343": 7,
                            "4993": 4,
                            "4994": 15,
                            "11072": 5,
                            "11476": 8,
                            "12760": 2,
                            "14351": 13,
                            "25854": 1,
                            "25857": 12,
                            "TOTAAL": 84,
                            "_row": "TOTAAL"
                        }
                    ],
                    "uit": [
                        {
                            "1": "355",
                            "336": 0,
                            "606": 1,
                            "902": 0,
                            "3359": 0,
                            "5366": 3,
                            "5418": 0,
                            "10527": 0,
                            "10668": 0,
                            "13035": 2,
                            "13463": 0,
                            "16733": 0,
                            "18294": 0,
                            "18298": 0,
                            "TOTAAL": 6,
                            "_row": "1"
                        },
                        {
                            "1": "1204",
                            "336": 0,
                            "606": 0,
                            "902": 0,
                            "3359": 0,
                            "5366": 0,
                            "5418": 1,
                            "10527": 1,
                            "10668": 2,
                            "13035": 0,
                            "13463": 0,
                            "16733": 0,
                            "18294": 1,
                            "18298": 0,
                            "TOTAAL": 5,
                            "_row": "2"
                        },
                        {
                            "1": "2300",
                            "336": 0,
                            "606": 2,
                            "902": 0,
                            "3359": 0,
                            "5366": 2,
                            "5418": 0,
                            "10527": 0,
                            "10668": 0,
                            "13035": 1,
                            "13463": 0,
                            "16733": 0,
                            "18294": 1,
                            "18298": 0,
                            "TOTAAL": 6,
                            "_row": "3"
                        },
                        {
                            "1": "3343",
                            "336": 0,
                            "606": 1,
                            "902": 0,
                            "3359": 3,
                            "5366": 0,
                            "5418": 3,
                            "10527": 0,
                            "10668": 0,
                            "13035": 0,
                            "13463": 0,
                            "16733": 0,
                            "18294": 0,
                            "18298": 0,
                            "TOTAAL": 7,
                            "_row": "4"
                        },
                        {
                            "1": "4993",
                            "336": 0,
                            "606": 0,
                            "902": 0,
                            "3359": 0,
                            "5366": 0,
                            "5418": 0,
                            "10527": 1,
                            "10668": 2,
                            "13035": 0,
                            "13463": 0,
                            "16733": 0,
                            "18294": 1,
                            "18298": 0,
                            "TOTAAL": 4,
                            "_row": "5"
                        },
                        {
                            "1": "4994",
                            "336": 0,
                            "606": 0,
                            "902": 0,
                            "3359": 2,
                            "5366": 4,
                            "5418": 0,
                            "10527": 2,
                            "10668": 4,
                            "13035": 0,
                            "13463": 1,
                            "16733": 1,
                            "18294": 0,
                            "18298": 1,
                            "TOTAAL": 15,
                            "_row": "6"
                        },
                        {
                            "1": "11072",
                            "336": 0,
                            "606": 1,
                            "902": 0,
                            "3359": 0,
                            "5366": 1,
                            "5418": 0,
                            "10527": 0,
                            "10668": 0,
                            "13035": 0,
                            "13463": 0,
                            "16733": 2,
                            "18294": 0,
                            "18298": 1,
                            "TOTAAL": 5,
                            "_row": "7"
                        },
                        {
                            "1": "11476",
                            "336": 0,
                            "606": 0,
                            "902": 3,
                            "3359": 1,
                            "5366": 0,
                            "5418": 1,
                            "10527": 1,
                            "10668": 1,
                            "13035": 0,
                            "13463": 0,
                            "16733": 0,
                            "18294": 1,
                            "18298": 0,
                            "TOTAAL": 8,
                            "_row": "8"
                        },
                        {
                            "1": "12760",
                            "336": 0,
                            "606": 0,
                            "902": 1,
                            "3359": 0,
                            "5366": 0,
                            "5418": 0,
                            "10527": 0,
                            "10668": 1,
                            "13035": 0,
                            "13463": 0,
                            "16733": 0,
                            "18294": 0,
                            "18298": 0,
                            "TOTAAL": 2,
                            "_row": "9"
                        },
                        {
                            "1": "14351",
                            "336": 0,
                            "606": 0,
                            "902": 1,
                            "3359": 1,
                            "5366": 0,
                            "5418": 1,
                            "10527": 1,
                            "10668": 3,
                            "13035": 0,
                            "13463": 0,
                            "16733": 0,
                            "18294": 0,
                            "18298": 6,
                            "TOTAAL": 13,
                            "_row": "10"
                        },
                        {
                            "1": "25854",
                            "336": 0,
                            "606": 0,
                            "902": 0,
                            "3359": 0,
                            "5366": 0,
                            "5418": 1,
                            "10527": 0,
                            "10668": 0,
                            "13035": 0,
                            "13463": 0,
                            "16733": 0,
                            "18294": 0,
                            "18298": 0,
                            "TOTAAL": 1,
                            "_row": "11"
                        },
                        {
                            "1": "25857",
                            "336": 3,
                            "606": 0,
                            "902": 0,
                            "3359": 1,
                            "5366": 0,
                            "5418": 0,
                            "10527": 1,
                            "10668": 0,
                            "13035": 0,
                            "13463": 0,
                            "16733": 1,
                            "18294": 6,
                            "18298": 0,
                            "TOTAAL": 12,
                            "_row": "12"
                        },
                        {
                            "1": "",
                            "336": 3,
                            "606": 5,
                            "902": 5,
                            "3359": 8,
                            "5366": 10,
                            "5418": 7,
                            "10527": 7,
                            "10668": 13,
                            "13035": 3,
                            "13463": 1,
                            "16733": 4,
                            "18294": 10,
                            "18298": 8,
                            "TOTAAL": 84,
                            "_row": "TOTAAL"
                        }
                    ]
                },
                "passes_per_zone": {
                    "thuis": {
                        "kort": [
                            {
                                "zend_zone": 1,
                                "TOTAAL": 8,
                                "geslaagd": 7,
                                "perc": "88%"
                            },
                            {
                                "zend_zone": 2,
                                "TOTAAL": 36,
                                "geslaagd": 27,
                                "perc": "75%"
                            },
                            {
                                "zend_zone": 3,
                                "TOTAAL": 25,
                                "geslaagd": 10,
                                "perc": "40%"
                            }
                        ],
                        "middellang": [
                            {
                                "zend_zone": 1,
                                "TOTAAL": 48,
                                "geslaagd": 48,
                                "perc": "100%"
                            },
                            {
                                "zend_zone": 2,
                                "TOTAAL": 98,
                                "geslaagd": 80,
                                "perc": "82%"
                            },
                            {
                                "zend_zone": 3,
                                "TOTAAL": 45,
                                "geslaagd": 29,
                                "perc": "64%"
                            }
                        ],
                        "lang": [
                            {
                                "zend_zone": 1,
                                "TOTAAL": 44,
                                "geslaagd": 21,
                                "perc": "48%"
                            },
                            {
                                "zend_zone": 2,
                                "TOTAAL": 58,
                                "geslaagd": 31,
                                "perc": "53%"
                            },
                            {
                                "zend_zone": 3,
                                "TOTAAL": 27,
                                "geslaagd": 11,
                                "perc": "41%"
                            }
                        ]
                    },
                    "uit": {
                        "kort": [
                            {
                                "zend_zone": 1,
                                "TOTAAL": 14,
                                "geslaagd": 4,
                                "perc": "29%"
                            },
                            {
                                "zend_zone": 2,
                                "TOTAAL": 20,
                                "geslaagd": 11,
                                "perc": "55%"
                            },
                            {
                                "zend_zone": 3,
                                "TOTAAL": 21,
                                "geslaagd": 12,
                                "perc": "57%"
                            }
                        ],
                        "middellang": [
                            {
                                "zend_zone": 1,
                                "TOTAAL": 34,
                                "geslaagd": 28,
                                "perc": "82%"
                            },
                            {
                                "zend_zone": 2,
                                "TOTAAL": 55,
                                "geslaagd": 31,
                                "perc": "56%"
                            },
                            {
                                "zend_zone": 3,
                                "TOTAAL": 27,
                                "geslaagd": 19,
                                "perc": "70%"
                            }
                        ],
                        "lang": [
                            {
                                "zend_zone": 1,
                                "TOTAAL": 41,
                                "geslaagd": 15,
                                "perc": "37%"
                            },
                            {
                                "zend_zone": 2,
                                "TOTAAL": 23,
                                "geslaagd": 13,
                                "perc": "57%"
                            },
                            {
                                "zend_zone": 3,
                                "TOTAAL": 6,
                                "geslaagd": 3,
                                "perc": "50%"
                            }
                        ]
                    }
                },
                "locatie_doelpogingen": {
                    "thuisTeam": [
                        {
                            "teamID": 1527,
                            "personID": 940,
                            "locationInFieldLength": 92.2,
                            "locationInFieldWidth": 58.2,
                            "lichaamsdeel": "Voet",
                            "minuut_tot_string": "90+4",
                            "type": "Doelpunt"
                        },
                        {
                            "teamID": 1527,
                            "personID": 10527,
                            "locationInFieldLength": 92.8,
                            "locationInFieldWidth": 44.8,
                            "lichaamsdeel": "Voet",
                            "minuut_tot_string": "44",
                            "type": "Redding"
                        },
                        {
                            "teamID": 1527,
                            "personID": 5418,
                            "locationInFieldLength": 91.6,
                            "locationInFieldWidth": 54.8,
                            "lichaamsdeel": "Voet",
                            "minuut_tot_string": "48",
                            "type": "Redding"
                        },
                        {
                            "teamID": 1527,
                            "personID": 336,
                            "locationInFieldLength": 90.9,
                            "locationInFieldWidth": 61.2,
                            "lichaamsdeel": "Hoofd",
                            "minuut_tot_string": "55",
                            "type": "Redding"
                        },
                        {
                            "teamID": 1527,
                            "personID": 606,
                            "locationInFieldLength": 90.7,
                            "locationInFieldWidth": 46.9,
                            "lichaamsdeel": "Hoofd",
                            "minuut_tot_string": "90",
                            "type": "Redding"
                        },
                        {
                            "teamID": 1527,
                            "personID": 10668,
                            "locationInFieldLength": 76.1,
                            "locationInFieldWidth": 44.7,
                            "lichaamsdeel": "Voet",
                            "minuut_tot_string": " 3",
                            "type": "Naast of over"
                        },
                        {
                            "teamID": 1527,
                            "personID": 13035,
                            "locationInFieldLength": 93.2,
                            "locationInFieldWidth": 44.5,
                            "lichaamsdeel": "Hoofd",
                            "minuut_tot_string": "42",
                            "type": "Naast of over"
                        },
                        {
                            "teamID": 1527,
                            "personID": 5418,
                            "locationInFieldLength": 80.5,
                            "locationInFieldWidth": 43.5,
                            "lichaamsdeel": "Voet",
                            "minuut_tot_string": "48",
                            "type": "Naast of over"
                        },
                        {
                            "teamID": 1527,
                            "personID": 10668,
                            "locationInFieldLength": 71,
                            "locationInFieldWidth": 62.7,
                            "lichaamsdeel": "Voet",
                            "minuut_tot_string": "51",
                            "type": "Naast of over"
                        },
                        {
                            "teamID": 1527,
                            "personID": 10527,
                            "locationInFieldLength": 84.4,
                            "locationInFieldWidth": 57.3,
                            "lichaamsdeel": "Voet",
                            "minuut_tot_string": "90+3",
                            "type": "Naast of over"
                        },
                        {
                            "teamID": 1527,
                            "personID": 16733,
                            "locationInFieldLength": 94.3,
                            "locationInFieldWidth": 66.1,
                            "lichaamsdeel": "Voet",
                            "minuut_tot_string": "44",
                            "type": "Geblokkeerd"
                        },
                        {
                            "teamID": 1527,
                            "personID": 10668,
                            "locationInFieldLength": 78.3,
                            "locationInFieldWidth": 39.5,
                            "lichaamsdeel": "Voet",
                            "minuut_tot_string": "44",
                            "type": "Geblokkeerd"
                        },
                        {
                            "teamID": 1527,
                            "personID": 13035,
                            "locationInFieldLength": 91.8,
                            "locationInFieldWidth": 54.3,
                            "lichaamsdeel": "Voet",
                            "minuut_tot_string": "61",
                            "type": "Geblokkeerd"
                        },
                        {
                            "teamID": 1527,
                            "personID": 10668,
                            "locationInFieldLength": 92.2,
                            "locationInFieldWidth": 65.1,
                            "lichaamsdeel": "Voet",
                            "minuut_tot_string": "71",
                            "type": "Geblokkeerd"
                        },
                        {
                            "teamID": 1527,
                            "personID": 10527,
                            "locationInFieldLength": 81.2,
                            "locationInFieldWidth": 55.4,
                            "lichaamsdeel": "Voet",
                            "minuut_tot_string": "90+3",
                            "type": "Geblokkeerd"
                        }
                    ],
                    "uitTeam": [
                        {
                            "teamID": 1530,
                            "personID": 14351,
                            "locationInFieldLength": 83.7,
                            "locationInFieldWidth": 52,
                            "lichaamsdeel": "Voet",
                            "minuut_tot_string": "60",
                            "type": "Doelpunt"
                        },
                        {
                            "teamID": 1530,
                            "personID": 11476,
                            "locationInFieldLength": 93.1,
                            "locationInFieldWidth": 35.8,
                            "lichaamsdeel": "Voet",
                            "minuut_tot_string": "74",
                            "type": "Redding"
                        },
                        {
                            "teamID": 1530,
                            "personID": 11476,
                            "locationInFieldLength": 87.8,
                            "locationInFieldWidth": 22.7,
                            "lichaamsdeel": "Voet",
                            "minuut_tot_string": "86",
                            "type": "Redding"
                        },
                        {
                            "teamID": 1530,
                            "personID": 25857,
                            "locationInFieldLength": 90.2,
                            "locationInFieldWidth": 39.5,
                            "lichaamsdeel": "Voet",
                            "minuut_tot_string": "88",
                            "type": "Redding"
                        },
                        {
                            "teamID": 1530,
                            "personID": 11476,
                            "locationInFieldLength": 90.7,
                            "locationInFieldWidth": 32.7,
                            "lichaamsdeel": "Voet",
                            "minuut_tot_string": " 8",
                            "type": "Op het ijzer"
                        },
                        {
                            "teamID": 1530,
                            "personID": 11476,
                            "locationInFieldLength": 78.1,
                            "locationInFieldWidth": 35.8,
                            "lichaamsdeel": "Voet",
                            "minuut_tot_string": "17",
                            "type": "Naast of over"
                        },
                        {
                            "teamID": 1530,
                            "personID": 355,
                            "locationInFieldLength": 78.2,
                            "locationInFieldWidth": 57.3,
                            "lichaamsdeel": "Voet",
                            "minuut_tot_string": "31",
                            "type": "Naast of over"
                        },
                        {
                            "teamID": 1530,
                            "personID": 2300,
                            "locationInFieldLength": 72.8,
                            "locationInFieldWidth": 42.4,
                            "lichaamsdeel": "Voet",
                            "minuut_tot_string": "67",
                            "type": "Naast of over"
                        },
                        {
                            "teamID": 1530,
                            "personID": 12760,
                            "locationInFieldLength": 89.3,
                            "locationInFieldWidth": 20.7,
                            "lichaamsdeel": "Voet",
                            "minuut_tot_string": "83",
                            "type": "Geblokkeerd"
                        },
                        {
                            "teamID": 1530,
                            "personID": 12760,
                            "locationInFieldLength": 86.3,
                            "locationInFieldWidth": 39.2,
                            "lichaamsdeel": "Voet",
                            "minuut_tot_string": "88",
                            "type": "Geblokkeerd"
                        }
                    ]
                },
                "pass_matrix_helft1": {
                    "thuis": {
                        "passMatrix": [
                            {
                                "336": "0",
                                "902": 1,
                                "940": 0,
                                "3359": 0,
                                "5366": 0,
                                "5418": 0,
                                "10527": 2,
                                "10668": 1,
                                "13035": 1,
                                "16733": 2,
                                "18298": 1,
                                "TOTAAL": "8",
                                "_row": "336"
                            },
                            {
                                "336": "2",
                                "902": 0,
                                "940": 2,
                                "3359": 2,
                                "5366": 2,
                                "5418": 1,
                                "10527": 3,
                                "10668": 1,
                                "13035": 2,
                                "16733": 0,
                                "18298": 0,
                                "TOTAAL": "15",
                                "_row": "902"
                            },
                            {
                                "336": "1",
                                "902": 1,
                                "940": 0,
                                "3359": 4,
                                "5366": 3,
                                "5418": 0,
                                "10527": 1,
                                "10668": 2,
                                "13035": 0,
                                "16733": 0,
                                "18298": 4,
                                "TOTAAL": "16",
                                "_row": "940"
                            },
                            {
                                "336": "1",
                                "902": 2,
                                "940": 4,
                                "3359": 0,
                                "5366": 6,
                                "5418": 2,
                                "10527": 1,
                                "10668": 9,
                                "13035": 3,
                                "16733": 2,
                                "18298": 9,
                                "TOTAAL": "39",
                                "_row": "3359"
                            },
                            {
                                "336": "0",
                                "902": 3,
                                "940": 6,
                                "3359": 7,
                                "5366": 0,
                                "5418": 0,
                                "10527": 2,
                                "10668": 5,
                                "13035": 3,
                                "16733": 0,
                                "18298": 1,
                                "TOTAAL": "27",
                                "_row": "5366"
                            },
                            {
                                "336": "2",
                                "902": 1,
                                "940": 0,
                                "3359": 4,
                                "5366": 0,
                                "5418": 0,
                                "10527": 1,
                                "10668": 0,
                                "13035": 1,
                                "16733": 0,
                                "18298": 1,
                                "TOTAAL": "10",
                                "_row": "5418"
                            },
                            {
                                "336": "5",
                                "902": 2,
                                "940": 2,
                                "3359": 1,
                                "5366": 1,
                                "5418": 1,
                                "10527": 0,
                                "10668": 0,
                                "13035": 0,
                                "16733": 1,
                                "18298": 1,
                                "TOTAAL": "14",
                                "_row": "10527"
                            },
                            {
                                "336": "8",
                                "902": 0,
                                "940": 1,
                                "3359": 3,
                                "5366": 2,
                                "5418": 3,
                                "10527": 5,
                                "10668": 0,
                                "13035": 4,
                                "16733": 3,
                                "18298": 0,
                                "TOTAAL": "29",
                                "_row": "10668"
                            },
                            {
                                "336": "1",
                                "902": 0,
                                "940": 0,
                                "3359": 0,
                                "5366": 0,
                                "5418": 0,
                                "10527": 2,
                                "10668": 1,
                                "13035": 0,
                                "16733": 0,
                                "18298": 0,
                                "TOTAAL": "4",
                                "_row": "13035"
                            },
                            {
                                "336": "0",
                                "902": 0,
                                "940": 0,
                                "3359": 4,
                                "5366": 0,
                                "5418": 0,
                                "10527": 0,
                                "10668": 2,
                                "13035": 0,
                                "16733": 0,
                                "18298": 1,
                                "TOTAAL": "7",
                                "_row": "16733"
                            },
                            {
                                "336": "0",
                                "902": 0,
                                "940": 1,
                                "3359": 2,
                                "5366": 4,
                                "5418": 2,
                                "10527": 0,
                                "10668": 3,
                                "13035": 0,
                                "16733": 7,
                                "18298": 0,
                                "TOTAAL": "19",
                                "_row": "18298"
                            },
                            {
                                "336": "",
                                "902": 10,
                                "940": 16,
                                "3359": 27,
                                "5366": 18,
                                "5418": 9,
                                "10527": 17,
                                "10668": 24,
                                "13035": 14,
                                "16733": 15,
                                "18298": 18,
                                "TOTAAL": " ",
                                "_row": "TOTAAL"
                            }
                        ],
                        "passMatrix2": [
                            {
                                "kort": 6,
                                "kort_succes": 2,
                                "kort_perc": "33%",
                                "middellang": 4,
                                "middellang_succes": 4,
                                "middellang_perc": "100%",
                                "lang": 3,
                                "lang_succes": 1,
                                "lang_perc": "33%",
                                "TOTAAL": 13,
                                "TOTAAL_succes": 7,
                                "TOTAAL_perc": "54%",
                                "gem_len": "14.7m.",
                                "_row": "336"
                            },
                            {
                                "kort": 3,
                                "kort_succes": 2,
                                "kort_perc": "67%",
                                "middellang": 7,
                                "middellang_succes": 4,
                                "middellang_perc": "57%",
                                "lang": 8,
                                "lang_succes": 6,
                                "lang_perc": "75%",
                                "TOTAAL": 18,
                                "TOTAAL_succes": 12,
                                "TOTAAL_perc": "67%",
                                "gem_len": "25m.",
                                "_row": "902"
                            },
                            {
                                "kort": 0,
                                "kort_succes": 0,
                                "kort_perc": "0%",
                                "middellang": 8,
                                "middellang_succes": 8,
                                "middellang_perc": "100%",
                                "lang": 10,
                                "lang_succes": 8,
                                "lang_perc": "80%",
                                "TOTAAL": 18,
                                "TOTAAL_succes": 16,
                                "TOTAAL_perc": "89%",
                                "gem_len": "34m.",
                                "_row": "940"
                            },
                            {
                                "kort": 8,
                                "kort_succes": 8,
                                "kort_perc": "100%",
                                "middellang": 25,
                                "middellang_succes": 22,
                                "middellang_perc": "88%",
                                "lang": 8,
                                "lang_succes": 5,
                                "lang_perc": "62%",
                                "TOTAAL": 41,
                                "TOTAAL_succes": 35,
                                "TOTAAL_perc": "85%",
                                "gem_len": "20.2m.",
                                "_row": "3359"
                            },
                            {
                                "kort": 3,
                                "kort_succes": 2,
                                "kort_perc": "67%",
                                "middellang": 18,
                                "middellang_succes": 18,
                                "middellang_perc": "100%",
                                "lang": 7,
                                "lang_succes": 6,
                                "lang_perc": "86%",
                                "TOTAAL": 28,
                                "TOTAAL_succes": 26,
                                "TOTAAL_perc": "93%",
                                "gem_len": "20.5m.",
                                "_row": "5366"
                            },
                            {
                                "kort": 3,
                                "kort_succes": 1,
                                "kort_perc": "33%",
                                "middellang": 7,
                                "middellang_succes": 4,
                                "middellang_perc": "57%",
                                "lang": 6,
                                "lang_succes": 3,
                                "lang_perc": "50%",
                                "TOTAAL": 16,
                                "TOTAAL_succes": 8,
                                "TOTAAL_perc": "50%",
                                "gem_len": "25.6m.",
                                "_row": "5418"
                            },
                            {
                                "kort": 3,
                                "kort_succes": 2,
                                "kort_perc": "67%",
                                "middellang": 7,
                                "middellang_succes": 4,
                                "middellang_perc": "57%",
                                "lang": 6,
                                "lang_succes": 4,
                                "lang_perc": "67%",
                                "TOTAAL": 16,
                                "TOTAAL_succes": 10,
                                "TOTAAL_perc": "62%",
                                "gem_len": "20m.",
                                "_row": "10527"
                            },
                            {
                                "kort": 3,
                                "kort_succes": 1,
                                "kort_perc": "33%",
                                "middellang": 17,
                                "middellang_succes": 13,
                                "middellang_perc": "76%",
                                "lang": 15,
                                "lang_succes": 5,
                                "lang_perc": "33%",
                                "TOTAAL": 35,
                                "TOTAAL_succes": 19,
                                "TOTAAL_perc": "54%",
                                "gem_len": "27.8m.",
                                "_row": "10668"
                            },
                            {
                                "kort": 2,
                                "kort_succes": 2,
                                "kort_perc": "100%",
                                "middellang": 2,
                                "middellang_succes": 1,
                                "middellang_perc": "50%",
                                "lang": 1,
                                "lang_succes": 1,
                                "lang_perc": "100%",
                                "TOTAAL": 5,
                                "TOTAAL_succes": 4,
                                "TOTAAL_perc": "80%",
                                "gem_len": "12.9m.",
                                "_row": "13035"
                            },
                            {
                                "kort": 1,
                                "kort_succes": 0,
                                "kort_perc": "0%",
                                "middellang": 6,
                                "middellang_succes": 6,
                                "middellang_perc": "100%",
                                "lang": 2,
                                "lang_succes": 1,
                                "lang_perc": "50%",
                                "TOTAAL": 9,
                                "TOTAAL_succes": 7,
                                "TOTAAL_perc": "78%",
                                "gem_len": "22m.",
                                "_row": "16733"
                            },
                            {
                                "kort": 7,
                                "kort_succes": 4,
                                "kort_perc": "57%",
                                "middellang": 9,
                                "middellang_succes": 6,
                                "middellang_perc": "67%",
                                "lang": 8,
                                "lang_succes": 4,
                                "lang_perc": "50%",
                                "TOTAAL": 24,
                                "TOTAAL_succes": 14,
                                "TOTAAL_perc": "58%",
                                "gem_len": "23.2m.",
                                "_row": "18298"
                            },
                            {
                                "kort": 39,
                                "kort_succes": 24,
                                "kort_perc": "62%",
                                "middellang": 110,
                                "middellang_succes": 90,
                                "middellang_perc": "82%",
                                "lang": 74,
                                "lang_succes": 44,
                                "lang_perc": "59%",
                                "TOTAAL": 223,
                                "TOTAAL_succes": 158,
                                "TOTAAL_perc": "71%",
                                "gem_len": "21.1m.",
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "uit": {
                        "passMatrix": [
                            {
                                "323": "0",
                                "355": 0,
                                "1204": 0,
                                "2300": 2,
                                "3343": 1,
                                "4993": 0,
                                "4994": 0,
                                "11072": 0,
                                "11476": 0,
                                "14351": 2,
                                "25857": 2,
                                "TOTAAL": "7",
                                "_row": "323"
                            },
                            {
                                "323": "4",
                                "355": 0,
                                "1204": 0,
                                "2300": 0,
                                "3343": 0,
                                "4993": 0,
                                "4994": 1,
                                "11072": 0,
                                "11476": 1,
                                "14351": 0,
                                "25857": 0,
                                "TOTAAL": "6",
                                "_row": "355"
                            },
                            {
                                "323": "0",
                                "355": 0,
                                "1204": 0,
                                "2300": 0,
                                "3343": 0,
                                "4993": 2,
                                "4994": 1,
                                "11072": 2,
                                "11476": 1,
                                "14351": 3,
                                "25857": 3,
                                "TOTAAL": "12",
                                "_row": "1204"
                            },
                            {
                                "323": "0",
                                "355": 1,
                                "1204": 1,
                                "2300": 0,
                                "3343": 0,
                                "4993": 1,
                                "4994": 1,
                                "11072": 0,
                                "11476": 0,
                                "14351": 0,
                                "25857": 1,
                                "TOTAAL": "5",
                                "_row": "2300"
                            },
                            {
                                "323": "0",
                                "355": 0,
                                "1204": 1,
                                "2300": 0,
                                "3343": 0,
                                "4993": 1,
                                "4994": 0,
                                "11072": 1,
                                "11476": 1,
                                "14351": 0,
                                "25857": 0,
                                "TOTAAL": "4",
                                "_row": "3343"
                            },
                            {
                                "323": "0",
                                "355": 0,
                                "1204": 2,
                                "2300": 1,
                                "3343": 2,
                                "4993": 0,
                                "4994": 3,
                                "11072": 1,
                                "11476": 3,
                                "14351": 0,
                                "25857": 5,
                                "TOTAAL": "17",
                                "_row": "4993"
                            },
                            {
                                "323": "0",
                                "355": 0,
                                "1204": 1,
                                "2300": 0,
                                "3343": 0,
                                "4993": 1,
                                "4994": 0,
                                "11072": 1,
                                "11476": 0,
                                "14351": 0,
                                "25857": 0,
                                "TOTAAL": "3",
                                "_row": "4994"
                            },
                            {
                                "323": "1",
                                "355": 0,
                                "1204": 2,
                                "2300": 0,
                                "3343": 0,
                                "4993": 0,
                                "4994": 1,
                                "11072": 0,
                                "11476": 0,
                                "14351": 2,
                                "25857": 0,
                                "TOTAAL": "6",
                                "_row": "11072"
                            },
                            {
                                "323": "0",
                                "355": 0,
                                "1204": 1,
                                "2300": 0,
                                "3343": 0,
                                "4993": 2,
                                "4994": 2,
                                "11072": 1,
                                "11476": 0,
                                "14351": 1,
                                "25857": 0,
                                "TOTAAL": "7",
                                "_row": "11476"
                            },
                            {
                                "323": "0",
                                "355": 1,
                                "1204": 2,
                                "2300": 0,
                                "3343": 1,
                                "4993": 0,
                                "4994": 0,
                                "11072": 3,
                                "11476": 1,
                                "14351": 0,
                                "25857": 0,
                                "TOTAAL": "8",
                                "_row": "14351"
                            },
                            {
                                "323": "0",
                                "355": 2,
                                "1204": 0,
                                "2300": 0,
                                "3343": 1,
                                "4993": 3,
                                "4994": 2,
                                "11072": 0,
                                "11476": 2,
                                "14351": 0,
                                "25857": 0,
                                "TOTAAL": "10",
                                "_row": "25857"
                            },
                            {
                                "323": "",
                                "355": 4,
                                "1204": 10,
                                "2300": 3,
                                "3343": 5,
                                "4993": 10,
                                "4994": 11,
                                "11072": 9,
                                "11476": 9,
                                "14351": 8,
                                "25857": 11,
                                "TOTAAL": " ",
                                "_row": "TOTAAL"
                            }
                        ],
                        "passMatrix2": [
                            {
                                "kort": 0,
                                "kort_succes": 0,
                                "kort_perc": "0%",
                                "middellang": 3,
                                "middellang_succes": 3,
                                "middellang_perc": "100%",
                                "lang": 7,
                                "lang_succes": 3,
                                "lang_perc": "43%",
                                "TOTAAL": 10,
                                "TOTAAL_succes": 6,
                                "TOTAAL_perc": "60%",
                                "gem_len": "41m.",
                                "_row": "323"
                            },
                            {
                                "kort": 0,
                                "kort_succes": 0,
                                "kort_perc": "0%",
                                "middellang": 4,
                                "middellang_succes": 3,
                                "middellang_perc": "75%",
                                "lang": 3,
                                "lang_succes": 1,
                                "lang_perc": "33%",
                                "TOTAAL": 7,
                                "TOTAAL_succes": 4,
                                "TOTAAL_perc": "57%",
                                "gem_len": "25.8m.",
                                "_row": "355"
                            },
                            {
                                "kort": 5,
                                "kort_succes": 3,
                                "kort_perc": "60%",
                                "middellang": 6,
                                "middellang_succes": 3,
                                "middellang_perc": "50%",
                                "lang": 4,
                                "lang_succes": 3,
                                "lang_perc": "75%",
                                "TOTAAL": 15,
                                "TOTAAL_succes": 9,
                                "TOTAAL_perc": "60%",
                                "gem_len": "17.3m.",
                                "_row": "1204"
                            },
                            {
                                "kort": 1,
                                "kort_succes": 1,
                                "kort_perc": "100%",
                                "middellang": 3,
                                "middellang_succes": 2,
                                "middellang_perc": "67%",
                                "lang": 3,
                                "lang_succes": 1,
                                "lang_perc": "33%",
                                "TOTAAL": 7,
                                "TOTAAL_succes": 4,
                                "TOTAAL_perc": "57%",
                                "gem_len": "25.2m.",
                                "_row": "2300"
                            },
                            {
                                "kort": 4,
                                "kort_succes": 0,
                                "kort_perc": "0%",
                                "middellang": 3,
                                "middellang_succes": 2,
                                "middellang_perc": "67%",
                                "lang": 1,
                                "lang_succes": 1,
                                "lang_perc": "100%",
                                "TOTAAL": 8,
                                "TOTAAL_succes": 3,
                                "TOTAAL_perc": "38%",
                                "gem_len": "10.2m.",
                                "_row": "3343"
                            },
                            {
                                "kort": 5,
                                "kort_succes": 4,
                                "kort_perc": "80%",
                                "middellang": 10,
                                "middellang_succes": 6,
                                "middellang_perc": "60%",
                                "lang": 4,
                                "lang_succes": 2,
                                "lang_perc": "50%",
                                "TOTAAL": 19,
                                "TOTAAL_succes": 12,
                                "TOTAAL_perc": "63%",
                                "gem_len": "17.1m.",
                                "_row": "4993"
                            },
                            {
                                "kort": 1,
                                "kort_succes": 0,
                                "kort_perc": "0%",
                                "middellang": 5,
                                "middellang_succes": 2,
                                "middellang_perc": "40%",
                                "lang": 0,
                                "lang_succes": 0,
                                "lang_perc": "0%",
                                "TOTAAL": 6,
                                "TOTAAL_succes": 2,
                                "TOTAAL_perc": "33%",
                                "gem_len": "11.4m.",
                                "_row": "4994"
                            },
                            {
                                "kort": 2,
                                "kort_succes": 0,
                                "kort_perc": "0%",
                                "middellang": 7,
                                "middellang_succes": 4,
                                "middellang_perc": "57%",
                                "lang": 3,
                                "lang_succes": 1,
                                "lang_perc": "33%",
                                "TOTAAL": 12,
                                "TOTAAL_succes": 5,
                                "TOTAAL_perc": "42%",
                                "gem_len": "21.3m.",
                                "_row": "11072"
                            },
                            {
                                "kort": 3,
                                "kort_succes": 1,
                                "kort_perc": "33%",
                                "middellang": 6,
                                "middellang_succes": 4,
                                "middellang_perc": "67%",
                                "lang": 1,
                                "lang_succes": 1,
                                "lang_perc": "100%",
                                "TOTAAL": 10,
                                "TOTAAL_succes": 6,
                                "TOTAAL_perc": "60%",
                                "gem_len": "19.2m.",
                                "_row": "11476"
                            },
                            {
                                "kort": 1,
                                "kort_succes": 1,
                                "kort_perc": "100%",
                                "middellang": 9,
                                "middellang_succes": 7,
                                "middellang_perc": "78%",
                                "lang": 1,
                                "lang_succes": 0,
                                "lang_perc": "0%",
                                "TOTAAL": 11,
                                "TOTAAL_succes": 8,
                                "TOTAAL_perc": "73%",
                                "gem_len": "16.7m.",
                                "_row": "14351"
                            },
                            {
                                "kort": 2,
                                "kort_succes": 0,
                                "kort_perc": "0%",
                                "middellang": 6,
                                "middellang_succes": 5,
                                "middellang_perc": "83%",
                                "lang": 7,
                                "lang_succes": 2,
                                "lang_perc": "29%",
                                "TOTAAL": 15,
                                "TOTAAL_succes": 7,
                                "TOTAAL_perc": "47%",
                                "gem_len": "24.9m.",
                                "_row": "25857"
                            },
                            {
                                "kort": 24,
                                "kort_succes": 10,
                                "kort_perc": "42%",
                                "middellang": 62,
                                "middellang_succes": 41,
                                "middellang_perc": "66%",
                                "lang": 34,
                                "lang_succes": 15,
                                "lang_perc": "44%",
                                "TOTAAL": 120,
                                "TOTAAL_succes": 66,
                                "TOTAAL_perc": "55%",
                                "gem_len": "19.3m.",
                                "_row": "TOTAAL"
                            }
                        ]
                    }
                },
                "pass_matrix_helft2": {
                    "thuis": {
                        "passMatrix": [
                            {
                                "336": "0",
                                "606": 0,
                                "902": 1,
                                "940": 0,
                                "3359": 0,
                                "5366": 0,
                                "5418": 1,
                                "10527": 3,
                                "10668": 0,
                                "13035": 0,
                                "13463": 0,
                                "16733": 0,
                                "18294": 0,
                                "18298": 0,
                                "TOTAAL": "5",
                                "_row": "336"
                            },
                            {
                                "336": "0",
                                "606": 0,
                                "902": 0,
                                "940": 0,
                                "3359": 0,
                                "5366": 0,
                                "5418": 0,
                                "10527": 1,
                                "10668": 0,
                                "13035": 0,
                                "13463": 0,
                                "16733": 0,
                                "18294": 0,
                                "18298": 1,
                                "TOTAAL": "2",
                                "_row": "606"
                            },
                            {
                                "336": "0",
                                "606": 0,
                                "902": 0,
                                "940": 1,
                                "3359": 2,
                                "5366": 1,
                                "5418": 2,
                                "10527": 1,
                                "10668": 2,
                                "13035": 0,
                                "13463": 1,
                                "16733": 0,
                                "18294": 2,
                                "18298": 0,
                                "TOTAAL": "12",
                                "_row": "902"
                            },
                            {
                                "336": "0",
                                "606": 1,
                                "902": 0,
                                "940": 0,
                                "3359": 2,
                                "5366": 2,
                                "5418": 0,
                                "10527": 1,
                                "10668": 1,
                                "13035": 1,
                                "13463": 0,
                                "16733": 0,
                                "18294": 2,
                                "18298": 1,
                                "TOTAAL": "11",
                                "_row": "940"
                            },
                            {
                                "336": "0",
                                "606": 0,
                                "902": 2,
                                "940": 3,
                                "3359": 0,
                                "5366": 9,
                                "5418": 2,
                                "10527": 0,
                                "10668": 4,
                                "13035": 2,
                                "13463": 0,
                                "16733": 2,
                                "18294": 0,
                                "18298": 2,
                                "TOTAAL": "26",
                                "_row": "3359"
                            },
                            {
                                "336": "2",
                                "606": 1,
                                "902": 2,
                                "940": 3,
                                "3359": 2,
                                "5366": 0,
                                "5418": 1,
                                "10527": 2,
                                "10668": 0,
                                "13035": 0,
                                "13463": 0,
                                "16733": 1,
                                "18294": 1,
                                "18298": 0,
                                "TOTAAL": "15",
                                "_row": "5366"
                            },
                            {
                                "336": "0",
                                "606": 0,
                                "902": 0,
                                "940": 0,
                                "3359": 4,
                                "5366": 0,
                                "5418": 0,
                                "10527": 0,
                                "10668": 4,
                                "13035": 0,
                                "13463": 0,
                                "16733": 1,
                                "18294": 0,
                                "18298": 1,
                                "TOTAAL": "10",
                                "_row": "5418"
                            },
                            {
                                "336": "2",
                                "606": 0,
                                "902": 1,
                                "940": 0,
                                "3359": 2,
                                "5366": 0,
                                "5418": 2,
                                "10527": 0,
                                "10668": 3,
                                "13035": 0,
                                "13463": 0,
                                "16733": 0,
                                "18294": 0,
                                "18298": 0,
                                "TOTAAL": "10",
                                "_row": "10527"
                            },
                            {
                                "336": "3",
                                "606": 2,
                                "902": 0,
                                "940": 0,
                                "3359": 3,
                                "5366": 0,
                                "5418": 2,
                                "10527": 3,
                                "10668": 0,
                                "13035": 0,
                                "13463": 0,
                                "16733": 2,
                                "18294": 2,
                                "18298": 0,
                                "TOTAAL": "17",
                                "_row": "10668"
                            },
                            {
                                "336": "0",
                                "606": 0,
                                "902": 0,
                                "940": 0,
                                "3359": 0,
                                "5366": 0,
                                "5418": 1,
                                "10527": 3,
                                "10668": 0,
                                "13035": 0,
                                "13463": 0,
                                "16733": 0,
                                "18294": 0,
                                "18298": 0,
                                "TOTAAL": "4",
                                "_row": "13035"
                            },
                            {
                                "336": "0",
                                "606": 0,
                                "902": 0,
                                "940": 0,
                                "3359": 0,
                                "5366": 1,
                                "5418": 0,
                                "10527": 0,
                                "10668": 1,
                                "13035": 0,
                                "13463": 0,
                                "16733": 0,
                                "18294": 0,
                                "18298": 0,
                                "TOTAAL": "2",
                                "_row": "13463"
                            },
                            {
                                "336": "0",
                                "606": 1,
                                "902": 0,
                                "940": 0,
                                "3359": 2,
                                "5366": 0,
                                "5418": 0,
                                "10527": 0,
                                "10668": 0,
                                "13035": 0,
                                "13463": 0,
                                "16733": 0,
                                "18294": 0,
                                "18298": 2,
                                "TOTAAL": "5",
                                "_row": "16733"
                            },
                            {
                                "336": "0",
                                "606": 0,
                                "902": 0,
                                "940": 0,
                                "3359": 1,
                                "5366": 0,
                                "5418": 0,
                                "10527": 0,
                                "10668": 1,
                                "13035": 0,
                                "13463": 0,
                                "16733": 0,
                                "18294": 0,
                                "18298": 0,
                                "TOTAAL": "2",
                                "_row": "18294"
                            },
                            {
                                "336": "0",
                                "606": 1,
                                "902": 0,
                                "940": 1,
                                "3359": 2,
                                "5366": 1,
                                "5418": 0,
                                "10527": 0,
                                "10668": 0,
                                "13035": 2,
                                "13463": 0,
                                "16733": 1,
                                "18294": 0,
                                "18298": 0,
                                "TOTAAL": "8",
                                "_row": "18298"
                            },
                            {
                                "336": "",
                                "606": 6,
                                "902": 6,
                                "940": 8,
                                "3359": 20,
                                "5366": 14,
                                "5418": 11,
                                "10527": 14,
                                "10668": 16,
                                "13035": 5,
                                "13463": 1,
                                "16733": 7,
                                "18294": 7,
                                "18298": 7,
                                "TOTAAL": " ",
                                "_row": "TOTAAL"
                            }
                        ],
                        "passMatrix2": [
                            {
                                "kort": 2,
                                "kort_succes": 1,
                                "kort_perc": "50%",
                                "middellang": 4,
                                "middellang_succes": 3,
                                "middellang_perc": "75%",
                                "lang": 1,
                                "lang_succes": 1,
                                "lang_perc": "100%",
                                "TOTAAL": 7,
                                "TOTAAL_succes": 5,
                                "TOTAAL_perc": "71%",
                                "gem_len": "19.6m.",
                                "_row": "336"
                            },
                            {
                                "kort": 1,
                                "kort_succes": 0,
                                "kort_perc": "0%",
                                "middellang": 1,
                                "middellang_succes": 1,
                                "middellang_perc": "100%",
                                "lang": 1,
                                "lang_succes": 0,
                                "lang_perc": "0%",
                                "TOTAAL": 3,
                                "TOTAAL_succes": 1,
                                "TOTAAL_perc": "33%",
                                "gem_len": "17.6m.",
                                "_row": "606"
                            },
                            {
                                "kort": 5,
                                "kort_succes": 3,
                                "kort_perc": "60%",
                                "middellang": 7,
                                "middellang_succes": 6,
                                "middellang_perc": "86%",
                                "lang": 3,
                                "lang_succes": 2,
                                "lang_perc": "67%",
                                "TOTAAL": 15,
                                "TOTAAL_succes": 11,
                                "TOTAAL_perc": "73%",
                                "gem_len": "15.8m.",
                                "_row": "902"
                            },
                            {
                                "kort": 1,
                                "kort_succes": 1,
                                "kort_perc": "100%",
                                "middellang": 2,
                                "middellang_succes": 2,
                                "middellang_perc": "100%",
                                "lang": 9,
                                "lang_succes": 2,
                                "lang_perc": "22%",
                                "TOTAAL": 12,
                                "TOTAAL_succes": 5,
                                "TOTAAL_perc": "42%",
                                "gem_len": "43.7m.",
                                "_row": "940"
                            },
                            {
                                "kort": 4,
                                "kort_succes": 3,
                                "kort_perc": "75%",
                                "middellang": 16,
                                "middellang_succes": 16,
                                "middellang_perc": "100%",
                                "lang": 11,
                                "lang_succes": 5,
                                "lang_perc": "45%",
                                "TOTAAL": 31,
                                "TOTAAL_succes": 24,
                                "TOTAAL_perc": "77%",
                                "gem_len": "22.8m.",
                                "_row": "3359"
                            },
                            {
                                "kort": 1,
                                "kort_succes": 0,
                                "kort_perc": "0%",
                                "middellang": 11,
                                "middellang_succes": 11,
                                "middellang_perc": "100%",
                                "lang": 4,
                                "lang_succes": 1,
                                "lang_perc": "25%",
                                "TOTAAL": 16,
                                "TOTAAL_succes": 12,
                                "TOTAAL_perc": "75%",
                                "gem_len": "21.2m.",
                                "_row": "5366"
                            },
                            {
                                "kort": 4,
                                "kort_succes": 3,
                                "kort_perc": "75%",
                                "middellang": 8,
                                "middellang_succes": 7,
                                "middellang_perc": "88%",
                                "lang": 1,
                                "lang_succes": 0,
                                "lang_perc": "0%",
                                "TOTAAL": 13,
                                "TOTAAL_succes": 10,
                                "TOTAAL_perc": "77%",
                                "gem_len": "15.1m.",
                                "_row": "5418"
                            },
                            {
                                "kort": 2,
                                "kort_succes": 2,
                                "kort_perc": "100%",
                                "middellang": 7,
                                "middellang_succes": 6,
                                "middellang_perc": "86%",
                                "lang": 4,
                                "lang_succes": 2,
                                "lang_perc": "50%",
                                "TOTAAL": 13,
                                "TOTAAL_succes": 10,
                                "TOTAAL_perc": "77%",
                                "gem_len": "21.1m.",
                                "_row": "10527"
                            },
                            {
                                "kort": 2,
                                "kort_succes": 2,
                                "kort_perc": "100%",
                                "middellang": 7,
                                "middellang_succes": 6,
                                "middellang_perc": "86%",
                                "lang": 14,
                                "lang_succes": 4,
                                "lang_perc": "29%",
                                "TOTAAL": 23,
                                "TOTAAL_succes": 12,
                                "TOTAAL_perc": "52%",
                                "gem_len": "34.4m.",
                                "_row": "10668"
                            },
                            {
                                "kort": 2,
                                "kort_succes": 2,
                                "kort_perc": "100%",
                                "middellang": 2,
                                "middellang_succes": 2,
                                "middellang_perc": "100%",
                                "lang": 0,
                                "lang_succes": 0,
                                "lang_perc": "0%",
                                "TOTAAL": 4,
                                "TOTAAL_succes": 4,
                                "TOTAAL_perc": "100%",
                                "gem_len": "12.4m.",
                                "_row": "13035"
                            },
                            {
                                "kort": 0,
                                "kort_succes": 0,
                                "kort_perc": "0%",
                                "middellang": 3,
                                "middellang_succes": 1,
                                "middellang_perc": "33%",
                                "lang": 0,
                                "lang_succes": 0,
                                "lang_perc": "0%",
                                "TOTAAL": 3,
                                "TOTAAL_succes": 1,
                                "TOTAAL_perc": "33%",
                                "gem_len": "20.6m.",
                                "_row": "13463"
                            },
                            {
                                "kort": 3,
                                "kort_succes": 2,
                                "kort_perc": "67%",
                                "middellang": 2,
                                "middellang_succes": 1,
                                "middellang_perc": "50%",
                                "lang": 2,
                                "lang_succes": 2,
                                "lang_perc": "100%",
                                "TOTAAL": 7,
                                "TOTAAL_succes": 5,
                                "TOTAAL_perc": "71%",
                                "gem_len": "13.6m.",
                                "_row": "16733"
                            },
                            {
                                "kort": 2,
                                "kort_succes": 0,
                                "kort_perc": "0%",
                                "middellang": 3,
                                "middellang_succes": 1,
                                "middellang_perc": "33%",
                                "lang": 1,
                                "lang_succes": 0,
                                "lang_perc": "0%",
                                "TOTAAL": 6,
                                "TOTAAL_succes": 1,
                                "TOTAAL_perc": "17%",
                                "gem_len": "24.2m.",
                                "_row": "18294"
                            },
                            {
                                "kort": 1,
                                "kort_succes": 1,
                                "kort_perc": "100%",
                                "middellang": 8,
                                "middellang_succes": 4,
                                "middellang_perc": "50%",
                                "lang": 4,
                                "lang_succes": 0,
                                "lang_perc": "0%",
                                "TOTAAL": 13,
                                "TOTAAL_succes": 5,
                                "TOTAAL_perc": "38%",
                                "gem_len": "26.2m.",
                                "_row": "18298"
                            },
                            {
                                "kort": 30,
                                "kort_succes": 20,
                                "kort_perc": "67%",
                                "middellang": 81,
                                "middellang_succes": 67,
                                "middellang_perc": "83%",
                                "lang": 55,
                                "lang_succes": 19,
                                "lang_perc": "35%",
                                "TOTAAL": 166,
                                "TOTAAL_succes": 106,
                                "TOTAAL_perc": "64%",
                                "gem_len": "21.4m.",
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "uit": {
                        "passMatrix": [
                            {
                                "323": "0",
                                "355": 0,
                                "1204": 0,
                                "2300": 0,
                                "3343": 0,
                                "4993": 1,
                                "4994": 0,
                                "11072": 0,
                                "11476": 2,
                                "12760": 0,
                                "14351": 1,
                                "25854": 0,
                                "25857": 2,
                                "TOTAAL": "6",
                                "_row": "323"
                            },
                            {
                                "323": "0",
                                "355": 0,
                                "1204": 0,
                                "2300": 1,
                                "3343": 0,
                                "4993": 0,
                                "4994": 0,
                                "11072": 0,
                                "11476": 0,
                                "12760": 0,
                                "14351": 0,
                                "25854": 0,
                                "25857": 1,
                                "TOTAAL": "2",
                                "_row": "355"
                            },
                            {
                                "323": "0",
                                "355": 0,
                                "1204": 0,
                                "2300": 1,
                                "3343": 1,
                                "4993": 0,
                                "4994": 3,
                                "11072": 0,
                                "11476": 2,
                                "12760": 0,
                                "14351": 4,
                                "25854": 0,
                                "25857": 1,
                                "TOTAAL": "12",
                                "_row": "1204"
                            },
                            {
                                "323": "1",
                                "355": 0,
                                "1204": 0,
                                "2300": 0,
                                "3343": 0,
                                "4993": 0,
                                "4994": 0,
                                "11072": 0,
                                "11476": 2,
                                "12760": 0,
                                "14351": 1,
                                "25854": 0,
                                "25857": 1,
                                "TOTAAL": "5",
                                "_row": "2300"
                            },
                            {
                                "323": "0",
                                "355": 0,
                                "1204": 2,
                                "2300": 1,
                                "3343": 0,
                                "4993": 1,
                                "4994": 4,
                                "11072": 0,
                                "11476": 0,
                                "12760": 0,
                                "14351": 1,
                                "25854": 0,
                                "25857": 0,
                                "TOTAAL": "9",
                                "_row": "3343"
                            },
                            {
                                "323": "0",
                                "355": 1,
                                "1204": 0,
                                "2300": 0,
                                "3343": 1,
                                "4993": 0,
                                "4994": 0,
                                "11072": 0,
                                "11476": 2,
                                "12760": 1,
                                "14351": 0,
                                "25854": 0,
                                "25857": 1,
                                "TOTAAL": "6",
                                "_row": "4993"
                            },
                            {
                                "323": "0",
                                "355": 1,
                                "1204": 5,
                                "2300": 1,
                                "3343": 2,
                                "4993": 0,
                                "4994": 0,
                                "11072": 2,
                                "11476": 1,
                                "12760": 0,
                                "14351": 3,
                                "25854": 1,
                                "25857": 0,
                                "TOTAAL": "16",
                                "_row": "4994"
                            },
                            {
                                "323": "0",
                                "355": 0,
                                "1204": 0,
                                "2300": 0,
                                "3343": 0,
                                "4993": 0,
                                "4994": 0,
                                "11072": 0,
                                "11476": 1,
                                "12760": 0,
                                "14351": 0,
                                "25854": 0,
                                "25857": 0,
                                "TOTAAL": "1",
                                "_row": "11072"
                            },
                            {
                                "323": "0",
                                "355": 0,
                                "1204": 0,
                                "2300": 0,
                                "3343": 0,
                                "4993": 1,
                                "4994": 3,
                                "11072": 1,
                                "11476": 0,
                                "12760": 1,
                                "14351": 6,
                                "25854": 1,
                                "25857": 2,
                                "TOTAAL": "15",
                                "_row": "11476"
                            },
                            {
                                "323": "0",
                                "355": 0,
                                "1204": 0,
                                "2300": 0,
                                "3343": 0,
                                "4993": 1,
                                "4994": 0,
                                "11072": 0,
                                "11476": 0,
                                "12760": 0,
                                "14351": 0,
                                "25854": 0,
                                "25857": 1,
                                "TOTAAL": "2",
                                "_row": "12760"
                            },
                            {
                                "323": "0",
                                "355": 0,
                                "1204": 1,
                                "2300": 1,
                                "3343": 1,
                                "4993": 1,
                                "4994": 4,
                                "11072": 2,
                                "11476": 3,
                                "12760": 0,
                                "14351": 0,
                                "25854": 0,
                                "25857": 0,
                                "TOTAAL": "13",
                                "_row": "14351"
                            },
                            {
                                "323": "0",
                                "355": 0,
                                "1204": 1,
                                "2300": 0,
                                "3343": 1,
                                "4993": 0,
                                "4994": 1,
                                "11072": 0,
                                "11476": 2,
                                "12760": 1,
                                "14351": 1,
                                "25854": 0,
                                "25857": 0,
                                "TOTAAL": "7",
                                "_row": "25857"
                            },
                            {
                                "323": "",
                                "355": 2,
                                "1204": 9,
                                "2300": 5,
                                "3343": 6,
                                "4993": 5,
                                "4994": 15,
                                "11072": 5,
                                "11476": 15,
                                "12760": 3,
                                "14351": 17,
                                "25854": 2,
                                "25857": 9,
                                "TOTAAL": " ",
                                "_row": "TOTAAL"
                            }
                        ],
                        "passMatrix2": [
                            {
                                "kort": 0,
                                "kort_succes": 0,
                                "kort_perc": "0%",
                                "middellang": 1,
                                "middellang_succes": 1,
                                "middellang_perc": "100%",
                                "lang": 12,
                                "lang_succes": 4,
                                "lang_perc": "33%",
                                "TOTAAL": 13,
                                "TOTAAL_succes": 5,
                                "TOTAAL_perc": "38%",
                                "gem_len": "54.9m.",
                                "_row": "323"
                            },
                            {
                                "kort": 0,
                                "kort_succes": 0,
                                "kort_perc": "0%",
                                "middellang": 3,
                                "middellang_succes": 2,
                                "middellang_perc": "67%",
                                "lang": 0,
                                "lang_succes": 0,
                                "lang_perc": "0%",
                                "TOTAAL": 3,
                                "TOTAAL_succes": 2,
                                "TOTAAL_perc": "67%",
                                "gem_len": "20.2m.",
                                "_row": "355"
                            },
                            {
                                "kort": 3,
                                "kort_succes": 1,
                                "kort_perc": "33%",
                                "middellang": 6,
                                "middellang_succes": 5,
                                "middellang_perc": "83%",
                                "lang": 4,
                                "lang_succes": 2,
                                "lang_perc": "50%",
                                "TOTAAL": 13,
                                "TOTAAL_succes": 8,
                                "TOTAAL_perc": "62%",
                                "gem_len": "17.2m.",
                                "_row": "1204"
                            },
                            {
                                "kort": 0,
                                "kort_succes": 0,
                                "kort_perc": "0%",
                                "middellang": 2,
                                "middellang_succes": 2,
                                "middellang_perc": "100%",
                                "lang": 4,
                                "lang_succes": 2,
                                "lang_perc": "50%",
                                "TOTAAL": 6,
                                "TOTAAL_succes": 4,
                                "TOTAAL_perc": "67%",
                                "gem_len": "36.4m.",
                                "_row": "2300"
                            },
                            {
                                "kort": 3,
                                "kort_succes": 2,
                                "kort_perc": "67%",
                                "middellang": 7,
                                "middellang_succes": 4,
                                "middellang_perc": "57%",
                                "lang": 1,
                                "lang_succes": 0,
                                "lang_perc": "0%",
                                "TOTAAL": 11,
                                "TOTAAL_succes": 6,
                                "TOTAAL_perc": "55%",
                                "gem_len": "15.8m.",
                                "_row": "3343"
                            },
                            {
                                "kort": 2,
                                "kort_succes": 2,
                                "kort_perc": "100%",
                                "middellang": 3,
                                "middellang_succes": 3,
                                "middellang_perc": "100%",
                                "lang": 2,
                                "lang_succes": 1,
                                "lang_perc": "50%",
                                "TOTAAL": 7,
                                "TOTAAL_succes": 6,
                                "TOTAAL_perc": "86%",
                                "gem_len": "18.1m.",
                                "_row": "4993"
                            },
                            {
                                "kort": 8,
                                "kort_succes": 7,
                                "kort_perc": "88%",
                                "middellang": 7,
                                "middellang_succes": 6,
                                "middellang_perc": "86%",
                                "lang": 2,
                                "lang_succes": 2,
                                "lang_perc": "100%",
                                "TOTAAL": 17,
                                "TOTAAL_succes": 15,
                                "TOTAAL_perc": "88%",
                                "gem_len": "12.1m.",
                                "_row": "4994"
                            },
                            {
                                "kort": 5,
                                "kort_succes": 2,
                                "kort_perc": "40%",
                                "middellang": 10,
                                "middellang_succes": 7,
                                "middellang_perc": "70%",
                                "lang": 3,
                                "lang_succes": 3,
                                "lang_perc": "100%",
                                "TOTAAL": 18,
                                "TOTAAL_succes": 12,
                                "TOTAAL_perc": "67%",
                                "gem_len": "15.5m.",
                                "_row": "11476"
                            },
                            {
                                "kort": 1,
                                "kort_succes": 0,
                                "kort_perc": "0%",
                                "middellang": 4,
                                "middellang_succes": 2,
                                "middellang_perc": "50%",
                                "lang": 0,
                                "lang_succes": 0,
                                "lang_perc": "0%",
                                "TOTAAL": 5,
                                "TOTAAL_succes": 2,
                                "TOTAAL_perc": "40%",
                                "gem_len": "12.3m.",
                                "_row": "12760"
                            },
                            {
                                "kort": 5,
                                "kort_succes": 1,
                                "kort_perc": "20%",
                                "middellang": 6,
                                "middellang_succes": 4,
                                "middellang_perc": "67%",
                                "lang": 4,
                                "lang_succes": 1,
                                "lang_perc": "25%",
                                "TOTAAL": 15,
                                "TOTAAL_succes": 6,
                                "TOTAAL_perc": "40%",
                                "gem_len": "17.4m.",
                                "_row": "14351"
                            },
                            {
                                "kort": 3,
                                "kort_succes": 2,
                                "kort_perc": "67%",
                                "middellang": 2,
                                "middellang_succes": 1,
                                "middellang_perc": "50%",
                                "lang": 3,
                                "lang_succes": 1,
                                "lang_perc": "33%",
                                "TOTAAL": 8,
                                "TOTAAL_succes": 4,
                                "TOTAAL_perc": "50%",
                                "gem_len": "21.4m.",
                                "_row": "25857"
                            },
                            {
                                "kort": 30,
                                "kort_succes": 17,
                                "kort_perc": "57%",
                                "middellang": 51,
                                "middellang_succes": 37,
                                "middellang_perc": "73%",
                                "lang": 35,
                                "lang_succes": 16,
                                "lang_perc": "46%",
                                "TOTAAL": 116,
                                "TOTAAL_succes": 70,
                                "TOTAAL_perc": "60%",
                                "gem_len": "18.5m.",
                                "_row": "TOTAAL"
                            }
                        ]
                    }
                },
                "penalty_visualisatie": [-999],
                "overzicht_overtredingen_per_speler": {
                    "fouls_thuis": [
                        {
                            "personID": 336,
                            "gemaakt": 0,
                            "ondergaan": 1
                        },
                        {
                            "personID": 606,
                            "gemaakt": 0,
                            "ondergaan": 0
                        },
                        {
                            "personID": 902,
                            "gemaakt": 2,
                            "ondergaan": 1
                        },
                        {
                            "personID": 940,
                            "gemaakt": 0,
                            "ondergaan": 0
                        },
                        {
                            "personID": 3359,
                            "gemaakt": 4,
                            "ondergaan": 0
                        },
                        {
                            "personID": 5366,
                            "gemaakt": 1,
                            "ondergaan": 0
                        },
                        {
                            "personID": 5418,
                            "gemaakt": 1,
                            "ondergaan": 0
                        },
                        {
                            "personID": 10527,
                            "gemaakt": 0,
                            "ondergaan": 4
                        },
                        {
                            "personID": 10668,
                            "gemaakt": 2,
                            "ondergaan": 3
                        },
                        {
                            "personID": 13035,
                            "gemaakt": 1,
                            "ondergaan": 2
                        },
                        {
                            "personID": 13463,
                            "gemaakt": 0,
                            "ondergaan": 0
                        },
                        {
                            "personID": 16733,
                            "gemaakt": 2,
                            "ondergaan": 3
                        },
                        {
                            "personID": 18294,
                            "gemaakt": 0,
                            "ondergaan": 0
                        },
                        {
                            "personID": 18298,
                            "gemaakt": 1,
                            "ondergaan": 0
                        }
                    ],
                    "fouls_uit": [
                        {
                            "personID": 323,
                            "gemaakt": 0,
                            "ondergaan": 0
                        },
                        {
                            "personID": 355,
                            "gemaakt": 1,
                            "ondergaan": 1
                        },
                        {
                            "personID": 1204,
                            "gemaakt": 4,
                            "ondergaan": 1
                        },
                        {
                            "personID": 2300,
                            "gemaakt": 0,
                            "ondergaan": 0
                        },
                        {
                            "personID": 3343,
                            "gemaakt": 0,
                            "ondergaan": 1
                        },
                        {
                            "personID": 4993,
                            "gemaakt": 1,
                            "ondergaan": 0
                        },
                        {
                            "personID": 4994,
                            "gemaakt": 0,
                            "ondergaan": 4
                        },
                        {
                            "personID": 11072,
                            "gemaakt": 4,
                            "ondergaan": 1
                        },
                        {
                            "personID": 11476,
                            "gemaakt": 2,
                            "ondergaan": 2
                        },
                        {
                            "personID": 12760,
                            "gemaakt": 0,
                            "ondergaan": 0
                        },
                        {
                            "personID": 14351,
                            "gemaakt": 2,
                            "ondergaan": 3
                        },
                        {
                            "personID": 25854,
                            "gemaakt": 0,
                            "ondergaan": 1
                        },
                        {
                            "personID": 25857,
                            "gemaakt": 2,
                            "ondergaan": 0
                        }
                    ],
                    "offside_thuis": [
                        {
                            "personID": 940,
                            "n": 0
                        },
                        {
                            "personID": 902,
                            "n": 0
                        },
                        {
                            "personID": 3359,
                            "n": 0
                        },
                        {
                            "personID": 5366,
                            "n": 0
                        },
                        {
                            "personID": 18298,
                            "n": 1
                        },
                        {
                            "personID": 10527,
                            "n": 0
                        },
                        {
                            "personID": 336,
                            "n": 0
                        },
                        {
                            "personID": 13035,
                            "n": 2
                        },
                        {
                            "personID": 606,
                            "n": 0
                        },
                        {
                            "personID": 18294,
                            "n": 0
                        },
                        {
                            "personID": 5418,
                            "n": 0
                        },
                        {
                            "personID": 10668,
                            "n": 1
                        },
                        {
                            "personID": 13463,
                            "n": 0
                        },
                        {
                            "personID": 16733,
                            "n": 0
                        }
                    ],
                    "offside_uit": [
                        {
                            "personID": 323,
                            "n": 0
                        },
                        {
                            "personID": 11072,
                            "n": 1
                        },
                        {
                            "personID": 355,
                            "n": 0
                        },
                        {
                            "personID": 2300,
                            "n": 0
                        },
                        {
                            "personID": 25857,
                            "n": 0
                        },
                        {
                            "personID": 3343,
                            "n": 0
                        },
                        {
                            "personID": 14351,
                            "n": 1
                        },
                        {
                            "personID": 4993,
                            "n": 0
                        },
                        {
                            "personID": 1204,
                            "n": 0
                        },
                        {
                            "personID": 4994,
                            "n": 2
                        },
                        {
                            "personID": 11476,
                            "n": 2
                        },
                        {
                            "personID": 25854,
                            "n": 0
                        },
                        {
                            "personID": 12760,
                            "n": 0
                        }
                    ]
                },
                "locatie_overtredingen": {
                    "thuisTeam": [
                        {
                            "teamID": 1527,
                            "personID": 13035,
                            "locationInFieldLength": 69.3,
                            "locationInFieldWidth": 48.9,
                            "minuut": " 7"
                        },
                        {
                            "teamID": 1527,
                            "personID": 5366,
                            "locationInFieldLength": 59.9,
                            "locationInFieldWidth": 59.6,
                            "minuut": "11"
                        },
                        {
                            "teamID": 1527,
                            "personID": 16733,
                            "locationInFieldLength": 74.6,
                            "locationInFieldWidth": 8.9,
                            "minuut": "12"
                        },
                        {
                            "teamID": 1527,
                            "personID": 16733,
                            "locationInFieldLength": 90.7,
                            "locationInFieldWidth": 9.3,
                            "minuut": "21"
                        },
                        {
                            "teamID": 1527,
                            "personID": 3359,
                            "locationInFieldLength": 62.4,
                            "locationInFieldWidth": 6.4,
                            "minuut": "24"
                        },
                        {
                            "teamID": 1527,
                            "personID": 902,
                            "locationInFieldLength": 24.2,
                            "locationInFieldWidth": 91.9,
                            "minuut": "26"
                        },
                        {
                            "teamID": 1527,
                            "personID": 18298,
                            "locationInFieldLength": 37.6,
                            "locationInFieldWidth": 16.9,
                            "minuut": "31"
                        },
                        {
                            "teamID": 1527,
                            "personID": 902,
                            "locationInFieldLength": 59.9,
                            "locationInFieldWidth": 84.1,
                            "minuut": "49"
                        },
                        {
                            "teamID": 1527,
                            "personID": 3359,
                            "locationInFieldLength": 94.2,
                            "locationInFieldWidth": 45.8,
                            "minuut": "53"
                        },
                        {
                            "teamID": 1527,
                            "personID": 3359,
                            "locationInFieldLength": 30.7,
                            "locationInFieldWidth": 45.7,
                            "minuut": "68"
                        },
                        {
                            "teamID": 1527,
                            "personID": 10668,
                            "locationInFieldLength": 13.4,
                            "locationInFieldWidth": 13.2,
                            "minuut": "72"
                        },
                        {
                            "teamID": 1527,
                            "personID": 3359,
                            "locationInFieldLength": 9.5,
                            "locationInFieldWidth": 16.1,
                            "minuut": "78"
                        },
                        {
                            "teamID": 1527,
                            "personID": 10668,
                            "locationInFieldLength": 41.2,
                            "locationInFieldWidth": 36.3,
                            "minuut": "82"
                        },
                        {
                            "teamID": 1527,
                            "personID": 5418,
                            "locationInFieldLength": 10,
                            "locationInFieldWidth": 8.6,
                            "minuut": "90"
                        }
                    ],
                    "uitTeam": [
                        {
                            "teamID": 1530,
                            "personID": 11476,
                            "locationInFieldLength": 30.1,
                            "locationInFieldWidth": 15.1,
                            "minuut": " 5"
                        },
                        {
                            "teamID": 1530,
                            "personID": 11476,
                            "locationInFieldLength": 65.5,
                            "locationInFieldWidth": 16,
                            "minuut": " 9"
                        },
                        {
                            "teamID": 1530,
                            "personID": 355,
                            "locationInFieldLength": 40,
                            "locationInFieldWidth": 83.4,
                            "minuut": "20"
                        },
                        {
                            "teamID": 1530,
                            "personID": 11072,
                            "locationInFieldLength": 29.3,
                            "locationInFieldWidth": 88.9,
                            "minuut": "20"
                        },
                        {
                            "teamID": 1530,
                            "personID": 4993,
                            "locationInFieldLength": 43.2,
                            "locationInFieldWidth": 29,
                            "minuut": "29"
                        },
                        {
                            "teamID": 1530,
                            "personID": 11072,
                            "locationInFieldLength": 37.1,
                            "locationInFieldWidth": 60.5,
                            "minuut": "33"
                        },
                        {
                            "teamID": 1530,
                            "personID": 1204,
                            "locationInFieldLength": 41.7,
                            "locationInFieldWidth": 59.3,
                            "minuut": "35"
                        },
                        {
                            "teamID": 1530,
                            "personID": 1204,
                            "locationInFieldLength": 38.7,
                            "locationInFieldWidth": 87.8,
                            "minuut": "38"
                        },
                        {
                            "teamID": 1530,
                            "personID": 14351,
                            "locationInFieldLength": 42.8,
                            "locationInFieldWidth": 68.3,
                            "minuut": "38"
                        },
                        {
                            "teamID": 1530,
                            "personID": 1204,
                            "locationInFieldLength": 44.7,
                            "locationInFieldWidth": 45.3,
                            "minuut": "45"
                        },
                        {
                            "teamID": 1530,
                            "personID": 25857,
                            "locationInFieldLength": 13.3,
                            "locationInFieldWidth": 8.4,
                            "minuut": "52"
                        },
                        {
                            "teamID": 1530,
                            "personID": 11072,
                            "locationInFieldLength": 31.2,
                            "locationInFieldWidth": 66.7,
                            "minuut": "64"
                        },
                        {
                            "teamID": 1530,
                            "personID": 14351,
                            "locationInFieldLength": 59.6,
                            "locationInFieldWidth": 77.3,
                            "minuut": "66"
                        },
                        {
                            "teamID": 1530,
                            "personID": 1204,
                            "locationInFieldLength": 40.9,
                            "locationInFieldWidth": 12.3,
                            "minuut": "70"
                        },
                        {
                            "teamID": 1530,
                            "personID": 11072,
                            "locationInFieldLength": 14.1,
                            "locationInFieldWidth": 86,
                            "minuut": "79"
                        },
                        {
                            "teamID": 1530,
                            "personID": 25857,
                            "locationInFieldLength": 26.7,
                            "locationInFieldWidth": 50.3,
                            "minuut": "80"
                        }
                    ]
                }
            },
            "thuisSpelers_data": {
                "940": {
                    "speler": ["940"],
                    "stat_matrix": {
                        "type": ["keeper"],
                        "speler_mat": [
                            {
                                "940": "98",
                                "_row": "Minuten"
                            },
                            {
                                "940": "4",
                                "_row": "Reddingen"
                            },
                            {
                                "940": "75%",
                                "_row": "Geslaagde reddingen"
                            },
                            {
                                "940": "1",
                                "_row": "Aantal korte passes"
                            },
                            {
                                "940": "10",
                                "_row": "Aantal middellange passes"
                            },
                            {
                                "940": "19",
                                "_row": "Aantal lange passes"
                            },
                            {
                                "940": "70%",
                                "_row": "Geslaagde passes"
                            },
                            {
                                "940": "5",
                                "_row": "Gevangen ballen"
                            },
                            {
                                "940": "2",
                                "_row": "Weggestompte ballen"
                            },
                            {
                                "940": "80%",
                                "_row": "Succesvolle uittrappen"
                            },
                            {
                                "940": "0",
                                "_row": "Gele kaarten"
                            },
                            {
                                "940": "0",
                                "_row": "Rode kaart"
                            }
                        ]
                    },
                    "algemene_stats": [
                        [
                            [98]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [55]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft1": [
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft2": [
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "passes_helft1": {
                        "940": [
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 2,
                                "_row": "902"
                            },
                            {
                                "Passes gegeven aan": 4,
                                "Passes gekregen van": 4,
                                "_row": "3359"
                            },
                            {
                                "Passes gegeven aan": 3,
                                "Passes gekregen van": 6,
                                "_row": "5366"
                            },
                            {
                                "Passes gegeven aan": 4,
                                "Passes gekregen van": 1,
                                "_row": "18298"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 2,
                                "_row": "10527"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "336"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13035"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "606"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "18294"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "5418"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 1,
                                "_row": "10668"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13463"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "16733"
                            },
                            {
                                "Passes gegeven aan": 16,
                                "Passes gekregen van": 16,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "passes_helft2": {
                        "940": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "902"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 3,
                                "_row": "3359"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 3,
                                "_row": "5366"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "18298"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "10527"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "336"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "13035"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "606"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 0,
                                "_row": "18294"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "5418"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "10668"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13463"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "16733"
                            },
                            {
                                "Passes gegeven aan": 11,
                                "Passes gekregen van": 8,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "pass_soorten_helft1": {
                        "940": [
                            {
                                "kort": 0,
                                "kort_succes": 0,
                                "kort_perc": "0%",
                                "middellang": 8,
                                "middellang_succes": 8,
                                "middellang_perc": "100%",
                                "lang": 10,
                                "lang_succes": 8,
                                "lang_perc": "80%",
                                "TOTAAL": 18,
                                "TOTAAL_succes": 16,
                                "TOTAAL_perc": "89%",
                                "gem_len": "34m."
                            }
                        ]
                    },
                    "pass_soorten_helft2": {
                        "940": [
                            {
                                "kort": 1,
                                "kort_succes": 1,
                                "kort_perc": "100%",
                                "middellang": 2,
                                "middellang_succes": 2,
                                "middellang_perc": "100%",
                                "lang": 9,
                                "lang_succes": 2,
                                "lang_perc": "22%",
                                "TOTAAL": 12,
                                "TOTAAL_succes": 5,
                                "TOTAAL_perc": "42%",
                                "gem_len": "43.7m."
                            }
                        ]
                    },
                    "locaties_verdedigende_duels": {
                        "940": []
                    },
                    "locaties_reddingen": [
                        {
                            "zend_length": 29.8,
                            "zend_width": 69.9,
                            "ontvang_length": 12.6,
                            "ontvang_width": 59.1,
                            "actie": "gevangen",
                            "teamID": 1527,
                            "personID": 940
                        },
                        {
                            "zend_length": 39.3,
                            "zend_width": 7.2,
                            "ontvang_length": 7.5,
                            "ontvang_width": 46.6,
                            "actie": "gevangen",
                            "teamID": 1527,
                            "personID": 940
                        },
                        {
                            "zend_length": 92.7,
                            "zend_width": 41.6,
                            "ontvang_length": 11.2,
                            "ontvang_width": 53.1,
                            "actie": "gevangen",
                            "teamID": 1527,
                            "personID": 940
                        },
                        {
                            "zend_length": 16.3,
                            "zend_width": 48,
                            "ontvang_length": 2.3,
                            "ontvang_width": 47.9,
                            "actie": "doelpunt_tegen",
                            "teamID": 1527,
                            "personID": 940
                        },
                        {
                            "zend_length": 6.9,
                            "zend_width": 64.2,
                            "ontvang_length": 7.4,
                            "ontvang_width": 53.9,
                            "actie": "gestompt",
                            "teamID": 1527,
                            "personID": 940
                        },
                        {
                            "zend_length": 92,
                            "zend_width": 49.5,
                            "ontvang_length": 13.4,
                            "ontvang_width": 57.4,
                            "actie": "gevangen",
                            "teamID": 1527,
                            "personID": 940
                        },
                        {
                            "zend_length": 12.2,
                            "zend_width": 77.3,
                            "ontvang_length": 5.7,
                            "ontvang_width": 53.3,
                            "actie": "gevangen",
                            "teamID": 1527,
                            "personID": 940
                        },
                        {
                            "zend_length": 9.8,
                            "zend_width": 60.5,
                            "ontvang_length": 6.3,
                            "ontvang_width": 49.6,
                            "actie": "gestompt",
                            "teamID": 1527,
                            "personID": 940
                        }
                    ],
                    "locaties_uittrappen": [
                        {
                            "zend_lengte": 8,
                            "zend_breedte": 52.1,
                            "ontvang_lengte": [67.1],
                            "ontvang_breedte": [91.1],
                            "teamgenoot": 10527
                        },
                        {
                            "zend_lengte": 8,
                            "zend_breedte": 51.9,
                            "ontvang_lengte": [27.7],
                            "ontvang_breedte": [16.5],
                            "teamgenoot": 3359
                        },
                        {
                            "zend_lengte": 8,
                            "zend_breedte": 44.2,
                            "ontvang_lengte": [27.8],
                            "ontvang_breedte": [84],
                            "teamgenoot": 902
                        },
                        {
                            "zend_lengte": 8,
                            "zend_breedte": 41.8,
                            "ontvang_lengte": [57.1],
                            "ontvang_breedte": [66.1],
                            "teamgenoot": 10527
                        },
                        {
                            "zend_lengte": 8,
                            "zend_breedte": 49.5,
                            "ontvang_lengte": [29.6],
                            "ontvang_breedte": [68.9],
                            "teamgenoot": 10668
                        },
                        {
                            "zend_lengte": 5.9,
                            "zend_breedte": 42.1,
                            "ontvang_lengte": [62.9],
                            "ontvang_breedte": [83.6],
                            "teamgenoot": 18294
                        },
                        {
                            "zend_lengte": 8,
                            "zend_breedte": 53.3,
                            "ontvang_lengte": [43.1],
                            "ontvang_breedte": [90.9],
                            "teamgenoot": 902
                        },
                        {
                            "zend_lengte": 8,
                            "zend_breedte": 39.2,
                            "ontvang_lengte": [26.8],
                            "ontvang_breedte": [59.4],
                            "teamgenoot": 5366
                        },
                        {
                            "zend_lengte": 7.8,
                            "zend_breedte": 44.6,
                            "ontvang_lengte": [28.1],
                            "ontvang_breedte": [54.5],
                            "teamgenoot": 10668
                        },
                        {
                            "zend_lengte": 7.9,
                            "zend_breedte": 40.2,
                            "ontvang_lengte": [27.3],
                            "ontvang_breedte": [34],
                            "teamgenoot": 10668
                        }
                    ]
                },
                "902": {
                    "speler": ["902"],
                    "stat_matrix": {
                        "type": ["veldspeler"],
                        "speler_mat": [
                            {
                                "902": "98",
                                "_row": "Minuten"
                            },
                            {
                                "902": "0",
                                "_row": "Doelpunten"
                            },
                            {
                                "902": "33",
                                "_row": "Aantal passes"
                            },
                            {
                                "902": "23",
                                "_row": "Geslaagde passes"
                            },
                            {
                                "902": "0",
                                "_row": "Doelpogingen"
                            },
                            {
                                "902": "NaN%",
                                "_row": "Doelpogingen op doel"
                            },
                            {
                                "902": "36%",
                                "_row": "Gewonnen duels"
                            },
                            {
                                "902": "2",
                                "_row": "Overtredingen"
                            },
                            {
                                "902": "0",
                                "_row": "Gele kaarten"
                            },
                            {
                                "902": "0",
                                "_row": "Rode kaart"
                            },
                            {
                                "902": "0",
                                "_row": "Intercepties"
                            },
                            {
                                "902": "2",
                                "_row": "Voorzetten"
                            }
                        ]
                    },
                    "algemene_stats": [
                        [
                            [98]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [70]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [11]
                        ],
                        [
                            [4]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [2]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft1": [
                        [
                            [0]
                        ],
                        [
                            [2]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [3]
                        ]
                    ],
                    "aanvallende_acties_helft2": [
                        [
                            [0]
                        ],
                        [
                            [2]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ]
                    ],
                    "verdedigende_acties_helft1": [
                        [
                            [6]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [4]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft2": [
                        [
                            [5]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [5]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "dode_spel_momenten": [
                        [
                            [15]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "passes_helft1": {
                        "902": [
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 1,
                                "_row": "940"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 2,
                                "_row": "3359"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 3,
                                "_row": "5366"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "18298"
                            },
                            {
                                "Passes gegeven aan": 3,
                                "Passes gekregen van": 2,
                                "_row": "10527"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 1,
                                "_row": "336"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 0,
                                "_row": "13035"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "606"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "18294"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "5418"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "10668"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13463"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "16733"
                            },
                            {
                                "Passes gegeven aan": 15,
                                "Passes gekregen van": 10,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "passes_helft2": {
                        "902": [
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "940"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 2,
                                "_row": "3359"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 2,
                                "_row": "5366"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "18298"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "10527"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "336"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13035"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "606"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 0,
                                "_row": "18294"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 0,
                                "_row": "5418"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 0,
                                "_row": "10668"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "13463"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "16733"
                            },
                            {
                                "Passes gegeven aan": 12,
                                "Passes gekregen van": 6,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "pass_soorten_helft1": {
                        "902": [
                            {
                                "kort": 3,
                                "kort_succes": 2,
                                "kort_perc": "67%",
                                "middellang": 7,
                                "middellang_succes": 4,
                                "middellang_perc": "57%",
                                "lang": 8,
                                "lang_succes": 6,
                                "lang_perc": "75%",
                                "TOTAAL": 18,
                                "TOTAAL_succes": 12,
                                "TOTAAL_perc": "67%",
                                "gem_len": "25m."
                            }
                        ]
                    },
                    "pass_soorten_helft2": {
                        "902": [
                            {
                                "kort": 5,
                                "kort_succes": 3,
                                "kort_perc": "60%",
                                "middellang": 7,
                                "middellang_succes": 6,
                                "middellang_perc": "86%",
                                "lang": 3,
                                "lang_succes": 2,
                                "lang_perc": "67%",
                                "TOTAAL": 15,
                                "TOTAAL_succes": 11,
                                "TOTAAL_perc": "73%",
                                "gem_len": "15.8m."
                            }
                        ]
                    },
                    "locatie_voorzetten": {
                        "902": [
                            {
                                "zend_personID": 902,
                                "doelpoging_na_3": false,
                                "zend_lengte": 95.7,
                                "zend_breedte": 87
                            },
                            {
                                "zend_personID": 902,
                                "doelpoging_na_3": false,
                                "zend_lengte": 85.4,
                                "zend_breedte": 85.3
                            }
                        ]
                    },
                    "locaties_aanvallende_duels": {
                        "902": []
                    },
                    "locaties_verdedigende_duels": {
                        "902": [
                            {
                                "personID": 902,
                                "locationInFieldLength": 39.2,
                                "locationInFieldWidth": 90.4,
                                "gewonnen": 0,
                                "duel_type": "Grond"
                            },
                            {
                                "personID": 902,
                                "locationInFieldLength": 15.4,
                                "locationInFieldWidth": 59.6,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 902,
                                "locationInFieldLength": 34.8,
                                "locationInFieldWidth": 78.5,
                                "gewonnen": 1,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 902,
                                "locationInFieldLength": 60.6,
                                "locationInFieldWidth": 71.5,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 902,
                                "locationInFieldLength": 50.2,
                                "locationInFieldWidth": 90.7,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 902,
                                "locationInFieldLength": 22.8,
                                "locationInFieldWidth": 91.8,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 902,
                                "locationInFieldLength": 17.7,
                                "locationInFieldWidth": 66.9,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 902,
                                "locationInFieldLength": 58.9,
                                "locationInFieldWidth": 85.6,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 902,
                                "locationInFieldLength": 10.8,
                                "locationInFieldWidth": 67.1,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 902,
                                "locationInFieldLength": 14.4,
                                "locationInFieldWidth": 94,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 902,
                                "locationInFieldLength": 54.7,
                                "locationInFieldWidth": 91.8,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            }
                        ]
                    },
                    "locaties_doelpogingen": {
                        "902": []
                    }
                },
                "3359": {
                    "speler": ["3359"],
                    "stat_matrix": {
                        "type": ["veldspeler"],
                        "speler_mat": [
                            {
                                "3359": "98",
                                "_row": "Minuten"
                            },
                            {
                                "3359": "0",
                                "_row": "Doelpunten"
                            },
                            {
                                "3359": "72",
                                "_row": "Aantal passes"
                            },
                            {
                                "3359": "59",
                                "_row": "Geslaagde passes"
                            },
                            {
                                "3359": "0",
                                "_row": "Doelpogingen"
                            },
                            {
                                "3359": "NaN%",
                                "_row": "Doelpogingen op doel"
                            },
                            {
                                "3359": "27%",
                                "_row": "Gewonnen duels"
                            },
                            {
                                "3359": "4",
                                "_row": "Overtredingen"
                            },
                            {
                                "3359": "1",
                                "_row": "Gele kaarten"
                            },
                            {
                                "3359": "0",
                                "_row": "Rode kaart"
                            },
                            {
                                "3359": "0",
                                "_row": "Intercepties"
                            },
                            {
                                "3359": "2",
                                "_row": "Voorzetten"
                            }
                        ]
                    },
                    "algemene_stats": [
                        [
                            [98]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [114]
                        ],
                        [
                            [5]
                        ],
                        [
                            [2]
                        ],
                        [
                            [10]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [4]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft1": [
                        [
                            [2]
                        ],
                        [
                            [3]
                        ],
                        [
                            [4]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft2": [
                        [
                            [3]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ]
                    ],
                    "verdedigende_acties_helft1": [
                        [
                            [5]
                        ],
                        [
                            [3]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [4]
                        ],
                        [
                            [5]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft2": [
                        [
                            [5]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [4]
                        ],
                        [
                            [6]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "dode_spel_momenten": [
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ]
                    ],
                    "passes_helft1": {
                        "3359": [
                            {
                                "Passes gegeven aan": 4,
                                "Passes gekregen van": 4,
                                "_row": "940"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 2,
                                "_row": "902"
                            },
                            {
                                "Passes gegeven aan": 6,
                                "Passes gekregen van": 7,
                                "_row": "5366"
                            },
                            {
                                "Passes gegeven aan": 9,
                                "Passes gekregen van": 2,
                                "_row": "18298"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "10527"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "336"
                            },
                            {
                                "Passes gegeven aan": 3,
                                "Passes gekregen van": 0,
                                "_row": "13035"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "606"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "18294"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 4,
                                "_row": "5418"
                            },
                            {
                                "Passes gegeven aan": 9,
                                "Passes gekregen van": 3,
                                "_row": "10668"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13463"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 4,
                                "_row": "16733"
                            },
                            {
                                "Passes gegeven aan": 39,
                                "Passes gekregen van": 27,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "passes_helft2": {
                        "3359": [
                            {
                                "Passes gegeven aan": 3,
                                "Passes gekregen van": 2,
                                "_row": "940"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 2,
                                "_row": "902"
                            },
                            {
                                "Passes gegeven aan": 9,
                                "Passes gekregen van": 2,
                                "_row": "5366"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 2,
                                "_row": "18298"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 2,
                                "_row": "10527"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "336"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 0,
                                "_row": "13035"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "606"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "18294"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 4,
                                "_row": "5418"
                            },
                            {
                                "Passes gegeven aan": 4,
                                "Passes gekregen van": 3,
                                "_row": "10668"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13463"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 2,
                                "_row": "16733"
                            },
                            {
                                "Passes gegeven aan": 26,
                                "Passes gekregen van": 20,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "pass_soorten_helft1": {
                        "3359": [
                            {
                                "kort": 8,
                                "kort_succes": 8,
                                "kort_perc": "100%",
                                "middellang": 25,
                                "middellang_succes": 22,
                                "middellang_perc": "88%",
                                "lang": 8,
                                "lang_succes": 5,
                                "lang_perc": "62%",
                                "TOTAAL": 41,
                                "TOTAAL_succes": 35,
                                "TOTAAL_perc": "85%",
                                "gem_len": "20.2m."
                            }
                        ]
                    },
                    "pass_soorten_helft2": {
                        "3359": [
                            {
                                "kort": 4,
                                "kort_succes": 3,
                                "kort_perc": "75%",
                                "middellang": 16,
                                "middellang_succes": 16,
                                "middellang_perc": "100%",
                                "lang": 11,
                                "lang_succes": 5,
                                "lang_perc": "45%",
                                "TOTAAL": 31,
                                "TOTAAL_succes": 24,
                                "TOTAAL_perc": "77%",
                                "gem_len": "22.8m."
                            }
                        ]
                    },
                    "locatie_voorzetten": {
                        "3359": [
                            {
                                "zend_personID": 3359,
                                "doelpoging_na_3": false,
                                "zend_lengte": 56.5,
                                "zend_breedte": 12.1
                            },
                            {
                                "zend_personID": 3359,
                                "doelpoging_na_3": false,
                                "zend_lengte": 57.8,
                                "zend_breedte": 81.2
                            }
                        ]
                    },
                    "locaties_aanvallende_duels": {
                        "3359": [
                            {
                                "personID": 3359,
                                "locationInFieldLength": 71.6,
                                "locationInFieldWidth": 49.1,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 3359,
                                "locationInFieldLength": 63.4,
                                "locationInFieldWidth": 40.8,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 3359,
                                "locationInFieldLength": 94.1,
                                "locationInFieldWidth": 44.7,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 3359,
                                "locationInFieldLength": 84.7,
                                "locationInFieldWidth": 51.6,
                                "gewonnen": 1,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 3359,
                                "locationInFieldLength": 79.2,
                                "locationInFieldWidth": 63,
                                "gewonnen": 0,
                                "duel_type": "Lucht"
                            }
                        ]
                    },
                    "locaties_verdedigende_duels": {
                        "3359": [
                            {
                                "personID": 3359,
                                "locationInFieldLength": 11.2,
                                "locationInFieldWidth": 13.6,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 3359,
                                "locationInFieldLength": 13.2,
                                "locationInFieldWidth": 23.4,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 3359,
                                "locationInFieldLength": 62.7,
                                "locationInFieldWidth": 7.3,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 3359,
                                "locationInFieldLength": 59.1,
                                "locationInFieldWidth": 42.2,
                                "gewonnen": 0,
                                "duel_type": "Grond"
                            },
                            {
                                "personID": 3359,
                                "locationInFieldLength": 18.1,
                                "locationInFieldWidth": 7.9,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 3359,
                                "locationInFieldLength": 30.8,
                                "locationInFieldWidth": 46.7,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 3359,
                                "locationInFieldLength": 17.2,
                                "locationInFieldWidth": 61.2,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 3359,
                                "locationInFieldLength": 7.6,
                                "locationInFieldWidth": 9.3,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 3359,
                                "locationInFieldLength": 8.9,
                                "locationInFieldWidth": 16.4,
                                "gewonnen": 0,
                                "duel_type": "Grond"
                            },
                            {
                                "personID": 3359,
                                "locationInFieldLength": 9.2,
                                "locationInFieldWidth": 63,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            }
                        ]
                    },
                    "locaties_doelpogingen": {
                        "3359": []
                    }
                },
                "5366": {
                    "speler": ["5366"],
                    "stat_matrix": {
                        "type": ["veldspeler"],
                        "speler_mat": [
                            {
                                "5366": "98",
                                "_row": "Minuten"
                            },
                            {
                                "5366": "0",
                                "_row": "Doelpunten"
                            },
                            {
                                "5366": "44",
                                "_row": "Aantal passes"
                            },
                            {
                                "5366": "38",
                                "_row": "Geslaagde passes"
                            },
                            {
                                "5366": "0",
                                "_row": "Doelpogingen"
                            },
                            {
                                "5366": "NaN%",
                                "_row": "Doelpogingen op doel"
                            },
                            {
                                "5366": "40%",
                                "_row": "Gewonnen duels"
                            },
                            {
                                "5366": "1",
                                "_row": "Overtredingen"
                            },
                            {
                                "5366": "0",
                                "_row": "Gele kaarten"
                            },
                            {
                                "5366": "0",
                                "_row": "Rode kaart"
                            },
                            {
                                "5366": "0",
                                "_row": "Intercepties"
                            },
                            {
                                "5366": "0",
                                "_row": "Voorzetten"
                            }
                        ]
                    },
                    "algemene_stats": [
                        [
                            [98]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [67]
                        ],
                        [
                            [8]
                        ],
                        [
                            [3]
                        ],
                        [
                            [7]
                        ],
                        [
                            [3]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft1": [
                        [
                            [1]
                        ],
                        [
                            [2]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft2": [
                        [
                            [7]
                        ],
                        [
                            [4]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ]
                    ],
                    "verdedigende_acties_helft1": [
                        [
                            [4]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [3]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft2": [
                        [
                            [3]
                        ],
                        [
                            [4]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "dode_spel_momenten": [
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [3]
                        ],
                        [
                            [0]
                        ],
                        [
                            [3]
                        ]
                    ],
                    "passes_helft1": {
                        "5366": [
                            {
                                "Passes gegeven aan": 6,
                                "Passes gekregen van": 3,
                                "_row": "940"
                            },
                            {
                                "Passes gegeven aan": 3,
                                "Passes gekregen van": 2,
                                "_row": "902"
                            },
                            {
                                "Passes gegeven aan": 7,
                                "Passes gekregen van": 6,
                                "_row": "3359"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 4,
                                "_row": "18298"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 1,
                                "_row": "10527"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "336"
                            },
                            {
                                "Passes gegeven aan": 3,
                                "Passes gekregen van": 0,
                                "_row": "13035"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "606"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "18294"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "5418"
                            },
                            {
                                "Passes gegeven aan": 5,
                                "Passes gekregen van": 2,
                                "_row": "10668"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13463"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "16733"
                            },
                            {
                                "Passes gegeven aan": 27,
                                "Passes gekregen van": 18,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "passes_helft2": {
                        "5366": [
                            {
                                "Passes gegeven aan": 3,
                                "Passes gekregen van": 2,
                                "_row": "940"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 1,
                                "_row": "902"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 9,
                                "_row": "3359"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "18298"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 0,
                                "_row": "10527"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 0,
                                "_row": "336"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13035"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "606"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "18294"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "5418"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "10668"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "13463"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "16733"
                            },
                            {
                                "Passes gegeven aan": 15,
                                "Passes gekregen van": 14,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "pass_soorten_helft1": {
                        "5366": [
                            {
                                "kort": 3,
                                "kort_succes": 2,
                                "kort_perc": "67%",
                                "middellang": 18,
                                "middellang_succes": 18,
                                "middellang_perc": "100%",
                                "lang": 7,
                                "lang_succes": 6,
                                "lang_perc": "86%",
                                "TOTAAL": 28,
                                "TOTAAL_succes": 26,
                                "TOTAAL_perc": "93%",
                                "gem_len": "20.5m."
                            }
                        ]
                    },
                    "pass_soorten_helft2": {
                        "5366": [
                            {
                                "kort": 1,
                                "kort_succes": 0,
                                "kort_perc": "0%",
                                "middellang": 11,
                                "middellang_succes": 11,
                                "middellang_perc": "100%",
                                "lang": 4,
                                "lang_succes": 1,
                                "lang_perc": "25%",
                                "TOTAAL": 16,
                                "TOTAAL_succes": 12,
                                "TOTAAL_perc": "75%",
                                "gem_len": "21.2m."
                            }
                        ]
                    },
                    "locatie_voorzetten": {
                        "5366": []
                    },
                    "locaties_aanvallende_duels": {
                        "5366": [
                            {
                                "personID": 5366,
                                "locationInFieldLength": 89.1,
                                "locationInFieldWidth": 31.7,
                                "gewonnen": 1,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 5366,
                                "locationInFieldLength": 89.5,
                                "locationInFieldWidth": 71.7,
                                "gewonnen": 1,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 5366,
                                "locationInFieldLength": 88.5,
                                "locationInFieldWidth": 62.8,
                                "gewonnen": 1,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 5366,
                                "locationInFieldLength": 89.8,
                                "locationInFieldWidth": 63.4,
                                "gewonnen": 0,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 5366,
                                "locationInFieldLength": 92.9,
                                "locationInFieldWidth": 56.8,
                                "gewonnen": 0,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 5366,
                                "locationInFieldLength": 90.8,
                                "locationInFieldWidth": 68.3,
                                "gewonnen": 0,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 5366,
                                "locationInFieldLength": 71.5,
                                "locationInFieldWidth": 37.3,
                                "gewonnen": 0,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 5366,
                                "locationInFieldLength": 68.1,
                                "locationInFieldWidth": 63.2,
                                "gewonnen": 0,
                                "duel_type": "Lucht"
                            }
                        ]
                    },
                    "locaties_verdedigende_duels": {
                        "5366": [
                            {
                                "personID": 5366,
                                "locationInFieldLength": 47.4,
                                "locationInFieldWidth": 72.7,
                                "gewonnen": 1,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 5366,
                                "locationInFieldLength": 59.5,
                                "locationInFieldWidth": 60.7,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 5366,
                                "locationInFieldLength": 58.4,
                                "locationInFieldWidth": 68.1,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 5366,
                                "locationInFieldLength": 42.9,
                                "locationInFieldWidth": 67.5,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 5366,
                                "locationInFieldLength": 36.7,
                                "locationInFieldWidth": 70.3,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 5366,
                                "locationInFieldLength": 61,
                                "locationInFieldWidth": 13.2,
                                "gewonnen": 1,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 5366,
                                "locationInFieldLength": 55.2,
                                "locationInFieldWidth": 82.2,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            }
                        ]
                    },
                    "locaties_doelpogingen": {
                        "5366": []
                    }
                },
                "18298": {
                    "speler": ["18298"],
                    "stat_matrix": {
                        "type": ["veldspeler"],
                        "speler_mat": [
                            {
                                "18298": "98",
                                "_row": "Minuten"
                            },
                            {
                                "18298": "0",
                                "_row": "Doelpunten"
                            },
                            {
                                "18298": "37",
                                "_row": "Aantal passes"
                            },
                            {
                                "18298": "19",
                                "_row": "Geslaagde passes"
                            },
                            {
                                "18298": "0",
                                "_row": "Doelpogingen"
                            },
                            {
                                "18298": "NaN%",
                                "_row": "Doelpogingen op doel"
                            },
                            {
                                "18298": "67%",
                                "_row": "Gewonnen duels"
                            },
                            {
                                "18298": "1",
                                "_row": "Overtredingen"
                            },
                            {
                                "18298": "0",
                                "_row": "Gele kaarten"
                            },
                            {
                                "18298": "0",
                                "_row": "Rode kaart"
                            },
                            {
                                "18298": "0",
                                "_row": "Intercepties"
                            },
                            {
                                "18298": "3",
                                "_row": "Voorzetten"
                            }
                        ]
                    },
                    "algemene_stats": [
                        [
                            [98]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [83]
                        ],
                        [
                            [3]
                        ],
                        [
                            [2]
                        ],
                        [
                            [12]
                        ],
                        [
                            [8]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft1": [
                        [
                            [1]
                        ],
                        [
                            [4]
                        ],
                        [
                            [4]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [2]
                        ]
                    ],
                    "aanvallende_acties_helft2": [
                        [
                            [2]
                        ],
                        [
                            [6]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [5]
                        ]
                    ],
                    "verdedigende_acties_helft1": [
                        [
                            [6]
                        ],
                        [
                            [4]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [4]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft2": [
                        [
                            [6]
                        ],
                        [
                            [6]
                        ],
                        [
                            [0]
                        ],
                        [
                            [2]
                        ],
                        [
                            [1]
                        ],
                        [
                            [3]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "dode_spel_momenten": [
                        [
                            [14]
                        ],
                        [
                            [1]
                        ],
                        [
                            [3]
                        ],
                        [
                            [0]
                        ],
                        [
                            [3]
                        ]
                    ],
                    "passes_helft1": {
                        "18298": [
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 4,
                                "_row": "940"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "902"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 9,
                                "_row": "3359"
                            },
                            {
                                "Passes gegeven aan": 4,
                                "Passes gekregen van": 1,
                                "_row": "5366"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "10527"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "336"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13035"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "606"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "18294"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 1,
                                "_row": "5418"
                            },
                            {
                                "Passes gegeven aan": 3,
                                "Passes gekregen van": 0,
                                "_row": "10668"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13463"
                            },
                            {
                                "Passes gegeven aan": 7,
                                "Passes gekregen van": 1,
                                "_row": "16733"
                            },
                            {
                                "Passes gegeven aan": 19,
                                "Passes gekregen van": 18,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "passes_helft2": {
                        "18298": [
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "940"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "902"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 2,
                                "_row": "3359"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "5366"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "10527"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "336"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 0,
                                "_row": "13035"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "606"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "18294"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "5418"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "10668"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13463"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 2,
                                "_row": "16733"
                            },
                            {
                                "Passes gegeven aan": 8,
                                "Passes gekregen van": 7,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "pass_soorten_helft1": {
                        "18298": [
                            {
                                "kort": 7,
                                "kort_succes": 4,
                                "kort_perc": "57%",
                                "middellang": 9,
                                "middellang_succes": 6,
                                "middellang_perc": "67%",
                                "lang": 8,
                                "lang_succes": 4,
                                "lang_perc": "50%",
                                "TOTAAL": 24,
                                "TOTAAL_succes": 14,
                                "TOTAAL_perc": "58%",
                                "gem_len": "23.2m."
                            }
                        ]
                    },
                    "pass_soorten_helft2": {
                        "18298": [
                            {
                                "kort": 1,
                                "kort_succes": 1,
                                "kort_perc": "100%",
                                "middellang": 8,
                                "middellang_succes": 4,
                                "middellang_perc": "50%",
                                "lang": 4,
                                "lang_succes": 0,
                                "lang_perc": "0%",
                                "TOTAAL": 13,
                                "TOTAAL_succes": 5,
                                "TOTAAL_perc": "38%",
                                "gem_len": "26.2m."
                            }
                        ]
                    },
                    "locatie_voorzetten": {
                        "18298": [
                            {
                                "zend_personID": 18298,
                                "doelpoging_na_3": true,
                                "zend_lengte": 83.9,
                                "zend_breedte": 14.7
                            },
                            {
                                "zend_personID": 18298,
                                "doelpoging_na_3": false,
                                "zend_lengte": 92.9,
                                "zend_breedte": 17
                            },
                            {
                                "zend_personID": 18298,
                                "doelpoging_na_3": false,
                                "zend_lengte": 81.8,
                                "zend_breedte": 13.6
                            }
                        ]
                    },
                    "locaties_aanvallende_duels": {
                        "18298": [
                            {
                                "personID": 18298,
                                "locationInFieldLength": 59.3,
                                "locationInFieldWidth": 16.8,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 18298,
                                "locationInFieldLength": 83.5,
                                "locationInFieldWidth": 8.1,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 18298,
                                "locationInFieldLength": 82.3,
                                "locationInFieldWidth": 33.8,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            }
                        ]
                    },
                    "locaties_verdedigende_duels": {
                        "18298": [
                            {
                                "personID": 18298,
                                "locationInFieldLength": 81.2,
                                "locationInFieldWidth": 5.8,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 18298,
                                "locationInFieldLength": 47.9,
                                "locationInFieldWidth": 9.1,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 18298,
                                "locationInFieldLength": 30.6,
                                "locationInFieldWidth": 8.4,
                                "gewonnen": 1,
                                "duel_type": "Grond"
                            },
                            {
                                "personID": 18298,
                                "locationInFieldLength": 39.4,
                                "locationInFieldWidth": 17.9,
                                "gewonnen": 0,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 18298,
                                "locationInFieldLength": 8.2,
                                "locationInFieldWidth": 26.1,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 18298,
                                "locationInFieldLength": 41.3,
                                "locationInFieldWidth": 13.9,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 18298,
                                "locationInFieldLength": 36.3,
                                "locationInFieldWidth": 24.3,
                                "gewonnen": 1,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 18298,
                                "locationInFieldLength": 8.6,
                                "locationInFieldWidth": 9.3,
                                "gewonnen": 1,
                                "duel_type": "Grond"
                            },
                            {
                                "personID": 18298,
                                "locationInFieldLength": 38,
                                "locationInFieldWidth": 39,
                                "gewonnen": 1,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 18298,
                                "locationInFieldLength": 24.7,
                                "locationInFieldWidth": 14.2,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 18298,
                                "locationInFieldLength": 4.7,
                                "locationInFieldWidth": 7.6,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 18298,
                                "locationInFieldLength": 10.7,
                                "locationInFieldWidth": 14.5,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            }
                        ]
                    },
                    "locaties_doelpogingen": {
                        "18298": []
                    }
                },
                "10527": {
                    "speler": ["10527"],
                    "stat_matrix": {
                        "type": ["veldspeler"],
                        "speler_mat": [
                            {
                                "10527": "98",
                                "_row": "Minuten"
                            },
                            {
                                "10527": "0",
                                "_row": "Doelpunten"
                            },
                            {
                                "10527": "29",
                                "_row": "Aantal passes"
                            },
                            {
                                "10527": "20",
                                "_row": "Geslaagde passes"
                            },
                            {
                                "10527": "3",
                                "_row": "Doelpogingen"
                            },
                            {
                                "10527": "33%",
                                "_row": "Doelpogingen op doel"
                            },
                            {
                                "10527": "81%",
                                "_row": "Gewonnen duels"
                            },
                            {
                                "10527": "0",
                                "_row": "Overtredingen"
                            },
                            {
                                "10527": "0",
                                "_row": "Gele kaarten"
                            },
                            {
                                "10527": "0",
                                "_row": "Rode kaart"
                            },
                            {
                                "10527": "0",
                                "_row": "Intercepties"
                            },
                            {
                                "10527": "2",
                                "_row": "Voorzetten"
                            }
                        ]
                    },
                    "algemene_stats": [
                        [
                            [98]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [57]
                        ],
                        [
                            [9]
                        ],
                        [
                            [7]
                        ],
                        [
                            [7]
                        ],
                        [
                            [6]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [4]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft1": [
                        [
                            [4]
                        ],
                        [
                            [7]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [3]
                        ]
                    ],
                    "aanvallende_acties_helft2": [
                        [
                            [5]
                        ],
                        [
                            [6]
                        ],
                        [
                            [1]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [2]
                        ],
                        [
                            [2]
                        ],
                        [
                            [1]
                        ]
                    ],
                    "verdedigende_acties_helft1": [
                        [
                            [5]
                        ],
                        [
                            [7]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [5]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft2": [
                        [
                            [2]
                        ],
                        [
                            [6]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "dode_spel_momenten": [
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [3]
                        ],
                        [
                            [0]
                        ],
                        [
                            [3]
                        ]
                    ],
                    "passes_helft1": {
                        "10527": [
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 1,
                                "_row": "940"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 3,
                                "_row": "902"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "3359"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 2,
                                "_row": "5366"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "18298"
                            },
                            {
                                "Passes gegeven aan": 5,
                                "Passes gekregen van": 2,
                                "_row": "336"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 2,
                                "_row": "13035"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "606"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "18294"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "5418"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 5,
                                "_row": "10668"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13463"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "16733"
                            },
                            {
                                "Passes gegeven aan": 14,
                                "Passes gekregen van": 17,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "passes_helft2": {
                        "10527": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "940"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "902"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 0,
                                "_row": "3359"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 2,
                                "_row": "5366"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "18298"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 3,
                                "_row": "336"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 3,
                                "_row": "13035"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "606"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "18294"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 0,
                                "_row": "5418"
                            },
                            {
                                "Passes gegeven aan": 3,
                                "Passes gekregen van": 3,
                                "_row": "10668"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13463"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "16733"
                            },
                            {
                                "Passes gegeven aan": 10,
                                "Passes gekregen van": 14,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "pass_soorten_helft1": {
                        "10527": [
                            {
                                "kort": 3,
                                "kort_succes": 2,
                                "kort_perc": "67%",
                                "middellang": 7,
                                "middellang_succes": 4,
                                "middellang_perc": "57%",
                                "lang": 6,
                                "lang_succes": 4,
                                "lang_perc": "67%",
                                "TOTAAL": 16,
                                "TOTAAL_succes": 10,
                                "TOTAAL_perc": "62%",
                                "gem_len": "20m."
                            }
                        ]
                    },
                    "pass_soorten_helft2": {
                        "10527": [
                            {
                                "kort": 2,
                                "kort_succes": 2,
                                "kort_perc": "100%",
                                "middellang": 7,
                                "middellang_succes": 6,
                                "middellang_perc": "86%",
                                "lang": 4,
                                "lang_succes": 2,
                                "lang_perc": "50%",
                                "TOTAAL": 13,
                                "TOTAAL_succes": 10,
                                "TOTAAL_perc": "77%",
                                "gem_len": "21.1m."
                            }
                        ]
                    },
                    "locatie_voorzetten": {
                        "10527": [
                            {
                                "zend_personID": 10527,
                                "doelpoging_na_3": false,
                                "zend_lengte": 84.5,
                                "zend_breedte": 81.6
                            },
                            {
                                "zend_personID": 10527,
                                "doelpoging_na_3": false,
                                "zend_lengte": 76.4,
                                "zend_breedte": 94.3
                            }
                        ]
                    },
                    "locaties_aanvallende_duels": {
                        "10527": [
                            {
                                "personID": 10527,
                                "locationInFieldLength": 62.4,
                                "locationInFieldWidth": 83.8,
                                "gewonnen": 1,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 10527,
                                "locationInFieldLength": 44.8,
                                "locationInFieldWidth": 55.4,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 10527,
                                "locationInFieldLength": 58.8,
                                "locationInFieldWidth": 73.6,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 10527,
                                "locationInFieldLength": 41.3,
                                "locationInFieldWidth": 41.3,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 10527,
                                "locationInFieldLength": 57.1,
                                "locationInFieldWidth": 66.1,
                                "gewonnen": 1,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 10527,
                                "locationInFieldLength": 92.7,
                                "locationInFieldWidth": 54.3,
                                "gewonnen": 1,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 10527,
                                "locationInFieldLength": 62.8,
                                "locationInFieldWidth": 81.1,
                                "gewonnen": 1,
                                "duel_type": "Grond"
                            },
                            {
                                "personID": 10527,
                                "locationInFieldLength": 72.4,
                                "locationInFieldWidth": 50.8,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 10527,
                                "locationInFieldLength": 44.4,
                                "locationInFieldWidth": 63.7,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            }
                        ]
                    },
                    "locaties_verdedigende_duels": {
                        "10527": [
                            {
                                "personID": 10527,
                                "locationInFieldLength": 66.5,
                                "locationInFieldWidth": 83.5,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 10527,
                                "locationInFieldLength": 56.4,
                                "locationInFieldWidth": 38,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 10527,
                                "locationInFieldLength": 41.2,
                                "locationInFieldWidth": 89,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 10527,
                                "locationInFieldLength": 42.8,
                                "locationInFieldWidth": 57.4,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 10527,
                                "locationInFieldLength": 45.4,
                                "locationInFieldWidth": 57.9,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 10527,
                                "locationInFieldLength": 55.9,
                                "locationInFieldWidth": 80,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 10527,
                                "locationInFieldLength": 5.7,
                                "locationInFieldWidth": 14.1,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            }
                        ]
                    },
                    "locaties_doelpogingen": {
                        "10527": [
                            {
                                "personID": 10527,
                                "locationInFieldLength": 92.8,
                                "locationInFieldWidth": 44.8,
                                "lichaamsdeel": "Voet",
                                "minuut_tot_string": "44",
                                "type": "Redding"
                            },
                            {
                                "personID": 10527,
                                "locationInFieldLength": 84.4,
                                "locationInFieldWidth": 57.3,
                                "lichaamsdeel": "Voet",
                                "minuut_tot_string": "90+3",
                                "type": "Naast of over"
                            },
                            {
                                "personID": 10527,
                                "locationInFieldLength": 81.2,
                                "locationInFieldWidth": 55.4,
                                "lichaamsdeel": "Voet",
                                "minuut_tot_string": "90+3",
                                "type": "Geblokkeerd"
                            }
                        ]
                    }
                },
                "336": {
                    "speler": ["336"],
                    "stat_matrix": {
                        "type": ["veldspeler"],
                        "speler_mat": [
                            {
                                "336": "65",
                                "_row": "Minuten"
                            },
                            {
                                "336": "0",
                                "_row": "Doelpunten"
                            },
                            {
                                "336": "20",
                                "_row": "Aantal passes"
                            },
                            {
                                "336": "12",
                                "_row": "Geslaagde passes"
                            },
                            {
                                "336": "1",
                                "_row": "Doelpogingen"
                            },
                            {
                                "336": "100%",
                                "_row": "Doelpogingen op doel"
                            },
                            {
                                "336": "50%",
                                "_row": "Gewonnen duels"
                            },
                            {
                                "336": "0",
                                "_row": "Overtredingen"
                            },
                            {
                                "336": "0",
                                "_row": "Gele kaarten"
                            },
                            {
                                "336": "0",
                                "_row": "Rode kaart"
                            },
                            {
                                "336": "0",
                                "_row": "Intercepties"
                            },
                            {
                                "336": "2",
                                "_row": "Voorzetten"
                            }
                        ]
                    },
                    "algemene_stats": [
                        [
                            [65]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [53]
                        ],
                        [
                            [16]
                        ],
                        [
                            [8]
                        ],
                        [
                            [2]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft1": [
                        [
                            [13]
                        ],
                        [
                            [6]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [6]
                        ]
                    ],
                    "aanvallende_acties_helft2": [
                        [
                            [3]
                        ],
                        [
                            [3]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ]
                    ],
                    "verdedigende_acties_helft1": [
                        [
                            [2]
                        ],
                        [
                            [6]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft2": [
                        [
                            [0]
                        ],
                        [
                            [3]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "dode_spel_momenten": [
                        [
                            [0]
                        ],
                        [
                            [4]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "passes_helft1": {
                        "336": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "940"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 2,
                                "_row": "902"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "3359"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "5366"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "18298"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 5,
                                "_row": "10527"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "13035"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "606"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "18294"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 2,
                                "_row": "5418"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 8,
                                "_row": "10668"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13463"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 0,
                                "_row": "16733"
                            },
                            {
                                "Passes gegeven aan": 8,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "passes_helft2": {
                        "336": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "940"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "902"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "3359"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 2,
                                "_row": "5366"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "18298"
                            },
                            {
                                "Passes gegeven aan": 3,
                                "Passes gekregen van": 2,
                                "_row": "10527"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13035"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "606"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "18294"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "5418"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 3,
                                "_row": "10668"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13463"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "16733"
                            },
                            {
                                "Passes gegeven aan": 5,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "pass_soorten_helft1": {
                        "336": [
                            {
                                "kort": 6,
                                "kort_succes": 2,
                                "kort_perc": "33%",
                                "middellang": 4,
                                "middellang_succes": 4,
                                "middellang_perc": "100%",
                                "lang": 3,
                                "lang_succes": 1,
                                "lang_perc": "33%",
                                "TOTAAL": 13,
                                "TOTAAL_succes": 7,
                                "TOTAAL_perc": "54%",
                                "gem_len": "14.7m."
                            }
                        ]
                    },
                    "pass_soorten_helft2": {
                        "336": [
                            {
                                "kort": 2,
                                "kort_succes": 1,
                                "kort_perc": "50%",
                                "middellang": 4,
                                "middellang_succes": 3,
                                "middellang_perc": "75%",
                                "lang": 1,
                                "lang_succes": 1,
                                "lang_perc": "100%",
                                "TOTAAL": 7,
                                "TOTAAL_succes": 5,
                                "TOTAAL_perc": "71%",
                                "gem_len": "19.6m."
                            }
                        ]
                    },
                    "locatie_voorzetten": {
                        "336": [
                            {
                                "zend_personID": 336,
                                "doelpoging_na_3": false,
                                "zend_lengte": 77.9,
                                "zend_breedte": 91.4
                            },
                            {
                                "zend_personID": 336,
                                "doelpoging_na_3": false,
                                "zend_lengte": 78.6,
                                "zend_breedte": 91.1
                            }
                        ]
                    },
                    "locaties_aanvallende_duels": {
                        "336": [
                            {
                                "personID": 336,
                                "locationInFieldLength": 67.3,
                                "locationInFieldWidth": 39.2,
                                "gewonnen": 0,
                                "duel_type": "Grond"
                            },
                            {
                                "personID": 336,
                                "locationInFieldLength": 90.7,
                                "locationInFieldWidth": 84.1,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 336,
                                "locationInFieldLength": 79.8,
                                "locationInFieldWidth": 57.6,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 336,
                                "locationInFieldLength": 66.6,
                                "locationInFieldWidth": 82.5,
                                "gewonnen": 0,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 336,
                                "locationInFieldLength": 85.1,
                                "locationInFieldWidth": 58.8,
                                "gewonnen": 1,
                                "duel_type": "Grond"
                            },
                            {
                                "personID": 336,
                                "locationInFieldLength": 91.4,
                                "locationInFieldWidth": 56.5,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 336,
                                "locationInFieldLength": 91.8,
                                "locationInFieldWidth": 91.4,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 336,
                                "locationInFieldLength": 69.4,
                                "locationInFieldWidth": 66.9,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 336,
                                "locationInFieldLength": 85.1,
                                "locationInFieldWidth": 91.1,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 336,
                                "locationInFieldLength": 97.1,
                                "locationInFieldWidth": 88.2,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 336,
                                "locationInFieldLength": 82.4,
                                "locationInFieldWidth": 66.6,
                                "gewonnen": 0,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 336,
                                "locationInFieldLength": 97.3,
                                "locationInFieldWidth": 89.7,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 336,
                                "locationInFieldLength": 76.1,
                                "locationInFieldWidth": 54.8,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 336,
                                "locationInFieldLength": 70.5,
                                "locationInFieldWidth": 84.8,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 336,
                                "locationInFieldLength": 80.1,
                                "locationInFieldWidth": 91.2,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 336,
                                "locationInFieldLength": 76.4,
                                "locationInFieldWidth": 90.7,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            }
                        ]
                    },
                    "locaties_verdedigende_duels": {
                        "336": [
                            {
                                "personID": 336,
                                "locationInFieldLength": 67.7,
                                "locationInFieldWidth": 57.6,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 336,
                                "locationInFieldLength": 68.6,
                                "locationInFieldWidth": 70.8,
                                "gewonnen": 0,
                                "duel_type": "Lucht"
                            }
                        ]
                    },
                    "locaties_doelpogingen": {
                        "336": [
                            {
                                "personID": 336,
                                "locationInFieldLength": 90.9,
                                "locationInFieldWidth": 61.2,
                                "lichaamsdeel": "Hoofd",
                                "minuut_tot_string": "55",
                                "type": "Redding"
                            }
                        ]
                    }
                },
                "13035": {
                    "speler": ["13035"],
                    "stat_matrix": {
                        "type": ["veldspeler"],
                        "speler_mat": [
                            {
                                "13035": "65",
                                "_row": "Minuten"
                            },
                            {
                                "13035": "0",
                                "_row": "Doelpunten"
                            },
                            {
                                "13035": "9",
                                "_row": "Aantal passes"
                            },
                            {
                                "13035": "8",
                                "_row": "Geslaagde passes"
                            },
                            {
                                "13035": "2",
                                "_row": "Doelpogingen"
                            },
                            {
                                "13035": "0%",
                                "_row": "Doelpogingen op doel"
                            },
                            {
                                "13035": "58%",
                                "_row": "Gewonnen duels"
                            },
                            {
                                "13035": "1",
                                "_row": "Overtredingen"
                            },
                            {
                                "13035": "0",
                                "_row": "Gele kaarten"
                            },
                            {
                                "13035": "0",
                                "_row": "Rode kaart"
                            },
                            {
                                "13035": "0",
                                "_row": "Intercepties"
                            },
                            {
                                "13035": "1",
                                "_row": "Voorzetten"
                            }
                        ]
                    },
                    "algemene_stats": [
                        [
                            [65]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [37]
                        ],
                        [
                            [19]
                        ],
                        [
                            [11]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [2]
                        ],
                        [
                            [1]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft1": [
                        [
                            [16]
                        ],
                        [
                            [8]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft2": [
                        [
                            [3]
                        ],
                        [
                            [3]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ]
                    ],
                    "verdedigende_acties_helft1": [
                        [
                            [0]
                        ],
                        [
                            [8]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft2": [
                        [
                            [0]
                        ],
                        [
                            [3]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "dode_spel_momenten": [
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "passes_helft1": {
                        "13035": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "940"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 2,
                                "_row": "902"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 3,
                                "_row": "3359"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 3,
                                "_row": "5366"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "18298"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 0,
                                "_row": "10527"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "336"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "606"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "18294"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "5418"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 4,
                                "_row": "10668"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13463"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "16733"
                            },
                            {
                                "Passes gegeven aan": 4,
                                "Passes gekregen van": 14,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "passes_helft2": {
                        "13035": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "940"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "902"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 2,
                                "_row": "3359"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "5366"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 2,
                                "_row": "18298"
                            },
                            {
                                "Passes gegeven aan": 3,
                                "Passes gekregen van": 0,
                                "_row": "10527"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "336"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "606"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "18294"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "5418"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "10668"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13463"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "16733"
                            },
                            {
                                "Passes gegeven aan": 4,
                                "Passes gekregen van": 5,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "pass_soorten_helft1": {
                        "13035": [
                            {
                                "kort": 2,
                                "kort_succes": 2,
                                "kort_perc": "100%",
                                "middellang": 2,
                                "middellang_succes": 1,
                                "middellang_perc": "50%",
                                "lang": 1,
                                "lang_succes": 1,
                                "lang_perc": "100%",
                                "TOTAAL": 5,
                                "TOTAAL_succes": 4,
                                "TOTAAL_perc": "80%",
                                "gem_len": "12.9m."
                            }
                        ]
                    },
                    "pass_soorten_helft2": {
                        "13035": [
                            {
                                "kort": 2,
                                "kort_succes": 2,
                                "kort_perc": "100%",
                                "middellang": 2,
                                "middellang_succes": 2,
                                "middellang_perc": "100%",
                                "lang": 0,
                                "lang_succes": 0,
                                "lang_perc": "0%",
                                "TOTAAL": 4,
                                "TOTAAL_succes": 4,
                                "TOTAAL_perc": "100%",
                                "gem_len": "12.4m."
                            }
                        ]
                    },
                    "locatie_voorzetten": {
                        "13035": [
                            {
                                "zend_personID": 13035,
                                "doelpoging_na_3": true,
                                "zend_lengte": 83,
                                "zend_breedte": 15.2
                            }
                        ]
                    },
                    "locaties_aanvallende_duels": {
                        "13035": [
                            {
                                "personID": 13035,
                                "locationInFieldLength": 76.4,
                                "locationInFieldWidth": 8.8,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 13035,
                                "locationInFieldLength": 84.9,
                                "locationInFieldWidth": 13.2,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 13035,
                                "locationInFieldLength": 63.4,
                                "locationInFieldWidth": 10.2,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 13035,
                                "locationInFieldLength": 69.9,
                                "locationInFieldWidth": 49.4,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 13035,
                                "locationInFieldLength": 62.6,
                                "locationInFieldWidth": 46.5,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 13035,
                                "locationInFieldLength": 83.6,
                                "locationInFieldWidth": 56.9,
                                "gewonnen": 0,
                                "duel_type": "Grond"
                            },
                            {
                                "personID": 13035,
                                "locationInFieldLength": 58.6,
                                "locationInFieldWidth": 81.1,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 13035,
                                "locationInFieldLength": 61,
                                "locationInFieldWidth": 20,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 13035,
                                "locationInFieldLength": 67.8,
                                "locationInFieldWidth": 10.1,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 13035,
                                "locationInFieldLength": 69.5,
                                "locationInFieldWidth": 52.9,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 13035,
                                "locationInFieldLength": 75,
                                "locationInFieldWidth": 8.9,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 13035,
                                "locationInFieldLength": 93.5,
                                "locationInFieldWidth": 47.9,
                                "gewonnen": 0,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 13035,
                                "locationInFieldLength": 73.2,
                                "locationInFieldWidth": 62.1,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 13035,
                                "locationInFieldLength": 71.1,
                                "locationInFieldWidth": 45.8,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 13035,
                                "locationInFieldLength": 36.5,
                                "locationInFieldWidth": 7.8,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 13035,
                                "locationInFieldLength": 87,
                                "locationInFieldWidth": 42.2,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 13035,
                                "locationInFieldLength": 50.1,
                                "locationInFieldWidth": 38.9,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 13035,
                                "locationInFieldLength": 67.3,
                                "locationInFieldWidth": 27,
                                "gewonnen": 1,
                                "duel_type": "Grond"
                            },
                            {
                                "personID": 13035,
                                "locationInFieldLength": 70.6,
                                "locationInFieldWidth": 57.3,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            }
                        ]
                    },
                    "locaties_verdedigende_duels": {
                        "13035": []
                    },
                    "locaties_doelpogingen": {
                        "13035": [
                            {
                                "personID": 13035,
                                "locationInFieldLength": 93.2,
                                "locationInFieldWidth": 44.5,
                                "lichaamsdeel": "Hoofd",
                                "minuut_tot_string": "42",
                                "type": "Naast of over"
                            },
                            {
                                "personID": 13035,
                                "locationInFieldLength": 91.8,
                                "locationInFieldWidth": 54.3,
                                "lichaamsdeel": "Voet",
                                "minuut_tot_string": "61",
                                "type": "Geblokkeerd"
                            }
                        ]
                    }
                },
                "606": {
                    "speler": ["606"],
                    "stat_matrix": {
                        "type": ["veldspeler"],
                        "speler_mat": [
                            {
                                "606": "33",
                                "_row": "Minuten"
                            },
                            {
                                "606": "0",
                                "_row": "Doelpunten"
                            },
                            {
                                "606": "3",
                                "_row": "Aantal passes"
                            },
                            {
                                "606": "1",
                                "_row": "Geslaagde passes"
                            },
                            {
                                "606": "1",
                                "_row": "Doelpogingen"
                            },
                            {
                                "606": "100%",
                                "_row": "Doelpogingen op doel"
                            },
                            {
                                "606": "60%",
                                "_row": "Gewonnen duels"
                            },
                            {
                                "606": "0",
                                "_row": "Overtredingen"
                            },
                            {
                                "606": "0",
                                "_row": "Gele kaarten"
                            },
                            {
                                "606": "0",
                                "_row": "Rode kaart"
                            },
                            {
                                "606": "0",
                                "_row": "Intercepties"
                            },
                            {
                                "606": "1",
                                "_row": "Voorzetten"
                            }
                        ]
                    },
                    "algemene_stats": [
                        [
                            [33]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [12]
                        ],
                        [
                            [5]
                        ],
                        [
                            [3]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft1": [
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft2": [
                        [
                            [5]
                        ],
                        [
                            [3]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ]
                    ],
                    "verdedigende_acties_helft1": [
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft2": [
                        [
                            [0]
                        ],
                        [
                            [3]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "dode_spel_momenten": [
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "passes_helft1": {
                        "606": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "940"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "902"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "3359"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "5366"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "18298"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "10527"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "336"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13035"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "18294"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "5418"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "10668"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13463"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "16733"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "passes_helft2": {
                        "606": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "940"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "902"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "3359"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "5366"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "18298"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "10527"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "336"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13035"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "18294"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "5418"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 2,
                                "_row": "10668"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13463"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "16733"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 6,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "pass_soorten_helft1": {
                        "606": [
                            {
                                "kort": 0,
                                "kort_succes": 0,
                                "kort_perc": "0",
                                "middellang": 0,
                                "middellang_succes": 0,
                                "middellang_perc": "0",
                                "lang": 0,
                                "lang_succes": 0,
                                "lang_perc": "0",
                                "TOTAAL": 0,
                                "TOTAAL_succes": 0,
                                "TOTAAL_perc": "0",
                                "gem_len": "0"
                            }
                        ]
                    },
                    "pass_soorten_helft2": {
                        "606": [
                            {
                                "kort": 1,
                                "kort_succes": 0,
                                "kort_perc": "0%",
                                "middellang": 1,
                                "middellang_succes": 1,
                                "middellang_perc": "100%",
                                "lang": 1,
                                "lang_succes": 0,
                                "lang_perc": "0%",
                                "TOTAAL": 3,
                                "TOTAAL_succes": 1,
                                "TOTAAL_perc": "33%",
                                "gem_len": "17.6m."
                            }
                        ]
                    },
                    "locatie_voorzetten": {
                        "606": [
                            {
                                "zend_personID": 606,
                                "doelpoging_na_3": false,
                                "zend_lengte": 87.1,
                                "zend_breedte": 87.3
                            }
                        ]
                    },
                    "locaties_aanvallende_duels": {
                        "606": [
                            {
                                "personID": 606,
                                "locationInFieldLength": 80.6,
                                "locationInFieldWidth": 38.9,
                                "gewonnen": 0,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 606,
                                "locationInFieldLength": 70.3,
                                "locationInFieldWidth": 67.6,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 606,
                                "locationInFieldLength": 79.9,
                                "locationInFieldWidth": 10.2,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 606,
                                "locationInFieldLength": 67.7,
                                "locationInFieldWidth": 88.9,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 606,
                                "locationInFieldLength": 85.3,
                                "locationInFieldWidth": 53.7,
                                "gewonnen": 0,
                                "duel_type": "Lucht"
                            }
                        ]
                    },
                    "locaties_verdedigende_duels": {
                        "606": []
                    },
                    "locaties_doelpogingen": {
                        "606": [
                            {
                                "personID": 606,
                                "locationInFieldLength": 90.7,
                                "locationInFieldWidth": 46.9,
                                "lichaamsdeel": "Hoofd",
                                "minuut_tot_string": "90",
                                "type": "Redding"
                            }
                        ]
                    }
                },
                "18294": {
                    "speler": ["18294"],
                    "stat_matrix": {
                        "type": ["veldspeler"],
                        "speler_mat": [
                            {
                                "18294": "33",
                                "_row": "Minuten"
                            },
                            {
                                "18294": "0",
                                "_row": "Doelpunten"
                            },
                            {
                                "18294": "6",
                                "_row": "Aantal passes"
                            },
                            {
                                "18294": "1",
                                "_row": "Geslaagde passes"
                            },
                            {
                                "18294": "0",
                                "_row": "Doelpogingen"
                            },
                            {
                                "18294": "NaN%",
                                "_row": "Doelpogingen op doel"
                            },
                            {
                                "18294": "90%",
                                "_row": "Gewonnen duels"
                            },
                            {
                                "18294": "0",
                                "_row": "Overtredingen"
                            },
                            {
                                "18294": "0",
                                "_row": "Gele kaarten"
                            },
                            {
                                "18294": "0",
                                "_row": "Rode kaart"
                            },
                            {
                                "18294": "0",
                                "_row": "Intercepties"
                            },
                            {
                                "18294": "2",
                                "_row": "Voorzetten"
                            }
                        ]
                    },
                    "algemene_stats": [
                        [
                            [33]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [20]
                        ],
                        [
                            [6]
                        ],
                        [
                            [5]
                        ],
                        [
                            [4]
                        ],
                        [
                            [4]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft1": [
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft2": [
                        [
                            [6]
                        ],
                        [
                            [9]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ]
                    ],
                    "verdedigende_acties_helft1": [
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft2": [
                        [
                            [4]
                        ],
                        [
                            [9]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [4]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "dode_spel_momenten": [
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "passes_helft1": {
                        "18294": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "940"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "902"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "3359"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "5366"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "18298"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "10527"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "336"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13035"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "606"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "5418"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "10668"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13463"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "16733"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "passes_helft2": {
                        "18294": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 2,
                                "_row": "940"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 2,
                                "_row": "902"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "3359"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "5366"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "18298"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "10527"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "336"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13035"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "606"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "5418"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 2,
                                "_row": "10668"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13463"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "16733"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 7,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "pass_soorten_helft1": {
                        "18294": [
                            {
                                "kort": 0,
                                "kort_succes": 0,
                                "kort_perc": "0",
                                "middellang": 0,
                                "middellang_succes": 0,
                                "middellang_perc": "0",
                                "lang": 0,
                                "lang_succes": 0,
                                "lang_perc": "0",
                                "TOTAAL": 0,
                                "TOTAAL_succes": 0,
                                "TOTAAL_perc": "0",
                                "gem_len": "0"
                            }
                        ]
                    },
                    "pass_soorten_helft2": {
                        "18294": [
                            {
                                "kort": 2,
                                "kort_succes": 0,
                                "kort_perc": "0%",
                                "middellang": 3,
                                "middellang_succes": 1,
                                "middellang_perc": "33%",
                                "lang": 1,
                                "lang_succes": 0,
                                "lang_perc": "0%",
                                "TOTAAL": 6,
                                "TOTAAL_succes": 1,
                                "TOTAAL_perc": "17%",
                                "gem_len": "24.2m."
                            }
                        ]
                    },
                    "locatie_voorzetten": {
                        "18294": [
                            {
                                "zend_personID": 18294,
                                "doelpoging_na_3": true,
                                "zend_lengte": 93.4,
                                "zend_breedte": 89.7
                            },
                            {
                                "zend_personID": 18294,
                                "doelpoging_na_3": false,
                                "zend_lengte": 91.9,
                                "zend_breedte": 88.3
                            }
                        ]
                    },
                    "locaties_aanvallende_duels": {
                        "18294": [
                            {
                                "personID": 18294,
                                "locationInFieldLength": 67.6,
                                "locationInFieldWidth": 87.5,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 18294,
                                "locationInFieldLength": 73.1,
                                "locationInFieldWidth": 75.3,
                                "gewonnen": 0,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 18294,
                                "locationInFieldLength": 85.7,
                                "locationInFieldWidth": 89.3,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 18294,
                                "locationInFieldLength": 80.1,
                                "locationInFieldWidth": 72.5,
                                "gewonnen": 1,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 18294,
                                "locationInFieldLength": 68.8,
                                "locationInFieldWidth": 80.5,
                                "gewonnen": 1,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 18294,
                                "locationInFieldLength": 71,
                                "locationInFieldWidth": 67.6,
                                "gewonnen": 1,
                                "duel_type": "Lucht"
                            }
                        ]
                    },
                    "locaties_verdedigende_duels": {
                        "18294": [
                            {
                                "personID": 18294,
                                "locationInFieldLength": 75.8,
                                "locationInFieldWidth": 84.1,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 18294,
                                "locationInFieldLength": 13.9,
                                "locationInFieldWidth": 91.4,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 18294,
                                "locationInFieldLength": 12.9,
                                "locationInFieldWidth": 91.7,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 18294,
                                "locationInFieldLength": 56.8,
                                "locationInFieldWidth": 65.9,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            }
                        ]
                    },
                    "locaties_doelpogingen": {
                        "18294": []
                    }
                },
                "5418": {
                    "speler": ["5418"],
                    "stat_matrix": {
                        "type": ["veldspeler"],
                        "speler_mat": [
                            {
                                "5418": "98",
                                "_row": "Minuten"
                            },
                            {
                                "5418": "0",
                                "_row": "Doelpunten"
                            },
                            {
                                "5418": "29",
                                "_row": "Aantal passes"
                            },
                            {
                                "5418": "18",
                                "_row": "Geslaagde passes"
                            },
                            {
                                "5418": "2",
                                "_row": "Doelpogingen"
                            },
                            {
                                "5418": "50%",
                                "_row": "Doelpogingen op doel"
                            },
                            {
                                "5418": "50%",
                                "_row": "Gewonnen duels"
                            },
                            {
                                "5418": "1",
                                "_row": "Overtredingen"
                            },
                            {
                                "5418": "0",
                                "_row": "Gele kaarten"
                            },
                            {
                                "5418": "0",
                                "_row": "Rode kaart"
                            },
                            {
                                "5418": "0",
                                "_row": "Intercepties"
                            },
                            {
                                "5418": "3",
                                "_row": "Voorzetten"
                            }
                        ]
                    },
                    "algemene_stats": [
                        [
                            [98]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [54]
                        ],
                        [
                            [8]
                        ],
                        [
                            [5]
                        ],
                        [
                            [4]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft1": [
                        [
                            [5]
                        ],
                        [
                            [5]
                        ],
                        [
                            [3]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ]
                    ],
                    "aanvallende_acties_helft2": [
                        [
                            [3]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [2]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [3]
                        ]
                    ],
                    "verdedigende_acties_helft1": [
                        [
                            [0]
                        ],
                        [
                            [5]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft2": [
                        [
                            [4]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [4]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "dode_spel_momenten": [
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "passes_helft1": {
                        "5418": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "940"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "902"
                            },
                            {
                                "Passes gegeven aan": 4,
                                "Passes gekregen van": 2,
                                "_row": "3359"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "5366"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 2,
                                "_row": "18298"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "10527"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 0,
                                "_row": "336"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "13035"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "606"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "18294"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 3,
                                "_row": "10668"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13463"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "16733"
                            },
                            {
                                "Passes gegeven aan": 10,
                                "Passes gekregen van": 9,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "passes_helft2": {
                        "5418": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "940"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 2,
                                "_row": "902"
                            },
                            {
                                "Passes gegeven aan": 4,
                                "Passes gekregen van": 2,
                                "_row": "3359"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "5366"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "18298"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 2,
                                "_row": "10527"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "336"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "13035"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "606"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "18294"
                            },
                            {
                                "Passes gegeven aan": 4,
                                "Passes gekregen van": 2,
                                "_row": "10668"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13463"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "16733"
                            },
                            {
                                "Passes gegeven aan": 10,
                                "Passes gekregen van": 11,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "pass_soorten_helft1": {
                        "5418": [
                            {
                                "kort": 3,
                                "kort_succes": 1,
                                "kort_perc": "33%",
                                "middellang": 7,
                                "middellang_succes": 4,
                                "middellang_perc": "57%",
                                "lang": 6,
                                "lang_succes": 3,
                                "lang_perc": "50%",
                                "TOTAAL": 16,
                                "TOTAAL_succes": 8,
                                "TOTAAL_perc": "50%",
                                "gem_len": "25.6m."
                            }
                        ]
                    },
                    "pass_soorten_helft2": {
                        "5418": [
                            {
                                "kort": 4,
                                "kort_succes": 3,
                                "kort_perc": "75%",
                                "middellang": 8,
                                "middellang_succes": 7,
                                "middellang_perc": "88%",
                                "lang": 1,
                                "lang_succes": 0,
                                "lang_perc": "0%",
                                "TOTAAL": 13,
                                "TOTAAL_succes": 10,
                                "TOTAAL_perc": "77%",
                                "gem_len": "15.1m."
                            }
                        ]
                    },
                    "locatie_voorzetten": {
                        "5418": [
                            {
                                "zend_personID": 5418,
                                "doelpoging_na_3": false,
                                "zend_lengte": 76.4,
                                "zend_breedte": 89.7
                            },
                            {
                                "zend_personID": 5418,
                                "doelpoging_na_3": false,
                                "zend_lengte": 95.8,
                                "zend_breedte": 85.9
                            },
                            {
                                "zend_personID": 5418,
                                "doelpoging_na_3": false,
                                "zend_lengte": 78.9,
                                "zend_breedte": 81.5
                            }
                        ]
                    },
                    "locaties_aanvallende_duels": {
                        "5418": [
                            {
                                "personID": 5418,
                                "locationInFieldLength": 43.4,
                                "locationInFieldWidth": 23.9,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 5418,
                                "locationInFieldLength": 65.5,
                                "locationInFieldWidth": 62.1,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 5418,
                                "locationInFieldLength": 35,
                                "locationInFieldWidth": 35.1,
                                "gewonnen": 1,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 5418,
                                "locationInFieldLength": 70.6,
                                "locationInFieldWidth": 19.8,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 5418,
                                "locationInFieldLength": 62.3,
                                "locationInFieldWidth": 9.9,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 5418,
                                "locationInFieldLength": 55.7,
                                "locationInFieldWidth": 41.6,
                                "gewonnen": 0,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 5418,
                                "locationInFieldLength": 71.8,
                                "locationInFieldWidth": 17.3,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 5418,
                                "locationInFieldLength": 6.3,
                                "locationInFieldWidth": 6,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            }
                        ]
                    },
                    "locaties_verdedigende_duels": {
                        "5418": [
                            {
                                "personID": 5418,
                                "locationInFieldLength": 29.3,
                                "locationInFieldWidth": 32,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 5418,
                                "locationInFieldLength": 9.3,
                                "locationInFieldWidth": 17.9,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 5418,
                                "locationInFieldLength": 64.5,
                                "locationInFieldWidth": 84.5,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 5418,
                                "locationInFieldLength": 9.4,
                                "locationInFieldWidth": 7.2,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            }
                        ]
                    },
                    "locaties_doelpogingen": {
                        "5418": [
                            {
                                "personID": 5418,
                                "locationInFieldLength": 91.6,
                                "locationInFieldWidth": 54.8,
                                "lichaamsdeel": "Voet",
                                "minuut_tot_string": "48",
                                "type": "Redding"
                            },
                            {
                                "personID": 5418,
                                "locationInFieldLength": 80.5,
                                "locationInFieldWidth": 43.5,
                                "lichaamsdeel": "Voet",
                                "minuut_tot_string": "48",
                                "type": "Naast of over"
                            }
                        ]
                    }
                },
                "10668": {
                    "speler": ["10668"],
                    "stat_matrix": {
                        "type": ["veldspeler"],
                        "speler_mat": [
                            {
                                "10668": "98",
                                "_row": "Minuten"
                            },
                            {
                                "10668": "0",
                                "_row": "Doelpunten"
                            },
                            {
                                "10668": "58",
                                "_row": "Aantal passes"
                            },
                            {
                                "10668": "31",
                                "_row": "Geslaagde passes"
                            },
                            {
                                "10668": "4",
                                "_row": "Doelpogingen"
                            },
                            {
                                "10668": "0%",
                                "_row": "Doelpogingen op doel"
                            },
                            {
                                "10668": "48%",
                                "_row": "Gewonnen duels"
                            },
                            {
                                "10668": "2",
                                "_row": "Overtredingen"
                            },
                            {
                                "10668": "1",
                                "_row": "Gele kaarten"
                            },
                            {
                                "10668": "0",
                                "_row": "Rode kaart"
                            },
                            {
                                "10668": "0",
                                "_row": "Intercepties"
                            },
                            {
                                "10668": "2",
                                "_row": "Voorzetten"
                            }
                        ]
                    },
                    "algemene_stats": [
                        [
                            [98]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [116]
                        ],
                        [
                            [6]
                        ],
                        [
                            [5]
                        ],
                        [
                            [15]
                        ],
                        [
                            [5]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [2]
                        ],
                        [
                            [3]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft1": [
                        [
                            [2]
                        ],
                        [
                            [4]
                        ],
                        [
                            [3]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [2]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [2]
                        ]
                    ],
                    "aanvallende_acties_helft2": [
                        [
                            [4]
                        ],
                        [
                            [6]
                        ],
                        [
                            [5]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [2]
                        ],
                        [
                            [1]
                        ],
                        [
                            [4]
                        ]
                    ],
                    "verdedigende_acties_helft1": [
                        [
                            [6]
                        ],
                        [
                            [4]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [4]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft2": [
                        [
                            [9]
                        ],
                        [
                            [6]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [9]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "dode_spel_momenten": [
                        [
                            [3]
                        ],
                        [
                            [4]
                        ],
                        [
                            [6]
                        ],
                        [
                            [1]
                        ],
                        [
                            [5]
                        ]
                    ],
                    "passes_helft1": {
                        "10668": [
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 2,
                                "_row": "940"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "902"
                            },
                            {
                                "Passes gegeven aan": 3,
                                "Passes gekregen van": 9,
                                "_row": "3359"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 5,
                                "_row": "5366"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 3,
                                "_row": "18298"
                            },
                            {
                                "Passes gegeven aan": 5,
                                "Passes gekregen van": 0,
                                "_row": "10527"
                            },
                            {
                                "Passes gegeven aan": 8,
                                "Passes gekregen van": 1,
                                "_row": "336"
                            },
                            {
                                "Passes gegeven aan": 4,
                                "Passes gekregen van": 1,
                                "_row": "13035"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "606"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "18294"
                            },
                            {
                                "Passes gegeven aan": 3,
                                "Passes gekregen van": 0,
                                "_row": "5418"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13463"
                            },
                            {
                                "Passes gegeven aan": 3,
                                "Passes gekregen van": 2,
                                "_row": "16733"
                            },
                            {
                                "Passes gegeven aan": 29,
                                "Passes gekregen van": 24,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "passes_helft2": {
                        "10668": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "940"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 2,
                                "_row": "902"
                            },
                            {
                                "Passes gegeven aan": 3,
                                "Passes gekregen van": 4,
                                "_row": "3359"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "5366"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "18298"
                            },
                            {
                                "Passes gegeven aan": 3,
                                "Passes gekregen van": 3,
                                "_row": "10527"
                            },
                            {
                                "Passes gegeven aan": 3,
                                "Passes gekregen van": 0,
                                "_row": "336"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13035"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 0,
                                "_row": "606"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 1,
                                "_row": "18294"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 4,
                                "_row": "5418"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "13463"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 0,
                                "_row": "16733"
                            },
                            {
                                "Passes gegeven aan": 17,
                                "Passes gekregen van": 16,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "pass_soorten_helft1": {
                        "10668": [
                            {
                                "kort": 3,
                                "kort_succes": 1,
                                "kort_perc": "33%",
                                "middellang": 17,
                                "middellang_succes": 13,
                                "middellang_perc": "76%",
                                "lang": 15,
                                "lang_succes": 5,
                                "lang_perc": "33%",
                                "TOTAAL": 35,
                                "TOTAAL_succes": 19,
                                "TOTAAL_perc": "54%",
                                "gem_len": "27.8m."
                            }
                        ]
                    },
                    "pass_soorten_helft2": {
                        "10668": [
                            {
                                "kort": 2,
                                "kort_succes": 2,
                                "kort_perc": "100%",
                                "middellang": 7,
                                "middellang_succes": 6,
                                "middellang_perc": "86%",
                                "lang": 14,
                                "lang_succes": 4,
                                "lang_perc": "29%",
                                "TOTAAL": 23,
                                "TOTAAL_succes": 12,
                                "TOTAAL_perc": "52%",
                                "gem_len": "34.4m."
                            }
                        ]
                    },
                    "locatie_voorzetten": {
                        "10668": [
                            {
                                "zend_personID": 10668,
                                "doelpoging_na_3": false,
                                "zend_lengte": 94.5,
                                "zend_breedte": 82.3
                            },
                            {
                                "zend_personID": 10668,
                                "doelpoging_na_3": true,
                                "zend_lengte": 95.8,
                                "zend_breedte": 88.9
                            }
                        ]
                    },
                    "locaties_aanvallende_duels": {
                        "10668": [
                            {
                                "personID": 10668,
                                "locationInFieldLength": 56.8,
                                "locationInFieldWidth": 31,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 10668,
                                "locationInFieldLength": 55.7,
                                "locationInFieldWidth": 54.8,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 10668,
                                "locationInFieldLength": 91.3,
                                "locationInFieldWidth": 69.1,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 10668,
                                "locationInFieldLength": 8.5,
                                "locationInFieldWidth": 92.7,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 10668,
                                "locationInFieldLength": 89.4,
                                "locationInFieldWidth": 88.5,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 10668,
                                "locationInFieldLength": 90.7,
                                "locationInFieldWidth": 89.3,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            }
                        ]
                    },
                    "locaties_verdedigende_duels": {
                        "10668": [
                            {
                                "personID": 10668,
                                "locationInFieldLength": 63.3,
                                "locationInFieldWidth": 42.9,
                                "gewonnen": 1,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 10668,
                                "locationInFieldLength": 56.8,
                                "locationInFieldWidth": 69.1,
                                "gewonnen": 1,
                                "duel_type": "Grond"
                            },
                            {
                                "personID": 10668,
                                "locationInFieldLength": 36.4,
                                "locationInFieldWidth": 8.1,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 10668,
                                "locationInFieldLength": 12.1,
                                "locationInFieldWidth": 7.9,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 10668,
                                "locationInFieldLength": 52,
                                "locationInFieldWidth": 86.8,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 10668,
                                "locationInFieldLength": 55.9,
                                "locationInFieldWidth": 38.5,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 10668,
                                "locationInFieldLength": 33,
                                "locationInFieldWidth": 45.5,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 10668,
                                "locationInFieldLength": 40.7,
                                "locationInFieldWidth": 32,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 10668,
                                "locationInFieldLength": 45,
                                "locationInFieldWidth": 73,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 10668,
                                "locationInFieldLength": 42,
                                "locationInFieldWidth": 22.3,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 10668,
                                "locationInFieldLength": 12.6,
                                "locationInFieldWidth": 13.9,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 10668,
                                "locationInFieldLength": 15.9,
                                "locationInFieldWidth": 9.6,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 10668,
                                "locationInFieldLength": 41.1,
                                "locationInFieldWidth": 36.4,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 10668,
                                "locationInFieldLength": 13.7,
                                "locationInFieldWidth": 91.6,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 10668,
                                "locationInFieldLength": 37.9,
                                "locationInFieldWidth": 35.5,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            }
                        ]
                    },
                    "locaties_doelpogingen": {
                        "10668": [
                            {
                                "personID": 10668,
                                "locationInFieldLength": 76.1,
                                "locationInFieldWidth": 44.7,
                                "lichaamsdeel": "Voet",
                                "minuut_tot_string": " 3",
                                "type": "Naast of over"
                            },
                            {
                                "personID": 10668,
                                "locationInFieldLength": 71,
                                "locationInFieldWidth": 62.7,
                                "lichaamsdeel": "Voet",
                                "minuut_tot_string": "51",
                                "type": "Naast of over"
                            },
                            {
                                "personID": 10668,
                                "locationInFieldLength": 78.3,
                                "locationInFieldWidth": 39.5,
                                "lichaamsdeel": "Voet",
                                "minuut_tot_string": "44",
                                "type": "Geblokkeerd"
                            },
                            {
                                "personID": 10668,
                                "locationInFieldLength": 92.2,
                                "locationInFieldWidth": 65.1,
                                "lichaamsdeel": "Voet",
                                "minuut_tot_string": "71",
                                "type": "Geblokkeerd"
                            }
                        ]
                    }
                },
                "13463": {
                    "speler": ["13463"],
                    "stat_matrix": {
                        "type": ["veldspeler"],
                        "speler_mat": [
                            {
                                "13463": "7",
                                "_row": "Minuten"
                            },
                            {
                                "13463": "0",
                                "_row": "Doelpunten"
                            },
                            {
                                "13463": "3",
                                "_row": "Aantal passes"
                            },
                            {
                                "13463": "1",
                                "_row": "Geslaagde passes"
                            },
                            {
                                "13463": "0",
                                "_row": "Doelpogingen"
                            },
                            {
                                "13463": "NaN%",
                                "_row": "Doelpogingen op doel"
                            },
                            {
                                "13463": "100%",
                                "_row": "Gewonnen duels"
                            },
                            {
                                "13463": "0",
                                "_row": "Overtredingen"
                            },
                            {
                                "13463": "0",
                                "_row": "Gele kaarten"
                            },
                            {
                                "13463": "0",
                                "_row": "Rode kaart"
                            },
                            {
                                "13463": "0",
                                "_row": "Intercepties"
                            },
                            {
                                "13463": "0",
                                "_row": "Voorzetten"
                            }
                        ]
                    },
                    "algemene_stats": [
                        [
                            [7]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [5]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft1": [
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft2": [
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft1": [
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft2": [
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "dode_spel_momenten": [
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "passes_helft1": {
                        "13463": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "940"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "902"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "3359"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "5366"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "18298"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "10527"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "336"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13035"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "606"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "18294"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "5418"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "10668"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "16733"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "passes_helft2": {
                        "13463": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "940"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "902"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "3359"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "5366"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "18298"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "10527"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "336"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13035"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "606"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "18294"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "5418"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "10668"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "16733"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 1,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "pass_soorten_helft1": {
                        "13463": [
                            {
                                "kort": 0,
                                "kort_succes": 0,
                                "kort_perc": "0",
                                "middellang": 0,
                                "middellang_succes": 0,
                                "middellang_perc": "0",
                                "lang": 0,
                                "lang_succes": 0,
                                "lang_perc": "0",
                                "TOTAAL": 0,
                                "TOTAAL_succes": 0,
                                "TOTAAL_perc": "0",
                                "gem_len": "0"
                            }
                        ]
                    },
                    "pass_soorten_helft2": {
                        "13463": [
                            {
                                "kort": 0,
                                "kort_succes": 0,
                                "kort_perc": "0%",
                                "middellang": 3,
                                "middellang_succes": 1,
                                "middellang_perc": "33%",
                                "lang": 0,
                                "lang_succes": 0,
                                "lang_perc": "0%",
                                "TOTAAL": 3,
                                "TOTAAL_succes": 1,
                                "TOTAAL_perc": "33%",
                                "gem_len": "20.6m."
                            }
                        ]
                    },
                    "locatie_voorzetten": {
                        "13463": []
                    },
                    "locaties_aanvallende_duels": {
                        "13463": []
                    },
                    "locaties_verdedigende_duels": {
                        "13463": [
                            {
                                "personID": 13463,
                                "locationInFieldLength": 36.1,
                                "locationInFieldWidth": 36.9,
                                "gewonnen": 1,
                                "duel_type": "Grond"
                            }
                        ]
                    },
                    "locaties_doelpogingen": {
                        "13463": []
                    }
                },
                "16733": {
                    "speler": ["16733"],
                    "stat_matrix": {
                        "type": ["veldspeler"],
                        "speler_mat": [
                            {
                                "16733": "92",
                                "_row": "Minuten"
                            },
                            {
                                "16733": "0",
                                "_row": "Doelpunten"
                            },
                            {
                                "16733": "16",
                                "_row": "Aantal passes"
                            },
                            {
                                "16733": "12",
                                "_row": "Geslaagde passes"
                            },
                            {
                                "16733": "1",
                                "_row": "Doelpogingen"
                            },
                            {
                                "16733": "0%",
                                "_row": "Doelpogingen op doel"
                            },
                            {
                                "16733": "27%",
                                "_row": "Gewonnen duels"
                            },
                            {
                                "16733": "2",
                                "_row": "Overtredingen"
                            },
                            {
                                "16733": "0",
                                "_row": "Gele kaarten"
                            },
                            {
                                "16733": "0",
                                "_row": "Rode kaart"
                            },
                            {
                                "16733": "0",
                                "_row": "Intercepties"
                            },
                            {
                                "16733": "1",
                                "_row": "Voorzetten"
                            }
                        ]
                    },
                    "algemene_stats": [
                        [
                            [92]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [40]
                        ],
                        [
                            [13]
                        ],
                        [
                            [4]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [2]
                        ],
                        [
                            [3]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft1": [
                        [
                            [10]
                        ],
                        [
                            [2]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ]
                    ],
                    "aanvallende_acties_helft2": [
                        [
                            [3]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft1": [
                        [
                            [1]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft2": [
                        [
                            [1]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "dode_spel_momenten": [
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ]
                    ],
                    "passes_helft1": {
                        "16733": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "940"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "902"
                            },
                            {
                                "Passes gegeven aan": 4,
                                "Passes gekregen van": 2,
                                "_row": "3359"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "5366"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 7,
                                "_row": "18298"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "10527"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 2,
                                "_row": "336"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13035"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "606"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "18294"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "5418"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 3,
                                "_row": "10668"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13463"
                            },
                            {
                                "Passes gegeven aan": 7,
                                "Passes gekregen van": 15,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "passes_helft2": {
                        "16733": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "940"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "902"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 2,
                                "_row": "3359"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "5366"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 1,
                                "_row": "18298"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "10527"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "336"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13035"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "606"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "18294"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "5418"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 2,
                                "_row": "10668"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "13463"
                            },
                            {
                                "Passes gegeven aan": 5,
                                "Passes gekregen van": 7,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "pass_soorten_helft1": {
                        "16733": [
                            {
                                "kort": 1,
                                "kort_succes": 0,
                                "kort_perc": "0%",
                                "middellang": 6,
                                "middellang_succes": 6,
                                "middellang_perc": "100%",
                                "lang": 2,
                                "lang_succes": 1,
                                "lang_perc": "50%",
                                "TOTAAL": 9,
                                "TOTAAL_succes": 7,
                                "TOTAAL_perc": "78%",
                                "gem_len": "22m."
                            }
                        ]
                    },
                    "pass_soorten_helft2": {
                        "16733": [
                            {
                                "kort": 3,
                                "kort_succes": 2,
                                "kort_perc": "67%",
                                "middellang": 2,
                                "middellang_succes": 1,
                                "middellang_perc": "50%",
                                "lang": 2,
                                "lang_succes": 2,
                                "lang_perc": "100%",
                                "TOTAAL": 7,
                                "TOTAAL_succes": 5,
                                "TOTAAL_perc": "71%",
                                "gem_len": "13.6m."
                            }
                        ]
                    },
                    "locatie_voorzetten": {
                        "16733": [
                            {
                                "zend_personID": 16733,
                                "doelpoging_na_3": false,
                                "zend_lengte": 69.6,
                                "zend_breedte": 7.4
                            }
                        ]
                    },
                    "locaties_aanvallende_duels": {
                        "16733": [
                            {
                                "personID": 16733,
                                "locationInFieldLength": 71.5,
                                "locationInFieldWidth": 22.9,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 16733,
                                "locationInFieldLength": 67.5,
                                "locationInFieldWidth": 13.7,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 16733,
                                "locationInFieldLength": 80.8,
                                "locationInFieldWidth": 10.7,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 16733,
                                "locationInFieldLength": 81.2,
                                "locationInFieldWidth": 7.3,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 16733,
                                "locationInFieldLength": 69.9,
                                "locationInFieldWidth": 28.7,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 16733,
                                "locationInFieldLength": 91.3,
                                "locationInFieldWidth": 45.3,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 16733,
                                "locationInFieldLength": 67.1,
                                "locationInFieldWidth": 43.5,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 16733,
                                "locationInFieldLength": 60,
                                "locationInFieldWidth": 41.8,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 16733,
                                "locationInFieldLength": 68.1,
                                "locationInFieldWidth": 11.6,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 16733,
                                "locationInFieldLength": 77.8,
                                "locationInFieldWidth": 33.5,
                                "gewonnen": 1,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 16733,
                                "locationInFieldLength": 69,
                                "locationInFieldWidth": 34.1,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 16733,
                                "locationInFieldLength": 87.2,
                                "locationInFieldWidth": 12.2,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 16733,
                                "locationInFieldLength": 73,
                                "locationInFieldWidth": 91.1,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            }
                        ]
                    },
                    "locaties_verdedigende_duels": {
                        "16733": [
                            {
                                "personID": 16733,
                                "locationInFieldLength": 91.5,
                                "locationInFieldWidth": 8.9,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 16733,
                                "locationInFieldLength": 15.4,
                                "locationInFieldWidth": 7.9,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            }
                        ]
                    },
                    "locaties_doelpogingen": {
                        "16733": [
                            {
                                "personID": 16733,
                                "locationInFieldLength": 94.3,
                                "locationInFieldWidth": 66.1,
                                "lichaamsdeel": "Voet",
                                "minuut_tot_string": "44",
                                "type": "Geblokkeerd"
                            }
                        ]
                    }
                }
            },
            "uitSpelers_data": {
                "323": {
                    "speler": ["323"],
                    "stat_matrix": {
                        "type": ["keeper"],
                        "speler_mat": [
                            {
                                "323": "98",
                                "_row": "Minuten"
                            },
                            {
                                "323": "6",
                                "_row": "Reddingen"
                            },
                            {
                                "323": "83%",
                                "_row": "Geslaagde reddingen"
                            },
                            {
                                "323": "0",
                                "_row": "Aantal korte passes"
                            },
                            {
                                "323": "4",
                                "_row": "Aantal middellange passes"
                            },
                            {
                                "323": "19",
                                "_row": "Aantal lange passes"
                            },
                            {
                                "323": "48%",
                                "_row": "Geslaagde passes"
                            },
                            {
                                "323": "18",
                                "_row": "Gevangen ballen"
                            },
                            {
                                "323": "6",
                                "_row": "Weggestompte ballen"
                            },
                            {
                                "323": "31%",
                                "_row": "Succesvolle uittrappen"
                            },
                            {
                                "323": "0",
                                "_row": "Gele kaarten"
                            },
                            {
                                "323": "0",
                                "_row": "Rode kaart"
                            }
                        ]
                    },
                    "algemene_stats": [
                        [
                            [98]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [68]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [2]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft1": [
                        [
                            [2]
                        ],
                        [
                            [1]
                        ],
                        [
                            [8]
                        ],
                        [
                            [0]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft2": [
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [12]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "passes_helft1": {
                        "323": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "11072"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 4,
                                "_row": "355"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 0,
                                "_row": "2300"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 0,
                                "_row": "25857"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "3343"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 0,
                                "_row": "14351"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "4993"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "1204"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "4994"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "11476"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "25854"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "12760"
                            },
                            {
                                "Passes gegeven aan": 7,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "passes_helft2": {
                        "323": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "11072"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "355"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "2300"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 0,
                                "_row": "25857"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "3343"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "14351"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "4993"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "1204"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "4994"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 0,
                                "_row": "11476"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "25854"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "12760"
                            },
                            {
                                "Passes gegeven aan": 6,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "pass_soorten_helft1": {
                        "323": [
                            {
                                "kort": 0,
                                "kort_succes": 0,
                                "kort_perc": "0%",
                                "middellang": 3,
                                "middellang_succes": 3,
                                "middellang_perc": "100%",
                                "lang": 7,
                                "lang_succes": 3,
                                "lang_perc": "43%",
                                "TOTAAL": 10,
                                "TOTAAL_succes": 6,
                                "TOTAAL_perc": "60%",
                                "gem_len": "41m."
                            }
                        ]
                    },
                    "pass_soorten_helft2": {
                        "323": [
                            {
                                "kort": 0,
                                "kort_succes": 0,
                                "kort_perc": "0%",
                                "middellang": 1,
                                "middellang_succes": 1,
                                "middellang_perc": "100%",
                                "lang": 12,
                                "lang_succes": 4,
                                "lang_perc": "33%",
                                "TOTAAL": 13,
                                "TOTAAL_succes": 5,
                                "TOTAAL_perc": "38%",
                                "gem_len": "54.9m."
                            }
                        ]
                    },
                    "locaties_verdedigende_duels": {
                        "323": [
                            {
                                "personID": 323,
                                "locationInFieldLength": 15.1,
                                "locationInFieldWidth": 38.4,
                                "gewonnen": 1,
                                "duel_type": "Grond"
                            },
                            {
                                "personID": 323,
                                "locationInFieldLength": 11.8,
                                "locationInFieldWidth": 35.8,
                                "gewonnen": 0,
                                "duel_type": "Grond"
                            }
                        ]
                    },
                    "locaties_reddingen": [
                        {
                            "zend_length": 44.2,
                            "zend_width": 73,
                            "ontvang_length": 9.1,
                            "ontvang_width": 70.3,
                            "actie": "gevangen",
                            "teamID": 1530,
                            "personID": 323
                        },
                        {
                            "zend_length": 7.2,
                            "zend_width": 28,
                            "ontvang_length": 5.4,
                            "ontvang_width": 30.4,
                            "actie": "gestompt",
                            "teamID": 1530,
                            "personID": 323
                        },
                        {
                            "zend_length": 6.6,
                            "zend_width": 22.5,
                            "ontvang_length": 6.5,
                            "ontvang_width": 24.3,
                            "actie": "gestompt",
                            "teamID": 1530,
                            "personID": 323
                        },
                        {
                            "zend_length": 43.5,
                            "zend_width": 87.9,
                            "ontvang_length": 10.4,
                            "ontvang_width": 71.9,
                            "actie": "gevangen",
                            "teamID": 1530,
                            "personID": 323
                        },
                        {
                            "zend_length": 49.8,
                            "zend_width": 29,
                            "ontvang_length": 3.2,
                            "ontvang_width": 26.7,
                            "actie": "gevangen",
                            "teamID": 1530,
                            "personID": 323
                        },
                        {
                            "zend_length": 73.7,
                            "zend_width": 72.8,
                            "ontvang_length": 5.8,
                            "ontvang_width": 17.6,
                            "actie": "gevangen",
                            "teamID": 1530,
                            "personID": 323
                        },
                        {
                            "zend_length": 26,
                            "zend_width": 32.2,
                            "ontvang_length": 4.7,
                            "ontvang_width": 56.4,
                            "actie": "gevangen",
                            "teamID": 1530,
                            "personID": 323
                        },
                        {
                            "zend_length": 3.5,
                            "zend_width": 32.1,
                            "ontvang_length": 3.5,
                            "ontvang_width": 42.4,
                            "actie": "gevangen",
                            "teamID": 1530,
                            "personID": 323
                        },
                        {
                            "zend_length": 7.2,
                            "zend_width": 55.2,
                            "ontvang_length": 2,
                            "ontvang_width": 47.9,
                            "actie": "gestompt",
                            "teamID": 1530,
                            "personID": 323
                        },
                        {
                            "zend_length": 57.5,
                            "zend_width": 53,
                            "ontvang_length": 9.3,
                            "ontvang_width": 48.7,
                            "actie": "gevangen",
                            "teamID": 1530,
                            "personID": 323
                        },
                        {
                            "zend_length": 8.4,
                            "zend_width": 45.2,
                            "ontvang_length": 4.6,
                            "ontvang_width": 46,
                            "actie": "gestompt",
                            "teamID": 1530,
                            "personID": 323
                        },
                        {
                            "zend_length": 67.7,
                            "zend_width": 5.7,
                            "ontvang_length": 12.9,
                            "ontvang_width": 34.9,
                            "actie": "gevangen",
                            "teamID": 1530,
                            "personID": 323
                        },
                        {
                            "zend_length": 9.1,
                            "zend_width": 38.8,
                            "ontvang_length": 2.7,
                            "ontvang_width": 53,
                            "actie": "gestompt",
                            "teamID": 1530,
                            "personID": 323
                        },
                        {
                            "zend_length": 7.2,
                            "zend_width": 78.5,
                            "ontvang_length": 4.9,
                            "ontvang_width": 47.4,
                            "actie": "gevangen",
                            "teamID": 1530,
                            "personID": 323
                        },
                        {
                            "zend_length": 0,
                            "zend_width": 100,
                            "ontvang_length": 4.8,
                            "ontvang_width": 45.1,
                            "actie": "gevangen",
                            "teamID": 1530,
                            "personID": 323
                        },
                        {
                            "zend_length": 7.8,
                            "zend_width": 42.6,
                            "ontvang_length": 7.8,
                            "ontvang_width": 45,
                            "teamID": 1530,
                            "personID": 323
                        },
                        {
                            "zend_length": 58.5,
                            "zend_width": 20.3,
                            "ontvang_length": 10.3,
                            "ontvang_width": 43.7,
                            "actie": "gevangen",
                            "teamID": 1530,
                            "personID": 323
                        },
                        {
                            "zend_length": 0,
                            "zend_width": 100,
                            "ontvang_length": 9.7,
                            "ontvang_width": 41.6,
                            "actie": "gevangen",
                            "teamID": 1530,
                            "personID": 323
                        },
                        {
                            "zend_length": 21.1,
                            "zend_width": 18.5,
                            "ontvang_length": 8,
                            "ontvang_width": 50.5,
                            "actie": "gevangen",
                            "teamID": 1530,
                            "personID": 323
                        },
                        {
                            "zend_length": 28.2,
                            "zend_width": 40.8,
                            "ontvang_length": 4.2,
                            "ontvang_width": 47.7,
                            "actie": "gevangen",
                            "teamID": 1530,
                            "personID": 323
                        },
                        {
                            "zend_length": 30.3,
                            "zend_width": 62,
                            "ontvang_length": 6.5,
                            "ontvang_width": 39.3,
                            "actie": "gestompt",
                            "teamID": 1530,
                            "personID": 323
                        },
                        {
                            "zend_length": 8.1,
                            "zend_width": 11.7,
                            "ontvang_length": 6.6,
                            "ontvang_width": 48.1,
                            "actie": "gevangen",
                            "teamID": 1530,
                            "personID": 323
                        },
                        {
                            "zend_length": 5.5,
                            "zend_width": 17.7,
                            "ontvang_length": 5.8,
                            "ontvang_width": 39.5,
                            "actie": "gevangen",
                            "teamID": 1530,
                            "personID": 323
                        },
                        {
                            "zend_length": 9.3,
                            "zend_width": 53.1,
                            "ontvang_length": 3.7,
                            "ontvang_width": 49.9,
                            "actie": "gevangen",
                            "teamID": 1530,
                            "personID": 323
                        },
                        {
                            "zend_length": 42.2,
                            "zend_width": 18.8,
                            "ontvang_length": 9.2,
                            "ontvang_width": 56.8,
                            "actie": "gevangen",
                            "teamID": 1530,
                            "personID": 323
                        },
                        {
                            "zend_length": 7.8,
                            "zend_width": 41.8,
                            "ontvang_length": 2.6,
                            "ontvang_width": 51.1,
                            "actie": "doelpunt_tegen",
                            "teamID": 1530,
                            "personID": 323
                        }
                    ],
                    "locaties_uittrappen": [
                        {
                            "zend_lengte": 5.7,
                            "zend_breedte": 56.9,
                            "ontvang_lengte": [62.7],
                            "ontvang_breedte": [54.9]
                        },
                        {
                            "zend_lengte": 5.8,
                            "zend_breedte": 42.7,
                            "ontvang_lengte": [60.8],
                            "ontvang_breedte": [97.6]
                        },
                        {
                            "zend_lengte": 8,
                            "zend_breedte": 63,
                            "ontvang_lengte": [60.6],
                            "ontvang_breedte": [82.1],
                            "teamgenoot": 14351
                        },
                        {
                            "zend_lengte": 5.5,
                            "zend_breedte": 59.4,
                            "ontvang_lengte": [59.9],
                            "ontvang_breedte": [62.3]
                        },
                        {
                            "zend_lengte": 5.7,
                            "zend_breedte": 45.3,
                            "ontvang_lengte": [54.8],
                            "ontvang_breedte": [15.4],
                            "teamgenoot": 11476
                        },
                        {
                            "zend_lengte": 6.4,
                            "zend_breedte": 52.9,
                            "ontvang_lengte": [59.6],
                            "ontvang_breedte": [85.1],
                            "teamgenoot": 14351
                        },
                        {
                            "zend_lengte": 4,
                            "zend_breedte": 46.5,
                            "ontvang_lengte": [56.4],
                            "ontvang_breedte": [93.8],
                            "teamgenoot": 14351
                        },
                        {
                            "zend_lengte": 6.5,
                            "zend_breedte": 53.8,
                            "ontvang_lengte": [45.9],
                            "ontvang_breedte": [90.6],
                            "teamgenoot": 14351
                        },
                        {
                            "zend_lengte": 7.7,
                            "zend_breedte": 48.5,
                            "ontvang_lengte": [63.7],
                            "ontvang_breedte": [75.7],
                            "teamgenoot": 14351
                        },
                        {
                            "zend_lengte": 5.8,
                            "zend_breedte": 43.5,
                            "ontvang_lengte": [59.3],
                            "ontvang_breedte": [68],
                            "teamgenoot": 1204
                        },
                        {
                            "zend_lengte": 7.3,
                            "zend_breedte": 58.4,
                            "ontvang_lengte": [88.8],
                            "ontvang_breedte": [46.9]
                        },
                        {
                            "zend_lengte": 5.3,
                            "zend_breedte": 47,
                            "ontvang_lengte": [75.3],
                            "ontvang_breedte": [85.8],
                            "teamgenoot": 14351
                        },
                        {
                            "zend_lengte": 6.4,
                            "zend_breedte": 51.5,
                            "ontvang_lengte": [63.7],
                            "ontvang_breedte": [12.5],
                            "teamgenoot": 12760
                        }
                    ]
                },
                "11072": {
                    "speler": ["11072"],
                    "stat_matrix": {
                        "type": ["veldspeler"],
                        "speler_mat": [
                            {
                                "11072": "98",
                                "_row": "Minuten"
                            },
                            {
                                "11072": "0",
                                "_row": "Doelpunten"
                            },
                            {
                                "11072": "12",
                                "_row": "Aantal passes"
                            },
                            {
                                "11072": "5",
                                "_row": "Geslaagde passes"
                            },
                            {
                                "11072": "0",
                                "_row": "Doelpogingen"
                            },
                            {
                                "11072": "NaN%",
                                "_row": "Doelpogingen op doel"
                            },
                            {
                                "11072": "60%",
                                "_row": "Gewonnen duels"
                            },
                            {
                                "11072": "4",
                                "_row": "Overtredingen"
                            },
                            {
                                "11072": "0",
                                "_row": "Gele kaarten"
                            },
                            {
                                "11072": "0",
                                "_row": "Rode kaart"
                            },
                            {
                                "11072": "0",
                                "_row": "Intercepties"
                            },
                            {
                                "11072": "1",
                                "_row": "Voorzetten"
                            }
                        ]
                    },
                    "algemene_stats": [
                        [
                            [98]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [65]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [14]
                        ],
                        [
                            [9]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [4]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft1": [
                        [
                            [0]
                        ],
                        [
                            [7]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft2": [
                        [
                            [1]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft1": [
                        [
                            [10]
                        ],
                        [
                            [7]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [10]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft2": [
                        [
                            [4]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [2]
                        ],
                        [
                            [11]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "dode_spel_momenten": [
                        [
                            [13]
                        ],
                        [
                            [0]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [2]
                        ]
                    ],
                    "passes_helft1": {
                        "11072": [
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "323"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "355"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "2300"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "25857"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "3343"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 3,
                                "_row": "14351"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "4993"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 2,
                                "_row": "1204"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "4994"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "11476"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "25854"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "12760"
                            },
                            {
                                "Passes gegeven aan": 6,
                                "Passes gekregen van": 9,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "passes_helft2": {
                        "11072": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "323"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "355"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "2300"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "25857"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "3343"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 2,
                                "_row": "14351"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "4993"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "1204"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 2,
                                "_row": "4994"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "11476"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "25854"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "12760"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 5,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "pass_soorten_helft1": {
                        "11072": [
                            {
                                "kort": 2,
                                "kort_succes": 0,
                                "kort_perc": "0%",
                                "middellang": 7,
                                "middellang_succes": 4,
                                "middellang_perc": "57%",
                                "lang": 3,
                                "lang_succes": 1,
                                "lang_perc": "33%",
                                "TOTAAL": 12,
                                "TOTAAL_succes": 5,
                                "TOTAAL_perc": "42%",
                                "gem_len": "21.3m."
                            }
                        ]
                    },
                    "pass_soorten_helft2": {
                        "11072": [
                            {
                                "kort": 0,
                                "kort_succes": 0,
                                "kort_perc": "0",
                                "middellang": 0,
                                "middellang_succes": 0,
                                "middellang_perc": "0",
                                "lang": 0,
                                "lang_succes": 0,
                                "lang_perc": "0",
                                "TOTAAL": 0,
                                "TOTAAL_succes": 0,
                                "TOTAAL_perc": "0",
                                "gem_len": "0"
                            }
                        ]
                    },
                    "locatie_voorzetten": {
                        "11072": [
                            {
                                "zend_personID": 11072,
                                "doelpoging_na_3": false,
                                "zend_lengte": 60.7,
                                "zend_breedte": 92.8
                            }
                        ]
                    },
                    "locaties_aanvallende_duels": {
                        "11072": [
                            {
                                "personID": 11072,
                                "locationInFieldLength": 92.2,
                                "locationInFieldWidth": 89.9,
                                "gewonnen": 0,
                                "duel_type": "Grond"
                            }
                        ]
                    },
                    "locaties_verdedigende_duels": {
                        "11072": [
                            {
                                "personID": 11072,
                                "locationInFieldLength": 23.2,
                                "locationInFieldWidth": 94.3,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 11072,
                                "locationInFieldLength": 31.7,
                                "locationInFieldWidth": 92.3,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 11072,
                                "locationInFieldLength": 17,
                                "locationInFieldWidth": 94.5,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 11072,
                                "locationInFieldLength": 36.1,
                                "locationInFieldWidth": 57.9,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 11072,
                                "locationInFieldLength": 8.3,
                                "locationInFieldWidth": 63.2,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 11072,
                                "locationInFieldLength": 33.4,
                                "locationInFieldWidth": 56.6,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 11072,
                                "locationInFieldLength": 31.6,
                                "locationInFieldWidth": 88,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 11072,
                                "locationInFieldLength": 36.7,
                                "locationInFieldWidth": 91.2,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 11072,
                                "locationInFieldLength": 61.9,
                                "locationInFieldWidth": 91.6,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 11072,
                                "locationInFieldLength": 15.5,
                                "locationInFieldWidth": 60.3,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 11072,
                                "locationInFieldLength": 30.7,
                                "locationInFieldWidth": 65.9,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 11072,
                                "locationInFieldLength": 19.6,
                                "locationInFieldWidth": 62.7,
                                "gewonnen": 1,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 11072,
                                "locationInFieldLength": 13.7,
                                "locationInFieldWidth": 85.6,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 11072,
                                "locationInFieldLength": 29.1,
                                "locationInFieldWidth": 62.7,
                                "gewonnen": 1,
                                "duel_type": "Lucht"
                            }
                        ]
                    },
                    "locaties_doelpogingen": {
                        "11072": []
                    }
                },
                "355": {
                    "speler": ["355"],
                    "stat_matrix": {
                        "type": ["veldspeler"],
                        "speler_mat": [
                            {
                                "355": "98",
                                "_row": "Minuten"
                            },
                            {
                                "355": "0",
                                "_row": "Doelpunten"
                            },
                            {
                                "355": "10",
                                "_row": "Aantal passes"
                            },
                            {
                                "355": "6",
                                "_row": "Geslaagde passes"
                            },
                            {
                                "355": "1",
                                "_row": "Doelpogingen"
                            },
                            {
                                "355": "0%",
                                "_row": "Doelpogingen op doel"
                            },
                            {
                                "355": "40%",
                                "_row": "Gewonnen duels"
                            },
                            {
                                "355": "1",
                                "_row": "Overtredingen"
                            },
                            {
                                "355": "0",
                                "_row": "Gele kaarten"
                            },
                            {
                                "355": "0",
                                "_row": "Rode kaart"
                            },
                            {
                                "355": "0",
                                "_row": "Intercepties"
                            },
                            {
                                "355": "0",
                                "_row": "Voorzetten"
                            }
                        ]
                    },
                    "algemene_stats": [
                        [
                            [98]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [35]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [15]
                        ],
                        [
                            [6]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft1": [
                        [
                            [0]
                        ],
                        [
                            [5]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft2": [
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft1": [
                        [
                            [9]
                        ],
                        [
                            [5]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [8]
                        ],
                        [
                            [4]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft2": [
                        [
                            [6]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [3]
                        ],
                        [
                            [0]
                        ],
                        [
                            [3]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "dode_spel_momenten": [
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "passes_helft1": {
                        "355": [
                            {
                                "Passes gegeven aan": 4,
                                "Passes gekregen van": 0,
                                "_row": "323"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "11072"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "2300"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 2,
                                "_row": "25857"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "3343"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "14351"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "4993"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "1204"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "4994"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "11476"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "25854"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "12760"
                            },
                            {
                                "Passes gegeven aan": 6,
                                "Passes gekregen van": 4,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "passes_helft2": {
                        "355": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "323"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "11072"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "2300"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "25857"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "3343"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "14351"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "4993"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "1204"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "4994"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "11476"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "25854"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "12760"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 2,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "pass_soorten_helft1": {
                        "355": [
                            {
                                "kort": 0,
                                "kort_succes": 0,
                                "kort_perc": "0%",
                                "middellang": 4,
                                "middellang_succes": 3,
                                "middellang_perc": "75%",
                                "lang": 3,
                                "lang_succes": 1,
                                "lang_perc": "33%",
                                "TOTAAL": 7,
                                "TOTAAL_succes": 4,
                                "TOTAAL_perc": "57%",
                                "gem_len": "25.8m."
                            }
                        ]
                    },
                    "pass_soorten_helft2": {
                        "355": [
                            {
                                "kort": 0,
                                "kort_succes": 0,
                                "kort_perc": "0%",
                                "middellang": 3,
                                "middellang_succes": 2,
                                "middellang_perc": "67%",
                                "lang": 0,
                                "lang_succes": 0,
                                "lang_perc": "0%",
                                "TOTAAL": 3,
                                "TOTAAL_succes": 2,
                                "TOTAAL_perc": "67%",
                                "gem_len": "20.2m."
                            }
                        ]
                    },
                    "locatie_voorzetten": {
                        "355": []
                    },
                    "locaties_aanvallende_duels": {
                        "355": []
                    },
                    "locaties_verdedigende_duels": {
                        "355": [
                            {
                                "personID": 355,
                                "locationInFieldLength": 21.9,
                                "locationInFieldWidth": 91.8,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 355,
                                "locationInFieldLength": 19.1,
                                "locationInFieldWidth": 90.6,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 355,
                                "locationInFieldLength": 37.1,
                                "locationInFieldWidth": 89.9,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 355,
                                "locationInFieldLength": 30.9,
                                "locationInFieldWidth": 52.3,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 355,
                                "locationInFieldLength": 39.2,
                                "locationInFieldWidth": 85.4,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 355,
                                "locationInFieldLength": 22.9,
                                "locationInFieldWidth": 92.8,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 355,
                                "locationInFieldLength": 8.2,
                                "locationInFieldWidth": 50.5,
                                "gewonnen": 1,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 355,
                                "locationInFieldLength": 21.5,
                                "locationInFieldWidth": 34.1,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 355,
                                "locationInFieldLength": 27.4,
                                "locationInFieldWidth": 51.1,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 355,
                                "locationInFieldLength": 10.6,
                                "locationInFieldWidth": 29.1,
                                "gewonnen": 0,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 355,
                                "locationInFieldLength": 49.6,
                                "locationInFieldWidth": 62.4,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 355,
                                "locationInFieldLength": 29.9,
                                "locationInFieldWidth": 34.6,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 355,
                                "locationInFieldLength": 14.8,
                                "locationInFieldWidth": 38.5,
                                "gewonnen": 0,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 355,
                                "locationInFieldLength": 8.6,
                                "locationInFieldWidth": 45.8,
                                "gewonnen": 1,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 355,
                                "locationInFieldLength": 25.1,
                                "locationInFieldWidth": 88.5,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            }
                        ]
                    },
                    "locaties_doelpogingen": {
                        "355": [
                            {
                                "personID": 355,
                                "locationInFieldLength": 78.2,
                                "locationInFieldWidth": 57.3,
                                "lichaamsdeel": "Voet",
                                "minuut_tot_string": "31",
                                "type": "Naast of over"
                            }
                        ]
                    }
                },
                "2300": {
                    "speler": ["2300"],
                    "stat_matrix": {
                        "type": ["veldspeler"],
                        "speler_mat": [
                            {
                                "2300": "98",
                                "_row": "Minuten"
                            },
                            {
                                "2300": "0",
                                "_row": "Doelpunten"
                            },
                            {
                                "2300": "13",
                                "_row": "Aantal passes"
                            },
                            {
                                "2300": "8",
                                "_row": "Geslaagde passes"
                            },
                            {
                                "2300": "1",
                                "_row": "Doelpogingen"
                            },
                            {
                                "2300": "0%",
                                "_row": "Doelpogingen op doel"
                            },
                            {
                                "2300": "60%",
                                "_row": "Gewonnen duels"
                            },
                            {
                                "2300": "0",
                                "_row": "Overtredingen"
                            },
                            {
                                "2300": "0",
                                "_row": "Gele kaarten"
                            },
                            {
                                "2300": "0",
                                "_row": "Rode kaart"
                            },
                            {
                                "2300": "0",
                                "_row": "Intercepties"
                            },
                            {
                                "2300": "0",
                                "_row": "Voorzetten"
                            }
                        ]
                    },
                    "algemene_stats": [
                        [
                            [98]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [41]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [9]
                        ],
                        [
                            [6]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft1": [
                        [
                            [0]
                        ],
                        [
                            [3]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft2": [
                        [
                            [1]
                        ],
                        [
                            [3]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft1": [
                        [
                            [4]
                        ],
                        [
                            [3]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [3]
                        ],
                        [
                            [7]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft2": [
                        [
                            [5]
                        ],
                        [
                            [3]
                        ],
                        [
                            [0]
                        ],
                        [
                            [3]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "dode_spel_momenten": [
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [6]
                        ],
                        [
                            [0]
                        ],
                        [
                            [6]
                        ]
                    ],
                    "passes_helft1": {
                        "2300": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 2,
                                "_row": "323"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "11072"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "355"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "25857"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "3343"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "14351"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "4993"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "1204"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "4994"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "11476"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "25854"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "12760"
                            },
                            {
                                "Passes gegeven aan": 5,
                                "Passes gekregen van": 3,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "passes_helft2": {
                        "2300": [
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "323"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "11072"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "355"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "25857"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "3343"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "14351"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "4993"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "1204"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "4994"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 0,
                                "_row": "11476"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "25854"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "12760"
                            },
                            {
                                "Passes gegeven aan": 5,
                                "Passes gekregen van": 5,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "pass_soorten_helft1": {
                        "2300": [
                            {
                                "kort": 1,
                                "kort_succes": 1,
                                "kort_perc": "100%",
                                "middellang": 3,
                                "middellang_succes": 2,
                                "middellang_perc": "67%",
                                "lang": 3,
                                "lang_succes": 1,
                                "lang_perc": "33%",
                                "TOTAAL": 7,
                                "TOTAAL_succes": 4,
                                "TOTAAL_perc": "57%",
                                "gem_len": "25.2m."
                            }
                        ]
                    },
                    "pass_soorten_helft2": {
                        "2300": [
                            {
                                "kort": 0,
                                "kort_succes": 0,
                                "kort_perc": "0%",
                                "middellang": 2,
                                "middellang_succes": 2,
                                "middellang_perc": "100%",
                                "lang": 4,
                                "lang_succes": 2,
                                "lang_perc": "50%",
                                "TOTAAL": 6,
                                "TOTAAL_succes": 4,
                                "TOTAAL_perc": "67%",
                                "gem_len": "36.4m."
                            }
                        ]
                    },
                    "locatie_voorzetten": {
                        "2300": []
                    },
                    "locaties_aanvallende_duels": {
                        "2300": [
                            {
                                "personID": 2300,
                                "locationInFieldLength": 44.7,
                                "locationInFieldWidth": 43.5,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            }
                        ]
                    },
                    "locaties_verdedigende_duels": {
                        "2300": [
                            {
                                "personID": 2300,
                                "locationInFieldLength": 10.3,
                                "locationInFieldWidth": 11.7,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 2300,
                                "locationInFieldLength": 17.6,
                                "locationInFieldWidth": 39.5,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 2300,
                                "locationInFieldLength": 38,
                                "locationInFieldWidth": 54,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 2300,
                                "locationInFieldLength": 19.3,
                                "locationInFieldWidth": 70.5,
                                "gewonnen": 0,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 2300,
                                "locationInFieldLength": 37.8,
                                "locationInFieldWidth": 72.7,
                                "gewonnen": 0,
                                "duel_type": "Grond"
                            },
                            {
                                "personID": 2300,
                                "locationInFieldLength": 11.1,
                                "locationInFieldWidth": 33.9,
                                "gewonnen": 1,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 2300,
                                "locationInFieldLength": 38.6,
                                "locationInFieldWidth": 13.2,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 2300,
                                "locationInFieldLength": 27.6,
                                "locationInFieldWidth": 32.7,
                                "gewonnen": 1,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 2300,
                                "locationInFieldLength": 13.3,
                                "locationInFieldWidth": 46.5,
                                "gewonnen": 1,
                                "duel_type": "Lucht"
                            }
                        ]
                    },
                    "locaties_doelpogingen": {
                        "2300": [
                            {
                                "personID": 2300,
                                "locationInFieldLength": 72.8,
                                "locationInFieldWidth": 42.4,
                                "lichaamsdeel": "Voet",
                                "minuut_tot_string": "67",
                                "type": "Naast of over"
                            }
                        ]
                    }
                },
                "25857": {
                    "speler": ["25857"],
                    "stat_matrix": {
                        "type": ["veldspeler"],
                        "speler_mat": [
                            {
                                "25857": "98",
                                "_row": "Minuten"
                            },
                            {
                                "25857": "0",
                                "_row": "Doelpunten"
                            },
                            {
                                "25857": "23",
                                "_row": "Aantal passes"
                            },
                            {
                                "25857": "11",
                                "_row": "Geslaagde passes"
                            },
                            {
                                "25857": "1",
                                "_row": "Doelpogingen"
                            },
                            {
                                "25857": "100%",
                                "_row": "Doelpogingen op doel"
                            },
                            {
                                "25857": "40%",
                                "_row": "Gewonnen duels"
                            },
                            {
                                "25857": "2",
                                "_row": "Overtredingen"
                            },
                            {
                                "25857": "1",
                                "_row": "Gele kaarten"
                            },
                            {
                                "25857": "0",
                                "_row": "Rode kaart"
                            },
                            {
                                "25857": "0",
                                "_row": "Intercepties"
                            },
                            {
                                "25857": "0",
                                "_row": "Voorzetten"
                            }
                        ]
                    },
                    "algemene_stats": [
                        [
                            [98]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [73]
                        ],
                        [
                            [2]
                        ],
                        [
                            [2]
                        ],
                        [
                            [18]
                        ],
                        [
                            [6]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft1": [
                        [
                            [1]
                        ],
                        [
                            [5]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft2": [
                        [
                            [1]
                        ],
                        [
                            [3]
                        ],
                        [
                            [2]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft1": [
                        [
                            [7]
                        ],
                        [
                            [5]
                        ],
                        [
                            [0]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [5]
                        ],
                        [
                            [4]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft2": [
                        [
                            [11]
                        ],
                        [
                            [3]
                        ],
                        [
                            [0]
                        ],
                        [
                            [4]
                        ],
                        [
                            [0]
                        ],
                        [
                            [7]
                        ],
                        [
                            [5]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "dode_spel_momenten": [
                        [
                            [10]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "passes_helft1": {
                        "25857": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 2,
                                "_row": "323"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "11072"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 0,
                                "_row": "355"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "2300"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "3343"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "14351"
                            },
                            {
                                "Passes gegeven aan": 3,
                                "Passes gekregen van": 5,
                                "_row": "4993"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 3,
                                "_row": "1204"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 0,
                                "_row": "4994"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 0,
                                "_row": "11476"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "25854"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "12760"
                            },
                            {
                                "Passes gegeven aan": 10,
                                "Passes gekregen van": 11,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "passes_helft2": {
                        "25857": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 2,
                                "_row": "323"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "11072"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "355"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "2300"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "3343"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "14351"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "4993"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "1204"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "4994"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 2,
                                "_row": "11476"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "25854"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "12760"
                            },
                            {
                                "Passes gegeven aan": 7,
                                "Passes gekregen van": 9,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "pass_soorten_helft1": {
                        "25857": [
                            {
                                "kort": 2,
                                "kort_succes": 0,
                                "kort_perc": "0%",
                                "middellang": 6,
                                "middellang_succes": 5,
                                "middellang_perc": "83%",
                                "lang": 7,
                                "lang_succes": 2,
                                "lang_perc": "29%",
                                "TOTAAL": 15,
                                "TOTAAL_succes": 7,
                                "TOTAAL_perc": "47%",
                                "gem_len": "24.9m."
                            }
                        ]
                    },
                    "pass_soorten_helft2": {
                        "25857": [
                            {
                                "kort": 3,
                                "kort_succes": 2,
                                "kort_perc": "67%",
                                "middellang": 2,
                                "middellang_succes": 1,
                                "middellang_perc": "50%",
                                "lang": 3,
                                "lang_succes": 1,
                                "lang_perc": "33%",
                                "TOTAAL": 8,
                                "TOTAAL_succes": 4,
                                "TOTAAL_perc": "50%",
                                "gem_len": "21.4m."
                            }
                        ]
                    },
                    "locatie_voorzetten": {
                        "25857": []
                    },
                    "locaties_aanvallende_duels": {
                        "25857": [
                            {
                                "personID": 25857,
                                "locationInFieldLength": 32.7,
                                "locationInFieldWidth": 24.7,
                                "gewonnen": 1,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 25857,
                                "locationInFieldLength": 90,
                                "locationInFieldWidth": 35.6,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            }
                        ]
                    },
                    "locaties_verdedigende_duels": {
                        "25857": [
                            {
                                "personID": 25857,
                                "locationInFieldLength": 29.5,
                                "locationInFieldWidth": 12.3,
                                "gewonnen": 1,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 25857,
                                "locationInFieldLength": 11.1,
                                "locationInFieldWidth": 39.3,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 25857,
                                "locationInFieldLength": 8.3,
                                "locationInFieldWidth": 6.3,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 25857,
                                "locationInFieldLength": 11.5,
                                "locationInFieldWidth": 6.4,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 25857,
                                "locationInFieldLength": 17.7,
                                "locationInFieldWidth": 23.6,
                                "gewonnen": 1,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 25857,
                                "locationInFieldLength": 4.9,
                                "locationInFieldWidth": 12.6,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 25857,
                                "locationInFieldLength": 23.1,
                                "locationInFieldWidth": 40.4,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 25857,
                                "locationInFieldLength": 29.4,
                                "locationInFieldWidth": 14.7,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 25857,
                                "locationInFieldLength": 13.1,
                                "locationInFieldWidth": 9.1,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 25857,
                                "locationInFieldLength": 23,
                                "locationInFieldWidth": 5.7,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 25857,
                                "locationInFieldLength": 32.7,
                                "locationInFieldWidth": 11.8,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 25857,
                                "locationInFieldLength": 23.1,
                                "locationInFieldWidth": 18.5,
                                "gewonnen": 1,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 25857,
                                "locationInFieldLength": 26.9,
                                "locationInFieldWidth": 49.2,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 25857,
                                "locationInFieldLength": 10.8,
                                "locationInFieldWidth": 6.4,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 25857,
                                "locationInFieldLength": 26.4,
                                "locationInFieldWidth": 9.3,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 25857,
                                "locationInFieldLength": 17.3,
                                "locationInFieldWidth": 29.3,
                                "gewonnen": 0,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 25857,
                                "locationInFieldLength": 30,
                                "locationInFieldWidth": 20.3,
                                "gewonnen": 0,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 25857,
                                "locationInFieldLength": 28.8,
                                "locationInFieldWidth": 32.8,
                                "gewonnen": 0,
                                "duel_type": "Lucht"
                            }
                        ]
                    },
                    "locaties_doelpogingen": {
                        "25857": [
                            {
                                "personID": 25857,
                                "locationInFieldLength": 90.2,
                                "locationInFieldWidth": 39.5,
                                "lichaamsdeel": "Voet",
                                "minuut_tot_string": "88",
                                "type": "Redding"
                            }
                        ]
                    }
                },
                "3343": {
                    "speler": ["3343"],
                    "stat_matrix": {
                        "type": ["veldspeler"],
                        "speler_mat": [
                            {
                                "3343": "98",
                                "_row": "Minuten"
                            },
                            {
                                "3343": "0",
                                "_row": "Doelpunten"
                            },
                            {
                                "3343": "19",
                                "_row": "Aantal passes"
                            },
                            {
                                "3343": "9",
                                "_row": "Geslaagde passes"
                            },
                            {
                                "3343": "0",
                                "_row": "Doelpogingen"
                            },
                            {
                                "3343": "NaN%",
                                "_row": "Doelpogingen op doel"
                            },
                            {
                                "3343": "38%",
                                "_row": "Gewonnen duels"
                            },
                            {
                                "3343": "0",
                                "_row": "Overtredingen"
                            },
                            {
                                "3343": "0",
                                "_row": "Gele kaarten"
                            },
                            {
                                "3343": "0",
                                "_row": "Rode kaart"
                            },
                            {
                                "3343": "0",
                                "_row": "Intercepties"
                            },
                            {
                                "3343": "1",
                                "_row": "Voorzetten"
                            }
                        ]
                    },
                    "algemene_stats": [
                        [
                            [98]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [37]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [12]
                        ],
                        [
                            [5]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft1": [
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft2": [
                        [
                            [1]
                        ],
                        [
                            [4]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ]
                    ],
                    "verdedigende_acties_helft1": [
                        [
                            [6]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [5]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft2": [
                        [
                            [6]
                        ],
                        [
                            [4]
                        ],
                        [
                            [0]
                        ],
                        [
                            [3]
                        ],
                        [
                            [0]
                        ],
                        [
                            [3]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "dode_spel_momenten": [
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "passes_helft1": {
                        "3343": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "323"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "11072"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "355"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "2300"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "25857"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "14351"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 2,
                                "_row": "4993"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "1204"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "4994"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "11476"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "25854"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "12760"
                            },
                            {
                                "Passes gegeven aan": 4,
                                "Passes gekregen van": 5,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "passes_helft2": {
                        "3343": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "323"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "11072"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "355"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "2300"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "25857"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "14351"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "4993"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 1,
                                "_row": "1204"
                            },
                            {
                                "Passes gegeven aan": 4,
                                "Passes gekregen van": 2,
                                "_row": "4994"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "11476"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "25854"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "12760"
                            },
                            {
                                "Passes gegeven aan": 9,
                                "Passes gekregen van": 6,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "pass_soorten_helft1": {
                        "3343": [
                            {
                                "kort": 4,
                                "kort_succes": 0,
                                "kort_perc": "0%",
                                "middellang": 3,
                                "middellang_succes": 2,
                                "middellang_perc": "67%",
                                "lang": 1,
                                "lang_succes": 1,
                                "lang_perc": "100%",
                                "TOTAAL": 8,
                                "TOTAAL_succes": 3,
                                "TOTAAL_perc": "38%",
                                "gem_len": "10.2m."
                            }
                        ]
                    },
                    "pass_soorten_helft2": {
                        "3343": [
                            {
                                "kort": 3,
                                "kort_succes": 2,
                                "kort_perc": "67%",
                                "middellang": 7,
                                "middellang_succes": 4,
                                "middellang_perc": "57%",
                                "lang": 1,
                                "lang_succes": 0,
                                "lang_perc": "0%",
                                "TOTAAL": 11,
                                "TOTAAL_succes": 6,
                                "TOTAAL_perc": "55%",
                                "gem_len": "15.8m."
                            }
                        ]
                    },
                    "locatie_voorzetten": {
                        "3343": [
                            {
                                "zend_personID": 3343,
                                "doelpoging_na_3": false,
                                "zend_lengte": 86.5,
                                "zend_breedte": 89.3
                            }
                        ]
                    },
                    "locaties_aanvallende_duels": {
                        "3343": [
                            {
                                "personID": 3343,
                                "locationInFieldLength": 70.6,
                                "locationInFieldWidth": 67.8,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            }
                        ]
                    },
                    "locaties_verdedigende_duels": {
                        "3343": [
                            {
                                "personID": 3343,
                                "locationInFieldLength": 59.5,
                                "locationInFieldWidth": 78.1,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 3343,
                                "locationInFieldLength": 33.7,
                                "locationInFieldWidth": 34.5,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 3343,
                                "locationInFieldLength": 31,
                                "locationInFieldWidth": 72,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 3343,
                                "locationInFieldLength": 24.3,
                                "locationInFieldWidth": 50.5,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 3343,
                                "locationInFieldLength": 67.2,
                                "locationInFieldWidth": 66.4,
                                "gewonnen": 0,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 3343,
                                "locationInFieldLength": 29.6,
                                "locationInFieldWidth": 79.6,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 3343,
                                "locationInFieldLength": 44.1,
                                "locationInFieldWidth": 59.8,
                                "gewonnen": 1,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 3343,
                                "locationInFieldLength": 7.8,
                                "locationInFieldWidth": 63.2,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 3343,
                                "locationInFieldLength": 15.7,
                                "locationInFieldWidth": 48,
                                "gewonnen": 0,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 3343,
                                "locationInFieldLength": 23.7,
                                "locationInFieldWidth": 42.9,
                                "gewonnen": 1,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 3343,
                                "locationInFieldLength": 30.6,
                                "locationInFieldWidth": 33.5,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 3343,
                                "locationInFieldLength": 91.1,
                                "locationInFieldWidth": 95.6,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            }
                        ]
                    },
                    "locaties_doelpogingen": {
                        "3343": []
                    }
                },
                "14351": {
                    "speler": ["14351"],
                    "stat_matrix": {
                        "type": ["veldspeler"],
                        "speler_mat": [
                            {
                                "14351": "91",
                                "_row": "Minuten"
                            },
                            {
                                "14351": "1",
                                "_row": "Doelpunten"
                            },
                            {
                                "14351": "26",
                                "_row": "Aantal passes"
                            },
                            {
                                "14351": "14",
                                "_row": "Geslaagde passes"
                            },
                            {
                                "14351": "1",
                                "_row": "Doelpogingen"
                            },
                            {
                                "14351": "100%",
                                "_row": "Doelpogingen op doel"
                            },
                            {
                                "14351": "46%",
                                "_row": "Gewonnen duels"
                            },
                            {
                                "14351": "2",
                                "_row": "Overtredingen"
                            },
                            {
                                "14351": "0",
                                "_row": "Gele kaarten"
                            },
                            {
                                "14351": "0",
                                "_row": "Rode kaart"
                            },
                            {
                                "14351": "0",
                                "_row": "Intercepties"
                            },
                            {
                                "14351": "0",
                                "_row": "Voorzetten"
                            }
                        ]
                    },
                    "algemene_stats": [
                        [
                            [91]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [76]
                        ],
                        [
                            [20]
                        ],
                        [
                            [9]
                        ],
                        [
                            [6]
                        ],
                        [
                            [3]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [2]
                        ],
                        [
                            [3]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft1": [
                        [
                            [10]
                        ],
                        [
                            [6]
                        ],
                        [
                            [4]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [2]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft2": [
                        [
                            [10]
                        ],
                        [
                            [6]
                        ],
                        [
                            [3]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [2]
                        ],
                        [
                            [2]
                        ],
                        [
                            [1]
                        ]
                    ],
                    "verdedigende_acties_helft1": [
                        [
                            [3]
                        ],
                        [
                            [6]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [3]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft2": [
                        [
                            [3]
                        ],
                        [
                            [6]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [3]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "dode_spel_momenten": [
                        [
                            [5]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "passes_helft1": {
                        "14351": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 2,
                                "_row": "323"
                            },
                            {
                                "Passes gegeven aan": 3,
                                "Passes gekregen van": 2,
                                "_row": "11072"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "355"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "2300"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "25857"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "3343"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "4993"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 3,
                                "_row": "1204"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "4994"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "11476"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "25854"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "12760"
                            },
                            {
                                "Passes gegeven aan": 8,
                                "Passes gekregen van": 8,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "passes_helft2": {
                        "14351": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "323"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 0,
                                "_row": "11072"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "355"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "2300"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "25857"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "3343"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "4993"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 4,
                                "_row": "1204"
                            },
                            {
                                "Passes gegeven aan": 4,
                                "Passes gekregen van": 3,
                                "_row": "4994"
                            },
                            {
                                "Passes gegeven aan": 3,
                                "Passes gekregen van": 6,
                                "_row": "11476"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "25854"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "12760"
                            },
                            {
                                "Passes gegeven aan": 13,
                                "Passes gekregen van": 17,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "pass_soorten_helft1": {
                        "14351": [
                            {
                                "kort": 1,
                                "kort_succes": 1,
                                "kort_perc": "100%",
                                "middellang": 9,
                                "middellang_succes": 7,
                                "middellang_perc": "78%",
                                "lang": 1,
                                "lang_succes": 0,
                                "lang_perc": "0%",
                                "TOTAAL": 11,
                                "TOTAAL_succes": 8,
                                "TOTAAL_perc": "73%",
                                "gem_len": "16.7m."
                            }
                        ]
                    },
                    "pass_soorten_helft2": {
                        "14351": [
                            {
                                "kort": 5,
                                "kort_succes": 1,
                                "kort_perc": "20%",
                                "middellang": 6,
                                "middellang_succes": 4,
                                "middellang_perc": "67%",
                                "lang": 4,
                                "lang_succes": 1,
                                "lang_perc": "25%",
                                "TOTAAL": 15,
                                "TOTAAL_succes": 6,
                                "TOTAAL_perc": "40%",
                                "gem_len": "17.4m."
                            }
                        ]
                    },
                    "locatie_voorzetten": {
                        "14351": []
                    },
                    "locaties_aanvallende_duels": {
                        "14351": [
                            {
                                "personID": 14351,
                                "locationInFieldLength": 49.8,
                                "locationInFieldWidth": 88.7,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 14351,
                                "locationInFieldLength": 69.7,
                                "locationInFieldWidth": 91.8,
                                "gewonnen": 0,
                                "duel_type": "Grond"
                            },
                            {
                                "personID": 14351,
                                "locationInFieldLength": 66.8,
                                "locationInFieldWidth": 91.2,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 14351,
                                "locationInFieldLength": 89.6,
                                "locationInFieldWidth": 93.8,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 14351,
                                "locationInFieldLength": 36.8,
                                "locationInFieldWidth": 94.1,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 14351,
                                "locationInFieldLength": 62.2,
                                "locationInFieldWidth": 75.2,
                                "gewonnen": 1,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 14351,
                                "locationInFieldLength": 88.2,
                                "locationInFieldWidth": 73.4,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 14351,
                                "locationInFieldLength": 59.6,
                                "locationInFieldWidth": 85.1,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 14351,
                                "locationInFieldLength": 56.3,
                                "locationInFieldWidth": 38,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 14351,
                                "locationInFieldLength": 81.8,
                                "locationInFieldWidth": 91.8,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 14351,
                                "locationInFieldLength": 63.3,
                                "locationInFieldWidth": 70.9,
                                "gewonnen": 0,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 14351,
                                "locationInFieldLength": 61.8,
                                "locationInFieldWidth": 61.6,
                                "gewonnen": 0,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 14351,
                                "locationInFieldLength": 60.6,
                                "locationInFieldWidth": 77.3,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 14351,
                                "locationInFieldLength": 45.8,
                                "locationInFieldWidth": 13.2,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 14351,
                                "locationInFieldLength": 79.3,
                                "locationInFieldWidth": 89.4,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 14351,
                                "locationInFieldLength": 95.6,
                                "locationInFieldWidth": 93.6,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 14351,
                                "locationInFieldLength": 90,
                                "locationInFieldWidth": 87,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 14351,
                                "locationInFieldLength": 85.8,
                                "locationInFieldWidth": 90.6,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 14351,
                                "locationInFieldLength": 90.8,
                                "locationInFieldWidth": 84.4,
                                "gewonnen": 1,
                                "duel_type": "Grond"
                            },
                            {
                                "personID": 14351,
                                "locationInFieldLength": 86.7,
                                "locationInFieldWidth": 8.8,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            }
                        ]
                    },
                    "locaties_verdedigende_duels": {
                        "14351": [
                            {
                                "personID": 14351,
                                "locationInFieldLength": 34.2,
                                "locationInFieldWidth": 87.7,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 14351,
                                "locationInFieldLength": 40.3,
                                "locationInFieldWidth": 86.9,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 14351,
                                "locationInFieldLength": 42.1,
                                "locationInFieldWidth": 69,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 14351,
                                "locationInFieldLength": 15.8,
                                "locationInFieldWidth": 91,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 14351,
                                "locationInFieldLength": 19.5,
                                "locationInFieldWidth": 66.6,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 14351,
                                "locationInFieldLength": 90.2,
                                "locationInFieldWidth": 7.4,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            }
                        ]
                    },
                    "locaties_doelpogingen": {
                        "14351": [
                            {
                                "personID": 14351,
                                "locationInFieldLength": 83.7,
                                "locationInFieldWidth": 52,
                                "lichaamsdeel": "Voet",
                                "minuut_tot_string": "60",
                                "type": "Doelpunt"
                            }
                        ]
                    }
                },
                "4993": {
                    "speler": ["4993"],
                    "stat_matrix": {
                        "type": ["veldspeler"],
                        "speler_mat": [
                            {
                                "4993": "98",
                                "_row": "Minuten"
                            },
                            {
                                "4993": "0",
                                "_row": "Doelpunten"
                            },
                            {
                                "4993": "26",
                                "_row": "Aantal passes"
                            },
                            {
                                "4993": "18",
                                "_row": "Geslaagde passes"
                            },
                            {
                                "4993": "0",
                                "_row": "Doelpogingen"
                            },
                            {
                                "4993": "NaN%",
                                "_row": "Doelpogingen op doel"
                            },
                            {
                                "4993": "25%",
                                "_row": "Gewonnen duels"
                            },
                            {
                                "4993": "1",
                                "_row": "Overtredingen"
                            },
                            {
                                "4993": "0",
                                "_row": "Gele kaarten"
                            },
                            {
                                "4993": "0",
                                "_row": "Rode kaart"
                            },
                            {
                                "4993": "0",
                                "_row": "Intercepties"
                            },
                            {
                                "4993": "0",
                                "_row": "Voorzetten"
                            }
                        ]
                    },
                    "algemene_stats": [
                        [
                            [98]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [52]
                        ],
                        [
                            [3]
                        ],
                        [
                            [1]
                        ],
                        [
                            [9]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft1": [
                        [
                            [2]
                        ],
                        [
                            [3]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ]
                    ],
                    "aanvallende_acties_helft2": [
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ]
                    ],
                    "verdedigende_acties_helft1": [
                        [
                            [6]
                        ],
                        [
                            [3]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [4]
                        ],
                        [
                            [3]
                        ],
                        [
                            [1]
                        ]
                    ],
                    "verdedigende_acties_helft2": [
                        [
                            [3]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [2]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ]
                    ],
                    "dode_spel_momenten": [
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [4]
                        ],
                        [
                            [0]
                        ],
                        [
                            [4]
                        ]
                    ],
                    "passes_helft1": {
                        "4993": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "323"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "11072"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "355"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "2300"
                            },
                            {
                                "Passes gegeven aan": 5,
                                "Passes gekregen van": 3,
                                "_row": "25857"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 1,
                                "_row": "3343"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "14351"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 2,
                                "_row": "1204"
                            },
                            {
                                "Passes gegeven aan": 3,
                                "Passes gekregen van": 1,
                                "_row": "4994"
                            },
                            {
                                "Passes gegeven aan": 3,
                                "Passes gekregen van": 2,
                                "_row": "11476"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "25854"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "12760"
                            },
                            {
                                "Passes gegeven aan": 17,
                                "Passes gekregen van": 10,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "passes_helft2": {
                        "4993": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "323"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "11072"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "355"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "2300"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "25857"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "3343"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "14351"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "1204"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "4994"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 1,
                                "_row": "11476"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "25854"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "12760"
                            },
                            {
                                "Passes gegeven aan": 6,
                                "Passes gekregen van": 5,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "pass_soorten_helft1": {
                        "4993": [
                            {
                                "kort": 5,
                                "kort_succes": 4,
                                "kort_perc": "80%",
                                "middellang": 10,
                                "middellang_succes": 6,
                                "middellang_perc": "60%",
                                "lang": 4,
                                "lang_succes": 2,
                                "lang_perc": "50%",
                                "TOTAAL": 19,
                                "TOTAAL_succes": 12,
                                "TOTAAL_perc": "63%",
                                "gem_len": "17.1m."
                            }
                        ]
                    },
                    "pass_soorten_helft2": {
                        "4993": [
                            {
                                "kort": 2,
                                "kort_succes": 2,
                                "kort_perc": "100%",
                                "middellang": 3,
                                "middellang_succes": 3,
                                "middellang_perc": "100%",
                                "lang": 2,
                                "lang_succes": 1,
                                "lang_perc": "50%",
                                "TOTAAL": 7,
                                "TOTAAL_succes": 6,
                                "TOTAAL_perc": "86%",
                                "gem_len": "18.1m."
                            }
                        ]
                    },
                    "locatie_voorzetten": {
                        "4993": []
                    },
                    "locaties_aanvallende_duels": {
                        "4993": [
                            {
                                "personID": 4993,
                                "locationInFieldLength": 59.6,
                                "locationInFieldWidth": 11.1,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 4993,
                                "locationInFieldLength": 33.5,
                                "locationInFieldWidth": 39.5,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 4993,
                                "locationInFieldLength": 87.8,
                                "locationInFieldWidth": 6.7,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            }
                        ]
                    },
                    "locaties_verdedigende_duels": {
                        "4993": [
                            {
                                "personID": 4993,
                                "locationInFieldLength": 33,
                                "locationInFieldWidth": 60.6,
                                "gewonnen": 1,
                                "duel_type": "Grond"
                            },
                            {
                                "personID": 4993,
                                "locationInFieldLength": 32.9,
                                "locationInFieldWidth": 8.9,
                                "gewonnen": 0,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 4993,
                                "locationInFieldLength": 41.4,
                                "locationInFieldWidth": 18.5,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 4993,
                                "locationInFieldLength": 28.7,
                                "locationInFieldWidth": 28.8,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 4993,
                                "locationInFieldLength": 41,
                                "locationInFieldWidth": 33.1,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 4993,
                                "locationInFieldLength": 57.1,
                                "locationInFieldWidth": 49.6,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 4993,
                                "locationInFieldLength": 40.5,
                                "locationInFieldWidth": 30.4,
                                "gewonnen": 0,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 4993,
                                "locationInFieldLength": 12.7,
                                "locationInFieldWidth": 31.4,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 4993,
                                "locationInFieldLength": 7,
                                "locationInFieldWidth": 8.9,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            }
                        ]
                    },
                    "locaties_doelpogingen": {
                        "4993": []
                    }
                },
                "1204": {
                    "speler": ["1204"],
                    "stat_matrix": {
                        "type": ["veldspeler"],
                        "speler_mat": [
                            {
                                "1204": "81",
                                "_row": "Minuten"
                            },
                            {
                                "1204": "0",
                                "_row": "Doelpunten"
                            },
                            {
                                "1204": "28",
                                "_row": "Aantal passes"
                            },
                            {
                                "1204": "17",
                                "_row": "Geslaagde passes"
                            },
                            {
                                "1204": "0",
                                "_row": "Doelpogingen"
                            },
                            {
                                "1204": "NaN%",
                                "_row": "Doelpogingen op doel"
                            },
                            {
                                "1204": "36%",
                                "_row": "Gewonnen duels"
                            },
                            {
                                "1204": "4",
                                "_row": "Overtredingen"
                            },
                            {
                                "1204": "1",
                                "_row": "Gele kaarten"
                            },
                            {
                                "1204": "0",
                                "_row": "Rode kaart"
                            },
                            {
                                "1204": "0",
                                "_row": "Intercepties"
                            },
                            {
                                "1204": "1",
                                "_row": "Voorzetten"
                            }
                        ]
                    },
                    "algemene_stats": [
                        [
                            [81]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [54]
                        ],
                        [
                            [7]
                        ],
                        [
                            [3]
                        ],
                        [
                            [7]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [4]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft1": [
                        [
                            [4]
                        ],
                        [
                            [4]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft2": [
                        [
                            [3]
                        ],
                        [
                            [1]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft1": [
                        [
                            [5]
                        ],
                        [
                            [4]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [4]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft2": [
                        [
                            [2]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "dode_spel_momenten": [
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "passes_helft1": {
                        "1204": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "323"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 2,
                                "_row": "11072"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "355"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "2300"
                            },
                            {
                                "Passes gegeven aan": 3,
                                "Passes gekregen van": 0,
                                "_row": "25857"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "3343"
                            },
                            {
                                "Passes gegeven aan": 3,
                                "Passes gekregen van": 2,
                                "_row": "14351"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 2,
                                "_row": "4993"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "4994"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "11476"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "25854"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "12760"
                            },
                            {
                                "Passes gegeven aan": 12,
                                "Passes gekregen van": 10,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "passes_helft2": {
                        "1204": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "323"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "11072"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "355"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "2300"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "25857"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 2,
                                "_row": "3343"
                            },
                            {
                                "Passes gegeven aan": 4,
                                "Passes gekregen van": 1,
                                "_row": "14351"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "4993"
                            },
                            {
                                "Passes gegeven aan": 3,
                                "Passes gekregen van": 5,
                                "_row": "4994"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 0,
                                "_row": "11476"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "25854"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "12760"
                            },
                            {
                                "Passes gegeven aan": 12,
                                "Passes gekregen van": 9,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "pass_soorten_helft1": {
                        "1204": [
                            {
                                "kort": 5,
                                "kort_succes": 3,
                                "kort_perc": "60%",
                                "middellang": 6,
                                "middellang_succes": 3,
                                "middellang_perc": "50%",
                                "lang": 4,
                                "lang_succes": 3,
                                "lang_perc": "75%",
                                "TOTAAL": 15,
                                "TOTAAL_succes": 9,
                                "TOTAAL_perc": "60%",
                                "gem_len": "17.3m."
                            }
                        ]
                    },
                    "pass_soorten_helft2": {
                        "1204": [
                            {
                                "kort": 3,
                                "kort_succes": 1,
                                "kort_perc": "33%",
                                "middellang": 6,
                                "middellang_succes": 5,
                                "middellang_perc": "83%",
                                "lang": 4,
                                "lang_succes": 2,
                                "lang_perc": "50%",
                                "TOTAAL": 13,
                                "TOTAAL_succes": 8,
                                "TOTAAL_perc": "62%",
                                "gem_len": "17.2m."
                            }
                        ]
                    },
                    "locatie_voorzetten": {
                        "1204": [
                            {
                                "zend_personID": 1204,
                                "doelpoging_na_3": false,
                                "zend_lengte": 86.3,
                                "zend_breedte": 80.4
                            }
                        ]
                    },
                    "locaties_aanvallende_duels": {
                        "1204": [
                            {
                                "personID": 1204,
                                "locationInFieldLength": 19.5,
                                "locationInFieldWidth": 92.3,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 1204,
                                "locationInFieldLength": 39.8,
                                "locationInFieldWidth": 26.6,
                                "gewonnen": 0,
                                "duel_type": "Grond"
                            },
                            {
                                "personID": 1204,
                                "locationInFieldLength": 8.2,
                                "locationInFieldWidth": 93.6,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 1204,
                                "locationInFieldLength": 35.9,
                                "locationInFieldWidth": 51.8,
                                "gewonnen": 1,
                                "duel_type": "Grond"
                            },
                            {
                                "personID": 1204,
                                "locationInFieldLength": 66.7,
                                "locationInFieldWidth": 54.3,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 1204,
                                "locationInFieldLength": 58.6,
                                "locationInFieldWidth": 68.1,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 1204,
                                "locationInFieldLength": 24.4,
                                "locationInFieldWidth": 15.6,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            }
                        ]
                    },
                    "locaties_verdedigende_duels": {
                        "1204": [
                            {
                                "personID": 1204,
                                "locationInFieldLength": 32.7,
                                "locationInFieldWidth": 78.8,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 1204,
                                "locationInFieldLength": 11.7,
                                "locationInFieldWidth": 68.1,
                                "gewonnen": 0,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 1204,
                                "locationInFieldLength": 32.7,
                                "locationInFieldWidth": 52,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 1204,
                                "locationInFieldLength": 40.4,
                                "locationInFieldWidth": 59.5,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 1204,
                                "locationInFieldLength": 45.1,
                                "locationInFieldWidth": 44.3,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 1204,
                                "locationInFieldLength": 28.1,
                                "locationInFieldWidth": 83.3,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 1204,
                                "locationInFieldLength": 39.7,
                                "locationInFieldWidth": 12.1,
                                "gewonnen": 0,
                                "duel_type": "Grond"
                            }
                        ]
                    },
                    "locaties_doelpogingen": {
                        "1204": []
                    }
                },
                "4994": {
                    "speler": ["4994"],
                    "stat_matrix": {
                        "type": ["veldspeler"],
                        "speler_mat": [
                            {
                                "4994": "98",
                                "_row": "Minuten"
                            },
                            {
                                "4994": "0",
                                "_row": "Doelpunten"
                            },
                            {
                                "4994": "23",
                                "_row": "Aantal passes"
                            },
                            {
                                "4994": "17",
                                "_row": "Geslaagde passes"
                            },
                            {
                                "4994": "0",
                                "_row": "Doelpogingen"
                            },
                            {
                                "4994": "NaN%",
                                "_row": "Doelpogingen op doel"
                            },
                            {
                                "4994": "62%",
                                "_row": "Gewonnen duels"
                            },
                            {
                                "4994": "0",
                                "_row": "Overtredingen"
                            },
                            {
                                "4994": "0",
                                "_row": "Gele kaarten"
                            },
                            {
                                "4994": "0",
                                "_row": "Rode kaart"
                            },
                            {
                                "4994": "0",
                                "_row": "Intercepties"
                            },
                            {
                                "4994": "0",
                                "_row": "Voorzetten"
                            }
                        ]
                    },
                    "algemene_stats": [
                        [
                            [98]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [56]
                        ],
                        [
                            [21]
                        ],
                        [
                            [13]
                        ],
                        [
                            [3]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [4]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft1": [
                        [
                            [9]
                        ],
                        [
                            [5]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft2": [
                        [
                            [12]
                        ],
                        [
                            [10]
                        ],
                        [
                            [4]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft1": [
                        [
                            [0]
                        ],
                        [
                            [5]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft2": [
                        [
                            [3]
                        ],
                        [
                            [10]
                        ],
                        [
                            [0]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "dode_spel_momenten": [
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ]
                    ],
                    "passes_helft1": {
                        "4994": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "323"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "11072"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "355"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "2300"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 2,
                                "_row": "25857"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "3343"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "14351"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 3,
                                "_row": "4993"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "1204"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 2,
                                "_row": "11476"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "25854"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "12760"
                            },
                            {
                                "Passes gegeven aan": 3,
                                "Passes gekregen van": 11,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "passes_helft2": {
                        "4994": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "323"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 0,
                                "_row": "11072"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "355"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "2300"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "25857"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 4,
                                "_row": "3343"
                            },
                            {
                                "Passes gegeven aan": 3,
                                "Passes gekregen van": 4,
                                "_row": "14351"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "4993"
                            },
                            {
                                "Passes gegeven aan": 5,
                                "Passes gekregen van": 3,
                                "_row": "1204"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 3,
                                "_row": "11476"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "25854"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "12760"
                            },
                            {
                                "Passes gegeven aan": 16,
                                "Passes gekregen van": 15,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "pass_soorten_helft1": {
                        "4994": [
                            {
                                "kort": 1,
                                "kort_succes": 0,
                                "kort_perc": "0%",
                                "middellang": 5,
                                "middellang_succes": 2,
                                "middellang_perc": "40%",
                                "lang": 0,
                                "lang_succes": 0,
                                "lang_perc": "0%",
                                "TOTAAL": 6,
                                "TOTAAL_succes": 2,
                                "TOTAAL_perc": "33%",
                                "gem_len": "11.4m."
                            }
                        ]
                    },
                    "pass_soorten_helft2": {
                        "4994": [
                            {
                                "kort": 8,
                                "kort_succes": 7,
                                "kort_perc": "88%",
                                "middellang": 7,
                                "middellang_succes": 6,
                                "middellang_perc": "86%",
                                "lang": 2,
                                "lang_succes": 2,
                                "lang_perc": "100%",
                                "TOTAAL": 17,
                                "TOTAAL_succes": 15,
                                "TOTAAL_perc": "88%",
                                "gem_len": "12.1m."
                            }
                        ]
                    },
                    "locatie_voorzetten": {
                        "4994": []
                    },
                    "locaties_aanvallende_duels": {
                        "4994": [
                            {
                                "personID": 4994,
                                "locationInFieldLength": 32.7,
                                "locationInFieldWidth": 50.5,
                                "gewonnen": 0,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 4994,
                                "locationInFieldLength": 51.2,
                                "locationInFieldWidth": 26.3,
                                "gewonnen": 0,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 4994,
                                "locationInFieldLength": 42.2,
                                "locationInFieldWidth": 35,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 4994,
                                "locationInFieldLength": 88.5,
                                "locationInFieldWidth": 86.1,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 4994,
                                "locationInFieldLength": 89.2,
                                "locationInFieldWidth": 81,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 4994,
                                "locationInFieldLength": 40.7,
                                "locationInFieldWidth": 56.3,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 4994,
                                "locationInFieldLength": 37.7,
                                "locationInFieldWidth": 31.9,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 4994,
                                "locationInFieldLength": 41.8,
                                "locationInFieldWidth": 55.3,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 4994,
                                "locationInFieldLength": 56,
                                "locationInFieldWidth": 25.2,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 4994,
                                "locationInFieldLength": 63.2,
                                "locationInFieldWidth": 21,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 4994,
                                "locationInFieldLength": 55.7,
                                "locationInFieldWidth": 26.2,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 4994,
                                "locationInFieldLength": 40.3,
                                "locationInFieldWidth": 87.4,
                                "gewonnen": 0,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 4994,
                                "locationInFieldLength": 41.6,
                                "locationInFieldWidth": 15,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 4994,
                                "locationInFieldLength": 69.9,
                                "locationInFieldWidth": 54.3,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 4994,
                                "locationInFieldLength": 89.2,
                                "locationInFieldWidth": 84,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 4994,
                                "locationInFieldLength": 90.1,
                                "locationInFieldWidth": 89.4,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 4994,
                                "locationInFieldLength": 92.2,
                                "locationInFieldWidth": 93.5,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 4994,
                                "locationInFieldLength": 57.9,
                                "locationInFieldWidth": 57.1,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 4994,
                                "locationInFieldLength": 86.5,
                                "locationInFieldWidth": 91.2,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 4994,
                                "locationInFieldLength": 64.1,
                                "locationInFieldWidth": 65.5,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 4994,
                                "locationInFieldLength": 68.5,
                                "locationInFieldWidth": 58.9,
                                "gewonnen": 0,
                                "duel_type": "Grond"
                            }
                        ]
                    },
                    "locaties_verdedigende_duels": {
                        "4994": [
                            {
                                "personID": 4994,
                                "locationInFieldLength": 7.8,
                                "locationInFieldWidth": 43.5,
                                "gewonnen": 0,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 4994,
                                "locationInFieldLength": 11.7,
                                "locationInFieldWidth": 37,
                                "gewonnen": 1,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 4994,
                                "locationInFieldLength": 55.4,
                                "locationInFieldWidth": 37.4,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            }
                        ]
                    },
                    "locaties_doelpogingen": {
                        "4994": []
                    }
                },
                "11476": {
                    "speler": ["11476"],
                    "stat_matrix": {
                        "type": ["veldspeler"],
                        "speler_mat": [
                            {
                                "11476": "98",
                                "_row": "Minuten"
                            },
                            {
                                "11476": "0",
                                "_row": "Doelpunten"
                            },
                            {
                                "11476": "28",
                                "_row": "Aantal passes"
                            },
                            {
                                "11476": "18",
                                "_row": "Geslaagde passes"
                            },
                            {
                                "11476": "4",
                                "_row": "Doelpogingen"
                            },
                            {
                                "11476": "50%",
                                "_row": "Doelpogingen op doel"
                            },
                            {
                                "11476": "58%",
                                "_row": "Gewonnen duels"
                            },
                            {
                                "11476": "2",
                                "_row": "Overtredingen"
                            },
                            {
                                "11476": "0",
                                "_row": "Gele kaarten"
                            },
                            {
                                "11476": "0",
                                "_row": "Rode kaart"
                            },
                            {
                                "11476": "0",
                                "_row": "Intercepties"
                            },
                            {
                                "11476": "0",
                                "_row": "Voorzetten"
                            }
                        ]
                    },
                    "algemene_stats": [
                        [
                            [98]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [64]
                        ],
                        [
                            [17]
                        ],
                        [
                            [10]
                        ],
                        [
                            [2]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [2]
                        ],
                        [
                            [2]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft1": [
                        [
                            [9]
                        ],
                        [
                            [6]
                        ],
                        [
                            [3]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft2": [
                        [
                            [8]
                        ],
                        [
                            [5]
                        ],
                        [
                            [2]
                        ],
                        [
                            [2]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [2]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft1": [
                        [
                            [2]
                        ],
                        [
                            [6]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft2": [
                        [
                            [0]
                        ],
                        [
                            [5]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "dode_spel_momenten": [
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ]
                    ],
                    "passes_helft1": {
                        "11476": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "323"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "11072"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "355"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "2300"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 2,
                                "_row": "25857"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "3343"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "14351"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 3,
                                "_row": "4993"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "1204"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 0,
                                "_row": "4994"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "25854"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "12760"
                            },
                            {
                                "Passes gegeven aan": 7,
                                "Passes gekregen van": 9,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "passes_helft2": {
                        "11476": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 2,
                                "_row": "323"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "11072"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "355"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 2,
                                "_row": "2300"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 2,
                                "_row": "25857"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "3343"
                            },
                            {
                                "Passes gegeven aan": 6,
                                "Passes gekregen van": 3,
                                "_row": "14351"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 2,
                                "_row": "4993"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 2,
                                "_row": "1204"
                            },
                            {
                                "Passes gegeven aan": 3,
                                "Passes gekregen van": 1,
                                "_row": "4994"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "25854"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 0,
                                "_row": "12760"
                            },
                            {
                                "Passes gegeven aan": 15,
                                "Passes gekregen van": 15,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "pass_soorten_helft1": {
                        "11476": [
                            {
                                "kort": 3,
                                "kort_succes": 1,
                                "kort_perc": "33%",
                                "middellang": 6,
                                "middellang_succes": 4,
                                "middellang_perc": "67%",
                                "lang": 1,
                                "lang_succes": 1,
                                "lang_perc": "100%",
                                "TOTAAL": 10,
                                "TOTAAL_succes": 6,
                                "TOTAAL_perc": "60%",
                                "gem_len": "19.2m."
                            }
                        ]
                    },
                    "pass_soorten_helft2": {
                        "11476": [
                            {
                                "kort": 5,
                                "kort_succes": 2,
                                "kort_perc": "40%",
                                "middellang": 10,
                                "middellang_succes": 7,
                                "middellang_perc": "70%",
                                "lang": 3,
                                "lang_succes": 3,
                                "lang_perc": "100%",
                                "TOTAAL": 18,
                                "TOTAAL_succes": 12,
                                "TOTAAL_perc": "67%",
                                "gem_len": "15.5m."
                            }
                        ]
                    },
                    "locatie_voorzetten": {
                        "11476": []
                    },
                    "locaties_aanvallende_duels": {
                        "11476": [
                            {
                                "personID": 11476,
                                "locationInFieldLength": 31.5,
                                "locationInFieldWidth": 18.4,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 11476,
                                "locationInFieldLength": 64.3,
                                "locationInFieldWidth": 11.5,
                                "gewonnen": 1,
                                "duel_type": "Grond"
                            },
                            {
                                "personID": 11476,
                                "locationInFieldLength": 85,
                                "locationInFieldWidth": 38.5,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 11476,
                                "locationInFieldLength": 65.5,
                                "locationInFieldWidth": 17.9,
                                "gewonnen": 0,
                                "duel_type": "Lucht"
                            },
                            {
                                "personID": 11476,
                                "locationInFieldLength": 35.8,
                                "locationInFieldWidth": 30.6,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 11476,
                                "locationInFieldLength": 45.6,
                                "locationInFieldWidth": 12.3,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 11476,
                                "locationInFieldLength": 48.7,
                                "locationInFieldWidth": 12.7,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 11476,
                                "locationInFieldLength": 75.1,
                                "locationInFieldWidth": 7.4,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 11476,
                                "locationInFieldLength": 60.3,
                                "locationInFieldWidth": 44.1,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 11476,
                                "locationInFieldLength": 79.4,
                                "locationInFieldWidth": 27.8,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 11476,
                                "locationInFieldLength": 43.7,
                                "locationInFieldWidth": 14.9,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 11476,
                                "locationInFieldLength": 82.3,
                                "locationInFieldWidth": 37.3,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 11476,
                                "locationInFieldLength": 85.2,
                                "locationInFieldWidth": 35.4,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 11476,
                                "locationInFieldLength": 34.2,
                                "locationInFieldWidth": 8.1,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 11476,
                                "locationInFieldLength": 88,
                                "locationInFieldWidth": 9.2,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 11476,
                                "locationInFieldLength": 88.9,
                                "locationInFieldWidth": 11.6,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 11476,
                                "locationInFieldLength": 95.5,
                                "locationInFieldWidth": 88.5,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            }
                        ]
                    },
                    "locaties_verdedigende_duels": {
                        "11476": [
                            {
                                "personID": 11476,
                                "locationInFieldLength": 55.5,
                                "locationInFieldWidth": 43.7,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            },
                            {
                                "personID": 11476,
                                "locationInFieldLength": 5.9,
                                "locationInFieldWidth": 9.1,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            }
                        ]
                    },
                    "locaties_doelpogingen": {
                        "11476": [
                            {
                                "personID": 11476,
                                "locationInFieldLength": 93.1,
                                "locationInFieldWidth": 35.8,
                                "lichaamsdeel": "Voet",
                                "minuut_tot_string": "74",
                                "type": "Redding"
                            },
                            {
                                "personID": 11476,
                                "locationInFieldLength": 87.8,
                                "locationInFieldWidth": 22.7,
                                "lichaamsdeel": "Voet",
                                "minuut_tot_string": "86",
                                "type": "Redding"
                            },
                            {
                                "personID": 11476,
                                "locationInFieldLength": 90.7,
                                "locationInFieldWidth": 32.7,
                                "lichaamsdeel": "Voet",
                                "minuut_tot_string": " 8",
                                "type": "Op het ijzer"
                            },
                            {
                                "personID": 11476,
                                "locationInFieldLength": 78.1,
                                "locationInFieldWidth": 35.8,
                                "lichaamsdeel": "Voet",
                                "minuut_tot_string": "17",
                                "type": "Naast of over"
                            }
                        ]
                    }
                },
                "25854": {
                    "speler": ["25854"],
                    "stat_matrix": {
                        "type": ["veldspeler"],
                        "speler_mat": [
                            {
                                "25854": "7",
                                "_row": "Minuten"
                            },
                            {
                                "25854": "0",
                                "_row": "Doelpunten"
                            },
                            {
                                "25854": "0",
                                "_row": "Aantal passes"
                            },
                            {
                                "25854": "0",
                                "_row": "Geslaagde passes"
                            },
                            {
                                "25854": "0",
                                "_row": "Doelpogingen"
                            },
                            {
                                "25854": "NaN%",
                                "_row": "Doelpogingen op doel"
                            },
                            {
                                "25854": "100%",
                                "_row": "Gewonnen duels"
                            },
                            {
                                "25854": "0",
                                "_row": "Overtredingen"
                            },
                            {
                                "25854": "0",
                                "_row": "Gele kaarten"
                            },
                            {
                                "25854": "0",
                                "_row": "Rode kaart"
                            },
                            {
                                "25854": "0",
                                "_row": "Intercepties"
                            },
                            {
                                "25854": "0",
                                "_row": "Voorzetten"
                            }
                        ]
                    },
                    "algemene_stats": [
                        [
                            [7]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [4]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft1": [
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft2": [
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft1": [
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft2": [
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "dode_spel_momenten": [
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "passes_helft1": {
                        "25854": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "323"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "11072"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "355"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "2300"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "25857"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "3343"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "14351"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "4993"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "1204"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "4994"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "11476"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "12760"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "passes_helft2": {
                        "25854": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "323"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "11072"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "355"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "2300"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "25857"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "3343"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "14351"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "4993"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "1204"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "4994"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "11476"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "12760"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 2,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "pass_soorten_helft1": {
                        "25854": [
                            {
                                "kort": 0,
                                "kort_succes": 0,
                                "kort_perc": "0",
                                "middellang": 0,
                                "middellang_succes": 0,
                                "middellang_perc": "0",
                                "lang": 0,
                                "lang_succes": 0,
                                "lang_perc": "0",
                                "TOTAAL": 0,
                                "TOTAAL_succes": 0,
                                "TOTAAL_perc": "0",
                                "gem_len": "0"
                            }
                        ]
                    },
                    "pass_soorten_helft2": {
                        "25854": [
                            {
                                "kort": 0,
                                "kort_succes": 0,
                                "kort_perc": "0",
                                "middellang": 0,
                                "middellang_succes": 0,
                                "middellang_perc": "0",
                                "lang": 0,
                                "lang_succes": 0,
                                "lang_perc": "0",
                                "TOTAAL": 0,
                                "TOTAAL_succes": 0,
                                "TOTAAL_perc": "0",
                                "gem_len": "0"
                            }
                        ]
                    },
                    "locatie_voorzetten": {
                        "25854": []
                    },
                    "locaties_aanvallende_duels": {
                        "25854": [
                            {
                                "personID": 25854,
                                "locationInFieldLength": 90.3,
                                "locationInFieldWidth": 89.5,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            }
                        ]
                    },
                    "locaties_verdedigende_duels": {
                        "25854": []
                    },
                    "locaties_doelpogingen": {
                        "25854": []
                    }
                },
                "12760": {
                    "speler": ["12760"],
                    "stat_matrix": {
                        "type": ["veldspeler"],
                        "speler_mat": [
                            {
                                "12760": "18",
                                "_row": "Minuten"
                            },
                            {
                                "12760": "0",
                                "_row": "Doelpunten"
                            },
                            {
                                "12760": "5",
                                "_row": "Aantal passes"
                            },
                            {
                                "12760": "2",
                                "_row": "Geslaagde passes"
                            },
                            {
                                "12760": "2",
                                "_row": "Doelpogingen"
                            },
                            {
                                "12760": "0%",
                                "_row": "Doelpogingen op doel"
                            },
                            {
                                "12760": "50%",
                                "_row": "Gewonnen duels"
                            },
                            {
                                "12760": "0",
                                "_row": "Overtredingen"
                            },
                            {
                                "12760": "0",
                                "_row": "Gele kaarten"
                            },
                            {
                                "12760": "0",
                                "_row": "Rode kaart"
                            },
                            {
                                "12760": "0",
                                "_row": "Intercepties"
                            },
                            {
                                "12760": "0",
                                "_row": "Voorzetten"
                            }
                        ]
                    },
                    "algemene_stats": [
                        [
                            [18]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [14]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft1": [
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "aanvallende_acties_helft2": [
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [2]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [2]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft1": [
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "verdedigende_acties_helft2": [
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [1]
                        ],
                        [
                            [1]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "dode_spel_momenten": [
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ],
                        [
                            [0]
                        ]
                    ],
                    "passes_helft1": {
                        "12760": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "323"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "11072"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "355"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "2300"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "25857"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "3343"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "14351"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "4993"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "1204"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "4994"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "11476"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "25854"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "passes_helft2": {
                        "12760": [
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "323"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "11072"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "355"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "2300"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "25857"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "3343"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "14351"
                            },
                            {
                                "Passes gegeven aan": 1,
                                "Passes gekregen van": 1,
                                "_row": "4993"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "1204"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "4994"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 1,
                                "_row": "11476"
                            },
                            {
                                "Passes gegeven aan": 0,
                                "Passes gekregen van": 0,
                                "_row": "25854"
                            },
                            {
                                "Passes gegeven aan": 2,
                                "Passes gekregen van": 3,
                                "_row": "TOTAAL"
                            }
                        ]
                    },
                    "pass_soorten_helft1": {
                        "12760": [
                            {
                                "kort": 0,
                                "kort_succes": 0,
                                "kort_perc": "0",
                                "middellang": 0,
                                "middellang_succes": 0,
                                "middellang_perc": "0",
                                "lang": 0,
                                "lang_succes": 0,
                                "lang_perc": "0",
                                "TOTAAL": 0,
                                "TOTAAL_succes": 0,
                                "TOTAAL_perc": "0",
                                "gem_len": "0"
                            }
                        ]
                    },
                    "pass_soorten_helft2": {
                        "12760": [
                            {
                                "kort": 1,
                                "kort_succes": 0,
                                "kort_perc": "0%",
                                "middellang": 4,
                                "middellang_succes": 2,
                                "middellang_perc": "50%",
                                "lang": 0,
                                "lang_succes": 0,
                                "lang_perc": "0%",
                                "TOTAAL": 5,
                                "TOTAAL_succes": 2,
                                "TOTAAL_perc": "40%",
                                "gem_len": "12.3m."
                            }
                        ]
                    },
                    "locatie_voorzetten": {
                        "12760": []
                    },
                    "locaties_aanvallende_duels": {
                        "12760": [
                            {
                                "personID": 12760,
                                "locationInFieldLength": 45.7,
                                "locationInFieldWidth": 6.5,
                                "gewonnen": 1,
                                "duel_type": "Staand"
                            }
                        ]
                    },
                    "locaties_verdedigende_duels": {
                        "12760": [
                            {
                                "personID": 12760,
                                "locationInFieldLength": 13.8,
                                "locationInFieldWidth": 4.5,
                                "gewonnen": 0,
                                "duel_type": "Staand"
                            }
                        ]
                    },
                    "locaties_doelpogingen": {
                        "12760": [
                            {
                                "personID": 12760,
                                "locationInFieldLength": 89.3,
                                "locationInFieldWidth": 20.7,
                                "lichaamsdeel": "Voet",
                                "minuut_tot_string": "83",
                                "type": "Geblokkeerd"
                            },
                            {
                                "personID": 12760,
                                "locationInFieldLength": 86.3,
                                "locationInFieldWidth": 39.2,
                                "lichaamsdeel": "Voet",
                                "minuut_tot_string": "88",
                                "type": "Geblokkeerd"
                            }
                        ]
                    }
                }
            }
        };

        if (data) {
            var items = {};
            items.matchID = data.wedstrijd_data.matchID[0];
            items.thuisTeamID = data.wedstrijd_data.thuisTeamID[0];
            items.uitTeamID = data.wedstrijd_data.uitTeamID[0];
            items.seizoen = "2014-2015";
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
                temp.V2 = value['NA'];
                temp.V3 = String(value[items.uitTeamID]);
                items.overtredingen.push(temp);
            });

            items.spelhervattingen = [];
            angular.forEach(data.wedstrijd_data.spelhervattingen, function (value, key) {
                var temp = {};
                temp.V1 = value[items.thuisTeamID];
                temp.V2 = value['NA'];
                temp.V3 = value[items.uitTeamID];
                items.spelhervattingen.push(temp);
            });

            items.passes = [];
            angular.forEach(data.wedstrijd_data.passes, function (value, key) {
                var temp = {};
                temp.V1 = value[items.thuisTeamID];
                temp.V2 = value['NA'];
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
            for (var k1 = 2; k1 < items.overzicht_lineup.length;) {
                if (data.wedstrijd_data.overzicht_lineup[k1].V1 !== ' ') {
                    if (data.wedstrijd_data.overzicht_lineup[k1 - 1].V2 !== 'BANK') {
                        var value = {};
                        value.spelerNaam = angular.copy(data.wedstrijd_data.overzicht_lineup[k1].V2).split(" (")[0];
                        value.rugnummer = angular.copy(data.wedstrijd_data.overzicht_lineup[k1].V1);
                        if ($filter('filter')(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]) {
                            value.personID = angular.copy($filter('filter')(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]).personID;
                        }
                        ;
                        items.spelersthuisteam.push(value);
                        k1++;
                    } else {
                        break;
                    }
                }
                else if (data.wedstrijd_data.overzicht_lineup[k1 + 1].V1 !== ' ') {
                    if (data.wedstrijd_data.overzicht_lineup[k1].V2 !== 'BANK') {
                        var value = {};
                        value.spelerNaam = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 1].V2).split(" (")[0];
                        value.rugnummer = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 1].V1);
                        if ($filter('filter')(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]) {
                            value.personID = angular.copy($filter('filter')(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]).personID;
                        }
                        ;
                        items.spelersthuisteam.push(value);
                        k1 += 2;
                    } else {
                        break;
                    }
                }
                else if (data.wedstrijd_data.overzicht_lineup[k1 + 2].V1 !== ' ') {
                    if (data.wedstrijd_data.overzicht_lineup[k1 + 1].V2 !== 'BANK') {
                        var value = {};
                        value.spelerNaam = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 2].V2).split(" (")[0];
                        value.rugnummer = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 2].V1);
                        if ($filter('filter')(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]) {
                            value.personID = angular.copy($filter('filter')(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]).personID;
                        }
                        ;
                        items.spelersthuisteam.push(value);
                        k1 += 3;
                    } else {
                        break;
                    }
                }
                else if (data.wedstrijd_data.overzicht_lineup[k1 + 3].V1 !== ' ') {
                    if (data.wedstrijd_data.overzicht_lineup[k1 + 2].V2 !== 'BANK') {
                        var value = {};
                        value.spelerNaam = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 3].V2).split(" (")[0];
                        value.rugnummer = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 3].V1);
                        if ($filter('filter')(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]) {
                            value.personID = angular.copy($filter('filter')(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]).personID;
                        }
                        ;
                        items.spelersthuisteam.push(value);
                        k1 += 4;
                    } else {
                        break;
                    }
                }
                else if (data.wedstrijd_data.overzicht_lineup[k1 + 4].V1 !== ' ') {
                    if (data.wedstrijd_data.overzicht_lineup[k1 + 3].V2 !== 'BANK') {
                        var value = {};
                        value.spelerNaam = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 4].V2).split(" (")[0];
                        value.rugnummer = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 4].V1);
                        if ($filter('filter')(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]) {
                            value.personID = angular.copy($filter('filter')(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]).personID;
                        }
                        ;
                        items.spelersthuisteam.push(value);
                        k1 += 5;
                    } else {
                        break;
                    }
                }
                else if (data.wedstrijd_data.overzicht_lineup[k1 + 5].V1 !== ' ') {
                    if (data.wedstrijd_data.overzicht_lineup[k1 + 4].V2 !== 'BANK') {
                        var value = {};
                        value.spelerNaam = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 5].V2).split(" (")[0];
                        value.rugnummer = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 5].V1);
                        if ($filter('filter')(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]) {
                            value.personID = angular.copy($filter('filter')(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]).personID;
                        }
                        ;
                        items.spelersthuisteam.push(value);
                        k1 += 6;
                    } else {
                        break;
                    }
                }
                else {
                    if (data.wedstrijd_data.overzicht_lineup[k1 + 5].V2 !== 'BANK') {
                        var value = {};
                        value.spelerNaam = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 6].V2).split(" (")[0];
                        value.rugnummer = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 6].V1);
                        if ($filter('filter')(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]) {
                            value.personID = angular.copy($filter('filter')(items.spelers_thuisteam, {spelerNaam: value.spelerNaam})[0]).personID;
                        }
                        ;
                        items.spelersthuisteam.push(value);
                        k1 += 7;
                    } else {
                        break;
                    }
                }
            }

            items.spelersuitteam = [];
            for (var k1 = 2; k1 < items.overzicht_lineup.length;) {
                if (data.wedstrijd_data.overzicht_lineup[k1].V3 !== ' ') {
                    if (data.wedstrijd_data.overzicht_lineup[k1 - 1].V4 !== 'BANK') {
                        var value = {};
                        value.spelerNaam = angular.copy(data.wedstrijd_data.overzicht_lineup[k1].V4).split(" (")[0];
                        value.rugnummer = angular.copy(data.wedstrijd_data.overzicht_lineup[k1].V3);
                        if ($filter('filter')(items.spelers_uitteam, {spelerNaam: value.spelerNaam})[0]) {
                            value.personID = angular.copy($filter('filter')(items.spelers_uitteam, {spelerNaam: value.spelerNaam})[0]).personID;
                        }
                        ;
                        items.spelersuitteam.push(value);
                        k1++;
                    } else {
                        break;
                    }
                }
                else if (data.wedstrijd_data.overzicht_lineup[k1 + 1].V3 !== ' ') {
                    if (data.wedstrijd_data.overzicht_lineup[k1].V4 !== 'BANK') {
                        var value = {};
                        value.spelerNaam = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 1].V4).split(" (")[0];
                        value.rugnummer = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 1].V3);
                        if ($filter('filter')(items.spelers_uitteam, {spelerNaam: value.spelerNaam})[0]) {
                            value.personID = angular.copy($filter('filter')(items.spelers_uitteam, {spelerNaam: value.spelerNaam})[0]).personID;
                        }
                        ;
                        items.spelersuitteam.push(value);
                        k1 += 2;
                    } else {
                        break;
                    }
                }
                else if (data.wedstrijd_data.overzicht_lineup[k1 + 2].V3 !== ' ') {
                    if (data.wedstrijd_data.overzicht_lineup[k1 + 1].V4 !== 'BANK') {
                        var value = {};
                        value.spelerNaam = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 2].V4).split(" (")[0];
                        value.rugnummer = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 2].V3);
                        if ($filter('filter')(items.spelers_uitteam, {spelerNaam: value.spelerNaam})[0]) {
                            value.personID = angular.copy($filter('filter')(items.spelers_uitteam, {spelerNaam: value.spelerNaam})[0]).personID;
                        }
                        ;
                        items.spelersuitteam.push(value);
                        k1 += 3;
                    } else {
                        break;
                    }
                }
                else if (data.wedstrijd_data.overzicht_lineup[k1 + 3].V3 !== ' ') {
                    if (data.wedstrijd_data.overzicht_lineup[k1 + 2].V4 !== 'BANK') {
                        var value = {};
                        value.spelerNaam = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 3].V4).split(" (")[0];
                        value.rugnummer = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 3].V3);
                        if ($filter('filter')(items.spelers_uitteam, {spelerNaam: value.spelerNaam})[0]) {
                            value.personID = angular.copy($filter('filter')(items.spelers_uitteam, {spelerNaam: value.spelerNaam})[0]).personID;
                        }
                        ;
                        items.spelersuitteam.push(value);
                        k1 += 4;
                    } else {
                        break;
                    }
                }
                else if (data.wedstrijd_data.overzicht_lineup[k1 + 4].V3 !== ' ') {
                    if (data.wedstrijd_data.overzicht_lineup[k1 + 3].V4 !== 'BANK') {
                        var value = {};
                        value.spelerNaam = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 4].V4).split(" (")[0];
                        value.rugnummer = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 4].V3);
                        if ($filter('filter')(items.spelers_uitteam, {spelerNaam: value.spelerNaam})[0]) {
                            value.personID = angular.copy($filter('filter')(items.spelers_uitteam, {spelerNaam: value.spelerNaam})[0]).personID;
                        }
                        ;
                        items.spelersuitteam.push(value);
                        k1 += 5;
                    } else {
                        break;
                    }
                }
                else if (data.wedstrijd_data.overzicht_lineup[k1 + 5].V3 !== ' ') {
                    if (data.wedstrijd_data.overzicht_lineup[k1 + 4].V4 !== 'BANK') {
                        var value = {};
                        value.spelerNaam = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 5].V4).split(" (")[0];
                        value.rugnummer = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 5].V3);
                        if ($filter('filter')(items.spelers_uitteam, {spelerNaam: value.spelerNaam})[0]) {
                            value.personID = angular.copy($filter('filter')(items.spelers_uitteam, {spelerNaam: value.spelerNaam})[0]).personID;
                        }
                        ;
                        items.spelersuitteam.push(value);
                        k1 += 6;
                    } else {
                        break;
                    }
                }
                else {
                    if (data.wedstrijd_data.overzicht_lineup[k1 + 5].V4 !== 'BANK') {
                        var value = {};
                        value.spelerNaam = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 6].V4).split(" (")[0];
                        value.rugnummer = angular.copy(data.wedstrijd_data.overzicht_lineup[k1 + 6].V3);
                        if ($filter('filter')(items.spelers_uitteam, {spelerNaam: value.spelerNaam})[0]) {
                            value.personID = angular.copy($filter('filter')(items.spelers_uitteam, {spelerNaam: value.spelerNaam})[0]).personID;
                        }
                        ;
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

            items.team_stats = [];
            items.team_stats.thuis = {};
            items.team_stats.uit = {};
            items.team_stats.thuis.matchID = angular.copy(items.matchID);
            items.team_stats.uit.matchID = angular.copy(items.matchID);
            items.team_stats.thuis.ronde = angular.copy(items.match_info.ronde);
            items.team_stats.uit.ronde = angular.copy(items.match_info.ronde);
            items.team_stats.thuis.doelpunten_voor = items.match_info.eindstand.split(" - ", 1)[0];
            items.team_stats.thuis.doelpunten_tegen = items.match_info.eindstand.split(" - ", 2)[1];
            items.team_stats.uit.doelpunten_voor = items.match_info.eindstand.split(" - ", 2)[1];
            items.team_stats.uit.doelpunten_tegen = items.match_info.eindstand.split(" - ", 1)[0];
            if (items.match_info.eindstand.split(" - ", 1)[0] > items.match_info.eindstand.split(" - ", 2)[1]) {
                items.team_stats.thuis.punten = 3;
                items.team_stats.uit.punten = 0;
            } else if (items.match_info.eindstand.split(" - ", 1)[0] < items.match_info.eindstand.split(" - ", 2)[1]) {
                items.team_stats.thuis.punten = 0;
                items.team_stats.uit.punten = 3;
            } else if (items.match_info.eindstand.split(" - ", 1)[0] == items.match_info.eindstand.split(" - ", 2)[1]) {
                items.team_stats.thuis.punten = 1;
                items.team_stats.uit.punten = 1;
            }
            items.team_stats.thuis.balbezit = $filter('filter')(data.team_matrix, {_row: 'Balbezit'}, true)[0][items.thuisTeamID];
            items.team_stats.uit.balbezit = $filter('filter')(data.team_matrix, {_row: 'Balbezit'}, true)[0][items.uitTeamID];
            items.team_stats.thuis.tot_passes = $filter('filter')(data.team_matrix, {_row: 'Tot. aantal passes'}, true)[0][items.thuisTeamID];
            items.team_stats.uit.tot_passes = $filter('filter')(data.team_matrix, {_row: 'Tot. aantal passes'}, true)[0][items.uitTeamID];
            items.team_stats.thuis.geslaagde_passes = $filter('filter')(data.team_matrix, {_row: 'Geslaagde passes'}, true)[0][items.thuisTeamID];
            items.team_stats.uit.geslaagde_passes = $filter('filter')(data.team_matrix, {_row: 'Geslaagde passes'}, true)[0][items.uitTeamID];
            items.team_stats.thuis.lengte_passes = $filter('filter')(data.team_matrix, {_row: 'Gem. lengte passes'}, true)[0][items.thuisTeamID];
            items.team_stats.uit.lengte_passes = $filter('filter')(data.team_matrix, {_row: 'Gem. lengte passes'}, true)[0][items.uitTeamID];
            items.team_stats.thuis.doelpogingen = $filter('filter')(data.team_matrix, {_row: 'Doelpogingen'}, true)[0][items.thuisTeamID];
            items.team_stats.uit.doelpogingen = $filter('filter')(data.team_matrix, {_row: 'Doelpogingen'}, true)[0][items.uitTeamID];
            items.team_stats.thuis.gewonnen_duels = $filter('filter')(data.team_matrix, {_row: 'Gewonnen duels'}, true)[0][items.thuisTeamID];
            items.team_stats.uit.gewonnen_duels = $filter('filter')(data.team_matrix, {_row: 'Gewonnen duels'}, true)[0][items.uitTeamID];
            items.team_stats.thuis.geel = $filter('filter')(data.team_matrix, {_row: 'Gele kaarten'}, true)[0][items.thuisTeamID];
            items.team_stats.uit.geel = $filter('filter')(data.team_matrix, {_row: 'Gele kaarten'}, true)[0][items.uitTeamID];
            items.team_stats.thuis.rood = $filter('filter')(data.team_matrix, {_row: 'Rode kaarten'}, true)[0][items.thuisTeamID];
            items.team_stats.uit.rood = $filter('filter')(data.team_matrix, {_row: 'Rode kaarten'}, true)[0][items.uitTeamID];

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
                var del = true;
                if (del && items.duel_matrix_eerste_helft.uit[0][value.personID] >= 0) del = false;
                if (!del) items.duel_matrix_eerste_helft_uit_spelers_thuisteam.push(value);

                angular.forEach(items.duel_matrix_tweede_helft.thuis, function (value1, key1) {
                    if (Number(value1['1']) === value.personID) value1['1'] = angular.copy(value.spelerNaam);
                });
                var del = true;
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

                var del = true;
                if (del && items.duel_matrix_eerste_helft.thuis[0][value.personID] >= 0) del = false;
                if (!del) items.duel_matrix_eerste_helft_thuis_spelers_uitteam.push(value);
                angular.forEach(items.duel_matrix_eerste_helft.uit, function (value1, key1) {
                    if (Number(value1['1']) === value.personID) value1['1'] = angular.copy(value.spelerNaam);
                });

                var del = true;
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
                    if (Number(value1['_row']) === value.personID) {
                        value1['_row'] = angular.copy(value.spelerNaam);
                        items.pass_matrix_helft1_thuis_spelers.push(value);
                    }
                });
                angular.forEach(items.pass_matrix_helft2.thuis.passMatrix, function (value1, key1) {
                    if (Number(value1['_row']) === value.personID) {
                        value1['_row'] = angular.copy(value.spelerNaam);
                        items.pass_matrix_helft2_thuis_spelers.push(value);
                    }
                });
                angular.forEach(items.pass_matrix_helft1.thuis.passMatrix2, function (value1, key1) {
                    if (Number(value1['_row']) === value.personID) {
                        value1['_row'] = angular.copy(value.spelerNaam);
                    }
                });
                angular.forEach(items.pass_matrix_helft2.thuis.passMatrix2, function (value1, key1) {
                    if (Number(value1['_row']) === value.personID) {
                        value1['_row'] = angular.copy(value.spelerNaam);
                    }
                });
            });
            angular.forEach(data.wedstrijd_data.spelers_uitteam, function (value, key) {
                angular.forEach(items.pass_matrix_helft1.uit.passMatrix, function (value1, key1) {
                    if (Number(value1['_row']) === value.personID) {
                        value1['_row'] = angular.copy(value.spelerNaam);
                        items.pass_matrix_helft1_uit_spelers.push(value);
                    }
                });
                angular.forEach(items.pass_matrix_helft2.uit.passMatrix, function (value1, key1) {
                    if (Number(value1['_row']) === value.personID) {
                        value1['_row'] = angular.copy(value.spelerNaam);
                        items.pass_matrix_helft2_uit_spelers.push(value);
                    }
                });
                angular.forEach(items.pass_matrix_helft1.uit.passMatrix2, function (value1, key1) {
                    if (Number(value1['_row']) === value.personID) {
                        value1['_row'] = angular.copy(value.spelerNaam);
                    }
                });
                angular.forEach(items.pass_matrix_helft2.uit.passMatrix2, function (value1, key1) {
                    if (Number(value1['_row']) === value.personID) {
                        value1['_row'] = angular.copy(value.spelerNaam);
                    }
                });
            });

            items.penalty_visualisatie = data.team_data.penalty_visualisatie;
            angular.forEach(items.penalty_visualisatie, function (value, key) {
                angular.forEach(items.spelersthuisteam, function (value1, key1) {
                    if (value1.personID == value.schutter) {
                        value.schutter = angular.copy(value1.spelerNaam);
                    }
                    if (value1.personID == value.keeper) {
                        value.keeper = angular.copy(value1.spelerNaam);
                    }
                });
                angular.forEach(items.spelersuitteam, function (value1, key1) {
                    if (value1.personID == value.schutter) {
                        value.schutter = angular.copy(value1.spelerNaam);
                    }
                    if (value1.personID == value.keeper) {
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

            items.player_stats_thuis = [];
            items.player_stats_uit = [];
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
                items.player_stats_thuis.push(temp);
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
                items.player_stats_uit.push(temp);
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

                    temp.locatie_reddingen = value.locaties_reddingen;
                    temp.locatie_uittrappen = [];
                    angular.forEach(value.locaties_uittrappen, function (value, key1) {
                        var temp1 = {};
                        temp1.zend_lengte = angular.copy(value.zend_lengte);
                        temp1.zend_breedte = angular.copy(value.zend_breedte);
                        temp1.ontvang_lengte = angular.copy(value.ontvang_lengte);
                        temp1.ontvang_breedte = angular.copy(value.ontvang_breedte);
                        angular.forEach(items.spelersthuisteam, function (value1, key1) {
                            if (value1.personID == value.teamgenoot) {
                                temp1.teamgenoot = angular.copy(value1.spelerNaam);
                            }
                        });
                        angular.forEach(items.spelersuitteam, function (value1, key1) {
                            if (value1.personID == value.teamgenoot) {
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

                    temp.locatie_voorzetten = value.locatie_voorzetten[temp.personID];
                    temp.locatie_aanvallende_duels = value.locaties_aanvallende_duels[temp.personID];
                    temp.locatie_doelpogingen = value.locaties_doelpogingen[temp.personID];
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
                            temp1._row = angular.copy(value1.spelerNaam);
                        }
                    });
                    angular.forEach(items.spelersuitteam, function (value1, key1) {
                        if (value1.personID == value._row) {
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
                            temp1._row = angular.copy(value1.spelerNaam);
                        }
                    });
                    angular.forEach(items.spelersuitteam, function (value1, key1) {
                        if (value1.personID == value._row) {
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

                temp.locatie_verdedigende_duels = value.locaties_verdedigende_duels[temp.personID];

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

                    temp.locatie_reddingen = value.locaties_reddingen;
                    temp.locatie_uittrappen = [];
                    angular.forEach(value.locaties_uittrappen, function (value, key1) {
                        var temp1 = {};
                        temp1.zend_lengte = angular.copy(value.zend_lengte);
                        temp1.zend_breedte = angular.copy(value.zend_breedte);
                        temp1.ontvang_lengte = angular.copy(value.ontvang_lengte);
                        temp1.ontvang_breedte = angular.copy(value.ontvang_breedte);
                        angular.forEach(items.spelersthuisteam, function (value1, key1) {
                            if (value1.personID == value.teamgenoot) {
                                temp1.teamgenoot = angular.copy(value1.spelerNaam);
                            }
                        });
                        angular.forEach(items.spelersuitteam, function (value1, key1) {
                            if (value1.personID == value.teamgenoot) {
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

                    temp.locatie_voorzetten = value.locatie_voorzetten[temp.personID];
                    temp.locatie_aanvallende_duels = value.locaties_aanvallende_duels[temp.personID];
                    temp.locatie_doelpogingen = value.locaties_doelpogingen[temp.personID];
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
                            temp1._row = angular.copy(value1.spelerNaam);
                        }
                    });
                    angular.forEach(items.spelersuitteam, function (value1, key1) {
                        if (value1.personID == value._row) {
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
                            temp1._row = angular.copy(value1.spelerNaam);
                        }
                    });
                    angular.forEach(items.spelersuitteam, function (value1, key1) {
                        if (value1.personID == value._row) {
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

                temp.locatie_verdedigende_duels = value.locaties_verdedigende_duels[temp.personID];

                items.player_stats_full_uit.push(temp);
            });

            if (items.match_info.thuis === 'Almere City FC') {
                items.match_info.thuis_kort = 'Almere City'
            }
            else if (items.match_info.thuis === 'Roda JC Kerkrade') {
                items.match_info.thuis_kort = 'Roda JC'
            }
            else {
                items.match_info.thuis_kort = angular.copy(items.match_info.thuis)
            }

            if (items.match_info.uit === 'Almere City FC') {
                items.match_info.uit_kort = 'Almere City'
            }
            else if (items.match_info.uit === 'Roda JC Kerkrade') {
                items.match_info.uit_kort = 'Roda JC'
            }
            else {
                items.match_info.uit_kort = angular.copy(items.match_info.uit)
            }

            $scope.matches.push(items);
        }

      //--------------------------------------------------------------------------------------------------------------


        $scope.orderSpelers = 'personID';
        $scope.orderSpelersNaam = 'spelerNaam';
        $scope.orderSpelersNaamType = ['-type', 'spelerNaam'];

        $scope.seasonInitFunc = function (season) {
            $scope.season_matches = [];
            $scope.season_matches = $filter('filter')($scope.matches, {seizoen: season}, true);
        };

        $scope.matchInitFunc = function (i) {
//            $scope.match = $scope.season_matches[i];
            $scope.match = $filter('filter')($scope.season_matches, {matchID: i}, true)[0];
            $scope.match.gemiddelde_posities = angular.copy($scope.match.gemiddelde_posities_helft1);
            $scope.match.locatie_doelpogingen_filter = angular.copy($scope.match.locatie_doelpogingen);
            $scope.match.locatie_overtredingen_filter = angular.copy($scope.match.locatie_overtredingen);
        };

        $scope.splitTime = function(string) {
            if ( !isNaN( Number(string.split("'")[0]) ) ) {
                return Number(string.split("'")[0]);
            } else {
                return Number(string.split("+")[0]) + Number(string.split("+")[1].split("'")[0]);
            }
        };

        var selectpositions_uit = true;
        var selectpositions_thuis = true;
        $scope.select_positions_uit = function () {
            if (!selectpositions_uit) {
                if ($scope.position_field_interval == '00 - 15 min') { $scope.match.gemiddelde_posities = $scope.match.gemiddelde_posities_kwartier1 }
                else if ($scope.position_field_interval == '15 - 30 min') { $scope.match.gemiddelde_posities = $scope.match.gemiddelde_posities_kwartier2 }
                else if ($scope.position_field_interval == '30 - 45 min') { $scope.match.gemiddelde_posities = $scope.match.gemiddelde_posities_kwartier3 }
                else if ($scope.position_field_interval == '45 - 60 min') { $scope.match.gemiddelde_posities = $scope.match.gemiddelde_posities_kwartier4 }
                else if ($scope.position_field_interval == '60 - 75 min') { $scope.match.gemiddelde_posities = $scope.match.gemiddelde_posities_kwartier5 }
                else if ($scope.position_field_interval == '75 - 90 min') { $scope.match.gemiddelde_posities = $scope.match.gemiddelde_posities_kwartier6 }
                else if ($scope.position_field_interval == '1e helft') { $scope.match.gemiddelde_posities = $scope.match.gemiddelde_posities_helft1 }
                else if ($scope.position_field_interval == '2e helft') { $scope.match.gemiddelde_posities = $scope.match.gemiddelde_posities_helft2 }

                if (!selectpositions_thuis) {
                    $scope.match.gemiddelde_posities = angular.copy($filter('filter')($scope.match.gemiddelde_posities, {teamNaam: $scope.match.match_info.uit_kort}));
                }

                selectpositions_uit = true;
            } else {
                $scope.match.gemiddelde_posities = angular.copy($filter('filter')($scope.match.gemiddelde_posities, {teamNaam: $scope.match.match_info.uit_kort}));
                selectpositions_thuis = false;
            }
        };
        $scope.select_positions_thuis = function () {
            if (!selectpositions_thuis) {
                if ($scope.position_field_interval == '00 - 15 min') { $scope.match.gemiddelde_posities = $scope.match.gemiddelde_posities_kwartier1 }
                else if ($scope.position_field_interval == '15 - 30 min') { $scope.match.gemiddelde_posities = $scope.match.gemiddelde_posities_kwartier2 }
                else if ($scope.position_field_interval == '30 - 45 min') { $scope.match.gemiddelde_posities = $scope.match.gemiddelde_posities_kwartier3 }
                else if ($scope.position_field_interval == '45 - 60 min') { $scope.match.gemiddelde_posities = $scope.match.gemiddelde_posities_kwartier4 }
                else if ($scope.position_field_interval == '60 - 75 min') { $scope.match.gemiddelde_posities = $scope.match.gemiddelde_posities_kwartier5 }
                else if ($scope.position_field_interval == '75 - 90 min') { $scope.match.gemiddelde_posities = $scope.match.gemiddelde_posities_kwartier6 }
                else if ($scope.position_field_interval == '1e helft') { $scope.match.gemiddelde_posities = $scope.match.gemiddelde_posities_helft1 }
                else if ($scope.position_field_interval == '2e helft') { $scope.match.gemiddelde_posities = $scope.match.gemiddelde_posities_helft2 }

                if (!selectpositions_uit) {
                    $scope.match.gemiddelde_posities = angular.copy($filter('filter')($scope.match.gemiddelde_posities, {teamNaam: $scope.match.match_info.thuis_kort}));
                }

                selectpositions_thuis = true;
            } else {
                $scope.match.gemiddelde_posities = angular.copy($filter('filter')($scope.match.gemiddelde_posities, {teamNaam: $scope.match.match_info.thuis_kort}));
                selectpositions_uit = false;
            }
        };
        var selectpogingen_uit = true;
        var selectpogingen_thuis = true;
        var selectpogingen_doel = true;
        var selectpogingen_target = true;
        $scope.select_pogingen_uit = function () {
            if (!selectpogingen_uit) {
                $scope.match.locatie_doelpogingen_filter = angular.copy($scope.match.locatie_doelpogingen);
                selectpogingen_uit = true;
            } else {
                $scope.match.locatie_doelpogingen_filter.thuisTeam = [];
                selectpogingen_thuis = false;
            }
        };
        $scope.select_pogingen_thuis = function () {
            if (!selectpogingen_thuis) {
                $scope.match.locatie_doelpogingen_filter = angular.copy($scope.match.locatie_doelpogingen);
                selectpogingen_thuis = true;
            } else {
                $scope.match.locatie_doelpogingen_filter.uitTeam = [];
                selectpogingen_uit = false;
            }
        };
        $scope.select_pogingen_doel = function () {
            if (!selectpogingen_doel) {
                $scope.match.locatie_doelpogingen_filter = angular.copy($scope.match.locatie_doelpogingen);
                if (!selectpogingen_uit) {
                    $scope.match.locatie_doelpogingen_filter.uitTeam = [];
                }
                if (!selectpogingen_thuis) {
                    $scope.match.locatie_doelpogingen_filter.thuisTeam = [];
                }
                selectpogingen_doel = true;
            } else {
                if (selectpogingen_uit) {
                    $scope.match.locatie_doelpogingen_filter.uitTeam = angular.copy($filter('filter')($scope.match.locatie_doelpogingen_filter.uitTeam, {type: 'Doelpunt'}));
                }
                if (selectpogingen_thuis) {
                    $scope.match.locatie_doelpogingen_filter.thuisTeam = angular.copy($filter('filter')($scope.match.locatie_doelpogingen_filter.thuisTeam, {type: 'Doelpunt'}));
                }
                selectpogingen_doel = false;
            }
        };
        $scope.select_pogingen_target = function () {
            if (!selectpogingen_target) {
                $scope.match.locatie_doelpogingen_filter = angular.copy($scope.match.locatie_doelpogingen);
                if (!selectpogingen_uit) {
                    $scope.match.locatie_doelpogingen_filter.uitTeam = [];
                }
                if (!selectpogingen_thuis) {
                    $scope.match.locatie_doelpogingen_filter.thuisTeam = [];
                }
                selectpogingen_target = true;
            } else {
                if (selectpogingen_uit) {
                    $scope.match.locatie_doelpogingen_filter.uitTeam = angular.copy($filter('filter')($scope.match.locatie_doelpogingen_filter.uitTeam, {type: 'Redding'}));
                }
                if (selectpogingen_thuis) {
                    $scope.match.locatie_doelpogingen_filter.thuisTeam = angular.copy($filter('filter')($scope.match.locatie_doelpogingen_filter.thuisTeam, {type: 'Redding'}));
                }
                selectpogingen_target = false;
            }
        };

        var selectovertredingen_uit = true;
        var selectovertredingen_thuis = true;
        $scope.select_overtredingen_uit = function () {
            if (!selectovertredingen_uit) {
                $scope.match.locatie_overtredingen_filter = angular.copy($scope.match.locatie_overtredingen);
                selectovertredingen_thuis = true;
                selectovertredingen_uit = true;
            } else {
                $scope.match.locatie_overtredingen_filter.thuisTeam = [];
                selectovertredingen_thuis = false;
                selectovertredingen_uit = true;
            }
        };
        $scope.select_overtredingen_thuis = function () {
            if (!selectovertredingen_thuis) {
                $scope.match.locatie_overtredingen_filter = angular.copy($scope.match.locatie_overtredingen);
                selectovertredingen_thuis = true;
                selectovertredingen_uit = true;
            } else {
                $scope.match.locatie_overtredingen_filter.uitTeam = [];
                selectovertredingen_thuis = true;
                selectovertredingen_uit = false;
            }
        };

        $scope.pos = 15;
        $scope.time = 15;
        $scope.$watch('time', function () {
            $scope.pos = $scope.time;
        });

        $scope.position_field_interval = '1e helft';
        $scope.$watch('position_field_interval', function () {
            if ($scope.position_field_interval == '00 - 15 min') { $scope.match.gemiddelde_posities = $scope.match.gemiddelde_posities_kwartier1 }
            else if ($scope.position_field_interval == '15 - 30 min') { $scope.match.gemiddelde_posities = $scope.match.gemiddelde_posities_kwartier2 }
            else if ($scope.position_field_interval == '30 - 45 min') { $scope.match.gemiddelde_posities = $scope.match.gemiddelde_posities_kwartier3 }
            else if ($scope.position_field_interval == '45 - 60 min') { $scope.match.gemiddelde_posities = $scope.match.gemiddelde_posities_kwartier4 }
            else if ($scope.position_field_interval == '60 - 75 min') { $scope.match.gemiddelde_posities = $scope.match.gemiddelde_posities_kwartier5 }
            else if ($scope.position_field_interval == '75 - 90 min') { $scope.match.gemiddelde_posities = $scope.match.gemiddelde_posities_kwartier6 }
            else if ($scope.position_field_interval == '1e helft') { $scope.match.gemiddelde_posities = $scope.match.gemiddelde_posities_helft1 }
            else if ($scope.position_field_interval == '2e helft') { $scope.match.gemiddelde_posities = $scope.match.gemiddelde_posities_helft2 }

            selectpositions_uit = true;
            selectpositions_thuis = true;
        });

        $scope.player1InitFunc = function (i) {
            $scope.speler1 = $filter('filter')($scope.match.player_stats_thuis, {personID: i}, true)[0];
        };
        $scope.player2InitFunc = function (i) {
            $scope.speler2 = $filter('filter')($scope.match.player_stats_thuis, {personID: i}, true)[0];
        };

        $scope.playerlog1InitFunc = function (i) {
            $scope.spelerlog = $filter('filter')($scope.match.player_stats_thuis, {personID: i}, true)[0];
        };
        $scope.playerlog2InitFunc = function (i) {
            $scope.spelerlog = $filter('filter')($scope.match.player_stats_uit, {personID: i}, true)[0];
        };
    }]);