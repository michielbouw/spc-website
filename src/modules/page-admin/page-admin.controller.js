angular.module('mainapp.pageAdmin')
    .controller('mainapp.pageAdmin.AdminController', ['Api', '$filter', '$rootScope', function(Api, $filter, $rootScope) {
        var self = this;

        self.usergroups = [];
        $rootScope.errorImport = '';

        Api.Users.query({
            fans: false
        }, function(res) {
            self.users = res;

            angular.forEach(self.users, function (value, key) {
                if (value.club && value.club !== '' && value.club !== null) {
                    if (self.usergroups.length > 0 && $filter('filter')(self.usergroups, {club: value.club}, true) && $filter('filter')(self.usergroups, {club: value.club}, true)[0]) {
                        var club = $filter('filter')(self.usergroups, {club: value.club}, true)[0];
                        if (isNew(value.last_login)) {
                            club.recently_online += 1;
                        }
                    } else {
                        var temp = {};
                        temp.club = angular.copy(value.club);
                        if (isNew(value.last_login)) {
                            temp.recently_online = 1;
                        } else {
                            temp.recently_online = 0;
                        }
                        self.usergroups.push(temp);
                    }
                }
            });
        });

        self.orderUsers = 'last_login';
        self.orderUsergroups = 'recently_online';
        self.orderUsersActive = 'number_of_logins';

        var isNew = function (input) {
            var actualDate = new Date();
            var checkDate = new Date(input).setHours(0, 0, 0, 0);

            // substract 5 days
            actualDate = new Date(actualDate.getTime() - 5*24*60*60*1000).setHours(0, 0, 0, 0);

            return (actualDate <= checkDate);
        };
    }]);