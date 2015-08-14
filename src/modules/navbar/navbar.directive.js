angular.module('mainapp.navbar')
    .directive('navbar', function($timeout){
        return {
            templateUrl: 'navbar/views/navbar.html',
            link: function(scope, element, attrs) {
                $timeout(function () {
                    angular.element(document).ready(function () {
                        $(function () {
                            $('[data-toggle="tooltip"]').tooltip();
                        });
                    });
                }, 0);
            }
        };
    })
    .directive('navbarclub', function($timeout){
        return {
            templateUrl: 'navbar/views/navbar-club.html',
            link: function(scope, element, attrs) {
                $timeout(function () {
                    angular.element(document).ready(function () {
                        $(function () {
                            $('[data-toggle="tooltip"]').tooltip();
                        });
                    });
                }, 0);
            }
        };
    });
    //.directive('navbar-fan', function($timeout){
    //    return {
    //        templateUrl: 'navbar/views/navbar-fan.html',
    //        link: function(scope, element, attrs) {
    //            $timeout(function () {
    //                angular.element(document).ready(function () {
    //
    //                });
    //            }, 0);
    //        }
    //    };
    //});