angular.module('mainapp.match')
    .directive('matchtop', function ($timeout) {
        return {
            templateUrl: 'match/views/match-top.html',
            link: function(scope, element, attrs) {
                $timeout(function () {
                    angular.element(document).ready(function () {
                        $('.navbar-sub').css({
                            'height': window.innerHeight - 185
                        });
                        $('.navbar-sub').each(function () {
                            $(this).css('width', $(this).parents('.container').find('.col-md-2').width());
                        });

                        $('.menu-left-button button[data-toggle="offcanvas"]').click(function() {
                            $('#wrapper .page-top .content.content-top').toggleClass('active');
                            $('.menu-left-button button[data-toggle="offcanvas"] .fa-chevron-right').toggle();
                            $('.menu-left-button button[data-toggle="offcanvas"] .fa-chevron-left').toggle();
                            $('.col-md-2.sidebar-offcanvas').toggle();
                        });
                    });
                }, 0);
            }
        };
    })
    //.directive('matchsingletop', function ($timeout) {
    //    return {
    //        templateUrl: 'match/views/match-single-top.html',
    //        link: function(scope, element, attrs) {
    //            $timeout(function () {
    //                angular.element(document).ready(function () {
    //                    $('body').css('background-color', '#E7EAF1');
    //
    //                    $('.navbar-sub').css({
    //                        'height': window.innerHeight - 185
    //                    });
    //                    $('.navbar-sub').each(function () {
    //                        $(this).css('width', $(this).parents('.container').find('.col-md-2').width());
    //                    });
    //                    $(function () {
    //                        $('[data-toggle="tooltip"]').tooltip();
    //                    });
    //
    //                    $('.menu-left-button button[data-toggle="offcanvas"]').click(function() {
    //                        $('#wrapper .page-top .content.content-top').toggleClass('active');
    //                        $('#wrapper .page-content .content.tab-pane').toggleClass('menuopen');
    //                        $('.menu-left-button button[data-toggle="offcanvas"] .fa-chevron-right').toggle();
    //                        $('.menu-left-button button[data-toggle="offcanvas"] .fa-chevron-left').toggle();
    //                        $('.page-top .col-md-2.sidebar-offcanvas').toggle();
    //                    });
    //
    //                    jQuery(document).ready(function() {
    //                        var sOffset = $(".content-top.content-top-match").offset().top;
    //                        $(window).scroll(function () {
    //                            var scrollYpos = $(document).scrollTop();
    //                            if (scrollYpos > sOffset) {
    //                                $(".page-top.page-top-match").css({
    //                                    'position': 'fixed',
    //                                    'padding-top': '0px',
    //                                    //'background-color': '#ffffff',
    //                                    'background-color': '#1d8acf',
    //                                    //'border-bottom': '1px solid #ddd',
    //                                    '-webkit-box-shadow': '0px 2px 5px rgba(0,0,0,0.2)',
    //                                    '-moz-box-shadow': '0px 2px 5px rgba(0,0,0,0.2)',
    //                                    'box-shadow': '0px 2px 5px rgba(0,0,0,0.2)'
    //                                });
    //                                $('.page-content.page-content-match').css('margin-top', 240);
    //                                $(".content-top").css({
    //                                    'border': 'none'
    //                                });
    //                                $('.navbar-sub').css({
    //                                    'top': '140px',
    //                                    'height': window.innerHeight - 250
    //                                });
    //                                $("#match-select").hide();
    //                                $("#match-info").hide();
    //                                $("#match-info-short").show();
    //                            } else {
    //                                $("#match-info").show();
    //                                $("#match-info-short").hide();
    //                                $("#match-select").show();
    //                                $(".page-top.page-top-match").css({
    //                                    'position': 'relative',
    //                                    'padding-top': '20px',
    //                                    'background-color': 'transparent',
    //                                    'border-bottom': 'none',
    //                                    '-webkit-box-shadow': 'none',
    //                                    '-moz-box-shadow': 'none',
    //                                    'box-shadow': 'none'
    //                                });
    //                                $(".page-content.page-content-match").css({
    //                                    'margin-top': '0'
    //                                });
    //                                $(".content-top").css({
    //                                    //'border': '1px solid #ddd',
    //                                    'border-top': 'none'
    //                                });
    //                                $('.navbar-sub').css({
    //                                    'top': '75px',
    //                                    'height': window.innerHeight - 185
    //                                });
    //                            }
    //                        });
    //                    });
    //                });
    //            }, 100);
    //        }
    //    };
    //})
    //.directive('matchsinglecontent', function ($timeout) {
    //    return {
    //        templateUrl: 'match/views/match-single-content.html',
    //        link: function(scope, element, attrs) {
    //            $timeout(function () {
    //                angular.element(document).ready(function () {
    //                    $('body').css('background-color', '#E7EAF1');
    //
    //                    scope.lineup_field_height = $('.content.content-top').find('.col-xs-12').width() / 12 * 5 * 0.78 - 25;
    //
    //                    $timeout(function() {
    //                        scope.lineup_field_height = $('.content#home').find('.lineup_field#lineup_size').width() * 0.78;
    //                    }, 200);
    //
    //                    $('#nav-sub a[role="tab"]').click(function (e) {
    //                        e.preventDefault();
    //                        $(this).tab('show');
    //                        $timeout(function() {
    //                            scope.lineup_field_height = $('.content#home').find('.lineup_field#lineup_size').width() * 0.78;
    //                            scope.lineup_field_height2 = $('.content#players').find('.lineup_field#lineup_size').width() * 0.78;
    //                            scope.position_field_height = $('.content#team').find('.positions_field#positions_size').width() * 106 / 68;
    //                            scope.position_half_field_height = $('.content#team').find('.positions_field#positions_half_size').width() * 106 / 68 / 2;
    //                            scope.passes_zone_field_height = $('.content#team').find('.passes_zone_field#passes_zone_size').width() * 106 / 68 - 20 - 75;
    //                            scope.passes_zone_field_width = $('.content#team').find('.passes_zone_field#passes_zone_size').width();
    //                            scope.location_duels_field_height = $('.content#players').find('.location_duels_field#location_duels_size').width() * 106 / 68;
    //                            scope.location_duels_field_width = $('.content#players').find('.location_duels_field#location_duels_size').width();
    //                            scope.location_duels_half_field_height = $('.content#players').find('.location_duels_field#location_duels_half_size').width() * 106 / 68 / 2;
    //                        }, 200);
    //
    //                        if ($('#wrapper .page-top .content.content-top').hasClass('active')) {
    //                            $('#wrapper .page-top .content.content-top').removeClass('active');
    //                            $('#wrapper .page-content .content.tab-pane').removeClass('menuopen');
    //                            $('.menu-left-button button[data-toggle="offcanvas"] .fa-chevron-right').show();
    //                            $('.menu-left-button button[data-toggle="offcanvas"] .fa-chevron-left').hide();
    //                            $('.page-top .col-md-2.sidebar-offcanvas').hide();
    //                        }
    //                    });
    //
    //                    $('.content#duelmatrix div#choosehalfduelmatrix button').click(function (e) {
    //                        e.preventDefault();
    //                        $(this).tab('show');
    //                    });
    //
    //                    $('.content#passmatrix div#choosehalfpassmatrix button').click(function (e) {
    //                        e.preventDefault();
    //                        $(this).tab('show');
    //                    });
    //
    //                    $('#speler_accordion').on('shown.bs.collapse', function (e) {
    //                        var offset = $('.panel > .panel-collapse.in').prev('#speler_accordion .panel-heading');
    //                        if(offset) {
    //                            $('html,body').animate({
    //                                scrollTop: $(offset).offset().top - 135
    //                            }, 500);
    //                        }
    //                        //$timeout(function() {
    //                        //    scope.location_duels_field_height = $('.content#players').find('.location_duels_field#location_duels_size').width() * 106 / 68;
    //                        //    scope.location_duels_field_width = $('.content#players').find('.location_duels_field#location_duels_size').width();
    //                        //    scope.location_duels_half_field_height = $('.content#players').find('.location_duels_field#location_duels_half_size').width() * 106 / 68 / 2;
    //                        //}, 500);
    //                    });
    //                    $('#speler_accordion2').on('shown.bs.collapse', function (e) {
    //                        var offset = $('.panel > .panel-collapse.in').prev('#speler_accordion2 .panel-heading');
    //                        if(offset) {
    //                            $('html,body').animate({
    //                                scrollTop: $(offset).offset().top - 135
    //                            }, 500);
    //                        }
    //                        //$timeout(function() {
    //                        //    scope.location_duels_field_height = $('.content#players').find('.location_duels_field#location_duels_size').width() * 106 / 68;
    //                        //    scope.location_duels_field_width = $('.content#players').find('.location_duels_field#location_duels_size').width();
    //                        //    scope.location_duels_half_field_height = $('.content#players').find('.location_duels_field#location_duels_half_size').width() * 106 / 68 / 2;
    //                        //}, 500);
    //                    });
    //
    //                });
    //            }, 100);
    //        }
    //    };
    //})
    .directive('matchsinglemodulestop', function ($timeout) {
        return {
            templateUrl: 'match/views/match-single-modules-top.html',
            link: function(scope, element, attrs) {
                $timeout(function () {
                    angular.element(document).ready(function () {
                        $('body').css('background-color', '#E7EAF1');

                        $('.navbar-sub').css({
                            'height': window.innerHeight - 185
                        });
                        $('.navbar-sub').each(function () {
                            $(this).css('width', $(this).parents('.container').find('.col-md-2').width());
                        });
                        $(function () {
                            $('[data-toggle="tooltip"]').tooltip();
                        });

                        $('.menu-left-button button[data-toggle="offcanvas"]').click(function() {
                            $('#wrapper .page-top .content.content-top').toggleClass('active');
                            $('#wrapper .page-content .content').toggleClass('menuopen');
                            $('.menu-left-button button[data-toggle="offcanvas"] .fa-chevron-right').toggle();
                            $('.menu-left-button button[data-toggle="offcanvas"] .fa-chevron-left').toggle();
                            $('.page-top .col-md-2.sidebar-offcanvas').toggle();
                        });

                        jQuery(document).ready(function() {
                            var sOffset = $(".content-top.content-top-match").offset().top;
                            $(window).scroll(function () {
                                var scrollYpos = $(document).scrollTop();
                                if (scrollYpos > sOffset) {
                                    $(".page-top.page-top-match").css({
                                        'position': 'fixed',
                                        'padding-top': '0px',
                                        //'background-color': '#ffffff',
                                        'background-color': '#1d8acf',
                                        //'border-bottom': '1px solid #ddd',
                                        '-webkit-box-shadow': '0px 2px 5px rgba(0,0,0,0.2)',
                                        '-moz-box-shadow': '0px 2px 5px rgba(0,0,0,0.2)',
                                        'box-shadow': '0px 2px 5px rgba(0,0,0,0.2)',
                                        //'margin-top': '5px'
                                        'margin-top': '0px'
                                    });
                                    $('.page-content.page-content-match').css('margin-top', 170);
                                    $(".content-top").css({
                                        'border': 'none'
                                    });
                                    $('.navbar-sub').css({
                                        //'top': '140px',
                                        'height': window.innerHeight - 185
                                    });
                                    $(".navbar-match .navbar.navbar-default.navbar-fixed-top").css('top', -65);
                                    $(".menu-left-button").css('top', -65);
                                    $("#match-select").hide();
                                    $("#match-info").hide();
                                    $("#match-info-short").show();
                                } else {
                                    $(".navbar-match .navbar.navbar-default.navbar-fixed-top").css('top', 0);
                                    $(".menu-left-button").css('top', 0);
                                    $("#match-info").show();
                                    $("#match-info-short").hide();
                                    $("#match-select").show();
                                    $(".page-top.page-top-match").css({
                                        'position': 'relative',
                                        'padding-top': '20px',
                                        'background-color': 'transparent',
                                        'border-bottom': 'none',
                                        '-webkit-box-shadow': 'none',
                                        '-moz-box-shadow': 'none',
                                        'box-shadow': 'none',
                                        'margin-top': '65px'
                                    });
                                    $(".page-content.page-content-match").css({
                                        'margin-top': '0'
                                    });
                                    $(".content-top").css({
                                        //'border': '1px solid #ddd',
                                        'border-top': 'none'
                                    });
                                    $('.navbar-sub').css({
                                        'top': '75px',
                                        'height': window.innerHeight - 185
                                    });
                                }
                            });
                        });
                    });
                }, 100);
            }
        };
    })
    .directive('matchsinglemodulescontent', function ($timeout) {
        return {
            templateUrl: 'match/views/match-single-modules-content.html',
            link: function(scope, element, attrs) {
                $timeout(function () {
                    angular.element(document).ready(function () {
                        $('body').css('background-color', '#E7EAF1');

                        scope.lineup_field_height = $('.content.content-top').find('.col-xs-12').width() / 12 * 5 * 0.78 - 25;

                        $timeout(function() {
                            scope.lineup_field_height = $('.content#home').find('.lineup_field#lineup_size').width() * 0.78;
                        }, 200);

                        $('#nav-sub a.tab').click(function (e) {
                            //e.preventDefault();
                            //$(this).tab('show');
                            $timeout(function() {
                                scope.lineup_field_height = $('.content#home').find('.lineup_field#lineup_size').width() * 0.78;
                                scope.lineup_field_height2 = $('.content#players').find('.lineup_field#lineup_size').width() * 0.78;
                                //scope.position_field_height = $('.content#team').find('.positions_field#positions_size').width() * 106 / 68;
                                //scope.position_field_width = $('.content#team').find('.positions_field#positions_hor_size').width() * 68 / 106;
                                //scope.position_half_field_height = $('.content#team').find('.positions_field#positions_half_size').width() * 106 / 68 / 2;
                                scope.passes_zone_field_height = $('.content#team').find('.passes_zone_field#passes_zone_size').width() * 106 / 68 - 20 - 75;
                                scope.passes_zone_field_width = $('.content#team').find('.passes_zone_field#passes_zone_size').width();
                                //scope.overtredingen_field_height = $('.content#team').find('.overtredingen_field#overtredingen_size').width() * 106 / 68;
                                scope.location_duels_field_height = $('.content#players').find('div.collapse.in .location_duels_field#location_duels_size').width() * 106 / 68;
                                scope.location_duels_field_width = $('.content#players').find('div.collapse.in .location_duels_field#location_duels_size').width();
                                scope.location_duels_half_field_height = $('.content#players').find('div.collapse.in .location_duels_field#location_duels_half_size').width() * 106 / 68 / 2;
                            }, 500);

                            if ($('#wrapper .page-top .content.content-top').hasClass('active')) {
                                $('#wrapper .page-top .content.content-top').removeClass('active');
                                $('#wrapper .page-content .content').removeClass('menuopen');
                                $('.menu-left-button button[data-toggle="offcanvas"] .fa-chevron-right').show();
                                $('.menu-left-button button[data-toggle="offcanvas"] .fa-chevron-left').hide();
                                $('.page-top .col-md-2.sidebar-offcanvas').hide();
                            }
                        });

                        $timeout(function() {
                            scope.lineup_field_height = $('.content#home').find('.lineup_field#lineup_size').width() * 0.78;
                            scope.lineup_field_height2 = $('.content#players').find('.lineup_field#lineup_size').width() * 0.78;
                            //scope.position_field_height = $('.content#team').find('.positions_field#positions_size').width() * 106 / 68;
                            //scope.position_field_width = $('.content#team').find('.positions_field#positions_hor_size').width() * 68 / 106;
                            //scope.position_half_field_height = $('.content#team').find('.positions_field#positions_half_size').width() * 106 / 68 / 2;
                            scope.passes_zone_field_height = $('.content#team').find('.passes_zone_field#passes_zone_size').width() * 106 / 68 - 20 - 75;
                            scope.passes_zone_field_width = $('.content#team').find('.passes_zone_field#passes_zone_size').width();
                            //scope.overtredingen_field_height = $('.content#team').find('.overtredingen_field#overtredingen_size').width() * 106 / 68;
                            scope.location_duels_field_height = $('.content#players').find('div.collapse.in .location_duels_field#location_duels_size').width() * 106 / 68;
                            scope.location_duels_field_width = $('.content#players').find('div.collapse.in .location_duels_field#location_duels_size').width();
                            scope.location_duels_half_field_height = $('.content#players').find('div.collapse.in .location_duels_field#location_duels_half_size').width() * 106 / 68 / 2;

                            $('.content#team').find('.avg_positions_field#avg_positions_field_hor_size #avg_positions_field').css({
                                'height': (($('.content#team').find('.avg_positions_field#avg_positions_field_hor_size').width() - 2) * 68 / 106).toFixed(0),
                                'width': ($('.content#team').find('.avg_positions_field#avg_positions_field_hor_size').width() - 2).toFixed(0)
                            });
                            $('.content#team').find('.doelpogingen_field#doelpogingen_field_hor_size #doelpogingen_field').css({
                                'height': (($('.content#team').find('.doelpogingen_field#doelpogingen_field_hor_size').width() - 2) * 68 / 106).toFixed(0),
                                'width': ($('.content#team').find('.doelpogingen_field#doelpogingen_field_hor_size').width() - 2).toFixed(0)
                            });
                            $('.content#team').find('.overtredingen_field#overtredingen_field_hor_size #overtredingen_field').css({
                                'height': (($('.content#team').find('.overtredingen_field#overtredingen_field_hor_size').width() - 2) * 68 / 106).toFixed(0),
                                'width': ($('.content#team').find('.overtredingen_field#overtredingen_field_hor_size').width() - 2).toFixed(0)
                            });
                        }, 500);

                        $('.content#duelmatrix div#choosehalfduelmatrix button').click(function (e) {
                            e.preventDefault();
                            $(this).tab('show');
                        });

                        $('.content#passmatrix div#choosehalfpassmatrix button').click(function (e) {
                            e.preventDefault();
                            $(this).tab('show');
                        });

                        $('#speler_accordion').on('shown.bs.collapse', function (e) {
                            var offset = $('.panel > .panel-collapse.in').prev('#speler_accordion .panel-heading');
                            if(offset) {
                                $('html,body').animate({
                                    scrollTop: $(offset).offset().top - 135
                                }, 500);
                            }
                            $timeout(function() {
                                scope.location_duels_field_height = $('.content#players').find('div.collapse.in .location_duels_field#location_duels_size').width() * 106 / 68;
                                scope.location_duels_field_width = $('.content#players').find('div.collapse.in .location_duels_field#location_duels_size').width();
                                scope.location_duels_half_field_height = $('.content#players').find('div.collapse.in .location_duels_field#location_duels_half_size').width() * 106 / 68 / 2;
                            }, 500);
                        });
                        $('#speler_accordion2').on('shown.bs.collapse', function (e) {
                            var offset = $('.panel > .panel-collapse.in').prev('#speler_accordion2 .panel-heading');
                            if(offset) {
                                $('html,body').animate({
                                    scrollTop: $(offset).offset().top - 135
                                }, 500);
                            }
                            $timeout(function() {
                                scope.location_duels_field_height = $('.content#players').find('div.collapse.in .location_duels_field#location_duels_size').width() * 106 / 68;
                                scope.location_duels_field_width = $('.content#players').find('div.collapse.in .location_duels_field#location_duels_size').width();
                                scope.location_duels_half_field_height = $('.content#players').find('div.collapse.in .location_duels_field#location_duels_half_size').width() * 106 / 68 / 2;
                            }, 500);
                        });

                    });
                }, 100);
            }
        };
    })
    .directive('matchsinglemodulescontentplayer', function ($timeout) {
        return {
            templateUrl: 'match/views/match-single-modules-content-player.html',
            link: function(scope, element, attrs) {
                $timeout(function () {
                    angular.element(document).ready(function () {
                        $('body').css('background-color', '#E7EAF1');

                        $('#nav-sub a.tab').click(function (e) {
                            //e.preventDefault();
                            //$(this).tab('show');
                            $timeout(function() {
                                scope.lineup_field_height = $('.content#home').find('.lineup_field#lineup_size').width() * 0.78;
                                scope.lineup_field_height2 = $('.content#players').find('.lineup_field#lineup_size').width() * 0.78;
                                scope.position_field_height = $('.content#team').find('.positions_field#positions_size').width() * 106 / 68;
                                scope.passes_zone_field_height = $('.content#team').find('.passes_zone_field#passes_zone_size').width() * 106 / 68 - 20 - 75;
                                scope.passes_zone_field_width = $('.content#team').find('.passes_zone_field#passes_zone_size').width();
                                scope.location_duels_field_height = $('.content#players').find('.player_single_content .location_duels_field#location_duels_size').width() * 106 / 68;
                                scope.location_duels_field_width = $('.content#players').find('.player_single_content .location_duels_field#location_duels_size').width();
                                scope.location_duels_half_field_height = $('.content#players').find('.player_single_content .location_duels_field#location_duels_half_size').width() * 106 / 68 / 2;
                            }, 500);

                            if ($('#wrapper .page-top .content.content-top').hasClass('active')) {
                                $('#wrapper .page-top .content.content-top').removeClass('active');
                                $('#wrapper .page-content .content.tab-pane').removeClass('menuopen');
                                $('.menu-left-button button[data-toggle="offcanvas"] .fa-chevron-right').show();
                                $('.menu-left-button button[data-toggle="offcanvas"] .fa-chevron-left').hide();
                                $('.page-top .col-md-2.sidebar-offcanvas').hide();
                            }
                        });

                        $timeout(function() {
                            scope.location_duels_field_height = $('.content#players').find('.player_single_content .location_duels_field#location_duels_size').width() * 106 / 68;
                            scope.location_duels_field_width = $('.content#players').find('.player_single_content .location_duels_field#location_duels_size').width();
                            scope.location_duels_half_field_height = $('.content#players').find('.player_single_content .location_duels_field#location_duels_half_size').width() * 106 / 68 / 2;
                        }, 500);
                    });
                }, 100);
            }
        };
    });