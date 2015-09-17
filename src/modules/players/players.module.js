angular.module('mainapp.players', ['tc.chartjs'])
    .config(function($routeProvider)
    {
        $routeProvider
            .when('/spelers/:team_slug?', {
                templateUrl: 	'players/views/players.html',
                access: {
                    requiredLogin: true,
                    permission: 'speler'
                }
            })
            .when('/spelers/:team_slug/:playerid', {
                templateUrl: 	'players/views/players-single.html',
                access: {
                    requiredLogin: true,
                    permission: 'speler'
                }
            });
    });