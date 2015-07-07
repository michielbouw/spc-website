angular.module('mainapp.memberAuth')
    .controller('mainapp.memberAuth.AuthController', ['$rootScope', 'Api', '$location', '$sessionStorage', '$localStorage', 'AuthenticationService',
        function ($rootScope, Api, $location, $sessionStorage, $localStorage, AuthenticationService) {
            var self = this;
            self.datetime = new Date();

            // check if is logged in available to run from everywhere.
            $rootScope.isLogged = function() {
                return (AuthenticationService.isLogged);
            };

            if (AuthenticationService.isLogged && !$sessionStorage.currentUser && !$sessionStorage.currentClub) {
                Api.Me.get(function (res) {
                    $sessionStorage.currentUser = res.data;

                    var temp = {};
                    temp.name = res.data.club;
                    temp.slug = res.data.club_slug;
                    temp.teams = res.data.teams;
                    temp.colors = [];
                    $sessionStorage.currentClub = temp;

                    Api.Club.get({
                        _slug: res.data.club_slug
                    }, function(res1) {
                        temp.colors = res1.colors;
                        temp.spc_package = res1.spc_package;
                        $sessionStorage.currentClub = temp;

                        $rootScope.currentUser = $sessionStorage.currentUser;
                        $rootScope.currentClub = $sessionStorage.currentClub;
                    }, function() {
                        $sessionStorage.currentClub = temp;
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

                    Api.Login.post({
                        email: self.login.email,
                        password: self.login.password,
                        datetime: self.datetime
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

                                var temp = {};
                                temp.name = res1.data.club;
                                temp.slug = res1.data.club_slug;
                                temp.teams = res1.data.teams;
                                temp.colors = [];
                                $sessionStorage.currentClub = temp;

                                Api.Club.get({
                                    _slug: res1.data.club_slug
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

                                if (res.data.role == 'admin') {
                                    $location.path("/admin");
                                } else if (res.data.role == 'speler') {
                                    $location.path("/speler");
                                } else {
                                    $location.path("/club");
                                }
                            }, function () {
                                $rootScope.error = 'Failed to fetch details';
                            });
                        }
                    }, function(status, data) {
                        console.log(status);
                        console.log(data);
                    });
                }
            };
            self.signIn = function () {
                if (self.login.email !== undefined && self.login.password !== undefined && self.login.password2 !== undefined) {

                    if (self.login.password === self.login.password2) {
                        Api.Signin.post({
                            email: self.login.email,
                            password: self.login.password,
                            first_name: self.login.first_name,
                            middle_name: self.login.middle_name,
                            last_name: self.login.last_name,
                            datetime: self.datetime
                        }, function (res) {
                            if (res.type === false) {
                                alert(res.data);
                            } else {
                                $location.path("/");
                            }
                        }, function () {
                            $rootScope.error = 'Er ging iets mis, account niet aangemaakt';
                        });
                    } else {
                        $rootScope.error = 'Je hebt het wachtwoord niet (correct) bevestigd';
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