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
    .run(function($location, $localStorage, Api, AuthenticationService, $rootScope) {

        //Set credentials if present in localstorage
    //  if ($localStorage.token && $localStorage.remember && $localStorage.role) {
    //        var username = $localStorage.username;
    //        var password = $localStorage.password;
    //        Api.Login.post({
    //            username: username,
    //            password: password
    //        }, function (res) {
    //            if (res.type === false) {
    //                alert(res.data);
    //            } else {
    //                AuthenticationService.isLogged = true;
    //                $localStorage.token = res.data.token;
    //                $localStorage.username = username;
    //                $localStorage.password = password;
    //                $location.path("/club");
    //            }
    //        }, function(status, data) {
    //            console.log(status);
    //            console.log(data);
    //        });
    //    }
    });