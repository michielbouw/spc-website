angular.module('mainapp.club')
    .directive('clubcontent', function ($rootScope, $timeout) {
        return {
            templateUrl: 'club/views/club-content.html',
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

                        $(function () {
                            $('[data-toggle="tooltip"]').tooltip();
                        });
                    });
                }, 0);
            }
        };
    })
    .directive('statssliderclub', function ($timeout) {
        return {
            restrict: "E",
            scope: {
                model: "="
            },
            replace: true,
            template: "<div class=\"slider-control\">\n<div class=\"slider\">\n</div>\n</div>",
            link: function (scope, element, attrs) {
                $timeout(function () {
                    $('.slider-control .slider').slider({
                        range: true,
                        min: 1,
                        max: 38,
                        step: 1,
                        values: scope.model,
                        slide: function( event, ui ) {
                            event.stopPropagation();
                            scope.$apply(function() {
                                scope.model = ui.values;
                            });
                        }
                    });
                }, 200);
            }
        };
    });