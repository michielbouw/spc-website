angular.module('mainapp.match')
    .controller('mainapp.match.MatchController', ['Api', '$location', '$filter',
        function(Api, $location, $filter)
    {
        var self = this;

        self.matches = [];
        Api.Matches.query(function(res) {
            self.matches = res;
        });

        self.seasonInitFunc = function () {
            self.season_matches = [];
            self.season_matches = $filter('filter')(self.matches, {seizoen: self.season_index}, true);
        };
        self.matchInitFunc = function () {
            self.match = {};
            self.match = $filter('filter')(self.season_matches, {matchID: self.match_index}, true)[0];
        };
    }]);