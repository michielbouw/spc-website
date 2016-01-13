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
    })
    .directive('getaccountcontent', function ($timeout) {
        return {
            templateUrl: 'member-auth/views/getaccount-content.html',
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
    .directive('activatedcontent', function ($timeout) {
        return {
            templateUrl: 'member-auth/views/activated-content.html',
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
    .directive('forgotcontent', function ($timeout) {
        return {
            templateUrl: 'member-auth/views/forgot-content.html',
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
    .directive('passwordresetcontent', function ($timeout) {
        return {
            templateUrl: 'member-auth/views/passwordreset-content.html',
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