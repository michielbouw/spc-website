angular.module('mainapp.pageClubadmin')
    .directive('clubadmincontent', function ($timeout) {
        return {
            templateUrl: 'page-clubadmin/views/clubadmin-content.html',
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
                        $(function () {
                            $('[data-toggle="tooltip"]').tooltip();
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
                        $('#nav-sub a[href="#users"]').tab('show');

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
    .directive('usereditcontent', function ($timeout) {
        return {
            templateUrl: 'page-clubadmin/views/clubadmin-useredit-content.html',
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