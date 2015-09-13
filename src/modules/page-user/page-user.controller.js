angular.module('mainapp.pageUser')
    .controller('mainapp.pageUser.UserController', ['Api', 'AuthenticationService', '$location', '$sessionStorage', '$filter', '$rootScope',
        function(Api, AuthenticationService, $location, $sessionStorage, $filter, $rootScope)
    {
        var self = this;

        Api.User.get({
            _id: $sessionStorage.currentUser._id
        }, function(res) {
            self.user = {};
            self.user._id = res._id;
            self.user.email = res.email;
            self.user.first_name = res.first_name;
            self.user.middle_name = res.middle_name;
            self.user.last_name = res.last_name;
        });

        self.userEdit = function() {
            var _t = self.user;

            Api.User.put({
                _id: _t._id
            }, {
                email: _t.email,
                first_name: _t.first_name,
                middle_name: _t.middle_name,
                last_name: _t.last_name
            }, function() {
                $location.path('/user');
            }, function() {
            });
        };

        if ($sessionStorage.currentClub && $sessionStorage.currentClub.teams[0] && $sessionStorage.currentClub.teams[0].team_slug) {
            self.season_matches = [];
            self.orderMatches = 'ronde';

            if ($sessionStorage.currentUser.speler_id) {
                Api.TeamDataItem.get({
                    _slug: $sessionStorage.currentClub.teams[0].team_slug
                }, function (res) {
                    self.playerID = $sessionStorage.currentUser.speler_id;
                    self.player_stats = $filter('filter')(res.player_data, {playerID: self.playerID}, true)[0];
                    self.season_index = self.player_stats.matches[self.player_stats.matches.length - 1].season;
                    self.season_matches = $filter('orderBy')(($filter('filter')(self.player_stats.matches, {season: self.season_index}, true)[0]).match, self.orderMatches);
                });
            }
        }
    }]);