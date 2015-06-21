angular.module('mainapp.match')
    .controller('mainapp.match.MatchController', ['Api', '$location', '$filter',
        function(Api, $location, $filter)
    {
        var self = this;

        self.matches = [];
        //Api.Matches.query(function(res) {
        //    self.matches = res;
        //});

        var data1 = {
            "matchID": 16435,
            "thuisTeamID": 1527,
            "uitTeamID": 1530,
            "seizoen": "2014-2015 Play-offs",
            "divisie": "Jupiler League",
            "match_info": {
                "wedstrijd": "FC Eindhoven - FC Volendam",
                "eindstand": "1 - 1",
                "ruststand": "0 - 0",
                "speeldag": "dinsdag",
                "datum": "25-05-2015",
                "tijd": "14:30",
                "ronde": 2,
                "scheids": "Dennis Higler"
            },
            extra_uploads: []
        };
        var data2 = {
            "matchID": 16379,
            "thuisTeamID": 1525,
            "uitTeamID": 1524,
            "seizoen": "2014-2015 Play-offs",
            "divisie": "Jupiler League",
            "match_info": {
                "wedstrijd": "De Graafschap - Almere City FC",
                "eindstand": "2 - 1",
                "ruststand": "0 - 0",
                "speeldag": "woensdag",
                "datum": "15-05-2015",
                "tijd": "20:45",
                "ronde": 2,
                "scheids": "Martin van den Kerkhof"
            },
            extra_uploads: []
        };
        self.matches.push(data1);
        self.matches.push(data2);

        self.match = {};

        self.seasonInitFunc = function () {
            self.season_matches = [];
            self.season_matches = $filter('filter')(self.matches, {seizoen: self.season_index}, true);
        };
        self.matchInitFunc = function () {
            self.match = $filter('filter')(self.season_matches, {matchID: self.match_index}, true)[0];
        };
    }]);