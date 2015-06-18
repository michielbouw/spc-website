angular.module('mainapp.pageAdmin', ['textAngular', 'ngFileUpload'])
    .config(function($routeProvider)
    {
        $routeProvider
            .when('/admin', {
                templateUrl: 'page-admin/views/admin.html',
                access: {
                    requiredLogin: true,
                    permission: 'admin'
                }
            })
            .when('/admin/clubs', {
                templateUrl: 'page-admin/views/admin-clubs.html',
                access: {
                    requiredLogin: true,
                    permission: 'admin'
                }
            })
            .when('/admin/clubs/edit', {
                templateUrl: 'page-admin/views/admin-clubs-edit.html',
                access: {
                    requiredLogin: true,
                    permission: 'admin'
                }
            })
            .when('/admin/users', {
                templateUrl: 'page-admin/views/admin-users.html',
                access: {
                    requiredLogin: true,
                    permission: 'admin'
                }
            })
            .when('/admin/users/edit/:_id', {
                templateUrl: 'page-admin/views/admin-users-edit.html',
                access: {
                    requiredLogin: true,
                    permission: 'admin'
                }
            })
            .when('/admin/fans', {
                templateUrl: 'page-admin/views/admin-fans.html',
                access: {
                    requiredLogin: true,
                    permission: 'admin'
                }
            })
            .when('/admin/pages', {
                templateUrl: 'page-admin/views/admin-pages.html',
                access: {
                    requiredLogin: true,
                    permission: 'admin'
                }
            });
    });