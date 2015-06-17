angular.module('mainapp')
    .filter('istoday', function () {
        // check if date is today

        return function (input) {
            var actualDate = new Date().setHours(0, 0, 0, 0);
            var checkDate = new Date(input).setHours(0, 0, 0, 0);

            return (actualDate == checkDate);
        };
    });