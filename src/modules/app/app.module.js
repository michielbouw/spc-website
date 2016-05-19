angular.module('mainapp', [
    'ngRoute',
    'ngStorage',
    'ui.bootstrap',

    'mainapp.api',
    'mainapp.club',
    'mainapp.footer',
    'mainapp.match',
    'mainapp.memberAuth',
    'mainapp.navbar',
    'mainapp.pageAdmin',
    'mainapp.pageAnalyse',
    'mainapp.pageClubadmin',
    'mainapp.pageIndex',
    'mainapp.pageUser',
    'mainapp.players',
    'mainapp.scouting'
])
    .config(function($locationProvider, $routeProvider, $httpProvider, $compileProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/404', {
                templateUrl: 'app/views/404.html',
                access: {
                    requiredLogin: false
                }
            })
            .when('/500', {
                templateUrl: 'app/views/500.html',
                access: {
                    requiredLogin: false
                }
            })
            .otherwise('/404');

        $httpProvider.interceptors.push('TokenInterceptor');

        $compileProvider.debugInfoEnabled(false);
    })
    .run(['$anchorScroll', function($anchorScroll) {
        $anchorScroll.yOffset = 155;   // always scroll by 50 extra pixels
        //$anchorScroll.yOffset = 250;   // always scroll by 50 extra pixels
    }])
    .run(function($location, $sessionStorage, $localStorage, Api, AuthenticationService, $rootScope, $filter) {
        //jQuery(document).ready(function() {
        //    var sOffset = $(".content").offset().top;
        //    $(window).scroll(function () {
        //        var scrollYpos = $(document).scrollTop();
        //        if (scrollYpos > sOffset) {
        //            $(".navbar.navbar-default.navbar-fixed-top").hide(500);
        //        } else {
        //            $(".navbar.navbar-default.navbar-fixed-top").show(500);
        //        }
        //    });
        //});

        //Set credentials if remember in localstorage
        if ($localStorage.token && $localStorage.remember && $localStorage.role) {
            AuthenticationService.isLogged = true;
            $sessionStorage.token = $localStorage.token;
            $sessionStorage.role = $localStorage.role;
            $sessionStorage.remember = true;

            if ($localStorage.remember && $localStorage.id && $location.url() == "/") {
                Api.User.get({
                    _id: $localStorage.id
                }, function (res) {
                    var ip_info;
                    $.ajax({
                        url: '//freegeoip.net/json/',
                        type: 'POST',
                        dataType: 'jsonp',
                        success: function (location) {
                            ip_info = location;
                        }
                    }).always(function() {
                        if ($filter('filter')(res.ip_addresses, {ip_address: ip_info.ip}, true) && $filter('filter')(res.ip_addresses, {ip_address: ip_info.ip}, true)[0]) {
                            $filter('filter')(res.ip_addresses, {ip_address: ip_info.ip}, true)[0].browser = navigator.appName + ' ' + navigator.userAgent;
                            $filter('filter')(res.ip_addresses, {ip_address: ip_info.ip}, true)[0].date = new Date();
                        } else {
                            var temp = {};
                            temp.ip_address = ip_info.ip;
                            temp.country_code = ip_info.country_code;
                            temp.city = ip_info.city;
                            temp.browser = navigator.appName + ' ' + navigator.userAgent;
                            temp.date = new Date();
                            res.ip_addresses.push(temp);
                        }

                        Api.User.put({
                            _id: $localStorage.id
                        }, {
                            last_login: new Date(),
                            number_of_logins: Number(res.number_of_logins + 1),
                            ip_addresses: res.ip_addresses
                        }, function (res1) {
                        });
                    });

                    $sessionStorage.currentUser = res;

                    $sessionStorage.currentClub = {};
                    $sessionStorage.currentClub.name = res.club;
                    $sessionStorage.currentClub.slug = res.club_slug;
                    $sessionStorage.currentClub.teams = res.teams;
                    $sessionStorage.currentClub.colors = [];

                    Api.Club.get({
                        _slug: res.club_slug
                    }, function(res2) {
                        $sessionStorage.currentClub.colors = res2.colors;
                        $sessionStorage.currentClub.spc_package = res2.spc_package;

                        $rootScope.currentUser = $sessionStorage.currentUser;
                        $rootScope.currentClub = $sessionStorage.currentClub;
                    }, function() {
                        $rootScope.currentUser = $sessionStorage.currentUser;
                        $rootScope.currentClub = $sessionStorage.currentClub;
                    });
                });
            }

            if ($localStorage.remember && $location.url() == "/") {
                if ($localStorage.role == 'admin') {
                    $location.path("/admin");
                } else if ($localStorage.role == 'club-beheer') {
                    $location.path("/user");
                } else if ($localStorage.role == 'speler') {
                    $location.path("/user");
                } else {
                    $location.path("/club");
                }
            } else if ($location.url() == "/") {
                $location.path("/user");
            }
        }
    });