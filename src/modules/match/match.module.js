angular.module('mainapp.match', ['tc.chartjs'])
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
            //.when('/wedstrijd/single/:_id', {
            //    templateUrl: 	'match/views/match-single.html',
            //    access: {
            //        requiredLogin: true,
            //        permission: 'speler'
            //    }
            //})
            .when('/wedstrijd/:_id/spelers/:sub', {
                templateUrl: 	'match/views/match-single-modules-player.html',
                access: {
                    requiredLogin: true,
                    permission: 'speler'
                }
            })
            .when('/wedstrijd/:_id/:slug?', {
                templateUrl: 	'match/views/match-single-modules.html',
                access: {
                    requiredLogin: true,
                    permission: 'speler'
                }
            });
    });