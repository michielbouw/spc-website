angular.module('mainapp.memberAuth')
    .factory('AuthenticationService', function() {
        var auth = {
            isLogged: false
        };
        return auth;
    })
    .factory('TokenInterceptor', function ($q, $window, AuthenticationService, $sessionStorage, $localStorage, $location, $rootScope) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($sessionStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $sessionStorage.token;
                }
                return config;
            },

            requestError: function(rejection) {
                return $q.reject(rejection);
            },

            /* Set Authentication.isLogged to true if 200 received, when refreshing the page */
            response: function (response) {
                if (response !== null && response.status == 200 && $sessionStorage.token && $sessionStorage.role && !AuthenticationService.isLogged) {
                    AuthenticationService.isLogged = true;

                    $rootScope.isLogged = function() {
                        return (AuthenticationService.isLogged);
                    };
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
                return response || $q.when(response);
            },

            /* Revoke client authentication if 401 is received */
            responseError: function(rejection) {
                if (rejection !== null && rejection.status === 401 && ($sessionStorage.token || $sessionStorage.role || AuthenticationService.isLogged)) {
                    delete $sessionStorage.token;
                    delete $localStorage.token;
                    delete $sessionStorage.role;
                    delete $localStorage.role;
                    delete $localStorage.is_superadmin;
                    delete $localStorage.id;
                    $localStorage.$reset();
                    $sessionStorage.$reset();
                    AuthenticationService.isLogged = false;
                    $rootScope.isLogged = false;
                    $location.path("/login");
                }
                return $q.reject(rejection);
            }
        };
    })
    .run(function($rootScope, $location, AuthenticationService, $sessionStorage, $localStorage, Api) {
        $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
            if (nextRoute.access.requiredLogin && !AuthenticationService.isLogged && nextRoute != "/login") {
                $location.path("/login");
            }
            else if (nextRoute.access.requiredLogin && AuthenticationService.isLogged && nextRoute != "/login") {
                // check user permissions by checking url permission and user role to make sure user has correct authority
                var user = {};
                if ($sessionStorage.role) {
                    user.role = $sessionStorage.role;
                    if ($localStorage.is_superadmin) {
                        user.is_superadmin = $localStorage.is_superadmin;
                    }
                } else if ($localStorage.role) {
                    user.role = $localStorage.role;
                    user.is_superadmin = $localStorage.is_superadmin;
                } else {
                    user.role = $rootScope.currentUser.role;
                    if ($localStorage.is_superadmin) {
                        user.is_superadmin = $localStorage.is_superadmin;
                    }
                }

                if (nextRoute.access.permission == "public") {

                } else if (user.is_superadmin) {

                } else if (user.role == "admin") {

                } else if (nextRoute.access.permission == "club-beheer" && user.role == "club-beheer") {

                } else if (nextRoute.access.permission == "technische-staff" && user.role == "technische-staff") {

                } else if (nextRoute.access.permission == "externe-staff" && (user.role == "technische-staff" || user.role == "externe-staff")) {

                } else if (nextRoute.access.permission == "speler" && (user.role == "technische-staff" || user.role == "externe-staff" || user.role == "speler")) {

                } else if (nextRoute.access.permission == "fan" && (user.role == "fan")) {

                } else {
                    $location.path("/");
                }
            }
        });
    });