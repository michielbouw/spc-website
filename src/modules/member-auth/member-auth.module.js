angular.module('mainapp.memberAuth', [])
    .config(function($routeProvider)
    {
        $routeProvider
            .when('/login', {
                templateUrl: 	'member-auth/views/login.html',
                access: {
                    requiredLogin: false,
                    permission: 'public'
                }
            })
            .when('/signin', {
                templateUrl: 	'member-auth/views/signin.html',
                access: {
                    requiredLogin: false,
                    permission: 'public'
                }
            });
    });