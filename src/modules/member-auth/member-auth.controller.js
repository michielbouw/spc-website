angular.module('mainapp.memberAuth')
    .controller('mainapp.memberAuth.AuthController', ['$rootScope', 'Api', '$location', '$localStorage', 'AuthenticationService',
        function ($rootScope, Api, $location, $localStorage, AuthenticationService) {
            var self = this;
            self.datetime = new Date();

            // check if is logged in available to run from everywhere.
            $rootScope.isLogged = function() {
                return (AuthenticationService.isLogged);
            };

            if (AuthenticationService.isLogged) {
                Api.Me.get(function (res) {
                    $rootScope.currentUser = res.data;
                }, function () {
                    $rootScope.error = 'Failed to fetch details';
                });

                // temp
                $rootScope.currentClub = {};
                $rootScope.currentClub.name = "FC Eindhoven";
                $rootScope.currentClub.colors = [{ "color": "blauw", "refcode": "#24528e"}, { "color": "wit", "refcode": "#ffffff"}];
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
                            $localStorage.token = res.token;
                            $localStorage.role = res.data.role;
                            if (self.login.remember) {
                                $localStorage.remember = true;
                                //$localStorage.email = self.login.email;
                                //$localStorage.password = self.login.password;
                            }

                            if (AuthenticationService.isLogged) {
                                Api.Me.get(function (res) {
                                    $rootScope.currentUser = res.data;

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

                                // temp
                                $rootScope.currentClub = {};
                                $rootScope.currentClub.name = "FC Eindhoven";
                                $rootScope.currentClub.colors = [{ "color": "blauw", "refcode": "#24528e"}, { "color": "wit", "refcode": "#ffffff"}];
                            }
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
                            username: self.login.username,
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
                    delete $localStorage.token;
                    delete $localStorage.role;
                    delete $localStorage.remember;
                    //delete $localStorage.email;
                    //delete $localStorage.password;
                    $localStorage.$reset();
                    $location.path("/");
                }
            };
        }
    ]);