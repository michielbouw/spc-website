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

        self.changePassword = function () {
            if (self.login.password !== undefined && self.login.password1 !== undefined && self.login.password2 !== undefined) {

                if (self.login.password1 === self.login.password2) {
                    if ( self.login.password1.length > 5 && self.login.password1.match(/[a-z]/) && self.login.password1.match(/[0-9]/) ) {
                        Api.ChangePassword.post({
                            password: self.login.password,
                            password_new: self.login.password1,
                            datetime: self.datetime
                        }, function (res) {
                            if (res.type === false) {
                                alert(res.data);
                            } else {
                                $location.path("/");
                            }
                        }, function () {
                            $rootScope.error = 'Er ging iets mis, account niet aangemaakt';
                            alert('Er ging iets mis, account niet aangemaakt');
                        });
                    } else {
                        $rootScope.error = 'Een wachtwoord moet tenminste 1 letter en 1 cijfer bevatten en minimaal 6 tekens lang zijn';
                        alert('Een wachtwoord moet tenminste 1 letter en 1 cijfer bevatten en minimaal 6 tekens lang zijn');
                    }
                } else {
                    $rootScope.error = 'Je hebt het wachtwoord niet (correct) bevestigd';
                    alert('Je hebt het wachtwoord niet (correct) bevestigd');
                }
            }
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