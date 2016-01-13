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
                    requiredLogin: true,
                    //permission: 'public'
                    permission: 'admin'
                }
            })
            .when('/getaccount', {
                templateUrl: 	'member-auth/views/getaccount.html',
                access: {
                    requiredLogin: false,
                    permission: 'public'
                }
            })
            .when('/activate/user/:token', {
                templateUrl: 	'member-auth/views/activated.html',
                access: {
                    requiredLogin: false,
                    permission: 'public'
                }
            })
            .when('/forgot', {
                templateUrl: 	'member-auth/views/forgot.html',
                access: {
                    requiredLogin: false,
                    permission: 'public'
                }
            })
            .when('/reset/:token', {
                templateUrl: 	'member-auth/views/passwordreset.html',
                access: {
                    requiredLogin: false,
                    permission: 'public'
                }
            });
    });