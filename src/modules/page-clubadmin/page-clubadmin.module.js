angular.module('mainapp.pageClubadmin', [])
    .config(function($routeProvider)
    {
        $routeProvider
            .when('/beheer', {
                templateUrl: 	'page-clubadmin/views/clubadmin.html',
                access: {
                    requiredLogin: true,
                    permission: 'club-beheer'
                }
            })
            .when('/beheer/useredit/:_id', {
                templateUrl: 	'page-clubadmin/views/clubadmin-useredit.html',
                access: {
                    requiredLogin: true,
                    permission: 'club-beheer'
                }
            });
    });