angular.module('mainapp.memberAuth')
    .directive('logincontent', function ($timeout) {
        return {
            templateUrl: 'member-auth/views/login-content.html',
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
    .directive('signincontent', function ($timeout) {
        return {
            templateUrl: 'member-auth/views/signin-content.html',
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
    });