angular.module('mainapp.pageAdmin')
    .controller('mainapp.pageAdmin.AdminController', ['Api', '$filter', '$rootScope', function(Api, $filter, $rootScope) {
        var self = this;

        self.usergroups = [];
        self.browsers = [];
        self.visits = [];
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

                if (value.ip_addresses && value.ip_addresses !== '' && value.ip_addresses !== null && value.role !== 'admin') {
                    angular.forEach(value.ip_addresses, function (value1, key1) {
                        if (value1.browser && value1.browser !== '' && value1.browser !== null) {
                            if (self.browsers.length > 0 && $filter('filter')(self.browsers, {browser: value1.browser}, true) && $filter('filter')(self.browsers, {browser: value1.browser}, true)[0]) {
                                var browser = $filter('filter')(self.browsers, {browser: value1.browser}, true)[0];
                                browser.count += 1;
                            } else {
                                var temp1 = {};
                                temp1.browser = value1.browser;
                                temp1.count = 1;
                                self.browsers.push(temp1);
                            }
                        }
                    });
                }

                if (value.visits && value.visits !== '' && value.visits !== null && value.role !== 'admin') {
                    angular.forEach(value.visits, function (value1, key1) {
                        if (value1.page_url && value1.page_url !== '' && value1.page_url !== null) {
                            if (self.visits.length > 0 && $filter('filter')(self.visits, {page_url: value1.page_url}, true) && $filter('filter')(self.visits, {page_url: value1.page_url}, true)[0]) {
                                var visit = $filter('filter')(self.visits, {page_url: value1.page_url}, true)[0];
                                visit.count += value1.count;
                                visit.last_visit = value1.last_visit;
                            } else {
                                var temp2 = {};
                                temp2.page_url = value1.page_url;
                                temp2.count = value1.count;
                                temp2.last_visit = value1.last_visit;
                                self.visits.push(temp2);
                            }
                        }
                    });
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