angular.module('mainapp.club', [])
    .config(function($routeProvider)
    {
        $routeProvider
            .when('/club/:team_slug?', {
                templateUrl: 	'club/views/club.html',
                access: {
                    requiredLogin: true,
                    permission: 'speler'
                }
            });
    });