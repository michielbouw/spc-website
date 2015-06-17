angular.module('mainapp.club', [])
    .config(function($routeProvider)
    {
        $routeProvider
            .when('/club', {
                templateUrl: 	'club/views/club.html',
                access: {
                    requiredLogin: true,
                    permission: 'speler'
                }
            })
            .when('/club/currentclub/currentteam', {
                templateUrl: 	'club/views/club.html',
                access: {
                    requiredLogin: true,
                    permission: 'speler'
                }
            });
    });