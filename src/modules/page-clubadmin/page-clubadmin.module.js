angular.module('mainapp.pageClubadmin', [])
    .config(function($routeProvider)
    {
        $routeProvider
            .when('/beheer', {
                templateUrl: 	'page-user/views/user.html',
                access: {
                    requiredLogin: true,
                    permission: 'club-beheer'
                }
            });
    });