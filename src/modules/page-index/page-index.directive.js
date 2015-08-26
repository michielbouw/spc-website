angular.module('mainapp.pageIndex')
    .directive('pageindex', function ($timeout) {
        return {
            templateUrl: 'page-index/views/page-index-content.html',
            link: function(scope, element, attrs) {
                $timeout(function () {
                    angular.element(document).ready(function () {
                        $('.header-block').css({
                            'min-height': window.innerHeight*0.9,
                            'height': 'auto'
                        });
                    });
                }, 0);
            }
        };
    })
    .directive('overcontent', function ($timeout) {
        return {
            templateUrl: 'page-index/views/over-content.html',
            link: function(scope, element, attrs) {
                $timeout(function () {
                    angular.element(document).ready(function () {
                        $('.block-over').css({
                            'min-height': window.innerHeight - 100,
                            'height': 'auto'
                        });
                    });
                }, 0);
            }
        };
    });