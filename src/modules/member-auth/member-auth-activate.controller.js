angular.module('mainapp.memberAuth')
    .controller('mainapp.memberAuthActivate.AuthController', ['$rootScope', 'Api', '$location', '$sessionStorage', '$localStorage', 'AuthenticationService',
        '$routeParams',
        function ($rootScope, Api, $location, $sessionStorage, $localStorage, AuthenticationService, $routeParams) {
            var self = this;
            self.datetime = new Date();
            self.login = {};

            Api.Activate.post({
                token: $routeParams.token
            }, function (res) {
                if (res.type === false) {
                    alert(res.data);
                    $location.path("/");
                }
                self.login.email = res.data.email;
            }, function () {
                $rootScope.error = 'Er ging iets mis, kan account niet activeren';
                alert('Er ging iets mis, kan account niet activeren');
                $location.path("/");
            });

            //Admin User Controller (login, logout)
            self.logIn = function () {
                if (self.login.email !== undefined && self.login.password !== undefined) {

                    var ip_info;
                    $.ajax({
                        url: '//freegeoip.net/json/',
                        type: 'POST',
                        dataType: 'jsonp',
                        success: function (location) {
                            ip_info = location;
                        }
                    }).always(function() {
                        Api.Login.post({
                            email: self.login.email,
                            password: self.login.password,
                            datetime: self.datetime,
                            ip_info: ip_info,
                            browser: navigator.appName + ' ' + navigator.userAgent
                        }, function (res) {
                            if (res.type === false) {
                                alert(res.data);
                            } else {
                                AuthenticationService.isLogged = true;
                                $sessionStorage.token = res.token;
                                $sessionStorage.role = res.data.role;
                                if (self.login.remember) {
                                    $sessionStorage.remember = true;
                                    $localStorage.remember = true;
                                    $localStorage.token = res.token;
                                    $localStorage.role = res.data.role;
                                    $localStorage.is_superadmin = res.data.is_superadmin;
                                    $localStorage.id = res.data._id;
                                }

                                Api.Me.get(function (res1) {
                                    $sessionStorage.currentUser = res1.data;

                                    $sessionStorage.currentClub = {};
                                    $sessionStorage.currentClub.name = res.data.club;
                                    $sessionStorage.currentClub.slug = res.data.club_slug;
                                    $sessionStorage.currentClub.teams = res.data.teams;
                                    $sessionStorage.currentClub.colors = [];

                                    Api.Club.get({
                                        _slug: res1.data.club_slug
                                    }, function(res2) {
                                        $sessionStorage.currentClub.colors = res2.colors;
                                        $sessionStorage.currentClub.spc_package = res2.spc_package;

                                        $rootScope.currentUser = $sessionStorage.currentUser;
                                        $rootScope.currentClub = $sessionStorage.currentClub;

                                        if (res.data.role == 'admin') {
                                            $location.path("/admin");
                                        } else if (res.data.role == 'club-beheer') {
                                            $location.path("/user");
                                        } else if (res.data.role == 'speler') {
                                            $location.path("/user");
                                        } else {
                                            $location.path("/club");
                                        }
                                    }, function() {
                                        $rootScope.currentUser = $sessionStorage.currentUser;
                                        $rootScope.currentClub = $sessionStorage.currentClub;

                                        if (res.data.role == 'admin') {
                                            $location.path("/admin");
                                        } else if (res.data.role == 'club-beheer') {
                                            $location.path("/user");
                                        } else if (res.data.role == 'speler') {
                                            $location.path("/user");
                                        } else {
                                            $location.path("/club");
                                        }
                                    });
                                }, function () {
                                    $rootScope.error = 'Failed to fetch details';
                                });
                            }
                        }, function(status, data) {
                            console.log(status);
                            console.log(data);
                        });
                    });
                }
            };
        }
    ]);