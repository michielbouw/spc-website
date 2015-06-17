angular.module('mainapp.pageUser', [])
    .config(function($routeProvider)
    {
        $routeProvider
            .when('/user', {
                templateUrl: 	'page-user/views/user.html',
                access: {
                    requiredLogin: true,
                    permission: 'speler'
                }
            });
    });