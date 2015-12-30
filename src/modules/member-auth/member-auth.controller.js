angular.module('mainapp.memberAuth')
    .controller('mainapp.memberAuth.AuthController', ['$rootScope', 'Api', '$location', '$sessionStorage', '$localStorage', 'AuthenticationService',
        function ($rootScope, Api, $location, $sessionStorage, $localStorage, AuthenticationService) {
            var self = this;
            self.datetime = new Date();

            // check if is logged in available to run from everywhere.
            $rootScope.isLogged = function() {
                return (AuthenticationService.isLogged);
            };

            Api.Clubs.query(function(res) {
                self.clubs = res;
            });

            if (AuthenticationService.isLogged && !$sessionStorage.currentUser && !$sessionStorage.currentClub) {
                Api.Me.get(function (res) {
                    $sessionStorage.currentUser = res.data;

                    $sessionStorage.currentClub = {};
                    $sessionStorage.currentClub.name = res.data.club;
                    $sessionStorage.currentClub.slug = res.data.club_slug;
                    $sessionStorage.currentClub.teams = res.data.teams;
                    $sessionStorage.currentClub.colors = [];

                    Api.Club.get({
                        _slug: res.data.club_slug
                    }, function(res1) {
                        $sessionStorage.currentClub.colors = res1.colors;
                        $sessionStorage.currentClub.spc_package = res1.spc_package;

                        $rootScope.currentUser = $sessionStorage.currentUser;
                        $rootScope.currentClub = $sessionStorage.currentClub;
                    }, function() {
                        $rootScope.currentUser = $sessionStorage.currentUser;
                        $rootScope.currentClub = $sessionStorage.currentClub;
                    });
                }, function () {
                    $rootScope.error = 'Failed to fetch details';
                });
            } else {
                $rootScope.currentUser = $sessionStorage.currentUser;
                $rootScope.currentClub = $sessionStorage.currentClub;
            }

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
            self.signIn = function () {
                if (self.login.email !== undefined && self.login.password !== undefined && self.login.password2 !== undefined) {

                    if (self.login.password === self.login.password2) {
                        var ip_info;
                        $.ajax({
                            url: '//freegeoip.net/json/',
                            type: 'POST',
                            dataType: 'jsonp',
                            success: function(location) {
                                ip_info = location;
                            }
                        }).always(function() {
                            if (self.login.fan_club) {
                                self.login.fan_club_slug = self.login.fan_club.trim().toLowerCase().replace(/\s+/g, '');
                            } else {
                                self.login.fan_club_slug = '';
                            }

                            Api.Signin.post({
                                email: self.login.email,
                                password: self.login.password,
                                first_name: self.login.first_name,
                                middle_name: self.login.middle_name,
                                last_name: self.login.last_name,
                                fan_club: self.login.fan_club,
                                fan_club_slug: self.login.fan_club_slug,
                                datetime: self.datetime,
                                ip_info: ip_info,
                                browser: navigator.appName + ' ' + navigator.userAgent
                            }, function (res) {
                                if (res.type === false) {
                                    alert(res.data);
                                } else {
                                    $location.path("/");
                                }
                            }, function () {
                                $rootScope.error = 'Er ging iets mis, account niet aangemaakt';
                                alert('Er ging iets mis, account niet aangemaakt');
                            });
                        });
                    } else {
                        $rootScope.error = 'Je hebt het wachtwoord niet (correct) bevestigd';
                        alert('Je hebt het wachtwoord niet (correct) bevestigd');
                    }
                }
            };
            self.getAccount = function () {
                if (self.login.email !== undefined && self.login.password !== undefined && self.login.password2 !== undefined) {

                    if (self.login.password === self.login.password2) {
                        if ( self.login.password.length > 5 && self.login.password.match(/[a-z]/) && self.login.password.match(/[0-9]/) ) {
                            var ip_info;
                            $.ajax({
                                url: '//freegeoip.net/json/',
                                type: 'POST',
                                dataType: 'jsonp',
                                success: function (location) {
                                    ip_info = location;
                                }
                            }).always(function () {
                                if (self.login.club) {
                                    self.login.club_slug = self.login.club.trim().toLowerCase().replace(/\s+/g, '');
                                } else {
                                    self.login.club_slug = '';
                                }

                                Api.GetAccount.post({
                                    email: self.login.email,
                                    password: self.login.password,
                                    first_name: self.login.first_name,
                                    middle_name: self.login.middle_name,
                                    last_name: self.login.last_name,
                                    club: self.login.club,
                                    club_slug: self.login.club_slug,
                                    datetime: self.datetime,
                                    ip_info: ip_info,
                                    browser: navigator.appName + ' ' + navigator.userAgent
                                }, function (res) {
                                    if (res.type === false) {
                                        alert(res.data);
                                    } else {
                                        $location.path("/");
                                    }
                                }, function () {
                                    $rootScope.error = 'Er ging iets mis, account niet aangemaakt';
                                    alert('Er ging iets mis, account niet aangemaakt');
                                });
                            });
                        } else {
                            $rootScope.error = 'Een wachtwoord moet tenminste 1 letter en 1 cijfer bevatten en minimaal 6 tekens lang zijn';
                            alert('Een wachtwoord moet tenminste 1 letter en 1 cijfer bevatten en minimaal 6 tekens lang zijn');
                        }
                    } else {
                        $rootScope.error = 'Je hebt het wachtwoord niet (correct) bevestigd';
                        alert('Je hebt het wachtwoord niet (correct) bevestigd');
                    }
                }
            };
            self.logOut = function () {
                if (AuthenticationService.isLogged) {
                    AuthenticationService.isLogged = false;
                    $rootScope.isLogged = false;
                    delete $sessionStorage.remember;
                    delete $sessionStorage.token;
                    delete $sessionStorage.role;
                    $localStorage.$reset();
                    $sessionStorage.$reset();
                    $location.path("/");
                }
            };
        }
    ]);