angular.module('mainapp.pageAdmin')
    .directive('admincontent', function ($timeout) {
        return {
            templateUrl: 'page-admin/views/admin-content.html',
            link: function(scope, element, attrs) {
                $timeout(function () {
                    angular.element(document).ready(function () {
                        $('.navbar-sub').css({
                            'height': window.innerHeight - 75 - 100
                        });
                        $('.navbar-sub').each(function () {
                            $(this).css('width', $(this).parents('.container').find('.col-md-2').width());
                        });
                        $('body').css('background-color', '#E7EAF1');
                        $('.content.content-page').css({
                            'min-height': window.innerHeight - 100
                        });
                        $('#nav-sub a').click(function (e) {
                            e.preventDefault();
                            $(this).tab('show');
                        });
                        $('#nav-sub a[href="#status"]').tab('show');
                    });
                }, 100);
            }
        };
    })
    .directive('adminclubscontent', function ($timeout) {
        return {
            templateUrl: 'page-admin/views/admin-clubs-content.html',
            link: function(scope, element, attrs) {
                $timeout(function () {
                    angular.element(document).ready(function () {
                        $('.navbar-sub').css({
                            'height': window.innerHeight - 75 - 100
                        });
                        $('.navbar-sub').each(function () {
                            $(this).css('width', $(this).parents('.container').find('.col-md-2').width());
                        });
                        $('body').css('background-color', '#E7EAF1');
                        $('.content.content-page').css({
                            'min-height': window.innerHeight - 95
                        });
                    });
                }, 100);
            }
        };
    })
    .directive('adminclubseditcontent', function ($timeout) {
        return {
            templateUrl: 'page-admin/views/admin-clubs-edit-content.html',
            link: function(scope, element, attrs) {
                $timeout(function () {
                    angular.element(document).ready(function () {
                        $('.navbar-sub').css({
                            'height': window.innerHeight - 75 - 100
                        });
                        $('.navbar-sub').each(function () {
                            $(this).css('width', $(this).parents('.container').find('.col-md-2').width());
                        });
                        $('body').css('background-color', '#E7EAF1');
                        $('.content.content-page').css({
                            'min-height': window.innerHeight - 95
                        });
                    });
                }, 100);
            }
        };
    })
    .directive('adminuserscontent', function ($timeout) {
        return {
            templateUrl: 'page-admin/views/admin-users-content.html',
            link: function(scope, element, attrs) {
                $timeout(function () {
                    angular.element(document).ready(function () {
                        $('.navbar-sub').css({
                            'height': window.innerHeight - 75 - 100
                        });
                        $('.navbar-sub').each(function () {
                            $(this).css('width', $(this).parents('.container').find('.col-md-2').width());
                        });
                        $('body').css('background-color', '#E7EAF1');
                        $('.content.content-page').css({
                            'min-height': window.innerHeight - 95
                        });
                    });
                }, 100);
            }
        };
    })
    .directive('adminuserseditcontent', function ($timeout) {
        return {
            templateUrl: 'page-admin/views/admin-users-edit-content.html',
            link: function(scope, element, attrs) {
                $timeout(function () {
                    angular.element(document).ready(function () {
                        $('.navbar-sub').css({
                            'height': window.innerHeight - 75 - 100
                        });
                        $('.navbar-sub').each(function () {
                            $(this).css('width', $(this).parents('.container').find('.col-md-2').width());
                        });
                        $('body').css('background-color', '#E7EAF1');
                        $('.content.content-page').css({
                            'min-height': window.innerHeight - 95
                        });
                    });
                }, 100);
            }
        };
    })
    .directive('adminfanscontent', function ($timeout) {
        return {
            templateUrl: 'page-admin/views/admin-fans-content.html',
            link: function(scope, element, attrs) {
                $timeout(function () {
                    angular.element(document).ready(function () {
                        $('.navbar-sub').css({
                            'height': window.innerHeight - 75 - 100
                        });
                        $('.navbar-sub').each(function () {
                            $(this).css('width', $(this).parents('.container').find('.col-md-2').width());
                        });
                        $('body').css('background-color', '#E7EAF1');
                        $('.content.content-page').css({
                            'min-height': window.innerHeight - 95
                        });
                    });
                }, 100);
            }
        };
    })
    .directive('adminpagescontent', function ($timeout) {
        return {
            templateUrl: 'page-admin/views/admin-pages-content.html',
            link: function(scope, element, attrs) {
                $timeout(function () {
                    angular.element(document).ready(function () {
                        $('.navbar-sub').css({
                            'height': window.innerHeight - 75 - 100
                        });
                        $('.navbar-sub').each(function () {
                            $(this).css('width', $(this).parents('.container').find('.col-md-2').width());
                        });
                        $('body').css('background-color', '#E7EAF1');
                        $('.content.content-page').css({
                            'min-height': window.innerHeight - 95
                        });
                    });
                }, 100);
            }
        };
    })
    .directive('adminuploadscontent', function ($timeout) {
        return {
            templateUrl: 'page-admin/views/admin-uploads-content.html',
            link: function(scope, element, attrs) {
                $timeout(function () {
                    angular.element(document).ready(function () {
                        $('.navbar-sub').css({
                            'height': window.innerHeight - 75 - 100
                        });
                        $('.navbar-sub').each(function () {
                            $(this).css('width', $(this).parents('.container').find('.col-md-2').width());
                        });
                        $('body').css('background-color', '#E7EAF1');
                        $('.content.content-page').css({
                            'min-height': window.innerHeight - 95
                        });
                    });
                }, 100);
            }
        };
    });