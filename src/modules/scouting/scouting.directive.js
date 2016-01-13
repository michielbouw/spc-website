angular.module('mainapp.scouting')
    //.directive('scoutingcontent', function ($timeout) {
    //    return {
    //        templateUrl: 'scouting/views/scouting-content.html',
    //        link: function(scope, element, attrs) {
    //            $timeout(function () {
    //                angular.element(document).ready(function () {
    //                    $('.navbar-sub').css({
    //                        'height': window.innerHeight - 75 - 100
    //                    });
    //                    $('.navbar-sub').each(function () {
    //                        $(this).css('width', $(this).parents('.container').find('.col-md-2').width());
    //                    });
    //                    $('body').css('background-color', '#E7EAF1');
    //
    //                    $('.content-players-left-overview .image').each(function () {
    //                        $(this).css('height', $(this).width() * 1.5 + 30);
    //                    });
    //
    //                    $('.menu-left-button button[data-toggle="offcanvas"]').click(function() {
    //                        $('#wrapper .page-content .content.content-page').toggleClass('active');
    //                        $('.menu-left-button button[data-toggle="offcanvas"] .fa-chevron-right').toggle();
    //                        $('.menu-left-button button[data-toggle="offcanvas"] .fa-chevron-left').toggle();
    //                        $('.page-top .col-md-2.sidebar-offcanvas').toggle();
    //                    });
    //                });
    //            }, 0);
    //        }
    //    };
    //})
    .directive('scoutingsinglecontent', function ($rootScope, $timeout) {
        return {
            templateUrl: 'scouting/views/scouting-single-content.html',
            link: function(scope, element, attrs) {
                $timeout(function () {
                    angular.element(document).ready(function () {
                        //$timeout(function() {
                        //    $('body').css('background-color', $rootScope.currentClub.colors[0].refcode);
                        //    $('.intro-box').css('background-color', $rootScope.currentClub.colors[0].refcode);
                        //}, 400);

                        $('.content.content-page').css({
                            'min-height': window.innerHeight - 100
                        });

                        $('.content.content-page .content-players-left').css({
                            'min-height': $('.content.content-page #content-players-main').height()
                        });

                        $timeout(function() {
                            $('.content.content-page .content-players.choose-player').css({
                                'margin-top': ($('.content.content-page .content-players-left').height() / 2) - 95
                            });
                            $('.content.content-page .content-players.choose-player').effect('shake', {times:1, distance:10}, 2000);
                        }, 1000);

                        $(function () {
                            $('[data-toggle="tooltip"]').tooltip();
                        });
                    });
                }, 0);
            }
        };
    });
    //.directive('statssliderscouting', function ($timeout) {
    //    return {
    //        restrict: "E",
    //        scope: {
    //            model: "="
    //        },
    //        replace: true,
    //        template: "<div class=\"slider-control\">\n<div class=\"slider\">\n</div>\n</div>",
    //        link: function (scope, element, attrs) {
    //            $timeout(function () {
    //                $('.slider-control .slider').slider({
    //                    range: true,
    //                    min: 1,
    //                    max: 38,
    //                    step: 1,
    //                    values: scope.model,
    //                    slide: function( event, ui ) {
    //                        event.stopPropagation();
    //                        scope.$apply(function() {
    //                            scope.model = ui.values;
    //                        });
    //                    }
    //                });
    //            }, 200);
    //        }
    //    };
    //});