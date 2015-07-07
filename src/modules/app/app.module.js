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
    'mainapp.players'
])
    .config(function($locationProvider, $routeProvider, $httpProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/404', {
                templateUrl: 'app/views/404.html'
            })
            .when('/500', {
                templateUrl: 'app/views/500.html'
            })
            .otherwise('/404');

        $httpProvider.interceptors.push('TokenInterceptor');
    })
    .run(['$anchorScroll', function($anchorScroll) {
        $anchorScroll.yOffset = 155;   // always scroll by 50 extra pixels
    }])
    .run(function($location, $sessionStorage, $localStorage, Api, AuthenticationService, $rootScope) {
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
                    Api.User.put({
                        _id: $localStorage.id
                    }, {
                        last_login: new Date(),
                        number_of_logins: Number(res.number_of_logins + 1)
                    }, function (res1) {
                    });

                    $sessionStorage.currentUser = res.data;

                    var temp = {};
                    temp.name = res.data.club;
                    temp.slug = res.data.club_slug;
                    temp.teams = res.data.teams;
                    temp.colors = [];
                    $sessionStorage.currentClub = temp;

                    Api.Club.get({
                        _slug: res.data.club_slug
                    }, function(res2) {
                        temp.colors = res2.colors;
                        temp.spc_package = res2.spc_package;
                        $sessionStorage.currentClub = temp;

                        $rootScope.currentUser = $sessionStorage.currentUser;
                        $rootScope.currentClub = $sessionStorage.currentClub;
                    }, function() {
                        $sessionStorage.currentClub = temp;
                        $rootScope.currentUser = $sessionStorage.currentUser;
                        $rootScope.currentClub = $sessionStorage.currentClub;
                    });
                });
            }

            if ($localStorage.remember && $location.url() == "/") {
                if ($localStorage.role == 'admin') {
                    $location.path("/admin");
                } else if ($localStorage.role == 'speler') {
                    $location.path("/speler");
                } else {
                    $location.path("/club");
                }
            }
        }
    });