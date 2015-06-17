angular.module('mainapp.pageUser')
    .directive('usercontent', function ($timeout) {
        return {
            templateUrl: 'page-user/views/user-content.html',
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
                        $('#nav-sub a[href="#profiel"]').tab('show');
                    });
                }, 100);
            }
        };
    });