angular.module('mainapp.memberAuth')
    .factory('AuthenticationService', function() {
        var auth = {
            isLogged: false
        };
        return auth;
    })
    .factory('TokenInterceptor', function ($q, $window, AuthenticationService, $localStorage, $location, $rootScope) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($localStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $localStorage.token;
                }
                return config;
            },

            requestError: function(rejection) {
                return $q.reject(rejection);
            },

            /* Set Authentication.isLogged to true if 200 received, when refreshing the page */
            response: function (response) {
                if (response !== null && response.status == 200 && $localStorage.token && $localStorage.role && !AuthenticationService.isLogged) {
                    AuthenticationService.isLogged = true;

                    $rootScope.isLogged = function() {
                        return (AuthenticationService.isLogged);
                    };
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
                return response || $q.when(response);
            },

            /* Revoke client authentication if 401 is received */
            responseError: function(rejection) {
                if (rejection !== null && rejection.status === 401 && ($localStorage.token || $localStorage.role || AuthenticationService.isLogged)) {
                    delete $localStorage.token;
                    AuthenticationService.isLogged = false;
                    $rootScope.isLogged = false;
                    $location.path("/login");
                }
                return $q.reject(rejection);
            }
        };
    })
    .run(function($rootScope, $location, AuthenticationService, $localStorage, Api) {
        $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
            if (nextRoute.access.requiredLogin && !AuthenticationService.isLogged && nextRoute != "/login") {
                $location.path("/login");
            }
            else if (nextRoute.access.requiredLogin && AuthenticationService.isLogged && nextRoute != "/login") {
                // check user permissions by checking url permission and user role to make sure user has correct authority
                var user = {};
                if (!$localStorage.role) {
                    user.role = $rootScope.currentUser.role;
                    user.is_superadmin = $rootScope.currentUser.is_superadmin;
                } else {
                    user.role = $localStorage.role;
                }

                if (nextRoute.access.permission == "public") {

                } else if (user.is_superadmin) {

                } else if (user.role == "admin") {

                } else if (nextRoute.access.permission == "club-beheer" && user.role == "club-beheer") {

                } else if (nextRoute.access.permission == "technische-staff" && user.role == "techn-staff") {

                } else if (nextRoute.access.permission == "externe-staff" && (user.role == "techn-staff" || user.role == "externe-staff")) {

                } else if (nextRoute.access.permission == "speler" && (user.role == "techn-staff" || user.role == "externe-staff" || user.role == "speler")) {

                } else if (nextRoute.access.permission == "fan" && (user.role == "fan")) {

                } else {
                    $location.path("/");
                }
            }
        });
    });