angular.module('mainapp.pageIndex', [])
    .config(function($routeProvider)
    {
        $routeProvider
            .when('/', {
                templateUrl: 	'page-index/views/page-index.html',
                access: {
                    requiredLogin: false,
                    permission: 'public'
                }
            })
            .when('/over', {
                templateUrl: 	'page-index/views/over.html',
                access: {
                    requiredLogin: false,
                    permission: 'public'
                }
            })
            .when('/contact', {
                templateUrl: 	'page-index/views/contact.html',
                access: {
                    requiredLogin: false,
                    permission: 'public'
                }
            })
            .when('/disclaimer', {
                templateUrl: 	'page-index/views/disclaimer.html',
                access: {
                    requiredLogin: false,
                    permission: 'public'
                }
            });
    });