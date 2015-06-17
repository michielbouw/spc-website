angular.module('mainapp.players', [])
    .config(function($routeProvider)
    {
        $routeProvider
            .when('/spelers', {
                templateUrl: 	'players/views/players.html',
                access: {
                    requiredLogin: true,
                    permission: 'speler'
                }
            })
            .when('/spelers/spelerID', {
                templateUrl: 	'players/views/players-single.html',
                access: {
                    requiredLogin: true,
                    permission: 'speler'
                }
            });
    });