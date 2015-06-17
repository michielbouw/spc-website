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
                        });
                        $('#nav-sub a[href="#users"]').tab('show');
                    });
                }, 100);
            }
        };
    });