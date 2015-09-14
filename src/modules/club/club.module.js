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
    })
    .filter('range', function() {
        return function(input, total) {
            total = parseInt(total);
            for (var i=0; i < total; ++i) {
                input.push(i);
            }
            return input;
        };
    });