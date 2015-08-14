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

                            if ($('#wrapper .page-content .content.content-page').hasClass('active')) {
                                $('#wrapper .page-content .content.content-page').removeClass('active');
                                $('.menu-left-button button[data-toggle="offcanvas"] .fa-chevron-right').show();
                                $('.menu-left-button button[data-toggle="offcanvas"] .fa-chevron-left').hide();
                                $('.page-top .col-md-2.sidebar-offcanvas').hide();
                            }
                        });
                        $('#nav-sub a[href="#status"]').tab('show');

                        $('.menu-left-button button[data-toggle="offcanvas"]').click(function() {
                            $('#wrapper .page-content .content.content-page').toggleClass('active');
                            $('.menu-left-button button[data-toggle="offcanvas"] .fa-chevron-right').toggle();
                            $('.menu-left-button button[data-toggle="offcanvas"] .fa-chevron-left').toggle();
                            $('.page-top .col-md-2.sidebar-offcanvas').toggle();
                        });
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

                        $('.menu-left-button button[data-toggle="offcanvas"]').click(function() {
                            $('#wrapper .page-content .content.content-page').toggleClass('active');
                            $('.menu-left-button button[data-toggle="offcanvas"] .fa-chevron-right').toggle();
                            $('.menu-left-button button[data-toggle="offcanvas"] .fa-chevron-left').toggle();
                            $('.page-top .col-md-2.sidebar-offcanvas').toggle();
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

                        $('.menu-left-button button[data-toggle="offcanvas"]').click(function() {
                            $('#wrapper .page-content .content.content-page').toggleClass('active');
                            $('.menu-left-button button[data-toggle="offcanvas"] .fa-chevron-right').toggle();
                            $('.menu-left-button button[data-toggle="offcanvas"] .fa-chevron-left').toggle();
                            $('.page-top .col-md-2.sidebar-offcanvas').toggle();
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

                        $('.menu-left-button button[data-toggle="offcanvas"]').click(function() {
                            $('#wrapper .page-content .content.content-page').toggleClass('active');
                            $('.menu-left-button button[data-toggle="offcanvas"] .fa-chevron-right').toggle();
                            $('.menu-left-button button[data-toggle="offcanvas"] .fa-chevron-left').toggle();
                            $('.page-top .col-md-2.sidebar-offcanvas').toggle();
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

                        $('.menu-left-button button[data-toggle="offcanvas"]').click(function() {
                            $('#wrapper .page-content .content.content-page').toggleClass('active');
                            $('.menu-left-button button[data-toggle="offcanvas"] .fa-chevron-right').toggle();
                            $('.menu-left-button button[data-toggle="offcanvas"] .fa-chevron-left').toggle();
                            $('.page-top .col-md-2.sidebar-offcanvas').toggle();
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

                        $('.menu-left-button button[data-toggle="offcanvas"]').click(function() {
                            $('#wrapper .page-content .content.content-page').toggleClass('active');
                            $('.menu-left-button button[data-toggle="offcanvas"] .fa-chevron-right').toggle();
                            $('.menu-left-button button[data-toggle="offcanvas"] .fa-chevron-left').toggle();
                            $('.page-top .col-md-2.sidebar-offcanvas').toggle();
                        });
                    });
                }, 100);
            }
        };
    })
    .directive('adminmatchescontent', function ($timeout) {
        return {
            templateUrl: 'page-admin/views/admin-matches-content.html',
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

                        $('.menu-left-button button[data-toggle="offcanvas"]').click(function() {
                            $('#wrapper .page-content .content.content-page').toggleClass('active');
                            $('.menu-left-button button[data-toggle="offcanvas"] .fa-chevron-right').toggle();
                            $('.menu-left-button button[data-toggle="offcanvas"] .fa-chevron-left').toggle();
                            $('.page-top .col-md-2.sidebar-offcanvas').toggle();
                        });
                    });
                }, 100);
            }
        };
    })
    .directive('adminmatcheseditcontent', function ($timeout) {
        return {
            templateUrl: 'page-admin/views/admin-matches-edit-content.html',
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

                        $('.menu-left-button button[data-toggle="offcanvas"]').click(function() {
                            $('#wrapper .page-content .content.content-page').toggleClass('active');
                            $('.menu-left-button button[data-toggle="offcanvas"] .fa-chevron-right').toggle();
                            $('.menu-left-button button[data-toggle="offcanvas"] .fa-chevron-left').toggle();
                            $('.page-top .col-md-2.sidebar-offcanvas').toggle();
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

                        $('.menu-left-button button[data-toggle="offcanvas"]').click(function() {
                            $('#wrapper .page-content .content.content-page').toggleClass('active');
                            $('.menu-left-button button[data-toggle="offcanvas"] .fa-chevron-right').toggle();
                            $('.menu-left-button button[data-toggle="offcanvas"] .fa-chevron-left').toggle();
                            $('.page-top .col-md-2.sidebar-offcanvas').toggle();
                        });
                    });
                }, 100);
            }
        };
    })
    .directive('adminimportcontent', function ($timeout) {
        return {
            templateUrl: 'page-admin/views/admin-import-content.html',
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

                        $('.menu-left-button button[data-toggle="offcanvas"]').click(function() {
                            $('#wrapper .page-content .content.content-page').toggleClass('active');
                            $('.menu-left-button button[data-toggle="offcanvas"] .fa-chevron-right').toggle();
                            $('.menu-left-button button[data-toggle="offcanvas"] .fa-chevron-left').toggle();
                            $('.page-top .col-md-2.sidebar-offcanvas').toggle();
                        });
                    });
                }, 100);
            }
        };
    });