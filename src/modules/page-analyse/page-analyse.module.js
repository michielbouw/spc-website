angular.module('mainapp.pageAnalyse', [])
    .config(function($routeProvider)
    {
        $routeProvider
            .when('/analyse', {
                templateUrl: 	'page-analyse/views/analyse.html',
                access: {
                    requiredLogin: true,
                    permission: 'speler'
                }
            });
    });