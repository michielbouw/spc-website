angular.module('mainapp.players')
    .controller('mainapp.players.PlayersController', ['Api', '$location', '$rootScope', '$routeParams', '$sessionStorage',
        function(Api, $location, $rootScope, $routeParams, $sessionStorage)
    {
        var self = this;

        self.player_data = [];
        self.orderplayers = ['spelerRugnummer', '-spelerPositie', 'spelerNaam'];

        if ((!$routeParams.team_slug || $routeParams.team_slug === '') && $rootScope.currentClub && $rootScope.currentClub.teams[0].team_slug) {
            $location.path('/spelers/' + $rootScope.currentClub.teams[0].team_slug);
        } else if ((!$routeParams.team_slug || $routeParams.team_slug === '') && (!$rootScope.currentClub || !$rootScope.currentClub.teams[0].team_slug) && $sessionStorage.role === 'admin') {
            //$location.path('/404');
            $location.path('/spelers/fceindhoven_1');
        } else {
            if ( ($rootScope.currentClub && $rootScope.currentClub.teams[0] && $rootScope.currentClub.teams[0].team_slug !== $routeParams.team_slug) && ($rootScope.currentClub && $rootScope.currentClub.teams[1] && $rootScope.currentClub.teams[1].team_slug !== $routeParams.team_slug) && $sessionStorage.role !== 'admin' ) {
                $location.path('/404');
            }

            Api.TeamDataItem.get({
                _slug: $routeParams.team_slug
            }, function (res) {
                self.clubSelected = $routeParams.team_slug;
                self.team_slug = $routeParams.team_slug;
                self.team_name = res.team_name;
                self.club_name = res.club_name;
                self.divisie = res.divisie;
                self.player_data = res.player_data;

                angular.forEach(self.player_data, function(value, key) {
                    if (!value.spelerPhoto) {
                        Api.SpelersID.query({
                            _id: value.playerID
                        },function(res1) {
                            angular.forEach(res1, function(value1, key1) {
                                if (value1.spelerPhoto && self.club_name == value1.clubNaam) {
                                    value.spelerPhoto = value1.spelerPhoto;
                                }
                            });
                        });
                    }
                });
            });

            Api.Clubs.query(function(res) {
                self.teams = [];
                angular.forEach(res, function (value, key) {
                    angular.forEach(value.teams, function (value1, key1) {
                        var temp = {};
                        temp.club_name = value.name;
                        temp.team_name = value1.team_name;
                        temp.team_slug = value1.team_slug;
                        self.teams.push(temp);
                    });
                });
            });
        }

        self.clubSelector = function () {
            if (self.clubSelected) {
                $location.path('/spelers/' + self.clubSelected);
            }
        };
    }]);