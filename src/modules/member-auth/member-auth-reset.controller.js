angular.module('mainapp.memberAuth')
    .controller('mainapp.memberAuthReset.AuthController', ['$rootScope', 'Api', '$location', '$sessionStorage', '$localStorage', 'AuthenticationService',
        '$routeParams',
        function ($rootScope, Api, $location, $sessionStorage, $localStorage, AuthenticationService, $routeParams) {
            var self = this;
            self.datetime = new Date();
            self.login = {};

            Api.ResetPassword.get({
                token: $routeParams.token
            }, function (res) {
                if (res.type === false) {
                    alert(res.data);
                    $location.path("/");
                }
                self.login.email = res.data;
            }, function () {
                $rootScope.error = 'Er ging iets mis, kan wachtwoord niet resetten';
                alert('Er ging iets mis, kan wachtwoord niet resetten');
                $location.path("/");
            });

            self.resetPassword = function () {
                if (self.login.password === self.login.password2) {
                    if (self.login.password.length > 5 && self.login.password.match(/[a-z]/) && self.login.password.match(/[0-9]/)) {
                        Api.ResetPassword.post({
                            password: self.login.password
                        }, function (res) {
                            if (res.type === false) {
                                alert(res.data);
                            } else {
                                $location.path("/login");
                            }
                        }, function () {
                            $rootScope.error = 'Er ging iets mis, wachtwoord niet veranderd';
                            alert('Er ging iets mis, wachtwoord niet veranderd');
                        });
                    }
                }
            };
        }
    ]);