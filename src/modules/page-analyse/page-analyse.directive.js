angular.module('mainapp.pageAnalyse')
    .directive('analysecontent', function ($timeout) {
        return {
            templateUrl: 'page-analyse/views/analyse-content.html',
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
                    });
                }, 100);
            }
        };
    });