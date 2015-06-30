angular.module('mainapp.match', [])
    .config(function($routeProvider)
    {
        $routeProvider
            .when('/wedstrijd', {
                templateUrl: 	'match/views/match.html',
                access: {
                    requiredLogin: true,
                    permission: 'speler'
                }
            })
            .when('/wedstrijd/:_id', {
                templateUrl: 	'match/views/match-single.html',
                access: {
                    requiredLogin: true,
                    permission: 'speler'
                }
            });
    });