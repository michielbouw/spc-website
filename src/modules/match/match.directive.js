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
                    });
                }, 0);
            }
        };
    })
    .directive('matchsingletop', function ($timeout) {
        return {
            templateUrl: 'match/views/match-single-top.html',
            link: function(scope, element, attrs) {
                $timeout(function () {
                    angular.element(document).ready(function () {
                        $('.navbar-sub').css({
                            'height': window.innerHeight - 185
                        });
                        $('.navbar-sub').each(function () {
                            $(this).css('width', $(this).parents('.container').find('.col-md-2').width());
                        });
                        $(function () {
                            $('[data-toggle="tooltip"]').tooltip();
                        });

                        jQuery(document).ready(function() {
                            var sOffset = $(".content-top").offset().top;
                            $(window).scroll(function () {
                                var scrollYpos = $(document).scrollTop();
                                if (scrollYpos > sOffset) {
                                    $(".page-top").css({
                                        'position': 'fixed',
                                        'padding-top': '0px',
                                        'background-color': '#ffffff',
                                        'border-bottom': '1px solid #ddd',
                                        '-webkit-box-shadow': '0px 2px 5px rgba(0,0,0,0.2)',
                                        '-moz-box-shadow': '0px 2px 5px rgba(0,0,0,0.2)',
                                        'box-shadow': '0px 2px 5px rgba(0,0,0,0.2)'
                                    });
                                    $('.page-content').css('margin-top', 260);
                                    $(".content-top").css({
                                        'border': 'none'
                                    });
                                    $('.navbar-sub').css({
                                        'top': '140px',
                                        'height': window.innerHeight - 250
                                    });
                                    $("#match-select").hide();
                                    $("#match-info").hide();
                                    $("#match-info-short").show();
                                } else {
                                    $("#match-info").show();
                                    $("#match-info-short").hide();
                                    $("#match-select").show();
                                    $(".page-top").css({
                                        'position': 'relative',
                                        'padding-top': '10px',
                                        'background-color': 'transparent',
                                        'border-bottom': 'none',
                                        '-webkit-box-shadow': 'none',
                                        '-moz-box-shadow': 'none',
                                        'box-shadow': 'none'
                                    });
                                    $(".page-content").css({
                                        'margin-top': '10px'
                                    });
                                    $(".content-top").css({
                                        'border': '1px solid #ddd',
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
    .directive('matchsinglecontent', function ($timeout) {
        return {
            templateUrl: 'match/views/match-single-content.html',
            link: function(scope, element, attrs) {
                $timeout(function () {
                    angular.element(document).ready(function () {
                        $('body').css('background-color', '#E7EAF1');

                        scope.lineup_field_height = $('.content.content-top').find('.col-xs-12').width() / 12 * 5 * 0.78 - 25;

                        $timeout(function() {
                            scope.lineup_field_height = $('.content#home').find('.lineup_field#lineup_size').width() * 0.78;
                        }, 200);

                        $('#nav-sub a[role="tab"]').click(function (e) {
                            e.preventDefault();
                            $(this).tab('show');
                            $timeout(function() {
                                scope.lineup_field_height = $('.content#home').find('.lineup_field#lineup_size').width() * 0.78;
                                scope.lineup_field_height2 = $('.content#players').find('.lineup_field#lineup_size').width() * 0.78;
                                scope.position_field_height = $('.content#team').find('.positions_field#positions_size').width() * 106 / 68;
                                scope.passes_zone_field_height = $('.content#team').find('.passes_zone_field#passes_zone_size').width() * 106 / 68 - 20 - 75;
                                scope.passes_zone_field_width = $('.content#team').find('.passes_zone_field#passes_zone_size').width();
                                scope.location_duels_field_height = $('.content#players').find('.location_duels_field#location_duels_size').width() * 106 / 68;
                                scope.location_duels_field_width = $('.content#players').find('.location_duels_field#location_duels_size').width();
                                scope.location_duels_half_field_height = $('.content#players').find('.location_duels_field#location_duels_half_size').width() * 106 / 68 / 2;
                            }, 200);
                        });
                        $('#nav-sub-mobile a[role="tab"]').click(function (e) {
                            e.preventDefault();
                            $(this).tab('show');
                            $timeout(function() {
                                scope.lineup_field_height = $('.content#home').find('.lineup_field#lineup_size').width() * 0.78;
                                scope.lineup_field_height2 = $('.content#players').find('.lineup_field#lineup_size').width() * 0.78;
                                scope.position_field_height = $('.content#team').find('.positions_field#positions_size').width() * 106 / 68;
                                scope.passes_zone_field_height = $('.content#team').find('.passes_zone_field#passes_zone_size').width() * 106 / 68 - 20 - 75;
                                scope.passes_zone_field_width = $('.content#team').find('.passes_zone_field#passes_zone_size').width();
                                scope.location_duels_field_height = $('.content#players').find('.location_duels_field#location_duels_size').width() * 106 / 68;
                                scope.location_duels_field_width = $('.content#players').find('.location_duels_field#location_duels_size').width();
                                scope.location_duels_half_field_height = $('.content#players').find('.location_duels_field#location_duels_half_size').width() * 106 / 68 / 2;
                            }, 200);
                        });

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
                                scope.location_duels_field_height = $('.content#players').find('.location_duels_field#location_duels_size').width() * 106 / 68;
                                scope.location_duels_field_width = $('.content#players').find('.location_duels_field#location_duels_size').width();
                                scope.location_duels_half_field_height = $('.content#players').find('.location_duels_field#location_duels_half_size').width() * 106 / 68 / 2;
                            }, 600);
                        });
                        $('#speler_accordion2').on('shown.bs.collapse', function (e) {
                            var offset = $('.panel > .panel-collapse.in').prev('#speler_accordion2 .panel-heading');
                            if(offset) {
                                $('html,body').animate({
                                    scrollTop: $(offset).offset().top - 135
                                }, 500);
                            }
                            $timeout(function() {
                                scope.location_duels_field_height = $('.content#players').find('.location_duels_field#location_duels_size').width() * 106 / 68;
                                scope.location_duels_field_width = $('.content#players').find('.location_duels_field#location_duels_size').width();
                                scope.location_duels_half_field_height = $('.content#players').find('.location_duels_field#location_duels_half_size').width() * 106 / 68 / 2;
                            }, 600);
                        });

                    });
                }, 200);
            }
        };
    });